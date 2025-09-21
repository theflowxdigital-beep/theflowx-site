const fs = require('fs');

function createBlogSVG(width, height, title, subtitle, bgColor1, bgColor2, filename) {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="blogGrad${filename}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgColor1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${bgColor2};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#blogGrad${filename})"/>
  
  <!-- Border -->
  <rect x="10" y="10" width="${width-20}" height="${height-20}" 
        fill="none" stroke="#ffffff" stroke-width="2" opacity="0.3" rx="8"/>
        
  <!-- Icon/Symbol -->
  <rect x="${width/2 - 25}" y="${height/2 - 40}" width="50" height="30" 
        fill="none" stroke="#ffffff" stroke-width="2" opacity="0.4" rx="4"/>
  <circle cx="${width/2}" cy="${height/2 - 25}" r="8" 
          fill="#ffffff" opacity="0.3"/>
          
  <!-- Title -->
  <text x="${width/2}" y="${height/2 + 15}" 
        font-family="Arial, sans-serif" font-size="16" font-weight="bold" 
        fill="#ffffff" text-anchor="middle">${title}</text>
        
  <!-- Subtitle -->
  <text x="${width/2}" y="${height/2 + 35}" 
        font-family="Arial, sans-serif" font-size="11" 
        fill="#ffffff" text-anchor="middle" opacity="0.8">${subtitle}</text>
        
  <!-- FlowX branding -->
  <text x="${width - 10}" y="${height - 10}" 
        font-family="Arial, sans-serif" font-size="8" 
        fill="#ffffff" text-anchor="end" opacity="0.6">FlowX</text>
</svg>`;

  fs.writeFileSync(`assets/img/blogs/${filename}`, svg);
  console.log(`✅ Blog image ${filename} created`);
}

// Create 4 blog images
createBlogSVG(280, 280, 'Digital Agency', 'Partnership Success', 'rgb(59, 130, 246)', 'rgb(29, 78, 216)', 'blog-1.svg');
createBlogSVG(280, 280, 'Innovation', 'Building the Future', 'rgb(16, 185, 129)', 'rgb(5, 150, 105)', 'blog-2.svg');
createBlogSVG(280, 280, 'Digital Mastery', 'Ideas to Reality', 'rgb(139, 92, 246)', 'rgb(109, 40, 217)', 'blog-3.svg');
createBlogSVG(280, 280, 'Growth Strategy', 'Marketing Excellence', 'rgb(245, 101, 101)', 'rgb(220, 38, 38)', 'blog-4.svg');

console.log('🎨 All blog images created successfully!');