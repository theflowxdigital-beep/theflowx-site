const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('📸 Testing updated services page...');
    await page.goto('http://localhost:3000/services.html');
    await page.waitForLoadState('networkidle');
    
    // Count service cards
    const serviceCards = await page.$$('.service-card');
    console.log(`Found ${serviceCards.length} service cards`);
    
    // Get service titles
    const serviceTitles = await page.$$eval('.service-title', titles => 
      titles.map(title => title.textContent.trim())
    );
    console.log('Service titles:', serviceTitles);
    
    // Get CTA button texts
    const ctaTexts = await page.$$eval('.morebtn-text', buttons => 
      buttons.map(btn => btn.textContent.trim())
    );
    console.log('CTA buttons:', ctaTexts);
    
    await page.screenshot({ path: 'services-page-updated.png', fullPage: true });
    console.log('📸 Services page screenshot saved');
    
    await page.waitForTimeout(2000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();