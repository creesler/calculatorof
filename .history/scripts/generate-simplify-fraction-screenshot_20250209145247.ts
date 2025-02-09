import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

async function generateSimplifyFractionScreenshot() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1200, height: 800 }
  })

  try {
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/math/simplify-fractions', {
      waitUntil: 'networkidle0'
    })

    // Example calculation: 8/12 = 2/3
    const inputs = await page.$$('input[type="number"]')
    await inputs[0].type('8')  // Numerator
    await inputs[1].type('12') // Denominator

    // Click calculate button
    await page.click('button[type="submit"]')

    // Wait for result
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Take screenshot
    const calculatorElement = await page.$('.bg-white.rounded-lg.shadow-lg.p-6')
    if (calculatorElement) {
      const tempPngPath = path.join(process.cwd(), 'public/images/temp-simplify.png')
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
        .toFile(path.join(process.cwd(), 'public/images/simplify-fraction.webp'))

      // Clean up temp file
      fs.unlinkSync(tempPngPath)

      console.log('Simplify fraction calculator screenshot saved as WebP!')
    }

  } catch (error) {
    console.error('Error generating simplify fraction screenshot:', error)
  } finally {
    await browser.close()
  }
}

generateSimplifyFractionScreenshot() 