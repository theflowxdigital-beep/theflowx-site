import { test, expect } from '@playwright/test';

test.describe('Basic Website Functionality', () => {
  test('website loads without console errors', async ({ page }) => {
    const errors = [];
    
    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check that page loaded without errors
    expect(errors).toHaveLength(0);
    
    // Check basic page structure
    await expect(page.locator('html')).toBeVisible();
    await expect(page.locator('body')).toBeVisible();
    
    console.log('✅ Website loads without console errors');
  });

  test('page has valid HTML structure', async ({ page }) => {
    await page.goto('/');
    
    // Check for basic HTML elements
    await expect(page.locator('head')).toHaveCount(1);
    await expect(page.locator('title')).toHaveCount(1);
    
    // Check that title contains theFlowX
    const title = await page.title();
    expect(title.toLowerCase()).toContain('theflowx');
    
    console.log(`✅ Page title: ${title}`);
  });

  test('page responds within reasonable time', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - start;
    
    // Should load within 10 seconds (generous for dev environment)
    expect(loadTime).toBeLessThan(10000);
    
    console.log(`✅ Page loaded in ${loadTime}ms`);
  });

  test('check if main content areas exist', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Look for any heading elements
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);
    
    // Look for any content
    const body = page.locator('body');
    const bodyText = await body.textContent();
    expect(bodyText?.length || 0).toBeGreaterThan(0);
    
    console.log(`✅ Found ${headingCount} headings and body content`);
  });
});