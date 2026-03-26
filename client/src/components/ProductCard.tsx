import { useState } from "react";
import { Product } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Droplets, Sun, Loader2, ShoppingCart, AlertTriangle } from "lucide-react";
import { useLocation } from "wouter";

// Plants with known pet toxicity (source: ASPCA)
// Key = product name, Value = who it affects
const PET_TOXICITY: Record<string, string> = {
  "Golden Pothos":      "toxic to cats & dogs",
  "Snake Plant":        "toxic to cats & dogs",
  "Peace Lily":         "toxic to cats & dogs",
  "ZZ Plant":           "toxic to cats & dogs",
  "Chinese Evergreen":  "toxic to cats & dogs",
  "Oakleaf Hydrangea":  "toxic to cats & dogs",
  "Wild Blue Indigo":   "toxic in large amounts to dogs & horses",
};

// Better plant-specific Unsplash photos (overrides DB imageUrl until real photos are ready)
const PLANT_IMAGES: Record<string, string> = {
  "Knoxville Fern Trio":    "https://images.unsplash.com/photo-1550159930-40066082a4fc?q=80&w=1000&auto=format&fit=crop",
  "Guest Gift Succulent":   "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1000&auto=format&fit=crop",
  "Tennessee Coneflower":   "https://images.unsplash.com/photo-1597945161640-9366e6d4253b?q=80&w=1000&auto=format&fit=crop",
  "River Oats Grass":       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop",
  "Wild Blue Indigo":       "https://images.unsplash.com/photo-1490750967868-88df5691cc7e?q=80&w=1000&auto=format&fit=crop",
  "Coral Bells (Heuchera)": "https://images.unsplash.com/photo-1618522285353-e1a23cb1b3d4?q=80&w=1000&auto=format&fit=crop",
  "Black-Eyed Susan":       "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=1000&auto=format&fit=crop",
  "Oakleaf Hydrangea":      "https://images.unsplash.com/photo-1595351298020-038700609878?q=80&w=1000&auto=format&fit=crop",
  "Golden Pothos":          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1000&auto=format&fit=crop",
  "ZZ Plant":               "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=1000&auto=format&fit=crop",
  "Snake Plant":            "https://images.unsplash.com/photo-1599598425947-5202edd56fdb?q=80&w=1000&auto=format&fit=crop",
  "Peace Lily":             "https://images.unsplash.com/photo-1593691509543-c55fb32e9ce8?q=80&w=1000&auto=format&fit=crop",
  "Chinese Evergreen":      "https://images.unsplash.com/photo-1596547609652-9cf5d8c10616?q=80&w=1000&auto=format&fit=crop",
  "Cast Iron Plant":        "https://images.unsplash.com/photo-1601985705806-5b9a10234c27?q=80&w=1000&auto=format&fit=crop",
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [checkoutPending, setCheckoutPending] = useState(false);
  const imageUrl = PLANT_IMAGES[product.name] ?? product.imageUrl;
  const toxicityWarning = PET_TOXICITY[product.name];

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to subscribe to a plan.",
        variant: "destructive",
      });
      setLocation("/auth");
      return;
    }
    try {
      setCheckoutPending(true);
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: product.id }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to start checkout");
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
      setCheckoutPending(false);
    }
  };

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="aspect-[4/3] overflow-hidden relative bg-secondary/20">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isNative && (
          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm backdrop-blur-sm">
            Tennessee Native
          </Badge>
        )}
        {toxicityWarning && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 bg-orange-50/95 border border-orange-200 text-orange-800 text-[11px] font-medium px-2.5 py-1.5 rounded-lg backdrop-blur-sm">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-orange-500" />
            <span>⚠️ {toxicityWarning}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="font-sans font-bold text-lg text-primary">
            ${product.price}
            {product.type === 'subscription_tier' && <span className="text-xs font-normal text-muted-foreground">/mo</span>}
          </span>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        {/* Features */}
        <div className="flex gap-4 mb-6 text-xs text-muted-foreground">
          {product.sunlightNeeds && (
            <div className="flex items-center gap-1.5" title="Sunlight Needs">
              <Sun className="w-4 h-4 text-accent" />
              <span className="capitalize">{product.sunlightNeeds} Light</span>
            </div>
          )}
          {product.maintenanceLevel && (
            <div className="flex items-center gap-1.5" title="Maintenance Level">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span className="capitalize">{product.maintenanceLevel} Care</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        {product.type === 'subscription_tier' ? (
          <>
          <Button
            onClick={handleSubscribe}
            disabled={checkoutPending}
            className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
          >
            {checkoutPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Redirecting...</> : "Subscribe Now"}
          </Button>
          <p className="text-[11px] text-muted-foreground text-center mt-2 leading-tight">
            Tier subscriptions do not include the initial purchase prices of the plants.
          </p>
          </>
        ) : (
          <Button 
            onClick={handleAddToCart}
            variant="outline"
            className="w-full border-primary/20 hover:border-primary hover:bg-primary/5 hover:text-primary group-hover/btn:bg-primary"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
}
