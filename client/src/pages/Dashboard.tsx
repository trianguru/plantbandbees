import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/hooks/use-auth";
import { useSubscriptions, useCancelSubscription } from "@/hooks/use-subscriptions";
import { useOrders } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package, Calendar, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const { data: subscriptions, isLoading: subsLoading } = useSubscriptions();
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const { mutate: cancelSubscription } = useCancelSubscription();
  const { toast } = useToast();

  const handleCancel = (id: number) => {
    if (confirm("Are you sure you want to cancel this subscription?")) {
      cancelSubscription(id, {
        onSuccess: () => {
          toast({ title: "Subscription Cancelled", description: "We're sorry to see you go." });
        },
        onError: () => {
          toast({ title: "Error", description: "Could not cancel subscription.", variant: "destructive" });
        }
      });
    }
  };

  if (authLoading || subsLoading || ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <div className="text-center pt-20">Please log in.</div>;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />

      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold mb-2">Welcome back, {user.firstName || 'Host'}!</h1>
          <p className="opacity-80">Manage your plant subscriptions and orders here.</p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Active Subscriptions */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Your Active Plans
              </h2>
              
              <div className="space-y-4">
                {subscriptions && subscriptions.length > 0 ? (
                  subscriptions.map(sub => (
                    <div key={sub.id} className="bg-white rounded-2xl p-6 shadow-sm border border-border flex flex-col sm:flex-row gap-6 items-start">
                      <div className="w-20 h-20 rounded-xl bg-secondary flex-shrink-0 overflow-hidden">
                        {/* Placeholder or real product image if joined */}
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <LeafIcon />
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">Subscription #{sub.id}</h3>
                          <Badge variant={sub.status === 'active' ? 'default' : 'secondary'}>
                            {sub.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          Started on: {new Date(sub.startDate!).toLocaleDateString()}
                        </p>
                        
                        {sub.status === 'active' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-destructive border-destructive/20 hover:bg-destructive/10"
                            onClick={() => handleCancel(sub.id)}
                          >
                            Cancel Subscription
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-2xl p-8 text-center border border-border/50">
                    <p className="text-muted-foreground mb-4">You don't have any active plant subscriptions.</p>
                    <Link href="/subscriptions">
                      <Button>Browse Plans</Button>
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* Order History */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-accent" />
                Order History
              </h2>
              
              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                {orders && orders.length > 0 ? (
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/30">
                      <tr>
                        <th className="p-4 text-left font-medium">Order ID</th>
                        <th className="p-4 text-left font-medium">Date</th>
                        <th className="p-4 text-left font-medium">Status</th>
                        <th className="p-4 text-right font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-secondary/10">
                          <td className="p-4 font-medium">#{order.id}</td>
                          <td className="p-4 text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="text-xs uppercase">
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-right font-medium">${order.totalAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    No past orders found.
                  </div>
                )}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-primary" />
                Need Help?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Have a sick plant or need to reschedule maintenance?
              </p>
              <Button variant="outline" className="w-full">Contact Support</Button>
            </div>
            
            <div className="bg-accent/10 rounded-2xl p-6 border border-accent/20">
              <h3 className="font-bold text-accent-foreground mb-2">Refer a Host</h3>
              <p className="text-sm text-accent-foreground/80 mb-4">
                Get a free month of maintenance when you refer another Knoxville Airbnb host.
              </p>
              <Button className="w-full bg-accent text-white hover:bg-accent/90">Get Referral Link</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function LeafIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
  )
}
