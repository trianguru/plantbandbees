import { products, subscriptions, orders, orderItems, waitlistSignups, type Product, type InsertProduct, type Subscription, type InsertSubscription, type Order, type InsertOrder, type OrderItem, type InsertOrderItem, type WaitlistSignup, type InsertWaitlistSignup } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { authStorage, type IAuthStorage } from "./replit_integrations/auth/storage";

export interface IStorage extends IAuthStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Subscriptions
  getSubscriptions(userId: string): Promise<(Subscription & { product: Product })[]>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  cancelSubscription(id: number): Promise<Subscription | undefined>;

  // Orders
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  getOrders(userId: string): Promise<(Order & { items: (OrderItem & { product: Product })[] })[]>;

  // Waitlist
  createWaitlistSignup(signup: InsertWaitlistSignup): Promise<WaitlistSignup>;
  getWaitlistSignups(): Promise<WaitlistSignup[]>;

  // Stripe helpers
  getSubscriptionByStripeId(stripeSubId: string): Promise<Subscription | undefined>;
  updateSubscriptionByStripeId(stripeSubId: string, data: Partial<InsertSubscription>): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Auth methods delegated to authStorage
  getUser = authStorage.getUser.bind(authStorage);
  getUserByEmail = authStorage.getUserByEmail.bind(authStorage);
  getUserByResetToken = authStorage.getUserByResetToken.bind(authStorage);
  upsertUser = authStorage.upsertUser.bind(authStorage);
  updateUser = authStorage.updateUser.bind(authStorage);
  setResetToken = authStorage.setResetToken.bind(authStorage);
  setStripeCustomerId = authStorage.setStripeCustomerId.bind(authStorage);

  // Products
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  // Subscriptions
  async getSubscriptions(userId: string): Promise<(Subscription & { product: Product })[]> {
    const result = await db.select({
      subscription: subscriptions,
      product: products,
    })
    .from(subscriptions)
    .innerJoin(products, eq(subscriptions.productId, products.id))
    .where(eq(subscriptions.userId, userId));
    
    return result.map(row => ({
      ...row.subscription,
      product: row.product
    }));
  }

  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const [newSubscription] = await db.insert(subscriptions).values(subscription).returning();
    return newSubscription;
  }

  async cancelSubscription(id: number): Promise<Subscription | undefined> {
    const [updated] = await db.update(subscriptions)
      .set({ status: 'cancelled' })
      .where(eq(subscriptions.id, id))
      .returning();
    return updated;
  }

  // Orders
  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    // Transaction ideally, but keeping it simple for now
    const [newOrder] = await db.insert(orders).values(order).returning();
    
    const itemsWithOrderId = items.map(item => ({
      ...item,
      orderId: newOrder.id,
    }));
    
    if (itemsWithOrderId.length > 0) {
      await db.insert(orderItems).values(itemsWithOrderId);
    }
    
    return newOrder;
  }

  async getOrders(userId: string): Promise<(Order & { items: (OrderItem & { product: Product })[] })[]> {
    const userOrders = await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));

    const ordersWithItems = await Promise.all(userOrders.map(async (order) => {
      const items = await db.select({
        orderItem: orderItems,
        product: products,
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, order.id));

      return {
        ...order,
        items: items.map(i => ({ ...i.orderItem, product: i.product })),
      };
    }));

    return ordersWithItems;
  }

  // Waitlist
  async createWaitlistSignup(signup: InsertWaitlistSignup): Promise<WaitlistSignup> {
    const [newSignup] = await db.insert(waitlistSignups).values(signup).returning();
    return newSignup;
  }

  async getWaitlistSignups(): Promise<WaitlistSignup[]> {
    return await db.select().from(waitlistSignups).orderBy(desc(waitlistSignups.createdAt));
  }

  async getSubscriptionByStripeId(stripeSubId: string): Promise<Subscription | undefined> {
    const [sub] = await db.select().from(subscriptions).where(eq(subscriptions.stripeSubscriptionId, stripeSubId));
    return sub;
  }

  async updateSubscriptionByStripeId(stripeSubId: string, data: Partial<InsertSubscription>): Promise<void> {
    await db.update(subscriptions).set(data).where(eq(subscriptions.stripeSubscriptionId, stripeSubId));
  }
}

export const storage = new DatabaseStorage();
