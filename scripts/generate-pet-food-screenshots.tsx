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
    
    // Fill weight
    const weightInput = await page.$('input[type="number"][placeholder="10"]');
    if (weightInput) {
      await weightInput.type('10');
      console.log('Weight entered');
    }
    
    // Fill age
    const ageInput = await page.$('input[type="number"][placeholder="3"]');
    if (ageInput) {
      await ageInput.type('3');
      console.log('Age entered');
    }
    
    // Pet type is dog by default
    
    // Select activity level
    console.log('Selecting activity level...');
    await page.evaluate(() => {
      const select = document.querySelector('select[name="activityLevel"]') as HTMLSelectElement;
      if (select) select.value = 'moderate';
    });
    
    // Select food type
    console.log('Selecting food type...');
    await page.evaluate(() => {
      const select = document.querySelector('select[name="foodType"]') as HTMLSelectElement;
      if (select) select.value = 'dry';
    });
    
    // Click calculate button
    console.log('Clicking calculate...');
    const calculateButton = await page.$('button[type="submit"]');
    if (calculateButton) {
      await calculateButton.click();
      console.log('Calculate button clicked');
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