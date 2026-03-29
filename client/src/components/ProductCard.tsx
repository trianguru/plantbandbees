import { useState, useEffect, useRef } from "react";
import { Product } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Droplets, Sun, Loader2, ShoppingCart, AlertTriangle } from "lucide-react";
import { useLocation } from "wouter";

// Plants with known pet toxicity (source: ASPCA)
const PET_TOXICITY: Record<string, string> = {
  "Golden Pothos":      "toxic to cats & dogs",
  "Snake Plant":        "toxic to cats & dogs",
  "Peace Lily":         "toxic to cats & dogs",
  "ZZ Plant":           "toxic to cats & dogs",
  "Chinese Evergreen":  "toxic to cats & dogs",
  "Oakleaf Hydrangea":  "toxic to cats & dogs",
  "Wild Blue Indigo":   "toxic in large amounts to dogs & horses",
};

// 3 photos per plant — at least 1 indoor context shot
// Sourced from Unsplash (free to use)
const PLANT_IMAGES: Record<string, string[]> = {
  "Golden Pothos": [
    "https://images.unsplash.com/photo-1696457848618-876c47b30cfd?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1679153370246-05e5d28d9fc6?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1763060819480-3261238b402e?q=80&w=1000&auto=format&fit=crop",
  ],
  "Snake Plant": [
    "https://images.unsplash.com/photo-1629576595515-748c71f2ae43?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1668426231244-1827c29ef8e1?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1654124803743-edd84b769425?q=80&w=1000&auto=format&fit=crop",
  ],
  "ZZ Plant": [
    "https://images.unsplash.com/photo-1614887510005-4cec32369b38?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599988288485-534984f5cd21?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1763741186493-509db18f6a6a?q=80&w=1000&auto=format&fit=crop",
  ],
  "Peace Lily": [
    "https://images.unsplash.com/photo-1616690248297-1ec539dd910f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1687858001773-d58b6cec5bdf?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1642049671771-8b22a7152bda?q=80&w=1000&auto=format&fit=crop",
  ],
  "Chinese Evergreen": [
    "https://images.unsplash.com/photo-1610551835289-9f8a81fc3a6c?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1568151492546-1db658d0fc42?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1762963014081-252908ff3396?q=80&w=1000&auto=format&fit=crop",
  ],
  "Cast Iron Plant": [
    "https://images.unsplash.com/photo-1566986422461-b017b2c5d50d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1747774504419-f3faa4954c33?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1714318244386-6d41e5c025d9?q=80&w=1000&auto=format&fit=crop",
  ],
  "Knoxville Fern Trio": [
    "https://images.unsplash.com/photo-1492139059069-0413793f4c1f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1714235416342-1215c48540f1?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1635538700385-e1027f9868a4?q=80&w=1000&auto=format&fit=crop",
  ],
  "Guest Gift Succulent": [
    "https://images.unsplash.com/photo-1621512366232-0b7b78983782?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1727546502530-2a1b0d615cce?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1619578977011-25e9ba052e32?q=80&w=1000&auto=format&fit=crop",
  ],
  "Tennessee Coneflower": [
    "https://images.unsplash.com/photo-1707307553388-aefc810a96fa?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1707307550653-481ef64bb842?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595802130966-8001f9d80846?q=80&w=1000&auto=format&fit=crop",
  ],
  "River Oats Grass": [
    "https://images.unsplash.com/photo-1630936583832-79091f5945de?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1755007398505-bc7b5e2de6ca?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552141838-afa30fcbfa18?q=80&w=1000&auto=format&fit=crop",
  ],
  "Wild Blue Indigo": [
    "https://images.unsplash.com/photo-1704262911785-6abc22d943e2?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1725172316375-f73def163e50?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1668301546224-2fe03d270ab0?q=80&w=1000&auto=format&fit=crop",
  ],
  "Coral Bells (Heuchera)": [
    "https://images.unsplash.com/photo-1572691841164-cb9104505bab?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1624617791095-36673728cccf?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1686604258405-b7367ddc8ab8?q=80&w=1000&auto=format&fit=crop",
  ],
  "Black-Eyed Susan": [
    "https://images.unsplash.com/photo-1602187177421-050769a1cc51?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1624729165583-3a042adcecb3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1708869008609-0db5ea7f8eff?q=80&w=1000&auto=format&fit=crop",
  ],
  "Oakleaf Hydrangea": [
    "https://images.unsplash.com/photo-1688151303530-a572c369534c?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1758993057601-78b7519489b1?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1740811619788-0e29c107e2a3?q=80&w=1000&auto=format&fit=crop",
  ],
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

  // Hover slideshow state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const images = PLANT_IMAGES[product.name] ?? [product.imageUrl];
  const toxicityWarning = PET_TOXICITY[product.name];

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
      }, 1200);
    }
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImageIndex(0);
  };

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
    <div
      className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div className="aspect-[4/3] overflow-hidden relative bg-secondary/20">
        {images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:scale-105 ${
              idx === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex
                    ? "bg-white scale-125 shadow-md"
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

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
