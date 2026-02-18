#!/bin/bash
# PlantBandBees Automated Deployment Script
# Prerequisites: Railway CLI installed, PostgreSQL database added in Railway

set -e

echo "🚀 PlantBandBees Deployment"
echo "=========================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v railway &> /dev/null; then
    echo -e "${RED}❌ Railway CLI not found${NC}"
    echo "Install: npm install -g @railway/cli"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    echo -e "${RED}❌ jq not found${NC}"
    echo "Install: brew install jq"
    exit 1
fi

if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  CLOUDFLARE_API_TOKEN not set${NC}"
    echo "Set it with: export CLOUDFLARE_API_TOKEN='your-token'"
    echo ""
    read -p "Continue without DNS configuration? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    SKIP_DNS=true
fi

echo -e "${GREEN}✅ Prerequisites OK${NC}"
echo ""

# Verify PostgreSQL
echo "🔍 Verifying Railway setup..."
if ! railway variables | grep -q "DATABASE_URL"; then
    echo -e "${RED}❌ DATABASE_URL not found${NC}"
    echo ""
    echo "Please add PostgreSQL database in Railway:"
    echo "  1. Go to Railway dashboard"
    echo "  2. Click '+ New' → Database → Add PostgreSQL"
    echo "  3. Wait for it to provision"
    echo "  4. DATABASE_URL will be auto-set"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ PostgreSQL configured${NC}"
echo ""

# Deploy
echo "📦 Deploying to Railway..."
git add -A
git diff --staged --quiet || git commit -m "Deploy: $(date +%Y-%m-%d\ %H:%M:%S)"
git push origin main

echo -e "${GREEN}✅ Code pushed to GitHub${NC}"
echo ""

# Wait for deployment
echo "⏳ Waiting for Railway deployment..."
sleep 10

# Get Railway URL
RAILWAY_URL=$(railway domain 2>&1 | grep -o 'https://[^ ]*' | head -1)
if [ -z "$RAILWAY_URL" ]; then
    echo -e "${YELLOW}⚠️  No Railway domain found, generating one...${NC}"
    railway domain
    RAILWAY_URL=$(railway domain 2>&1 | grep -o 'https://[^ ]*' | head -1)
fi

RAILWAY_HOST=$(echo $RAILWAY_URL | sed 's|https://||')
echo -e "${GREEN}✅ Railway URL: $RAILWAY_URL${NC}"
echo ""

# Configure DNS
if [ "$SKIP_DNS" != true ]; then
    echo "🌐 Configuring Cloudflare DNS..."

    DOMAINS=("plantbandbees.com" "plantbandbees.org" "airbnbeesknees.com")

    for domain in "${DOMAINS[@]}"; do
        echo ""
        echo "📍 Configuring $domain..."

        # Get Zone ID
        ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$domain" \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
            -H "Content-Type: application/json" | jq -r '.result[0].id')

        if [ "$ZONE_ID" == "null" ]; then
            echo -e "${RED}  ❌ Could not find zone for $domain${NC}"
            continue
        fi

        # Configure root domain
        RECORD_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?type=CNAME&name=$domain" \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" | jq -r '.result[0].id')

        if [ "$RECORD_ID" != "null" ] && [ -n "$RECORD_ID" ]; then
            curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
                -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
                -H "Content-Type: application/json" \
                --data "{\"type\":\"CNAME\",\"name\":\"@\",\"content\":\"$RAILWAY_HOST\",\"ttl\":1,\"proxied\":true}" > /dev/null
        else
            curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
                -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
                -H "Content-Type: application/json" \
                --data "{\"type\":\"CNAME\",\"name\":\"@\",\"content\":\"$RAILWAY_HOST\",\"ttl\":1,\"proxied\":true}" > /dev/null
        fi

        echo -e "${GREEN}  ✅ $domain configured${NC}"
    done

    echo ""
    echo -e "${GREEN}✅ DNS configured${NC}"
fi

echo ""
echo "======================================"
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE${NC}"
echo "======================================"
echo ""
echo "Your sites:"
echo "  • https://plantbandbees.com"
echo "  • https://plantbandbees.org"
echo "  • https://airbnbeesknees.com"
echo ""
echo "Railway: $RAILWAY_URL"
echo ""
echo "⏰ DNS may take 5-15 minutes to propagate"
echo ""
