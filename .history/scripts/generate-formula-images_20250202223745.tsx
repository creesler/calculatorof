import puppeteer from 'puppeteer';
import fs from 'fs';

async function captureFormulas() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Read SVG files
  const petFoodSvg = fs.readFileSync('public/images/pet-food-formula.svg', 'utf8');

  // Set content with SVG
  await page.setContent(`
    <div style="width: 600px; height: 200px;">
      ${petFoodSvg}
    </div>
  `);

  await page.setViewport({ width: 600, height: 200 });

  // Take screenshot of the formula
  await page.screenshot({
    path: 'public/images/pet-food-formula.jpg',
    type: 'jpeg',
    quality: 90
  });

  await browser.close();
}

captureFormulas(); 