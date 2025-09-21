const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Inspecting grey boxes on homepage...');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot first
    await page.screenshot({ path: 'grey-boxes-inspection.png', fullPage: true });
    console.log('📸 Screenshot saved');
    
    // Check all video elements
    const videos = await page.$$('video');
    console.log(`\n=== VIDEO ELEMENTS ===`);
    console.log(`Found ${videos.length} video elements`);
    
    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      const src = await video.evaluate(v => v.currentSrc || v.src);
      const videoWidth = await video.evaluate(v => v.videoWidth);
      const videoHeight = await video.evaluate(v => v.videoHeight);
      const readyState = await video.evaluate(v => v.readyState);
      const paused = await video.evaluate(v => v.paused);
      
      console.log(`Video ${i + 1}:`);
      console.log(`  Source: ${src}`);
      console.log(`  Dimensions: ${videoWidth}x${videoHeight}`);
      console.log(`  Ready State: ${readyState} (4=HAVE_ENOUGH_DATA)`);
      console.log(`  Paused: ${paused}`);
    }
    
    // Check elements with specific classes that might be grey boxes
    console.log(`\n=== POTENTIAL GREY BOX ELEMENTS ===`);
    
    const greyElements = await page.$$eval('*', elements => {
      return elements
        .filter(el => {
          const styles = window.getComputedStyle(el);
          const bg = styles.backgroundColor;
          const color = styles.color;
          // Look for grey backgrounds or elements with placeholder-like content
          return (bg.includes('128') || bg.includes('169') || bg.includes('156') || 
                  el.textContent?.includes('x ') || 
                  el.classList.contains('hero-right-image') ||
                  el.tagName === 'VIDEO');
        })
        .map(el => ({
          tag: el.tagName,
          classes: Array.from(el.classList).join(' '),
          text: el.textContent?.trim().substring(0, 50),
          backgroundColor: window.getComputedStyle(el).backgroundColor,
          dimensions: `${el.offsetWidth}x${el.offsetHeight}`
        }));
    });
    
    greyElements.forEach((el, i) => {
      console.log(`Element ${i + 1}:`);
      console.log(`  Tag: ${el.tag}`);
      console.log(`  Classes: ${el.classes}`);
      console.log(`  Text: ${el.text}`);
      console.log(`  Background: ${el.backgroundColor}`);
      console.log(`  Dimensions: ${el.dimensions}`);
      console.log('---');
    });
    
    await page.waitForTimeout(3000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();