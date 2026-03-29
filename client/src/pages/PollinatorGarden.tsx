import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";

// ─── Mix Data ───────────────────────────────────────────────────────────────

interface GardenPlant {
  name: string;
  role: string; // e.g. "Spring anchor", "Summer star", "Fall closer"
  image: string;
  funFact: string;
}

interface GardenMix {
  id: string;
  name: string;
  tagline: string;
  description: string;
  conditions: string;   // e.g. "Full sun · Dry to average soil"
  bloomSeason: string;  // e.g. "April – October"
  pollinators: string[];
  color: string;        // Tailwind bg color for accent
  plants: GardenPlant[];
  synergyFact: string;  // Why these plants work together
}

const MIXES: GardenMix[] = [
  {
    id: "smoky-mountain-gold",
    name: "Smoky Mountain Gold",
    tagline: "Sun-drenched. Drought-tough. The monarch highway.",
    description:
      "Four powerhouse sun-lovers that bloom in relay from June through the first frost. Warm gold and lavender hues, built for East Tennessee summers. This is the mix that turns your yard into a monarch butterfly waystation on the fall migration corridor.",
    conditions: "Full sun · Dry to average soil · Heat tolerant",
    bloomSeason: "June – October",
    pollinators: ["Monarch butterflies", "Native bees", "Hummingbirds", "Painted ladies"],
    color: "bg-amber-50",
    synergyFact:
      "Butterfly Weed and Black-Eyed Susan bloom first, drawing in the early-summer pollinators. Wild Bergamot follows mid-summer with nectar that native bees are uniquely shaped to access. Goldenrod closes the season in September–October, when honeybee colonies are stockpiling stores for winter — a critical lifeline most gardens completely miss.",
    plants: [
      {
        name: "Butterfly Weed",
        role: "Summer anchor",
        image: "https://images.unsplash.com/photo-1565041222041-db9ebdda950a?q=80&w=600&auto=format&fit=crop",
        funFact: "The single most important monarch butterfly host plant east of the Rockies. Without it, monarchs cannot complete their life cycle.",
      },
      {
        name: "Black-Eyed Susan",
        role: "Summer workhorse",
        image: "https://images.unsplash.com/photo-1602187177421-050769a1cc51?q=80&w=600&auto=format&fit=crop",
        funFact: "Documented feeding 17+ bee species including 6 specialist native bees that rely on it almost exclusively.",
      },
      {
        name: "Wild Bergamot",
        role: "Midsummer star",
        image: "https://images.unsplash.com/photo-1765916195208-96441bd51c92?q=80&w=600&auto=format&fit=crop",
        funFact: "Also called Bee Balm. Its tubular flowers evolved specifically for long-tongued native bees — a shape most generalist insects can't even access.",
      },
      {
        name: "Goldenrod",
        role: "Fall closer",
        image: "https://images.unsplash.com/photo-1667111979241-173f447e98ad?q=80&w=600&auto=format&fit=crop",
        funFact: "Contrary to myth, Goldenrod doesn't cause hay fever (that's ragweed). But it does sustain bee colonies through winter prep — arguably the most ecologically critical plant in the eastern US.",
      },
    ],
  },
  {
    id: "blue-ridge-understory",
    name: "Blue Ridge Understory",
    tagline: "Part-shade friendly. Cool tones. Spring to frost.",
    description:
      "Designed for the dappled light found at most GSMNP-area properties — near tree lines, under eaves, beside decks. Four plants with complementary bloom windows and a color palette of deep blues, scarlet, and silver-white. One of them actively feeds the others for free.",
    conditions: "Part shade to full sun · Average to moist soil",
    bloomSeason: "April – October",
    pollinators: ["Ruby-throated hummingbirds", "Bumblebees", "Migrating monarchs", "Sphinx moths"],
    color: "bg-blue-50",
    synergyFact:
      "Wild Blue Indigo is a legume — it fixes atmospheric nitrogen directly into the soil, enriching the ground for its three companions at no cost. Mountain Mint's silver bracts act as landing pads, making it the most bee-visited plant researchers have ever studied. Cardinal Flower's red blooms are the exact wavelength hummingbirds see most vividly. Blue Mistflower finishes the season in October, the month when migrating monarchs need fuel most desperately.",
    plants: [
      {
        name: "Wild Blue Indigo",
        role: "Spring anchor + soil builder",
        image: "https://images.unsplash.com/photo-1704262911785-6abc22d943e2?q=80&w=600&auto=format&fit=crop",
        funFact: "A nitrogen-fixing legume. Its root nodules pull nitrogen from the air and deposit it in the soil, feeding neighboring plants like a slow-release fertilizer — for free, forever.",
      },
      {
        name: "Mountain Mint",
        role: "Midsummer bee magnet",
        image: "https://images.unsplash.com/photo-1614974571816-6d29668fec4d?q=80&w=600&auto=format&fit=crop",
        funFact: "Researchers have documented over 50 bee species visiting a single Mountain Mint plant in one day. It is, by many accounts, the single best bee plant in the entire eastern United States.",
      },
      {
        name: "Cardinal Flower",
        role: "Late summer hummingbird magnet",
        image: "https://images.unsplash.com/photo-1668934807813-529bcb03d72b?q=80&w=600&auto=format&fit=crop",
        funFact: "The scarlet red bloom evolved exclusively for hummingbirds — bees can't even see red. When a ruby-throated hummingbird visits, pollen deposits precisely on its forehead, transferring to the next flower it visits.",
      },
      {
        name: "Blue Mistflower",
        role: "Fall monarch lifeline",
        image: "https://images.unsplash.com/photo-1764423165684-2d429684cb30?q=80&w=600&auto=format&fit=crop",
        funFact: "Blooms in late September–October when almost nothing else does. Migrating monarchs passing through East Tennessee rely on late-season nectar sources like this to fuel their journey to Mexico.",
      },
    ],
  },
  {
    id: "tennessee-heritage-prairie",
    name: "Tennessee Heritage Prairie",
    tagline: "Bold. Tall. One plant exists nowhere else on Earth.",
    description:
      "Tennessee's botanical story told in four plants. This mix goes vertical — Wild Columbine opens at 12 inches in spring, Tennessee Coneflower follows at 24 inches, and Joe-Pye Weed closes the season at 6–8 feet tall, creating roosting habitat for migrating butterflies. The Tennessee Coneflower is endemic to this state — planting it is an act of conservation.",
    conditions: "Full sun to part shade · Average soil · Tolerates clay",
    bloomSeason: "April – September",
    pollinators: ["Monarch butterflies", "Tiger swallowtails", "Bumblebee queens", "Goldfinches"],
    color: "bg-purple-50",
    synergyFact:
      "Height variation is the secret: Wild Columbine stays low and blooms earliest, feeding bumblebee queens waking from winter hibernation when almost nothing else is open. Coneflower takes over mid-height in summer. Then Joe-Pye Weed and Ironweed shoot skyward in late summer, creating a vertical migration corridor — monarchs and swallowtails actually use tall prairie plants as roosting spots during fall migration.",
    plants: [
      {
        name: "Tennessee Coneflower",
        role: "Summer centerpiece",
        image: "https://images.unsplash.com/photo-1707307553388-aefc810a96fa?q=80&w=600&auto=format&fit=crop",
        funFact: "Echinacea tennesseensis is endemic to Tennessee — found nowhere else on the planet. It was federally listed as endangered until conservation efforts stabilized the population. Planting it is a genuine act of species preservation.",
      },
      {
        name: "Wild Columbine",
        role: "Spring opener",
        image: "https://images.unsplash.com/photo-1657411657879-839235e43532?q=80&w=600&auto=format&fit=crop",
        funFact: "Blooms April–May when bumblebee queens are newly emerged from winter hibernation and desperately need fuel. The red-and-yellow spurred flowers are perfectly shaped for both hummingbirds and long-tongued bees.",
      },
      {
        name: "Ironweed",
        role: "Late summer monarch magnet",
        image: "https://images.unsplash.com/photo-1600882899334-4a11853c46a8?q=80&w=600&auto=format&fit=crop",
        funFact: "The intense purple-violet color of Ironweed blooms sits at the exact end of the visible spectrum that monarch butterflies find most attractive. During fall migration, a single Ironweed plant can host dozens of monarchs simultaneously.",
      },
      {
        name: "Joe-Pye Weed",
        role: "Fall giant + butterfly roost",
        image: "https://images.unsplash.com/photo-1759865990051-6d54a88fa33a?q=80&w=600&auto=format&fit=crop",
        funFact: "Can reach 8 feet tall, creating vertical structure that migrating butterflies use as roosting habitat. Native Americans used it medicinally for centuries — 'Joe Pye' may refer to a 19th-century healer who used it to treat typhus.",
      },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function PollinatorGarden() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container max-w-6xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-accent text-accent-foreground">Free with every subscription</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Pollinator Garden
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Every Air Bloom and Bees subscription includes a free native pollinator garden — installed at your property, designed to thrive without ongoing care. Choose your mix below. We plant it right, using species that belong here, so nature takes over.
          </p>
          <p className="text-sm text-muted-foreground mt-3 italic">
            "We get them started. After that, they belong to the land."
          </p>
        </div>

        {/* Mix Cards */}
        <div className="space-y-20">
          {MIXES.map((mix, mixIdx) => (
            <div key={mix.id} className={`rounded-3xl border border-border/40 overflow-hidden shadow-sm`}>

              {/* Mix Header */}
              <div className={`${mix.color} px-8 py-8 border-b border-border/30`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-muted-foreground/40 font-display">0{mixIdx + 1}</span>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{mix.name}</h2>
                    </div>
                    <p className="text-primary font-medium mb-3">{mix.tagline}</p>
                    <p className="text-muted-foreground max-w-2xl leading-relaxed">{mix.description}</p>
                  </div>
                  <div className="shrink-0 space-y-2 md:text-right">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Conditions:</span> {mix.conditions}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Blooms:</span> {mix.bloomSeason}
                    </div>
                    <div className="flex flex-wrap md:justify-end gap-1.5 mt-2">
                      {mix.pollinators.map(p => (
                        <span key={p} className="text-xs bg-background/70 border border-border/50 rounded-full px-2.5 py-0.5 text-muted-foreground">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Plant Grid */}
              <div className="p-8 bg-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {mix.plants.map((plant) => (
                    <div key={plant.name} className="group flex flex-col">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-secondary/20">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="text-xs font-medium text-primary/70 uppercase tracking-wide mb-0.5">{plant.role}</div>
                      <div className="font-display font-bold text-foreground mb-2">{plant.name}</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{plant.funFact}</p>
                    </div>
                  ))}
                </div>

                {/* Synergy callout */}
                <div className="bg-accent/10 border border-accent/20 rounded-2xl p-5">
                  <p className="text-sm font-semibold text-foreground mb-1">🌿 Why these four work together</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{mix.synergyFact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-secondary/30 rounded-3xl p-10 border border-border/40">
          <h3 className="font-display text-2xl font-bold text-foreground mb-3">Not sure which mix is right for your property?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            When you subscribe, we'll talk through your property — sun exposure, soil type, and what you'd love to see — and pick the mix that fits. Or mix and match elements from all three.
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium px-6 py-3 rounded-xl shadow-lg shadow-primary/20"
          >
            View Subscription Plans
          </a>
        </div>

      </main>
    </div>
  );
}
