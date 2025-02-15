import { chromium, Page } from 'playwright'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

interface PinContent {
  imageName: string;
  title: string;
  description: string;
  tags: string[];
  websiteUrl: string;
}

// Main automation function that handles all Pinterest interactions
async function pinterestAutomation(content: PinContent) {
  console.log(`Starting Pinterest upload for ${content.imageName}...`)
  
  const browser = await chromium.launchPersistentContext(
    'C:\\Users\\crees\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data\\Default',
    {
      executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
      headless: false,
      permissions: ['notifications'],
      args: ['--disable-notifications']
    }
  )

  try {
    const page = await browser.newPage()
    let uploadSuccess = false
    
    page.on('dialog', async (dialog) => {
      await dialog.dismiss()
    })
    
    await page.goto('https://ph.pinterest.com/pin-creation-tool/')
    
    // Check for existing drafts
    const draftsSidebar = await page.waitForSelector('div[data-test-id="storyboard-drafts-sidebar"]', { 
      timeout: 5000 
    }).catch(() => null)

    if (draftsSidebar) {
      console.log('Checking drafts...')
      const draftText = await page.$eval('div.X8m.zDA.IZT.tBJ.dyH.iFc.bwj.swG', 
        el => el.textContent || '')
      
      if (draftText.includes('(1)')) {
        console.log('Found existing draft, deleting...')
        
        try {
          // First click the draft container
          const draftContainer = await page.waitForSelector('div[data-test-id="pin-draft-content-container"]', {
            state: 'visible',
            timeout: 5000
          })
          
          if (draftContainer) {
            // Click and wait for any animations/transitions
            await draftContainer.click()
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            // Hover over the container to show 3 dots
            await page.hover('div[data-test-id="pin-draft-content-container"]')
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Now the 3 dots button should be visible
            const threeDots = await page.waitForSelector('div[data-test-id="pin-draft-actions"] button', {
              state: 'visible',
              timeout: 5000
            })
            
            if (threeDots) {
              await threeDots.click()
              await new Promise(resolve => setTimeout(resolve, 1000))
              
              // Click delete option
              const deleteButton = await page.waitForSelector('div[data-test-id="delete-draft-action"]')
              if (deleteButton) {
                await deleteButton.click()
                
                // Wait for and click confirm delete in modal
                const confirmDelete = await page.waitForSelector('div[data-test-id="modal-confirm-button"] button')
                if (confirmDelete) {
                  await confirmDelete.click()
                  await new Promise(resolve => setTimeout(resolve, 2000))
                  console.log('Draft deleted, proceeding with new upload')
                }
              }
            }
          }
        } catch (error) {
          console.log('Error in draft deletion:', error)
        }
      }
      
      // Upload new image regardless of previous draft state
      uploadSuccess = await uploadImage(page, content)
    } else {
      console.log('No drafts found, proceeding with upload')
      uploadSuccess = await uploadImage(page, content)
    }

    if (uploadSuccess) {
      // Click the uploaded image first
      await page.click('div[data-test-id="storyboard-pin-card-item"]')
      
      // Wait for title field to be visible
      await page.waitForSelector('div[data-test-id="storyboard-title-field-container"] input', {
        state: 'visible',
        timeout: 5000
      })

      console.log('Adding title and description...')
      
      // Fill title
      await page.fill('div[data-test-id="storyboard-title-field-container"] input', content.title)
      
      // Small delay after title
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Fill description
      const descriptionContainer = await page.waitForSelector('div[data-test-id="storyboard-description-field-container"]')
      if (descriptionContainer) {
        await descriptionContainer.click()
        await page.keyboard.type(content.description)
        console.log('Description added')
      }

      // Add website link
      await page.fill('input#WebsiteField', content.websiteUrl)

      // Add tags with suggestion handling
      for (const tag of content.tags) {
        // Type tag slowly to see suggestions
        for (const char of tag) {
          await page.type('input#storyboard-selector-interest-tags', char)
          await new Promise(resolve => setTimeout(resolve, 100))
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for suggestions
        
        // Wait for suggestions modal
        const suggestionsList = await page.waitForSelector('div[data-test-id="storyboard-suggestions-list"]', {
          state: 'visible',
          timeout: 5000
        }).catch(() => null)
        
        if (suggestionsList) {
          // Get all suggestion items
          const suggestions = await page.$$('div[data-test-id="storyboard-suggestions-item"]')
          
          if (suggestions.length > 0) {
            // Check if any suggestion matches our tag (case insensitive)
            let matched = false
            for (const suggestion of suggestions) {
              const text = await suggestion.textContent() || ''
              if (text.toLowerCase().includes(tag.toLowerCase())) {
                // Click matching suggestion
                await suggestion.click()
                matched = true
                break
              }
            }
            
            // If no match found, click first suggestion
            if (!matched && suggestions[0]) {
              await suggestions[0].click()
            }
          } else {
            // No suggestions, just press enter
            await page.keyboard.press('Enter')
          }
        } else {
          // If no suggestions appear, just add the tag
          await page.keyboard.press('Enter')
        }
        
        // Clear input for next tag
        await page.fill('input#storyboard-selector-interest-tags', '')
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      // Select board
      console.log('Selecting board...')
      await page.click('div[data-test-id="board-dropdown-select-button"]')
      
      // Wait for search input
      const searchInput = await page.waitForSelector('input#pickerSearchField', {
        state: 'visible',
        timeout: 10000
      })

      if (searchInput) {
        await searchInput.fill('free online calculator')
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Click the board by its data-test-id
        const boardRow = await page.waitForSelector('div[data-test-id="board-row-free online calculator"]', {
          state: 'visible',
          timeout: 10000
        })
        
        if (boardRow) {
          await boardRow.click()
          console.log('Board selected')
        } else {
          console.log('Could not find board')
        }
      }

      console.log('Publishing pin...')
      await page.click('div[data-test-id="storyboard-creation-nav-done"] button')
      await page.waitForSelector('[data-test-id="success-notification"]', {
        timeout: 30000
      })
    }

  } catch (error) {
    console.error('Error occurred:', error)
  } finally {
    console.log('Closing browser...')
    await browser.close()
  }
}

async function resizeImage(inputPath: string, outputPath: string) {
  await sharp(inputPath)
    .resize(300, 450, { // Using 2:3 ratio (200x300 might be too small)
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .toFile(outputPath)
}

async function checkAndResizeImage(imageName: string): Promise<string> {
  const imagesDir = path.join(process.cwd(), 'public', 'images')
  const inputPath = path.join(imagesDir, imageName)
  
  // Check if file exists
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Image not found: ${imageName}`)
  }

  // Return original image name without checking size
  return imageName
}

// Update uploadImage function to use the check
async function uploadImage(page: Page, content: PinContent) {
  console.log(`Uploading ${content.imageName}...`)
  
  try {
    const finalImageName = await checkAndResizeImage(content.imageName)
    const imagesDir = path.join(process.cwd(), 'public', 'images')
    const imagePath = path.join(imagesDir, finalImageName)

    const input = await page.waitForSelector('input[data-test-id="storyboard-upload-input"]')
    if (input) {
      await input.setInputFiles(imagePath)
      return true
    }
    return false
  } catch (error) {
    console.log('Error uploading screenshot:', error)
    throw error
  }
}

// Example usage with variables
async function main() {
  try {
    const content: PinContent = {
      imageName: 'simplify-fraction-formula.webp',
      title: 'How to Simplify Fractions | Step-by-Step Formula Guide',
      description: 'Learn how to simplify fractions with our easy-to-follow formula guide!\n\n' +
        'Formula shows:\n' +
        '- GCD (Greatest Common Divisor) method\n' +
        '- Step-by-step reduction process\n' +
        '- Clear visual examples\n' +
        '- Fraction to decimal conversion\n' +
        '- Mixed number conversion\n\n' +
        'Try our FREE calculator at CalculatorOf.com!\n\n' +
        '#FractionFormula #MathFormula #FractionSimplifier #MathEducation #MathHelp',
      tags: [
        'fraction formula',
        'math formula',
        'fraction simplifier',
        'math education',
        'math help',
        'fraction calculator',
        'math tutorial',
        'math guide',
        'fraction reduction',
        'math tools'
      ],
      websiteUrl: 'https://calculatorof.com/math/fraction-calculator#simplify'
    }

    await pinterestAutomation(content)
  } catch (error) {
    console.error('Script failed:', error)
  }
}

main().catch(console.error) 