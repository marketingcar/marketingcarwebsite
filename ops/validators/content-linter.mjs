#!/usr/bin/env node
// ops/validators/content-linter.mjs
// Validates content requirements: TLDR, FAQ, heading anchors

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

function isServicePage(filePath) {
  return filePath.includes('/services/') && !filePath.endsWith('/services/index.html');
}

function checkTLDR($, filePath) {
  totalChecks++;
  const tldr = $('.tldr, [class*="tldr"], [data-tldr]');

  if (tldr.length === 0) {
    issues.push({
      file: filePath,
      type: 'error',
      check: 'missing-tldr',
      message: 'Service page missing TLDR section'
    });
    return false;
  }

  passedChecks++;
  return true;
}

function checkFAQ($, filePath) {
  totalChecks++;
  const faq = $('.faq, [class*="faq"], [data-faq]');

  if (faq.length === 0) {
    issues.push({
      file: filePath,
      type: 'error',
      check: 'missing-faq',
      message: 'Service page missing FAQ section'
    });
    return false;
  }

  // Check that FAQ has questions and answers
  const questions = faq.find('[class*="question"], [data-question], dt, .faq-question');
  const answers = faq.find('[class*="answer"], [data-answer], dd, .faq-answer');

  if (questions.length === 0) {
    issues.push({
      file: filePath,
      type: 'error',
      check: 'empty-faq',
      message: 'FAQ section has no questions'
    });
    return false;
  }

  // Check for empty answers
  let hasEmptyAnswer = false;
  answers.each((i, elem) => {
    const text = $(elem).text().trim();
    if (text.length === 0) {
      hasEmptyAnswer = true;
    }
  });

  if (hasEmptyAnswer) {
    issues.push({
      file: filePath,
      type: 'error',
      check: 'empty-faq-answer',
      message: 'FAQ section has empty answers'
    });
    return false;
  }

  passedChecks++;
  return true;
}

function checkHeadingAnchors($, filePath) {
  const headings = $('h2, h3');
  let missingAnchors = 0;

  headings.each((i, elem) => {
    totalChecks++;
    const id = $(elem).attr('id');

    if (!id || id.length === 0) {
      missingAnchors++;
    } else {
      passedChecks++;
    }
  });

  if (missingAnchors > 0) {
    issues.push({
      file: filePath,
      type: 'warning',
      check: 'missing-heading-anchors',
      message: `${missingAnchors} H2/H3 headings missing id anchors`
    });
    return false;
  }

  return true;
}

function validateFile(filePath) {
  const rel = path.relative(dist, filePath);
  const html = readFileSync(filePath, 'utf8');
  const $ = load(html);

  // Check if it's a service page
  if (isServicePage(rel)) {
    checkTLDR($, rel);
    checkFAQ($, rel);
  }

  // Check all pages for heading anchors
  checkHeadingAnchors($, rel);
}

// Main execution
console.log('[content-linter] Starting validation...');

if (!existsSync(dist)) {
  console.error('[content-linter] ERROR: dist/ directory not found. Run build first.');
  process.exit(1);
}

const htmlFiles = walk(dist);
console.log(`[content-linter] Found ${htmlFiles.length} HTML files`);

for (const file of htmlFiles) {
  validateFile(file);
}

// Report results
console.log('\n[content-linter] Results:');
console.log(`  Total checks: ${totalChecks}`);
console.log(`  Passed: ${passedChecks}`);
console.log(`  Failed: ${totalChecks - passedChecks}`);

const errors = issues.filter(i => i.type === 'error');
const warnings = issues.filter(i => i.type === 'warning');

if (errors.length > 0) {
  console.log('\n[content-linter] ERRORS:');
  for (const issue of errors) {
    console.log(`  ❌ ${issue.file}: ${issue.message}`);
  }
}

if (warnings.length > 0) {
  console.log('\n[content-linter] WARNINGS:');
  for (const issue of warnings) {
    console.log(`  ⚠️  ${issue.file}: ${issue.message}`);
  }
}

// Exit with error if any errors found
if (errors.length > 0) {
  console.log('\n[content-linter] ❌ FAILED - Fix errors above');
  process.exit(1);
} else {
  console.log('\n[content-linter] ✅ PASSED');
  process.exit(0);
}

// Export for report generation
export { issues, totalChecks, passedChecks };
