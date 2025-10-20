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
- **[React i18next](https://react.i18next.com/)** - Internationalization framework
  - **Default Language**: English (en)
  - **Supported Languages**: English, Spanish (Español)
  - **Coverage**: 60%+ of site (all main pages and components)

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/) 3.3** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible, unstyled UI components
  - Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu, Label, Slider, Slot, Tabs, Toast
- **[Framer Motion](https://www.framer.com/motion/) 10.16** - Production-ready motion library for animations
- **[Lucide React](https://lucide.dev/) 0.285** - Beautiful & consistent icon set
- **[Class Variance Authority](https://cva.style/) 0.7** - Creating component variants with class names
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge) 1.14** - Utility for merging Tailwind CSS classes

### Content Management System (CMS)
- **[Ghost CMS](https://ghost.org/)** - Modern headless CMS for publishing
  - **Content API URL**: `https://mc.marketingcarcontent.com`
  - **Integration**: Build-time blog post and page fetching
  - **Features**: Blog posts, pages, rich metadata, SEO fields
  - **Authentication**: Content API key (read-only)
- **[BabyLoveGrowth API](https://babylovegrowth.ai/)** - AI-powered SEO content platform
  - **API URL**: `https://api.babylovegrowth.ai/api/public`
  - **Integration**: Build-time supplemental blog content
  - **Features**: AI-generated marketing content, multilingual support
- **[HubSpot](https://hubspot.com/)** - Customer relationship management platform
  - **Portal ID**: `47574927`
  - **Region**: `na1` (North America)
  - **Features**: Contact forms, newsletter subscriptions, lead management
  - **Integration**: Embedded forms for lead capture and customer communications

### SEO & Analytics
- **[React Helmet Async](https://github.com/staylor/react-helmet-async) 2.0** - Document head management (service/who-we-help pages)
- **[React GTM Module](https://github.com/alinemorelli/react-gtm) 2.0** - Google Tag Manager integration
- **Meta Pixel** - Facebook conversion tracking with deferred loading
- **Build-Time SEO Injection** - Blog post metadata injected during build (no client-side override)
- **JSON-LD Schema Markup** - BlogPosting, Service, WebPage, and Organization schemas
- **Sitemap Generation** - Automated XML and TXT sitemap creation
- **RSS Feed** - Automated blog feed generation with full metadata
- **Image Optimization** - Automatic WebP conversion and resizing for blog images

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
│       └── main.yml              # CI/CD pipeline configuration
├── public/                       # Static assets
│   ├── blog/                     # Blog images (optimized WebP)
│   ├── elements/                 # UI element assets
│   ├── og/                       # Open Graph images
│   └── webinars/                 # Webinar assets
├── scripts/                      # Build and optimization scripts
│   ├── build-blog-static.mjs     # Fetch Ghost/BabyLove content + optimize images
│   ├── generate-rss.mjs          # RSS feed generation
│   ├── generate-sitemaps.mjs     # Sitemap generation (XML + TXT)
│   ├── inject-og-into-html.mjs   # Inject SEO metadata into static HTML
│   ├── optimize-images.mjs       # Convert public images to WebP
│   ├── prerender.routes.mjs      # Generate route list for pre-rendering
│   └── spa-copy-routes.mjs       # Create HTML copies for SPA routing
├── src/
│   ├── components/               # Reusable React components
│   │   ├── ui/                   # UI component library (Radix + shadcn/ui)
│   │   ├── Footer.jsx
│   │   ├── Navigation.jsx
│   │   ├── SEOHelmet.jsx         # React Helmet wrapper
│   │   └── ...
│   ├── contexts/                 # React context providers
│   ├── data/                     # Auto-generated static data
│   │   ├── staticBlogPosts.js    # Generated from Ghost + BabyLove APIs
│   │   ├── servicesData.js       # Service page content
│   │   └── whoWeHelpData.jsx     # Who We Help page content
│   ├── lib/                      # Utility libraries
│   ├── pages/                    # Route-based page components
│   │   ├── BlogPostPage.jsx      # Blog post template (no React Helmet)
│   │   ├── HomePage.jsx
│   │   ├── ServicesPage.jsx
│   │   └── ...
│   ├── App.jsx                   # Main application component
│   ├── index.css                 # Global Tailwind styles
│   └── main.jsx                  # Application entry point
├── .env                          # Environment variables (not committed)
├── .prerender-routes.json        # Pre-render route configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── vite.config.js                # Vite build configuration
```

## 🌐 Internationalization (i18n)

### Overview
The site supports English and Spanish with professional translations across all main user journeys. **English is always the default language** - Spanish is only displayed when explicitly selected by the user.

### Configuration
- **Framework**: react-i18next with i18next
- **Default Language**: English (en) - **Always loads first**
- **Additional Languages**: Spanish (es)
- **Language Persistence**: User's language choice saved in localStorage
- **Language Switcher**: Prominent globe button in header (desktop & mobile)

### Translation Files
Located in `src/i18n/locales/`:
```
src/i18n/
├── config.js                    # i18n configuration
└── locales/
    ├── en/
    │   └── common.json          # English translations
    └── es/
        └── common.json          # Spanish translations
```

### Features
- **English Default** - Site always loads in English first
- **Manual Language Selection** - Users click EN/ES button to switch to Spanish
- **Language Switcher** - Enhanced, colorful globe button in header
- **Persistent Choice** - Selected language saved in localStorage for return visits
- **Full Page Translations** - All navigation, hero, pages, footer translate instantly
- **Professional Spanish** - Business-appropriate translations by native speakers
- **Fallback Support** - Missing keys automatically fallback to English

### Translation Coverage
**Fully Translated (100%):**
- ✅ Navigation & menus (all items)
- ✅ Hero section with 5 rotating titles
- ✅ All main pages (Home, About, Services, Who We Help, Contact)
- ✅ Footer with all links
- ✅ Call-to-action sections
- ✅ Form labels and UI elements
- ✅ 404 and Thank You pages

**Not Yet Translated:**
- Landing pages (LP pages)
- Blog content (CMS-sourced)
- Service detail pages (data files)
- Case studies (data files)

**Overall:** ~60% of site content fully translated

### Quick Start
```javascript
// In any component
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation(); // Default namespace
  return <h1>{t('pages.about.title')}</h1>;
}

// For common translations (nav, footer, etc.)
const { t } = useTranslation('common');
return <a>{t('nav.contact')}</a>;
```

### Translation Files Location
```
src/i18n/locales/
├── en/
│   ├── common.json       # Nav, hero, footer, CTAs
│   └── translations.json # Pages, sections, services
└── es/
    ├── common.json       # Spanish translations
    └── translations.json # Spanish translations
```

### Translation Key Structure
**Common Namespace** (`common.json`):
- `nav.*` - Navigation items (home, about, services, etc.)
- `hero.*` - Hero section (titles, subtitle, CTA)
- `footer.*` - Footer (links, copyright, social)
- `cta.*` - Call-to-action buttons
- `language.*` - Language switcher labels

**Translation Namespace** (`translations.json`):
- `pages.*` - Page-specific content (about, contact, services, etc.)
- `servicesSection.*` - Services section component
- `ourDrive.*` - Our Drive value propositions
- `callToAction.*` - CTA section content

### Adding New Translations
1. Add English key to `src/i18n/locales/en/translations.json`
2. Add Spanish translation to `src/i18n/locales/es/translations.json`
3. Use `t('your.key.path')` in component
4. Test both languages with the language switcher

### Documentation
- **[TRANSLATION_STATUS.md](TRANSLATION_STATUS.md)** - Current translation coverage & roadmap
- **[I18N_IMPLEMENTATION.md](I18N_IMPLEMENTATION.md)** - Implementation guide & troubleshooting
- **[Translation Generator](scripts/generate-spanish-translations.mjs)** - Tool for bulk translations

## 🔧 Build Process

The build system runs multiple optimization stages in sequence:

```bash
npm run build
```

**Build Pipeline:**

1. **Clean Build Directory** - `rimraf dist` removes previous build
2. **Optimize Static Images** - `optimize-images.mjs` converts public images to WebP
3. **Fetch & Process Content** - `build-blog-static.mjs`
   - Fetches posts from Ghost CMS API
   - Fetches articles from BabyLove Growth API
   - Downloads and optimizes blog post images to WebP (1200px max width)
   - Generates `src/data/staticBlogPosts.js` with all content
4. **Pre-render Routes** - `prerender.routes.mjs` generates route list
5. **Vite Build** - Bundles and optimizes JavaScript/CSS with code splitting
6. **SPA Route Copies** - `spa-copy-routes.mjs` creates HTML copies for client-side routing
7. **SEO Metadata Injection** - `inject-og-into-html.mjs` injects:
   - Meta tags (title, description, canonical)
   - Open Graph tags (og:title, og:description, og:image, og:type)
   - Twitter Card tags
   - JSON-LD structured data (BlogPosting, Service, WebPage schemas)
8. **Sitemap Generation** - `generate-sitemaps.mjs` creates XML and TXT sitemaps
9. **RSS Feed** - `generate-rss.mjs` generates blog RSS feed with full metadata
10. **LLM Documentation** - `generate-llm-doc.mjs` creates LLM-friendly site documentation

**Key Features:**
- All blog images automatically optimized to WebP at build time
- Blog post metadata injected into static HTML (no React Helmet override)
- Complete SEO metadata in static HTML for optimal crawler indexing
- Separate optimization for Ghost CMS vs BabyLove content sources

## 📝 Content Management

### Ghost CMS
Blog posts and pages are managed through Ghost CMS:
- **Admin Panel**: `https://mc.marketingcarcontent.com/ghost/`
- **Content Types**: Blog posts, pages, authors, tags
- **Features**:
  - Rich Markdown editor with live preview
  - Advanced SEO metadata (meta title, description, OG tags)
  - Featured images with alt text
  - Custom excerpts and publishing dates
  - Tag management and author attribution
- **Integration**: Content fetched via Ghost Content API during build time

### BabyLove Growth Content
Supplemental marketing content powered by AI:
- **Integration**: Automatic fetch during build process
- **Content Type**: Marketing strategy articles, business guides
- **Language Support**: Multilingual content with language codes
- **Optimization**: Images automatically downloaded and converted to WebP

### Content Update Workflow
1. **Create/Edit**: Author content in Ghost CMS admin panel
2. **Publish**: Click publish in Ghost (content immediately available via API)
3. **Build**: Trigger GitHub Actions build (manual or automatic)
   - Scheduled daily at 11:00 UTC
   - Manual trigger via GitHub Actions UI
4. **Deploy**: Automated FTP deployment to hosting server
5. **Live**: Content appears on marketingcar.com after deployment completes

## 🌐 Environment Configuration

### GitHub Secrets (for CI/CD)
The following secrets are configured in GitHub Actions:
```
FTP_SERVER          # FTP hostname for deployment
FTP_USERNAME        # FTP username
FTP_PASSWORD        # FTP password
```

### API Keys (Hardcoded in Build Scripts)
- **Ghost Content API Key**: Stored in `scripts/build-blog-static.mjs`
- **BabyLove API Key**: Stored in `scripts/build-blog-static.mjs`
- **Note**: API keys are read-only and safe for build-time usage

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
- Automatic image optimization to WebP format
- Blog image downloads and optimization at build time
- Lazy loading for third-party scripts (HubSpot, Meta Pixel)

### Caching Strategy
- Long-term asset caching with content hashes
- Aggressive chunk splitting for better cache invalidation
- Optimized dependency bundling
- WebP images with optimized quality/effort settings

## 🛠️ Development Setup

### Prerequisites
- Node.js 20+
- npm package manager
- Git

### Installation
```bash
git clone https://github.com/marketingcar/marketingcarwebsite.git
cd marketingcarwebsite
npm install
npm run dev
```

### Development Commands
```bash
npm run dev              # Start Vite dev server with hot reload
npm run build            # Full production build (all optimization stages)
npm run preview          # Preview production build locally
npm run build:routes     # Generate pre-render routes only
npm run optimize-images  # Optimize public images to WebP only
```

### Development Notes
- Dev server does not fetch Ghost/BabyLove content (uses cached `staticBlogPosts.js`)
- To refresh blog content, run `npm run build` which fetches fresh content
- Blog images are optimized during build, not during dev
- Hot module replacement (HMR) enabled for fast development iteration

## 📊 Monitoring & Analytics

- **Google Tag Manager** - Centralized tag management and event tracking
- **Meta Pixel** - Facebook conversion tracking with deferred loading
- **HubSpot Analytics** - Form submissions and lead tracking
- **Build Metrics** - Bundle size tracking and optimization alerts
- **Schema.org Markup** - Rich snippets for search results
- **Core Web Vitals** - Optimized for LCP, FID, CLS performance metrics

## 🔐 Security Features

- **Read-Only API Keys** - Ghost and BabyLove APIs use read-only content keys
- **GitHub Secrets** - FTP credentials encrypted in GitHub Actions
- **HTTPS Only** - All traffic served over SSL
- **Deferred Third-Party Scripts** - Meta Pixel and HubSpot load after user interaction
- **No Client-Side Secrets** - All API calls happen at build time, not runtime
- **Privacy Policy** - Comprehensive privacy policy at `/privacy-policy`

---

**Live Site**: [https://marketingcar.com](https://marketingcar.com)
**Ghost CMS**: [https://mc.marketingcarcontent.com/ghost/](https://mc.marketingcarcontent.com/ghost/)
**Repository**: [https://github.com/marketingcar/marketingcarwebsite](https://github.com/marketingcar/marketingcarwebsite)
