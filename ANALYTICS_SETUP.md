# Analytics & Tracking Setup Guide

This guide explains how to set up Google Analytics 4, Facebook Pixel, and Google Ads conversion tracking for PlantBandBees.

## Prerequisites

1. Google Account
2. Facebook Business Manager account
3. Google Ads account (for paid advertising)

---

## 1. Google Analytics 4 Setup

### Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon)
3. Under **Account**, click **Create Account**
   - Account name: "PlantBandBees"
   - Click **Next**
4. Create a property:
   - Property name: "PlantBandBees Website"
   - Time zone: (UTC-05:00) Eastern Time
   - Currency: United States Dollar
   - Click **Next**
5. Complete business details
6. Accept terms and conditions

### Get Your Measurement ID

1. In Admin, under **Property** > **Data Streams**
2. Click **Add stream** > **Web**
3. Enter your website URL (e.g., `https://plantbandbees.com`)
4. Stream name: "PlantBandBees Main Site"
5. Click **Create stream**
6. **Copy your Measurement ID** (format: `G-XXXXXXXXXX`)

### Install Tracking Code

1. Open `client/index.html`
2. Replace `GA_MEASUREMENT_ID` with your actual measurement ID in **both** places:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Verify Installation

1. Deploy your site
2. In GA4, go to **Reports** > **Realtime**
3. Visit your website in another tab
4. You should see yourself as an active user

---

## 2. Facebook Pixel Setup

### Create Facebook Pixel

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Click **Connect Data Sources** > **Web**
3. Select **Meta Pixel** > **Connect**
4. Name your pixel: "PlantBandBees Pixel"
5. Enter website URL: `https://plantbandbees.com`
6. Click **Continue**

### Get Your Pixel ID

1. In Events Manager, click on your pixel name
2. Click **Settings**
3. **Copy your Pixel ID** (format: 16 digits)

### Install Pixel Code

1. Open `client/index.html`
2. Replace `FACEBOOK_PIXEL_ID` with your actual pixel ID in **both** places:
   ```html
   fbq('init', '1234567890123456');
   ```
   and
   ```html
   src="https://www.facebook.com/tr?id=1234567890123456&ev=PageView&noscript=1"
   ```

### Verify Installation

1. Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/) Chrome extension
2. Visit your website
3. Click the extension icon - it should show your pixel is active
4. In Events Manager, go to **Test Events**
5. Enter your website URL and verify events are firing

---

## 3. Google Ads Conversion Tracking

### Create Conversion Action

1. Go to [Google Ads](https://ads.google.com/)
2. Click **Tools & Settings** > **Conversions** (under Measurement)
3. Click **+ New conversion action**
4. Select **Website**
5. Choose **Manually add conversion tracking code**

### Configure Conversion

1. **Category:** Lead
2. **Conversion name:** "Waiting List Signup"
3. **Value:**
   - Select "Use different values for each conversion"
   - Default value: $100
4. **Count:** One
5. **Click-through conversion window:** 30 days
6. **Attribution model:** Data-driven
7. Click **Create and continue**

### Get Conversion ID and Label

You'll see something like:
```
Conversion ID: AW-123456789
Conversion label: AbCdEfGhIjKlMnOp
```

### Add to Environment Variables

1. Open `.env` file
2. Add your conversion tracking details:
   ```
   VITE_GOOGLE_ADS_CONVERSION_ID=AW-123456789
   VITE_GOOGLE_ADS_CONVERSION_LABEL=AbCdEfGhIjKlMnOp
   ```

### Verify Conversion Tracking

1. Deploy your site with the new environment variables
2. Test by submitting the waiting list form
3. In Google Ads, go to **Tools** > **Conversions**
4. Click on "Waiting List Signup"
5. Within 24 hours, you should see test conversions recorded

---

## 4. Mailchimp Setup

### Create Mailchimp Account

1. Go to [Mailchimp](https://mailchimp.com) and sign up
2. Choose the **Free** plan (up to 500 contacts)
3. Complete account setup

### Create Audience

1. Click **Audience** in the main menu
2. Click **Create Audience**
3. Name: "PlantBandBees Waiting List"
4. Default from email: your business email
5. Click **Save**

### Get API Key

1. Click your profile icon > **Account & Billing**
2. Go to **Extras** > **API keys**
3. Click **Create A Key**
4. Name it: "PlantBandBees Website"
5. **Copy the API key** (format: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us1`)

### Get Server Prefix

From your API key, the server prefix is the part after the dash (e.g., `us1`, `us21`)

### Get Audience ID

1. Go to **Audience** > **Manage Audience** > **Settings**
2. Scroll to **Audience ID** and copy it (format: `xxxxxxxxxx`)

### Configure Environment Variables

1. Open `.env` file
2. Add your Mailchimp credentials:
   ```
   MAILCHIMP_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us1
   MAILCHIMP_SERVER_PREFIX=us1
   MAILCHIMP_AUDIENCE_ID=xxxxxxxxxx
   ```

### Set Up Custom Merge Fields

1. In Mailchimp, go to **Audience** > **Manage Audience** > **Settings**
2. Click **Audience fields and *|MERGE|* tags**
3. Add these custom fields:
   - **PHONE** (Text, Tag: PHONE)
   - **Property Count** (Number, Tag: MMERGE6)
   - **Service Interest** (Text, Tag: MMERGE7)
   - **Source** (Text, Tag: MMERGE8)

### Create Welcome Email Automation

1. Go to **Automations**
2. Click **Create** > **Custom**
3. Name: "Waiting List Welcome Series"
4. Trigger: **List Management** > **When someone subscribes**
5. Add emails based on the campaign plan (see plan document for email templates)

---

## 5. Testing Checklist

Before launching campaigns, verify everything works:

### Local Testing

- [ ] Install dependencies: `npm install`
- [ ] Run development server: `npm run dev`
- [ ] Submit waiting list form with test email
- [ ] Verify data saved to database
- [ ] Check browser console for tracking events
- [ ] Verify no JavaScript errors

### Production Testing (After Deployment)

- [ ] Google Analytics shows page views
- [ ] Facebook Pixel Helper shows events firing
- [ ] Mailchimp receives new subscriber
- [ ] Welcome email sent from Mailchimp
- [ ] Google Ads conversion tracking fires (check in Google Ads > Conversions)
- [ ] Test on mobile device
- [ ] Test from different browsers (Chrome, Safari, Firefox)

---

## 6. Privacy & Compliance

### Cookie Consent (Required for GDPR/CCPA)

Consider adding a cookie consent banner. Popular options:

- [CookieYes](https://www.cookieyes.com/)
- [Osano](https://www.osano.com/)
- [OneTrust](https://www.onetrust.com/)

### Privacy Policy

Add a privacy policy page explaining:
- What data you collect
- How you use it
- Third-party services (Google, Facebook, Mailchimp)
- User rights (opt-out, data deletion)

Template: [TermsFeed Privacy Policy Generator](https://www.termsfeed.com/privacy-policy-generator/)

---

## 7. Monitoring & Maintenance

### Weekly Checks

- Review Google Analytics for traffic sources
- Check Facebook Pixel events are firing correctly
- Monitor Mailchimp email open rates
- Review Google Ads conversion data

### Monthly Tasks

- Analyze top-performing marketing channels
- A/B test email subject lines
- Update audience segments in Mailchimp
- Review and optimize ad campaigns

---

## Troubleshooting

### Analytics not tracking

1. Check browser console for errors
2. Verify tracking IDs are correct
3. Clear browser cache and cookies
4. Test in incognito mode
5. Check if ad blockers are interfering

### Mailchimp not receiving signups

1. Verify API key is correct
2. Check server logs for Mailchimp API errors
3. Confirm audience ID matches
4. Test API connection directly using Mailchimp's API playground

### Conversion tracking not working

1. Verify `.env` file has correct conversion ID and label
2. Rebuild and redeploy the app
3. Check Google Ads tag is firing in Google Tag Assistant
4. Wait 24-48 hours for conversions to appear in Google Ads

---

## Support Resources

- **Google Analytics:** [GA4 Help Center](https://support.google.com/analytics/answer/9304153)
- **Facebook Pixel:** [Pixel Setup Guide](https://www.facebook.com/business/help/952192354843755)
- **Google Ads:** [Conversion Tracking Guide](https://support.google.com/google-ads/answer/1722022)
- **Mailchimp:** [API Documentation](https://mailchimp.com/developer/marketing/api/)

---

## Next Steps

Once analytics are set up:

1. ✅ Test all tracking events
2. ✅ Create Google Ads campaigns (see GOOGLE_ADS_CAMPAIGN.md)
3. ✅ Set up Facebook/Instagram ads (see SOCIAL_ADS_CAMPAIGN.md)
4. ✅ Configure email automation sequences in Mailchimp
5. ✅ Monitor daily for the first week
6. ✅ Optimize based on data
