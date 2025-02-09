import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

async function generateSimplifyFormula() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 800, height: 400 }
  })

  try {
    const page = await browser.newPage()
    
    // HTML content for the formula
    const html = `
      <div style="
        font-family: system-ui;
        padding: 20px;
        background: white;
        display: flex;
        flex-direction: column;
        gap: 24px;
      ">
        <div style="text-align: center;">
          <div style="font-weight: bold; font-size: 24px; margin-bottom: 20px;">
            Simplifying Fractions
          </div>
          <div style="
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            font-size: 20px;
          ">
            <div>
              <span style="display: inline-flex; flex-direction: column; align-items: center;">
                <span>24</span>
                <div style="border-top: 2px solid black; width: 30px; margin: 4px 0;"></div>
                <span>36</span>
              </span>
              <span style="margin: 0 16px;">→</span>
              <span style="display: inline-flex; flex-direction: column; align-items: center;">
                <span>24 ÷ 12</span>
                <div style="border-top: 2px solid black; width: 60px; margin: 4px 0;"></div>
                <span>36 ÷ 12</span>
              </span>
              <span style="margin: 0 16px;">=</span>
              <span style="display: inline-flex; flex-direction: column; align-items: center;">
                <span>2</span>
                <div style="border-top: 2px solid black; width: 30px; margin: 4px 0;"></div>
                <span>3</span>
              </span>
            </div>
          </div>
        </div>

        <div style="
          margin-top: 20px;
          padding: 16px;
          background: #f3f4f6;
          border-radius: 8px;
          font-size: 16px;
        ">
          <p style="margin: 0 0 8px 0; font-weight: bold;">Steps:</p>
          <ol style="margin: 0; padding-left: 20px;">
            <li>Find the Greatest Common Divisor (GCD) of numerator and denominator</li>
            <li>Divide both numbers by their GCD</li>
            <li>The result is the simplified fraction</li>
          </ol>
        </div>
      </div>
    `

    await page.setContent(html)

    // Take screenshot
    const tempPngPath = path.join(process.cwd(), 'public/images/temp-simplify-formula.png')
    await page.screenshot({
      path: tempPngPath,
      type: 'png'
    })

    // Convert to WebP
    await sharp(tempPngPath)
      .webp({ 
        quality: 90,
        effort: 6
      })
      .toFile(path.join(process.cwd(), 'public/images/simplify-formula.webp'))

    // Clean up temp file
    fs.unlinkSync(tempPngPath)

    console.log('Simplify formula image saved!')
  } catch (error) {
    console.error('Error generating simplify formula:', error)
  } finally {
    await browser.close()
  }
}

generateSimplifyFormula() 