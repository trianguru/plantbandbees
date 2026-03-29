import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingBag, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export function Navigation() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dark mode — persists across sessions via localStorage
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const links = [
    { href: "/products", label: "Shop Plants" },
    { href: "/subscriptions", label: "Subscriptions" },
    { href: "/pollinator-garden", label: "🐝 Pollinator Garden" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "Why Air Bloom and Bees" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/logo.jpg" alt="Air Bloom and Bees" className="h-10 w-auto" />
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
        <div className="flex items-center gap-2 md:gap-4">

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Cart */}
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
              <Link href="/auth">
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
                {/* Dark mode toggle in mobile menu too */}
                <button
                  onClick={() => { setIsDark(!isDark); setMobileMenuOpen(false); }}
                  className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors text-left"
                >
                  {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
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
                  <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
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
