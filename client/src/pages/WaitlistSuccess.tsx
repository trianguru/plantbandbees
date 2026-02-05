import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Mail, Users, Share2 } from "lucide-react";

export default function WaitlistSuccess() {
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareText = "I just joined the PlantBandBees waiting list! Beautiful, maintenance-free plants for Airbnb hosts in Knoxville. Get 20% off early bird discount!";

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />

      <main className="container max-w-3xl mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              <CheckCircle2 className="w-24 h-24 text-primary relative animate-in zoom-in duration-500" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              You're In! 🌿
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Welcome to the PlantBandBees waiting list. You're now part of our exclusive group of Knoxville hosts preparing for Spring 2026.
            </p>
          </div>

          {/* What's Next Section */}
          <div className="bg-secondary/30 rounded-3xl p-8 space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200">
            <h2 className="font-display text-2xl font-bold">What Happens Next?</h2>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Check Your Email</h3>
                <p className="text-sm text-muted-foreground">
                  We just sent you a welcome email with details about your 20% early bird discount.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold">Join the Community</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive monthly updates on our progress, plant care tips, and exclusive previews.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-semibold">Spring 2026 Launch</h3>
                <p className="text-sm text-muted-foreground">
                  As a waiting list member, you'll get first dibs on installation slots.
                </p>
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="space-y-4 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Share2 className="w-4 h-4" />
              <span className="font-medium">Know other Knoxville hosts? Spread the word!</span>
            </div>

            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => handleShare("facebook")}
                className="gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Share
              </Button>
              <Button
                variant="outline"
                onClick={() => handleShare("twitter")}
                className="gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Tweet
              </Button>
              <Button
                variant="outline"
                onClick={() => handleShare("linkedin")}
                className="gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Share
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Refer 3 friends and get a free first month when we launch! 🎁
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-400">
            <Link href="/subscriptions">
              <Button size="lg" className="h-14 px-8 text-lg">
                Explore Subscription Plans
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                Browse Plants
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-12 border-t border-border animate-in fade-in duration-700 delay-500">
            <p className="text-sm text-muted-foreground">
              Join <span className="font-bold text-primary">50+ Knoxville hosts</span> already on the list
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
