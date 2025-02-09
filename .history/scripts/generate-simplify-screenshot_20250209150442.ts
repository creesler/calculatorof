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
        simplifyHeader.scrollIntoView()
      }
    })

    // Wait for calculator to be visible
    await page.waitForSelector('form', { visible: true })

    // Fill in the calculator inputs
    await page.evaluate(() => {
      const forms = Array.from(document.querySelectorAll('form'))
      const simplifyForm = forms[2] // Third form is simplify calculator
      if (simplifyForm) {
        const inputs = Array.from(simplifyForm.querySelectorAll('input[type="number"]')) as HTMLInputElement[]
        if (inputs.length >= 3) {
          inputs[0].value = '2'   // whole number
          inputs[1].value = '21'  // numerator
          inputs[2].value = '98'  // denominator

          // Trigger input events
          inputs.forEach(input => {
            input.dispatchEvent(new Event('input', { bubbles: true }))
          })
        }

        // Click calculate button
        const button = simplifyForm.querySelector('button[type="submit"]') as HTMLButtonElement
        if (button) {
          button.click()
        }
      }
    })

    // Wait for result to appear
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Take screenshot of the calculator with result
    const calculatorElement = await page.$('.bg-white.rounded-lg.shadow-lg.p-6')
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