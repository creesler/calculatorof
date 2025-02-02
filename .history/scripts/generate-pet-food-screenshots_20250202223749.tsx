import puppeteer from 'puppeteer';

async function capturePetFoodCalculator() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Navigate to pet food calculator page
    await page.goto('http://localhost:3000/pet/pet-food-calculator', {
      waitUntil: 'networkidle0',
    });
    
    await page.setViewport({ width: 1200, height: 800 });
    
    // Wait for form to be ready
    await page.waitForSelector('form');
    
    // Fill in example values
    await page.click('input[value="dog"]'); // Select dog
    await page.click('input[value="metric"]'); // Select metric units
    
    const weightInput = await page.$('input[placeholder="10"]');
    if (weightInput) await weightInput.type('10');
    
    const ageInput = await page.$('input[placeholder="3"]');
    if (ageInput) await ageInput.type('3');
    
    // Select activity level
    await page.select('select[name="activityLevel"]', 'moderate');
    
    // Select food type
    await page.select('select[name="foodType"]', 'dry');
    
    // Click calculate button
    await page.click('button[type="submit"]');
    
    // Wait for results to appear
    await page.waitForSelector('.bg-gray-50');
    
    // Wait a bit for any animations
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot of the calculator section
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
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    process.exit(1);
  }
}

capturePetFoodCalculator(); 