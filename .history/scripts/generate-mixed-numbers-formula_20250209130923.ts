import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

async function generateMixedNumbersFormula() {
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
            Mixed Numbers to Improper Fractions
          </div>
          <div style="
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            font-size: 20px;
          ">
            <div>
              <span>a</span>
              <span style="margin: 0 8px;">
                <span style="display: inline-flex; flex-direction: column; align-items: center;">
                  <span>b</span>
                  <div style="border-top: 2px solid black; width: 20px; margin: 4px 0;"></div>
                  <span>c</span>
                </span>
              </span>
              <span>→</span>
              <span style="margin-left: 8px;">
                <span style="display: inline-flex; flex-direction: column; align-items: center;">
                  <span>(a × c + b)</span>
                  <div style="border-top: 2px solid black; width: 80px; margin: 4px 0;"></div>
                  <span>c</span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div style="text-align: center;">
          <div style="font-weight: bold; font-size: 24px; margin-bottom: 20px;">
            Improper Fractions to Mixed Numbers
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
                <span>a</span>
                <div style="border-top: 2px solid black; width: 20px; margin: 4px 0;"></div>
                <span>b</span>
              </span>
              <span style="margin: 0 8px;">→</span>
              <span>
                <span>⌊a ÷ b⌋</span>
                <span style="margin: 0 8px;">
                  <span style="display: inline-flex; flex-direction: column; align-items: center;">
                    <span>remainder</span>
                    <div style="border-top: 2px solid black; width: 80px; margin: 4px 0;"></div>
                    <span>b</span>
                  </span>
                </span>
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
          <p style="margin: 0 0 8px 0; font-weight: bold;">Where:</p>
          <ul style="margin: 0; padding-left: 20px;">
            <li>a = whole number (for mixed to improper) or numerator (for improper to mixed)</li>
            <li>b = numerator (for mixed to improper) or denominator (for improper to mixed)</li>
            <li>c = denominator</li>
            <li>⌊x⌋ = floor function (rounds down to nearest integer)</li>
          </ul>
        </div>
      </div>
    `

    await page.setContent(html)

    // Ensure directories exist
    const publicDir = path.join(process.cwd(), 'public')
    const imagesDir = path.join(publicDir, 'images')
    
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir)
    }
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir)
    }

    // Take screenshot
    const tempPngPath = path.join(imagesDir, 'temp-mixed-formula.png')
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
      .toFile(path.join(imagesDir, 'mixednumbers-formula.webp'))

    // Clean up temp file
    fs.unlinkSync(tempPngPath)

    console.log('Mixed numbers formula image saved to public/images/mixednumbers-formula.webp')
  } catch (error) {
    console.error('Error generating mixed numbers formula:', error)
  } finally {
    await browser.close()
  }
}

generateMixedNumbersFormula() 