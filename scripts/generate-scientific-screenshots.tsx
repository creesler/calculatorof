import puppeteer from 'puppeteer';

async function captureScientificCalculator() {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    
    console.log('Navigating to scientific calculator page...');
    await page.goto('http://localhost:3000/math/scientific-calculator', {
      waitUntil: 'networkidle0'
    });
    
    // Wait for form to be ready
    console.log('Waiting for form...');
    await page.waitForSelector('form');
    
    // Enter example calculation: sin(π/2)
    console.log('Entering calculation...');
    const buttons = ['sin(', 'π', '/', '2', ')'];
    
    for (const btn of buttons) {
      await page.evaluate((value) => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const button = buttons.find(b => b.textContent === value);
        if (button) button.click();
      }, btn);
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between clicks
    }
    
    // Click calculate (=) button
    console.log('Clicking calculate...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const equalsButton = buttons.find(b => b.textContent === '=');
      if (equalsButton) equalsButton.click();
    });
    
    // Wait for result to appear
    console.log('Waiting for results...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot of the calculator section
    console.log('Taking screenshot...');
    const calculatorElement = await page.$('.max-w-2xl');
    if (calculatorElement) {
      await calculatorElement.screenshot({
        path: 'public/images/scientificcalculator.JPG',
        type: 'jpeg',
        quality: 90
      });
      console.log('Screenshot saved as scientificcalculator.JPG');
    }

    await browser.close();
    console.log('Browser closed');
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    process.exit(1);
  }
}

console.log('Starting scientific calculator screenshot capture...');
captureScientificCalculator()
  .then(() => console.log('Screenshot capture completed'))
  .catch((error) => {
    console.error('Screenshot capture failed:', error);
    process.exit(1);
  }); 