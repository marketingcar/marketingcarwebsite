# Markdown + Decap CMS Setup - Marketing Car Blog

## ✅ Migration Complete

Your blog system has been successfully migrated from Supabase to markdown files with Decap CMS for content editing.

## 🗂️ What Changed

### 1. Blog Content Source
- **Before**: Blog posts stored in Supabase database
- **After**: Blog posts stored as markdown files in `content/blog/`

### 2. Build Process
- **New primary build**: `npm run build` (uses markdown)
- **Fallback build**: `npm run build:supabase` (uses old Supabase system)

### 3. Content Management
- **Before**: Manual database updates
- **After**: Decap CMS web interface at `/admin`

## 📁 File Structure

```
├── content/
│   └── blog/                           # Markdown blog posts
│       ├── 5-quick-ways-to-improve-small-business-marketing.md
│       ├── small-business-marketing-crying.md
│       └── ...
├── public/
│   └── admin/                          # Decap CMS interface
│       ├── index.html                  # CMS admin page
│       └── config.yml                  # CMS configuration
├── scripts/
│   ├── build-blog-markdown.mjs         # NEW: Markdown build script
│   ├── build-blog-static.mjs           # OLD: Supabase build script
│   └── convert-to-markdown.mjs         # Conversion utility
└── src/
    └── lib/
        └── markdownProcessor.js         # Markdown processing utilities
```

## 🎛️ Decap CMS Setup

### To Enable Content Editing:

1. **Update GitHub Repository Path**:
   Edit `public/admin/config.yml`:
   ```yaml
   backend:
     name: github
     repo: YOUR_GITHUB_USERNAME/marketingcar  # ← Update this line
   ```

2. **Access the CMS**:
   - Navigate to `https://your-domain.com/admin`
   - Sign in with GitHub
   - Start editing blog posts!

### CMS Features:
- ✅ Create new blog posts
- ✅ Edit existing posts
- ✅ Upload images
- ✅ Preview changes
- ✅ Publish/unpublish posts
- ✅ Set featured images, excerpts, tags

## 🔄 Content Sources

The system now pulls from **two sources**:

1. **Markdown files** (`content/blog/`) - Your main blog content
2. **Babylove API** - External articles (still integrated)

**Priority**: Markdown posts appear first, then Babylove articles.

## 🛠️ Development Workflow

### Adding New Posts:
1. **Via CMS**: Go to `/admin` → "New Blog" → Write → Publish
2. **Manually**: Create `.md` file in `content/blog/` with frontmatter

### Editing Posts:
1. **Via CMS**: Go to `/admin` → Select post → Edit → Save
2. **Manually**: Edit the `.md` file directly

### Building:
```bash
npm run build                # Uses markdown + Babylove
npm run build:supabase       # Falls back to old Supabase system
```

## 📝 Markdown Post Format

Each post needs this frontmatter structure:

```yaml
---
title: Your Post Title
slug: your-post-slug
excerpt: Brief description of the post
image: https://example.com/image.jpg
date: '2025-09-22'
published: true
author: Marketing Car
tags:
  - marketing
  - business
---

Your markdown content here...
```

## 🚀 Benefits

- ✅ **Version Control**: All posts tracked in Git
- ✅ **No Database**: Eliminates Supabase dependency
- ✅ **Easy Editing**: Web-based CMS interface
- ✅ **GitHub Integration**: Automatic commits/PRs
- ✅ **Backup**: Content stored in repository
- ✅ **Performance**: Static generation, faster builds
- ✅ **SEO**: Same great SEO, now with markdown

## 🔧 Troubleshooting

### If CMS doesn't work:
1. Check GitHub repo path in `config.yml`
2. Ensure you have write access to the repository
3. Verify GitHub OAuth is set up

### If build fails:
1. Try the fallback: `npm run build:supabase`
2. Check for malformed markdown files
3. Ensure all posts have required frontmatter

### To go back to Supabase temporarily:
```bash
npm run build:supabase
```

## 📈 Next Steps

1. Update `config.yml` with your GitHub repo
2. Test the CMS at `/admin`
3. Create your first post via the CMS
4. Set up automated deployments on content changes

Your blog is now powered by markdown files with a professional CMS interface! 🎉