const fs = require('fs');

function createServiceHoverSVG(width, height, title, icon, bgColor1, bgColor2, filename) {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="serviceGrad${filename}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgColor1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${bgColor2};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow${filename}">
      <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="rgba(0,0,0,0.1)"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#serviceGrad${filename})" rx="12" filter="url(#shadow${filename})"/>
  
  <!-- Icon area -->
  <circle cx="${width/2}" cy="${height/2 - 20}" r="40" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  <circle cx="${width/2}" cy="${height/2 - 20}" r="25" fill="rgba(255,255,255,0.1)"/>
  
  <!-- Icon symbol -->
  ${icon}
  
  <!-- Title -->
  <text x="${width/2}" y="${height/2 + 40}" 
        font-family="Arial, sans-serif" font-size="18" font-weight="bold" 
        fill="rgba(255,255,255,0.9)" text-anchor="middle">${title}</text>
        
  <!-- Decorative elements -->
  <rect x="20" y="20" width="60" height="4" fill="rgba(255,255,255,0.2)" rx="2"/>
  <rect x="20" y="30" width="80" height="4" fill="rgba(255,255,255,0.15)" rx="2"/>
  
  <!-- FlowX branding -->
  <text x="${width - 15}" y="${height - 15}" 
        font-family="Arial, sans-serif" font-size="10" 
        fill="rgba(255,255,255,0.6)" text-anchor="end">FlowX</text>
</svg>`;

  fs.writeFileSync(`assets/img/services/${filename}`, svg);
  console.log(`✅ Service hover image ${filename} created`);
}

// SEO & Content icon
const seoIcon = `
  <rect x="220" y="105" width="20" height="30" fill="rgba(255,255,255,0.8)" rx="2"/>
  <rect x="225" y="110" width="10" height="5" fill="rgba(255,255,255,0.6)" rx="1"/>
  <rect x="225" y="118" width="8" height="3" fill="rgba(255,255,255,0.6)" rx="1"/>
  <rect x="225" y="124" width="12" height="3" fill="rgba(255,255,255,0.6)" rx="1"/>
`;

// Performance Marketing icon 
const adIcon = `
  <rect x="215" y="110" width="30" height="20" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2" rx="3"/>
  <circle cx="225" cy="120" r="3" fill="rgba(255,255,255,0.8)"/>
  <circle cx="235" cy="120" r="3" fill="rgba(255,255,255,0.8)"/>
  <polyline points="248,115 253,120 248,125" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/>
`;

// Website & CRO icon
const webIcon = `
  <rect x="210" y="105" width="40" height="30" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2" rx="4"/>
  <rect x="215" y="110" width="30" height="20" fill="rgba(255,255,255,0.1)" rx="2"/>
  <rect x="217" y="112" width="8" height="2" fill="rgba(255,255,255,0.6)" rx="1"/>
  <rect x="217" y="116" width="12" height="2" fill="rgba(255,255,255,0.6)" rx="1"/>
  <rect x="217" y="120" width="10" height="2" fill="rgba(255,255,255,0.6)" rx="1"/>
`;

// Pitch Decks icon
const pitchIcon = `
  <rect x="215" y="105" width="30" height="25" fill="rgba(255,255,255,0.8)" rx="2"/>
  <rect x="220" y="110" width="8" height="4" fill="rgba(255,255,255,0.3)" rx="1"/>
  <rect x="230" y="110" width="10" height="4" fill="rgba(255,255,255,0.3)" rx="1"/>
  <rect x="220" y="117" width="15" height="3" fill="rgba(255,255,255,0.3)" rx="1"/>
  <rect x="220" y="122" width="12" height="3" fill="rgba(255,255,255,0.3)" rx="1"/>
`;

// Financial Models icon
const financeIcon = `
  <rect x="210" y="105" width="40" height="30" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2" rx="3"/>
  <polyline points="215,125 220,115 225,120 230,110 235,115 240,105 245,110" 
            fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/>
  <circle cx="220" cy="115" r="2" fill="rgba(255,255,255,0.8)"/>
  <circle cx="230" cy="110" r="2" fill="rgba(255,255,255,0.8)"/>
  <circle cx="240" cy="105" r="2" fill="rgba(255,255,255,0.8)"/>
`;

// Create all 5 service hover images
createServiceHoverSVG(460, 300, 'SEO & Content', seoIcon, 'rgb(59, 130, 246)', 'rgb(29, 78, 216)', 'services-hover-1.svg');
createServiceHoverSVG(460, 300, 'Performance Marketing', adIcon, 'rgb(16, 185, 129)', 'rgb(5, 150, 105)', 'services-hover-2.svg');
createServiceHoverSVG(460, 300, 'Websites & CRO', webIcon, 'rgb(139, 92, 246)', 'rgb(109, 40, 217)', 'services-hover-3.svg');
createServiceHoverSVG(460, 300, 'Pitch Decks', pitchIcon, 'rgb(245, 101, 101)', 'rgb(220, 38, 38)', 'services-hover-4.svg');
createServiceHoverSVG(460, 300, 'Financial Models', financeIcon, 'rgb(251, 146, 60)', 'rgb(217, 119, 6)', 'services-hover-5.svg');

console.log('🎨 All service hover images created successfully!');