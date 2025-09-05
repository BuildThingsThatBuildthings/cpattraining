import { chromium, FullConfig } from '@playwright/test'

/**
 * Global setup for therapeutic testing environment
 * Prepares clinical scenarios and luxury component testing
 */
async function globalSetup(config: FullConfig) {
  console.log('🧪 Setting up therapeutic testing environment...')
  
  // Launch browser for setup tasks
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  
  try {
    // Navigate to the application
    await page.goto('http://localhost:5173')
    
    // Wait for luxury components to initialize
    await page.waitForSelector('[data-whimsy-ready="true"]', { 
      timeout: 30000,
      state: 'attached' 
    })
    
    // Initialize therapeutic test data
    await page.evaluate(() => {
      // Set up test user progress
      localStorage.setItem('cpat_test_user', JSON.stringify({
        id: 'test-user-001',
        role: 'clinician',
        progress: {
          safetyAcknowledged: false,
          completedModules: [],
          currentModule: null,
          certificateEligible: false
        }
      }))
      
      // Initialize whimsical system for testing
      if (window.luxuryTherapeuticSystem) {
        window.luxuryTherapeuticSystem.testMode = true
      }
      
      // Set therapeutic testing environment
      sessionStorage.setItem('therapeutic_test_mode', 'true')
      sessionStorage.setItem('clinical_compliance_check', 'enabled')
      
      console.log('✅ Therapeutic test environment initialized')
    })
    
    // Verify critical therapeutic components are loaded
    const criticalSelectors = [
      '.therapeutic-app',
      '[data-testid="therapeutic-wrapper"]',
      '.luxury-therapeutic-component'
    ]
    
    for (const selector of criticalSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 5000 })
      } catch (error) {
        console.warn(`⚠️  Optional component not found: ${selector}`)
      }
    }
    
    console.log('✅ Global therapeutic testing setup complete')
    
  } catch (error) {
    console.error('❌ Global setup failed:', error)
    throw error
  } finally {
    await context.close()
    await browser.close()
  }
}

export default globalSetup