# Claude Instructions - PlantBandBees

## Deployment Preferences

### Platform: Railway
- **Database**: Always use PostgreSQL (NOT SQLite - Railway has caching issues with SQLite migrations)
- **Region**: US East (closest to Knoxville, TN)
- **Build caching**: If build is cached and failing, switch approaches immediately rather than retry

### Workflow Preferences
- **Use Plan Mode** for any deployment, migration, or multi-step technical tasks
- **Ask before destructive actions**: commits, deployments, DNS changes
- **Be efficient**: User has limited time and tokens - get to working solutions fast

### Domain Configuration
- Primary domains: plantbandbees.com, plantbandbees.org, airbnbeesknees.com
- DNS provider: Cloudflare
- When deploying, automatically configure all 3 domains to point to Railway URL
- Use Cloudflare proxy (proxied: true) for SSL and CDN

### Environment Variables (Railway)
```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=<Railway auto-provides from PostgreSQL addon>
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
- **Current Phase**: Pre-launch waiting list collection
- **Target Launch**: Spring 2026

## Common Tasks

### Deploy to Production
1. Use Plan Mode to verify approach
2. Ensure PostgreSQL database is added in Railway
3. Set environment variables
4. Deploy via git push (Railway auto-deploys)
5. Configure Cloudflare DNS for all 3 domains
6. Verify deployment with curl tests

### Update Code
1. Make changes locally
2. Test with `npm run dev`
3. Commit with clear message
4. Push to GitHub
5. Railway auto-deploys

### Database Changes
1. Update `shared/schema.ts`
2. Run `npm run db:push` locally to test
3. Commit and push
4. Railway runs migrations automatically during build

## Lessons Learned
- SQLite + Railway volumes = unreliable (caching issues)
- Always verify build logs show actual execution, not "cached"
- PostgreSQL is Railway's native solution - use it
- Plan Mode prevents trial-and-error waste
