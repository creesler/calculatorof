import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

async function generateMixedNumbersResultScreenshot() {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: { width: 1200, height: 800 }
  })

  try {
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/math/fraction-calculator', {
      waitUntil: 'networkidle0'
    })

    // Scroll to mixed numbers calculator using text content
    await page.evaluate(() => {
      const headers = Array.from(document.querySelectorAll('h2'))
      const mixedNumbersHeader = headers.find(h => h.textContent?.includes('Mixed Numbers Calculator'))
      mixedNumbersHeader?.scrollIntoView()
    })

    // Wait for inputs to be available
    await page.waitForSelector('input[type="number"]')

    // Example calculation: 2 3/4 + 1 1/2 = 4 1/4
    const inputs = await page.$$('input[type="number"]')
    await inputs[6].type('2')   // First whole number
    await inputs[7].type('3')   // First numerator
    await inputs[8].type('4')   // First denominator
    
    await inputs[9].type('1')   // Second whole number
    await inputs[10].type('1')  // Second numerator
    await inputs[11].type('2')  // Second denominator

    // Click calculate button for mixed numbers
    const buttons = await page.$$('button[type="submit"]')
    await buttons[1].click()

    // Wait for result and animations
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Take screenshot of just the result section
    const resultElement = await page.$('.bg-gray-50.p-4.rounded-lg:last-of-type')
    if (resultElement) {
      const tempPngPath = path.join(process.cwd(), 'public/images/temp-mixed-result.png')
      await resultElement.screenshot({
        path: tempPngPath,
        type: 'png'
      })

      // Convert to WebP
      await sharp(tempPngPath)
        .webp({ 
          quality: 90,
          effort: 6
        })
        .toFile(path.join(process.cwd(), 'public/images/mixednumbers-result.webp'))

      // Clean up temp file
      fs.unlinkSync(tempPngPath)

      console.log('Mixed numbers result screenshot saved as WebP!')
    }

  } catch (error) {
    console.error('Error generating mixed numbers result screenshot:', error)
  } finally {
    await browser.close()
  }
}

generateMixedNumbersResultScreenshot() 