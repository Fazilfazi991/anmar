const fs = require('fs');

const path = 'c:\\Users\\Perfect Elect\\Desktop\\Website Projects\\Anmar logistics\\index.html';
let content = fs.readFileSync(path, 'utf-8');

// Replace "AI meta text"
content = content.replace(
  'Leading regional operators sell confidence through coverage, visibility, compliance, and speed. This page now does the same for Anmar.',
  'We provide integrated services including 3PL, cold chain, e-commerce fulfillment, and reliable inventory reporting.'
);
content = content.replace(
  'A clearer buyer journey makes the service feel more reliable before the first call.',
  'Our streamlined process ensures your inventory is received and managed efficiently.'
);
content = content.replace(
  'These answers make the page more useful for operations, procurement, and supply-chain teams.',
  'Find quick answers to common questions about our storage and handling services.'
);

// Replace messy service gradients with solid colors
content = content.replace(
  /\.service-visual\.medical\s*{[\s\S]*?}/,
  '.service-visual.medical { background: #e1edf0; }'
);
content = content.replace(
  /\.service-visual\.food\s*{[\s\S]*?}/,
  '.service-visual.food { background: #f3ede2; }'
);
content = content.replace(
  /\.service-visual\.cosmetics\s*{[\s\S]*?}/,
  '.service-visual.cosmetics { background: #f8efe6; }'
);

// Replace messy hero background in the editorial section (around line 984)
content = content.replace(
  /\.hero\s*{\s*background:\s*radial-gradient[\s\S]*?}/,
  '.hero { background: #04162c; }'
);

// Clean up another hero background
content = content.replace(
  /\.hero\s*{\s*padding:\s*70px\s*0\s*52px;\s*background:[\s\S]*?overflow:\s*hidden;\s*}/,
  '.hero {\n      padding: 70px 0 52px;\n      background: var(--surface);\n      overflow: hidden;\n    }'
);

// Map panel background clean up
content = content.replace(
  /\.map-panel\s*{\s*background:[\s\S]*?box-shadow:/,
  '.map-panel {\n      background: #dfe8f1;\n      box-shadow:'
);
content = content.replace(
  /background:\s*linear-gradient\(150deg,\s*rgba\(8,38,74,0.1\),\s*rgba\(216,180,106,0.14\)\),[\s\S]*?var\(--surface-mid\);/g,
  'background: var(--surface-mid);'
);

// Process card backgrounds
content = content.replace(
  /background:\s*linear-gradient\(180deg,\s*rgba\(8,38,74,0.06\),\s*rgba\(255,255,255,0\)\),\s*#ffffff;/g,
  'background: #ffffff;'
);

// Proof item backgrounds
content = content.replace(
  /background:\s*linear-gradient\(135deg,\s*rgba\(216,180,106,0.13\),\s*rgba\(255,255,255,0\)\),\s*#0b2a50;/g,
  'background: #0b2a50;'
);

// CTA backgrounds
content = content.replace(
  /background:\s*radial-gradient\(circle\sat\s82%\s20%,\s*rgba\(216,180,106,0.18\),\s*transparent\s28%\),\s*linear-gradient\(135deg,\s*#04162c,\s*#0b2a50\);/g,
  'background: #0b2a50;'
);

fs.writeFileSync(path, content);
console.log('Modifications applied successfully.');
