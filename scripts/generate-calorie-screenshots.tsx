import puppeteer from 'puppeteer';

async function captureCalorieCalculator() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    console.log('Navigating to calorie calculator page...');
    await page.goto('http://localhost:3000/health/calorie-calculator', {
      waitUntil: 'networkidle0',
    });
    
    await page.setViewport({ width: 1200, height: 800 });
    
    // Wait for form to be ready
    console.log('Waiting for form...');
    await page.waitForSelector('form');
    
    // Fill in example values using the exact placeholders from the component
    console.log('Filling in values...');
    const ageInput = await page.$('input[placeholder="30"]');
    if (ageInput) await ageInput.type('30');
    
    const weightInput = await page.$('input[placeholder="70"]');
    if (weightInput) await weightInput.type('70');
    
    const heightInput = await page.$('input[placeholder="170"]');
    if (heightInput) await heightInput.type('170');
    
    // Select activity level from dropdown
    console.log('Selecting activity level...');
    await page.evaluate(() => {
      const select = document.querySelector('select') as HTMLSelectElement;
      if (select) select.value = 'moderate';
    });
    
    // Click calculate button
    console.log('Clicking calculate...');
    const calculateButton = await page.$('button[type="submit"]');
    if (calculateButton) await calculateButton.click();
    
    // Wait for results to appear
    console.log('Waiting for results...');
    await page.waitForSelector('.bg-gray-50');
    
    // Wait a bit for any animations
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot of the calculator section
    console.log('Taking screenshot...');
    const calculatorElement = await page.$('.max-w-2xl');
    if (calculatorElement) {
      await calculatorElement.screenshot({
        path: 'public/images/caloriecalculator.JPG',
        type: 'jpeg',
        quality: 90
      });
      console.log('Screenshot saved as caloriecalculator.JPG');
    } else {
      console.error('Could not find calculator element (.max-w-2xl)');
    }

    await browser.close();
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    throw error;
  }
}

captureCalorieCalculator()
  .then(() => console.log('Screenshot capture completed'))
  .catch((error) => {
    console.error('Screenshot capture failed:', error);
    process.exit(1);
  }); 