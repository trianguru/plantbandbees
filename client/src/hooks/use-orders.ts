import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

const orderItemSchema = z.object({
  id: z.number(),
  productId: z.number(),
  quantity: z.number(),
  priceAtPurchase: z.string(),
});

const orderSchema = z.object({
  id: z.number(),
  userId: z.string(),
  totalAmount: z.string(),
  status: z.string(),
  createdAt: z.string(),
  items: z.array(orderItemSchema).optional(),
});

export type Order = z.infer<typeof orderSchema>;

export function useOrders() {
  return useQuery({
    queryKey: [api.orders.list.path],
    queryFn: async () => {
      const res = await fetch(api.orders.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      return z.array(orderSchema).parse(data);
    },
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (items: { productId: number; quantity: number }[]) => {
      const res = await fetch(api.orders.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create order");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.orders.list.path] });
    },
  });
}
