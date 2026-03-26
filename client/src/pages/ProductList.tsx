import { Navigation } from "@/components/Navigation";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";

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

        {/* Pet toxicity disclaimer */}
        <div className="mt-16 flex gap-3 items-start bg-orange-50 border border-orange-200 rounded-2xl p-5 max-w-3xl mx-auto">
          <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <div className="text-sm text-orange-900">
            <p className="font-semibold mb-1">Pet Safety Notice</p>
            <p className="text-orange-800/80 leading-relaxed">
              Some plants in our catalog are toxic to cats, dogs, or other animals if ingested. Plants marked with a warning badge should be placed out of reach of pets. When in doubt, consult the{" "}
              <a
                href="https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium hover:text-orange-700"
              >
                ASPCA Toxic Plant List
              </a>{" "}
              or your veterinarian before purchasing. We're happy to recommend pet-safe alternatives — just ask!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
