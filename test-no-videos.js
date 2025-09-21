const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('📸 Testing final video replacement...');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Check if any video elements still exist
    const videos = await page.$$('video');
    console.log(`Found ${videos.length} video elements on homepage`);
    
    // Check if any video URLs are still being requested
    const requests = [];
    page.on('request', request => {
      if (request.url().includes('.mp4')) {
        requests.push(request.url());
      }
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    console.log(`Video requests found: ${requests.length}`);
    if (requests.length > 0) {
      console.log('🚨 Still loading video files:');
      requests.forEach(url => console.log(`- ${url}`));
    } else {
      console.log('✅ No video files being requested!');
    }
    
    await page.screenshot({ path: 'final-no-videos.png', fullPage: true });
    console.log('📸 Final screenshot saved');
    
    await page.waitForTimeout(2000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();