import sharp from 'sharp';
import path from 'path';

async function generateIcons() {
  const sourceIcon = path.join(process.cwd(), 'public/icons/icon.png');
  
  // Generate 192x192 icon
  await sharp(sourceIcon)
    .resize(192, 192)
    .toFile(path.join(process.cwd(), 'public/icons/icon-192x192.png'));

  // Generate 512x512 icon
  await sharp(sourceIcon)
    .resize(512, 512)
    .toFile(path.join(process.cwd(), 'public/icons/icon-512x512.png'));

  console.log('PWA icons generated successfully!');
}

generateIcons().catch(console.error); 