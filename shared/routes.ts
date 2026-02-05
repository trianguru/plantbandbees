import { z } from 'zod';
import { insertProductSchema, insertSubscriptionSchema, insertOrderSchema, insertWaitlistSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  products: {
    list: {
      method: 'GET' as const,
      path: '/api/products',
      responses: {
        200: z.array(z.any()), // Using any to avoid circular dependency issues in routes definition if using typeof products.$inferSelect directly here without proper setup
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/products/:id',
      responses: {
        200: z.any(),
        404: errorSchemas.notFound,
      },
    },
  },
  subscriptions: {
    list: {
      method: 'GET' as const,
      path: '/api/subscriptions',
      responses: {
        200: z.array(z.any()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/subscriptions',
      input: insertSubscriptionSchema.omit({ userId: true, status: true, nextBillingDate: true }),
      responses: {
        201: z.any(),
        400: errorSchemas.validation,
      },
    },
    cancel: {
      method: 'POST' as const,
      path: '/api/subscriptions/:id/cancel',
      responses: {
        200: z.any(),
        404: errorSchemas.notFound,
      },
    },
  },
  orders: {
    create: {
      method: 'POST' as const,
      path: '/api/orders',
      input: z.object({
        items: z.array(z.object({
          productId: z.number(),
          quantity: z.number().min(1),
        })),
      }),
      responses: {
        201: z.any(), // Returns order with items
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/orders',
      responses: {
        200: z.array(z.any()),
      },
    },
  },
  waitlist: {
    create: {
      method: 'POST' as const,
      path: '/api/waitlist',
      input: insertWaitlistSchema,
      responses: {
        201: z.object({ message: z.string(), id: z.number() }),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
