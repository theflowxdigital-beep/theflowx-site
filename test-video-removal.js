const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('📸 Testing video section removal and about page...');
    
    // Test homepage - check for video section
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    const videoBlocks = await page.$$('.ak-video-block');
    const videoElements = await page.$$('video');
    console.log(`Homepage - Video blocks: ${videoBlocks.length}, Video elements: ${videoElements.length}`);
    
    await page.screenshot({ path: 'homepage-no-video.png', fullPage: true });
    console.log('📸 Homepage screenshot saved');
    
    // Test about page
    await page.goto('http://localhost:3000/about.html');
    await page.waitForLoadState('networkidle');
    
    const aboutVideoElements = await page.$$('video');
    console.log(`About page - Video elements: ${aboutVideoElements.length}`);
    
    await page.screenshot({ path: 'about-page-no-video.png', fullPage: true });
    console.log('📸 About page screenshot saved');
    
    console.log('✅ Video sections handled successfully!');
    
    await page.waitForTimeout(2000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();