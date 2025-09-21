const fs = require('fs');

function createTeamAvatar(width, height, initials, name, bgColor, textColor, filename) {
    const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="teamGrad${initials}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${darkenColor(bgColor)};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#teamGrad${initials})"/>
  
  <!-- Avatar circle -->
  <circle cx="${width/2}" cy="${height/2 - 20}" r="${Math.min(width, height) * 0.25}" 
          fill="none" stroke="${textColor}" stroke-width="3" opacity="0.6"/>
  
  <!-- Initials -->
  <text x="${width/2}" y="${height/2 - 10}" 
        font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.2}" font-weight="bold" 
        fill="${textColor}" text-anchor="middle">${initials}</text>
        
  <!-- Professional indicator -->
  <circle cx="${width/2}" cy="${height/2 + 40}" r="3" 
          fill="${textColor}" opacity="0.4"/>
  <circle cx="${width/2 - 10}" cy="${height/2 + 40}" r="2" 
          fill="${textColor}" opacity="0.3"/>
  <circle cx="${width/2 + 10}" cy="${height/2 + 40}" r="2" 
          fill="${textColor}" opacity="0.3"/>
          
  <!-- FlowX team branding -->
  <text x="${width/2}" y="${height - 15}" 
        font-family="Arial, sans-serif" font-size="10" 
        fill="${textColor}" text-anchor="middle" opacity="0.5">FlowX Team</text>
</svg>`;

    fs.writeFileSync(filename, svg);
    console.log(`Created team avatar: ${filename}`);
}

function darkenColor(color) {
    return color.replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/, (match, r, g, b) => {
        return `rgb(${Math.max(0, parseInt(r) - 30)}, ${Math.max(0, parseInt(g) - 30)}, ${Math.max(0, parseInt(b) - 30)})`;
    });
}

// Team members based on the names we used in testimonials and team section
const teamMembers = [
    {
        filename: '/Users/sunithkumar/Documents/theFlowX-site/assets/img/team/team-1.svg',
        name: 'Alex Johnson',
        initials: 'AJ',
        bgColor: 'rgb(59, 130, 246)', // Blue
        textColor: '#ffffff'
    },
    {
        filename: '/Users/sunithkumar/Documents/theFlowX-site/assets/img/team/team-2.svg',
        name: 'Taylor Smith',
        initials: 'TS',
        bgColor: 'rgb(16, 185, 129)', // Green
        textColor: '#ffffff'
    },
    {
        filename: '/Users/sunithkumar/Documents/theFlowX-site/assets/img/team/team-3.svg',
        name: 'Jamie Lee',
        initials: 'JL',
        bgColor: 'rgb(139, 92, 246)', // Purple
        textColor: '#ffffff'
    },
    {
        filename: '/Users/sunithkumar/Documents/theFlowX-site/assets/img/team/team-4.svg',
        name: 'Morgan Brown',
        initials: 'MB',
        bgColor: 'rgb(245, 101, 101)', // Red
        textColor: '#ffffff'
    }
];

// Standard team image size (most seem to be around 380x486 based on the placeholder)
const teamSize = [380, 486];

// Create team avatars
teamMembers.forEach(member => {
    createTeamAvatar(
        teamSize[0],
        teamSize[1],
        member.initials,
        member.name,
        member.bgColor,
        member.textColor,
        member.filename
    );
});

console.log('\n✅ All team avatars created!');
console.log('These replace the grey placeholder team images with professional avatars.');