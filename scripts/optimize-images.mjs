import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

function findImages(dir, list = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      findImages(full, list);
    } else if (/\.(webp|png|jpg|jpeg)$/i.test(item) && stat.size > 200 * 1024) {
      list.push({ path: full, size: stat.size });
    }
  }
  return list;
}

async function main() {
  const rootDir = path.resolve('public/assets/images');
  console.log('Searching for images > 200KB in', rootDir);
  const files = findImages(rootDir);
  console.log(`Found ${files.length} images to optimize.`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const f of files) {
    totalBefore += f.size;
    try {
      const origBuf = fs.readFileSync(f.path);
      const meta = await sharp(origBuf).metadata();
      
      let pipeline = sharp(origBuf);
      if (meta.width > 1600 || meta.height > 1600) {
        pipeline = pipeline.resize({
          width: meta.width >= meta.height ? 1600 : undefined,
          height: meta.height > meta.width ? 1600 : undefined,
          withoutEnlargement: true,
          fit: 'inside'
        });
      }

      let compressed;
      if (meta.format === 'webp') {
        compressed = await pipeline.webp({ quality: 82, effort: 5 }).toBuffer();
      } else if (meta.format === 'jpeg' || meta.format === 'jpg') {
        compressed = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
      } else if (meta.format === 'png') {
        compressed = await pipeline.png({ quality: 82, compressionLevel: 8 }).toBuffer();
      } else {
        compressed = origBuf;
      }

      if (compressed.length < f.size * 0.95) {
        fs.writeFileSync(f.path, compressed);
        totalAfter += compressed.length;
        console.log(`✓ ${path.relative('public', f.path)}: ${Math.round(f.size/1024)}KB -> ${Math.round(compressed.length/1024)}KB (-${Math.round((1 - compressed.length/f.size)*100)}%)`);
      } else {
        totalAfter += f.size;
        console.log(`- ${path.relative('public', f.path)}: already optimal`);
      }
    } catch (err) {
      totalAfter += f.size;
      console.error(`✗ Error optimizing ${f.path}:`, err.message);
    }
  }

  console.log(`\nOptimization Complete!`);
  console.log(`Total Before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total After: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total Savings: ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB (${Math.round((1 - totalAfter/totalBefore)*100)}% reduction)`);
}

main().catch(console.error);
