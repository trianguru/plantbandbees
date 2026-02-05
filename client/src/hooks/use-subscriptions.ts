import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

const subscriptionSchema = z.object({
  id: z.number(),
  userId: z.string(),
  productId: z.number(),
  status: z.enum(['active', 'cancelled', 'past_due']),
  startDate: z.string().nullable(), // timestamp as string
  nextBillingDate: z.string().nullable(),
  product: z.object({ // Joined relation
    name: z.string(),
    price: z.string(),
    imageUrl: z.string(),
  }).optional(),
});

export type Subscription = z.infer<typeof subscriptionSchema>;

export function useSubscriptions() {
  return useQuery({
    queryKey: [api.subscriptions.list.path],
    queryFn: async () => {
      const res = await fetch(api.subscriptions.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch subscriptions");
      const data = await res.json();
      // Note: Backend might return raw data or joined data. 
      // This schema assumes backend is handling joins or we'd need to fetch products separately.
      // For now we trust the API response matches expectation or adjust backend later.
      return z.array(subscriptionSchema).safeParse(data).data || [];
    },
  });
}

export function useCreateSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: number) => {
      const res = await fetch(api.subscriptions.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create subscription");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.subscriptions.list.path] });
    },
  });
}

export function useCancelSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.subscriptions.cancel.path, { id });
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to cancel subscription");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.subscriptions.list.path] });
    },
  });
}
