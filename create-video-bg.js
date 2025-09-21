const fs = require('fs');

function createVideoBackgroundSVG() {
  const svg = `<svg width="1920" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="videoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(15, 23, 42);stop-opacity:1" />
      <stop offset="50%" style="stop-color:rgb(30, 41, 59);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(8, 18, 35);stop-opacity:1" />
    </linearGradient>
    <radialGradient id="spotlight" cx="50%" cy="30%" r="60%">
      <stop offset="0%" style="stop-color:rgba(59, 130, 246, 0.1);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgba(59, 130, 246, 0);stop-opacity:0" />
    </radialGradient>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#videoBgGrad)"/>
  
  <!-- Spotlight effect -->
  <rect width="100%" height="100%" fill="url(#spotlight)"/>
  
  <!-- Geometric shapes for visual interest -->
  <circle cx="200" cy="150" r="80" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
  <circle cx="200" cy="150" r="40" fill="rgba(255,255,255,0.05)"/>
  
  <rect x="1600" y="600" width="200" height="120" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2" rx="10"/>
  
  <!-- Play button icon in center -->
  <circle cx="960" cy="400" r="60" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  <polygon points="930,370 990,400 930,430" fill="rgba(255,255,255,0.8)"/>
  
  <!-- Subtle grid pattern -->
  <defs>
    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  
  <!-- FlowX branding -->
  <text x="1900" y="780" 
        font-family="Arial, sans-serif" font-size="14" 
        fill="rgba(255,255,255,0.6)" text-anchor="end">FlowX Digital Agency</text>
</svg>`;

  fs.writeFileSync('assets/img/bg/video-section-bg.svg', svg);
  console.log('✅ Video background SVG created');
}

createVideoBackgroundSVG();