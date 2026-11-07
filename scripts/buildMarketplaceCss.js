const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../src/styles/marketplace-input.css');
const outputPath = path.join(__dirname, '../public/css/marketplace-tailwind.css');

const inputCss = fs.readFileSync(inputPath, 'utf8');

postcss([tailwind])
  .process(inputCss, { from: inputPath, to: outputPath })
  .then(result => {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, result.css, 'utf8');
    console.log(`Successfully compiled Tailwind CSS for production! Output size: ${result.css.length} bytes at public/css/marketplace-tailwind.css`);
  })
  .catch(err => {
    console.error('PostCSS Tailwind compilation error:', err);
    process.exit(1);
  });
