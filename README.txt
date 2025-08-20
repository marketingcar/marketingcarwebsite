How to enable multi-page prerender output (Vite)

1) Place the file:
   scripts/prerender.routes.mjs

2) Update package.json scripts:
   "build": "node scripts/prerender.routes.mjs && vite build && vite build"

3) Install deps:
   npm i -D vite-plugin-prerender
   npm i @supabase/supabase-js

4) Add plugin to vite.config.(ts|js):
   (see vite.config.patch.txt in this kit)

5) Ensure your app dispatches 'app-rendered' after async route data is ready:
   document.dispatchEvent(new Event('app-rendered'))

6) Build:
   npm run build

You should see:
dist/
  index.html
  about/index.html
  about/blog/index.html
  about/blog/<slug>/index.html
  lp-free-marketing-tips/index.html
  ...
