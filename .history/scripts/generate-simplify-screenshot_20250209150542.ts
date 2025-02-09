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

    // Wait for calculator to be visible
    await page.waitForSelector('form', { visible: true })

    // Fill in the calculator inputs and submit
    await page.evaluate(() => {
      const forms = Array.from(document.querySelectorAll('form'))
      const simplifyForm = forms[2] // Third form is simplify calculator
      if (simplifyForm) {
        // Get all inputs
        const wholeInput = simplifyForm.querySelector('input[name="simplifyWhole"]') as HTMLInputElement
        const numInput = simplifyForm.querySelector('input[name="simplifyNum"]') as HTMLInputElement
        const denInput = simplifyForm.querySelector('input[name="simplifyDen"]') as HTMLInputElement

        if (wholeInput && numInput && denInput) {
          // Set values
          wholeInput.value = '2'
          numInput.value = '21'
          denInput.value = '98'

          // Trigger input events
          [wholeInput, numInput, denInput].forEach(input => {
            input.dispatchEvent(new Event('input', { bubbles: true }))
          })

          // Submit form
          const submitButton = simplifyForm.querySelector('button[type="submit"]')
          if (submitButton) {
            submitButton.click()
          }
        }
      }
    })

    // Wait for result to appear
    await page.waitForFunction(() => {
      const forms = Array.from(document.querySelectorAll('form'))
      const simplifyForm = forms[2]
      return simplifyForm?.querySelector('.bg-gray-50.p-4.rounded-lg') !== null
    }, { timeout: 5000 })

    // Additional wait to ensure animations complete
    await new Promise(resolve => setTimeout(resolve, 500))

    // Take screenshot of the calculator with result
    const calculatorElement = await page.evaluate(() => {
      const forms = Array.from(document.querySelectorAll('form'))
      const simplifyForm = forms[2]
      const container = simplifyForm?.closest('.bg-white.rounded-lg.shadow-lg.p-6')
      return container?.getBoundingClientRect()
    })

    if (calculatorElement) {
      const tempPngPath = path.join(process.cwd(), 'public/images/temp-simplify.png')
      await page.screenshot({
        path: tempPngPath,
        clip: calculatorElement
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