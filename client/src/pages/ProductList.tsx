import { Navigation } from "@/components/Navigation";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function ProductList() {
  const { data: products, isLoading } = useProducts();
  const [filter, setFilter] = useState<'all' | 'subscription' | 'one-time'>('all');

  const filteredProducts = products?.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'subscription') return p.type === 'subscription_tier';
    return p.type === 'one_time_purchase';
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground">Our Collection</h1>
            <p className="text-muted-foreground mt-2">Curated plants for Knoxville homes and rentals.</p>
          </div>

          <div className="flex gap-2 p-1 bg-secondary rounded-xl">
            <Button 
              variant={filter === 'all' ? 'default' : 'ghost'} 
              onClick={() => setFilter('all')}
              className="rounded-lg"
            >
              All
            </Button>
            <Button 
              variant={filter === 'subscription' ? 'default' : 'ghost'} 
              onClick={() => setFilter('subscription')}
              className="rounded-lg"
            >
              Subscriptions
            </Button>
            <Button 
              variant={filter === 'one-time' ? 'default' : 'ghost'} 
              onClick={() => setFilter('one-time')}
              className="rounded-lg"
            >
              One-Time Buy
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && filteredProducts?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No products found in this category.
          </div>
        )}
      </main>
    </div>
  );
}
