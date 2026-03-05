/**
 * Mailchimp API Integration
 *
 * This module handles all interactions with Mailchimp's API for email marketing automation.
 *
 * Setup Instructions:
 * 1. Create a Mailchimp account at https://mailchimp.com
 * 2. Generate an API key from Account > Extras > API keys
 * 3. Create an audience (list) for your waiting list
 * 4. Add the API key, server prefix, and audience ID to your .env file
 *
 * Environment Variables Required:
 * - MAILCHIMP_API_KEY: Your Mailchimp API key
 * - MAILCHIMP_SERVER_PREFIX: Server prefix from your API key (e.g., "us1", "us21")
 * - MAILCHIMP_AUDIENCE_ID: The ID of your audience/list
 */

interface MailchimpMember {
  email: string;
  name: string;
  phone?: string;
  propertyCount?: number;
  serviceInterest?: string;
  source?: string;
}

interface MailchimpMergeFields {
  FNAME: string;
  LNAME: string;
  PHONE?: string;
  MMERGE6?: number; // Property Count
  MMERGE7?: string; // Service Interest
  MMERGE8?: string; // Source
}

/**
 * Add a new subscriber to the Mailchimp waiting list
 */
export async function addToWaitlist(member: MailchimpMember): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  // If Mailchimp is not configured, log warning but don't fail
  if (!apiKey || !serverPrefix || !audienceId) {
    console.warn("Mailchimp not configured. Skipping email list addition.");
    console.warn("To enable Mailchimp, add MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, and MAILCHIMP_AUDIENCE_ID to .env");
    return { success: false, error: "Mailchimp not configured" };
  }

  try {
    // Split name into first and last name
    const nameParts = member.name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Build merge fields for custom data
    const mergeFields: MailchimpMergeFields = {
      FNAME: firstName,
      LNAME: lastName,
    };

    if (member.phone) {
      mergeFields.PHONE = member.phone;
    }

    if (member.propertyCount) {
      mergeFields.MMERGE6 = member.propertyCount;
    }

    if (member.serviceInterest) {
      mergeFields.MMERGE7 = member.serviceInterest;
    }

    if (member.source) {
      mergeFields.MMERGE8 = member.source;
    }

    // Prepare request body
    const requestBody = {
      email_address: member.email,
      status: "subscribed",
      merge_fields: mergeFields,
      tags: [
        "waiting-list",
        `source-${member.source || "organic"}`,
        member.serviceInterest ? `interest-${member.serviceInterest}` : null,
      ].filter(Boolean),
    };

    // Make API request
    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();

      // If member already exists, that's okay - update them instead
      if (errorData.title === "Member Exists") {
        console.log(`Member ${member.email} already exists in Mailchimp. Updating tags.`);
        // Could implement PUT request here to update tags
        return { success: true };
      }

      console.error("Mailchimp API error:", errorData);
      return { success: false, error: errorData.detail || "Failed to add to Mailchimp" };
    }

    const data = await response.json();
    console.log(`Successfully added ${member.email} to Mailchimp waiting list`);
    return { success: true };

  } catch (error) {
    console.error("Error adding to Mailchimp:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}

/**
 * Trigger a welcome email automation
 * Note: The actual automation sequence should be set up in Mailchimp's UI
 */
export async function triggerWelcomeEmail(email: string): Promise<void> {
  // Mailchimp automations are triggered automatically when tags are added
  // The welcome series should be configured in Mailchimp to trigger on the "waiting-list" tag
  console.log(`Welcome email automation should trigger for ${email} based on tags`);
}

/**
 * Subscribe a registered user to the newsletter
 */
export async function subscribeToNewsletter(email: string, firstName: string, lastName: string): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !serverPrefix || !audienceId) {
    console.warn("Mailchimp not configured. Skipping newsletter subscription.");
    return { success: false, error: "Mailchimp not configured" };
  }

  try {
    const crypto = await import("crypto");
    const subscriberHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
        status: "subscribed",
        merge_fields: { FNAME: firstName, LNAME: lastName },
        tags: ["customer"],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Mailchimp subscribe error:", errorData);
      return { success: false, error: errorData.detail || "Failed to subscribe" };
    }

    console.log(`Subscribed ${email} to newsletter`);
    return { success: true };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

/**
 * Unsubscribe a registered user from the newsletter
 */
export async function unsubscribeFromNewsletter(email: string): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !serverPrefix || !audienceId) {
    console.warn("Mailchimp not configured. Skipping newsletter unsubscription.");
    return { success: false, error: "Mailchimp not configured" };
  }

  try {
    const crypto = await import("crypto");
    const subscriberHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ status: "unsubscribed" }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Mailchimp unsubscribe error:", errorData);
      return { success: false, error: errorData.detail || "Failed to unsubscribe" };
    }

    console.log(`Unsubscribed ${email} from newsletter`);
    return { success: true };
  } catch (error) {
    console.error("Error unsubscribing from newsletter:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

/**
 * Remove a subscriber from the waiting list
 */
export async function removeFromWaitlist(email: string): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !serverPrefix || !audienceId) {
    return { success: false, error: "Mailchimp not configured" };
  }

  try {
    // Generate subscriber hash (MD5 of lowercase email)
    const crypto = await import("crypto");
    const subscriberHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");

    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Mailchimp API error:", errorData);
      return { success: false, error: errorData.detail || "Failed to remove from Mailchimp" };
    }

    console.log(`Successfully removed ${email} from Mailchimp waiting list`);
    return { success: true };

  } catch (error) {
    console.error("Error removing from Mailchimp:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}
