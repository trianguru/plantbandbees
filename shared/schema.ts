import { pgTable, text, integer, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations, sql } from "drizzle-orm";

export * from "./models/auth";
import { users } from "./models/auth";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'subscription_tier' | 'one_time_purchase'
  price: text("price").notNull(), // Store as text for precision
  imageUrl: text("image_url").notNull(),
  stock: integer("stock").default(0),
  maintenanceLevel: text("maintenance_level"), // 'low', 'medium', 'high'
  sunlightNeeds: text("sunlight_needs"), // 'low', 'partial', 'direct'
  isNative: boolean("is_native").default(false),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  productId: integer("product_id").notNull().references(() => products.id),
  status: text("status").notNull().default("active"), // 'active', 'cancelled', 'past_due'
  startDate: timestamp("start_date").defaultNow(),
  nextBillingDate: timestamp("next_billing_date"),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  totalAmount: text("total_amount").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'paid', 'delivered'
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  productId: integer("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull(),
  priceAtPurchase: text("price_at_purchase").notNull(),
});

export const waitlistSignups = pgTable("waitlist_signups", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone"),
  propertyCount: integer("property_count"),
  serviceInterest: text("service_interest"), // 'one-time' | 'subscription' | 'both'
  source: text("source"), // 'google-ad' | 'facebook-ad' | 'instagram-ad' | 'organic'
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const productsRelations = relations(products, ({ many }) => ({
  subscriptions: many(subscriptions),
  orderItems: many(orderItems),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [subscriptions.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

// Schemas
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({ id: true, startDate: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
export const insertOrderItemSchema = createInsertSchema(orderItems).omit({ id: true });
export const insertWaitlistSchema = createInsertSchema(waitlistSignups).omit({ id: true, createdAt: true });

// Types
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type WaitlistSignup = typeof waitlistSignups.$inferSelect;
export type InsertWaitlistSignup = z.infer<typeof insertWaitlistSchema>;
