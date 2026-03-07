import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Section {
  heading?: string;
  paragraphs: string[];
}

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  sections: Section[];
}

const posts: Post[] = [
  {
    slug: "plants-and-airbnb-reviews",
    title: "Why Plants in Your Airbnb Make Guests Leave Better Reviews",
    excerpt:
      "Guests booked your space because they didn't want a hotel. Plants are one of the cheapest and most overlooked ways to close the gap between 'fine' and five stars.",
    date: "March 1, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1200&auto=format&fit=crop",
    sections: [
      {
        heading: "The review data doesn't lie",
        paragraphs: [
          `Airbnb listings that use words like "serene," "retreat," and "natural light" in their descriptions consistently outperform comparable properties on both bookings and review scores. That's not because the writing is better. It's because those words reflect something real about the space — and guests can tell the difference the second they walk in.`,
          `There's actual science behind this. It's called biophilia — our hardwired pull toward living things. Millions of years of evolution left us wired to feel calmer and safer near greenery. Your guests don't know that. They'll just say the place felt "cozy" or "welcoming." Same thing.`,
          `A 2025 industry study found guests are twice as likely to leave a positive review — and specifically use the word "experience" — when a space has biophilic elements in it. Plants, natural materials, daylight. The bar isn't high.`,
        ],
      },
      {
        heading: "What guests are actually writing about",
        paragraphs: [
          `No one's going to review "the snake plant in the corner measurably reduced my cortisol." But guests do write things like:`,
          `"This place actually felt lived-in, not like a rental."`,
          `"I didn't want to leave."`,
          `"Cozy in a way I didn't expect."`,
          `That's plants doing their thing quietly. A pothos trailing off a shelf, herbs on the kitchen windowsill, a monstera in the corner that catches afternoon light — these are all signals to whoever just walked through your door. Someone put thought into this. Someone cared.`,
          `That's the difference between a three-star "it was fine" and a five-star that ends with "already looking at dates to come back."`,
        ],
      },
      {
        heading: "What the average Airbnb actually looks like right now",
        paragraphs: [
          "White walls. Ikea furniture. A ring light someone forgot to put away. A laminated house rules sheet in a dollar store frame.",
          "If that describes your competition — and honestly, it describes most of the market — plants are the easiest visual interrupt available to you. They show up in guest photos. They get tagged. They become part of how someone describes the place to a friend who asks \"wait, where did you stay?\"",
          "Biophilic design used to be a boutique hotel thing. Now it's the baseline for any listing that costs more than a budget chain. If you're not there yet, this is the upgrade with the lowest effort-to-impact ratio on the list.",
        ],
      },
      {
        heading: "You don't need a lot",
        paragraphs: [
          "Three to five plants, chosen right, do the work. Pothos in low light, snake plants that survive weeks without water, a ZZ plant that genuinely does not care if you forget it exists. These aren't compromise picks — they're the same plants dominating every design account right now because they look good and actually survive real conditions.",
          "You're not running a greenhouse. You're adding a pulse to a space that otherwise feels a little too perfect, a little too empty.",
        ],
      },
    ],
  },
  {
    slug: "science-of-plants-and-guest-wellbeing",
    title: "What Plants Actually Do to Your Guests (According to Research)",
    excerpt:
      "When someone walks into a plant-filled space and says \"I just felt so relaxed here\" — they're not being dramatic. Their cortisol literally dropped. Here's the science.",
    date: "March 3, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1200&auto=format&fit=crop",
    sections: [
      {
        heading: "What the studies found",
        paragraphs: [
          "A meta-analysis across 42 independent studies on indoor plants found the same pattern across environments: stress goes down, cognitive performance goes up, mood improves. Not in some vague self-reported way — we're talking measurable drops in heart rate and cortisol, better performance on focus and memory tasks, and — this one's genuinely strange — higher pain tolerance. Patients near plants reported less perceived pain.",
          "A 2025 review out of the University of York confirmed these effects hold in real-world home environments, not just controlled lab conditions. That matters, because a lot of wellness research falls apart when it leaves the lab. This one didn't.",
        ],
      },
      {
        heading: "The air quality thing — honest version",
        paragraphs: [
          `You've probably seen the "plants purify your air" claim. It's everywhere. And it's... partially true, but oversold.`,
          "Plants do remove volatile organic compounds, CO2, nitrogen dioxide, and fine particles. The effect is real. It's just modest at the scale of three to five plants in a room. The NASA study people love to cite used conditions that don't translate to a normal living room.",
          "What plants do reliably is improve perceived air quality. Guests in plant-filled rooms consistently report the air feeling fresher even when sensors show minimal chemical change. That perception is real — it shapes how comfortable someone feels, how well they sleep, whether they wake up with a low-grade headache that tips a good stay into an annoying one.",
        ],
      },
      {
        heading: "The thing no one talks about: humidity",
        paragraphs: [
          "Plants release moisture through transpiration. In a dry climate, or in any space that gets over-conditioned by central air or heat, that matters. Indoor plant systems can raise ambient humidity by 5–10%. Guests in better-humidified rooms sleep better, wake up without that dry-air congestion feeling, and generally feel more comfortable — often without knowing why.",
          "Larger installations can make a room feel up to 2°C cooler in summer without touching the thermostat. If you're in a hot market and you've got reviews mentioning the heat, a cluster of bigger plants near windows is a genuinely cheap fix.",
        ],
      },
      {
        heading: "So what do you actually do with this",
        paragraphs: [
          "You don't need to cite research in your Airbnb copy. But you can write the description with real confidence now:",
          `"We designed this space with your wellbeing in mind — natural light, real plants, materials that help you actually unwind."`,
          "That's not a marketing claim. That's what your guests' nervous systems are going to experience when they walk through the door. The science backs it. The reviews will confirm it.",
        ],
      },
    ],
  },
  {
    slug: "best-plants-for-airbnb-2026",
    title: "The Best Plants for Airbnb Properties in 2026 (Honest Advice, Even If You Don't Use Us)",
    excerpt:
      "We genuinely believe every traveler deserves to rest in a space that feels alive. So here's our honest guide — for hosts going it alone, and a note on what becomes possible when someone's there to tend things properly.",
    date: "March 5, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=1200&auto=format&fit=crop",
    sections: [
      {
        heading: "A note before we start",
        paragraphs: [
          "This guide is written for hosts who are managing plants on their own — no service, no weekly check-ins, just you and whatever survives between turnovers.",
          "We're sharing it because we genuinely care about this. Travelers carry stress in ways they can't always name, and proximity to living things — real plants, real green, real life — does something to a nervous system that no throw pillow or mood lamp can replicate. We want more Airbnbs to have that. Even if that means giving away our best advice for free.",
          "That said: at the bottom of this post, we'll tell you what opens up when someone is actually there to tend things — because the list of what's possible gets a lot more interesting.",
        ],
      },
      {
        heading: "The baseline rules for going it alone",
        paragraphs: [
          "Guests won't water your plants. That's just true. A guest who waters the pothos before checkout is the exception, not something you plan around.",
          "Your cleaner is probably doing a 2-hour turnover. They're not checking soil moisture.",
          "So anything you put in your rental needs to look good for 10–14 days with zero intervention, look like it belongs there from day one, and not be something a curious pet or kid can get seriously hurt by.",
          "And aesthetically: 2026 is big leaves, textured forms, architectural shapes. Spindly or outdated plants don't just look bad — they undercut everything else you've done with the space.",
        ],
      },
      {
        heading: "What actually works solo",
        paragraphs: [
          "Monstera deliciosa is the defining houseplant of this moment. The split leaves photograph well — guests take pictures of them constantly — and they signal to anyone who follows interiors that someone paid attention to this room. Water every 10–14 days and it holds.",
          "Snake plants are the most forgiving thing on this list. Weeks without water, fine. Low light, fine. They're architectural, upright, and the dark green-and-yellow variety looks deliberately chosen against white or neutral walls.",
          "Pothos is the volume builder. Fast-growing, tolerates low light, trails off shelves in a way that looks designed. One $15 plant fills a shelf in a few months.",
          "ZZ plants look like they've been there for years on day one. Slow-growing, glossy, permanent. Drought-tolerant to a degree that honestly seems unfair — once a month watering and it just holds.",
          "Indoor olive trees are for when you want one plant to carry a whole room. A single olive in a terracotta pot just works — it photographs as an intentional design decision. They need bright light and more attention, so they're better suited to a managed setup.",
        ],
      },
      {
        heading: "Room by room",
        paragraphs: [
          "Living room: Monstera or a large snake plant. You want something with presence that shows up in photos.",
          "Bedroom: Snake plant. Low light, calming form, subtly improves perceived air quality.",
          "Kitchen: Pothos on a high shelf, or a small herb pot on the windowsill.",
          "Bathroom: Snake plant or air plants if there's no real light.",
          "Entryway: ZZ plant or a tall Sansevieria. First impression, architectural form, immediate signal that the space was thought about.",
        ],
      },
      {
        heading: "What's hard to do alone — but not impossible with help",
        paragraphs: [
          "Orchids are breathtaking when they're right, but they need consistent attention — humidity, indirect light, careful watering schedules. Left alone between guests, they decline visibly. With weekly check-ins, they become one of the most memorable things in a room.",
          "Seasonal plants are the same story. Poinsettias at Christmas, lilies and tulips in spring, tropical arrangements in summer — these are the plants that make a guest feel like someone actually thought about when they were arriving. They're also the plants that need someone actually showing up.",
          "Fiddle-leaf figs remain stunning and dramatic. They're also punishing when neglected — a single draft or missed watering shows up fast. Managed properly, they're statement pieces. Unmanaged, they embarrass a room.",
          "This is what a plant service actually unlocks. Not just convenience — it's access to a whole tier of plants that read as intentional, seasonal, alive. The kind of thing that ends up in a five-star review without the guest knowing exactly why they mentioned it.",
        ],
      },
      {
        heading: "The honest version of why this matters",
        paragraphs: [
          "Getting the right plant at the right size, rotating things seasonally, keeping the display cohesive as plants grow unevenly — it compounds. It's the kind of thing that seems manageable until you're doing it across multiple properties in different seasons.",
          "We built PlantBandBees because we believe travelers deserve spaces that feel genuinely alive, and hosts deserve to offer that without it becoming a second job. Whether you use us or not, we hope this helps you get there.",
        ],
      },
    ],
  },
];

function PostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <article
      className="group cursor-pointer rounded-2xl overflow-hidden border border-border/40 bg-card hover:border-primary/20 hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      <div className="h-52 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>
        <h2 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <span className="inline-block mt-4 text-sm font-medium text-primary">
          Read more →
        </span>
      </div>
    </article>
  );
}

function PostDetail({ post, onBack }: { post: Post; onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-8 -ml-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Blog
      </Button>

      <div className="rounded-2xl overflow-hidden mb-8 shadow-xl">
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {post.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {post.readTime}
        </span>
      </div>

      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        {post.title}
      </h1>

      <p className="text-lg text-muted-foreground leading-relaxed mb-8 pb-8 border-b border-border/40">
        {post.excerpt}
      </p>

      <div className="space-y-8">
        {post.sections.map((section, i) => (
          <section key={i}>
            {section.heading && (
              <h2 className="font-display text-xl font-bold text-foreground mb-3">
                {section.heading}
              </h2>
            )}
            <div className="space-y-3">
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-foreground/80 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default function Blog() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activePost = posts.find((p) => p.slug === activeSlug) ?? null;

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />

      <main className="pb-20">
        {activePost ? (
          <PostDetail post={activePost} onBack={() => setActiveSlug(null)} />
        ) : (
          <>
            {/* Hero */}
            <div className="bg-primary py-16 text-primary-foreground">
              <div className="container max-w-4xl mx-auto px-4 text-center">
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                  The PlantBandBees Blog
                </h1>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Practical guides for Knoxville hosts who want their spaces to feel alive.
                </p>
              </div>
            </div>

            {/* Post grid */}
            <div className="container max-w-5xl mx-auto px-4 py-16">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    onClick={() => setActiveSlug(post.slug)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
