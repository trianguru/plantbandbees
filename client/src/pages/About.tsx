import { Navigation } from "@/components/Navigation";
import { Leaf, MapPin, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />
      
      <main className="pb-20">
        {/* Hero */}
        <div className="bg-primary py-20 text-primary-foreground">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Growing in Knoxville</h1>
            <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              We help Airbnb hosts create unforgettable, green spaces without the hassle of maintenance.
            </p>
          </div>
        </div>

        <div className="container max-w-4xl mx-auto px-4 py-16 space-y-20">
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold mb-4 text-foreground">Our Story</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                PlantBandBees started when we realized that short-term rental hosts love the look of plants but hate the reality of caring for them between guests.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Based right here in Knoxville, TN, we specialize in high-quality, resilient plants that thrive in our local climate. Our subscription service ensures your listing always looks magazine-ready.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl rotate-3 hover:rotate-0 transition-all duration-500">
              {/* Unsplash: Person caring for plants */}
              <img 
                src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=800&auto=format&fit=crop" 
                alt="Gardener caring for plants"
                className="w-full h-auto"
              />
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-8">
             <div className="text-center p-6 bg-secondary/30 rounded-2xl">
               <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
               <h3 className="font-display text-xl font-bold mb-2">Locally Rooted</h3>
               <p className="text-muted-foreground">Serving Knoxville and surrounding areas exclusively.</p>
             </div>
             <div className="text-center p-6 bg-secondary/30 rounded-2xl">
               <Leaf className="w-12 h-12 text-primary mx-auto mb-4" />
               <h3 className="font-display text-xl font-bold mb-2">Native Focus</h3>
               <p className="text-muted-foreground">Promoting Tennessee's natural biodiversity in your home.</p>
             </div>
             <div className="text-center p-6 bg-secondary/30 rounded-2xl">
               <Heart className="w-12 h-12 text-destructive/70 mx-auto mb-4" />
               <h3 className="font-display text-xl font-bold mb-2">Host First</h3>
               <p className="text-muted-foreground">Designed specifically for the hospitality workflow.</p>
             </div>
          </section>
        </div>
      </main>
    </div>
  );
}
