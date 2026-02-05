# Lead Tracking System - PlantBandBees

Complete guide to setting up and using the PlantBandBees lead tracking spreadsheet for managing waiting list signups and marketing campaign performance.

**Platform:** Google Sheets (recommended) or Excel
**Purpose:** Track all leads from signup through conversion
**Integration:** Connects with Mailchimp, Google Ads, Facebook Ads

---

## Quick Start

### Option 1: Google Sheets (Recommended)

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **Blank** to create new spreadsheet
3. Name it: `PlantBandBees Lead Tracker 2026`
4. Follow setup instructions below

### Option 2: Excel

1. Open Microsoft Excel
2. Create new workbook
3. Save as: `PlantBandBees_Lead_Tracker_2026.xlsx`
4. Follow setup instructions below

---

## Sheet 1: Lead Master List

### Column Setup

Create columns with the following headers (Row 1):

| Column | Header | Data Type | Purpose |
|--------|--------|-----------|---------|
| A | Lead ID | Auto-number | Unique identifier |
| B | Date Added | Date | Signup timestamp |
| C | Source | Dropdown | Traffic source |
| D | Campaign | Text | Specific campaign name |
| E | First Name | Text | Contact info |
| F | Last Name | Text | Contact info |
| G | Email | Text | Primary contact |
| H | Phone | Text | Secondary contact |
| I | Property Count | Number | # of STR properties |
| J | Service Interest | Dropdown | Desired service type |
| K | Message/Notes | Text | Comments from lead |
| L | Status | Dropdown | Lead stage |
| M | Follow-up Date | Date | Next action date |
| N | Follow-up Count | Number | # of touchpoints |
| O | Last Contact | Date | Most recent interaction |
| P | Converted | Checkbox | Became customer |
| Q | Conversion Date | Date | Purchase/commit date |
| R | Est. Value | Currency | Projected LTV |
| S | Tags | Text | Custom categories |

### Formula Setup

**Lead ID (Column A):**
```
=ROW()-1
```
Start in A2, drag down

**Est. Value (Column R):**
```
=IF(J2="subscription", 1200, IF(J2="one-time", 500, 800))
```
- Subscription: $100/month × 12 months = $1,200
- One-time: $500 average
- Both: $800 average

### Dropdown Setup (Google Sheets)

**Source (Column C):**
1. Select column C (except header)
2. **Data** → **Data validation**
3. Criteria: **List of items**
4. Values: `google-ad, facebook-ad, instagram-ad, organic, referral, other`
5. Show dropdown: ✓
6. Save

**Service Interest (Column J):**
- Values: `one-time, subscription, both`

**Status (Column L):**
- Values: `new, contacted, nurturing, hot, proposal-sent, converted, lost`

### Conditional Formatting

**Hot Leads (Status = "hot"):**
1. Select row 2 to last row
2. **Format** → **Conditional formatting**
3. Format rules: **Custom formula is**
4. Formula: `=$L2="hot"`
5. Background color: Light orange
6. Done

**Converted (Status = "converted"):**
- Formula: `=$L2="converted"`
- Background color: Light green

**Lost (Status = "lost"):**
- Formula: `=$L2="lost"`
- Background color: Light gray
- Text color: Gray

### Sample Data

Add this to test (Row 2):

```
1 | 2/5/2026 | google-ad | Knoxville AirBnB Plants | John | Doe | john@example.com | 865-555-0100 | 2 | subscription | Interested in monthly service | hot | 2/10/2026 | 3 | 2/8/2026 | ☐ | | $1,200 | early-bird
```

---

## Sheet 2: Campaign Performance

### Column Setup

| Column | Header | Data Type | Purpose |
|--------|--------|-----------|---------|
| A | Date Range | Text | Week/month period |
| B | Source | Text | Campaign source |
| C | Campaign Name | Text | Specific campaign |
| D | Impressions | Number | Times ad was shown |
| E | Clicks | Number | Ad clicks |
| F | CTR | Percentage | Click-through rate |
| G | Leads | Number | Signups generated |
| H | Conversion Rate | Percentage | Clicks to leads |
| I | Cost | Currency | Total spend |
| J | CPC | Currency | Cost per click |
| K | CPL | Currency | Cost per lead |
| L | Converted Customers | Number | Actual customers |
| M | Revenue | Currency | Generated revenue |
| N | ROI | Percentage | Return on investment |

### Formula Setup

**CTR (Column F):**
```
=IF(D2=0, 0, E2/D2)
```
Format as percentage

**Conversion Rate (Column H):**
```
=IF(E2=0, 0, G2/E2)
```
Format as percentage

**CPC (Column J):**
```
=IF(E2=0, 0, I2/E2)
```
Format as currency

**CPL (Column K):**
```
=IF(G2=0, 0, I2/G2)
```
Format as currency

**ROI (Column N):**
```
=IF(I2=0, 0, (M2-I2)/I2)
```
Format as percentage

### Sample Data (Row 2)

```
Week 1 (2/5-2/11) | google-ad | AirBnB Maintenance | 5,234 | 157 | 3.0% | 12 | 7.6% | $210 | $1.34 | $17.50 | 0 | $0 | 0%
```

---

## Sheet 3: Weekly Dashboard

### Key Metrics (Top Section)

Create a summary section with:

```
WEEKLY SUMMARY (Week of [Date])

Total Leads This Week: [Formula: COUNTIF]
Total Spend: [Formula: SUM]
Average CPL: [Formula: AVERAGE]
Conversion Rate: [Formula]

LEADS BY SOURCE:
Google Ads: [COUNTIF]
Facebook Ads: [COUNTIF]
Instagram Ads: [COUNTIF]
Organic: [COUNTIF]
Referrals: [COUNTIF]

LEADS BY STATUS:
New: [COUNTIF]
Hot: [COUNTIF]
Converted: [COUNTIF]
Lost: [COUNTIF]
```

### Formula Examples

**Total Leads This Week:**
```
=COUNTIF('Lead Master List'!B:B, ">="&TODAY()-7)
```

**Leads from Google Ads:**
```
=COUNTIF('Lead Master List'!C:C, "google-ad")
```

**Hot Leads:**
```
=COUNTIF('Lead Master List'!L:L, "hot")
```

**Conversion Rate:**
```
=COUNTIF('Lead Master List'!L:L, "converted")/COUNTA('Lead Master List'!A:A)-1
```

### Charts

**Create Pie Chart: Leads by Source**
1. Select cells with source counts
2. **Insert** → **Chart**
3. Chart type: **Pie chart**
4. Customize colors
5. Add data labels
6. Title: "Lead Sources"

**Create Bar Chart: Weekly Lead Growth**
1. Create table with weeks and lead counts
2. **Insert** → **Chart**
3. Chart type: **Column chart**
4. Title: "Weekly Lead Growth"

**Create Line Chart: CPL Trend**
1. Use Campaign Performance data
2. X-axis: Date Range
3. Y-axis: CPL
4. **Insert** → **Chart**
5. Chart type: **Line chart**
6. Title: "Cost Per Lead Trend"

---

## Zapier Integration (Optional)

### Connect Website to Sheets

**Zap 1: Waiting List → Google Sheets**

1. **Trigger:** Webhook
   - Add webhook URL to your API endpoint
   - Test with sample data

2. **Action:** Google Sheets - Create Spreadsheet Row
   - Spreadsheet: PlantBandBees Lead Tracker 2026
   - Worksheet: Lead Master List
   - Map fields:
     - Date Added: {{trigger__created_at}}
     - Source: {{trigger__source}}
     - First Name: {{trigger__name}}
     - Email: {{trigger__email}}
     - Phone: {{trigger__phone}}
     - Property Count: {{trigger__property_count}}
     - Service Interest: {{trigger__service_interest}}
     - Status: new

3. Test and turn on

**Alternative: Google Forms Method**

If Zapier is too complex:

1. Create Google Form with same fields
2. Link form responses to "Form Responses" sheet
3. Use IMPORTRANGE to pull into Lead Master List
4. Or manually review and transfer

---

## Daily Workflow

### Morning Check (5 minutes)

1. Open Lead Master List
2. Filter by: **Date Added = Yesterday**
3. Review new leads:
   - Check for duplicate emails
   - Verify source attribution
   - Add any missing info from Mailchimp

4. Update **Status** for any leads you contacted yesterday

### Weekly Review (30 minutes)

**Monday Morning:**

1. **Update Campaign Performance sheet**
   - Pull data from Google Ads
   - Pull data from Facebook Ads Manager
   - Calculate totals

2. **Review Lead Master List**
   - Sort by **Follow-up Date**
   - Contact any due for follow-up
   - Update **Last Contact** dates

3. **Check Dashboard Metrics**
   - Are you on track for monthly goals?
   - Which source is performing best?
   - Any trends to note?

4. **Hot Lead Outreach**
   - Filter **Status = "hot"**
   - Personal email or phone call
   - Update notes

### Monthly Analysis (1-2 hours)

**First Monday of Month:**

1. **Create Monthly Report**
   - Total leads: [X]
   - Total spend: $[X]
   - Average CPL: $[X]
   - Conversions: [X]
   - Best performing campaign

2. **Identify Trends**
   - Which source had lowest CPL?
   - Which campaign had highest conversion rate?
   - Best day/time for leads?

3. **Optimization Actions**
   - Increase budget on best performers
   - Pause underperformers
   - Test new variations

4. **Update Forecast**
   - At current rate, projected leads by launch?
   - On track for 100-200 goal?

---

## Advanced Features

### Lead Scoring

Add column T: **Lead Score**

Formula:
```
=(IF(I2>2,3,I2))
+(IF(L2="hot",5,IF(L2="nurturing",3,IF(L2="contacted",1,0))))
+(IF(N2>3,3,IF(N2>1,2,1)))
```

Score components:
- Property count (max 3 points)
- Status (max 5 points)
- Follow-up count (max 3 points)

**Total: 0-11 points**
- 8-11: Hot lead (call them!)
- 5-7: Warm lead (email nurture)
- 0-4: Cold lead (automation only)

### Cohort Analysis

Create new sheet: **Cohort Analysis**

Track leads by signup week:
- Week 1 signups: How many converted?
- Week 2 signups: How many converted?
- Compare conversion rates by cohort

### Pipeline Value

Add formula to Dashboard:

**Total Pipeline Value:**
```
=SUMIF('Lead Master List'!L:L, "<>lost", 'Lead Master List'!R:R)
```

Shows projected revenue from all non-lost leads.

### Automated Alerts

**Google Sheets Scripts:**

Create script to email you when:
- Hot lead hasn't been contacted in 3 days
- Follow-up date passed
- New lead from Google Ads (high value)

Menu: **Extensions** → **Apps Script**

---

## Reporting Templates

### Weekly Report to Team

```
PLANTBANDBEES LEAD REPORT
Week of: [Date Range]

📊 PERFORMANCE SUMMARY:
- New Leads: X
- Total Leads: X (↑ X% from last week)
- Hot Leads: X
- Conversions: X
- Spend: $X
- Avg CPL: $X

🎯 TOP PERFORMERS:
- Best Source: [Source] - X leads at $X CPL
- Best Campaign: [Name] - X% conversion rate
- Best Day: [Day] - X leads

📈 TRENDS:
- [Observation 1]
- [Observation 2]
- [Observation 3]

⚡ ACTION ITEMS:
1. [Action]
2. [Action]
3. [Action]

NEXT WEEK GOAL: X leads at $X CPL
```

### Monthly Report to Stakeholders

```
PLANTBANDBEES MONTHLY REPORT
Month: [Month Year]

EXECUTIVE SUMMARY:
- Total Waiting List: X hosts
- New This Month: X hosts
- Total Spend: $X
- Average CPL: $X
- Conversion Rate: X%

CAMPAIGN BREAKDOWN:
┌─────────────────┬───────┬─────────┬──────────┐
│ Source          │ Leads │ Spend   │ CPL      │
├─────────────────┼───────┼─────────┼──────────┤
│ Google Ads      │   X   │  $X     │  $X      │
│ Facebook Ads    │   X   │  $X     │  $X      │
│ Instagram Ads   │   X   │  $X     │  $X      │
│ Organic         │   X   │  $0     │  $0      │
│ Referrals       │   X   │  $0     │  $0      │
└─────────────────┴───────┴─────────┴──────────┘

FORECAST:
At current rate:
- Projected leads by launch: X
- Goal: 100-200
- Status: [On Track / Ahead / Behind]

RECOMMENDATIONS:
1. [Recommendation]
2. [Recommendation]
3. [Recommendation]
```

---

## Best Practices

### Data Hygiene

**Daily:**
- Remove duplicate emails
- Standardize phone formats: (865) 555-0100
- Fix typos in names
- Verify source attribution

**Weekly:**
- Archive lost leads (move to separate sheet)
- Update follow-up dates
- Tag high-value leads

**Monthly:**
- Export backup CSV
- Clean up old notes
- Update projections

### Security

**Google Sheets:**
- Share with specific people only
- Don't share publicly
- Use "Commenter" or "Viewer" permissions (not "Editor") for most people
- Only you and key team members get "Editor"

**Excel:**
- Password protect workbook
- Save backup to cloud storage
- Don't email with full lead list

### Collaboration

**If multiple people track leads:**
1. Assign lead owner in column
2. Use commenting feature for notes
3. Color-code by assigned person
4. Set notification rules

---

## Troubleshooting

### Formulas Not Working

**Issue:** #REF! error
**Solution:** Check sheet names match exactly

**Issue:** #DIV/0! error
**Solution:** Add IF statement to check for zero

**Issue:** Blank cells in totals
**Solution:** Use COUNTA instead of COUNT for text

### Zapier Not Connecting

**Issue:** Data not appearing
**Solutions:**
1. Check webhook URL is correct
2. Test with sample data
3. Verify field mapping
4. Check Google Sheets permissions

### Can't Find Specific Lead

**Use Filters:**
1. Click header row
2. **Data** → **Create a filter**
3. Click dropdown arrow in column
4. Search for value

**Use CTRL+F (or CMD+F):**
- Search by email
- Search by name
- Search by phone

---

## Scaling Tips

### When You Hit 100+ Leads

Consider upgrading to:

**CRM Systems:**
- **HubSpot** (Free tier available)
- **Pipedrive** ($15/month)
- **Airtable** (Better than spreadsheets, $20/month)

**Benefits:**
- Automated workflows
- Email integration
- Better reporting
- Mobile app

### When You Hit 500+ Leads

Consider dedicated marketing platforms:
- **ActiveCampaign** (CRM + Email)
- **Keap** (Small business focused)
- **Salesforce** (Enterprise, if you scale big)

---

## Downloadable Templates

### Google Sheets Template

**To create from this guide:**

1. Follow Sheet 1 setup
2. Follow Sheet 2 setup
3. Follow Sheet 3 setup
4. Save as template

**Share Template:**
File → Share → Copy link → Anyone with link can view

### CSV Import Template

For quick start, create CSV with headers:

```
Lead ID,Date Added,Source,Campaign,First Name,Last Name,Email,Phone,Property Count,Service Interest,Message/Notes,Status,Follow-up Date,Follow-up Count,Last Contact,Converted,Conversion Date,Est. Value,Tags
```

Import to Google Sheets:
**File** → **Import** → **Upload** → Select CSV

---

## Support Resources

- **Google Sheets Help:** [support.google.com/sheets](https://support.google.com/sheets)
- **Excel Help:** [support.microsoft.com/excel](https://support.microsoft.com/excel)
- **Zapier Help:** [zapier.com/help](https://zapier.com/help)

---

## Next Steps

1. ✅ Create spreadsheet (Google Sheets or Excel)
2. ✅ Set up Sheet 1: Lead Master List
3. ✅ Set up Sheet 2: Campaign Performance
4. ✅ Set up Sheet 3: Dashboard
5. ✅ Add formulas and conditional formatting
6. ✅ Import existing leads (if any)
7. ✅ Set up Zapier integration (optional)
8. ✅ Test with sample data
9. ✅ Begin daily tracking
10. ✅ Weekly performance reviews

**Your lead tracking system is ready! 📊**
