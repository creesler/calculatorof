import puppeteer from 'puppeteer';

async function captureFormula() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Create a simple HTML page with the formula
  await page.setContent(`
    <div style="padding: 20px; background: white;">
      <div style="font-family: Arial; font-size: 24px; margin-bottom: 20px;">
        ROI = ((Total Revenue - Total Costs) / Initial Investment) × 100%
      </div>
      <div style="font-family: Arial; font-size: 16px; color: #666; margin-bottom: 10px;">
        Where: Total Revenue = Annual Revenue × Time Period
      </div>
      <div style="font-family: Arial; font-size: 16px; color: #666;">
        Total Costs = (Annual Costs × Time Period) + Initial Investment
      </div>
    </div>
  `);

  await page.setViewport({ width: 600, height: 200 });
  
  await page.screenshot({
    path: 'public/images/roi-formula.jpg',
    type: 'jpeg',
    quality: 90
  });

  await browser.close();
}

captureFormula(); 