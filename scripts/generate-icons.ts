import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import pngToIco from 'png-to-ico';

async function generateIcons() {
  try {
    // Create icons directory if it doesn't exist
    mkdirSync(join(process.cwd(), 'public', 'icons'), { recursive: true });

    // Source image
    const sourceImage = join(process.cwd(), 'public', 'images', 'icon.png');

    // Generate PWA icons
    await sharp(sourceImage)
      .resize(192, 192)
      .toFile(join(process.cwd(), 'public', 'icons', 'icon-192x192.png'));

    await sharp(sourceImage)
      .resize(512, 512)
      .toFile(join(process.cwd(), 'public', 'icons', 'icon-512x512.png'));

    // Generate 16x16 PNG first
    await sharp(sourceImage)
      .resize(16, 16)
      .toFile(join(process.cwd(), 'public', 'icons', 'icon-16x16.png'));

    // Convert 16x16 PNG to ICO
    const icoBuffer = await pngToIco([join(process.cwd(), 'public', 'icons', 'icon-16x16.png')]);
    writeFileSync(join(process.cwd(), 'public', 'favicon.ico'), icoBuffer);

    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons(); 