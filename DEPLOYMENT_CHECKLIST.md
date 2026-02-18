# PlantBandBees Deployment Checklist - LIVE DEPLOYMENT
**Date:** February 8, 2026
**Goal:** Get both domains live and collecting leads TODAY

---

## ✅ PRE-FLIGHT CHECK

### Domains Purchased:
- [ ] Domain 1: _________________ (main site)
- [ ] Domain 2: airbnbeesknees.com (hosts portal)
- [ ] Registrar: _________________
- [ ] Login access to domain registrar: YES / NO

### Accounts Needed:
- [ ] Railway.app account (hosting)
- [ ] GitHub access (code already there: trianguru/plantbandbees)

### Optional (can add later):
- [ ] Google Analytics account
- [ ] Mailchimp account
- [ ] Facebook Business account

---

## 🚀 DEPLOYMENT STEPS

### STEP 1: Create Railway Account (5 min)

1. Go to https://railway.app
2. Click "Login with GitHub"
3. Authorize Railway to access GitHub
4. Confirm email address
5. **✓ Railway account created**

### STEP 2: Deploy from GitHub (10 min)

1. In Railway dashboard, click "New Project"
2. Select "Deploy from GitHub repo"
3. Find and select: `trianguru/plantbandbees`
4. Railway will automatically:
   - ✓ Detect Node.js app
   - ✓ Install dependencies
   - ✓ Build the application
   - ✓ Start the server
5. **Wait for deployment to complete** (shows "Active" status)
6. Railway will give you a URL like: `plantbandbees-production.up.railway.app`
7. **✓ Click the URL to test** - site should load!

### STEP 3: Add Environment Variables (5 min)

1. In Railway project, click "Variables"
2. Add these variables (one at a time):

```
NODE_ENV=production
PORT=5000
DATABASE_URL=file:./data/production.db
APP_URL=https://plantbandbees-production.up.railway.app
```

**Optional (skip for now, add later):**
```
MAILCHIMP_API_KEY=(we'll add this later)
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_AUDIENCE_ID=(we'll add this later)
GA_TRACKING_ID=(we'll add this later)
FB_PIXEL_ID=(we'll add this later)
```

3. Click "Deploy" to apply changes
4. **✓ Environment configured**

### STEP 4: Configure Domain #1 - Main Site (10 min)

1. In Railway, click "Settings" → "Domains"
2. Click "Custom Domain"
3. Enter your main domain: `_____________.com`
4. Railway will show DNS records you need to add

**Copy these values (Railway provides them):**
- **Type:** CNAME
- **Name:** @ (or blank)
- **Value:** `your-project.up.railway.app`

5. **Now go to your domain registrar** (Namecheap/GoDaddy/etc)
6. Find "DNS Settings" or "Manage DNS"
7. Add the CNAME record Railway gave you
8. Save changes
9. **Wait 5-10 minutes** for DNS to propagate
10. **✓ Test:** Visit your domain - should show your site!

### STEP 5: Configure Domain #2 - Hosts Portal (10 min)

1. Back in Railway, click "Add Custom Domain" again
2. Enter: `airbnbeesknees.com`
3. Railway provides DNS records again
4. Go to domain registrar
5. Add CNAME record for airbnbeesknees.com
6. Save changes
7. **Wait 5-10 minutes** for DNS
8. **✓ Test:** Visit airbnbeesknees.com - should show same site (for now)

### STEP 6: Test Waiting List (5 min)

1. Visit your main domain
2. Scroll to "Join Waiting List" section
3. Fill out form with test email
4. Submit
5. Should redirect to success page
6. **✓ Check Railway logs** - should see database entry

---

## 🎉 YOU'RE LIVE!

### What's Working:
✓ Both domains live
✓ Waiting list collecting emails
✓ Professional design
✓ Mobile responsive
✓ SSL certificates (automatic via Railway)

### What to Add Next (Week 2+):
- [ ] Google Analytics (track visitors)
- [ ] Mailchimp (email automation)
- [ ] Custom content for hosts portal (airbnbeesknees.com)
- [ ] Launch ad campaigns

---

## 📊 HOW TO CHECK LEADS

**Option 1: Railway Database Browser**
1. Railway dashboard → Your project
2. Click "Data" tab
3. View `waitlist_signups` table

**Option 2: Add Zapier Integration** (later)
1. Zapier can automatically send leads to Google Sheets
2. Or send email notifications when someone signs up

---

## 🚨 TROUBLESHOOTING

### Site not loading after DNS changes?
- **Wait longer** - DNS can take up to 24 hours (usually 10 min)
- **Check DNS:** Use https://dnschecker.org to verify propagation
- **Clear browser cache:** Cmd+Shift+R (Mac) or Ctrl+F5 (Windows)

### Build failed in Railway?
- Check Railway logs for error messages
- Usually: missing environment variables or dependency issues
- Solution: Add required environment variables, redeploy

### Waiting list form not working?
- Check Railway logs for errors
- Verify DATABASE_URL is set correctly
- Run database migration: Railway → Service → "Run db:push"

### Both domains showing same content?
- **Expected for MVP!**
- Later we'll add routing to show different content per domain
- For now, both collect leads - that's the goal

---

## 📞 SUPPORT RESOURCES

- **Railway Docs:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **DNS Checker:** https://dnschecker.org
- **Your GitHub:** https://github.com/trianguru/plantbandbees

---

## NEXT STEPS AFTER DEPLOYMENT

### Immediate (Next 24 hours):
1. Test site on mobile devices
2. Share links with friends for feedback
3. Post on social media to get first leads

### Week 1:
1. Set up Google Analytics
2. Monitor lead submissions
3. Test on multiple browsers

### Week 2:
1. Set up Mailchimp automation
2. Send welcome email to early signups
3. Start planning ad campaigns

### Week 3:
1. Launch Google Ads campaign
2. Create Facebook/Instagram ads
3. Monitor cost per lead

---

**🌿 LET'S GO! Time to get some leads! 🚀**
