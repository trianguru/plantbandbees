# PlantBandBees - Professional Plant Service for Knoxville Airbnb Hosts

Beautiful, maintenance-free plants for your short-term rental. We handle 100% of the care. Boost bookings, delight guests.

**Spring 2026 Launch** | **Serving Knoxville, TN + 30-mile radius**

---

## Project Status

✅ **Application Ready for Deployment**
- Full-stack web application built with React + Express + SQLite
- Waiting list functionality implemented
- Analytics tracking integrated (Google Analytics 4, Facebook Pixel, Google Ads)
- Mailchimp email automation ready
- Rebranded to PlantBandBees

---

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Tailwind CSS** + **shadcn/ui** components
- **Zod** for validation
- **React Hook Form** for forms

### Backend
- **Express 5** (Node.js)
- **SQLite** database
- **Drizzle ORM** for database access
- **TypeScript** for type safety

### Integrations
- **Mailchimp API** for email marketing
- **Google Analytics 4** for web analytics
- **Facebook Pixel** for ad tracking
- **Google Ads** conversion tracking

---

## Quick Start

### Prerequisites
- Node.js 20+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
cd ~/Projects/airbnb-green-service

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your API keys

# Push database schema
npm run db:push

# Start development server
npm run dev
```

The app will be available at http://localhost:5000

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## Features

### Current Features
- ✅ Product catalog (subscription tiers + one-time purchases)
- ✅ Shopping cart
- ✅ User authentication (via Replit Auth)
- ✅ User dashboard (subscriptions & orders)
- ✅ **Waiting list with email capture**
- ✅ **Analytics tracking (GA4, FB Pixel, Google Ads)**
- ✅ **Mailchimp integration**
- ✅ Mobile-responsive design

### Marketing Features (NEW)
- ✅ Waiting list signup form with validation
- ✅ Success page with social sharing
- ✅ Email automation integration (Mailchimp)
- ✅ Conversion tracking for Google Ads
- ✅ Facebook Pixel event tracking
- ✅ Lead source attribution

---

## Project Structure

```
airbnb-green-service/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── WaitlistForm.tsx        # NEW: Waiting list signup
│   │   │   ├── Navigation.tsx
│   │   │   └── ui/                     # shadcn/ui components
│   │   ├── pages/         # Page components
│   │   │   ├── Home.tsx               # Updated with waitlist
│   │   │   ├── WaitlistSuccess.tsx    # NEW: Thank you page
│   │   │   ├── ProductList.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── About.tsx
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/
│   │   │   ├── analytics.ts            # NEW: Tracking helpers
│   │   │   └── utils.ts
│   │   └── index.html     # Updated with tracking scripts
│   └── public/
├── server/                 # Backend Express app
│   ├── lib/
│   │   └── mailchimp.ts                # NEW: Mailchimp API
│   ├── routes.ts          # API routes (updated)
│   ├── storage.ts         # Database operations (updated)
│   ├── index.ts           # Server entry point
│   └── db.ts              # Database connection
├── shared/                 # Shared types & schemas
│   ├── schema.ts          # Database schema (updated)
│   └── routes.ts          # API route definitions (updated)
├── .env.example            # NEW: Environment variable template
├── .env                    # NEW: Local env vars (git-ignored)
├── ANALYTICS_SETUP.md      # NEW: Analytics setup guide
├── README.md               # This file
└── package.json
```

---

## Database Schema

### Tables

**Products** - Subscription tiers and one-time purchases
**Subscriptions** - Active user subscriptions
**Orders** - Purchase history
**Order Items** - Items in each order
**Users** - Authenticated users
**Waitlist Signups** ✨ NEW - Waiting list leads with source tracking

---

## Environment Variables

Required environment variables (see `.env.example`):

```bash
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=file:./local.db

# Mailchimp
MAILCHIMP_API_KEY=your_api_key
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_AUDIENCE_ID=your_audience_id

# Analytics
GA_TRACKING_ID=G-XXXXXXXXXX
FB_PIXEL_ID=your_pixel_id

# Google Ads
GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXXX
GOOGLE_ADS_CONVERSION_LABEL=your_label
```

See `ANALYTICS_SETUP.md` for detailed setup instructions.

---

## Deployment

### Railway (Recommended)

1. Create account at [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add environment variables in Railway dashboard
4. Deploy automatically on push

**Estimated cost:** $5-7/month

### Vercel (Frontend Only)

1. Create account at [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Configure build settings:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add environment variables
5. Deploy

**Note:** Will need separate backend hosting.

---

## Marketing Campaign Setup

### Domain Setup
✅ **plantbandbees.com is available!**

Purchase from:
- [Namecheap](https://www.namecheap.com) - ~$12/year
- [Google Domains](https://domains.google) - ~$12/year

### Next Steps for Launch

1. **Deploy Application**
   - Push to GitHub
   - Deploy to Railway
   - Configure custom domain

2. **Set Up Analytics**
   - Follow `ANALYTICS_SETUP.md`
   - Install Google Analytics 4
   - Set up Facebook Pixel
   - Configure Google Ads tracking
   - Connect Mailchimp

3. **Create Marketing Campaigns**
   - See `docs/GOOGLE_ADS_CAMPAIGN.md` (coming soon)
   - See `docs/SOCIAL_ADS_CAMPAIGN.md` (coming soon)
   - See `docs/EMAIL_SEQUENCES.md` (coming soon)

4. **Test Everything**
   - Submit test waiting list signup
   - Verify email received
   - Check analytics tracking
   - Test on mobile

---

## API Endpoints

### Public Endpoints
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `POST /api/waitlist` ✨ NEW - Join waiting list

### Authenticated Endpoints (require login)
- `GET /api/subscriptions` - User's subscriptions
- `POST /api/subscriptions` - Create subscription
- `POST /api/subscriptions/:id/cancel` - Cancel subscription
- `GET /api/orders` - User's orders
- `POST /api/orders` - Create order

---

## Analytics Events Tracked

### Automatic Events
- Page views (all pages)
- Button clicks (CTAs)
- Form starts

### Custom Conversion Events
- **Waiting list signup** (primary conversion)
- Product views
- Add to cart
- Subscription selection
- Order completion

---

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run check

# Push database schema changes
npm run db:push
```

---

## Troubleshooting

### App won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database issues
```bash
# Reset database
rm local.db
npm run db:push
```

### Analytics not tracking
1. Check browser console for errors
2. Verify tracking IDs in `.env` and `client/index.html`
3. Clear cache and test in incognito mode

---

## Support & Documentation

- **Analytics Setup:** See `ANALYTICS_SETUP.md`
- **Deployment Guide:** Coming soon
- **Marketing Campaigns:** See marketing plan document
- **Email Templates:** Coming soon

---

## Roadmap

### Phase 1: Pre-Launch (Current)
- ✅ Build core application
- ✅ Add waiting list
- ✅ Integrate analytics
- ✅ Set up email automation
- ⏳ Deploy to production
- ⏳ Launch ad campaigns

### Phase 2: Launch (Spring 2026)
- Convert waiting list to customers
- Begin installations
- Collect testimonials
- Launch referral program

### Phase 3: Growth
- Expand service area
- Add IoT dashboard features
- Mobile app for hosts
- Automated billing

---

## Contributing

This is a private project for PlantBandBees. For internal team members:

1. Create a feature branch
2. Make changes
3. Test locally
4. Submit pull request
5. Deploy after approval

---

## License

Proprietary - All rights reserved by PlantBandBees

---

## Contact

For questions or support:
- **Email:** (Add your business email)
- **Phone:** (Add your business phone)
- **Website:** https://plantbandbees.com (coming soon)

---

**Built with ❤️ in Knoxville, TN**
