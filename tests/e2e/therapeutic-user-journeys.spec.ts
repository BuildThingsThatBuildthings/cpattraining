import { test, expect, Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Comprehensive E2E tests for therapeutic user journeys
 * Testing clinical reliability and luxury user experience
 */

// Test helper functions for therapeutic scenarios
async function waitForTherapeuticComponents(page: Page) {
  // Wait for luxury therapeutic system to load
  await page.waitForSelector('.therapeutic-app', { timeout: 10000 })
  await page.waitForFunction(() => {
    return window.luxuryTherapeuticSystem && window.luxuryTherapeuticSystem.initialized
  }, { timeout: 15000 })
}

async function simulateTherapeuticInteraction(page: Page, selector: string, delay = 200) {
  // Slower interactions for therapeutic UX
  await page.hover(selector, { timeout: 5000 })
  await page.waitForTimeout(delay)
  await page.click(selector, { timeout: 5000 })
  await page.waitForTimeout(delay)
}

async function verifyTherapeuticStyling(page: Page, selector: string) {
  const element = page.locator(selector)
  const styles = await element.evaluate((el) => {
    const computed = window.getComputedStyle(el)
    return {
      backgroundColor: computed.backgroundColor,
      borderRadius: computed.borderRadius,
      boxShadow: computed.boxShadow,
      transition: computed.transition
    }
  })
  
  // Verify therapeutic sage colors and luxury styling
  expect(styles.borderRadius).not.toBe('0px')
  expect(styles.transition).toContain('cubic-bezier')
}

test.describe('Therapeutic User Journey - New Clinician', () => {
  test.beforeEach(async ({ page }) => {
    // Start with fresh therapeutic state
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
      sessionStorage.clear()
    })
  })

  test('Complete new user onboarding with therapeutic excellence', async ({ page }) => {
    test.slow() // Mark as slow for therapeutic interactions
    
    // 1. Landing and Welcome
    await waitForTherapeuticComponents(page)
    
    // Verify luxury therapeutic design is active
    await expect(page.locator('.therapeutic-app')).toBeVisible()
    await verifyTherapeuticStyling(page, '.therapeutic-app')
    
    // Should redirect to training welcome for new user
    await expect(page).toHaveURL('/training')
    
    // 2. Training Welcome Experience
    await expect(page.locator('h1')).toContainText('CPAT Training')
    await expect(page.locator('[data-testid="welcome-section"]')).toBeVisible()
    
    // Test whimsical interactions
    await simulateTherapeuticInteraction(page, '[data-testid="start-training-btn"]')
    
    // Should navigate to safety acknowledgment
    await expect(page).toHaveURL('/training/safety')
    
    // 3. Safety Acknowledgment - Critical Clinical Step
    await expect(page.locator('[data-testid="safety-content"]')).toBeVisible()
    
    // Verify safety warnings are prominent
    const safetyWarnings = page.locator('.safety-warning')
    await expect(safetyWarnings).toHaveCount(3) // Minimum safety warnings
    
    // Verify therapeutic styling of safety elements
    await verifyTherapeuticStyling(page, '.safety-warning')
    
    // Must acknowledge safety before proceeding
    const acknowledgeBtn = page.locator('[data-testid="acknowledge-safety-btn"]')
    await expect(acknowledgeBtn).toBeDisabled() // Should be disabled initially
    
    // Check safety checkboxes with therapeutic interactions
    const safetyCheckboxes = page.locator('input[type="checkbox"][name^="safety"]')
    const checkboxCount = await safetyCheckboxes.count()
    
    for (let i = 0; i < checkboxCount; i++) {
      await safetyCheckboxes.nth(i).check({ timeout: 3000 })
      await page.waitForTimeout(200) // Therapeutic pacing
    }
    
    await expect(acknowledgeBtn).toBeEnabled()
    await simulateTherapeuticInteraction(page, '[data-testid="acknowledge-safety-btn"]')
    
    // Should navigate to training journey
    await expect(page).toHaveURL('/training/journey')
    
    // 4. Training Journey Overview
    await expect(page.locator('[data-testid="training-modules"]')).toBeVisible()
    
    // Verify all 6 core modules are displayed
    const moduleCards = page.locator('.module-card')
    await expect(moduleCards).toHaveCount(6)
    
    // First module should be available, others locked
    const firstModule = moduleCards.nth(0)
    await expect(firstModule).not.toHaveClass(/locked/)
    
    const secondModule = moduleCards.nth(1)
    await expect(secondModule).toHaveClass(/locked/)
    
    // 5. Start First Module
    await simulateTherapeuticInteraction(page, '[data-testid="module-01-start-btn"]')
    await expect(page).toHaveURL('/training/module/01-light-color-fundamentals')
    
    // Verify module content loads with therapeutic styling
    await expect(page.locator('[data-testid="module-content"]')).toBeVisible()
    await verifyTherapeuticStyling(page, '.module-content')
    
    // 6. Complete Module Assessment
    const completeBtn = page.locator('[data-testid="complete-module-btn"]')
    await expect(completeBtn).toBeVisible()
    
    await simulateTherapeuticInteraction(page, '[data-testid="complete-module-btn"]')
    
    // Should see celebration effects
    await page.waitForSelector('.celebration-confetti', { timeout: 5000 })
    
    // Navigate back to journey to verify progress
    await page.goto('/training/journey')
    
    // First module should now be complete, second unlocked
    await expect(moduleCards.nth(0)).toHaveClass(/completed/)
    await expect(moduleCards.nth(1)).not.toHaveClass(/locked/)
    
    console.log('✅ New clinician onboarding journey completed successfully')
  })
  
  test('Therapeutic accessibility compliance throughout journey', async ({ page }) => {
    // Initialize accessibility testing
    const axeBuilder = new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .exclude('.whimsical-animation') // Exclude decorative animations
    
    // Test accessibility at each key stage
    const journeyStages = [
      '/',
      '/training',
      '/training/safety',
      '/training/journey'
    ]
    
    for (const stage of journeyStages) {
      await page.goto(stage)
      await waitForTherapeuticComponents(page)
      
      // Run accessibility scan
      const accessibilityScanResults = await axeBuilder.analyze()
      
      expect(accessibilityScanResults.violations).toHaveLength(0)
      
      // Test keyboard navigation
      await page.keyboard.press('Tab')
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
      
      // Test screen reader compatibility
      const ariaElements = page.locator('[aria-label], [aria-labelledby], [role]')
      const ariaCount = await ariaElements.count()
      expect(ariaCount).toBeGreaterThan(3) // Should have proper ARIA support
      
      console.log(`✅ Accessibility verified for stage: ${stage}`)
    }
  })
})

test.describe('Therapeutic User Journey - Returning User', () => {
  test.beforeEach(async ({ page }) => {
    // Set up returning user with partial progress
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.setItem('cpat_progress', JSON.stringify({
        safetyAcknowledged: true,
        completedModules: ['01-light-color-fundamentals', '02-therapeutic-mechanisms'],
        currentModule: '03-clinical-applications',
        certificateEligible: false
      }))
    })
  })

  test('Resume training from current progress with luxury UX', async ({ page }) => {
    await page.goto('/')
    await waitForTherapeuticComponents(page)
    
    // Should redirect to current module
    await expect(page).toHaveURL('/training/module/03-clinical-applications')
    
    // Verify progress is maintained
    await page.goto('/training/journey')
    
    const moduleCards = page.locator('.module-card')
    
    // First two modules should be completed
    await expect(moduleCards.nth(0)).toHaveClass(/completed/)
    await expect(moduleCards.nth(1)).toHaveClass(/completed/)
    
    // Third module should be current
    await expect(moduleCards.nth(2)).toHaveClass(/current/)
    
    // Verify whimsical enhancements are active
    await expect(page.locator('[data-whimsy-ready="true"]')).toBeVisible()
    
    console.log('✅ Returning user journey validated')
  })
})

test.describe('Therapeutic User Journey - Certificate Generation', () => {
  test.beforeEach(async ({ page }) => {
    // Set up user ready for certification
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.setItem('cpat_progress', JSON.stringify({
        safetyAcknowledged: true,
        completedModules: [
          '01-light-color-fundamentals',
          '02-therapeutic-mechanisms',
          '03-clinical-applications',
          '04-safety-protocols',
          '05-patient-assessment',
          '06-practical-implementation'
        ],
        currentModule: null,
        certificateEligible: true
      }))
    })
  })

  test('Generate professional certificate with luxury celebration', async ({ page }) => {
    test.slow() // Certificate generation includes complex animations
    
    await page.goto('/')
    await waitForTherapeuticComponents(page)
    
    // Should redirect to certificate page
    await expect(page).toHaveURL('/training/certificate')
    
    // Verify certificate form is loaded
    await expect(page.locator('[data-testid="certificate-form"]')).toBeVisible()
    
    // Fill out certificate details
    await page.fill('[name="fullName"]', 'Dr. Sarah Johnson')
    await page.fill('[name="credentials"]', 'MD, PhD')
    await page.fill('[name="organization"]', 'Metropolitan Healthcare')
    
    // Generate certificate with champagne celebration
    const generateBtn = page.locator('[data-testid="generate-certificate-btn"]')
    await expect(generateBtn).toContainText('Generate Certificate')
    
    await simulateTherapeuticInteraction(page, '[data-testid="generate-certificate-btn"]')
    
    // Should see luxury celebration effects
    await page.waitForSelector('.champagne-celebration', { timeout: 10000 })
    await page.waitForSelector('.luxury-confetti', { timeout: 5000 })
    
    // Certificate should be generated and downloadable
    await expect(page.locator('[data-testid="certificate-preview"]')).toBeVisible()
    await expect(page.locator('[data-testid="download-certificate-btn"]')).toBeVisible()
    
    // Verify therapeutic styling of certificate
    await verifyTherapeuticStyling(page, '.certificate-container')
    
    console.log('✅ Certificate generation with luxury celebration completed')
  })
})

test.describe('Clinical Scenario Simulations', () => {
  test('Crisis intervention scenario with safety protocols', async ({ page }) => {
    await page.goto('/training/module/04-safety-protocols')
    await waitForTherapeuticComponents(page)
    
    // Start crisis simulation
    await simulateTherapeuticInteraction(page, '[data-testid="crisis-simulation-btn"]')
    
    // Verify scenario loads with appropriate urgency indicators
    await expect(page.locator('.scenario-crisis')).toBeVisible()
    await expect(page.locator('.urgency-indicator')).toHaveClass(/high/)
    
    // Should present safety checklist
    const safetyItems = page.locator('.safety-checklist-item')
    await expect(safetyItems).toHaveCount(5) // 5 critical safety items
    
    // Complete safety protocol
    const checklistCount = await safetyItems.count()
    for (let i = 0; i < checklistCount; i++) {
      await safetyItems.nth(i).locator('input[type="checkbox"]').check()
      await page.waitForTimeout(300) // Deliberate pacing for crisis training
    }
    
    // Submit scenario response
    await simulateTherapeuticInteraction(page, '[data-testid="submit-response-btn"]')
    
    // Should provide clinical feedback
    await expect(page.locator('.clinical-feedback')).toBeVisible()
    
    console.log('✅ Crisis intervention scenario completed with proper safety protocols')
  })

  test('Routine session scenario with therapeutic flow', async ({ page }) => {
    await page.goto('/training/module/05-patient-assessment')
    await waitForTherapeuticComponents(page)
    
    // Start routine scenario
    await simulateTherapeuticInteraction(page, '[data-testid="routine-simulation-btn"]')
    
    // Verify calm, therapeutic pacing
    await expect(page.locator('.scenario-routine')).toBeVisible()
    await expect(page.locator('.pace-indicator')).toHaveClass(/calm/)
    
    // Complete assessment workflow
    const assessmentSteps = page.locator('.assessment-step')
    const stepCount = await assessmentSteps.count()
    
    for (let i = 0; i < stepCount; i++) {
      await simulateTherapeuticInteraction(page, `[data-testid="step-${i + 1}-btn"]`)
      
      // Verify therapeutic feedback
      await expect(page.locator('.step-feedback')).toBeVisible()
      await page.waitForTimeout(500) // Therapeutic pacing
    }
    
    console.log('✅ Routine session scenario completed with therapeutic flow')
  })
})

test.describe('Performance and Memory Testing', () => {
  test('Luxury component performance under load', async ({ page }) => {
    // Navigate to component-heavy page
    await page.goto('/training/journey')
    await waitForTherapeuticComponents(page)
    
    // Measure performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const paint = performance.getEntriesByType('paint')
      
      return {
        loadTime: navigation.loadEventEnd - navigation.navigationStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
      }
    })
    
    // Luxury standards: under 2 seconds total load time
    expect(performanceMetrics.loadTime).toBeLessThan(2000)
    expect(performanceMetrics.domContentLoaded).toBeLessThan(1500)
    expect(performanceMetrics.firstPaint).toBeLessThan(1000)
    
    // Test interaction performance
    const interactionStart = Date.now()
    await simulateTherapeuticInteraction(page, '.module-card:first-child')
    const interactionTime = Date.now() - interactionStart
    
    // Therapeutic interactions should be under 200ms
    expect(interactionTime).toBeLessThan(200)
    
    console.log('✅ Performance metrics meet luxury standards:', performanceMetrics)
  })
})

test.describe('Visual Regression Testing', () => {
  test('Therapeutic component visual consistency', async ({ page }) => {
    const components = [
      '/training',
      '/training/safety',
      '/training/journey',
      '/components'
    ]
    
    for (const component of components) {
      await page.goto(component)
      await waitForTherapeuticComponents(page)
      
      // Wait for animations to settle
      await page.waitForTimeout(1000)
      
      // Take screenshot for visual regression
      await expect(page).toHaveScreenshot(`${component.replace(/\//g, '-')}.png`, {
        fullPage: true,
        animations: 'disabled' // Disable animations for consistent screenshots
      })
    }
    
    console.log('✅ Visual regression screenshots captured for all components')
  })
})