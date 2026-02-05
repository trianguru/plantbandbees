import { Navigation } from "@/components/Navigation";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCreateOrder } from "@/hooks/use-orders";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { toast } = useToast();
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to complete your purchase.",
        variant: "destructive"
      });
      setLocation("/api/login");
      return;
    }

    const orderItems = items.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }));

    createOrder(orderItems, {
      onSuccess: () => {
        toast({
          title: "Order Placed!",
          description: "Thank you for your purchase.",
        });
        clearCart();
        setLocation("/dashboard");
      },
      onError: (err) => {
        toast({
          title: "Checkout Failed",
          description: err.message,
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-display text-3xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-secondary/20 rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground mb-4">Your cart is empty.</p>
            <Button onClick={() => setLocation("/products")}>Start Shopping</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4 p-4 bg-white rounded-xl border border-border/50 shadow-sm">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-foreground">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.productId)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-primary">${item.price}</p>
                      <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-white rounded-md transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 hover:bg-white rounded-md transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="h-fit p-6 bg-white rounded-2xl border border-border shadow-lg">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>${total().toFixed(2)}</span>
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleCheckout}
                disabled={isPending}
              >
                {isPending ? "Processing..." : (
                  <span className="flex items-center gap-2">
                    Checkout <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
