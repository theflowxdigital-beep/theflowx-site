const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('📸 Testing about page with video section removed...');
    
    await page.goto('http://localhost:3000/about.html');
    await page.waitForLoadState('networkidle');
    
    // Check for any video elements
    const iframes = await page.$$('iframe');
    const videos = await page.$$('video');
    const videoBlocks = await page.$$('.ak-video-block, .ak-video-embed-container');
    
    console.log(`Found ${iframes.length} iframes (should be 0)`);
    console.log(`Found ${videos.length} video elements (should be 0)`);
    console.log(`Found ${videoBlocks.length} video containers (should be 0)`);
    
    if (iframes.length === 0 && videos.length === 0 && videoBlocks.length === 0) {
      console.log('✅ All video content successfully removed from about page!');
    } else {
      console.log('⚠️ Some video elements may still be present');
    }
    
    await page.screenshot({ path: 'about-page-no-video.png', fullPage: true });
    console.log('📸 About page screenshot saved');
    
    await page.waitForTimeout(2000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();