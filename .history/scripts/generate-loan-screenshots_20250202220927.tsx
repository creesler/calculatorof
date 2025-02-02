import puppeteer from 'puppeteer';

async function captureLoanCalculator() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:3000/finance/loan-calculator');
  
  // Wait for calculator to load
  await page.waitForSelector('form');
  
  // Fill in example values
  await page.type('input[placeholder="250000"]', '250000');
  await page.type('input[placeholder="5.5"]', '5.5');
  await page.type('input[placeholder="30"]', '30');
  
  // Click calculate button
  await page.click('button[type="submit"]');
  
  // Wait for results to appear
  await page.waitForSelector('.bg-gray-50');
  
  // Take screenshot of the calculator section
  const calculatorElement = await page.$('.max-w-2xl');
  if (calculatorElement) {
    await calculatorElement.screenshot({
      path: 'public/images/loancalculator.JPG',
      type: 'jpeg',
      quality: 90
    });
  }

  await browser.close();
}

captureLoanCalculator(); 