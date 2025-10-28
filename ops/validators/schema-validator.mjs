#!/usr/bin/env node
// ops/validators/schema-validator.mjs
// Validates all JSON-LD schema blocks in built HTML files

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

// Required fields for each schema type
const REQUIRED_FIELDS = {
  Organization: ['@context', '@type', 'name', 'url'],
  BreadcrumbList: ['@context', '@type', 'itemListElement'],
  Service: ['@context', '@type', 'name', 'provider'],
  FAQPage: ['@context', '@type', 'mainEntity'],
  BlogPosting: ['@context', '@type', 'headline', 'author', 'publisher', 'datePublished'],
  WebPage: ['@context', '@type', 'name']
};

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

function validateSchema(schema, filePath, index) {
  totalChecks++;

  // Check it's valid JSON
  if (typeof schema !== 'object' || schema === null) {
    issues.push({
      file: filePath,
      type: 'error',
      check: 'schema-parse',
      message: `Schema block ${index} is not a valid JSON object`
    });
    return false;
  }

  // Check @type exists
  if (!schema['@type']) {
    issues.push({
      file: filePath,
      type: 'error',
      check: 'schema-type',
      message: `Schema block ${index} missing @type`
    });
    return false;
  }

  const schemaType = schema['@type'];
  const requiredFields = REQUIRED_FIELDS[schemaType];

  if (!requiredFields) {
    // Unknown schema type - just warn
    issues.push({
      file: filePath,
      type: 'warning',
      check: 'schema-type',
      message: `Unknown schema type: ${schemaType}`
    });
    passedChecks++;
    return true;
  }

  // Check required fields
  const missingFields = [];
  for (const field of requiredFields) {
    if (!schema[field] || (Array.isArray(schema[field]) && schema[field].length === 0)) {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    issues.push({
      file: filePath,
      type: 'error',
      check: 'schema-required-fields',
      message: `${schemaType} schema missing required fields: ${missingFields.join(', ')}`
    });
    return false;
  }

  passedChecks++;
  return true;
}

function validateFile(filePath) {
  const rel = path.relative(dist, filePath);
  const html = readFileSync(filePath, 'utf8');
  const $ = load(html);

  const schemaScripts = $('script[type="application/ld+json"]');

  if (schemaScripts.length === 0) {
    // Some pages may not have schema - just note it
    issues.push({
      file: rel,
      type: 'info',
      check: 'schema-present',
      message: 'No JSON-LD schema found (may be intentional)'
    });
    return;
  }

  schemaScripts.each((index, elem) => {
    const schemaText = $(elem).html();
    try {
      const schema = JSON.parse(schemaText);
      validateSchema(schema, rel, index);
    } catch (err) {
      totalChecks++;
      issues.push({
        file: rel,
        type: 'error',
        check: 'schema-parse',
        message: `Failed to parse JSON-LD schema block ${index}: ${err.message}`
      });
    }
  });
}

// Main execution
console.log('[schema-validator] Starting validation...');

if (!existsSync(dist)) {
  console.error('[schema-validator] ERROR: dist/ directory not found. Run build first.');
  process.exit(1);
}

const htmlFiles = walk(dist);
console.log(`[schema-validator] Found ${htmlFiles.length} HTML files`);

for (const file of htmlFiles) {
  validateFile(file);
}

// Report results
console.log('\n[schema-validator] Results:');
console.log(`  Total schema checks: ${totalChecks}`);
console.log(`  Passed: ${passedChecks}`);
console.log(`  Failed: ${totalChecks - passedChecks}`);

const errors = issues.filter(i => i.type === 'error');
const warnings = issues.filter(i => i.type === 'warning');

if (errors.length > 0) {
  console.log('\n[schema-validator] ERRORS:');
  for (const issue of errors) {
    console.log(`  ❌ ${issue.file}: ${issue.message}`);
  }
}

if (warnings.length > 0) {
  console.log('\n[schema-validator] WARNINGS:');
  for (const issue of warnings) {
    console.log(`  ⚠️  ${issue.file}: ${issue.message}`);
  }
}

// Exit with error if any errors found
if (errors.length > 0) {
  console.log('\n[schema-validator] ❌ FAILED - Fix errors above');
  process.exit(1);
} else {
  console.log('\n[schema-validator] ✅ PASSED');
  process.exit(0);
}

// Export for report generation
export { issues, totalChecks, passedChecks };
