# 🚀 LIVE DEPLOYMENT GUIDE
## Get PlantBandBees Live in 30 Minutes

**Domains:** plantbandbees.com, plantbandbees.org, airbnbeesknees.com
**Date:** February 8, 2026
**Goal:** All three domains live and collecting leads TODAY

---

## 🎯 DEPLOYMENT STRATEGY

### Domain Setup:
- **plantbandbees.com** → Primary site
- **plantbandbees.org** → Redirects to .com (or same content)
- **airbnbeesknees.com** → Same content for now, customize later

### All three will point to one Railway deployment (for now)

---

## ⚡ STEP-BY-STEP PROCESS

### STEP 1: Create Railway Account (3 minutes)

1. Open browser and go to: **https://railway.app**
2. Click **"Start a New Project"** or **"Login"**
3. Click **"Login with GitHub"**
4. Authorize Railway to access your GitHub
5. ✅ You're in Railway dashboard!

**Screenshot what you see and we'll continue from there.**

---

### STEP 2: Deploy from GitHub (5 minutes)

1. In Railway dashboard, click **"+ New Project"**
2. Select **"Deploy from GitHub repo"**
3. Look for: **`trianguru/plantbandbees`**
4. Click on it to select
5. Railway will automatically start:
   - Installing dependencies (npm install)
   - Building the app (npm run build)
   - Starting the server

**Wait 2-3 minutes while it builds...**

You'll see a deployment URL like:
```
plantbandbees-production-abc123.up.railway.app
```

6. **Click that URL** - your site should load! 🎉

---

### STEP 3: Add Environment Variables (5 minutes)

1. In Railway project view, find the **"Variables"** tab
2. Click **"+ New Variable"**
3. Add these ONE BY ONE:

```bash
NODE_ENV=production
```
*(Click "+ New Variable" again for each)*

```bash
PORT=5000
```

```bash
DATABASE_URL=file:./data/production.db
```

```bash
APP_URL=https://plantbandbees.com
```
*(We'll use .com as primary)*

4. Click **"Deploy"** button to apply changes
5. Wait 30 seconds for redeployment
6. ✅ Environment configured!

---

### STEP 4: Get Railway DNS Info (2 minutes)

1. In Railway project, click **"Settings"**
2. Click **"Domains"** section
3. You'll see your Railway URL (like `plantbandbees-production-abc123.up.railway.app`)
4. Click **"+ Custom Domain"**
5. Type: `plantbandbees.com`
6. Railway will show you DNS records like this:

```
Type: CNAME
Name: @ (or leave blank)
Value: plantbandbees-production-abc123.up.railway.app
```

**COPY THESE VALUES** - you'll need them in next step!

---

### STEP 5: Configure Cloudflare DNS for .com (5 minutes)

1. **Open new tab:** https://dash.cloudflare.com
2. Log into Cloudflare
3. Click on **"plantbandbees.com"** domain
4. Click **"DNS"** in left sidebar
5. Click **"Add record"**

**Add this record:**
- **Type:** CNAME
- **Name:** @ (or leave blank for root domain)
- **Target:** `[paste Railway URL from Step 4]`
- **Proxy status:** ⚡ Proxied (orange cloud - recommended)
- **TTL:** Auto

6. Click **"Save"**

**Also add www subdomain:**
- **Type:** CNAME
- **Name:** www
- **Target:** `[paste Railway URL from Step 4]`
- **Proxy status:** ⚡ Proxied
- **TTL:** Auto

7. Click **"Save"**
8. ✅ Done!

---

### STEP 6: Configure Cloudflare DNS for .org (3 minutes)

1. Still in Cloudflare dashboard
2. Click on **"plantbandbees.org"**
3. Click **"DNS"**
4. Add the SAME records as Step 5:

**Record 1:**
- Type: CNAME
- Name: @
- Target: `[Railway URL]`
- Proxied: ✅

**Record 2:**
- Type: CNAME
- Name: www
- Target: `[Railway URL]`
- Proxied: ✅

5. Click **"Save"**
6. ✅ Done!

---

### STEP 7: Configure Cloudflare DNS for airbnbeesknees.com (3 minutes)

1. Still in Cloudflare
2. Click on **"airbnbeesknees.com"**
3. Click **"DNS"**
4. Add SAME records again:

**Record 1:**
- Type: CNAME
- Name: @
- Target: `[Railway URL]`
- Proxied: ✅

**Record 2:**
- Type: CNAME
- Name: www
- Target: `[Railway URL]`
- Proxied: ✅

5. ✅ All three domains configured!

---

### STEP 8: Add All Domains to Railway (3 minutes)

1. Back in Railway → Settings → Domains
2. You already added plantbandbees.com
3. Click **"+ Custom Domain"** again
4. Type: `plantbandbees.org`
5. Click **"+ Custom Domain"** again
6. Type: `airbnbeesknees.com`

Railway will verify all three domains.

---

### STEP 9: Wait for DNS Propagation (5-15 minutes)

DNS changes take time to spread across the internet.

**Check status:**
1. Go to: https://dnschecker.org
2. Enter: `plantbandbees.com`
3. Check if it shows your Railway URL

**Usually takes:** 5-15 minutes (sometimes up to 1 hour)

☕ Take a break while DNS updates...

---

### STEP 10: Test All Three Domains (5 minutes)

Once DNS propagates, test each domain:

1. Visit: **https://plantbandbees.com**
   - Should load your site ✅
   - Should have padlock (SSL) ✅

2. Visit: **https://plantbandbees.org**
   - Should load your site ✅

3. Visit: **https://www.plantbandbees.com**
   - Should load your site ✅

4. Visit: **https://airbnbeesknees.com**
   - Should load your site ✅

All working? 🎉 **YOU'RE LIVE!**

---

### STEP 11: Test Waiting List Form (3 minutes)

1. Visit **https://plantbandbees.com**
2. Scroll to "Join Waiting List" section
3. Fill out form with test email
4. Click "Join Waiting List"
5. Should redirect to success page ✅

**Check if it saved:**
1. Railway dashboard → Your project
2. Look for "Data" or "Database" section
3. View `waitlist_signups` table
4. Your test email should be there! ✅

---

## 🎉 YOU'RE LIVE! WHAT NOW?

### ✅ What's Working:
- All 3 domains pointing to your site
- SSL certificates (https) working
- Waiting list collecting emails
- Mobile responsive
- Professional design

### 📱 Share Your Links:
- Text friends: "Check out my new site!"
- Post on social media
- Email your network
- Start collecting leads!

### 📊 Monitor Leads:
- Railway dashboard → Database → waitlist_signups
- Or set up Google Sheets export (later)

---

## 🔧 TROUBLESHOOTING

### "Site not loading"
- **Wait longer** - DNS can take up to 1 hour
- **Clear cache** - Cmd+Shift+R (Mac) or Ctrl+F5 (Windows)
- **Check DNS:** https://dnschecker.org

### "Not secure" warning
- Wait for Cloudflare SSL to provision (5-10 min)
- Make sure Proxied (orange cloud) is enabled in Cloudflare

### "Waiting list form not working"
- Check Railway logs for errors
- Verify DATABASE_URL environment variable is set
- Check Railway service is running (green status)

### Railway build failed
- Check Railway logs
- Usually: missing environment variables
- Contact me if stuck

---

## 📈 NEXT STEPS (After Launch)

### Week 1:
- [ ] Test on multiple devices (iPhone, Android, desktop)
- [ ] Share with friends and family
- [ ] Get first 10 signups
- [ ] Monitor Railway for any errors

### Week 2:
- [ ] Set up Google Analytics (track visitors)
- [ ] Set up Mailchimp (email automation)
- [ ] Create welcome email sequence

### Week 3:
- [ ] Launch Google Ads campaign
- [ ] Start Facebook/Instagram ads
- [ ] Begin driving traffic

### Later:
- [ ] Customize airbnbeesknees.com for hosts portal
- [ ] Add more features (dashboard, subscriptions)
- [ ] Scale up!

---

## 💰 COSTS

**Current setup:**
- Railway: $5-7/month
- Cloudflare: $0 (free DNS/SSL)
- **Total: $5-7/month**

**As you scale:**
- More traffic → Railway scales automatically
- Add Mailchimp: Free up to 500 contacts
- Add Google Analytics: Free
- Ad spend: Your budget ($300-2000/month recommended)

---

## 🆘 NEED HELP?

**If you get stuck:**
1. Check Railway logs (tells you what's wrong)
2. Check Cloudflare DNS settings (make sure CNAME records correct)
3. Wait longer (DNS can be slow)
4. Ask me for help!

**Resources:**
- Railway Docs: https://docs.railway.app
- Cloudflare Docs: https://developers.cloudflare.com
- DNS Checker: https://dnschecker.org

---

**🌿 LET'S GET YOU LIVE! Start with STEP 1 and work your way down! 🚀**
