import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'

async function generateFractionScreenshots() {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: { width: 1200, height: 800 }
  })

  try {
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/math/fraction-calculator', {
      waitUntil: 'networkidle0'
    })

    // Example calculation: 3/4 + 1/2 = 5/4
    await page.type('input[placeholder="0"]:nth-of-type(1)', '3')
    await page.type('input[placeholder="1"]:nth-of-type(1)', '4')
    
    // Select addition operation (it's already selected by default)
    
    await page.type('input[placeholder="0"]:nth-of-type(2)', '1')
    await page.type('input[placeholder="1"]:nth-of-type(2)', '2')

    // Click calculate button
    await page.click('button[type="submit"]')

    // Wait for result to appear
    await page.waitForFunction(() => {
      const result = document.querySelector('div.flex.flex-col.items-center span:first-child')
      return result && result.textContent === '5'
    })

    // Create screenshots directory if it doesn't exist
    const screenshotsDir = path.join(process.cwd(), 'public/images')
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true })
    }

    // Take screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, 'fractioncalculator.jpg'),
      quality: 100,
      type: 'jpeg'
    })

    console.log('Fraction calculator screenshot generated successfully!')
  } catch (error) {
    console.error('Error generating fraction calculator screenshot:', error)
  } finally {
    await browser.close()
  }
}

generateFractionScreenshots() 