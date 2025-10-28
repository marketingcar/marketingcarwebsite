#!/usr/bin/env node
// ops/validators/sitemap-validator.mjs
// Validates sitemap.xml and robots.txt

import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const dist = path.join(root, 'dist');

const issues = [];
let totalChecks = 0;
let passedChecks = 0;

function validateRobotsTxt() {
  totalChecks++;
  const robotsPath = path.join(dist, 'robots.txt');

  if (!existsSync(robotsPath)) {
    issues.push({
      file: 'robots.txt',
      type: 'error',
      check: 'robots-missing',
      message: 'robots.txt not found'
    });
    return false;
  }

  const content = readFileSync(robotsPath, 'utf8');

  totalChecks++;
  if (!content.includes('Sitemap:')) {
    issues.push({
      file: 'robots.txt',
      type: 'error',
      check: 'robots-sitemap',
      message: 'robots.txt missing Sitemap reference'
    });
    return false;
  }

  passedChecks += 2;
  return true;
}

function validateSitemap() {
  totalChecks++;
  const sitemapPath = path.join(dist, 'sitemap.xml');

  if (!existsSync(sitemapPath)) {
    issues.push({
      file: 'sitemap.xml',
      type: 'error',
      check: 'sitemap-missing',
      message: 'sitemap.xml not found'
    });
    return false;
  }

  const content = readFileSync(sitemapPath, 'utf8');
  const $ = load(content, { xmlMode: true });

  // Check for urlset
  totalChecks++;
  if ($('urlset').length === 0) {
    issues.push({
      file: 'sitemap.xml',
      type: 'error',
      check: 'sitemap-structure',
      message: 'sitemap.xml missing urlset element'
    });
    return false;
  }

  // Check for URLs
  const urls = $('url');
  totalChecks++;
  if (urls.length === 0) {
    issues.push({
      file: 'sitemap.xml',
      type: 'error',
      check: 'sitemap-empty',
      message: 'sitemap.xml has no URLs'
    });
    return false;
  }

  console.log(`[sitemap-validator] Found ${urls.length} URLs in sitemap`);

  // Check each URL has loc and lastmod
  let missingLoc = 0;
  let missingLastmod = 0;

  urls.each((i, elem) => {
    totalChecks += 2;

    const loc = $(elem).find('loc').text();
    if (!loc || loc.length === 0) {
      missingLoc++;
    } else {
      passedChecks++;
    }

    const lastmod = $(elem).find('lastmod').text();
    if (!lastmod || lastmod.length === 0) {
      missingLastmod++;
    } else {
      passedChecks++;
    }
  });

  if (missingLoc > 0) {
    issues.push({
      file: 'sitemap.xml',
      type: 'error',
      check: 'sitemap-loc',
      message: `${missingLoc} URLs missing <loc> tag`
    });
  }

  if (missingLastmod > 0) {
    issues.push({
      file: 'sitemap.xml',
      type: 'warning',
      check: 'sitemap-lastmod',
      message: `${missingLastmod} URLs missing <lastmod> tag`
    });
  }

  passedChecks += 3;
  return missingLoc === 0;
}

// Main execution
console.log('[sitemap-validator] Starting validation...');

if (!existsSync(dist)) {
  console.error('[sitemap-validator] ERROR: dist/ directory not found. Run build first.');
  process.exit(1);
}

validateRobotsTxt();
validateSitemap();

// Report results
console.log('\n[sitemap-validator] Results:');
console.log(`  Total checks: ${totalChecks}`);
console.log(`  Passed: ${passedChecks}`);
console.log(`  Failed: ${totalChecks - passedChecks}`);

const errors = issues.filter(i => i.type === 'error');
const warnings = issues.filter(i => i.type === 'warning');

if (errors.length > 0) {
  console.log('\n[sitemap-validator] ERRORS:');
  for (const issue of errors) {
    console.log(`  ❌ ${issue.file}: ${issue.message}`);
  }
}

if (warnings.length > 0) {
  console.log('\n[sitemap-validator] WARNINGS:');
  for (const issue of warnings) {
    console.log(`  ⚠️  ${issue.file}: ${issue.message}`);
  }
}

// Exit with error if any errors found
if (errors.length > 0) {
  console.log('\n[sitemap-validator] ❌ FAILED - Fix errors above');
  process.exit(1);
} else {
  console.log('\n[sitemap-validator] ✅ PASSED');
  process.exit(0);
}

// Export for report generation
export { issues, totalChecks, passedChecks };
