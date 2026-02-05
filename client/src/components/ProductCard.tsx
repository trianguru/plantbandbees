import { Product } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useCreateSubscription } from "@/hooks/use-subscriptions";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Droplets, Sun, Sparkles, ShoppingCart } from "lucide-react";
import { useLocation } from "wouter";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { mutate: createSubscription, isPending } = useCreateSubscription();
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

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

  const handleSubscribe = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to subscribe to a plan.",
        variant: "destructive",
      });
      setLocation("/api/login");
      return;
    }
    createSubscription(product.id, {
      onSuccess: () => {
        toast({
          title: "Subscription Started!",
          description: `You have successfully subscribed to ${product.name}.`,
        });
        setLocation("/dashboard");
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="aspect-[4/3] overflow-hidden relative bg-secondary/20">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isNative && (
          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm backdrop-blur-sm">
            Tennessee Native
          </Badge>
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
          <Button 
            onClick={handleSubscribe} 
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
          >
            {isPending ? "Starting..." : "Subscribe Now"}
          </Button>
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
