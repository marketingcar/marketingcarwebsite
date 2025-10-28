#!/usr/bin/env node
// ops/validators/html-proofer.mjs
// Validates HTML for broken links, duplicate tags, and meta tag lengths

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const dist = path.join(root, 'dist');

const issues = [];
let totalChecks = 0;
let passedChecks = 0;

const TITLE_MAX = 60;
const DESC_MAX = 160;

function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const p = path.join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

function checkDuplicates($, filePath, selector, name) {
  totalChecks++;
  const elements = $(selector);
  if (elements.length > 1) {
    issues.push({
      file: filePath,
      type: 'error',
      check: 'duplicate-tags',
      message: `Multiple ${name} tags found (${elements.length})`
    });
    return false;
  }
  passedChecks++;
  return true;
}

function checkTagLength($, filePath, selector, name, maxLength) {
  totalChecks++;
  const element = $(selector);
  if (element.length === 0) {
    issues.push({
      file: filePath,
      type: 'warning',
      check: 'missing-tag',
      message: `Missing ${name}`
    });
    return false;
  }

  const content = selector.startsWith('title')
    ? element.first().text().trim()
    : element.first().attr('content') || '';

  if (content.length > maxLength) {
    issues.push({
      file: filePath,
      type: 'error',
      check: 'tag-length',
      message: `${name} too long (${content.length} > ${maxLength}): "${content.substring(0, 80)}..."`
    });
    return false;
  }

  if (content.length === 0) {
    issues.push({
      file: filePath,
      type: 'error',
      check: 'empty-tag',
      message: `${name} is empty`
    });
    return false;
  }

  passedChecks++;
  return true;
}

function checkInternalLinks($, filePath, allFiles) {
  const links = $('a[href^="/"], a[href^="./"], a[href^="../"]');

  links.each((i, elem) => {
    const href = $(elem).attr('href');
    if (!href || href.startsWith('/#')) return; // Skip hash-only links

    totalChecks++;

    // Normalize the href
    let normalizedHref = href;
    if (normalizedHref.includes('#')) {
      normalizedHref = normalizedHref.split('#')[0];
    }
    if (normalizedHref.includes('?')) {
      normalizedHref = normalizedHref.split('?')[0];
    }

    // Skip external links and special cases
    if (normalizedHref.startsWith('http') || normalizedHref.startsWith('//')) {
      passedChecks++;
      return;
    }

    // Check if target file exists
    const targetPath = normalizedHref.endsWith('/')
      ? path.join(dist, normalizedHref, 'index.html')
      : path.join(dist, normalizedHref);

    const altPath = normalizedHref.endsWith('/')
      ? path.join(dist, normalizedHref.slice(0, -1) + '.html')
      : path.join(dist, normalizedHref, 'index.html');

    if (!existsSync(targetPath) && !existsSync(altPath)) {
      issues.push({
        file: filePath,
        type: 'error',
        check: 'broken-link',
        message: `Broken internal link: ${href}`
      });
      return;
    }

    passedChecks++;
  });
}

function validateFile(filePath, allFiles) {
  const rel = path.relative(dist, filePath);
  const html = readFileSync(filePath, 'utf8');
  const $ = load(html);

  // Check for duplicate tags
  checkDuplicates($, rel, 'title', 'title');
  checkDuplicates($, rel, 'link[rel="canonical"]', 'canonical link');
  checkDuplicates($, rel, 'meta[property="og:title"]', 'og:title');
  checkDuplicates($, rel, 'meta[property="og:description"]', 'og:description');
  checkDuplicates($, rel, 'meta[property="og:image"]', 'og:image');
  checkDuplicates($, rel, 'meta[property="og:url"]', 'og:url');

  // Check tag lengths
  checkTagLength($, rel, 'title', 'Title', TITLE_MAX);
  checkTagLength($, rel, 'meta[name="description"]', 'Meta description', DESC_MAX);

  // Check for required tags
  totalChecks++;
  if ($('link[rel="canonical"]').length === 0) {
    issues.push({
      file: rel,
      type: 'error',
      check: 'missing-canonical',
      message: 'Missing canonical link'
    });
  } else {
    passedChecks++;
  }

  // Check internal links
  checkInternalLinks($, rel, allFiles);
}

// Main execution
console.log('[html-proofer] Starting validation...');

if (!existsSync(dist)) {
  console.error('[html-proofer] ERROR: dist/ directory not found. Run build first.');
  process.exit(1);
}

const htmlFiles = walk(dist);
console.log(`[html-proofer] Found ${htmlFiles.length} HTML files`);

for (const file of htmlFiles) {
  validateFile(file, htmlFiles);
}

// Report results
console.log('\n[html-proofer] Results:');
console.log(`  Total checks: ${totalChecks}`);
console.log(`  Passed: ${passedChecks}`);
console.log(`  Failed: ${totalChecks - passedChecks}`);

const errors = issues.filter(i => i.type === 'error');
const warnings = issues.filter(i => i.type === 'warning');

if (errors.length > 0) {
  console.log('\n[html-proofer] ERRORS:');
  for (const issue of errors) {
    console.log(`  ❌ ${issue.file}: ${issue.message}`);
  }
}

if (warnings.length > 0) {
  console.log('\n[html-proofer] WARNINGS:');
  for (const issue of warnings) {
    console.log(`  ⚠️  ${issue.file}: ${issue.message}`);
  }
}

// Exit with error if any errors found
if (errors.length > 0) {
  console.log('\n[html-proofer] ❌ FAILED - Fix errors above');
  process.exit(1);
} else {
  console.log('\n[html-proofer] ✅ PASSED');
  process.exit(0);
}

// Export for report generation
export { issues, totalChecks, passedChecks };
