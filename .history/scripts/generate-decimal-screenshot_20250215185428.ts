import puppeteer from 'puppeteer';
import sharp from 'sharp';
import path from 'path';

async function generateScreenshot() {
  const browser = await puppeteer.launch({
    headless: 'new',
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:3000/math/fraction-calculator', {
    waitUntil: 'networkidle0',
  });

  // Wait for calculator to be visible
  await page.waitForSelector('.calculator-section');

  // Take screenshot of the decimal to fraction calculator section
  const element = await page.$('.calculator-section:nth-child(4)'); // Adjust selector if needed
  if (!element) throw new Error('Calculator element not found');

  const screenshot = await element.screenshot({
    path: path.join(process.cwd(), 'public/images/decimalcalculator.webp'),
  });

  await browser.close();

  // Optimize the screenshot
  await sharp(screenshot)
    .webp({ quality: 90 })
    .toFile(path.join(process.cwd(), 'public/images/decimalcalculator.webp'));

  console.log('Screenshot generated successfully!');
}

generateScreenshot().catch(console.error); 