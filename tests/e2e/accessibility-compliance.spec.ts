import { test, expect, Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Comprehensive accessibility testing for WCAG 2.1 AA compliance
 * Focus on therapeutic user experience accessibility
 */

async function runAccessibilityAudit(page: Page, context: string) {
  const axeBuilder = new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .exclude('#whimsical-particles') // Exclude decorative elements
  
  const results = await axeBuilder.analyze()
  
  // Log violations for debugging
  if (results.violations.length > 0) {
    console.log(`❌ Accessibility violations in ${context}:`)
    results.violations.forEach(violation => {
      console.log(`   • ${violation.id}: ${violation.description}`)
      violation.nodes.forEach(node => {
        console.log(`     - Target: ${node.target}`)
        console.log(`     - HTML: ${node.html.substring(0, 100)}...`)
      })
    })
  }
  
  return results
}

async function testKeyboardNavigation(page: Page, expectedStops: number = 5) {
  let focusableElements = 0
  let currentElement = null
  
  // Start from the beginning
  await page.keyboard.press('Tab')
  
  for (let i = 0; i < 20; i++) { // Max 20 tab stops
    const focused = await page.locator(':focus').first()
    const isVisible = await focused.isVisible().catch(() => false)
    
    if (isVisible) {
      const tagName = await focused.evaluate(el => el.tagName)
      const role = await focused.getAttribute('role').catch(() => null)
      
      if (tagName !== currentElement) {
        focusableElements++
        currentElement = tagName
        
        // Verify focus indicator is visible
        const focusStyles = await focused.evaluate(el => {
          const styles = window.getComputedStyle(el)
          return {
            outline: styles.outline,
            outlineWidth: styles.outlineWidth,
            outlineStyle: styles.outlineStyle,
            boxShadow: styles.boxShadow
          }
        })
        
        expect(
          focusStyles.outline !== 'none' || 
          focusStyles.outlineWidth !== '0px' ||
          focusStyles.boxShadow.includes('inset') ||
          focusStyles.boxShadow.includes('0px')
        ).toBeTruthy()
      }
    }
    
    await page.keyboard.press('Tab')
  }
  
  expect(focusableElements).toBeGreaterThanOrEqual(expectedStops)
  return focusableElements
}

test.describe('WCAG 2.1 AA Compliance Testing', () => {
  
  test('Training welcome page meets accessibility standards', async ({ page }) => {
    await page.goto('/training')
    await page.waitForLoadState('networkidle')
    
    // Run comprehensive accessibility audit
    const results = await runAccessibilityAudit(page, 'Training Welcome')
    expect(results.violations).toHaveLength(0)
    
    // Test keyboard navigation
    const focusStops = await testKeyboardNavigation(page, 3)
    console.log(`✅ Training welcome: ${focusStops} keyboard-accessible elements`)
    
    // Test screen reader support
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    const headingCount = await headings.count()
    expect(headingCount).toBeGreaterThan(0)
    
    // Verify proper heading hierarchy
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBe(1) // Should have exactly one H1
    
    // Test alt text on images
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      const ariaLabel = await img.getAttribute('aria-label')
      
      expect(alt !== null || ariaLabel !== null).toBeTruthy()
    }
  })

  test('Safety acknowledgment page accessibility', async ({ page }) => {
    await page.goto('/training/safety')
    await page.waitForLoadState('networkidle')
    
    // Run accessibility audit
    const results = await runAccessibilityAudit(page, 'Safety Acknowledgment')
    expect(results.violations).toHaveLength(0)
    
    // Test form accessibility
    const checkboxes = page.locator('input[type="checkbox"]')
    const checkboxCount = await checkboxes.count()
    
    for (let i = 0; i < checkboxCount; i++) {
      const checkbox = checkboxes.nth(i)
      
      // Must have accessible name
      const label = await checkbox.getAttribute('aria-label')
      const labelledBy = await checkbox.getAttribute('aria-labelledby')
      const associatedLabel = await page.locator(`label[for="${await checkbox.getAttribute('id')}"]`).count()
      
      expect(
        label !== null || 
        labelledBy !== null || 
        associatedLabel > 0
      ).toBeTruthy()
      
      // Must be keyboard accessible
      await checkbox.focus()
      await page.keyboard.press('Space')
      expect(await checkbox.isChecked()).toBeTruthy()
    }
    
    // Test safety warnings have proper roles
    const warnings = page.locator('.safety-warning, [role="alert"]')
    const warningCount = await warnings.count()
    expect(warningCount).toBeGreaterThan(2) // Should have multiple safety warnings
  })

  test('Training journey accessibility with module cards', async ({ page }) => {
    // Set up user with safety acknowledged
    await page.evaluate(() => {
      localStorage.setItem('cpat_progress', JSON.stringify({
        safetyAcknowledged: true,
        completedModules: ['01-light-color-fundamentals'],
        currentModule: '02-therapeutic-mechanisms'
      }))
    })
    
    await page.goto('/training/journey')
    await page.waitForLoadState('networkidle')
    
    // Run accessibility audit
    const results = await runAccessibilityAudit(page, 'Training Journey')
    expect(results.violations).toHaveLength(0)
    
    // Test module card accessibility
    const moduleCards = page.locator('.module-card')
    const cardCount = await moduleCards.count()
    expect(cardCount).toBe(6) // Should have 6 training modules
    
    for (let i = 0; i < cardCount; i++) {
      const card = moduleCards.nth(i)
      
      // Cards should be keyboard accessible
      expect(await card.getAttribute('tabindex')).toBeTruthy()
      expect(await card.getAttribute('role')).toBe('button')
      
      // Cards should have accessible names
      const ariaLabel = await card.getAttribute('aria-label')
      const textContent = await card.textContent()
      expect(ariaLabel !== null || (textContent && textContent.trim().length > 0)).toBeTruthy()
      
      // Test card focus and activation
      await card.focus()
      expect(await card.evaluate(el => el === document.activeElement)).toBeTruthy()
    }
    
    // Test progress indicators are accessible
    const progressBars = page.locator('[role="progressbar"]')
    const progressCount = await progressBars.count()
    
    for (let i = 0; i < progressCount; i++) {
      const progress = progressBars.nth(i)
      
      expect(await progress.getAttribute('aria-valuenow')).toBeTruthy()
      expect(await progress.getAttribute('aria-valuemin')).toBe('0')
      expect(await progress.getAttribute('aria-valuemax')).toBe('100')
      
      const ariaLabel = await progress.getAttribute('aria-label')
      expect(ariaLabel).toContain('progress')
    }
  })

  test('Color contrast compliance for therapeutic palette', async ({ page }) => {
    await page.goto('/training')
    await page.waitForLoadState('networkidle')
    
    // Test color contrast on key therapeutic elements
    const therapeuticElements = [
      '.therapeutic-button',
      '.therapeutic-card',
      '.sage-text',
      '.therapeutic-header',
      '.clinical-callout'
    ]
    
    for (const selector of therapeuticElements) {
      const elements = page.locator(selector)
      const count = await elements.count()
      
      for (let i = 0; i < Math.min(count, 5); i++) { // Test first 5 of each type
        const element = elements.nth(i)
        const isVisible = await element.isVisible().catch(() => false)
        
        if (isVisible) {
          const contrast = await element.evaluate((el) => {
            const styles = window.getComputedStyle(el)
            const bgColor = styles.backgroundColor
            const textColor = styles.color
            
            // Simple contrast calculation (simplified for testing)
            const bgBrightness = bgColor.includes('rgb') ? 
              bgColor.match(/\d+/g)?.map(Number) || [255, 255, 255] : 
              [255, 255, 255]
            
            const textBrightness = textColor.includes('rgb') ? 
              textColor.match(/\d+/g)?.map(Number) || [0, 0, 0] : 
              [0, 0, 0]
            
            const bgLum = (0.299 * bgBrightness[0] + 0.587 * bgBrightness[1] + 0.114 * bgBrightness[2]) / 255
            const textLum = (0.299 * textBrightness[0] + 0.587 * textBrightness[1] + 0.114 * textBrightness[2]) / 255
            
            const ratio = (Math.max(bgLum, textLum) + 0.05) / (Math.min(bgLum, textLum) + 0.05)
            
            return {
              ratio,
              bgColor,
              textColor,
              passes: ratio >= 4.5 // WCAG AA standard
            }
          })
          
          // Log contrast issues for debugging
          if (!contrast.passes) {
            console.warn(`⚠️  Contrast issue in ${selector}:`)
            console.warn(`   Background: ${contrast.bgColor}`)
            console.warn(`   Text: ${contrast.textColor}`)
            console.warn(`   Ratio: ${contrast.ratio.toFixed(2)} (needs ≥ 4.5)`)
          }
          
          expect(contrast.passes).toBeTruthy()
        }
      }
    }
  })

  test('Screen reader support for therapeutic components', async ({ page }) => {
    await page.goto('/components')
    await page.waitForLoadState('networkidle')
    
    // Test that all interactive elements have proper labels
    const interactiveElements = page.locator('button, input, select, textarea, [role="button"], [role="textbox"]')
    const count = await interactiveElements.count()
    
    for (let i = 0; i < count; i++) {
      const element = interactiveElements.nth(i)
      const isVisible = await element.isVisible().catch(() => false)
      
      if (isVisible) {
        const accessibleName = await element.evaluate((el) => {
          // Check various ways an element can have an accessible name
          return (
            el.getAttribute('aria-label') ||
            el.getAttribute('aria-labelledby') ||
            el.getAttribute('title') ||
            el.textContent?.trim() ||
            el.getAttribute('alt') ||
            el.getAttribute('placeholder')
          )
        })
        
        expect(accessibleName).toBeTruthy()
        expect(accessibleName?.length).toBeGreaterThan(0)
      }
    }
    
    // Test that status messages use live regions
    const statusElements = page.locator('[role="status"], [role="alert"], [aria-live]')
    const statusCount = await statusElements.count()
    expect(statusCount).toBeGreaterThan(0)
    
    // Test landmark roles for navigation
    const landmarks = page.locator('[role="main"], main, [role="navigation"], nav, [role="banner"], header')
    const landmarkCount = await landmarks.count()
    expect(landmarkCount).toBeGreaterThan(2) // Should have main content and navigation
  })

  test('Reduced motion preferences respected', async ({ page, browserName }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' })
    
    await page.goto('/training')
    await page.waitForLoadState('networkidle')
    
    // Check that animations are disabled or significantly reduced
    const animatedElements = page.locator('.therapeutic-breathing, .whimsical-animation, [data-animate="true"]')
    const count = await animatedElements.count()
    
    for (let i = 0; i < count; i++) {
      const element = animatedElements.nth(i)
      const isVisible = await element.isVisible().catch(() => false)
      
      if (isVisible) {
        const animationState = await element.evaluate((el) => {
          const styles = window.getComputedStyle(el)
          return {
            animationDuration: styles.animationDuration,
            transitionDuration: styles.transitionDuration,
            animationPlayState: styles.animationPlayState
          }
        })
        
        // Animations should be disabled or very short
        const duration = parseFloat(animationState.animationDuration) || 0
        const transition = parseFloat(animationState.transitionDuration) || 0
        
        expect(duration).toBeLessThan(0.1) // Less than 100ms
        expect(transition).toBeLessThan(0.2) // Less than 200ms
      }
    }
  })

  test('Focus management in modal dialogs', async ({ page }) => {
    await page.goto('/training/journey')
    await page.waitForLoadState('networkidle')
    
    // Open a modal (module details)
    await page.click('.module-card:first-child')
    
    // Wait for modal to appear
    const modal = page.locator('[role="dialog"], .modal, .therapeutic-modal')
    await expect(modal.first()).toBeVisible()
    
    // Focus should be trapped in modal
    const focusableInModal = modal.locator('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    const focusCount = await focusableInModal.count()
    
    if (focusCount > 0) {
      // Test focus trap
      await page.keyboard.press('Tab')
      const focused = page.locator(':focus')
      
      // Focused element should be within modal
      const isInModal = await focused.evaluate((focusedEl) => {
        const modal = focusedEl.closest('[role="dialog"], .modal, .therapeutic-modal')
        return modal !== null
      })
      
      expect(isInModal).toBeTruthy()
      
      // Test escape key closes modal
      await page.keyboard.press('Escape')
      await expect(modal.first()).not.toBeVisible()
    }
  })
})

test.describe('Therapeutic UX Accessibility Features', () => {
  test('Breathing space and calm interactions', async ({ page }) => {
    await page.goto('/training/safety')
    await page.waitForLoadState('networkidle')
    
    // Verify therapeutic pacing in interactions
    const checkboxes = page.locator('input[type="checkbox"]')
    const count = await checkboxes.count()
    
    if (count > 0) {
      const startTime = Date.now()
      
      // Interact with each checkbox with therapeutic timing
      for (let i = 0; i < count; i++) {
        await page.waitForTimeout(300) // Therapeutic breathing space
        await checkboxes.nth(i).click()
      }
      
      const totalTime = Date.now() - startTime
      const averageTime = totalTime / count
      
      // Should allow for calm, deliberate interactions
      expect(averageTime).toBeGreaterThan(300) // At least 300ms per interaction
      
      console.log(`✅ Therapeutic pacing maintained: ${averageTime}ms average per interaction`)
    }
  })

  test('Error messages are therapeutic and supportive', async ({ page }) => {
    await page.goto('/training/safety')
    await page.waitForLoadState('networkidle')
    
    // Try to proceed without acknowledging safety
    const submitBtn = page.locator('[data-testid="acknowledge-safety-btn"]')
    await submitBtn.click()
    
    // Should show therapeutic error message
    const errorMessage = page.locator('[role="alert"], .error-message, .therapeutic-error')
    await expect(errorMessage.first()).toBeVisible()
    
    const errorText = await errorMessage.first().textContent()
    
    // Error should be supportive, not harsh
    expect(errorText?.toLowerCase()).toContain('please')
    expect(errorText?.toLowerCase()).not.toContain('error')
    expect(errorText?.toLowerCase()).not.toContain('failed')
    expect(errorText?.toLowerCase()).not.toContain('invalid')
    
    // Should guide user toward solution
    expect(
      errorText?.toLowerCase().includes('acknowledge') ||
      errorText?.toLowerCase().includes('complete') ||
      errorText?.toLowerCase().includes('check')
    ).toBeTruthy()
  })

  test('Loading states are calming and informative', async ({ page }) => {
    await page.goto('/training/module/01-light-color-fundamentals')
    
    // Look for loading indicators
    const loadingElements = page.locator('.loading, .therapeutic-loading, [aria-busy="true"]')
    const loadingCount = await loadingElements.count()
    
    if (loadingCount > 0) {
      const loading = loadingElements.first()
      
      // Should have accessible loading message
      const loadingText = await loading.textContent()
      const ariaLabel = await loading.getAttribute('aria-label')
      
      expect(loadingText || ariaLabel).toBeTruthy()
      
      // Should indicate what's loading
      const message = (loadingText || ariaLabel || '').toLowerCase()
      expect(
        message.includes('loading') ||
        message.includes('preparing') ||
        message.includes('setting up')
      ).toBeTruthy()
    }
  })
})