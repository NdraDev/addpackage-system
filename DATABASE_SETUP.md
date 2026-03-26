# IMPORTANT: Deploy to Cloudflare Workers/Pages to use the live D1 database!

## Local Development Limitations

When running `npm run dev` locally, the application CANNOT connect to the Cloudflare D1 database directly. 

The D1 database only works in:
1. **Cloudflare Workers** (deployed)
2. **Cloudflare Pages** (deployed)
3. **Local Wrangler dev** with `--remote` flag

## Solutions

### Option 1: Deploy to Cloudflare (RECOMMENDED)

Deploy the application to Cloudflare Workers or Pages where it can access the D1 database:

```bash
# Deploy to Cloudflare Workers
npm run deploy

# Or deploy to Cloudflare Pages
# 1. Go to Cloudflare Dashboard > Workers & Pages
# 2. Connect GitHub repository
# 3. Configure D1 binding
# 4. Deploy
```

After deployment, the app will show real data from the database at:
- `https://addpackage-system.pages.dev` (or your custom domain)

### Option 2: Use Wrangler Dev with Remote Database

For local testing with the actual D1 database:

```bash
# Run with --remote flag to use production D1 database
npx wrangler dev --remote
```

This will connect to your production D1 database locally.

### Option 3: Create Local D1 Database

Create a local D1 database for development:

```bash
# Create local D1 database
wrangler d1 create addpackage-api-ip-db-local

# Update wrangler.json with new database_id

# Run migration
wrangler d1 execute addpackage-api-ip-db-local --file=sql/001-create-ip-addresses-table.sql

# Run dev with local database
npm run dev
```

## Database Information

**Production D1 Database:**
- Name: `addpackage-api-ip-db`
- ID: `6d7c503a-e0d4-49d5-8ace-6b9abc4a4c10`
- Table: `ip_addresses`
- Current data: 1.1.1.1 (from screenshot)

## Verify Database Connection

After deployment, check the browser console for logs:
- Open DevTools (F12)
- Look for "Fetching server stats..." logs
- Check API response data

## Cloudflare Pages Setup

1. Go to Cloudflare Dashboard > Workers & Pages > Create Application
2. Select "Pages" > "Connect to Git"
3. Choose repository: `NdraDev/addpackage-system`
4. Build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `build/client`
5. **IMPORTANT**: Add D1 Database Binding:
   - Go to Settings > Functions > D1 database bindings
   - Variable name: `IP_DB`
   - Database: `addpackage-api-ip-db`
6. Save and Deploy

## Support

If you still see 0 servers after deployment:
1. Check Cloudflare Worker logs
2. Verify D1 binding in Cloudflare Dashboard
3. Check browser console for errors
4. Test API endpoint directly: `https://your-domain.com/api/ip/list`
