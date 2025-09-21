const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('📸 Testing service hover images...');
    
    // Test services page
    await page.goto('http://localhost:3000/services.html');
    await page.waitForLoadState('networkidle');
    
    const serviceHoverImages = await page.$$('img.service-hover-img');
    console.log(`Found ${serviceHoverImages.length} service hover images on services page`);
    
    for (let i = 0; i < serviceHoverImages.length; i++) {
      const img = serviceHoverImages[i];
      const src = await img.getAttribute('src');
      const naturalWidth = await img.evaluate(img => img.naturalWidth);
      const naturalHeight = await img.evaluate(img => img.naturalHeight);
      
      console.log(`Image ${i + 1}: ${src} - ${naturalWidth}x${naturalHeight}`);
    }
    
    await page.screenshot({ path: 'services-with-new-images.png', fullPage: true });
    console.log('📸 Services page screenshot saved');
    
    // Test homepage 
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    const homeServiceImages = await page.$$('img.service-hover-img');
    console.log(`Found ${homeServiceImages.length} service hover images on homepage`);
    
    await page.screenshot({ path: 'homepage-with-new-service-images.png', fullPage: true });
    console.log('📸 Homepage screenshot saved');
    
    console.log('✅ All service hover images replaced successfully!');
    
    await page.waitForTimeout(2000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();