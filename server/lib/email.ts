import { Resend } from "resend";

const FROM = "Plant Band Bees <no-reply@plantbandbees.com>";

let _resend: Resend | null = null;
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

export async function sendWelcomeEmail(
  email: string,
  firstName: string
): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Welcome to Plant Band Bees! 🌿",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a2e0e">
        <h1 style="color:#2d5016">Welcome, ${firstName}!</h1>
        <p>Thanks for joining Plant Band Bees — the plant maintenance service built for Knoxville Airbnb hosts.</p>
        <p>You can now log in to your account, browse subscription plans, and manage your plants.</p>
        <a href="https://plantbandbees.com/subscriptions" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#2d5016;color:white;text-decoration:none;border-radius:8px;font-weight:600">
          Browse Plans
        </a>
        <p style="margin-top:32px;font-size:0.85rem;color:#888">
          Questions? Reply to this email or visit <a href="https://plantbandbees.com">plantbandbees.com</a>.
        </p>
      </div>
    `,
  });
}

export async function sendOrderConfirmationEmail(
  email: string,
  firstName: string,
  productName: string,
  amount: string
): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Your Plant Band Bees order is confirmed",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a2e0e">
        <h1 style="color:#2d5016">Order Confirmed</h1>
        <p>Hi ${firstName},</p>
        <p>We've received your order for <strong>${productName}</strong>.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #eee">Item</td>
            <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right"><strong>${productName}</strong></td>
          </tr>
          <tr>
            <td style="padding:8px 0">Total</td>
            <td style="padding:8px 0;text-align:right"><strong>$${amount}</strong></td>
          </tr>
        </table>
        <p>We'll be in touch to schedule your delivery and setup.</p>
        <a href="https://plantbandbees.com/dashboard" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#2d5016;color:white;text-decoration:none;border-radius:8px;font-weight:600">
          View Dashboard
        </a>
      </div>
    `,
  });
}

export async function sendSubscriptionCancelledEmail(
  email: string,
  firstName: string
): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Your Plant Band Bees subscription has been cancelled",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a2e0e">
        <h1 style="color:#2d5016">Subscription Cancelled</h1>
        <p>Hi ${firstName},</p>
        <p>Your Plant Band Bees subscription has been cancelled. We're sorry to see you go!</p>
        <p>Your plants will remain in place until the end of the current billing period. After that, we'll arrange pickup at a time that works for you.</p>
        <p>If this was a mistake or you'd like to re-subscribe, you can do so any time from your dashboard.</p>
        <a href="https://plantbandbees.com/subscriptions" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#2d5016;color:white;text-decoration:none;border-radius:8px;font-weight:600">
          Re-subscribe
        </a>
      </div>
    `,
  });
}

export async function sendPaymentFailedEmail(
  email: string,
  firstName: string,
  amount: string
): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Action required: Payment failed for your Plant Band Bees subscription",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a2e0e">
        <h1 style="color:#c0392b">Payment Failed</h1>
        <p>Hi ${firstName},</p>
        <p>We were unable to process your payment of <strong>$${amount}</strong> for your Plant Band Bees subscription.</p>
        <p>Please update your payment method to avoid service interruption.</p>
        <a href="https://plantbandbees.com/dashboard" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#2d5016;color:white;text-decoration:none;border-radius:8px;font-weight:600">
          Update Payment Method
        </a>
        <p style="margin-top:24px;font-size:0.85rem;color:#888">
          We'll retry the payment automatically. If it continues to fail, your subscription may be paused.
        </p>
      </div>
    `,
  });
}
