import type { Express, Request, Response } from "express";
import Stripe from "stripe";
import { storage } from "../storage";
import { authStorage } from "../replit_integrations/auth/storage";
import {
  sendOrderConfirmationEmail,
  sendSubscriptionCancelledEmail,
  sendPaymentFailedEmail,
} from "../lib/email";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY environment variable is not set");
  return new Stripe(key, { apiVersion: "2026-02-25.clover" });
}
let _stripe: Stripe | null = null;
const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    if (!_stripe) _stripe = getStripe();
    return (_stripe as any)[prop];
  },
});

// Helper: get or create a Stripe customer for the logged-in user
async function getOrCreateStripeCustomer(userId: string): Promise<string> {
  const user = await authStorage.getUser(userId);
  if (!user) throw new Error("User not found");

  if (user.stripeCustomerId) return user.stripeCustomerId;

  const customer = await stripe.customers.create({
    email: user.email ?? undefined,
    name: [user.firstName, user.lastName].filter(Boolean).join(" ") || undefined,
    metadata: { userId },
  });

  await authStorage.setStripeCustomerId(userId, customer.id);
  return customer.id;
}

export function registerStripeRoutes(app: Express): void {
  // POST /api/stripe/create-checkout-session
  // Creates a Stripe Checkout session for a given product
  app.post("/api/stripe/create-checkout-session", async (req: any, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { productId } = req.body;
      if (!productId) {
        return res.status(400).json({ message: "productId is required" });
      }

      const product = await storage.getProduct(Number(productId));
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const customerId = await getOrCreateStripeCustomer(req.session.userId);
      const baseUrl = process.env.APP_URL ?? "https://plantbandbees.com";

      const priceInCents = Math.round(Number(product.price) * 100);
      const isSubscription = product.type === "subscription_tier";

      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: isSubscription ? "subscription" : "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
                description: product.description,
                images: [product.imageUrl],
              },
              unit_amount: priceInCents,
              ...(isSubscription && { recurring: { interval: "month" } }),
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId: req.session.userId,
          productId: String(product.id),
        },
        success_url: `${baseUrl}/dashboard?checkout=success`,
        cancel_url: `${baseUrl}/catalogue?checkout=cancelled`,
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error("Stripe checkout error:", error);
      res.status(500).json({ message: "Failed to create checkout session" });
    }
  });

  // POST /api/stripe/webhook
  // Handles Stripe webhook events — must receive raw body
  app.post(
    "/api/stripe/webhook",
    async (req: Request, res: Response) => {
      const sig = req.headers["stripe-signature"];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!webhookSecret || !sig) {
        return res.status(400).json({ message: "Webhook secret not configured" });
      }

      let event: Stripe.Event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return res.status(400).json({ message: "Invalid webhook signature" });
      }

      try {
        switch (event.type) {
          case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const userId = session.metadata?.userId;
            const productId = session.metadata?.productId;

            if (!userId || !productId) break;

            if (session.mode === "subscription" && session.subscription) {
              // Create subscription record in DB
              await storage.createSubscription({
                userId,
                productId: Number(productId),
                status: "active",
                stripeSubscriptionId: String(session.subscription),
                nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              });
            } else if (session.mode === "payment") {
              // One-time purchase — create an order record
              const product = await storage.getProduct(Number(productId));
              if (product) {
                await storage.createOrder(
                  { userId, totalAmount: product.price, status: "paid" },
                  [{ productId: Number(productId), quantity: 1, priceAtPurchase: product.price }] as any
                );
                // Send order confirmation email async
                const buyer = await authStorage.getUser(userId);
                if (buyer?.email) {
                  sendOrderConfirmationEmail(
                    buyer.email,
                    buyer.firstName ?? "there",
                    product.name,
                    product.price
                  ).catch((err) => console.error("Order email error:", err));
                }
              }
            }
            break;
          }

          case "customer.subscription.updated": {
            const sub = event.data.object as Stripe.Subscription;
            const status = sub.status === "active" ? "active" : sub.status === "past_due" ? "past_due" : "cancelled";
            await storage.updateSubscriptionByStripeId(sub.id, { status });
            break;
          }

          case "customer.subscription.deleted": {
            const sub = event.data.object as Stripe.Subscription;
            await storage.updateSubscriptionByStripeId(sub.id, { status: "cancelled" });
            // Look up user by Stripe customer ID and send cancellation email
            if (typeof sub.customer === "string") {
              const customers = await stripe.customers.list({ limit: 1, email: undefined });
              const customer = await stripe.customers.retrieve(sub.customer);
              if (customer && !customer.deleted && customer.email) {
                sendSubscriptionCancelledEmail(
                  customer.email,
                  (customer.name ?? "").split(" ")[0] || "there"
                ).catch((err) => console.error("Cancellation email error:", err));
              }
            }
            break;
          }

          case "invoice.payment_failed": {
            const invoice = event.data.object as Stripe.Invoice;
            if (typeof invoice.customer === "string" && invoice.amount_due) {
              const customer = await stripe.customers.retrieve(invoice.customer);
              if (customer && !customer.deleted && customer.email) {
                const amount = (invoice.amount_due / 100).toFixed(2);
                sendPaymentFailedEmail(
                  customer.email,
                  (customer.name ?? "").split(" ")[0] || "there",
                  amount
                ).catch((err) => console.error("Payment failed email error:", err));
              }
            }
            break;
          }
        }

        res.json({ received: true });
      } catch (error) {
        console.error("Webhook processing error:", error);
        res.status(500).json({ message: "Webhook processing failed" });
      }
    }
  );

  // GET /api/stripe/invoices
  // Returns the last 24 Stripe invoices for the logged-in user
  app.get("/api/stripe/invoices", async (req: any, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await authStorage.getUser(req.session.userId);
      if (!user?.stripeCustomerId) {
        return res.json([]);
      }

      const invoices = await stripe.invoices.list({
        customer: user.stripeCustomerId,
        limit: 24,
      });

      const result = invoices.data.map((inv) => ({
        id: inv.id,
        date: inv.created,
        amount: inv.amount_paid / 100,
        currency: inv.currency,
        status: inv.status,
        hostedInvoiceUrl: inv.hosted_invoice_url,
        description: inv.lines.data[0]?.description ?? null,
      }));

      res.json(result);
    } catch (error) {
      console.error("Stripe invoices error:", error);
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });

  // GET /api/stripe/portal
  // Creates a Stripe Billing Portal session for the logged-in user
  app.get("/api/stripe/portal", async (req: any, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const customerId = await getOrCreateStripeCustomer(req.session.userId);
      const baseUrl = process.env.APP_URL ?? "https://plantbandbees.com";

      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${baseUrl}/dashboard`,
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error("Stripe portal error:", error);
      res.status(500).json({ message: "Failed to create billing portal session" });
    }
  });
}
