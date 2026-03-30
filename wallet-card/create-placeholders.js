#!/usr/bin/env node
/**
 * Creates placeholder PNG images for the Apple Wallet pass.
 * Replace files in pass-template/ with your real logo when ready.
 *
 * Image sizes follow Apple Wallet specifications:
 *   icon.png      — 29×29   (notification icon)
 *   icon@2x.png   — 58×58
 *   icon@3x.png   — 87×87
 *   logo.png      — 160×50  (top-left wordmark)
 *   logo@2x.png   — 320×100
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const TEMPLATE_DIR = path.join(__dirname, 'pass-template');
const TEAL = '#2A7A70';
const WHITE = '#FFFFFF';

// Logo images: transparent background so white text shows on the teal pass background.
async function createLogoImage({ name, width, height, text, fontSize }) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text
        x="${width / 2}"
        y="${height / 2 + fontSize * 0.37}"
        text-anchor="middle"
        fill="${WHITE}"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-weight="300"
        font-size="${fontSize}"
        letter-spacing="${Math.round(fontSize * 0.08)}"
      >${text}</text>
    </svg>
  `;
  const outputPath = path.join(TEMPLATE_DIR, name);
  await sharp(Buffer.from(svg)).png().toFile(outputPath);
  console.log(`  created  ${name.padEnd(18)} ${width}×${height}  (transparent bg)`);
}

// Icon images: teal background so the "L" mark is visible in notifications/Lock Screen.
async function createIconImage({ name, width, height, text, fontSize }) {
  const radius = Math.round(Math.min(width, height) * 0.15);
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${TEAL}" rx="${radius}"/>
      <text
        x="${width / 2}"
        y="${height / 2 + fontSize * 0.37}"
        text-anchor="middle"
        fill="${WHITE}"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-weight="600"
        font-size="${fontSize}"
      >${text}</text>
    </svg>
  `;
  const outputPath = path.join(TEMPLATE_DIR, name);
  await sharp(Buffer.from(svg)).png().toFile(outputPath);
  console.log(`  created  ${name.padEnd(18)} ${width}×${height}  (teal bg)`);
}

async function main() {
  if (!fs.existsSync(TEMPLATE_DIR)) {
    fs.mkdirSync(TEMPLATE_DIR, { recursive: true });
  }

  console.log('\nGenerating placeholder images...\n');

  const icons = [
    { name: 'icon.png',    width: 29,  height: 29,  text: 'L', fontSize: 16 },
    { name: 'icon@2x.png', width: 58,  height: 58,  text: 'L', fontSize: 32 },
    { name: 'icon@3x.png', width: 87,  height: 87,  text: 'L', fontSize: 48 },
  ];
  const logos = [
    { name: 'logo.png',    width: 160, height: 50,  text: 'lumen. COLLECTIVE', fontSize: 13 },
    { name: 'logo@2x.png', width: 320, height: 100, text: 'lumen. COLLECTIVE', fontSize: 26 },
  ];

  for (const img of icons) await createIconImage(img);
  for (const img of logos) await createLogoImage(img);

  console.log('\nDone. Swap these files for your real logo when ready:');
  console.log('  logo.png / logo@2x.png  — wordmark shown on the pass face');
  console.log('  icon.png / icon@2x/3x   — shown in notifications & Lock Screen\n');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
