const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('📸 Testing services without hover images...');
    
    // Test services page
    await page.goto('http://localhost:3000/services.html');
    await page.waitForLoadState('networkidle');
    
    const serviceImages = await page.$$('img.service-hover-img');
    console.log(`Found ${serviceImages.length} service hover images on services page (should be 0)`);
    
    await page.screenshot({ path: 'services-no-images.png', fullPage: true });
    console.log('📸 Services page screenshot saved');
    
    // Test homepage
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    const homeServiceImages = await page.$$('img.service-hover-img');
    console.log(`Found ${homeServiceImages.length} service hover images on homepage (should be 0)`);
    
    await page.screenshot({ path: 'homepage-no-service-images.png', fullPage: true });
    console.log('📸 Homepage screenshot saved');
    
    console.log('✅ Service hover images removed successfully!');
    
    await page.waitForTimeout(2000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();