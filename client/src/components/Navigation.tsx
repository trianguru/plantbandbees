import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, ShoppingBag, User as UserIcon, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export function Navigation() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const links = [
    { href: "/products", label: "Shop Plants" },
    { href: "/subscriptions", label: "Subscriptions" },
    { href: "/about", label: "Why Knoxville GreenStay" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary tracking-tight hover:opacity-80 transition-opacity">
          <Leaf className="h-6 w-6 text-primary fill-primary/20" />
          Knoxville GreenStay
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:bg-secondary rounded-full transition-colors">
            <ShoppingBag className="h-5 w-5 text-foreground" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground rounded-full text-[10px]">
                {cartCount}
              </Badge>
            )}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                My Dashboard
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => logout()}
                className="border-primary/20 hover:bg-primary/5 hover:text-primary"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/api/login">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                  Host Login
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                {links.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="h-px bg-border my-2" />
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary">
                      My Dashboard
                    </Link>
                    <Button onClick={() => logout()} variant="outline" className="w-full justify-start">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Link href="/api/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">Host Login</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
