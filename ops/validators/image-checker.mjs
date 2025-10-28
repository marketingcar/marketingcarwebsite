#!/usr/bin/env node
// ops/validators/image-checker.mjs
// Validates image attributes and page sizes

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

const MAX_PAGE_SIZE = 2 * 1024 * 1024; // 2MB

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

function checkImageAttributes($, filePath) {
  const images = $('img');
  let missingWidth = 0;
  let missingHeight = 0;
  let missingLoading = 0;

  images.each((i, elem) => {
    totalChecks += 3;

    const src = $(elem).attr('src');
    const width = $(elem).attr('width');
    const height = $(elem).attr('height');
    const loading = $(elem).attr('loading');

    if (!width || width.length === 0) {
      missingWidth++;
    } else {
      passedChecks++;
    }

    if (!height || height.length === 0) {
      missingHeight++;
    } else {
      passedChecks++;
    }

    // First few images might not have loading (critical images)
    // But most should have loading="lazy"
    if (!loading || loading.length === 0) {
      missingLoading++;
    } else {
      passedChecks++;
    }
  });

  if (missingWidth > 0) {
    issues.push({
      file: filePath,
      type: 'error',
      check: 'missing-image-width',
      message: `${missingWidth} images missing width attribute`
    });
  }

  if (missingHeight > 0) {
    issues.push({
      file: filePath,
      type: 'error',
      check: 'missing-image-height',
      message: `${missingHeight} images missing height attribute`
    });
  }

  if (missingLoading > 1) { // Allow first image to not have loading
    issues.push({
      file: filePath,
      type: 'warning',
      check: 'missing-lazy-loading',
      message: `${missingLoading} images missing loading attribute (consider loading="lazy")`
    });
  }
}

function checkPageSize(filePath, htmlContent) {
  totalChecks++;
  const size = Buffer.byteLength(htmlContent, 'utf8');

  if (size > MAX_PAGE_SIZE) {
    issues.push({
      file: filePath,
      type: 'warning',
      check: 'page-size',
      message: `Page size ${(size / 1024).toFixed(1)}KB exceeds recommended 2MB`
    });
  } else {
    passedChecks++;
  }
}

function validateFile(filePath) {
  const rel = path.relative(dist, filePath);
  const html = readFileSync(filePath, 'utf8');
  const $ = load(html);

  checkImageAttributes($, rel);
  checkPageSize(rel, html);
}

// Main execution
console.log('[image-checker] Starting validation...');

if (!existsSync(dist)) {
  console.error('[image-checker] ERROR: dist/ directory not found. Run build first.');
  process.exit(1);
}

const htmlFiles = walk(dist);
console.log(`[image-checker] Found ${htmlFiles.length} HTML files`);

for (const file of htmlFiles) {
  validateFile(file);
}

// Report results
console.log('\n[image-checker] Results:');
console.log(`  Total checks: ${totalChecks}`);
console.log(`  Passed: ${passedChecks}`);
console.log(`  Failed: ${totalChecks - passedChecks}`);

const errors = issues.filter(i => i.type === 'error');
const warnings = issues.filter(i => i.type === 'warning');

if (errors.length > 0) {
  console.log('\n[image-checker] ERRORS:');
  for (const issue of errors) {
    console.log(`  ❌ ${issue.file}: ${issue.message}`);
  }
}

if (warnings.length > 0) {
  console.log('\n[image-checker] WARNINGS:');
  for (const issue of warnings) {
    console.log(`  ⚠️  ${issue.file}: ${issue.message}`);
  }
}

// Exit with error if any errors found
if (errors.length > 0) {
  console.log('\n[image-checker] ❌ FAILED - Fix errors above');
  process.exit(1);
} else {
  console.log('\n[image-checker] ✅ PASSED');
  process.exit(0);
}

// Export for report generation
export { issues, totalChecks, passedChecks };
