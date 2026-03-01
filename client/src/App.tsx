import { Switch, Route } from "wouter";
import Catalogue from "@/pages/Catalogue";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProductList from "@/pages/ProductList";
import Cart from "@/pages/Cart";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
import WaitlistSuccess from "@/pages/WaitlistSuccess";
import Catalogue from "@/pages/Catalogue";




function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
        <Route path="/catalogue" component={Catalogue} />
      <Route path="/products" component={ProductList} />
      <Route path="/subscriptions" component={ProductList} /> {/* Reuse list with filters */}
      <Route path="/cart" component={Cart} />
      <Route path="/dashboard" component={Dashboard} />
        <Route path="/catalogue" component={Catalogue} />
      <Route path="/about" component={About} />
      <Route path="/waitlist/success" component={WaitlistSuccess} />
      <Route component={NotFound} />
    </Switch>
  );
}




function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
