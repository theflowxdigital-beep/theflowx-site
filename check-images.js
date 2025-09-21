const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Opening website...');
    await page.goto('http://localhost:3000');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check for broken images
    const images = await page.$$('img');
    console.log(`Found ${images.length} images on the page`);
    
    let brokenImages = [];
    
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt');
      
      // Check if image loaded successfully
      const naturalWidth = await img.evaluate(img => img.naturalWidth);
      const naturalHeight = await img.evaluate(img => img.naturalHeight);
      
      if (naturalWidth === 0 || naturalHeight === 0) {
        brokenImages.push({
          src: src,
          alt: alt,
          index: i
        });
      }
    }
    
    console.log('\n=== IMAGE ANALYSIS ===');
    console.log(`Total images: ${images.length}`);
    console.log(`Broken images: ${brokenImages.length}`);
    
    if (brokenImages.length > 0) {
      console.log('\n🚨 BROKEN IMAGES FOUND:');
      brokenImages.forEach((img, index) => {
        console.log(`${index + 1}. Source: ${img.src}`);
        console.log(`   Alt text: ${img.alt}`);
        console.log('');
      });
    } else {
      console.log('\n✅ All images loaded successfully!');
    }
    
    // Take a screenshot
    await page.screenshot({ path: 'homepage-screenshot.png', fullPage: true });
    console.log('📸 Screenshot saved as homepage-screenshot.png');
    
    // Keep browser open for manual inspection
    console.log('\n🔍 Browser opened for manual inspection. Close browser when done.');
    await page.waitForTimeout(30000); // Wait 30 seconds
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();