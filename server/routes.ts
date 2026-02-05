import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes, attachUserToRequest } from "./replit_integrations/auth";
import { api } from "@shared/routes";
import { z } from "zod";
import { addToWaitlist } from "./lib/mailchimp";

async function seedDatabase() {
  const products = await storage.getProducts();
  if (products.length === 0) {
    console.log("Seeding database...");
    // Subscription Tiers
    await storage.createProduct({
      name: "The Sprout Tier",
      description: "Perfect for studios or 1-bedroom Airbnbs. Includes 3 resilient plants.",
      type: "subscription_tier",
      price: "49.99",
      imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "low",
      sunlightNeeds: "low",
      isNative: false,
      stock: 100
    });
    
    await storage.createProduct({
      name: "The Canopy Tier",
      description: "Ideal for 2-3 bedroom homes. Includes 5 plants mixed size.",
      type: "subscription_tier",
      price: "89.99",
      imageUrl: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "medium",
      sunlightNeeds: "partial",
      isNative: false,
      stock: 100
    });

    await storage.createProduct({
      name: "The Forest Tier",
      description: "For luxury estates. 10+ premium plants including large floor plants.",
      type: "subscription_tier",
      price: "159.99",
      imageUrl: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "high",
      sunlightNeeds: "mixed",
      isNative: false,
      stock: 100
    });

    // Native / One-time products
    await storage.createProduct({
      name: "Knoxville Fern Trio",
      description: "Native-adapted ferns perfect for shaded porches or humid bathrooms.",
      type: "one_time_purchase",
      price: "35.00",
      imageUrl: "https://images.unsplash.com/photo-1628678082847-0e563177894d?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "medium",
      sunlightNeeds: "low",
      isNative: true,
      stock: 50
    });

    await storage.createProduct({
      name: "Guest Gift Succulent",
      description: "Small potted succulent for guests to take home.",
      type: "one_time_purchase",
      price: "12.00",
      imageUrl: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "low",
      sunlightNeeds: "high",
      isNative: false,
      stock: 200
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth FIRST
  await setupAuth(app);
  attachUserToRequest(app);
  registerAuthRoutes(app);

  // Seed Data
  seedDatabase().catch(console.error);

  // Products
  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  // Subscriptions
  app.get(api.subscriptions.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user as any;
    const subs = await storage.getSubscriptions(user.claims.sub);
    res.json(subs);
  });

  app.post(api.subscriptions.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user as any;
    
    try {
      const input = api.subscriptions.create.input.parse(req.body);
      const sub = await storage.createSubscription({
        ...input,
        userId: user.claims.sub,
        status: 'active',
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });
      res.status(201).json(sub);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.post(api.subscriptions.cancel.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const sub = await storage.cancelSubscription(Number(req.params.id));
    if (!sub) return res.status(404).json({ message: "Subscription not found" });
    res.json(sub);
  });

  // Orders
  app.get(api.orders.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user as any;
    const orders = await storage.getOrders(user.claims.sub);
    res.json(orders);
  });

  app.post(api.orders.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user as any;

    try {
      const { items } = api.orders.create.input.parse(req.body);

      // Calculate total (in a real app, verify prices from DB)
      let total = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await storage.getProduct(item.productId);
        if (product) {
          total += Number(product.price) * item.quantity;
          orderItems.push({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: product.price,
          });
        }
      }

      const order = await storage.createOrder({
        userId: user.claims.sub,
        totalAmount: String(total),
        status: 'paid', // Mock payment for now
      }, orderItems);

      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // Waitlist
  app.post(api.waitlist.create.path, async (req, res) => {
    try {
      const input = api.waitlist.create.input.parse(req.body);

      // Save to database
      const signup = await storage.createWaitlistSignup(input);

      // Add to Mailchimp (async, don't block response)
      addToWaitlist({
        email: input.email,
        name: input.name,
        phone: input.phone,
        propertyCount: input.propertyCount,
        serviceInterest: input.serviceInterest,
        source: input.source,
      }).catch(error => {
        console.error("Failed to add to Mailchimp:", error);
        // Don't fail the request if Mailchimp fails
      });

      res.status(201).json({ message: "Successfully joined the waiting list!", id: signup.id });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  return httpServer;
}
