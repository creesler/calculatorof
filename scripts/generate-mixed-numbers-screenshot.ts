import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

async function generateMixedNumbersScreenshot() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1200, height: 800 }
  })

  try {
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/math/fraction-calculator', {
      waitUntil: 'networkidle0'
    })

    // Scroll to mixed numbers calculator
    await page.evaluate(() => {
      const element = document.querySelector('h2:contains("Mixed Numbers Calculator")')
      element?.scrollIntoView()
    })

    // Example calculation: 1¾ + 2½
    const inputs = await page.$$('input[type="number"]')
    await inputs[6].type('1')  // First whole number
    await inputs[7].type('3')  // First numerator
    await inputs[8].type('4')  // First denominator
    
    await inputs[9].type('2')   // Second whole number
    await inputs[10].type('1')  // Second numerator
    await inputs[11].type('2')  // Second denominator

    // Click calculate button
    const buttons = await page.$$('button[type="submit"]')
    await buttons[1].click()

    // Wait for result
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Take screenshot
    const calculatorElement = await page.$('.bg-white.rounded-lg.shadow-lg.p-6')
    if (calculatorElement) {
      const tempPngPath = path.join(process.cwd(), 'public/images/temp-mixed.png')
      await calculatorElement.screenshot({
        path: tempPngPath,
        type: 'png'
      })

      // Convert to WebP
      await sharp(tempPngPath)
        .webp({ 
          quality: 90,
          effort: 6
        })
        .toFile(path.join(process.cwd(), 'public/images/mixednumbers.webp'))

      // Clean up temp file
      fs.unlinkSync(tempPngPath)

      console.log('Mixed numbers calculator screenshot saved as WebP!')
    }

  } catch (error) {
    console.error('Error generating mixed numbers screenshot:', error)
  } finally {
    await browser.close()
  }
}

generateMixedNumbersScreenshot() 