# ⚡ ONE-COMMAND DEPLOYMENT
## Get PlantBandBees Live in 5 Minutes (Automated)

---

## 🚀 Super Quick Deploy (3 Steps)

### Step 1: Create NEW Cloudflare API Token (2 min)

**IMPORTANT:** Don't use the token you shared earlier - create a fresh one!

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click **"Create Token"**
3. Click **"Create Custom Token"**
4. **Configure:**
   - **Token name:** `PlantBandBees DNS Automation`
   - **Permissions:**
     - Zone → DNS → Edit
     - Zone → Zone → Read
   - **Zone Resources:**
     - Include → All zones (or select your 3 domains)
5. Click **"Continue to summary"**
6. Click **"Create Token"**
7. **COPY THE TOKEN** (you'll only see it once!)

### Step 2: Set Your Token (30 seconds)

Open Terminal and run:

```bash
export CLOUDFLARE_API_TOKEN='paste-your-new-token-here'
```

### Step 3: Run Deployment Script (3-5 minutes)

```bash
cd ~/Projects/airbnb-green-service
./deploy-automated.sh
```

**That's it!** The script will:
- ✅ Install Railway CLI (if needed)
- ✅ Log you into Railway (browser opens once)
- ✅ Deploy your app to Railway
- ✅ Configure DNS for all 3 domains automatically
- ✅ Set up SSL certificates
- ✅ Make your sites live

---

## 🎯 What The Script Does

### Automatically:
1. Installs Railway CLI
2. Logs into Railway (you click "Authorize" once)
3. Creates Railway project
4. Sets environment variables
5. Deploys your code from GitHub
6. Gets Railway URL
7. Configures Cloudflare DNS for:
   - plantbandbees.com
   - plantbandbees.org
   - airbnbeesknees.com
8. Sets up www subdomains
9. Enables Cloudflare SSL/CDN

### You Do:
- Create Cloudflare token (2 min)
- Click "Authorize" when Railway opens browser (once)
- Wait 3-5 minutes
- ✅ DONE!

---

## 📺 What You'll See

```bash
🚀 PlantBandBees Automated Deployment
======================================

📋 Checking prerequisites...
✅ All prerequisites installed

✅ Cloudflare API token found

🚂 Step 1: Logging into Railway...
✅ Already logged into Railway

🚂 Step 2: Setting up Railway project...
✅ Railway project already initialized

⚙️  Step 3: Configuring environment variables...
✅ Environment variables set

🚀 Step 4: Deploying to Railway...
✅ Deployed to Railway

🔍 Step 5: Getting Railway URL...
✅ Railway URL: https://plantbandbees-production-abc123.up.railway.app

🌐 Step 6: Configuring Cloudflare DNS...

Configuring plantbandbees.com...
  ✅ Zone ID: abc123
  ✅ Root domain configured
  ✅ www subdomain configured
  ✅ plantbandbees.com fully configured

Configuring plantbandbees.org...
  ✅ Zone ID: def456
  ✅ Root domain configured
  ✅ www subdomain configured
  ✅ plantbandbees.org fully configured

Configuring airbnbeesknees.com...
  ✅ Zone ID: ghi789
  ✅ Root domain configured
  ✅ www subdomain configured
  ✅ airbnbeesknees.com fully configured

======================================
🎉 DEPLOYMENT COMPLETE!
======================================

Your sites are now live at:
  • https://plantbandbees.com
  • https://plantbandbees.org
  • https://airbnbeesknees.com

⏰ DNS propagation may take 5-15 minutes
📊 Check status: https://dnschecker.org

Railway Dashboard: https://railway.app
Railway URL: https://plantbandbees-production-abc123.up.railway.app

🌿 Happy lead collecting! 🚀
```

---

## 🚨 Troubleshooting

### "CLOUDFLARE_API_TOKEN not set"
- You forgot Step 2
- Run: `export CLOUDFLARE_API_TOKEN='your-token'`
- Make sure no spaces around the `=`

### "Railway CLI not found" after install
- Close and reopen Terminal
- Or run: `source ~/.zshrc` (or ~/.bashrc)

### "Permission denied"
- Run: `chmod +x deploy-automated.sh`
- Then try again

### "Could not find zone"
- Check your domains are in Cloudflare
- Verify token has correct permissions
- Make sure you included all 3 zones in token scope

### Script stops during Railway login
- Browser should open automatically
- Click "Authorize" in the browser
- Go back to Terminal - script continues

---

## ⏱️ Timeline

- **0:00** - Run script
- **0:30** - Railway login (click Authorize)
- **1:00** - Railway deploys app
- **3:00** - DNS configured
- **3:00** - Script complete ✅
- **5:00** - DNS propagates
- **8:00** - Sites fully live! 🎉

---

## 💰 Cost

- **Railway:** $5/month (first $5 free)
- **Cloudflare:** $0 (free)
- **Total:** $5/month after trial

---

## 🔐 Security Notes

**Your API token:**
- ✅ Only has DNS permissions (limited scope)
- ✅ Can't transfer domains
- ✅ Can't access billing
- ✅ Can be revoked anytime
- ✅ Stored only in your terminal session (not saved to disk)

**After deployment:**
- You can revoke the token if you want
- DNS changes are already made
- Token only needed for future DNS updates

---

## 🎉 After It's Live

### Test Your Sites:
```bash
curl -I https://plantbandbees.com
curl -I https://plantbandbees.org
curl -I https://airbnbeesknees.com
```

Should all return `200 OK`

### Test Waiting List:
1. Visit https://plantbandbees.com
2. Fill out waiting list form
3. Check Railway dashboard → Data → waitlist_signups

### Monitor:
- **Railway Dashboard:** https://railway.app
- **Cloudflare Dashboard:** https://dash.cloudflare.com
- **DNS Checker:** https://dnschecker.org

---

## 🔄 Future Updates

When you push code to GitHub:
- Railway auto-deploys (within 2 minutes)
- No need to run script again
- DNS stays configured

---

**Ready? Let's do this! 🚀**

```bash
export CLOUDFLARE_API_TOKEN='your-new-token-here'
cd ~/Projects/airbnb-green-service
./deploy-automated.sh
```

**5 minutes to live sites. Let's go! 🌿**
