# Facebook & Instagram Ads Campaign Guide - PlantBandBees

Complete setup guide for launching Facebook and Instagram ads to acquire waiting list signups for PlantBandBees in Knoxville, TN.

**Budget:** $200-800/month ($7-25/day)
**Target Cost Per Lead:** $5-12
**Platforms:** 60% Facebook, 40% Instagram
**Campaign Objective:** Conversions (Waiting List Signups)

---

## Campaign Overview

### Campaign Structure

```
PlantBandBees - Knoxville Host Acquisition (Campaign)
├── Ad Set 1: Knoxville AirBnB Hosts - Broad
├── Ad Set 2: Property Owners & Managers
└── Ad Set 3: Local Business Owners
```

Each ad set contains:
- Defined audience targeting
- 4-6 ad creative variations
- Conversion optimization

---

## Step 1: Facebook Business Manager Setup

### 1.1 Create Business Manager Account

1. Go to [business.facebook.com](https://business.facebook.com)
2. Click **Create Account**
3. Business name: **PlantBandBees**
4. Your name: [Your name]
5. Business email: [Your business email]
6. Complete verification

### 1.2 Add Your Facebook Page

1. In Business Manager, go to **Business Settings**
2. Click **Accounts** → **Pages**
3. Click **Add** → **Create a New Page**
4. Page name: **PlantBandBees**
5. Category: **Local Business** or **Home Improvement**
6. Complete page setup:
   - Add profile picture (logo)
   - Add cover photo
   - Fill out About section
   - Add website: https://plantbandbees.com
   - Add location: Knoxville, TN

### 1.3 Add Instagram Account

1. Create Instagram Business account: **@plantbandbees**
2. In Business Manager, go to **Instagram Accounts**
3. Click **Add** → **Connect Your Instagram Account**
4. Log in and connect

### 1.4 Create Ad Account

1. Go to **Business Settings** → **Ad Accounts**
2. Click **Add** → **Create a New Ad Account**
3. Ad account name: **PlantBandBees Ads**
4. Time zone: **(GMT-05:00) Eastern Time**
5. Currency: **USD ($)**
6. Add payment method

---

## Step 2: Facebook Pixel Setup

(Skip if completed via `ANALYTICS_SETUP.md`)

### 2.1 Create Pixel

1. Go to **Events Manager**
2. Click **Connect Data Sources** → **Web** → **Meta Pixel**
3. Pixel name: **PlantBandBees Pixel**
4. Website URL: `https://plantbandbees.com`
5. Copy Pixel ID

### 2.2 Verify Installation

1. Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/)
2. Visit your website
3. Click extension - verify pixel is active
4. Submit test form
5. Check Events Manager for Lead event

---

## Step 3: Custom Conversions

### 3.1 Create Waiting List Conversion

1. In Events Manager, go to **Custom Conversions**
2. Click **Create Custom Conversion**
3. Name: **Waiting List Signup**
4. Data source: PlantBandBees Pixel
5. Conversion event: **Lead**
6. Rules: **URL contains** `/waitlist/success`
7. Value: $100
8. Save

### 3.2 Create Page View Conversion

1. Name: **Waitlist Page View**
2. Event: **ViewContent**
3. Rules: **URL contains** `#waitlist`
4. Save

---

## Step 4: Audience Creation

### 4.1 Custom Audience 1: Website Visitors

1. Go to **Audiences**
2. Click **Create Audience** → **Custom Audience**
3. Source: **Website**
4. Events: **All website visitors**
5. Retention: **30 days**
6. Name: **Website Visitors - 30 Days**

### 4.2 Custom Audience 2: Engaged Users

1. Source: **Engagement**
2. Engagement type: **Facebook Page**
3. Engagement: **People who engaged with your Page**
4. Duration: **365 days**
5. Name: **Page Engagers - 12 Months**

### 4.3 Lookalike Audience (After 50+ signups)

1. Create from: **Waiting List Signups** (custom audience from pixel)
2. Location: **United States**
3. Audience size: **1%** (most similar)
4. Name: **Lookalike - Waiting List 1%**

---

## Step 5: Campaign Creation

### 5.1 Create New Campaign

1. Click **+ Create** in Ads Manager
2. Objective: **Conversions**
3. Campaign name: `PlantBandBees - Knoxville Host Acquisition`

### 5.2 Campaign Settings

**Campaign Budget Optimization:**
- Turn ON
- Campaign budget: **$15/day** (to start)
- Let Facebook allocate budget across ad sets

**Campaign Bid Strategy:**
- Bid strategy: **Lowest cost**
- (After 50+ conversions, switch to **Cost cap** at $12)

**Advantage Campaign Budget:**
- Enable to let Meta optimize across ad sets

---

## Step 6: Ad Set 1 - Knoxville AirBnB Hosts (Broad)

### 6.1 Ad Set Configuration

**Ad set name:** `Knoxville AirBnB Hosts - Broad`

**Conversion Event:** Waiting List Signup

**Dynamic Creative:** OFF (we'll create our own variations)

**Budget:** Let campaign budget optimize

**Schedule:** Run ads all the time

### 6.2 Audience Targeting

**Locations:**
- Type: **People living in this location**
- Location: **Knoxville, Tennessee** + **30 mile radius**
- Include: Knox County, Sevier County, Blount County

**Age:** 25-65

**Gender:** All genders

**Detailed Targeting (Interests):**
- **AND** must match:
  - Short-term rental platforms:
    - Airbnb
    - VRBO
  - Property management
  - Real estate investing
  - Interior design
  - Home & garden

**Narrow Audience:**
- Add: **Small business owners** (behavior)

**Exclude:**
- People who converted (waiting list audience)

**Languages:** English (all)

### 6.3 Placements

**Placement:** Advantage+ Placements (Automatic)

Or Manual Placements:
- ✅ Facebook Feed
- ✅ Facebook Marketplace
- ✅ Instagram Feed
- ✅ Instagram Explore
- ❌ Facebook Right Column (poor performance)
- ❌ Audience Network (initially)

### 6.4 Optimization & Delivery

**Optimization goal:** Conversions
**Cost per result goal:** (Leave blank initially, add $12 after learning)
**Attribution setting:** 7-day click, 1-day view

---

## Step 7: Ad Set 2 - Property Owners & Managers

### 7.1 Audience Targeting

**Same location targeting as Ad Set 1**

**Detailed Targeting:**
- **Property rental**
- **Real estate investment**
- **Home staging**
- **Hospitality industry**

**AND behaviors:**
- **Engaged shoppers**

**AND interests:**
- **Home & garden**

---

## Step 8: Ad Set 3 - Local Business Owners

### 8.1 Audience Targeting

**Location:** Knoxville, TN (no radius, city only)

**Job titles:**
- **Property Manager**
- **Real Estate Agent**
- **Business Owner**

**Interests:**
- **Tourism**
- **Hospitality**
- **Bed & breakfast**

---

## Step 9: Ad Creative - Image Ads

### Theme 1: Before/After Transformation

**Image:** Split-screen - rental before/after adding plants
**Headline:** "Which AirBnB Would YOU Book?"

**Primary Text:**
```
Knoxville hosts: Your guests judge your space in the first 10 seconds.

Plants aren't just decoration - they're an investment in your reviews and bookings.

But who has time to keep them alive between guests? 🌿

That's where we come in.

PlantBandBees provides IoT-monitored plants that practically care for themselves. We handle 100% of maintenance. Your guests enjoy a beautiful, lush space. You enjoy better reviews and more bookings.

Spring 2026 launch in Knox County. Join 50+ local hosts on the waiting list.

👉 Early bird special: 20% off your first 3 months

Limited spots. Knoxville hosts only.
```

**Call to Action:** Sign Up

**Destination:** https://plantbandbees.com/#waitlist

### Theme 2: Zero Maintenance

**Image:** Host relaxing with phone showing plant dashboard

**Primary Text:**
```
Managing your Knoxville AirBnB just got easier.

Every host knows the plant problem:
❌ Guests forget to water them
❌ They die between bookings
❌ You're too busy to care
❌ But listings with plants book 23% faster*

PlantBandBees solves this completely.

✅ IoT sensors monitor soil, water, nutrients 24/7
✅ Our team visits monthly (coordinated with your turnover)
✅ If a plant looks sad, we swap it for free
✅ Guests can even purchase their favorites

Zero effort from you. Beautiful spaces for guests. Better reviews.

Join our waiting list - Spring 2026 launch in Knoxville.
First 25 signups get 20% off for 3 months.

*Industry research data
```

### Theme 3: Revenue Generation

**Image:** Guest holding plant with price tag

**Primary Text:**
```
Your AirBnB plants just paid for themselves.

Here's something most Knoxville hosts don't know:

Guests WANT to buy the plants they see in your rental.

With PlantBandBees:
🌱 Beautiful, professionally maintained plants in your space
🌱 Guests can scan QR codes to purchase
🌱 You get a commission on every sale
🌱 Plants boost bookings by 23%
🌱 Plants increase your review scores

It's not just plant care - it's a revenue stream.

Launching Spring 2026 in Knox County. Limited spots for early adopters.

Join the waiting list → Get 20% off first 3 months.
```

### Theme 4: Local Connection

**Image:** Local Knoxville greenhouse with plants

**Primary Text:**
```
Supporting Knoxville. Beautifying your rental.

PlantBandBees is a 100% local Knoxville business.

We partner with local greenhouses. We hire local plant specialists. We serve Knox County hosts exclusively.

Your subscription supports:
🌿 Local small businesses
🌿 Tennessee native plant growers
🌿 East Tennessee economy

Plus you get:
• Zero-maintenance plant care
• IoT monitoring 24/7
• Monthly service visits
• Plant replacement guarantee

Join 50+ Knox County hosts on our Spring 2026 waiting list.

Early bird: 20% off. First come, first served.
```

---

## Step 10: Ad Creative - Video Ads (15-30 seconds)

### Video Script

```
[Scene 1 - 0:00-0:05]
VISUAL: Host looking disappointed at wilted plant in rental
VOICEOVER: "AirBnB plants. Every host's nightmare."

[Scene 2 - 0:05-0:10]
VISUAL: PlantBandBees team installing plants with IoT sensors
TEXT OVERLAY: "100% Maintenance Included"
VOICEOVER: "Until now."

[Scene 3 - 0:10-0:15]
VISUAL: Dashboard on phone showing healthy plant metrics
TEXT OVERLAY: "IoT Smart Monitoring"
VOICEOVER: "PlantBandBees uses smart sensors to monitor 24/7."

[Scene 4 - 0:15-0:20]
VISUAL: Team member caring for plants professionally
VOICEOVER: "We handle all the maintenance."

[Scene 5 - 0:20-0:25]
VISUAL: Guest admiring plant, scanning QR code on pot
TEXT OVERLAY: "Guests Can Purchase"
VOICEOVER: "Guests can even buy them."

[Scene 6 - 0:25-0:30]
VISUAL: Host smiling with 5-star review on screen
TEXT OVERLAY: "Spring 2026 | Join Waiting List"
VOICEOVER: "Beautiful spaces. Zero effort. Spring 2026."

[Final Screen]
TEXT: "PlantBandBees.com"
TEXT: "20% Off Early Bird Special"
TEXT: "Join Waiting List"
```

**Video Specs:**
- Format: Square (1:1) or Vertical (4:5) for best mobile performance
- Length: 15-30 seconds
- Include captions (80% watch with sound off)
- Brand logo in first 3 seconds

---

## Step 11: Testing & Optimization

### Week 1-2: Learning Phase

**DON'T make major changes.** Let Facebook's algorithm learn.

Monitor:
- Cost per result (CPR)
- Frequency (keep under 3)
- Relevance score
- CTR (Link Click-Through Rate)

**Only action needed:**
- Pause ads with CTR < 0.8% (after 1000 impressions)

### Week 3-4: Initial Optimization

**Creative refresh:**
- Create 2-3 new ad variations
- Test different images
- Test different headlines

**Audience adjustments:**
- Check demographic performance
- Adjust age ranges if needed
- Test excluding certain placements

**Budget:**
- Increase $5/day if CPL < $10
- Decrease if CPL > $15

### Month 2+: Scale

**Expand audiences:**
- Create lookalike audiences from converters
- Test 1%, 2%, 3% lookalikes

**Increase budget:**
- Never more than 20% increase at once
- Monitor CPL closely after increases

**Advanced creative:**
- Video ads
- Carousel ads (show different plant types)
- Collection ads

---

## Step 12: Monitoring Dashboard

### Daily Checks (5 minutes)

In Ads Manager, check:
1. **Spend** - On pace with budget?
2. **Results** - Any conversions today?
3. **CPR** - Cost per result tracking?
4. **Frequency** - Under 3?

### Weekly Analysis (30 minutes)

1. **Ad Performance**
   - Pause poorest CTR ad
   - Duplicate best performer
   - Create variation of winner

2. **Audience Insights**
   - Age/gender breakdown
   - Placement performance
   - Time of day analysis

3. **Budget Allocation**
   - Which ad set performing best?
   - Reallocate if needed

### Monthly Review (1-2 hours)

1. **Overall Performance**
   - Total conversions
   - Average CPL
   - Return on ad spend

2. **Creative Analysis**
   - Which themes work best?
   - Image vs. video performance
   - Headline variations

3. **Audience Refinement**
   - Create new lookalikes
   - Test new interest combinations
   - Exclude non-performers

---

## Key Performance Metrics

### Target Metrics

| Metric | Target | Good | Needs Work |
|--------|--------|------|------------|
| CTR (Link) | 1.5%+ | 2-4% | < 1% |
| Relevance Score | 7+ | 8-10 | < 6 |
| Frequency | < 3 | 1-2 | > 4 |
| CPM | $10-15 | $8-12 | > $20 |
| CPC (Link) | $1-2 | $0.50-1 | > $3 |
| CPL | $5-12 | $5-8 | > $15 |
| Conversion Rate | 20%+ | 25-35% | < 15% |

### Monthly Projections

**Conservative ($200/month at $10 CPL):**
- 20 waiting list signups
- 1,000+ link clicks

**Moderate ($500/month at $8 CPL):**
- 62 waiting list signups
- 3,100+ link clicks

**Aggressive ($800/month at $6 CPL):**
- 133 waiting list signups
- 6,650+ link clicks

---

## Troubleshooting

### High Cost Per Result

**Causes:**
- Poor audience targeting
- Low relevance score
- Bad creative

**Solutions:**
- Narrow audience interests
- Test different images
- Improve ad copy
- Check landing page load speed

### Low Click-Through Rate

**Causes:**
- Weak headlines
- Poor image quality
- Unclear value proposition

**Solutions:**
- Test bold, benefit-driven headlines
- Use high-quality, eye-catching images
- Lead with the problem, then the solution
- Add urgency (limited spots, early bird)

### High Frequency, Low Results

**Causes:**
- Audience too small
- Ad fatigue

**Solutions:**
- Expand audience radius to 40+ miles
- Create new ad creative
- Exclude converters
- Add more interest layering

### Ads Not Delivering

**Causes:**
- Budget too low
- Audience too narrow
- Overlapping ad sets

**Solutions:**
- Increase daily budget to $20+
- Broaden audience targeting
- Consolidate ad sets

---

## Advanced Strategies (Month 3+)

### Retargeting Campaign

**Audience:** Website visitors who didn't convert

**Creative angle:** Different from acquisition ads
- "You checked us out..."
- Address objections
- Emphasize limited spots

**Budget:** $5-10/day

### Video View Campaign

**Objective:** Video Views (awareness)

**Goal:** Build audience for retargeting

**Creative:** 30-60 second brand story video

**Budget:** $5/day

**Follow-up:** Retarget video viewers (75%+) with conversion ads

### Engagement Campaign

**Objective:** Post Engagements

**Goal:** Build social proof on posts

**Creative:** Educational posts about plants/hosting

**Budget:** $3-5/day

**Benefit:** High engagement = better organic reach

### Dynamic Ads

After 50+ conversions:
- Let Facebook automatically test combinations
- Mix headlines, images, descriptions
- Find winning combinations faster

---

## Creative Best Practices

### Images

**DO:**
- ✅ High-quality, professional photos
- ✅ Show plants in real rental settings
- ✅ Include people (hosts/guests)
- ✅ Bright, inviting lighting
- ✅ Before/after comparisons

**DON'T:**
- ❌ Stock photos (look inauthentic)
- ❌ Text-heavy images
- ❌ Dark or cluttered backgrounds
- ❌ Generic plant photos

### Ad Copy

**DO:**
- ✅ Lead with the problem
- ✅ Use numbers/specifics ("20% off", "50+ hosts")
- ✅ Include emojis (🌿 🏡 ✅)
- ✅ Create urgency
- ✅ Local focus ("Knoxville", "Knox County")

**DON'T:**
- ❌ All caps or excessive punctuation!!!
- ❌ Vague benefits
- ❌ Too long (keep under 125 characters for headline)
- ❌ Ignore mobile viewing

### Videos

**DO:**
- ✅ Grab attention in first 3 seconds
- ✅ Add captions
- ✅ Show real product/service
- ✅ Keep under 30 seconds
- ✅ Clear call to action

**DON'T:**
- ❌ Start with slow intro
- ❌ Require sound
- ❌ Be too salesy
- ❌ Forget mobile aspect ratio

---

## Compliance & Policies

### Facebook Ad Policies

**Prohibited:**
- Misleading claims
- Before/after health claims
- Profanity or poor grammar
- Landing page issues

**Best Practices:**
- Use accurate pricing
- Have clear privacy policy
- Don't make unrealistic promises
- Respect community standards

### Rejection Troubleshooting

If ad rejected:
1. Check email for reason
2. Review Facebook ad policies
3. Edit and resubmit
4. Appeal if wrongly rejected

Common issues:
- Too much text in image (limit 20%)
- Landing page doesn't match ad
- Sensational language

---

## Reporting Template

### Weekly Report

```
Week of: [Date Range]

PERFORMANCE SUMMARY:
Campaign: PlantBandBees - Knoxville Host Acquisition
- Spend: $X
- Results: X conversions
- CPR: $X
- Impressions: X
- Link Clicks: X
- CTR: X%

TOP PERFORMERS:
- Best ad: [ad name] - X% CTR, $X CPR
- Best audience: [ad set] - X conversions
- Best placement: [Facebook/Instagram]

ACTIONS TAKEN:
- Created X new ad variations
- Paused X underperforming ads
- Increased budget by $X/day

NEXT WEEK PRIORITIES:
1. [Action item]
2. [Action item]
3. [Action item]
```

---

## Budget Recommendations

### Starter Budget ($200/month)
- Test viability
- Gather data
- 15-25 leads expected

### Growth Budget ($500/month)
- Scale proven ads
- Expand audiences
- 50-75 leads expected

### Aggressive Budget ($800/month)
- Maximum reach
- Multiple ad sets
- Test advanced strategies
- 100-150 leads expected

---

## Next Steps

1. ✅ Complete Facebook Business Manager setup
2. ✅ Create and verify Pixel
3. ✅ Build audiences
4. ✅ Launch campaign
5. ✅ Monitor daily for first week
6. ✅ Create retargeting campaigns (Week 3)
7. ✅ Scale winning ads (Month 2)

**Good luck with your campaign! 🚀**
