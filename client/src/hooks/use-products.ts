import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

// We need to redefine the shape on frontend since routes use z.any() for simplicity in the manifest provided
// But we want strong typing here.
const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  type: z.enum(['subscription_tier', 'one_time_purchase']),
  price: z.string(), // numeric comes as string from API
  imageUrl: z.string(),
  stock: z.number().optional(),
  maintenanceLevel: z.enum(['low', 'medium', 'high']).optional(),
  sunlightNeeds: z.string().optional(),
  isNative: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;

export function useProducts() {
  return useQuery({
    queryKey: [api.products.list.path],
    queryFn: async () => {
      const res = await fetch(api.products.list.path);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return z.array(productSchema).parse(data);
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch product");
      const data = await res.json();
      return productSchema.parse(data);
    },
    enabled: !!id,
  });
}
