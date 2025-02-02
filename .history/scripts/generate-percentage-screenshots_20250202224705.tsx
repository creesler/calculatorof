import puppeteer from 'puppeteer';

async function capturePercentageCalculator() {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    
    console.log('Navigating to percentage calculator page...');
    await page.goto('http://localhost:3000/math/percentage-calculator', {
      waitUntil: 'networkidle0'
    });
    
    // Wait for form to be ready
    console.log('Waiting for form...');
    await page.waitForSelector('form');
    
    // Select calculation type
    console.log('Selecting calculation type...');
    await page.evaluate(() => {
      const select = document.querySelector('select[name="calculationType"]') as HTMLSelectElement;
      if (select) select.value = 'percentage';
    });
    
    // Fill in example values
    console.log('Filling in values...');
    const value1Input = await page.$('input[placeholder="25"]');
    if (value1Input) {
      await value1Input.type('25');
      console.log('Value 1 entered');
    }
    
    const value2Input = await page.$('input[placeholder="100"]');
    if (value2Input) {
      await value2Input.type('100');
      console.log('Value 2 entered');
    }
    
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
        path: 'public/images/percentagecalculator.JPG',
        type: 'jpeg',
        quality: 90
      });
      console.log('Screenshot saved as percentagecalculator.JPG');
    }

    await browser.close();
    console.log('Browser closed');
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    process.exit(1);
  }
}

console.log('Starting percentage calculator screenshot capture...');
capturePercentageCalculator()
  .then(() => console.log('Screenshot capture completed'))
  .catch((error) => {
    console.error('Screenshot capture failed:', error);
    process.exit(1);
  }); 