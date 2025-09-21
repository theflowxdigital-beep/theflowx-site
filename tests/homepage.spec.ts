import { test, expect } from '@playwright/test';

test.describe('theFlowX Homepage', () => {
  test('should load homepage without errors', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Check that the page loads without console errors
    const logs = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(msg.text());
      }
    });
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Verify no console errors
    expect(logs).toHaveLength(0);
    
    // Check that the page title is correct
    await expect(page).toHaveTitle(/theFlowX/);
  });

  test('should display hero section correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check for hero heading
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('AI-First Growth Infrastructure');
    
    // Check for CTA buttons
    const ctaButtons = page.locator('button, a[role="button"]');
    await expect(ctaButtons.first()).toBeVisible();
  });

  test('should have responsive navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check if navigation exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check for logo/brand
    const logo = page.locator('nav').locator('text=theFlowX').first();
    await expect(logo).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
    
    // Check viewport meta tag
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/');
    
    // Check for skip links (accessibility)
    const skipLink = page.locator('a[href="#main"]');
    if (await skipLink.count() > 0) {
      await expect(skipLink).toBeHidden(); // Should be hidden by default
    }
    
    // Check that main content has proper heading structure
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    
    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        await expect(img).toHaveAttribute('alt');
      }
    }
  });

  test('should load within performance targets', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds (generous for development)
    expect(loadTime).toBeLessThan(5000);
  });

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check that content is visible and not overflowing
    const body = page.locator('body');
    const bodyBox = await body.boundingBox();
    expect(bodyBox?.width).toBeLessThanOrEqual(375);
    
    // Check for mobile navigation (if hamburger menu exists)
    const mobileNav = page.locator('[aria-label*="menu"], [aria-label*="Menu"], button[aria-expanded]');
    if (await mobileNav.count() > 0) {
      await expect(mobileNav.first()).toBeVisible();
    }
  });

  test('should handle form interactions if present', async ({ page }) => {
    await page.goto('/');
    
    // Look for contact forms or lead forms
    const forms = page.locator('form');
    const formCount = await forms.count();
    
    if (formCount > 0) {
      const form = forms.first();
      await expect(form).toBeVisible();
      
      // Check for required fields
      const requiredInputs = form.locator('input[required], textarea[required]');
      const requiredCount = await requiredInputs.count();
      
      if (requiredCount > 0) {
        // Try submitting empty form to test validation
        const submitButton = form.locator('button[type="submit"], input[type="submit"]');
        if (await submitButton.count() > 0) {
          await submitButton.click();
          // Form should show validation errors or prevent submission
        }
      }
    }
  });
});