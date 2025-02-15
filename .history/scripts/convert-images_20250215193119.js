const sharp = require('sharp');
const path = require('path');

// Array of images to convert
const images = [
  {
    input: 'fractiondecimal-formula.svg',
    output: 'fractiondecimal-formula.webp'
  },
  {
    input: 'fractiondecimalcalculator.svg',
    output: 'fractiondecimalcalculator.webp'
  },
  {
    input: 'bignumber-formula.svg',
    output: 'bignumber-formula.webp'
  }
];

async function convertImages() {
  for (const image of images) {
    const inputPath = path.join(__dirname, '../public/images', image.input);
    const outputPath = path.join(__dirname, '../public/images', image.output);

    try {
      await sharp(inputPath)
        .webp()
        .toFile(outputPath);
      console.log(`Converted ${image.input} to ${image.output}`);
    } catch (err) {
      console.error(`Error converting ${image.input}:`, err);
    }
  }
}

convertImages().catch(console.error); 