import puppeteer from 'puppeteer';

async function captureCalorieCalculator() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:3000/health/calorie-calculator');
  
  // Wait for calculator to load
  await page.waitForSelector('form');
  
  // Fill in example values
  await page.type('input[placeholder="30"]', '30');
  await page.type('input[placeholder="70"]', '70');
  await page.type('input[placeholder="170"]', '170');
  
  // Select gender (male is default)
  
  // Select activity level
  await page.select('select[name="activityLevel"]', 'moderate');
  
  // Select goal (maintain is default)
  
  // Click calculate button
  await page.click('button[type="submit"]');
  
  // Wait for results to appear
  await page.waitForSelector('.bg-gray-50');
  
  // Take screenshot of the calculator section
  const calculatorElement = await page.$('.max-w-2xl');
  if (calculatorElement) {
    await calculatorElement.screenshot({
      path: 'public/images/caloriecalculator.JPG',
      type: 'jpeg',
      quality: 90
    });
  }

  await browser.close();
}

captureCalorieCalculator(); 