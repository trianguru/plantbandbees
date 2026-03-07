import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Leaf, ShieldCheck, Truck, Star, Sparkles } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: products, isLoading } = useProducts();
  const featuredSubscriptions = products?.filter(p => p.type === 'subscription_tier').slice(0, 3);

  // Sticky reminder banner — shows after user scrolls past hero
  const [showStickyReminder, setShowStickyReminder] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyReminder(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />

      {/* WAITLIST BANNER - TODO: Add "general area/neighborhood" field to Google Form */}
      <section id="waitlist" className="bg-gradient-to-br from-[#2d5a27] via-[#3d7a3a] to-[#4a7c3f] text-white py-3 md:py-4">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 animate-pulse text-yellow-300" />
              <span className="font-bold text-base md:text-lg">
                🌿 Now Accepting Early Signups — Be First on the List!
              </span>
            </div>
            <a
              href="#google-waitlist-form"
              className="text-sm md:text-base bg-yellow-400 text-green-900 font-bold px-4 py-1.5 rounded-full hover:bg-yellow-300 transition-colors"
            >
              Join the Waitlist ↓
            </a>
          </div>
        </div>
      </section>

      {/* STICKY BOTTOM REMINDER BANNER — appears after scrolling */}
      {showStickyReminder && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a3a17] text-white py-3 px-4 shadow-2xl border-t-2 border-yellow-400 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center animate-in slide-in-from-bottom-2 duration-300">
          <span className="text-sm md:text-base font-semibold">
            🐝 Don't leave before signing up on our waitlist at the bottom!
          </span>
          <a
            href="#google-waitlist-form"
            className="text-sm bg-yellow-400 text-green-900 font-bold px-4 py-1.5 rounded-full hover:bg-yellow-300 transition-colors whitespace-nowrap"
          >
            Take me there ↓
          </a>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left-8 fade-in duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                <Leaf className="w-4 h-4" />
                <span>Exclusively for Knoxville Airbnb Hosts</span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] text-foreground">
                Local Roots, <br />
                <span className="text-primary italic">Global Guests</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Premium, maintenance-free plant subscriptions designed for your short-term rentals. We water, feed, and replace—so you don't have to.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/subscriptions">
                  <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 rounded-xl">
                    View Subscriptions
                  </Button>
                </Link>
                <a href="#google-waitlist-form">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 border-primary text-primary hover:bg-primary/10 rounded-xl">
                    Join Waitlist 🐝
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative animate-in slide-in-from-right-8 fade-in duration-1000 delay-200">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl opacity-60 -z-10" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1200&auto=format&fit=crop"
                  alt="Beautiful Airbnb living room with plants"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-border/50 max-w-[200px] hidden md:block animate-bounce duration-[3000ms]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground">Trusted by 50+ local hosts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Why Choose PlantB & Bees?</h2>
            <p className="text-muted-foreground text-lg">We understand the unique needs of Knoxville hosts. Let us handle the greenery while you handle the guests.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-10 h-10 text-primary" />,
                title: "Zero Maintenance",
                description: "Our team visits monthly to water, prune, and feed. If a plant looks sad, we swap it out for free."
              },
              {
                icon: <Leaf className="w-10 h-10 text-accent" />,
                title: "Tennessee Native Options",
                description: "Showcase the beauty of the Smoky Mountains with our curated selection of hardy native plants."
              },
              {
                icon: <Truck className="w-10 h-10 text-blue-500" />,
                title: "Flexible Delivery",
                description: "We coordinate with your turnover schedule to ensure we're in and out between guests."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-green-900 hover:bg-green-800 transition-colors border border-green-700">
                <div className="mb-6 p-4 bg-green-800 rounded-2xl w-fit shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-yellow-300">{feature.title}</h3>
                <p className="text-green-100 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plans */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-4xl font-bold mb-2">Popular Subscriptions</h2>
              <p className="text-muted-foreground">Plans tailored for every space size.</p>
            </div>
            <Link href="/subscriptions">
              <Button variant="ghost" className="hidden md:flex gap-2">
                View all plans <Leaf className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-[400px] rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredSubscriptions?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="mt-8 md:hidden">
            <Link href="/subscriptions">
              <Button className="w-full" variant="outline">View all plans</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* GOOGLE FORM WAITLIST SECTION */}
      <section id="google-waitlist-form" className="py-16 md:py-24 bg-gradient-to-b from-[#f0f7ee] to-white">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2d5a27]/10 text-[#2d5a27] text-sm font-medium border border-[#2d5a27]/20 mb-4">
              <Star className="w-4 h-4 fill-[#2d5a27]" />
              <span>Spring 2026 Launch — Limited Spots Available</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-[#1a3a17]">
              🌱 Join the Waitlist
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Be among the first Knoxville hosts to bring beautiful, maintenance-free plants into your rental. Early members get priority scheduling and exclusive launch pricing.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl border border-[#2d5a27]/10 overflow-hidden">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSe2Y3nBgOGzfdtd0KBW5MOfbeuSaJ7Nekqi_arSSJ3uYnpc6g/viewform?embedded=true"
              width="100%"
              height="1200"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="PlantBandBees Waitlist Signup"
              className="w-full"
            >
              Loading…
            </iframe>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            🔒 Your information is private and will never be shared or sold.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a3a17] text-white py-16">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 font-display text-2xl font-bold mb-6">
                <Leaf className="h-8 w-8 text-yellow-400" />
                PlantB & Bees
              </div>
              <p className="text-white/80 max-w-md mb-8">
                Bringing life to short-term rentals across East Tennessee.
                Locally owned and operated in Knoxville.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Shop</h4>
              <ul className="space-y-3">
                <li><Link href="/subscriptions" className="hover:text-yellow-400 transition-colors">Subscriptions</Link></li>
                <li><Link href="/products" className="hover:text-yellow-400 transition-colors">One-Time Purchase</Link></li>
                <li><Link href="/gifts" className="hover:text-yellow-400 transition-colors">Guest Gifts</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="hover:text-yellow-400 transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link></li>
                <li><Link href="/api/login" className="hover:text-yellow-400 transition-colors">Host Login</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm text-white/60">
            © {new Date().getFullYear()} PlantB & Bees. All rights reserved. Built with 🌿 in Knoxville, TN
          </div>
        </div>
      </footer>
    </div>
  );
}
