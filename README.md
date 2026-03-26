# NdraDev - Add Package System V5

A modern, full-stack web application for IP address registration built with React Router 7, Cloudflare Workers, D1 Database, and shadcn/ui components. Features full animations, comprehensive professional SEO, and a beautiful cloud-themed UI.

## Features

### UI/UX

- **Modern UI with shadcn/ui** - Beautiful, accessible component library
- **Full Animations** - Powered by Framer Motion for smooth interactions
- **Animated Cloud Assets** - Dynamic cloud background with floating animations
- **Vector Graphics** - Custom vector assets throughout the application
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Dark Mode Support** - Automatic theme switching based on system preference
- **PWA Ready** - Progressive Web App with manifest support

### SEO (Professional & Complete)

- **Primary Meta Tags** - Title, description, keywords, author
- **Open Graph Tags** - Full Facebook/LinkedIn social sharing
- **Twitter Cards** - Twitter social card optimization
- **Structured Data (JSON-LD)** - WebApplication and Organization schema
- **Canonical URLs** - SEO-friendly URL structure
- **Robot Meta Tags** - Search engine indexing control
- **Mobile Web App Tags** - iOS and Android optimization
- **Theme Colors** - Browser UI theming

### Backend

- **D1 Database Integration** - Persistent IP storage with Cloudflare D1
- **Toast Notifications** - Real-time feedback for user actions
- **API Endpoints** - RESTful API for IP management
- **IP Validation** - Server and client-side validation

### Monetization

- **CPanel License Button** - Buy CPanel license (Rp15.000)
- **Dual Purchase Options** - Website and WhatsApp checkout
- **Bug Report Section** - Direct contact to owner via WhatsApp and Telegram

## Tech Stack

- **Frontend**: React 19, React Router 7, TypeScript
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Backend**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Build Tool**: Vite

## Prerequisites

- Node.js 18+
- npm or pnpm
- Cloudflare account (for D1 database and deployment)
- Wrangler CLI

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure D1 Database

The wrangler.json is pre-configured with the database:

- Database Name: `addpackage-api-ip-db`
- Database ID: `6d7c503a-e0d4-49d5-8ace-6b9abc4a4c10`

### 3. Run Database Migrations

```bash
npx wrangler d1 execute addpackage-api-ip-db --file=sql/001-create-ip-addresses-table.sql
```

### 4. Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 5. Type Checking & Build

```bash
npm run check
```

### 6. Deploy to Cloudflare

```bash
npm run deploy
```

## Project Structure

```
addpackage-system/
├── app/
│   ├── components/
│   │   └── ui/              # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── sheet.tsx
│   │       ├── toast.tsx
│   │       └── toaster.tsx
│   ├── hooks/
│   │   └── use-toast.ts     # Toast notification hook
│   ├── lib/
│   │   └── utils.ts         # Utility functions (cn)
│   ├── routes/
│   │   └── home.tsx         # Main page with full UI
│   ├── app.css              # Global styles with animations
│   ├── entry.server.tsx     # Server entry point
│   ├── root.tsx             # Root layout with SEO
│   └── routes.ts            # Route configuration
├── public/
│   ├── logo.png             # NdraDev logo
│   ├── vector.png           # Vector asset
│   └── site.webmanifest     # PWA manifest
├── sql/
│   └── 001-create-ip-addresses-table.sql
├── workers/
│   └── app.ts               # Cloudflare Worker with API routes
├── wrangler.json            # Cloudflare configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## API Endpoints

### POST /api/register

Register a new IP address.

**Request:**

```json
{
  "ip": "192.168.1.1"
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "IP registered successfully",
  "data": {
    "id": 1,
    "ip": "192.168.1.1",
    "registered_at": "2026-03-26T..."
  }
}
```

**Response (Error):**

```json
{
  "success": false,
  "error": "IP address already registered"
}
```

### GET /api/ip/check/:ip

Check if an IP is registered.

### GET /api/ip/list

List all registered IP addresses.

## Database Schema

```sql
CREATE TABLE ip_addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## UI Components

### shadcn/ui Components Used

- **Button** - With variants (default, destructive, outline, secondary, ghost, link)
- **Input** - Styled text input with focus states
- **Card** - Container with header, content, and footer sections
- **Sheet** - Slide-out sidebar navigation
- **Toast** - Notification system with success/error variants

### Animations

- **Animated Clouds** - Floating cloud background elements
- **Page Transitions** - Smooth fade-in and slide animations
- **Button Hover** - Scale and shadow effects
- **Loading Spinner** - Rotating animation during API calls
- **Gradient Orbs** - Ambient background animations
- **Vector Animations** - Animated vector assets

### Icons (Lucide React)

- Cloud, Server, Download, CheckCircle
- Menu, Home, Package, Settings, Info
- Shield, Zap, Globe, X
- ShoppingCart, MessageCircle, Bug
- ExternalLink, Mail, Send

## SEO Features

### Meta Tags

- Title and description
- Keywords and author
- Robots and indexing control
- Language and distribution
- Theme colors

### Open Graph

- Type, URL, site name
- Title, description, image
- Image dimensions and alt text
- Locale settings

### Twitter Cards

- Card type (summary large image)
- Site and creator handles
- Title, description, image
- Image alt text

### Structured Data (JSON-LD)

- WebApplication schema
- Organization schema
- Author information
- Contact details
- Social media links

### PWA Features

- Web App Manifest
- Apple Touch Icon
- Mobile web app capabilities
- Theme and background colors

## Contact & Support

### CPanel License

- **Price**: Rp15.000
- **Purchase via Website**: https://license.addpackage.dev
- **Purchase via WhatsApp**: https://wa.me/62895403630048

### Bug Reports

- **WhatsApp**: https://wa.me/6287767867841
- **Telegram**: https://t.me/ndradevid

## Scripts

| Script          | Description                     |
| --------------- | ------------------------------- |
| npm run dev     | Start development server        |
| npm run build   | Build for production            |
| npm run preview | Preview production build        |
| npm run deploy  | Deploy to Cloudflare Workers    |
| npm run check   | Type check and build validation |

## Security Features

- IP validation (format and octet range)
- Duplicate IP prevention
- Server-side validation
- Parameterized SQL queries (SQL injection prevention)
- CORS headers configured

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - Built by NdraDev

---

**Built with:** React Router 7, Cloudflare Workers, D1 Database, shadcn/ui, Framer Motion, TailwindCSS, TypeScript, Lucide Icons

**Contact:**

- WhatsApp: +62 877-6786-7841
- Telegram: @ndradevid
- Website: https://addpackage.dev
