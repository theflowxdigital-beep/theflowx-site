const fs = require('fs');

function createHeroVideoReplacement() {
  const svg = `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="heroVideoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgba(59, 130, 246, 0.9);stop-opacity:1" />
      <stop offset="50%" style="stop-color:rgba(139, 92, 246, 0.8);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgba(99, 102, 241, 0.9);stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#heroVideoGrad)" rx="20"/>
  
  <!-- Modern geometric elements representing digital agency work -->
  <g opacity="0.7">
    <!-- Dashboard/Analytics representation -->
    <rect x="50" y="80" width="200" height="120" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" rx="8"/>
    <rect x="60" y="90" width="60" height="40" fill="rgba(255,255,255,0.2)" rx="4"/>
    <rect x="130" y="90" width="80" height="40" fill="rgba(255,255,255,0.15)" rx="4"/>
    <rect x="60" y="140" width="100" height="20" fill="rgba(255,255,255,0.1)" rx="2"/>
    <rect x="60" y="170" width="150" height="20" fill="rgba(255,255,255,0.1)" rx="2"/>
    
    <!-- Growth chart representation -->
    <polyline points="300,180 320,160 340,140 360,120 380,100 400,80" 
              fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="3" stroke-linecap="round"/>
    <circle cx="300" cy="180" r="4" fill="rgba(255,255,255,0.8)"/>
    <circle cx="340" cy="140" r="4" fill="rgba(255,255,255,0.8)"/>
    <circle cx="400" cy="80" r="4" fill="rgba(255,255,255,0.8)"/>
    
    <!-- Digital elements -->
    <circle cx="500" cy="150" r="40" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    <circle cx="500" cy="150" r="20" fill="rgba(255,255,255,0.1)"/>
    
    <!-- Code/Development representation -->
    <rect x="80" y="250" width="180" height="100" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" rx="8"/>
    <rect x="90" y="260" width="40" height="8" fill="rgba(255,255,255,0.3)" rx="2"/>
    <rect x="90" y="275" width="60" height="8" fill="rgba(255,255,255,0.2)" rx="2"/>
    <rect x="90" y="290" width="30" height="8" fill="rgba(255,255,255,0.3)" rx="2"/>
    <rect x="90" y="305" width="80" height="8" fill="rgba(255,255,255,0.2)" rx="2"/>
    <rect x="90" y="320" width="50" height="8" fill="rgba(255,255,255,0.3)" rx="2"/>
  </g>
  
  <!-- Central focus element -->
  <circle cx="300" cy="200" r="60" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" stroke-width="3"/>
  <circle cx="300" cy="200" r="30" fill="rgba(255,255,255,0.15)"/>
  
  <!-- FlowX logo/text -->
  <text x="300" y="205" 
        font-family="Arial, sans-serif" font-size="16" font-weight="bold" 
        fill="rgba(255,255,255,0.9)" text-anchor="middle" filter="url(#glow)">FlowX</text>
  <text x="300" y="220" 
        font-family="Arial, sans-serif" font-size="10" 
        fill="rgba(255,255,255,0.7)" text-anchor="middle">Digital Agency</text>
        
  <!-- Subtle animation indicators -->
  <circle cx="500" cy="100" r="3" fill="rgba(255,255,255,0.6)">
    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="480" cy="120" r="2" fill="rgba(255,255,255,0.4)">
    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
  </circle>
  <circle cx="520" cy="90" r="2" fill="rgba(255,255,255,0.5)">
    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite"/>
  </circle>
</svg>`;

  fs.writeFileSync('assets/img/hero/hero-video-replacement.svg', svg);
  console.log('✅ Hero video replacement SVG created');
}

createHeroVideoReplacement();