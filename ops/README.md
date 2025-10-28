# LLM and Search Optimization Validators

This directory contains validation scripts and tools to ensure marketingcar.com maintains optimal SEO and LLM consumption standards.

## Directory Structure

```
ops/
├── validators/          # Validation scripts for SEO, schema, content
├── scripts/             # Utility scripts for building and testing
├── llm-audit/          # Audit reports and results
└── README.md           # This file
```

## Running Validators Locally

### Run all validators:
```bash
npm run validate
```

### Run individual validators:
```bash
node ops/validators/schema-validator.mjs
node ops/validators/html-proofer.mjs
node ops/validators/content-linter.mjs
node ops/validators/sitemap-validator.mjs
node ops/validators/image-checker.mjs
node ops/validators/facts-validator.mjs
```

## Validation Checks

### Schema Validation (`schema-validator.mjs`)
- Extracts all JSON-LD blocks from HTML
- Validates against schema.org types: Organization, BreadcrumbList, Service, FAQPage, BlogPosting
- Checks for required fields and proper JSON syntax
- Fails build on parse errors or missing required fields

### HTML Proofing (`html-proofer.mjs`)
- Checks for broken internal links
- Detects duplicate meta tags (title, canonical, OG tags)
- Validates title ≤ 60 chars, description ≤ 160 chars
- Ensures single canonical and single set of OG tags per page

### Content Linting (`content-linter.mjs`)
- Verifies TLDR sections exist on service pages
- Ensures FAQ sections exist on service pages with non-empty answers
- Checks H2/H3 headings have id anchors

### Sitemap Validation (`sitemap-validator.mjs`)
- Verifies robots.txt contains valid Sitemap reference
- Validates sitemap.xml structure and required tags
- Ensures all canonical pages are included
- Checks lastmod dates are present and valid

### Image Checks (`image-checker.mjs`)
- Verifies all img tags have width, height, and loading attributes
- Warns if any single page exceeds 2MB total transfer size

### Facts Endpoint (`facts-validator.mjs`)
- Validates /facts.json structure against JSON Schema
- Checks required keys: brand, services, bookingUrl, contactEmail
- Ensures service data includes name, slug, description

## CI Integration

Validators run automatically in GitHub Actions:
- On every push to main
- On every pull request
- On Ghost CMS webhook triggers

Build fails if any validator returns non-zero exit code.

## Validation Report

Results are saved to `/ops/llm-audit/report.json` with:
- Timestamp
- Pass/fail status for each validator
- List of issues found
- Summary statistics

## Pre-commit Hook

A pre-commit hook runs basic validators on changed files:
```bash
.git/hooks/pre-commit
```

To skip validation (not recommended):
```bash
git commit --no-verify
```
