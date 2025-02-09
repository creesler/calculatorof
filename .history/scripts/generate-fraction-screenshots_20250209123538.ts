import puppeteer from 'puppeteer'
import sharp from 'sharp'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'

async function generateFractionExamples() {
  // Ensure images directory exists
  const imagesDir = join(process.cwd(), 'public', 'images')
  if (!existsSync(imagesDir)) {
    mkdirSync(imagesDir, { recursive: true })
  }

  const browser = await puppeteer.launch({
    headless: 'new'
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 800 })

  try {
    // Navigate to fraction calculator
    await page.goto('http://localhost:3000/math/fraction-calculator', {
      waitUntil: 'networkidle0'
    })

    // Example calculations
    const examples = [
      { num1: 1, den1: 2, op: 'add', num2: 1, den2: 4 },      // 1/2 + 1/4 = 3/4
      { num1: 3, den1: 4, op: 'multiply', num2: 2, den2: 3 }, // 3/4 × 2/3 = 1/2
      { num1: 1, den1: 2, op: 'divide', num2: 1, den2: 4 }    // 1/2 ÷ 1/4 = 2/1
    ]

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i]
      
      // Wait for form to be ready
      await page.waitForSelector('form')

      // Fill in first fraction
      const inputs = await page.$$('input[type="number"]')
      await inputs[0].type(example.num1.toString())
      await inputs[1].type(example.den1.toString())

      // Select operation
      const radioButton = await page.$(`input[value="${example.op}"]`)
      await radioButton.click()

      // Fill in second fraction
      await inputs[2].type(example.num2.toString())
      await inputs[3].type(example.den2.toString())
      
      // Submit and wait for result
      const submitButton = await page.$('button[type="submit"]')
      await submitButton.click()
      
      // Wait for result to appear
      await page.waitForSelector('.result', { timeout: 5000 })

      // Take screenshot
      const screenshot = await page.screenshot()

      // Convert to WebP and save
      await sharp(screenshot)
        .webp({ quality: 80 })
        .toFile(join(imagesDir, `fraction-example-${i + 1}.webp`))

      // Clear inputs
      await page.evaluate(() => {
        const inputs = document.querySelectorAll('input[type="number"]')
        inputs.forEach((input) => {
          if (input instanceof HTMLInputElement) {
            input.value = ''
          }
        })
      })
    }
  } catch (error) {
    console.error('Error generating screenshots:', error)
  } finally {
    await browser.close()
  }
  
  console.log('Generated fraction calculator example screenshots')
}

generateFractionExamples() 