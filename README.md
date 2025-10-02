# MarketingCar.com

**Driving Your Success, One Mile at a Time.**
This is the official website repository for [MarketingCar.com](https://marketingcar.com), a digital marketing and website strategy firm that helps licensed professionals, therapists, and small businesses get found and get moving with smart, no-fluff marketing.

## 🚗 Overview

Marketing Car was built to untangle digital chaos. Whether you're spinning your wheels with ads or stuck with a site that won't convert, we map a better route. This repository powers our live site and includes our core components, content structure, and styling system.

## 🏗️ Architecture & Technology Stack

### Frontend Framework
- **[React](https://react.dev/) 18.2** - Modern React with hooks and concurrent features
- **[React Router DOM](https://reactrouter.com/) 6.16** - Client-side routing and navigation
- **[Vite](https://vitejs.dev/) 4.4** - Lightning-fast build tool and dev server
- **[TypeScript/JSX](https://www.typescriptlang.org/)** - Type-safe JavaScript with JSX

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/) 3.3** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible, unstyled UI components
  - Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu, Label, Slider, Slot, Tabs, Toast
- **[Framer Motion](https://www.framer.com/motion/) 10.16** - Production-ready motion library for animations
- **[Lucide React](https://lucide.dev/) 0.285** - Beautiful & consistent icon set
- **[Class Variance Authority](https://cva.style/) 0.7** - Creating component variants with class names
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge) 1.14** - Utility for merging Tailwind CSS classes

### Content Management System (CMS)
- **[Strapi](https://strapi.io/) 5.25** - Headless CMS for blog content
  - **Cloud URL**: `https://prized-comfort-f8701bc0e2.strapiapp.com`
  - **Local Development**: `http://localhost:1337` (SQLite database)
  - **Cloud Database**: PostgreSQL
  - **Content Types**: Blog posts with Rich Text (blocks format)
  - **API Integration**: RESTful API with bearer token authentication
  - **Preview Mode**: Configured for live preview at `https://www.marketingcar.com`
  - **Features**:
    - Rich text editor with blocks format
    - Media library with image uploads
    - Draft/publish workflow
    - Multi-environment support (local & cloud)

### Content & API Integrations
- **[Strapi Cloud API](https://prized-comfort-f8701bc0e2.strapiapp.com)** - Blog content management
  - **Build-time fetching**: All blog posts fetched during build and pre-rendered as static HTML
  - **API Token**: Read-only token for public API access
  - **Content Format**: Rich text blocks converted to HTML for rendering
- **[BabyLoveGrowth API](https://babylovegrowth.ai/)** - AI-powered SEO platform
  - **API URL**: `https://api.babylovegrowth.ai/api/public`
  - **Build-time fetching**: All articles fetched during build and baked into static files
  - **Integration**: Additional blog content aggregated at build time
- **[HubSpot](https://hubspot.com/)** - Customer relationship management platform
  - **Portal ID**: `47574927`
  - **Region**: `na1` (North America)
  - **Features**: Contact forms, newsletter subscriptions, lead management
  - **Integration**: Embedded forms for lead capture and customer communications

### SEO & Analytics
- **[React Helmet Async](https://github.com/staylor/react-helmet-async) 2.0** - Document head management
- **[React GTM Module](https://github.com/alinemorelli/react-gtm) 2.0** - Google Tag Manager integration
- **Custom SEO Components** - Schema markup, meta tags, Open Graph
- **Sitemap Generation** - Automated XML and TXT sitemap creation
- **RSS Feed** - Automated blog feed generation

### Development & AI Tools
- **[Claude Code](https://claude.ai/code)** by **[Anthropic](https://anthropic.com/)** - AI-powered development assistant
  - **Usage**: Code generation, debugging, architecture planning, and documentation
  - **Features**: Intelligent code suggestions, automated refactoring, technical guidance
  - **Integration**: Direct IDE integration for real-time development assistance

## 🚀 DevOps & Deployment

### Build System
- **Build Tool**: Vite with advanced optimization
- **Asset Processing**: Image optimization, CSS minification, tree shaking
- **Code Splitting**: Intelligent chunk splitting for optimal loading
- **Pre-rendering**: Static route generation for improved SEO
- **Bundle Analysis**: Rollup plugin visualizer integration

### CI/CD Pipeline
- **Platform**: GitHub Actions
- **Trigger**: Push to main branch + daily scheduled builds (11:00 UTC)
- **Process**:
  1. Checkout repository
  2. Setup Node.js 20 with Yarn cache
  3. Install dependencies (`yarn install --frozen-lockfile`)
  4. Run build process
  5. Deploy via FTP to hosting server

### Hosting & Infrastructure
- **Hosting Provider**: [Hostinger](https://www.hostinger.com/)
- **Deployment Method**: FTP deployment via GitHub Actions
- **Server Directory**: `/public_html/`
- **SSL**: HTTPS enabled
- **CDN**: Integrated content delivery

### Development Workflow
```bash
# Development server
npm run dev          # Start Vite dev server with hot reload

# Building
npm run build        # Full production build with all optimizations
npm run build:analyze  # Build with bundle analysis
npm run preview      # Preview production build locally

# Utilities
npm run build:routes    # Generate pre-render routes
npm run optimize-images # Optimize images to WebP format
```

## 📁 Directory Structure

```
marketingcar/
├── .github/
│   └── workflows/
│       └── main.yml                      # CI/CD pipeline configuration
├── cms/                                  # Strapi CMS (local development)
│   ├── config/                           # Strapi configuration
│   │   └── plugins.ts                    # Preview mode & plugin config
│   ├── src/                              # Strapi source files
│   ├── database/                         # SQLite database (local)
│   └── .env                              # Strapi environment variables
├── content/                              # Markdown content files
│   ├── blog/                             # Blog posts (Markdown)
│   ├── faq/                              # FAQ entries (Markdown)
│   └── pages/                            # Page content (Markdown)
├── plugins/
│   └── visual-editor/                    # Development visual editing tools
├── public/                               # Static assets
│   ├── blog/                             # Blog images and assets
│   ├── elements/                         # UI element assets
│   ├── og/                               # Open Graph images
│   └── webinars/                         # Webinar assets
├── scripts/                              # Build and optimization scripts
│   ├── build-blog-markdown.mjs           # Markdown blog post processing
│   ├── build-blog-static.mjs             # BabyLoveGrowth API fetching
│   ├── build-faq-static.mjs              # FAQ processing
│   ├── generate-prerender-routes.mjs     # Fetch Strapi posts & generate routes
│   ├── generate-rss.mjs                  # RSS feed generation
│   ├── generate-sitemaps.mjs             # Sitemap generation
│   ├── html-to-strapi-blocks.mjs         # HTML to Strapi blocks converter
│   ├── inject-og-into-html.mjs           # Open Graph injection
│   ├── migrate-to-cloud.mjs              # Strapi local → cloud migration
│   ├── optimize-images.mjs               # Image optimization
│   └── spa-copy-routes.mjs               # SPA route copying
├── src/
│   ├── components/                       # Reusable React components
│   │   └── ui/                           # UI component library
│   ├── contexts/                         # React context providers
│   ├── data/
│   │   └── staticBlogPosts.js            # Generated at build (Strapi + BabyLove + Markdown)
│   ├── lib/
│   │   ├── strapi.js                     # Strapi API utilities
│   │   └── contentSanitizer.js           # Content processing & blocks → HTML
│   ├── pages/                            # Route-based page components
│   ├── seo/                              # SEO configurations
│   ├── utils/                            # Helper functions
│   ├── App.jsx                           # Main application component
│   ├── index.css                         # Global styles
│   └── main.jsx                          # Application entry point
├── tools/                                # Development tools
├── .env                                  # Environment variables (Strapi URLs & tokens)
├── .prerender-routes.json                # Generated routes (including blog posts)
├── package.json                          # Dependencies and scripts
├── postcss.config.js                     # PostCSS configuration
├── tailwind.config.js                    # Tailwind CSS configuration
└── vite.config.js                        # Vite build configuration
```

## 🔧 Build Process

The build system includes several optimization stages executed in sequence:

1. **Image Optimization** (`optimize-images.mjs`)
   - Converts images to WebP format for better performance
   - Compresses and optimizes all static images

2. **Content Fetching & Processing** (Build-time static generation)
   - `build-blog-static.mjs` - Fetches all BabyLoveGrowth articles from API
   - `build-blog-markdown.mjs` - Processes local Markdown blog posts
   - Generates `src/data/staticBlogPosts.js` with all content baked in

3. **Route Generation** (`generate-prerender-routes.mjs`)
   - Fetches all blog posts from Strapi Cloud API
   - Reads BabyLoveGrowth posts from static file
   - Generates `.prerender-routes.json` with all routes (including blog posts)

4. **Vite Build**
   - Bundles and optimizes JavaScript/CSS
   - Pre-renders all routes to static HTML using `.prerender-routes.json`
   - Code splitting and tree shaking

5. **Post-Build Processing**
   - `spa-copy-routes.mjs` - Sets up client-side routing fallbacks
   - `inject-og-into-html.mjs` - Injects Open Graph tags and meta data
   - `generate-sitemaps.mjs` - Creates XML and TXT sitemaps from prerender routes
   - `generate-rss.mjs` - Generates blog RSS feed

**Key Feature**: All blog content (Strapi + BabyLoveGrowth + Markdown) is fetched at build time and pre-rendered to static HTML. No runtime API calls needed for blog posts.

## 📝 Content Management

### Strapi CMS
**Access**: `https://prized-comfort-f8701bc0e2.strapiapp.com/admin`

#### Local Development
```bash
cd cms
npm run develop  # Starts Strapi on http://localhost:1337
```

#### Content Types
- **Blog Posts** (api::blog.blog)
  - Fields: title, slug, excerpt, content (Rich Text blocks), image_url, main_image (Media), published, tags (JSON)
  - Rich text editor with blocks format (paragraph, heading, list, quote, code, link)
  - Draft/publish workflow
  - Preview mode enabled (opens preview at `https://www.marketingcar.com/blog/{slug}`)

#### Content Sources
1. **Strapi Cloud** - Primary blog CMS (7+ posts)
   - Managed via Strapi admin UI
   - Rich text content with media library
   - API: `https://prized-comfort-f8701bc0e2.strapiapp.com/api/blogs`

2. **BabyLoveGrowth API** - AI-generated content (10+ posts)
   - Fetched automatically at build time
   - No manual management needed

3. **Markdown Files** - Local content (`content/blog/`)
   - Processed at build time
   - Full markdown support with frontmatter

### Editorial Workflow
- **Strapi**: Draft → Publish workflow in admin UI
- **Build-time fetch**: All content pulled during build and pre-rendered to static HTML
- **Preview mode**: Test changes before publishing via Strapi preview button
- **Deployment**: Automatic on git push to main branch

## 🌐 Environment Configuration

### Required Environment Variables
```env
# Frontend (.env)
VITE_STRAPI_URL=https://prized-comfort-f8701bc0e2.strapiapp.com
VITE_STRAPI_API_TOKEN=your_read_only_token

# Strapi CMS (cms/.env)
CLIENT_URL=https://www.marketingcar.com
PREVIEW_URL=https://www.marketingcar.com
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Optional
VITE_GOOGLE_GTM_ID=your_gtm_id
VITE_HUBSPOT_PORTAL_ID=47574927
```

### GitHub Secrets (for CI/CD)
```
FTP_SERVER=your_ftp_server
FTP_USERNAME=your_ftp_username
FTP_PASSWORD=your_ftp_password
```

## 🚀 Performance Features

### Code Splitting
- React core bundle (highest priority)
- Route-based splitting for pages
- Library-specific chunks (Framer Motion, Radix UI, etc.)
- Component-based splitting

### Build Optimizations
- Tree shaking with terser
- CSS code splitting
- Asset inlining (4KB threshold)
- Source map generation disabled in production
- Console statement removal
- Dead code elimination

### Caching Strategy
- Long-term asset caching with content hashes
- Aggressive chunk splitting for better cache invalidation
- Optimized dependency bundling

## 🛠️ Development Setup

### Prerequisites
- Node.js 20+
- Yarn package manager
- Git

### Installation
```bash
git clone https://github.com/marketingcar/marketingcarwebsite.git
cd marketingcarwebsite
yarn install
cp .env.example .env  # Configure environment variables
yarn dev
```

### Development Commands
```bash
yarn dev              # Start development server
yarn build            # Production build
yarn preview          # Preview production build
yarn build:analyze    # Build with bundle analysis
```

## 📊 Monitoring & Analytics

- Google Tag Manager integration
- Performance monitoring via build metrics
- Error tracking through custom error handlers
- Bundle size monitoring and warnings
- Automated dependency vulnerability scanning

## 🔐 Security Features

- Environment variable security
- CORS configuration
- Content Security Policy headers
- Automated dependency updates
- Git-based authentication for CMS
- FTP credentials stored as GitHub secrets

## 🔄 Migration Notes

### Decap CMS → Strapi (October 2025)
- **Reason**: Moved from Git-based CMS to headless API-based CMS for better content management
- **Changes**:
  - Strapi installed locally in `/cms` directory
  - Strapi Cloud deployment at `https://prized-comfort-f8701bc0e2.strapiapp.com`
  - Blog content migrated with HTML → Rich Text blocks conversion
  - Build process updated to fetch from Strapi API at build time
  - All content pre-rendered to static HTML (no runtime API calls)
  - Preview mode enabled for content editors

---

**Live Site**: [https://marketingcar.com](https://marketingcar.com)
**Strapi CMS**: [https://prized-comfort-f8701bc0e2.strapiapp.com/admin](https://prized-comfort-f8701bc0e2.strapiapp.com/admin)
**Repository**: [https://github.com/marketingcar/marketingcarwebsite](https://github.com/marketingcar/marketingcarwebsite)
