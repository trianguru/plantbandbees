import type { Express, Request, Response } from "express";
import Stripe from "stripe";
import { storage } from "../storage";
import { authStorage } from "../replit_integrations/auth/storage";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-02-25.clover",
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
