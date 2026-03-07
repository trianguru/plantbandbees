import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes, attachUserToRequest } from "./replit_integrations/auth";
import { registerStripeRoutes } from "./routes/stripe";
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
      description: "Perfect for studios or 1-bedroom Airbnbs. Includes 3–5 resilient plants.",
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
      description: "Ideal for 2-3 bedroom homes. Includes 6–8 plants, mixed sizes.",
      type: "subscription_tier",
      price: "79.99",
      imageUrl: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "medium",
      sunlightNeeds: "partial",
      isNative: false,
      stock: 100
    });

    await storage.createProduct({
      name: "The Forest Tier",
      description: "For luxury estates. 9–10 premium plants including large floor plants.",
      type: "subscription_tier",
      price: "139.99",
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

    // Knoxville-curated individual plants
    await storage.createProduct({
      name: "Tennessee Coneflower",
      description: "Native Tennessee wildflower with striking purple petals and a bold center cone. Attracts pollinators and thrives in Knoxville summers.",
      type: "one_time_purchase",
      price: "18.00",
      imageUrl: "https://images.unsplash.com/photo-1597945161640-9366e6d4253b?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "low",
      sunlightNeeds: "high",
      isNative: true,
      stock: 40
    });

    await storage.createProduct({
      name: "River Oats Grass",
      description: "Graceful native ornamental grass with dangling seed heads that shimmer in the breeze. Perfect for shaded porches and rain gardens.",
      type: "one_time_purchase",
      price: "15.00",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "low",
      sunlightNeeds: "partial",
      isNative: true,
      stock: 35
    });

    await storage.createProduct({
      name: "Wild Blue Indigo",
      description: "Stunning native perennial with spikes of deep blue-purple blooms in spring. Deer-resistant and pollinator-friendly.",
      type: "one_time_purchase",
      price: "20.00",
      imageUrl: "https://images.unsplash.com/photo-1490750967868-88df5691cc7e?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "low",
      sunlightNeeds: "high",
      isNative: true,
      stock: 30
    });

    await storage.createProduct({
      name: "Coral Bells (Heuchera)",
      description: "Shade-tolerant perennial with richly colored foliage in burgundy, caramel, and lime. Adds year-round color to shaded spots.",
      type: "one_time_purchase",
      price: "16.00",
      imageUrl: "https://images.unsplash.com/photo-1618522285353-e1a23cb1b3d4?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "low",
      sunlightNeeds: "partial",
      isNative: false,
      stock: 45
    });

    await storage.createProduct({
      name: "Black-Eyed Susan",
      description: "Cheerful native wildflower with golden-yellow petals and a dark center. Blooms all summer and self-seeds for next year.",
      type: "one_time_purchase",
      price: "14.00",
      imageUrl: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "low",
      sunlightNeeds: "high",
      isNative: true,
      stock: 60
    });

    await storage.createProduct({
      name: "Oakleaf Hydrangea",
      description: "Showstopping native shrub with massive white blooms, peeling cinnamon bark, and brilliant fall color. A Tennessee classic.",
      type: "one_time_purchase",
      price: "28.00",
      imageUrl: "https://images.unsplash.com/photo-1595351298020-038700609878?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "medium",
      sunlightNeeds: "partial",
      isNative: true,
      stock: 25
    });

    await storage.createProduct({
      name: "Golden Pothos",
      description: "The ultimate indoor survivor. Trailing vines with heart-shaped golden-green leaves that purify air and look stunning on shelves.",
      type: "one_time_purchase",
      price: "22.00",
      imageUrl: "https://images.unsplash.com/photo-1585687433353-8f3b56c8c4a1?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "low",
      sunlightNeeds: "low",
      isNative: false,
      stock: 80
    });

    await storage.createProduct({
      name: "ZZ Plant",
      description: "Nearly indestructible indoor plant with glossy, waxy leaves that thrive in low light. Perfect for any room in your Airbnb.",
      type: "one_time_purchase",
      price: "35.00",
      imageUrl: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "low",
      sunlightNeeds: "low",
      isNative: false,
      stock: 50
    });

    await storage.createProduct({
      name: "Snake Plant",
      description: "Architectural indoor plant with upright sword-like leaves banded in green and gold. Tolerates neglect and purifies air. Note: toxic to dogs if ingested.",
      type: "one_time_purchase",
      price: "28.00",
      imageUrl: "https://images.unsplash.com/photo-1599598425947-5202edd56fdb?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "low",
      sunlightNeeds: "low",
      isNative: false,
      stock: 70
    });

    await storage.createProduct({
      name: "Peace Lily",
      description: "Elegant indoor plant with deep green leaves and graceful white blooms. Thrives in shade and signals when it needs water by gently drooping.",
      type: "one_time_purchase",
      price: "24.00",
      imageUrl: "https://images.unsplash.com/photo-1593691509543-c55fb32e9ce8?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "low",
      sunlightNeeds: "low",
      isNative: false,
      stock: 55
    });

    await storage.createProduct({
      name: "Chinese Evergreen",
      description: "Vibrant indoor plant with patterned leaves in green, silver, and pink. Extremely adaptable and one of the best plants for low-light spaces.",
      type: "one_time_purchase",
      price: "26.00",
      imageUrl: "https://images.unsplash.com/photo-1596547609652-9cf5d8c10616?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "low",
      sunlightNeeds: "low",
      isNative: false,
      stock: 45
    });

    await storage.createProduct({
      name: "Cast Iron Plant",
      description: "The toughest houseplant around — survives low light, infrequent watering, and temperature swings. Dark glossy leaves add understated elegance.",
      type: "one_time_purchase",
      price: "30.00",
      imageUrl: "https://images.unsplash.com/photo-1601985705806-5b9a10234c27?q=80&w=1000&auto=format&fit=crop",
      maintenanceLevel: "low",
      sunlightNeeds: "low",
      isNative: false,
      stock: 30
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Raw body parser for Stripe webhook (must come before JSON middleware)
  app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));

  // Setup Auth FIRST
  await setupAuth(app);
  attachUserToRequest(app);
  registerAuthRoutes(app);
  registerStripeRoutes(app);

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
