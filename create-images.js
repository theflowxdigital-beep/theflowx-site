const fs = require('fs');

// Create SVG images instead which can be easily generated
function createSVGImage(width, height, title, subtitle, bgColor, textColor, filename) {
    const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${darkenColor(bgColor)};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#grad)"/>
  
  <!-- Border -->
  <rect x="20" y="20" width="${width-40}" height="${height-40}" 
        fill="none" stroke="${textColor}" stroke-width="2" opacity="0.3"/>
        
  <!-- Icon/Symbol -->
  <circle cx="${width/2}" cy="${height/2 - 60}" r="30" 
          fill="none" stroke="${textColor}" stroke-width="3" opacity="0.4"/>
  <circle cx="${width/2}" cy="${height/2 - 60}" r="15" 
          fill="${textColor}" opacity="0.2"/>
          
  <!-- Title -->
  <text x="${width/2}" y="${height/2 + 10}" 
        font-family="Arial, sans-serif" font-size="32" font-weight="bold" 
        fill="${textColor}" text-anchor="middle">${title}</text>
        
  <!-- Subtitle -->
  <text x="${width/2}" y="${height/2 + 50}" 
        font-family="Arial, sans-serif" font-size="18" 
        fill="${textColor}" text-anchor="middle" opacity="0.8">${subtitle}</text>
        
  <!-- FlowX branding -->
  <text x="${width - 20}" y="${height - 20}" 
        font-family="Arial, sans-serif" font-size="12" 
        fill="${textColor}" text-anchor="end" opacity="0.6">FlowX</text>
</svg>`;

    fs.writeFileSync(filename, svg);
    console.log(`Created: ${filename}`);
}

function darkenColor(color) {
    // Simple color darkening for gradient effect
    return color.replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/, (match, r, g, b) => {
        return `rgb(${Math.max(0, parseInt(r) - 30)}, ${Math.max(0, parseInt(g) - 30)}, ${Math.max(0, parseInt(b) - 30)})`;
    });
}

// Portfolio items with FlowX-relevant content
const portfolioItems = [
    {
        filename: '/Users/sunithkumar/Documents/theFlowX-site/assets/img/portfolio/portfolio-top-img-1.svg',
        size: [556, 551],
        title: 'SEO Strategy',
        subtitle: 'Organic Growth Campaign',
        bgColor: 'rgb(45, 55, 72)',
        textColor: '#ffffff'
    },
    {
        filename: '/Users/sunithkumar/Documents/theFlowX-site/assets/img/portfolio/portfolio-top-img-2.svg',
        size: [631, 581],
        title: 'Pitch Deck',
        subtitle: 'Series A Presentation',
        bgColor: 'rgb(26, 54, 93)',
        textColor: '#ffffff'
    },
    {
        filename: '/Users/sunithkumar/Documents/theFlowX-site/assets/img/portfolio/portfolio-top-img-3.svg',
        size: [521, 651],
        title: 'Website CRO',
        subtitle: 'Conversion Optimization',
        bgColor: 'rgb(49, 46, 129)',
        textColor: '#ffffff'
    },
    {
        filename: '/Users/sunithkumar/Documents/theFlowX-site/assets/img/portfolio/portfolio-top-img-4.svg',
        size: [706, 631],
        title: 'Ad Campaigns',
        subtitle: 'Performance Marketing',
        bgColor: 'rgb(17, 24, 39)',
        textColor: '#ffffff'
    },
    {
        filename: '/Users/sunithkumar/Documents/theFlowX-site/assets/img/portfolio/portfolio-top-img-5.svg',
        size: [1321, 551],
        title: 'Financial Model',
        subtitle: '3-Statement Model & Projections',
        bgColor: 'rgb(31, 41, 55)',
        textColor: '#ffffff'
    },
    {
        filename: '/Users/sunithkumar/Documents/theFlowX-site/assets/img/portfolio/portfolio-top-img-6.svg',
        size: [591, 471],
        title: 'Market Research',
        subtitle: 'Go-to-Market Strategy',
        bgColor: 'rgb(55, 65, 81)',
        textColor: '#ffffff'
    },
    {
        filename: '/Users/sunithkumar/Documents/theFlowX-site/assets/img/portfolio/portfolio-top-img-7.svg',
        size: [601, 631],
        title: 'Brand Strategy',
        subtitle: 'Digital Transformation',
        bgColor: 'rgb(75, 85, 99)',
        textColor: '#ffffff'
    }
];

// Create all images
portfolioItems.forEach(item => {
    createSVGImage(
        item.size[0],
        item.size[1],
        item.title,
        item.subtitle,
        item.bgColor,
        item.textColor,
        item.filename
    );
});

console.log('\n✅ All portfolio SVG images created!');
console.log('Now updating HTML to use SVG versions...');