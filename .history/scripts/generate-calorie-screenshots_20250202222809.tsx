import puppeteer from 'puppeteer';

async function captureCalorieCalculator() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Navigate to calorie calculator page
    await page.goto('http://localhost:3000/health/calorie-calculator', {
      waitUntil: 'networkidle0',
    });
    
    await page.setViewport({ width: 1200, height: 800 });
    
    // Wait for form to be ready
    await page.waitForSelector('form');
    
    // Fill in example values
    await page.type('input[name="age"]', '30');
    await page.type('input[name="weight"]', '70');
    await page.type('input[name="height"]', '170');
    
    // Select activity level
    await page.select('select[name="activityLevel"]', 'moderate');
    
    // Click calculate button
    await page.click('button[type="submit"]');
    
    // Wait for results to appear
    await page.waitForSelector('.bg-gray-50');
    
    // Wait a bit for animations to complete
    await page.waitForTimeout(1000);
    
    // Take screenshot of the calculator section
    const calculatorElement = await page.$('.max-w-2xl');
    if (calculatorElement) {
      await calculatorElement.screenshot({
        path: 'public/images/caloriecalculator.JPG',
        type: 'jpeg',
        quality: 90
      });
      console.log('Screenshot saved as caloriecalculator.JPG');
    } else {
      console.error('Could not find calculator element');
    }

    await browser.close();
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    process.exit(1);
  }
}

captureCalorieCalculator(); 