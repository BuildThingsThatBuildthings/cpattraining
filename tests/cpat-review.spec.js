import { test, expect } from '@playwright/test';

test.describe('CPAT Training Platform Review', () => {
  let errors = [];
  let consoleMessages = [];

  test.beforeEach(async ({ page }) => {
    // Reset error tracking
    errors = [];
    consoleMessages = [];

    // Listen for console messages
    page.on('console', msg => {
      const message = {
        type: msg.type(),
        text: msg.text(),
        timestamp: new Date().toISOString()
      };
      consoleMessages.push(message);
      if (msg.type() === 'error') {
        console.log('❌ Console Error:', msg.text());
      }
    });

    // Listen for page errors
    page.on('pageerror', error => {
      errors.push({
        type: 'Page Error',
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
      console.log('🚨 Page Error:', error.message);
    });

    // Listen for failed requests
    page.on('response', response => {
      if (response.status() >= 400) {
        errors.push({
          type: 'Network Error',
          url: response.url(),
          status: response.status(),
          statusText: response.statusText(),
          timestamp: new Date().toISOString()
        });
        console.log('🌐 Network Error:', response.status(), response.url());
      }
    });
  });

  test('Desktop Header and Navigation Review', async ({ page }) => {
    console.log('🖥️ Testing desktop header and navigation...');
    
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await page.screenshot({ 
      path: 'tests/screenshots/desktop-full-page.png', 
      fullPage: true 
    });
    console.log('📸 Desktop full page screenshot saved');

    // Take header-specific screenshot
    await page.screenshot({ 
      path: 'tests/screenshots/desktop-header.png',
      clip: { x: 0, y: 0, width: 1280, height: 100 }
    });
    console.log('📸 Desktop header screenshot saved');

    // Check navigation elements
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    const logo = page.locator('a[href="/"]');
    await expect(logo).toBeVisible();

    // Check navigation links
    const navLinks = page.locator('nav a');
    const linkCount = await navLinks.count();
    console.log(`🔗 Found ${linkCount} navigation links`);

    // Check header styling
    const headerStyles = await page.evaluate(() => {
      const nav = document.querySelector('nav');
      if (!nav) return null;
      
      const styles = window.getComputedStyle(nav);
      return {
        backgroundColor: styles.backgroundColor,
        position: styles.position,
        zIndex: styles.zIndex,
        borderBottom: styles.borderBottom
      };
    });
    
    console.log('🎨 Header styles:', headerStyles);
    expect(headerStyles).toBeTruthy();
  });

  test('Mobile Responsiveness Review', async ({ page }) => {
    console.log('📱 Testing mobile responsiveness...');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');

    // Take mobile screenshot
    await page.screenshot({ 
      path: 'tests/screenshots/mobile-full-page.png', 
      fullPage: true 
    });
    console.log('📸 Mobile full page screenshot saved');

    // Test mobile menu
    const menuButton = page.locator('button[aria-label*="menu"], button[aria-expanded]');
    if (await menuButton.isVisible()) {
      console.log('🍔 Mobile menu button found');
      
      await menuButton.click();
      await page.waitForTimeout(500);
      
      await page.screenshot({ 
        path: 'tests/screenshots/mobile-menu-open.png', 
        fullPage: true 
      });
      console.log('📸 Mobile menu open screenshot saved');

      // Check if mobile menu is visible
      const mobileMenu = page.locator('.mobile-nav-menu, [class*="mobile"]');
      const isMenuVisible = await mobileMenu.isVisible().catch(() => false);
      console.log('📱 Mobile menu visible:', isMenuVisible);
    }
  });

  test('Route Navigation Review', async ({ page }) => {
    console.log('🛣️ Testing route navigation...');
    
    const routes = [
      { path: '/', name: 'home' },
      { path: '/training', name: 'training' },
      { path: '/dashboard', name: 'dashboard' },
      { path: '/components', name: 'components' }
    ];

    for (const route of routes) {
      try {
        console.log(`🔗 Testing route: ${route.path}`);
        
        await page.goto(`http://localhost:5173${route.path}`);
        await page.waitForLoadState('networkidle');
        
        // Take route screenshot
        await page.screenshot({ 
          path: `tests/screenshots/route-${route.name}.png`, 
          fullPage: true 
        });
        console.log(`📸 Route ${route.path} screenshot saved`);

        // Check for error messages
        const errorElements = await page.locator('[role="alert"], .error, .alert-danger').count();
        if (errorElements > 0) {
          console.log(`⚠️ Found ${errorElements} error elements on ${route.path}`);
        }

        // Check page title
        const title = await page.title();
        console.log(`📄 Page title for ${route.path}: ${title}`);

      } catch (error) {
        console.log(`❌ Error testing route ${route.path}:`, error.message);
        errors.push({
          type: 'Route Error',
          route: route.path,
          message: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }
  });

  test('CSS and Styling Review', async ({ page }) => {
    console.log('🎨 Testing CSS and styling...');
    
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');

    // Check computed styles
    const stylingInfo = await page.evaluate(() => {
      const body = document.body;
      const nav = document.querySelector('nav');
      
      const bodyStyles = window.getComputedStyle(body);
      const navStyles = nav ? window.getComputedStyle(nav) : null;
      
      return {
        body: {
          backgroundColor: bodyStyles.backgroundColor,
          color: bodyStyles.color,
          fontFamily: bodyStyles.fontFamily,
          fontSize: bodyStyles.fontSize
        },
        nav: navStyles ? {
          backgroundColor: navStyles.backgroundColor,
          position: navStyles.position,
          top: navStyles.top,
          zIndex: navStyles.zIndex
        } : null,
        tailwindClasses: document.querySelectorAll('[class*="slate-"], [class*="sage-"], [class*="bg-"], [class*="text-"]').length,
        hasStylesheets: document.querySelectorAll('link[rel="stylesheet"], style').length
      };
    });

    console.log('🎨 Styling information:', stylingInfo);
    
    // Verify essential styling is applied
    expect(stylingInfo.hasStylesheets).toBeGreaterThan(0);
    expect(stylingInfo.body.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('Performance and Accessibility Review', async ({ page }) => {
    console.log('⚡ Testing performance and accessibility...');
    
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');

    // Check performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return navigation ? {
        domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
        loadComplete: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
        totalTime: Math.round(navigation.loadEventEnd - navigation.navigationStart)
      } : null;
    });

    if (metrics) {
      console.log('⚡ Performance metrics:', metrics);
    }

    // Check for accessibility attributes
    const a11yCheck = await page.evaluate(() => {
      const ariaLabels = document.querySelectorAll('[aria-label]').length;
      const altTexts = document.querySelectorAll('img[alt]').length;
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6').length;
      const skipLinks = document.querySelectorAll('.skip-link, [href="#main"]').length;
      
      return {
        ariaLabels,
        altTexts,
        headings,
        skipLinks,
        hasMainLandmark: !!document.querySelector('main, [role="main"]')
      };
    });

    console.log('♿ Accessibility check:', a11yCheck);
  });

  test.afterAll(async () => {
    // Generate error report
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalErrors: errors.length,
        consoleMessages: consoleMessages.length,
        consoleErrors: consoleMessages.filter(m => m.type === 'error').length
      },
      errors: errors,
      consoleMessages: consoleMessages.filter(m => m.type === 'error'),
      recommendations: []
    };

    if (errors.length === 0) {
      report.recommendations.push('✅ No critical errors detected');
    } else {
      report.recommendations.push('🔧 Review detected errors for potential issues');
    }

    // Save report
    const fs = await import('fs');
    fs.writeFileSync('tests/cpat-review-report.json', JSON.stringify(report, null, 2));
    console.log('📊 Review report saved to tests/cpat-review-report.json');
    console.log('📈 Final Summary:');
    console.log(`   - Errors: ${report.summary.totalErrors}`);
    console.log(`   - Console Errors: ${report.summary.consoleErrors}`);
    console.log(`   - Screenshots: Multiple taken and saved`);
  });
});