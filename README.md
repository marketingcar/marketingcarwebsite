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
- **[Decap CMS](https://decapcms.org/)** (formerly Netlify CMS) - Git-based headless CMS
  - **Access URL**: `https://marketingcar.com/admin/`
  - **Authentication**: GitHub OAuth via DecapBridge
  - **Content Types**: Blog posts, FAQ entries, Page content
  - **Repository**: `marketingcar/marketingcarwebsite` (main branch)
  - **Media Storage**: `public/blog/images/`

### Database & Backend Services
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service platform
  - **URL**: `https://jaiyxoysjethlblbicfd.supabase.co`
  - **Features**: Authentication, Database, Storage, Real-time subscriptions
  - **Usage**: Blog post fetching, analytics data, form submissions

### SEO & Analytics
- **[React Helmet Async](https://github.com/staylor/react-helmet-async) 2.0** - Document head management
- **[React GTM Module](https://github.com/alinemorelli/react-gtm) 2.0** - Google Tag Manager integration
- **Custom SEO Components** - Schema markup, meta tags, Open Graph
- **Sitemap Generation** - Automated XML and TXT sitemap creation
- **RSS Feed** - Automated blog feed generation

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
npm run build:supabase  # Build with Supabase blog integration
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
├── content/                      # CMS content files
│   ├── blog/                     # Blog posts (Markdown)
│   ├── faq/                      # FAQ entries (Markdown)
│   └── pages/                    # Page content (Markdown)
├── plugins/
│   └── visual-editor/            # Development visual editing tools
├── public/                       # Static assets
│   ├── admin/
│   │   └── config.yml            # Decap CMS configuration
│   ├── blog/                     # Blog images and assets
│   ├── elements/                 # UI element assets
│   ├── og/                       # Open Graph images
│   └── webinars/                 # Webinar assets
├── scripts/                      # Build and optimization scripts
│   ├── build-blog-markdown.mjs   # Blog post processing
│   ├── build-blog-static.mjs     # Static blog generation
│   ├── build-faq-static.mjs      # FAQ processing
│   ├── generate-rss.mjs          # RSS feed generation
│   ├── generate-sitemaps.mjs     # Sitemap generation
│   ├── inject-og-into-html.mjs   # Open Graph injection
│   ├── optimize-images.mjs       # Image optimization
│   ├── prerender.routes.mjs      # Route pre-rendering
│   └── spa-copy-routes.mjs       # SPA route copying
├── src/
│   ├── components/               # Reusable React components
│   │   └── ui/                   # UI component library
│   ├── contexts/                 # React context providers
│   ├── data/                     # Static data files
│   ├── lib/                      # Utility libraries
│   ├── pages/                    # Route-based page components
│   ├── seo/                      # SEO configurations
│   ├── utils/                    # Helper functions
│   ├── App.jsx                   # Main application component
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Application entry point
├── tools/                        # Development tools
├── .env                          # Environment variables
├── .prerender-routes.json        # Pre-render route configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── vite.config.js                # Vite build configuration
```

## 🔧 Build Process

The build system includes several optimization stages:

1. **Image Optimization** - Converts images to WebP format for better performance
2. **Content Processing** - Processes Markdown blog posts and FAQ entries
3. **Route Pre-rendering** - Generates static HTML for all routes
4. **Vite Build** - Bundles and optimizes JavaScript/CSS
5. **SPA Route Handling** - Sets up client-side routing fallbacks
6. **SEO Enhancement** - Injects Open Graph tags and meta data
7. **Sitemap Generation** - Creates XML and TXT sitemaps
8. **RSS Feed** - Generates blog RSS feed

## 📝 Content Management

### Accessing the CMS
1. Navigate to `https://marketingcar.com/admin/`
2. Click "Login with GitHub"
3. Authenticate with GitHub account (requires repository access)
4. Create, edit, and publish content

### Content Types
- **Blog Posts**: Full markdown support with metadata, images, and SEO fields
- **FAQ Entries**: Question/answer pairs with ordering and publishing controls
- **Page Content**: Editable content for static pages (About, Services, Contact, etc.)

### Editorial Workflow
- Draft → Review → Publish workflow enabled
- Version control through Git commits
- Media files stored in repository
- Automatic deployment on publish

## 🌐 Environment Configuration

### Required Environment Variables
```env
SUPABASE_URL=https://jaiyxoysjethlblbicfd.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_URL=https://jaiyxoysjethlblbicfd.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
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
- Library-specific chunks (Supabase, Framer Motion, etc.)
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

---

**Live Site**: [https://marketingcar.com](https://marketingcar.com)
**CMS Access**: [https://marketingcar.com/admin/](https://marketingcar.com/admin/)
**Repository**: [https://github.com/marketingcar/marketingcarwebsite](https://github.com/marketingcar/marketingcarwebsite)