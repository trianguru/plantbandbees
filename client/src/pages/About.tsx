import { Navigation } from "@/components/Navigation";
import { Leaf, MapPin, Heart } from "lucide-react";

const team = [
  {
        name: "Trey Sides",
        fullName: "William Hill Sides III",
        title: "CEO & Co-Founder",
        bio: "The older of the two by four years, Trey is the vision behind PlantB & Bees. A lifelong plant enthusiast and East Tennessee native, he saw what the short-term rental industry was missing before most hosts even knew to look for it.",
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
                                              </h1>h1>
                                              <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
                                                            Two brothers, a deep love of plants, a soft spot for bees, and a conviction that
                                                            the spaces we rest in should feel genuinely alive.
                                              </p>p>
                                  </div>div>
                        </div>div>
                
                        <div className="container max-w-4xl mx-auto px-4 py-16 space-y-20">
                        
                          {/* Origin Story */}
                                  <section className="grid md:grid-cols-2 gap-12 items-center">
                                              <div>
                                                            <h2 className="font-display text-3xl font-bold mb-4 text-foreground">Our Story</h2>h2>
                                                            <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                                                                            We're Trey and Zach Sides — brothers raised in East Tennessee with dirt under our
                                                                            fingernails and a genuine affection for the kind of greenery that makes a room feel
                                                                            like it's breathing.
                                                            </p>p>
                                                            <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                                                                            We kept noticing something about the short-term rental world: hosts were already
                                                                            plugged into a whole ecosystem of niche services — cleaning crews, linen companies,
                                                                            landscapers, handymen. Everyone had found their lane. But nobody was doing plants.
                                                                            Not well, anyway. And we knew — because the research is actually quite clear on
                                                                            this — that plants do something to people that no throw pillow or mood lamp can.
                                                                            They soothe us. Subconsciously, biologically, deeply. Travelers carry stress in
                                                                            ways they don't even recognize, and a thoughtfully planted space meets them at the
                                                                            door differently than an empty one.
                                                            </p>p>
                                                            <p className="text-muted-foreground text-lg leading-relaxed">
                                                                            We built PlantB & Bees for the SuperHosts and the hosts who want to become them —
                                                                            the ones who understand that standing out isn't about spending more, it's about
                                                                            caring more. Science-backed, locally rooted, and genuinely enthusiastic about
                                                                            bringing more life into the spaces people call home for a night.
                                                            </p>p>
                                              </div>div>
                                              <div className="rounded-3xl overflow-hidden shadow-xl rotate-3 hover:rotate-0 transition-all duration-500">
                                                            <img
                                                                              src="/trey-and-zac.jpg"
                                                                              alt="Trey and Zach Sides, co-founders of PlantB & Bees"
                                                                              className="w-full h-auto object-cover"
                                                                            />
                                              </div>div>
                                  </section>section>
                        
                          {/* Values */}
                                  <section className="grid md:grid-cols-3 gap-8">
                                              <div className="text-center p-6 bg-secondary/30 rounded-2xl">
                                                            <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                                                            <h3 className="font-display text-xl font-bold mb-2">Locally Rooted</h3>h3>
                                                            <p className="text-muted-foreground">
                                                                            Born and based in East Tennessee. We know this land, this climate, and the plants
                                                                            that belong here.
                                                            </p>p>
                                              </div>div>
                                              <div className="text-center p-6 bg-secondary/30 rounded-2xl">
                                                            <Leaf className="w-12 h-12 text-primary mx-auto mb-4" />
                                                            <h3 className="font-display text-xl font-bold mb-2">Science-Backed</h3>h3>
                                                            <p className="text-muted-foreground">
                                                                            Plants measurably reduce cortisol, improve mood, and make spaces feel lived-in.
                                                                            We're not decorating — we're designing for wellbeing.
                                                            </p>p>
                                              </div>div>
                                              <div className="text-center p-6 bg-secondary/30 rounded-2xl">
                                                            <Heart className="w-12 h-12 text-destructive/70 mx-auto mb-4" />
                                                            <h3 className="font-display text-xl font-bold mb-2">Host First</h3>h3>
                                                            <p className="text-muted-foreground">
                                                                            Built around the rhythms of short-term rental hosting — low maintenance, high
                                                                            impact, always guest-ready.
                                                            </p>p>
                                              </div>div>
                                  </section>section>
                        
                          {/* The Bees */}
                                  <section className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 rounded-3xl p-10">
                                              <div className="text-center mb-6">
                                                            <span className="text-5xl">🐝</span>span>
                                              </div>div>
                                              <h2 className="font-display text-3xl font-bold mb-4 text-foreground text-center">
                                                            About the Bees
                                              </h2>h2>
                                              <div className="max-w-2xl mx-auto space-y-5">
                                                            <p className="text-muted-foreground text-lg leading-relaxed text-center">
                                                                            The name isn't decorative.
                                                            </p>p>
                                                            <p className="text-muted-foreground text-lg leading-relaxed">
                                                                            East Tennessee has some of the most diverse plant life in North America, and with
                                                                            that comes an extraordinary pollinator ecosystem. We have a genuine, unironic love
                                                                            for bees — and we haven't forgotten the years when colony collapse disorder made
                                                                            headlines and bee populations declined in ways that should have alarmed everyone
                                                                            more than they did.
                                                            </p>p>
                                                            <p className="text-muted-foreground text-lg leading-relaxed">
                                                                            So we made a commitment: for every property in our network, we offer hosts the
                                                                            opportunity to have bee-friendly native plants installed on their outdoor grounds
                                                                            at no charge. Coneflowers, wild indigo, river oats — plants the bees genuinely
                                                                            love and that Tennessee's soil genuinely wants to grow.
                                                            </p>p>
                                                            <p className="text-muted-foreground text-lg leading-relaxed">
                                                                            And we've seen it every time — the bees come. They find it. And when they do,
                                                                            we've heard on very good authority that they'll erect a small wooden recognition
                                                                            bee on your property that reads:
                                                            </p>p>
                                                            <blockquote className="border-l-4 border-amber-400 pl-6 py-2 italic text-foreground text-lg">
                                                                            "You've been officially declared the Bees Knees."
                                                                            <br />
                                                                            <span className="text-sm not-italic text-muted-foreground mt-2 block">
                                                                                              God Speed. Signed, with their knees — the Bees.
                                                                            </span>span>
                                                            </blockquote>blockquote>
                                                            <p className="text-muted-foreground text-lg leading-relaxed">
                                                                            We think that's worth something.
                                                            </p>p>
                                              </div>div>
                                  </section>section>
                        
                          {/* Team */}
                                  <section>
                                              <h2 className="font-display text-3xl font-bold mb-2 text-foreground text-center">
                                                            The Brothers
                                              </h2>h2>
                                              <p className="text-muted-foreground text-center mb-10">
                                                            Two people who take plants seriously, and bees even more seriously.
                                              </p>p>
                                              <div className="grid md:grid-cols-2 gap-10 max-w-2xl mx-auto">
                                                {team.map((member) => (
                            <div key={member.fullName} className="text-center">
                                              <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4 shadow-lg ring-4 ring-primary/10">
                                                                  <img
                                                                                          src={member.image}
                                                                                          alt={member.name}
                                                                                          className="w-full h-full object-cover object-top"
                                                                                        />
                                              </div>div>
                                              <h3 className="font-display text-xl font-bold text-foreground">{member.name}</h3>h3>
                                              <p className="text-xs text-muted-foreground/70 mb-1">{member.fullName}</p>p>
                                              <p className="text-sm font-medium text-primary mb-3">{member.title}</p>p>
                                              <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>p>
                            </div>div>
                          ))}
                                              </div>div>
                                  </section>section>
                        
                        </div>div>
                </main>main>
          </div>div>
        );
}</div>
