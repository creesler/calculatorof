import puppeteer from 'puppeteer';

async function captureFormulas() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Create loan formula image
  await page.setContent(`
    <div style="padding: 20px; background: white;">
      <div style="font-family: Arial; font-size: 24px; margin-bottom: 20px;">
        PMT = P × (r(1 + r)ⁿ) / ((1 + r)ⁿ - 1)
      </div>
      <div style="font-family: Arial; font-size: 16px; color: #666; margin-bottom: 10px;">
        Where: PMT = Monthly Payment, P = Principal, r = Monthly Interest Rate
      </div>
      <div style="font-family: Arial; font-size: 16px; color: #666;">
        n = Total Number of Payments (Years × 12 for monthly payments)
      </div>
    </div>
  `);

  await page.setViewport({ width: 600, height: 200 });
  
  await page.screenshot({
    path: 'public/images/loan-formula.jpg',
    type: 'jpeg',
    quality: 90
  });

  await browser.close();
}

captureFormulas(); 