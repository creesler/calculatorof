import puppeteer from 'puppeteer';
import fs from 'fs';

async function captureFormulas() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Read SVG files
  const roiSvg = fs.readFileSync('public/images/roi-formula.svg', 'utf8');
  const loanSvg = fs.readFileSync('public/images/loan-formula.svg', 'utf8');
  const bmiSvg = fs.readFileSync('public/images/bmi-formula.svg', 'utf8');
  const calorieSvg = fs.readFileSync('public/images/calorie-formula.svg', 'utf8');
  const petFoodSvg = fs.readFileSync('public/images/pet-food-formula.svg', 'utf8');
  const percentageSvg = fs.readFileSync('public/images/percentage-formula.svg', 'utf8');

  // Generate ROI formula image
  await page.setContent(`
    <div style="width: 600px; height: 200px;">
      ${roiSvg}
    </div>
  `);
  await page.setViewport({ width: 600, height: 200 });
  await page.screenshot({
    path: 'public/images/roi-formula.jpg',
    type: 'jpeg',
    quality: 90
  });

  // Generate loan formula image
  await page.setContent(`
    <div style="width: 600px; height: 200px;">
      ${loanSvg}
    </div>
  `);
  await page.screenshot({
    path: 'public/images/loan-formula.jpg',
    type: 'jpeg',
    quality: 90
  });

  // Generate BMI formula image
  await page.setContent(`
    <div style="width: 600px; height: 200px;">
      ${bmiSvg}
    </div>
  `);
  await page.screenshot({
    path: 'public/images/bmi-formula.jpg',
    type: 'jpeg',
    quality: 90
  });

  // Generate calorie formula image
  await page.setContent(`
    <div style="width: 600px; height: 200px;">
      ${calorieSvg}
    </div>
  `);
  await page.screenshot({
    path: 'public/images/calorie-formula.jpg',
    type: 'jpeg',
    quality: 90
  });

  // Generate pet food formula image
  await page.setContent(`
    <div style="width: 600px; height: 200px;">
      ${petFoodSvg}
    </div>
  `);
  await page.screenshot({
    path: 'public/images/pet-food-formula.jpg',
    type: 'jpeg',
    quality: 90
  });

  // Generate percentage formula image
  await page.setContent(`
    <div style="width: 600px; height: 200px;">
      ${percentageSvg}
    </div>
  `);
  await page.screenshot({
    path: 'public/images/percentage-formula.jpg',
    type: 'jpeg',
    quality: 90
  });

  await browser.close();
}

captureFormulas(); 