import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { trackWaitlistSignup, trackFormStart } from "@/lib/analytics";

const waitlistSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  propertyCount: z.number().optional(),
  serviceInterest: z.enum(["one-time", "subscription", "both"]).optional(),
  source: z.string().optional(),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistFormProps {
  source?: string;
  onSuccess?: () => void;
  variant?: "inline" | "modal";
}

export function WaitlistForm({ source = "organic", onSuccess, variant = "inline" }: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      source,
    },
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to join waiting list");
      }

      const result = await response.json();

      // Track conversion
      trackWaitlistSignup({
        email: data.email,
        source: data.source,
        propertyCount: data.propertyCount,
      });

      reset();

      if (onSuccess) {
        onSuccess();
      }

      // Redirect to success page
      setLocation("/waitlist/success");
    } catch (error) {
      toast({
        title: "Oops!",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isInline = variant === "inline";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className={isInline ? "grid md:grid-cols-2 gap-4" : "space-y-4"}>
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            placeholder="John Doe"
            {...register("name")}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className={isInline ? "grid md:grid-cols-2 gap-4" : "space-y-4"}>
        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(865) 555-0100"
            {...register("phone")}
          />
        </div>

        <div>
          <Label htmlFor="propertyCount">Number of Properties (optional)</Label>
          <Input
            id="propertyCount"
            type="number"
            min="1"
            placeholder="1"
            {...register("propertyCount", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="serviceInterest">Service Interest (optional)</Label>
        <Select onValueChange={(value) => setValue("serviceInterest", value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="What are you interested in?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="subscription">Monthly Subscription</SelectItem>
            <SelectItem value="one-time">One-Time Delivery</SelectItem>
            <SelectItem value="both">Both Options</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Joining...
          </>
        ) : (
          "Join Waiting List - Get 20% Off!"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By joining, you'll be first to know about our Spring 2026 launch and get exclusive early bird pricing.
      </p>
    </form>
  );
}
