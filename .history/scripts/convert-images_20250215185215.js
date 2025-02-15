const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../public/images/decimal-formula.svg');
const outputPath = path.join(__dirname, '../public/images/decimal-formula.webp');

sharp(inputPath)
  .webp()
  .toFile(outputPath)
  .then(info => console.log('Conversion complete:', info))
  .catch(err => console.error('Error converting file:', err)); 