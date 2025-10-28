#!/usr/bin/env node
// ops/validators/facts-validator.mjs
// Validates facts.json structure and content

import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const dist = path.join(root, 'dist');

const issues = [];
let totalChecks = 0;
let passedChecks = 0;

const REQUIRED_FIELDS = ['brand', 'services', 'bookingUrl', 'contactEmail'];
const SERVICE_FIELDS = ['name', 'slug', 'description'];

function validateFacts() {
  totalChecks++;
  const factsPath = path.join(dist, 'facts.json');

  if (!existsSync(factsPath)) {
    issues.push({
      file: 'facts.json',
      type: 'error',
      check: 'facts-missing',
      message: 'facts.json not found'
    });
    return false;
  }

  let facts;
  try {
    const content = readFileSync(factsPath, 'utf8');
    facts = JSON.parse(content);
  } catch (err) {
    issues.push({
      file: 'facts.json',
      type: 'error',
      check: 'facts-parse',
      message: `Failed to parse facts.json: ${err.message}`
    });
    return false;
  }

  // Check required top-level fields
  for (const field of REQUIRED_FIELDS) {
    totalChecks++;
    if (!facts[field]) {
      issues.push({
        file: 'facts.json',
        type: 'error',
        check: 'facts-required-field',
        message: `Missing required field: ${field}`
      });
    } else {
      passedChecks++;
    }
  }

  // Check services array
  totalChecks++;
  if (!Array.isArray(facts.services)) {
    issues.push({
      file: 'facts.json',
      type: 'error',
      check: 'facts-services-array',
      message: 'services must be an array'
    });
    return false;
  }

  if (facts.services.length === 0) {
    issues.push({
      file: 'facts.json',
      type: 'error',
      check: 'facts-services-empty',
      message: 'services array is empty'
    });
    return false;
  }

  // Check each service
  for (const [index, service] of facts.services.entries()) {
    for (const field of SERVICE_FIELDS) {
      totalChecks++;
      if (!service[field] || service[field].length === 0) {
        issues.push({
          file: 'facts.json',
          type: 'error',
          check: 'facts-service-field',
          message: `Service ${index}: missing or empty field: ${field}`
        });
      } else {
        passedChecks++;
      }
    }
  }

  passedChecks++;
  return true;
}

// Main execution
console.log('[facts-validator] Starting validation...');

if (!existsSync(dist)) {
  console.error('[facts-validator] ERROR: dist/ directory not found. Run build first.');
  process.exit(1);
}

validateFacts();

// Report results
console.log('\n[facts-validator] Results:');
console.log(`  Total checks: ${totalChecks}`);
console.log(`  Passed: ${passedChecks}`);
console.log(`  Failed: ${totalChecks - passedChecks}`);

const errors = issues.filter(i => i.type === 'error');
const warnings = issues.filter(i => i.type === 'warning');

if (errors.length > 0) {
  console.log('\n[facts-validator] ERRORS:');
  for (const issue of errors) {
    console.log(`  ❌ ${issue.file}: ${issue.message}`);
  }
}

if (warnings.length > 0) {
  console.log('\n[facts-validator] WARNINGS:');
  for (const issue of warnings) {
    console.log(`  ⚠️  ${issue.file}: ${issue.message}`);
  }
}

// Exit with error if any errors found
if (errors.length > 0) {
  console.log('\n[facts-validator] ❌ FAILED - Fix errors above');
  process.exit(1);
} else {
  console.log('\n[facts-validator] ✅ PASSED');
  process.exit(0);
}

// Export for report generation
export { issues, totalChecks, passedChecks };
