#!/usr/bin/env node
// ops/validators/run-all.mjs
// Runs all validators and generates comprehensive report

import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const reportDir = path.join(root, 'ops/llm-audit');
const reportPath = path.join(reportDir, 'report.json');

// Ensure report directory exists
if (!existsSync(reportDir)) {
  mkdirSync(reportDir, { recursive: true });
}

const validators = [
  { name: 'Schema Validator', script: 'schema-validator.mjs' },
  { name: 'HTML Proofer', script: 'html-proofer.mjs' },
  { name: 'Content Linter', script: 'content-linter.mjs' },
  { name: 'Sitemap Validator', script: 'sitemap-validator.mjs' },
  { name: 'Image Checker', script: 'image-checker.mjs' },
  { name: 'Facts Validator', script: 'facts-validator.mjs' }
];

const results = {
  timestamp: new Date().toISOString(),
  summary: {
    total: validators.length,
    passed: 0,
    failed: 0,
    warnings: 0
  },
  validators: []
};

async function runValidator(validator) {
  return new Promise((resolve) => {
    const scriptPath = path.join(__dirname, validator.script);
    const child = spawn('node', [scriptPath], {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      const passed = code === 0;

      // Extract issues from output (look for error and warning lines)
      const issues = [];
      const lines = stdout.split('\n');
      for (const line of lines) {
        if (line.includes('❌') || line.includes('⚠️')) {
          issues.push(line.trim());
        }
      }

      resolve({
        name: validator.name,
        script: validator.script,
        passed,
        exitCode: code,
        issues,
        output: stdout,
        errors: stderr
      });
    });
  });
}

async function main() {
  console.log('='.repeat(60));
  console.log('Running All Validators');
  console.log('='.repeat(60));
  console.log('');

  for (const validator of validators) {
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`Running: ${validator.name}`);
    console.log('─'.repeat(60));

    const result = await runValidator(validator);

    // Print output in real-time
    console.log(result.output);

    if (result.errors) {
      console.error(result.errors);
    }

    results.validators.push({
      name: result.name,
      passed: result.passed,
      exitCode: result.exitCode,
      issueCount: result.issues.length,
      issues: result.issues
    });

    if (result.passed) {
      results.summary.passed++;
    } else {
      results.summary.failed++;
    }

    if (result.issues.some(i => i.includes('⚠️'))) {
      results.summary.warnings++;
    }
  }

  // Write report
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('Validation Summary');
  console.log('='.repeat(60));
  console.log(`Total Validators: ${results.summary.total}`);
  console.log(`✅ Passed: ${results.summary.passed}`);
  console.log(`❌ Failed: ${results.summary.failed}`);
  console.log(`⚠️  With Warnings: ${results.summary.warnings}`);
  console.log('');
  console.log(`Report saved to: ${reportPath}`);
  console.log('='.repeat(60));

  // Exit with error if any failed
  if (results.summary.failed > 0) {
    console.log('\n❌ VALIDATION FAILED - Fix errors above');
    process.exit(1);
  } else {
    console.log('\n✅ ALL VALIDATIONS PASSED');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal error running validators:', err);
  process.exit(1);
});
