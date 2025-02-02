import puppeteer from 'puppeteer';

async function capturePetFoodCalculator() {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    
    console.log('Navigating to pet food calculator page...');
    await page.goto('http://localhost:3000/pet/pet-food-calculator', {
      waitUntil: 'networkidle0'
    });
    
    // Wait for form to be ready
    console.log('Waiting for form...');
    await page.waitForSelector('form');
    
    // Fill in example values
    console.log('Filling in values...');
    const weightInput = await page.$('input[name="weight"]');
    if (weightInput) {
      await weightInput.type('10');
      console.log('Weight entered');
    } else {
      console.log('Weight input not found');
    }
    
    const ageInput = await page.$('input[name="age"]');
    if (ageInput) {
      await ageInput.type('3');
      console.log('Age entered');
    } else {
      console.log('Age input not found');
    }
    
    // Select pet type (dog is default)
    console.log('Selecting pet type...');
    await page.click('input[value="dog"]');
    
    // Select activity level
    console.log('Selecting activity level...');
    await page.select('select[name="activityLevel"]', 'moderate');
    
    // Select food type
    console.log('Selecting food type...');
    await page.select('select[name="foodType"]', 'dry');
    
    // Click calculate button
    console.log('Clicking calculate button...');
    const calculateButton = await page.$('button[type="submit"]');
    if (calculateButton) {
      await calculateButton.click();
      console.log('Calculate button clicked');
    } else {
      console.log('Calculate button not found');
    }
    
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
      console.log('Calculator element not found');
    }

    await browser.close();
    console.log('Browser closed');
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    process.exit(1);
  }
}

console.log('Starting pet food calculator screenshot capture...');
capturePetFoodCalculator()
  .then(() => console.log('Screenshot capture completed'))
  .catch((error) => {
    console.error('Screenshot capture failed:', error);
    process.exit(1);
  }); 