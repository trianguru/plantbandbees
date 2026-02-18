#!/bin/bash
# Automated PlantBandBees Deployment Script
# This script automates Railway deployment and Cloudflare DNS configuration

set -e  # Exit on error

echo "🚀 PlantBandBees Automated Deployment"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAINS=("plantbandbees.com" "plantbandbees.org" "airbnbeesknees.com")
PROJECT_DIR="$(pwd)"

# Check for required tools
echo "📋 Checking prerequisites..."

if ! command -v railway &> /dev/null; then
    echo -e "${RED}❌ Railway CLI not found${NC}"
    echo "Installing Railway CLI..."
    npm install -g @railway/cli
fi

if ! command -v curl &> /dev/null; then
    echo -e "${RED}❌ curl not found${NC}"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    echo -e "${RED}❌ jq not found${NC}"
    echo "Installing jq..."
    brew install jq
fi

echo -e "${GREEN}✅ All prerequisites installed${NC}"
echo ""

# Check for environment variables
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo -e "${RED}❌ CLOUDFLARE_API_TOKEN not set${NC}"
    echo ""
    echo "Please set your Cloudflare API token:"
    echo "  export CLOUDFLARE_API_TOKEN='your-new-token-here'"
    echo ""
    echo "Create a new token at: https://dash.cloudflare.com/profile/api-tokens"
    echo "Required permissions:"
    echo "  - Zone → DNS → Edit"
    echo "  - Zone → Zone → Read"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ Cloudflare API token found${NC}"
echo ""

# Step 1: Login to Railway
echo "🚂 Step 1: Logging into Railway..."
if ! railway whoami &> /dev/null; then
    echo "Please login to Railway (browser will open):"
    railway login
else
    echo -e "${GREEN}✅ Already logged into Railway${NC}"
fi
echo ""

# Step 2: Initialize Railway project (if not already)
echo "🚂 Step 2: Setting up Railway project..."
if [ ! -f ".railway/config.json" ]; then
    echo "Linking to GitHub repository..."
    railway init --name plantbandbees
else
    echo -e "${GREEN}✅ Railway project already initialized${NC}"
fi
echo ""

# Step 3: Set environment variables
echo "⚙️  Step 3: Configuring environment variables..."
railway variables set NODE_ENV=production
railway variables set PORT=5000
railway variables set DATABASE_URL="file:./data/production.db"
railway variables set APP_URL="https://plantbandbees.com"
echo -e "${GREEN}✅ Environment variables set${NC}"
echo ""

# Step 4: Deploy to Railway
echo "🚀 Step 4: Deploying to Railway..."
railway up
echo -e "${GREEN}✅ Deployed to Railway${NC}"
echo ""

# Step 5: Get Railway domain
echo "🔍 Step 5: Getting Railway URL..."
RAILWAY_URL=$(railway domain | grep -o 'https://[^ ]*' | head -1)
if [ -z "$RAILWAY_URL" ]; then
    echo -e "${YELLOW}⚠️  No domain found, generating one...${NC}"
    railway domain
    RAILWAY_URL=$(railway domain | grep -o 'https://[^ ]*' | head -1)
fi
RAILWAY_HOST=$(echo $RAILWAY_URL | sed 's|https://||')
echo -e "${GREEN}✅ Railway URL: $RAILWAY_URL${NC}"
echo ""

# Step 6: Configure Cloudflare DNS for each domain
echo "🌐 Step 6: Configuring Cloudflare DNS..."

for domain in "${DOMAINS[@]}"; do
    echo ""
    echo "Configuring $domain..."

    # Get Zone ID
    echo "  Getting Zone ID..."
    ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$domain" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" | jq -r '.result[0].id')

    if [ "$ZONE_ID" == "null" ] || [ -z "$ZONE_ID" ]; then
        echo -e "${RED}  ❌ Could not find zone for $domain${NC}"
        continue
    fi

    echo -e "${GREEN}  ✅ Zone ID: $ZONE_ID${NC}"

    # Create/Update CNAME record for root domain (@)
    echo "  Creating DNS record for @ (root)..."

    # Check if record exists
    RECORD_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?type=CNAME&name=$domain" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" | jq -r '.result[0].id')

    if [ "$RECORD_ID" != "null" ] && [ -n "$RECORD_ID" ]; then
        # Update existing record
        echo "  Updating existing record..."
        curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
            -H "Content-Type: application/json" \
            --data "{\"type\":\"CNAME\",\"name\":\"@\",\"content\":\"$RAILWAY_HOST\",\"ttl\":1,\"proxied\":true}" > /dev/null
    else
        # Create new record
        echo "  Creating new record..."
        curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
            -H "Content-Type: application/json" \
            --data "{\"type\":\"CNAME\",\"name\":\"@\",\"content\":\"$RAILWAY_HOST\",\"ttl\":1,\"proxied\":true}" > /dev/null
    fi

    echo -e "${GREEN}  ✅ Root domain configured${NC}"

    # Create/Update CNAME record for www
    echo "  Creating DNS record for www..."

    RECORD_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?type=CNAME&name=www.$domain" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" | jq -r '.result[0].id')

    if [ "$RECORD_ID" != "null" ] && [ -n "$RECORD_ID" ]; then
        curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
            -H "Content-Type: application/json" \
            --data "{\"type\":\"CNAME\",\"name\":\"www\",\"content\":\"$RAILWAY_HOST\",\"ttl\":1,\"proxied\":true}" > /dev/null
    else
        curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
            -H "Content-Type: application/json" \
            --data "{\"type\":\"CNAME\",\"name\":\"www\",\"content\":\"$RAILWAY_HOST\",\"ttl\":1,\"proxied\":true}" > /dev/null
    fi

    echo -e "${GREEN}  ✅ www subdomain configured${NC}"
    echo -e "${GREEN}  ✅ $domain fully configured${NC}"
done

echo ""
echo "======================================"
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE!${NC}"
echo "======================================"
echo ""
echo "Your sites are now live at:"
echo "  • https://plantbandbees.com"
echo "  • https://plantbandbees.org"
echo "  • https://airbnbeesknees.com"
echo ""
echo "⏰ DNS propagation may take 5-15 minutes"
echo "📊 Check status: https://dnschecker.org"
echo ""
echo "Railway Dashboard: https://railway.app"
echo "Railway URL: $RAILWAY_URL"
echo ""
echo "🌿 Happy lead collecting! 🚀"
