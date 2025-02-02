import puppeteer from 'puppeteer';

async function capturePetFoodCalculator() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    console.log('Navigating to pet food calculator page...');
    await page.goto('http://localhost:3000/pet/pet-food-calculator', {
      waitUntil: 'networkidle0',
    });
    
    await page.setViewport({ width: 1200, height: 800 });
    
    // Wait for form to be ready
    console.log('Waiting for form...');
    await page.waitForSelector('form');
    
    // Fill in example values
    console.log('Filling in values...');
    await page.select('select[name="petType"]', 'dog');
    
    const weightInput = await page.$('input[placeholder="10"]');
    if (weightInput) await weightInput.type('10');
    
    const ageInput = await page.$('input[placeholder="3"]');
    if (ageInput) await ageInput.type('3');
    
    // Select activity level
    await page.select('select[name="activityLevel"]', 'moderate');
    
    // Select food type
    await page.select('select[name="foodType"]', 'dry');
    
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
        path: 'public/images/petfoodcalculator.JPG',
        type: 'jpeg',
        quality: 90
      });
      console.log('Screenshot saved as petfoodcalculator.JPG');
    } else {
      console.error('Could not find calculator element (.max-w-2xl)');
    }

    await browser.close();
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    throw error;
  }
}

capturePetFoodCalculator()
  .then(() => console.log('Screenshot capture completed'))
  .catch((error) => {
    console.error('Screenshot capture failed:', error);
    process.exit(1);
  }); 