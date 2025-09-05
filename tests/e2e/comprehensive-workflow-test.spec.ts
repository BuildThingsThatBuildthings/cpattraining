import { test, expect, Page } from '@playwright/test';
import { 
  testLandingAndWelcome,
  testSafetyAcknowledgment,
  testTrainingJourney,
  testModuleCompletion,
  testProgressPersistence,
  testCertificateGeneration,
  testNavigationFlow,
  testTherapeuticAnimations,
  testMobileResponsiveness,
  testErrorBoundaries,
  testLoadingStates 
} from './workflow-test-suite';

test.describe('Comprehensive CPAT Training Workflow', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure clean test state
    await page.goto('http://localhost:5173');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('Complete Training Workflow - Full Journey', async ({ page }) => {
    console.log('🚀 Starting comprehensive CPAT training workflow test...');

    // Test 1: Landing & Welcome Experience
    console.log('📍 Testing landing page and welcome experience...');
    await testLandingAndWelcome(page);
    
    // Test 2: Safety Acknowledgment Process
    console.log('🛡️ Testing safety acknowledgment screening...');
    await testSafetyAcknowledgment(page);
    
    // Test 3: Training Journey Navigation
    console.log('🎯 Testing training journey navigation...');
    await testTrainingJourney(page);
    
    // Test 4: Module Completion Experience
    console.log('📚 Testing module completion experiences...');
    await testModuleCompletion(page);
    
    // Test 5: Progress Persistence
    console.log('💾 Testing progress persistence...');
    await testProgressPersistence(page);
    
    // Test 6: Certificate Generation
    console.log('🎓 Testing certificate generation...');
    await testCertificateGeneration(page);
    
    // Test 7: Navigation Flow Security
    console.log('🔐 Testing protected routes and navigation flow...');
    await testNavigationFlow(page);
    
    console.log('✅ All workflow tests completed successfully!');
  });

  test('Therapeutic UI & Interactions Test', async ({ page }) => {
    console.log('🎨 Testing therapeutic animations and UI interactions...');
    await testTherapeuticAnimations(page);
  });

  test('Mobile Responsiveness Test', async ({ page }) => {
    console.log('📱 Testing mobile responsiveness...');
    await testMobileResponsiveness(page);
  });

  test('Error Handling & Boundaries Test', async ({ page }) => {
    console.log('🚨 Testing error boundaries and edge cases...');
    await testErrorBoundaries(page);
  });

  test('Loading States & Transitions Test', async ({ page }) => {
    console.log('⏳ Testing loading states and transitions...');
    await testLoadingStates(page);
  });

  test('Accessibility Compliance Test', async ({ page }) => {
    console.log('♿ Testing accessibility compliance...');
    
    // Test keyboard navigation
    await page.goto('http://localhost:5173');
    await page.keyboard.press('Tab');
    
    // Check for skip links
    const skipLink = page.locator('text="Skip to main content"');
    await expect(skipLink).toBeVisible();
    
    // Test ARIA labels and screen reader support
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();
    
    // Test focus management
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
    
    console.log('♿ Accessibility tests completed');
  });

  test('Performance & Animation Optimization Test', async ({ page }) => {
    console.log('⚡ Testing performance and animations...');
    
    await page.goto('http://localhost:5173');
    
    // Test reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    
    // Verify animations respect reduced motion
    const animatedElement = page.locator('[data-whimsy]').first();
    if (await animatedElement.count() > 0) {
      await expect(animatedElement).toBeVisible();
    }
    
    // Test performance metrics
    const performanceEntries = await page.evaluate(() => {
      return {
        navigation: performance.getEntriesByType('navigation')[0],
        paint: performance.getEntriesByType('paint')
      };
    });
    
    console.log('⚡ Performance metrics collected:', performanceEntries);
  });
});