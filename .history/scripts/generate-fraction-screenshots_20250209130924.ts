import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

async function generateFractionScreenshots() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1200, height: 800 }
  })

  try {
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/math/fraction-calculator', {
      waitUntil: 'networkidle0'
    })

    // Wait for the calculator to be visible
    await page.waitForSelector('form')

    // Example calculation: 3/4 + 1/2 = 5/4
    // First fraction
    const inputs = await page.$$('input[type="number"]')
    await inputs[0].type('3') // First numerator
    await inputs[1].type('4') // First denominator
    
    // Second fraction
    await inputs[2].type('1') // Second numerator
    await inputs[3].type('2') // Second denominator

    // Click calculate button
    await page.click('button[type="submit"]')

    // Wait for result to appear and animations to complete
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Ensure screenshots directory exists
    const publicDir = path.join(process.cwd(), 'public')
    const imagesDir = path.join(publicDir, 'images')
    
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir)
    }
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir)
    }

    // Take screenshot and save as temporary PNG
    const tempPngPath = path.join(imagesDir, 'temp-fraction.png')
    const calculatorElement = await page.$('.max-w-2xl.mx-auto.bg-white')
    if (calculatorElement) {
      await calculatorElement.screenshot({
        path: tempPngPath,
        type: 'png'
      })

      // Convert PNG to WebP using sharp with better quality
      await sharp(tempPngPath)
        .webp({ 
          quality: 90,  // Higher quality for better text readability
          effort: 6     // Maximum compression effort
        })
        .toFile(path.join(imagesDir, 'fractioncalculator.webp'))

      // Delete temporary PNG file
      fs.unlinkSync(tempPngPath)

      console.log('Fraction calculator screenshot saved as WebP to public/images/fractioncalculator.webp')
    }

  } catch (error) {
    console.error('Error generating fraction calculator screenshot:', error)
  } finally {
    await browser.close()
  }
}

generateFractionScreenshots() 