import { Navigation } from "@/components/Navigation";
import { Leaf, MapPin, Heart } from "lucide-react";

const team = [
  {
        name: "Trey Sides",
        fullName: "William Hill Sides III",
        title: "CEO & Co-Founder",
        bio: "The older of the two by four years, Trey is the vision behind Air Bloom and Bees. A lifelong plant enthusiast and East Tennessee native, he saw what the short-term rental industry was missing before most hosts even knew to look for it.",
        image: "/trey-sides.jpg",
  },
  {
        name: "Zachary Sides",
        fullName: "Zachary D. Sides",
        title: "Chief Operations Manager & Co-Founder",
        bio: "Zach keeps the whole operation moving — from plant sourcing and delivery logistics to host relationships and the ongoing mission of getting bee-friendly plants into every property we touch.",
        image: "/zac-sides.jpg",
  },
  ];

export default function About() {
    return (
          <div className="min-h-screen bg-background font-sans">
                <Navigation />
          
                <main className="pb-20">
                  {/* Hero */}
                        <div className="bg-primary py-20 text-primary-foreground">
                                  <div className="container max-w-4xl mx-auto px-4 text-center">
                                              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                                                            Growing in East Tennessee
                                              </h1>
                                              <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
                                                            Two brothers, a deep love of plants, a soft spot for bees, and a conviction that
                                                            the spaces we rest in should feel genuinely alive.
                                              </p>
                                  </div>
                        </div>
                
                        <div className="container max-w-4xl mx-auto px-4 py-16 space-y-20">
                        
                          {/* Origin Story */}
                                  <section className="grid md:grid-cols-2 gap-12 items-center">
                                              <div>
                                                            <h2 className="font-display text-3xl font-bold mb-4 text-foreground">Our Story</h2>
                                                            <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                                                                            We're Trey and Zach Sides — brothers raised in East Tennessee with dirt under our
                                                                            fingernails and a genuine love for the kind of greenery that makes a room feel
                                                                            like it's breathing.
                                                            </p>
                                                            <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                                                                            The Great Smoky Mountains National Park is the most visited national park in the
                                                                            country — over 14 million people pass through every year. Tens of thousands of
                                                                            short-term rental hosts across East Tennessee compete for their stays. Hosts have
                                                                            cleaning crews, linen services, landscapers. But nobody was doing plants well.
                                                                            And we knew — because the research is clear — that plants do something no throw
                                                                            pillow or mood lamp can. They soothe people. Subconsciously, biologically, deeply.
                                                                            Travelers carry stress they don't even recognize, and a thoughtfully planted space
                                                                            meets them at the door differently.
                                                            </p>
                                                            <p className="text-muted-foreground text-lg leading-relaxed">
                                                                            But the real reason we started this — the reason we get up — is the bees. The
                                                                            subscription service funds the mission. The mission is conservation. Every host
                                                                            we serve gets a free native pollinator garden. Every garden is a small piece of
                                                                            East Tennessee given back to the ecosystem that built it. That's Air Bloom and Bees.
                                                            </p>
                                              </div>
                                              <div className="rounded-3xl overflow-hidden shadow-xl rotate-3 hover:rotate-0 transition-all duration-500">
                                                            <img
                                                                              src="/trey-and-zac.jpg"
                                                                              alt="Trey and Zach Sides, co-founders of Air Bloom and Bees"
                                                                              className="w-full h-auto object-cover"
                                                                            />
                                              </div>
                                  </section>
                        
                          {/* Values */}
                                  <section className="grid md:grid-cols-3 gap-8">
                                              <div className="text-center p-6 bg-secondary/30 rounded-2xl">
                                                            <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                                                            <h3 className="font-display text-xl font-bold mb-2">Locally Rooted</h3>
                                                            <p className="text-muted-foreground">
                                                                            Born and based in East Tennessee. We know this land, this climate, and the plants
                                                                            that belong here.
                                                            </p>
                                              </div>
                                              <div className="text-center p-6 bg-secondary/30 rounded-2xl">
                                                            <Leaf className="w-12 h-12 text-primary mx-auto mb-4" />
                                                            <h3 className="font-display text-xl font-bold mb-2">Rooted in Biophilia</h3>
                                                            <p className="text-muted-foreground">
                                                                            Biophilia is the human instinct to connect with living systems. Plants lower cortisol,
                                                                            reduce blood pressure, and produce calm that no man-made object can replicate.
                                                                            We're not decorating — we're designing for something deeper.
                                                            </p>
                                              </div>
                                              <div className="text-center p-6 bg-secondary/30 rounded-2xl">
                                                            <Heart className="w-12 h-12 text-destructive/70 mx-auto mb-4" />
                                                            <h3 className="font-display text-xl font-bold mb-2">Conservation First</h3>
                                                            <p className="text-muted-foreground">
                                                                            The subscription funds the mission. Every client means another pollinator garden.
                                                                            Every garden is a piece of East Tennessee given back.
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
                                                                            Bees are nature's matchmakers. They carry pollen — the reproductive material of
                                                                            plants — from flower to flower, enabling life to propagate across East Tennessee's
                                                                            extraordinarily biodiverse landscape. More than 500 native plant species call this
                                                                            region home. Most of them depend on pollinators to survive. In 2024–2025, U.S.
                                                                            managed honeybee colonies declined by over 40%. Wild native species are faring
                                                                            even worse. That's not a trend. That's an emergency.
                                                            </p>
                                                            <p className="text-muted-foreground text-lg leading-relaxed">
                                                                            So here's our commitment: every host who subscribes gets a free native pollinator
                                                                            garden installed on their property. Coneflowers, wild indigo, river oats, coral
                                                                            bells — plants the bees love, and that Tennessee's soil has always known how to
                                                                            grow. We don't promise to maintain it forever. We plant it right, using species
                                                                            that belong here, so that nature can take over. We get them started. After that,
                                                                            they belong to the land.
                                                            </p>
                                                            <p className="text-muted-foreground text-lg leading-relaxed">
                                                                            The subscription service is how we fund this. Every client means another
                                                                            pollinator garden. Every garden means more habitat. The bees find it — they
                                                                            always do — and when they do, we leave a small handcrafted plaque at the
                                                                            property that reads:
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
                        
                          {/* Team */}
                                  <section>
                                              <h2 className="font-display text-3xl font-bold mb-2 text-foreground text-center">
                                                            The Brothers
                                              </h2>
                                              <p className="text-muted-foreground text-center mb-10">
                                                            Two people who take plants seriously, and bees even more seriously.
                                              </p>
                                              <div className="grid md:grid-cols-2 gap-10 max-w-2xl mx-auto">
                                                {team.map((member) => (
                            <div key={member.fullName} className="text-center">
                                              <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4 shadow-lg ring-4 ring-primary/10">
                                                                  <img
                                                                                          src={member.image}
                                                                                          alt={member.name}
                                                                                          className="w-full h-full object-cover object-top"
                                                                                        />
                                              </div>
                                              <h3 className="font-display text-xl font-bold text-foreground">{member.name}</h3>
                                              <p className="text-xs text-muted-foreground/70 mb-1">{member.fullName}</p>
                                              <p className="text-sm font-medium text-primary mb-3">{member.title}</p>
                                              <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                            </div>
                          ))}
                                              </div>
                                  </section>
                        
                        </div>
                </main>
          </div>
        );
}
