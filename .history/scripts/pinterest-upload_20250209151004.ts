import axios from 'axios'
import fs from 'fs'
import path from 'path'

const PINTEREST_ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'
const BOARD_ID = 'YOUR_BOARD_ID' // format: username/board-name

async function uploadToPinterest() {
  try {
    const imagesDir = path.join(process.cwd(), 'public/images')
    const images = fs.readdirSync(imagesDir).filter(file => 
      file.endsWith('.webp') && !file.includes('temp-')
    )

    for (const image of images) {
      const imageData = fs.readFileSync(path.join(imagesDir, image))
      const base64Image = imageData.toString('base64')

      // First, upload the image to Pinterest
      const mediaResponse = await axios.post(
        'https://api.pinterest.com/v5/media',
        {
          media_type: 'image',
          image_base64: base64Image
        },
        {
          headers: {
            'Authorization': `Bearer ${PINTEREST_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const mediaId = mediaResponse.data.id

      // Then create a pin with the uploaded image
      await axios.post(
        'https://api.pinterest.com/v5/pins',
        {
          board_id: BOARD_ID,
          media_source: {
            source_type: 'image_id',
            url: mediaId
          },
          title: `Calculator Website - ${image.replace('.webp', '')}`,
          description: getDescriptionForImage(image),
          alt_text: getAltTextForImage(image)
        },
        {
          headers: {
            'Authorization': `Bearer ${PINTEREST_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      )

      console.log(`Successfully pinned ${image}!`)
    }

  } catch (error) {
    console.error('Error uploading to Pinterest:', error)
  }
}

function getDescriptionForImage(imageName: string): string {
  // You can customize descriptions based on image names
  const descriptions: Record<string, string> = {
    'fraction-calculator.webp': 'Free online fraction calculator with step-by-step solutions. Perfect for students and teachers! #math #education #calculator',
    'mixednumbers-formula.webp': 'Learn how to convert mixed numbers and improper fractions with our easy-to-use calculator! #fractions #math #education',
    'simplify-fraction.webp': 'Simplify fractions instantly with our online calculator. Shows work and explanations! #math #fractions #education',
    // Add more descriptions for other images
  }
  return descriptions[imageName] || 'Online calculator tool for math and conversions'
}

function getAltTextForImage(imageName: string): string {
  // You can customize alt text based on image names
  const altTexts: Record<string, string> = {
    'fraction-calculator.webp': 'Online fraction calculator showing step-by-step solutions',
    'mixednumbers-formula.webp': 'Mixed numbers and improper fractions conversion formulas',
    'simplify-fraction.webp': 'Fraction simplification calculator with example calculations',
    // Add more alt texts for other images
  }
  return altTexts[imageName] || 'Calculator tool screenshot'
}

uploadToPinterest() 