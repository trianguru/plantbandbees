# Claude Instructions - PlantBandBees

## Deployment Preferences

### Platform: Vercel
- Entry point: `api/index.js` — config in `vercel.json`
- Database: PostgreSQL via `DATABASE_URL` env var (Drizzle ORM)
- Deploy: `vercel --prod` or push to GitHub (auto-deploys)

### Workflow Preferences
- **Use Plan Mode** for any deployment, migration, or multi-step technical tasks
- **Ask before destructive actions**: commits, deployments, DNS changes
- **Be efficient**: User has limited time and tokens - get to working solutions fast

### Domain Configuration
- Primary domains: plantbandbees.com, plantbandbees.org, airbnbeesknees.com
- DNS provider: Cloudflare
- When deploying, configure all 3 domains to point to Vercel deployment URL
- Use Cloudflare proxy (proxied: true) for SSL and CDN

### Environment Variables (Vercel)
```bash
NODE_ENV=production
DATABASE_URL=<Postgres connection string>
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
APP_URL=https://plantbandbees.com
```

Optional (add when ready for marketing):
```bash
MAILCHIMP_API_KEY=
MAILCHIMP_SERVER_PREFIX=
MAILCHIMP_AUDIENCE_ID=
GA_TRACKING_ID=
FB_PIXEL_ID=
GOOGLE_ADS_CONVERSION_ID=
GOOGLE_ADS_CONVERSION_LABEL=
```

## Project Info
- **Purpose**: Plant maintenance service for Knoxville Airbnb hosts
- **Stack**: React + Express + PostgreSQL (via Drizzle ORM)
- **Current Phase**: Client portal live (auth, subscriptions, Stripe, email)
- **Target Launch**: Spring 2026

## Auth System (updated March 2026)
- Uses `req.session.userId` — NOT `req.isAuthenticated()` or `user.claims.sub` (old Replit auth)
- Auth routes in `server/replit_integrations/auth/routes.ts`
- Session storage via memorystore

## Stripe
- API version: `"2026-02-25.clover"` (stripe@20.x)
- Webhook route needs `express.raw()` registered BEFORE JSON middleware in `server/routes.ts`
- Routes in `server/routes/stripe.ts`

## Common Tasks

### Deploy to Production
1. Use Plan Mode to verify approach
2. Run `vercel --prod` from project root
3. Set all env vars in Vercel dashboard
4. Configure Cloudflare DNS for all 3 domains to point to Vercel URL
5. Verify deployment with curl tests

### Update Code
1. Make changes locally
2. Test with `npm run dev`
3. Commit with clear message
4. Push to GitHub (Vercel auto-deploys)

### Database Changes
1. Update `shared/schema.ts` or `shared/models/auth.ts`
2. Run `npm run db:push` locally to test
3. Commit and push

## Gotchas
- Pre-existing TypeScript errors in `client/src/` — ignore, don't fix unless explicitly asked
- ralph-loop state files live in BOTH `~/.claude/` AND `plantbandbees/.claude/` — clear both to cancel loop
- Stripe webhook raw body parser must come before Express JSON middleware
