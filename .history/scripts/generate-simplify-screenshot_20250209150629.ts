import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

async function generateSimplifyScreenshot() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1200, height: 800 }
  })

  try {
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/math/fraction-calculator', {
      waitUntil: 'networkidle0'
    })

    // Scroll to simplify calculator
    await page.evaluate(() => {
      const headers = Array.from(document.querySelectorAll('h2'))
      const simplifyHeader = headers.find(h => h.textContent?.includes('Simplify'))
      if (simplifyHeader) {
        simplifyHeader.scrollIntoView({ behavior: 'instant', block: 'center' })
      }
    })

    // Wait for calculator to be visible and inputs to load
    await page.waitForSelector('input[name="simplifyWhole"]', { visible: true })
    await page.waitForSelector('input[name="simplifyNum"]', { visible: true })
    await page.waitForSelector('input[name="simplifyDen"]', { visible: true })

    // Fill inputs directly
    await page.type('input[name="simplifyWhole"]', '2')
    await page.type('input[name="simplifyNum"]', '21')
    await page.type('input[name="simplifyDen"]', '98')

    // Click calculate button
    const submitButton = await page.waitForSelector('form:nth-of-type(3) button[type="submit"]')
    if (submitButton) {
      await submitButton.click()
    }

    // Wait for result to appear
    await page.waitForSelector('form:nth-of-type(3) .bg-gray-50.p-4.rounded-lg', {
      visible: true,
      timeout: 5000
    })

    // Additional wait to ensure animations complete
    await new Promise(resolve => setTimeout(resolve, 500))

    // Take screenshot of the calculator with result
    const calculatorElement = await page.$('form:nth-of-type(3)')
    if (calculatorElement) {
      const tempPngPath = path.join(process.cwd(), 'public/images/temp-simplify.png')
      await calculatorElement.screenshot({
        path: tempPngPath
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

      console.log('Simplify calculator screenshot saved with result!')
    }

  } catch (error) {
    console.error('Error generating simplify calculator screenshot:', error)
  } finally {
    await browser.close()
  }
}

generateSimplifyScreenshot() 