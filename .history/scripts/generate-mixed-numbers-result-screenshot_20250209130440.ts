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
    // Ensure directories exist
    const publicDir = path.join(process.cwd(), 'public')
    const imagesDir = path.join(publicDir, 'images')
    
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir)
      console.log('Created public directory')
    }
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir)
      console.log('Created images directory')
    }

    const page = await browser.newPage()
    await page.goto('http://localhost:3000/math/fraction-calculator', {
      waitUntil: 'networkidle0'
    })

    // Wait for both calculators to be loaded
    await page.waitForSelector('form', { visible: true })

    // Fill in the mixed numbers calculator inputs
    await page.evaluate(() => {
      const forms = Array.from(document.querySelectorAll('form'))
      if (forms.length >= 2) {
        const mixedForm = forms[1]
        const inputs = Array.from(mixedForm.querySelectorAll('input[type="number"]'))
        
        // Set values
        if (inputs.length >= 6) {
          inputs[0].value = '2'  // whole
          inputs[1].value = '3'  // numerator
          inputs[2].value = '4'  // denominator
          inputs[3].value = '1'  // whole
          inputs[4].value = '1'  // numerator
          inputs[5].value = '2'  // denominator

          // Trigger input events
          inputs.forEach(input => {
            input.dispatchEvent(new Event('input', { bubbles: true }))
          })
        }

        // Click calculate button
        const button = mixedForm.querySelector('button[type="submit"]')
        if (button) {
          button.click()
        }
      }
    })

    // Wait for result to appear
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Take screenshot
    const tempPngPath = path.join(imagesDir, 'temp-mixed-result.png')
    const finalWebpPath = path.join(imagesDir, 'mixednumbers-result.webp')

    // Get the mixed numbers calculator element
    const boundingBox = await page.evaluate(() => {
      const forms = Array.from(document.querySelectorAll('form'))
      if (forms.length >= 2) {
        const mixedForm = forms[1]
        const container = mixedForm.closest('.bg-white.rounded-lg.shadow-lg.p-6')
        if (container) {
          const rect = container.getBoundingClientRect()
          return {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height
          }
        }
      }
      return null
    })

    if (boundingBox) {
      // Take screenshot of the specific area
      await page.screenshot({
        path: tempPngPath,
        clip: {
          x: boundingBox.x,
          y: boundingBox.y,
          width: boundingBox.width,
          height: boundingBox.height
        }
      })

      console.log('Temporary screenshot saved:', tempPngPath)

      // Convert to WebP
      try {
        await sharp(tempPngPath)
          .webp({ 
            quality: 90,
            effort: 6
          })
          .toFile(finalWebpPath)

        console.log('Final WebP saved to:', finalWebpPath)

        // Clean up temp file
        fs.unlinkSync(tempPngPath)
        console.log('Temporary file cleaned up')
      } catch (sharpError) {
        console.error('Error during image conversion:', sharpError)
      }
    } else {
      console.error('Mixed numbers calculator element not found')
    }

  } catch (error) {
    console.error('Error generating mixed numbers result screenshot:', error)
  } finally {
    await browser.close()
  }
}

generateMixedNumbersResultScreenshot() 