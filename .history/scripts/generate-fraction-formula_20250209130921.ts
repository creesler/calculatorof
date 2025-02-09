import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

async function generateFractionFormula() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 800, height: 200 }
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
        gap: 20px;
      ">
        <div style="display: flex; justify-content: space-around; align-items: center;">
          <div style="text-align: center;">
            <div style="font-weight: bold; margin-bottom: 10px;">Addition</div>
            <div>
              <span style="font-size: 20px;">a/b + c/d = (ad + bc)/bd</span>
            </div>
          </div>
          <div style="text-align: center;">
            <div style="font-weight: bold; margin-bottom: 10px;">Subtraction</div>
            <div>
              <span style="font-size: 20px;">a/b - c/d = (ad - bc)/bd</span>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-around; align-items: center;">
          <div style="text-align: center;">
            <div style="font-weight: bold; margin-bottom: 10px;">Multiplication</div>
            <div>
              <span style="font-size: 20px;">a/b × c/d = ac/bd</span>
            </div>
          </div>
          <div style="text-align: center;">
            <div style="font-weight: bold; margin-bottom: 10px;">Division</div>
            <div>
              <span style="font-size: 20px;">a/b ÷ c/d = ad/bc</span>
            </div>
          </div>
        </div>
      </div>
    `

    await page.setContent(html)

    // Take screenshot
    const tempPngPath = path.join(process.cwd(), 'public/images/temp-fraction-formula.png')
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
      .toFile(path.join(process.cwd(), 'public/images/fraction-formula.webp'))

    // Clean up temp file
    fs.unlinkSync(tempPngPath)

    console.log('Fraction formula image generated successfully!')
  } catch (error) {
    console.error('Error generating fraction formula:', error)
  } finally {
    await browser.close()
  }
}

generateFractionFormula() 