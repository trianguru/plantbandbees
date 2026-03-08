/**
 * Analytics Tracking Helper Functions
 *
 * This module provides functions to track user interactions across
 * Google Analytics 4, Facebook Pixel, and Google Ads conversion tracking.
 *
 * Setup Instructions:
 * 1. Add tracking IDs to your .env file
 * 2. Add tracking scripts to client/index.html
 * 3. Call these functions throughout your app to track events
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Track a page view
 * Called automatically on route changes
 */
export function trackPageView(url: string, title?: string) {
  // Google Analytics 4
  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_path: url,
      page_title: title || document.title,
    });
  }

}

/**
 * Track waiting list signup conversion
 * This is the primary conversion action for the marketing campaigns
 */
export function trackWaitlistSignup(data: {
  email?: string;
  source?: string;
  propertyCount?: number;
}) {
  // Google Analytics 4
  if (window.gtag) {
    window.gtag("event", "generate_lead", {
      event_category: "engagement",
      event_label: "waitlist_signup",
      source: data.source || "organic",
      property_count: data.propertyCount,
    });
  }

  // Google Ads Conversion Tracking
  if (window.gtag) {
    const conversionId = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID;
    const conversionLabel = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL;

    if (conversionId && conversionLabel) {
      window.gtag("event", "conversion", {
        send_to: `${conversionId}/${conversionLabel}`,
        value: 100.0,
        currency: "USD",
      });
    }
  }

  console.log("Tracked waitlist signup:", data);
}

/**
 * Track button clicks
 */
export function trackButtonClick(buttonName: string, location: string) {
  if (window.gtag) {
    window.gtag("event", "button_click", {
      event_category: "engagement",
      event_label: buttonName,
      location: location,
    });
  }
}

/**
 * Track product views
 */
export function trackProductView(productId: number, productName: string, price: string) {
  // Google Analytics 4
  if (window.gtag) {
    window.gtag("event", "view_item", {
      currency: "USD",
      value: parseFloat(price),
      items: [
        {
          item_id: productId.toString(),
          item_name: productName,
          price: parseFloat(price),
        },
      ],
    });
  }

}

/**
 * Track add to cart
 */
export function trackAddToCart(productId: number, productName: string, price: string, quantity: number) {
  // Google Analytics 4
  if (window.gtag) {
    window.gtag("event", "add_to_cart", {
      currency: "USD",
      value: parseFloat(price) * quantity,
      items: [
        {
          item_id: productId.toString(),
          item_name: productName,
          price: parseFloat(price),
          quantity: quantity,
        },
      ],
    });
  }

}

/**
 * Track subscription selection
 */
export function trackSubscriptionSelection(tier: string, price: string) {
  if (window.gtag) {
    window.gtag("event", "select_subscription", {
      event_category: "engagement",
      event_label: tier,
      value: parseFloat(price),
      currency: "USD",
    });
  }

}

/**
 * Track form interactions
 */
export function trackFormStart(formName: string) {
  if (window.gtag) {
    window.gtag("event", "form_start", {
      event_category: "engagement",
      event_label: formName,
    });
  }
}

export function trackFormError(formName: string, errorField: string) {
  if (window.gtag) {
    window.gtag("event", "form_error", {
      event_category: "engagement",
      event_label: formName,
      error_field: errorField,
    });
  }
}

/**
 * Track outbound links (referrals, social media, etc.)
 */
export function trackOutboundLink(url: string, label?: string) {
  if (window.gtag) {
    window.gtag("event", "click", {
      event_category: "outbound",
      event_label: label || url,
      transport_type: "beacon",
    });
  }
}

/**
 * Initialize analytics on app load
 */
export function initializeAnalytics() {
  // Track initial page view
  trackPageView(window.location.pathname + window.location.search);

  console.log("Analytics initialized");
}
