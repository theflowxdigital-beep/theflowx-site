const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('📸 Testing updated images...');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of updated homepage
    await page.screenshot({ path: 'updated-homepage.png', fullPage: true });
    console.log('✅ Updated homepage screenshot saved');
    
    // Navigate to portfolio page to check portfolio images
    await page.goto('http://localhost:3000/portfolio.html');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'updated-portfolio.png', fullPage: true });
    console.log('✅ Updated portfolio screenshot saved');
    
    // Check for any remaining broken images
    const images = await page.$$('img');
    let brokenImages = [];
    
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const src = await img.getAttribute('src');
      const naturalWidth = await img.evaluate(img => img.naturalWidth);
      const naturalHeight = await img.evaluate(img => img.naturalHeight);
      
      if (naturalWidth === 0 || naturalHeight === 0) {
        brokenImages.push(src);
      }
    }
    
    console.log('\n=== IMAGE STATUS ===');
    console.log(`Total images on portfolio page: ${images.length}`);
    console.log(`Broken images: ${brokenImages.length}`);
    
    if (brokenImages.length > 0) {
      console.log('\n🚨 Still broken images:');
      brokenImages.forEach(src => console.log(`- ${src}`));
    } else {
      console.log('\n🎉 All images loading successfully!');
    }
    
    await page.waitForTimeout(3000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();