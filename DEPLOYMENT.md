# Cloudflare Deployment Guide

## Production Deployment for Cloudflare Pages & Workers

This guide covers the complete deployment process for the Add Package System V5 on Cloudflare infrastructure.

## Prerequisites

1. Cloudflare account (free tier is sufficient)
2. Wrangler CLI installed (`npm install -g wrangler`)
3. D1 Database created in Cloudflare dashboard
4. GitHub repository connected to Cloudflare

## 1. D1 Database Setup

### Create D1 Database (if not exists)

```bash
# Create new D1 database
wrangler d1 create addpackage-api-ip-db

# Note the database_id from the output and update wrangler.json
```

### Run Database Migration

```bash
# Execute the migration script
wrangler d1 execute addpackage-api-ip-db --file=sql/001-create-ip-addresses-table.sql

# Or use npm script
npm run d1:migrate
```

### Verify Database

```bash
# Check database contents
wrangler d1 execute addpackage-api-ip-db --command "SELECT * FROM ip_addresses LIMIT 10;"
```

## 2. Cloudflare Workers Deployment

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type check and build
npm run check
```

### Deploy to Cloudflare Workers

```bash
# Deploy to production
npm run deploy

# Or deploy with production environment
npm run deploy:prod
```

### Verify Deployment

1. Go to Cloudflare Dashboard > Workers & Pages
2. Find `addpackage-system` worker
3. Check logs in the "Logs" tab
4. Test API endpoints

## 3. Cloudflare Pages Deployment

### Option A: Direct Deployment via Wrangler

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy build/client --project-name=addpackage-system
```

### Option B: GitHub Integration (Recommended)

1. **Connect GitHub Repository**
   - Go to Cloudflare Dashboard > Workers & Pages
   - Click "Create Application" > "Pages"
   - Select "Connect to Git"
   - Choose repository: `NdraDev/addpackage-system`

2. **Configure Build Settings**
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `build/client`
   - **Root directory**: `/`

3. **Environment Variables**
   Add the following in Cloudflare Pages settings:
   ```
   VITE_APP_ENV=production
   ```

4. **D1 Database Binding**
   - Go to Pages settings > Functions > D1 database bindings
   - Add binding:
     - Variable name: `IP_DB`
     - Database: `addpackage-api-ip-db`

5. **Deploy**
   - Click "Save and Deploy"
   - Cloudflare will automatically build and deploy

### Automatic Deployments

Cloudflare Pages will automatically deploy on:
- Push to `main` branch → Production deployment
- Push to other branches → Preview deployment

## 4. API Endpoints

After deployment, your API endpoints will be available at:

```
https://addpackage-system.pages.dev/api/register
https://addpackage-system.pages.dev/api/ip/list
https://addpackage-system.pages.dev/api/ip/check/:ip
```

## 5. Environment Configuration

### Production Environment

The `wrangler.json` includes a production environment:

```json
{
  "env": {
    "production": {
      "vars": {
        "VALUE_FROM_CLOUDFLARE": "Addpackage System Tools By NdraDev - Live Production"
      }
    }
  }
}
```

### Deploy to Production Environment

```bash
wrangler deploy --env production
```

## 6. Monitoring & Logs

### View Worker Logs

```bash
# Stream logs in real-time
wrangler tail

# Or view in Cloudflare Dashboard
```

### Check D1 Database

```bash
# Query database
wrangler d1 execute addpackage-api-ip-db --command "SELECT COUNT(*) as total FROM ip_addresses;"
```

## 7. Troubleshooting

### D1 Database Not Found

**Error**: `D1 Database not found`

**Solution**:
1. Verify database_id in `wrangler.json`
2. Ensure D1 binding is configured in Cloudflare Dashboard
3. Run migration script again

### API Returns 404

**Error**: `404 Not Found for /api/register`

**Solution**:
1. Check worker routes configuration
2. Verify API path starts with `/api/`
3. Check Cloudflare logs for errors

### Build Fails

**Error**: `Build failed`

**Solution**:
```bash
# Clear cache and rebuild
rm -rf build/
npm run build

# Check TypeScript errors
npm run typecheck
```

## 8. Custom Domain Setup

### For Workers

1. Go to Worker settings > Triggers
2. Add custom domain
3. Configure DNS in Cloudflare

### For Pages

1. Go to Pages settings > Custom domains
2. Add your domain
3. Cloudflare automatically configures DNS

## 9. Performance Optimization

### Enable Caching

Add to `workers/app.ts`:

```javascript
const cacheHeaders = {
  "Cache-Control": "public, max-age=3600",
  "CDN-Cache-Control": "public, max-age=86400",
};
```

### Enable Compression

Cloudflare automatically compresses responses with Brotli/Gzip.

## 10. Security Best Practices

### Rate Limiting

Configure in Cloudflare Dashboard:
- Go to Security > WAF
- Create rate limiting rule for `/api/*` endpoints

### CORS Configuration

Already configured in `workers/app.ts`:

```javascript
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
```

### Environment Variables

Never commit sensitive data. Use:
- Cloudflare Dashboard > Settings > Environment variables
- Or `wrangler.toml` (not committed to git)

## 11. CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## 12. Rollback

### Rollback Worker

```bash
# List previous deployments
wrangler versions list

# Rollback to specific version
wrangler versions deploy <version-id>
```

### Rollback Pages

1. Go to Pages > Deployments
2. Find previous successful deployment
3. Click "Retry deployment"

## Support & Resources

- **Cloudflare Docs**: https://developers.cloudflare.com/
- **D1 Documentation**: https://developers.cloudflare.com/d1/
- **Pages Documentation**: https://developers.cloudflare.com/pages/
- **Workers Documentation**: https://developers.cloudflare.com/workers/
- **Discord Support**: https://discord.gg/cloudflaredev

---

**Last Updated**: 2026-03-26
**Version**: 5.0.0
**Author**: NdraDev
