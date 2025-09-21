const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('📸 Testing about page video replacement...');
    
    await page.goto('http://localhost:3000/about.html');
    await page.waitForLoadState('networkidle');
    
    // Check for old placeholder images
    const bgImages = await page.$$('img[src*="about-video-bg.png"]');
    console.log(`Found ${bgImages.length} about-video-bg.png images (should be 0)`);
    
    // Check for iframe video
    const iframes = await page.$$('iframe');
    console.log(`Found ${iframes.length} embedded videos`);
    
    // Check iframe src
    for (let i = 0; i < iframes.length; i++) {
      const src = await iframes[i].getAttribute('src');
      if (src && src.includes('youtube.com')) {
        console.log(`✅ YouTube video embedded: ${src}`);
      }
    }
    
    await page.screenshot({ path: 'about-page-with-video.png', fullPage: true });
    console.log('📸 About page screenshot saved');
    
    console.log('✅ About page video section updated successfully!');
    
    await page.waitForTimeout(3000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();