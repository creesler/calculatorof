import puppeteer from 'puppeteer';

async function captureBMICalculator() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Create BMI formula image
  await page.setContent(`
    <div style="padding: 20px; background: white;">
      <div style="font-family: Arial; font-size: 24px; margin-bottom: 20px;">
        BMI = weight(kg) / height(m)²
      </div>
      <div style="font-family: Arial; font-size: 16px; color: #666; margin-bottom: 10px;">
        Metric: BMI = weight(kg) / (height(cm) / 100)²
      </div>
      <div style="font-family: Arial; font-size: 16px; color: #666;">
        Imperial: BMI = 703 × weight(lb) / height(in)²
      </div>
    </div>
  `);

  await page.setViewport({ width: 600, height: 200 });
  
  await page.screenshot({
    path: 'public/images/bmi-formula.jpg',
    type: 'jpeg',
    quality: 90
  });

  // Navigate to BMI calculator page and wait for it to load
  await page.goto('http://localhost:3000/health/bmi-calculator');
  await page.setViewport({ width: 1200, height: 800 });
  
  // Fill in example values
  await page.type('input[placeholder="70"]', '70');
  await page.type('input[placeholder="170"]', '170');
  
  // Click calculate button
  await page.click('button[type="submit"]');
  
  // Wait for results to appear
  await page.waitForSelector('.bg-gray-50');
  
  // Take screenshot of the calculator section
  const calculatorElement = await page.$('.max-w-2xl');
  if (calculatorElement) {
    await calculatorElement.screenshot({
      path: 'public/images/bmicalculator.JPG',
      type: 'jpeg',
      quality: 90
    });
  }

  await browser.close();
}

captureBMICalculator(); 