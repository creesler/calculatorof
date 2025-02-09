const puppeteer = require('puppeteer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

async function generateFractionExamples() {
  // Ensure images directory exists
  const imagesDir = path.join(process.cwd(), 'public', 'images')
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }

  const browser = await puppeteer.launch({
    headless: 'new'
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 800 })

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
    await page.waitForSelector('.flex.flex-col.items-center', { timeout: 5000 })

    // Take screenshot
    const screenshot = await page.screenshot()

    // Convert to WebP and save
    await sharp(screenshot)
      .webp({ quality: 80 })
      .toFile(path.join(imagesDir, `fraction-example-${i + 1}.webp`))

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

  await browser.close()
  console.log('Generated fraction calculator example screenshots')
}

generateFractionExamples() 