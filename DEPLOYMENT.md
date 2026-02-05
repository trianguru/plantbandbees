# Deployment Guide - PlantBandBees

This guide walks you through deploying the PlantBandBees application to production using Railway.app.

---

## Prerequisites

Before deploying, ensure you have:

- [ ] GitHub account
- [ ] Railway account (free to create)
- [ ] Domain name purchased (plantbandbees.com)
- [ ] Google Analytics 4 tracking ID
- [ ] Facebook Pixel ID
- [ ] Mailchimp API credentials
- [ ] Google Ads conversion tracking IDs (if running ads)

---

## Step 1: Prepare GitHub Repository

### 1.1 Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new **private** repository named `plantbandbees`
3. Do NOT initialize with README (we already have one)
4. Click **Create repository**

### 1.2 Push Code to GitHub

```bash
cd ~/Projects/airbnb-green-service

# Set your git config (if not already set)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/plantbandbees.git

# Rename branch to main
git branch -M main

# Push code
git push -u origin main
```

### 1.3 Verify Push

- Go to your GitHub repository
- Verify all files are present
- Check that `.env` is NOT visible (it should be git-ignored)

---

## Step 2: Deploy to Railway

### 2.1 Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Click **Login** → **Login with GitHub**
3. Authorize Railway to access your GitHub account

### 2.2 Create New Project

1. Click **New Project**
2. Select **Deploy from GitHub repo**
3. Choose your `plantbandbees` repository
4. Railway will automatically:
   - Detect it's a Node.js app
   - Install dependencies
   - Run build command
   - Start the server

### 2.3 Configure Environment Variables

1. In your Railway project, click **Variables**
2. Add the following variables:

```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=file:./data/production.db

# Mailchimp
MAILCHIMP_API_KEY=your_mailchimp_api_key_here
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_AUDIENCE_ID=your_audience_id_here

# Analytics (will add to HTML separately)
GA_TRACKING_ID=G-XXXXXXXXXX
FB_PIXEL_ID=your_facebook_pixel_id

# Google Ads
VITE_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXXX
VITE_GOOGLE_ADS_CONVERSION_LABEL=your_conversion_label

# Application URL (will be updated after deployment)
APP_URL=https://your-app.railway.app
```

3. Click **Deploy** to apply changes

### 2.4 Add Persistent Storage (For SQLite Database)

1. In Railway project, click **New** → **Empty Service**
2. Name it "database-storage"
3. Click **Settings** → **Volumes**
4. Mount path: `/app/data`
5. Click **Add Volume**

⚠️ **Important:** Update `DATABASE_URL` to use the mounted volume:
```bash
DATABASE_URL=file:./data/production.db
```

### 2.5 Initialize Database

After deployment, Railway will automatically run migrations, but you may need to manually push the schema:

1. Go to your Railway project
2. Click on your service
3. Go to **Settings** → **Deploy**
4. Under **Custom Build Command**, add:
   ```bash
   npm install && npm run db:push && npm run build
   ```

---

## Step 3: Configure Custom Domain

### 3.1 Get Railway Domain

1. In Railway, click **Settings** → **Domains**
2. Click **Generate Domain**
3. You'll get a URL like: `plantbandbees-production.up.railway.app`
4. Test this URL to verify deployment worked

### 3.2 Add Custom Domain

1. In Railway **Domains**, click **Custom Domain**
2. Enter: `plantbandbees.com`
3. Railway will provide DNS records to add

### 3.3 Configure DNS (Namecheap Example)

1. Log in to your domain registrar (Namecheap)
2. Go to **Domain List** → Click **Manage** on plantbandbees.com
3. Go to **Advanced DNS** tab
4. Add the following records (from Railway):

   | Type | Host | Value | TTL |
   |------|------|-------|-----|
   | CNAME | www | plantbandbees-production.up.railway.app | Automatic |
   | CNAME | @ | plantbandbees-production.up.railway.app | Automatic |

5. Save changes
6. Wait 5-10 minutes for DNS propagation

### 3.4 Verify SSL Certificate

- Railway automatically provisions SSL certificates via Let's Encrypt
- Your site should be accessible at `https://plantbandbees.com` within 10-15 minutes
- Verify the padlock icon appears in the browser

---

## Step 4: Update Tracking Scripts

Now that you have your production domain, update tracking codes:

### 4.1 Update HTML with Real Tracking IDs

1. Open your local `client/index.html`
2. Replace placeholder IDs:
   - `GA_MEASUREMENT_ID` → Your actual GA4 ID (e.g., `G-ABC123XYZ`)
   - `FACEBOOK_PIXEL_ID` → Your actual Pixel ID (e.g., `1234567890123456`)

3. Commit and push changes:
```bash
git add client/index.html
git commit -m "Add production tracking IDs"
git push origin main
```

Railway will automatically redeploy.

### 4.2 Update APP_URL Environment Variable

1. In Railway, go to **Variables**
2. Update `APP_URL` to: `https://plantbandbees.com`
3. Click **Deploy** to apply

---

## Step 5: Verify Deployment

### 5.1 Basic Functionality Check

- [ ] Visit `https://plantbandbees.com`
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Waiting list form displays
- [ ] Products page loads
- [ ] About page loads
- [ ] No console errors in browser DevTools

### 5.2 Test Waiting List Signup

1. Submit the waiting list form with a test email
2. Check that:
   - Success page appears
   - No errors in browser console
   - Database entry created (check Railway logs)

3. Check Mailchimp:
   - Log in to Mailchimp
   - Go to Audience
   - Verify the test email appears in your list

### 5.3 Verify Analytics Tracking

1. **Google Analytics:**
   - Open GA4 dashboard
   - Go to **Realtime** report
   - Visit your website in another tab
   - You should appear as an active user

2. **Facebook Pixel:**
   - Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper) extension
   - Visit your website
   - Click extension - should show pixel is active

3. **Google Ads Conversion:**
   - Submit waiting list form
   - Within 24-48 hours, check Google Ads
   - Go to **Tools** → **Conversions**
   - Should show test conversion

### 5.4 Mobile Testing

Test on actual mobile devices:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad/Android)

Check:
- [ ] Layout is responsive
- [ ] Forms are easy to fill out
- [ ] Buttons are tappable
- [ ] No horizontal scrolling

---

## Step 6: Post-Deployment Configuration

### 6.1 Set Up Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://plantbandbees.com`
3. Verify ownership (DNS verification recommended)
4. Submit sitemap (if you create one later)

### 6.2 Set Up Google Business Profile

1. Go to [Google Business](https://business.google.com)
2. Create business profile
3. Category: "Plant Nursery" or "Home Services"
4. Add business details:
   - Name: PlantBandBees
   - Service area: Knoxville, TN (30-mile radius)
   - Website: https://plantbandbees.com
   - Phone number
   - Business hours

### 6.3 Create Backup Strategy

**Database Backups:**

1. In Railway, go to your project
2. Click **Settings** → **Backups**
3. Enable automatic backups
4. Frequency: Daily
5. Retention: 7 days (free tier)

**Manual Backup (Recommended Weekly):**

```bash
# In Railway, open terminal and run:
cp /app/data/production.db /app/data/backup-$(date +%Y%m%d).db

# Or download locally via Railway CLI:
railway run -- cat data/production.db > backup.db
```

---

## Step 7: Monitoring & Maintenance

### 7.1 Set Up Uptime Monitoring

Use a free service like:
- [UptimeRobot](https://uptimerobot.com) - Free for 50 monitors
- [Pingdom](https://www.pingdom.com) - Free tier available
- [StatusCake](https://www.statuscake.com)

Monitor:
- Homepage: `https://plantbandbees.com`
- API health: `https://plantbandbees.com/api/products`
- Check frequency: Every 5 minutes
- Alert via email if down

### 7.2 Monitor Railway Metrics

In Railway dashboard:
- **CPU Usage** - Should be < 50% normally
- **Memory Usage** - Should be < 200MB normally
- **Bandwidth** - Track monthly usage
- **Build Times** - Should be < 2 minutes

### 7.3 Check Logs Regularly

```bash
# View live logs in Railway dashboard
# Or via CLI:
railway logs
```

Look for:
- API errors
- Database errors
- Mailchimp API failures
- Memory issues

### 7.4 Weekly Tasks

- [ ] Check Google Analytics for traffic
- [ ] Review waiting list signups in database
- [ ] Check Mailchimp deliverability rate
- [ ] Review Railway usage/costs
- [ ] Check for any error logs

---

## Troubleshooting

### Deployment Failed

**Check Build Logs:**
1. In Railway, click on your deployment
2. View **Build Logs**
3. Look for errors in npm install or build

**Common Issues:**
- Missing dependencies → `npm install` locally, commit package-lock.json
- TypeScript errors → Run `npm run check` locally and fix errors
- Build timeout → Increase Railway timeout in settings

### Site Not Loading

**Check Deployment Status:**
- Railway deployment should show "Active"
- Check **Deploy Logs** for errors

**Check DNS:**
```bash
# Test DNS resolution
nslookup plantbandbees.com

# Should return Railway IP address
```

**Check Domain Configuration:**
- Verify CNAME records in Namecheap
- Wait up to 24 hours for DNS propagation
- Try accessing via Railway subdomain first

### Database Errors

**"Database locked" error:**
- SQLite can have locking issues under high load
- Consider upgrading to PostgreSQL if needed
- Railway offers PostgreSQL as an add-on

**Reset Database:**
```bash
# In Railway terminal:
rm /app/data/production.db
npm run db:push
```

### Mailchimp Not Working

**Check API Key:**
- Verify key is correct in Railway variables
- Test with Mailchimp API playground
- Check Mailchimp account is active

**Check Logs:**
```bash
railway logs | grep -i mailchimp
```

### Analytics Not Tracking

**Verify Tracking IDs:**
- Check `client/index.html` has correct IDs
- Confirm no typos in tracking codes
- Test with browser extensions:
  - Google Analytics Debugger
  - Facebook Pixel Helper

**Check Console Errors:**
- Open browser DevTools
- Look for tracking script errors
- Verify `gtag` and `fbq` functions are defined

---

## Scaling & Performance

### Current Setup (Free/Starter Tier)

- **Cost:** ~$5-7/month
- **Traffic:** Handles ~10,000 visitors/month
- **Database:** SQLite (suitable for < 1000 leads)

### When to Upgrade

**Upgrade to Railway Pro ($20/month) when:**
- More than 50,000 page views/month
- Need better performance
- Want priority support

**Migrate to PostgreSQL when:**
- More than 1,000 waiting list signups
- Need better concurrent access
- Planning high-traffic campaigns

**Add CDN (Cloudflare) when:**
- Global audience
- Need DDoS protection
- Want faster page loads

---

## Security Checklist

- [ ] SSL certificate active (https://)
- [ ] Environment variables stored in Railway (not in code)
- [ ] `.env` file is git-ignored
- [ ] No API keys in client-side code
- [ ] CORS configured properly
- [ ] Rate limiting on API endpoints (consider adding)
- [ ] Database backups enabled
- [ ] Uptime monitoring active

---

## Post-Launch Checklist

- [ ] Application deployed successfully
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Waiting list form tested end-to-end
- [ ] Analytics tracking verified
- [ ] Mailchimp automation tested
- [ ] Mobile responsive confirmed
- [ ] Backup strategy in place
- [ ] Uptime monitoring configured
- [ ] Google Business Profile created
- [ ] Ready to launch ad campaigns! 🚀

---

## Support Resources

- **Railway Docs:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **Namecheap Support:** https://www.namecheap.com/support/
- **GitHub Docs:** https://docs.github.com

---

## Next Steps After Deployment

1. ✅ Launch Google Ads campaigns (see `GOOGLE_ADS_CAMPAIGN.md`)
2. ✅ Launch Facebook/Instagram ads (see `SOCIAL_ADS_CAMPAIGN.md`)
3. ✅ Set up Mailchimp email sequences (see `EMAIL_SEQUENCES.md`)
4. ✅ Monitor daily for first week
5. ✅ Optimize based on performance data

**Congratulations! Your PlantBandBees application is now live! 🌿🎉**
