#!/usr/bin/env node
// scripts/generate-facts.mjs
// Generates facts.json with machine-readable service data for LLM consumption

import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const SITE_URL =
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  'https://www.marketingcar.com';

// Load services data from servicesData.js
function loadServicesData() {
  const servicesDataPath = path.join(root, 'src/data/servicesData.js');

  if (!existsSync(servicesDataPath)) {
    console.warn('[generate-facts] servicesData.js not found');
    return [];
  }

  try {
    const servicesDataContent = readFileSync(servicesDataPath, 'utf8');

    // Extract services array - split by service objects
    const servicesMatch = servicesDataContent.match(/export const services = \[([\s\S]*?)\n\];/);

    if (!servicesMatch) {
      console.warn('[generate-facts] Could not extract services array');
      return [];
    }

    const servicesArrayContent = servicesMatch[1];

    // Split by top-level braces (each service object)
    // Match service objects: { ... },
    const serviceObjects = servicesArrayContent.split(/\n  \},\n  \{/).map((obj, index, arr) => {
      // Add back the braces we split on
      if (index === 0) return obj + '\n  }';
      if (index === arr.length - 1) return '  {\n' + obj;
      return '  {\n' + obj + '\n  }';
    });

    const services = [];

    for (const serviceObj of serviceObjects) {
      // Extract individual fields from this service object
      const slugMatch = serviceObj.match(/slug:\s*["']([^"']+)["']/);
      const titleMatch = serviceObj.match(/title:\s*["']([^"']+)["']/);
      const descriptionMatch = serviceObj.match(/description:\s*["']([^"']+)["']/);
      const tldrMatch = serviceObj.match(/tldr:\s*["']([^"']*?)["']/);

      if (!slugMatch || !titleMatch || !descriptionMatch) {
        continue; // Skip if essential fields are missing
      }

      const slug = slugMatch[1];
      const title = titleMatch[1];
      const description = descriptionMatch[1];
      const tldr = tldrMatch ? tldrMatch[1] : '';

      // Extract pricing and timeline from TLDR if available
      let priceFrom = null;
      let timeline = null;

      if (tldr) {
        // Extract timeline (e.g., "2-4 weeks", "1-3 months", "6-10 weeks")
        const timelineMatch = tldr.match(/(\d+-\d+\s+(?:weeks?|months?))/i);
        if (timelineMatch) {
          timeline = timelineMatch[1];
        }
      }

      services.push({
        name: title,
        slug: slug,
        description: description,
        url: `${SITE_URL}/services/${slug}`,
        ...(timeline && { timeline })
      });
    }

    return services;
  } catch (error) {
    console.error('[generate-facts] Error loading services data:', error.message);
    return [];
  }
}

// Generate facts.json
function generateFacts() {
  const services = loadServicesData();

  const facts = {
    brand: {
      name: "Marketing Car",
      url: SITE_URL,
      tagline: "Small Business Marketing That Actually Works",
      description: "Expert small business marketing solutions that drive real results. From digital strategy to lead generation, we help small businesses grow with proven marketing systems."
    },
    services: services,
    bookingUrl: `${SITE_URL}/book-now`,
    contactEmail: "honk@marketingcar.com",
    booking: {
      url: `${SITE_URL}/book-now`,
      callToAction: "Book Your Free Consultation"
    },
    contact: {
      email: "honk@marketingcar.com",
      phone: null // Add if available
    },
    socialMedia: {
      linkedin: "https://www.linkedin.com/company/marketingcar",
      twitter: "https://twitter.com/marketingcar"
    },
    serviceAreas: [
      "Marketing Strategy",
      "Local & Near Me Marketing",
      "Graphic Design",
      "B2B Marketing",
      "Brand Strategy & Design",
      "Marketing Consultation",
      "SEO",
      "Content Marketing",
      "Paid Advertising",
      "Social Media Management",
      "Email Marketing",
      "Web Design & Development"
    ],
    targetAudiences: [
      "New Business Owners & Startups",
      "Small Business Owners",
      "Therapists & Counselors",
      "Trades & Contractors",
      "Veterinarians",
      "Financial Professionals",
      "Bilingual Businesses",
      "Farmers Markets",
      "Licensed Professionals"
    ],
    metadata: {
      generated: new Date().toISOString(),
      version: "1.0.0",
      servicesCount: services.length
    }
  };

  return facts;
}

// Main execution
try {
  console.log('[generate-facts] Generating facts.json...');

  const facts = generateFacts();
  const outputPath = path.join(dist, 'facts.json');

  writeFileSync(outputPath, JSON.stringify(facts, null, 2));

  console.log(`[generate-facts] ✓ Generated facts.json`);
  console.log(`[generate-facts]   Services: ${facts.services.length}`);
  console.log(`[generate-facts]   Size: ${JSON.stringify(facts).length} bytes`);
  console.log(`[generate-facts]   Location: ${outputPath}`);
} catch (error) {
  console.error('[generate-facts] ✗ Error generating facts.json:', error.message);
  process.exit(1);
}
