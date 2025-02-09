import puppeteer from 'puppeteer'
import sharp from 'sharp'
import path from 'path'

async function generateFractionExamples() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 800 })

  // Navigate to fraction calculator
  await page.goto('http://localhost:3000/math/fraction-calculator')

  // Example calculations
  const examples = [
    { num1: 1, den1: 2, op: 'add', num2: 1, den2: 4 },      // 1/2 + 1/4 = 3/4
    { num1: 3, den1: 4, op: 'multiply', num2: 2, den2: 3 }, // 3/4 × 2/3 = 1/2
    { num1: 1, den1: 2, op: 'divide', num2: 1, den2: 4 }    // 1/2 ÷ 1/4 = 2/1
  ]

  // Use traditional for loop instead of for...of with entries()
  for (let i = 0; i < examples.length; i++) {
    const example = examples[i]
    
    // Fill in the form
    await page.type('input[placeholder="0"]:nth-of-type(1)', example.num1.toString())
    await page.type('input[placeholder="1"]:nth-of-type(1)', example.den1.toString())
    await page.click(`input[value="${example.op}"]`)
    await page.type('input[placeholder="0"]:nth-of-type(2)', example.num2.toString())
    await page.type('input[placeholder="1"]:nth-of-type(2)', example.den2.toString())
    
    await page.click('button[type="submit"]')
    await page.waitForSelector('.result') // Wait for result to appear

    // Take screenshot
    const screenshot = await page.screenshot()

    // Convert to WebP and save
    await sharp(screenshot)
      .webp({ quality: 80 })
      .toFile(path.join(process.cwd(), 'public/images', `fraction-example-${i + 1}.webp`))

    // Clear inputs for next example using proper type assertion
    await page.evaluate(() => {
      const inputs = document.querySelectorAll('input[type="number"]')
      inputs.forEach((input) => {
        if (input instanceof HTMLInputElement) {
          input.value = ''
        }
      })
    })
  }

  await browser.close()
}

// Add script to package.json
generateFractionExamples() 