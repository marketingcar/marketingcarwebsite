// scripts/optimize-images.mjs
import { fileURLToPath } from 'node:url';
import { readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Directories to scan for images
const imageDirs = [
  'public',
  'public/blog',
  'public/elements',
  'public/og',
  'src/assets'
];

// Supported image formats
const imageExtensions = ['.jpg', '.jpeg', '.png', '.tiff', '.tif'];

async function optimizeImages() {
  console.log('=🖼️  Starting image optimization...');

  let totalImages = 0;
  let convertedImages = 0;

  for (const dir of imageDirs) {
    const fullPath = path.join(root, dir);
    if (!existsSync(fullPath)) {
      console.log(`📁 Directory ${dir} doesn't exist, skipping...`);
      continue;
    }

    console.log(`📁 Processing directory: ${dir}`);
    await processDirectory(fullPath, dir);
  }

  async function processDirectory(dirPath, relativePath) {
    const items = readdirSync(dirPath);

    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stats = statSync(itemPath);

      if (stats.isDirectory()) {
        // Recursively process subdirectories
        const subRelativePath = path.join(relativePath, item);
        await processDirectory(itemPath, subRelativePath);
      } else if (stats.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (imageExtensions.includes(ext)) {
          totalImages++;
          await convertToWebP(itemPath, relativePath, item);
        }
      }
    }
  }

  async function convertToWebP(imagePath, relativePath, filename) {
    const nameWithoutExt = path.parse(filename).name;
    const webpFilename = `${nameWithoutExt}.webp`;
    const webpPath = path.join(path.dirname(imagePath), webpFilename);

    // Skip if WebP version already exists and is newer
    if (existsSync(webpPath)) {
      const originalStats = statSync(imagePath);
      const webpStats = statSync(webpPath);
      if (webpStats.mtime >= originalStats.mtime) {
        console.log(`⏭️  Skipping ${filename} (WebP already exists and is up to date)`);
        return;
      }
    }

    try {
      console.log(`🔄 Converting ${filename} to WebP...`);

      // Get image info first
      const image = sharp(imagePath);
      const metadata = await image.metadata();

      // Convert to WebP with different settings based on image type
      let webpImage = image.webp({
        quality: 85,
        effort: 6, // Higher effort for better compression
        lossless: false
      });

      // For very large images, resize to reasonable dimensions
      if (metadata.width && metadata.width > 1920) {
        webpImage = webpImage.resize(1920, null, {
          withoutEnlargement: true,
          fastShrinkOnLoad: true
        });
        console.log(`📏 Resizing ${filename} from ${metadata.width}px to max 1920px width`);
      }

      await webpImage.toFile(webpPath);

      const originalSize = statSync(imagePath).size;
      const webpSize = statSync(webpPath).size;
      const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);

      console.log(`✅ Created ${webpFilename} (${savings}% smaller)`);
      convertedImages++;

    } catch (error) {
      console.error(`❌ Error converting ${filename}:`, error.message);
    }
  }

  console.log(`\n✅ Image optimization completed!`);
  console.log(`📊 Processed ${totalImages} images, created/updated ${convertedImages} WebP versions`);
}

async function main() {
  try {
    await optimizeImages();
  } catch (error) {
    console.error('❌ Image optimization failed:', error);
    process.exit(1);
  }
}

main();