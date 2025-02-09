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

    // Wait for the mixed numbers calculator section
    await page.waitForSelector('h2')

    // Find and scroll to mixed numbers calculator
    await page.evaluate(() => {
      const headers = Array.from(document.querySelectorAll('h2'))
      const mixedNumbersHeader = headers.find(h => h.textContent?.includes('Mixed Numbers Calculator'))
      if (mixedNumbersHeader) {
        mixedNumbersHeader.scrollIntoView()
      }
    })

    // Wait for all calculator inputs to be loaded
    await page.waitForSelector('form input[type="number"]', { visible: true })
    await new Promise(resolve => setTimeout(resolve, 500)) // Extra wait for stability

    // Fill in the mixed numbers calculator inputs
    await page.evaluate(() => {
      const forms = document.querySelectorAll('form')
      const mixedForm = forms[1] // Second form is mixed numbers calculator
      if (mixedForm) {
        const inputs = mixedForm.querySelectorAll('input[type="number"]')
        // First mixed number: 2 3/4
        inputs[0].value = '2'  // whole
        inputs[1].value = '3'  // numerator
        inputs[2].value = '4'  // denominator
        // Second mixed number: 1 1/2
        inputs[3].value = '1'  // whole
        inputs[4].value = '1'  // numerator
        inputs[5].value = '2'  // denominator

        // Trigger input events
        inputs.forEach(input => {
          input.dispatchEvent(new Event('input', { bubbles: true }))
        })
      }
    })

    // Click the calculate button
    await page.evaluate(() => {
      const forms = document.querySelectorAll('form')
      const mixedForm = forms[1]
      const button = mixedForm.querySelector('button[type="submit"]')
      if (button) {
        button.click()
      }
    })

    // Wait for result to appear
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Take screenshot of the result section
    const resultElement = await page.evaluate(() => {
      const forms = document.querySelectorAll('form')
      const mixedForm = forms[1]
      return mixedForm.querySelector('.bg-gray-50.p-4.rounded-lg')
    })

    if (resultElement) {
      const tempPngPath = path.join(imagesDir, 'temp-mixed-result.png')
      const finalWebpPath = path.join(imagesDir, 'mixednumbers-result.webp')

      await page.screenshot({
        path: tempPngPath,
        clip: await resultElement.boundingBox(),
        type: 'png'
      })

      // Convert to WebP
      await sharp(tempPngPath)
        .webp({ 
          quality: 90,
          effort: 6
        })
        .toFile(finalWebpPath)

      // Clean up temp file
      fs.unlinkSync(tempPngPath)

      console.log(`Mixed numbers result screenshot saved to: ${finalWebpPath}`)
    }

  } catch (error) {
    console.error('Error generating mixed numbers result screenshot:', error)
  } finally {
    await browser.close()
  }
}

generateMixedNumbersResultScreenshot() 