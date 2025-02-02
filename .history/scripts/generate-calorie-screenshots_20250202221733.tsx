import puppeteer from 'puppeteer';

async function captureCalorieCalculator() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Create calorie formula image
  await page.setContent(`
    <div style="padding: 20px; background: white;">
      <div style="font-family: Arial; font-size: 24px; margin-bottom: 20px;">
        BMR (Male) = (10 × weight) + (6.25 × height) - (5 × age) + 5
      </div>
      <div style="font-family: Arial; font-size: 24px; margin-bottom: 20px;">
        BMR (Female) = (10 × weight) + (6.25 × height) - (5 × age) - 161
      </div>
      <div style="font-family: Arial; font-size: 16px; color: #666; margin-bottom: 10px;">
        Daily Calories = BMR × Activity Level + Goal Adjustment
      </div>
      <div style="font-family: Arial; font-size: 16px; color: #666;">
        Where: weight in kg, height in cm, age in years
      </div>
    </div>
  `);

  await page.setViewport({ width: 600, height: 200 });
  
  await page.screenshot({
    path: 'public/images/calorie-formula.jpg',
    type: 'jpeg',
    quality: 90
  });

  // Navigate to calorie calculator page and wait for it to load
  await page.goto('http://localhost:3000/health/calorie-calculator');
  await page.setViewport({ width: 1200, height: 800 });
  
  // Fill in example values
  await page.type('input[placeholder="30"]', '30');
  await page.type('input[placeholder="70"]', '70');
  await page.type('input[placeholder="170"]', '170');
  
  // Select gender
  await page.click('input[value="male"]');
  
  // Select activity level
  await page.select('select[name="activityLevel"]', 'moderate');
  
  // Select goal
  await page.select('select[name="goal"]', 'maintain');
  
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