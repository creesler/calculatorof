import puppeteer from 'puppeteer';

async function captureScreenshot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:3000/finance/roi-calculator');
  
  // Wait for calculator to load
  await page.waitForSelector('form');
  
  // Take screenshot of the calculator section
  await page.screenshot({
    path: 'public/images/roi-calculator-screenshot.png',
    clip: {
      x: 0,
      y: 0,
      width: 800,
      height: 400
    }
  });

  await browser.close();
}

captureScreenshot(); 