import { Navigation } from "@/components/Navigation";
import { Leaf, MapPin, Heart, Sprout } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />

      <main className="pb-20">
        {/* Hero */}
        <div className="bg-primary py-20 text-primary-foreground">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              About Air Bloom and Bees
            </h1>
            <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              A company dedicated to helping bee populations thrive while bringing the joy of plants to every space.
            </p>
          </div>
        </div>

        <div className="container max-w-4xl mx-auto px-4 py-16 space-y-20">

          {/* About Us */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold mb-4 text-foreground">About Us</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                Air Bloom and Bees is a company that loves plants and loves taking care of them. We believe greenery makes spaces feel alive, calm, and welcoming — and we love sharing that with hosts and guests alike.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                We're especially dedicated to helping the bee population. Bees are in decline, and every native plant we place is a small step toward giving them the habitat they need to thrive.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From sourcing the right plants to caring for them with attention and heart, our mission is simple: grow beautiful spaces, and grow the future of pollinators along the way.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl bg-secondary/20 flex items-center justify-center p-12">
              <Sprout className="w-32 h-32 text-primary" />
            </div>
          </section>

          {/* Values */}
          <section className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-secondary/30 rounded-2xl">
              <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">Locally Rooted</h3>
              <p className="text-muted-foreground">
                Born and based in East Tennessee. We know this land, this climate, and the plants that belong here.
              </p>
            </div>
            <div className="text-center p-6 bg-secondary/30 rounded-2xl">
              <Leaf className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">Rooted in Biophilia</h3>
              <p className="text-muted-foreground">
                Biophilia is the human instinct to connect with living systems. Plants lower cortisol, reduce blood pressure, and produce calm that no man-made object can replicate. We're not decorating — we're designing for something deeper.
              </p>
            </div>
            <div className="text-center p-6 bg-secondary/30 rounded-2xl">
              <Heart className="w-12 h-12 text-destructive/70 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">Conservation First</h3>
              <p className="text-muted-foreground">
                The subscription funds the mission. Every client means another pollinator garden. Every garden is a piece of East Tennessee given back.
              </p>
            </div>
          </section>

          {/* The Bees */}
          <section className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 rounded-3xl p-10">
            <div className="text-center mb-6">
              <span className="text-5xl">🐝</span>
            </div>
            <h2 className="font-display text-3xl font-bold mb-4 text-foreground text-center">
              The Bees Are the Mission
            </h2>
            <div className="max-w-2xl mx-auto space-y-5">
              <p className="text-muted-foreground text-lg leading-relaxed text-center">
                The name isn't decorative. The bees are why we exist.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Bees are nature's matchmakers. They carry pollen — the reproductive material of plants — from flower to flower, enabling life to propagate across East Tennessee's extraordinarily biodiverse landscape. More than 500 native plant species call this region home. Most of them depend on pollinators to survive. In 2024–2025, U.S. managed honeybee colonies declined by over 40%. Wild native species are faring even worse. That's not a trend. That's an emergency.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                So here's our commitment: every host who subscribes gets a free native pollinator garden installed on their property. Coneflowers, wild indigo, river oats, coral bells — plants the bees love, and that Tennessee's soil has always known how to grow. We don't promise to maintain it forever. We plant it right, using species that belong here, so that nature can take over. We get them started. After that, they belong to the land.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The subscription service is how we fund this. Every client means another pollinator garden. Every garden means more habitat. The bees find it — they always do — and when they do, we leave a small handcrafted plaque at the property that reads:
              </p>
              <blockquote className="border-l-4 border-amber-400 pl-6 py-2 italic text-foreground text-lg">
                "You've been officially declared the Bee's Knees."
                <br />
                <span className="text-sm not-italic text-muted-foreground mt-2 block">
                  Godspeed. Signed, with their knees — the Bees.
                </span>
              </blockquote>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We think that's worth something.
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
