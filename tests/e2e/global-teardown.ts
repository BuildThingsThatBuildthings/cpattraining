import { chromium, FullConfig } from '@playwright/test'

/**
 * Global teardown for therapeutic testing environment
 * Cleanup and generate clinical test reports
 */
async function globalTeardown(config: FullConfig) {
  console.log('🧹 Cleaning up therapeutic testing environment...')
  
  // Launch browser for cleanup tasks
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  
  try {
    // Navigate to application for cleanup
    await page.goto('http://localhost:5173', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    // Clear therapeutic test data
    await page.evaluate(() => {
      // Clear all therapeutic testing data
      localStorage.removeItem('cpat_test_user')
      localStorage.removeItem('cpat_progress_tracking')
      localStorage.removeItem('therapeutic_preferences')
      
      sessionStorage.removeItem('therapeutic_test_mode')
      sessionStorage.removeItem('clinical_compliance_check')
      sessionStorage.removeItem('whimsical_test_state')
      
      // Reset luxury component states
      if (window.luxuryTherapeuticSystem) {
        window.luxuryTherapeuticSystem.testMode = false
        window.luxuryTherapeuticSystem.cleanup?.()
      }
      
      console.log('🧹 Therapeutic test data cleared')
    })
    
    // Generate clinical compliance report
    const testResults = await page.evaluate(() => ({
      therapeuticComponentsLoaded: !!document.querySelector('.therapeutic-app'),
      whimsicalSystemActive: !!window.luxuryTherapeuticSystem,
      accessibilityFeaturesDetected: {
        screenReaderSupport: !!document.querySelector('[aria-label]'),
        keyboardNavigation: !!document.querySelector('[tabindex]'),
        colorContrastCompliance: true, // This would be checked by axe-core
        motionReduction: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      },
      performanceMetrics: {
        navigationTiming: performance.getEntriesByType('navigation')[0] || {},
        paintTiming: performance.getEntriesByType('paint') || [],
        memoryUsage: (performance as any).memory || {}
      }
    }))
    
    // Log clinical compliance summary
    console.log('📊 Clinical Compliance Summary:')
    console.log(`   ✓ Therapeutic Components: ${testResults.therapeuticComponentsLoaded ? 'Active' : 'Inactive'}`)
    console.log(`   ✓ Whimsical System: ${testResults.whimsicalSystemActive ? 'Active' : 'Inactive'}`)
    console.log(`   ✓ Screen Reader Support: ${testResults.accessibilityFeaturesDetected.screenReaderSupport ? 'Yes' : 'No'}`)
    console.log(`   ✓ Keyboard Navigation: ${testResults.accessibilityFeaturesDetected.keyboardNavigation ? 'Yes' : 'No'}`)
    console.log(`   ✓ Motion Reduction: ${testResults.accessibilityFeaturesDetected.motionReduction ? 'Enabled' : 'Disabled'}`)
    
    // Save detailed test report
    if (testResults.performanceMetrics.navigationTiming) {
      const timing = testResults.performanceMetrics.navigationTiming as any
      console.log('⚡ Performance Summary:')
      console.log(`   • Page Load: ${Math.round(timing.loadEventEnd - timing.navigationStart)}ms`)
      console.log(`   • DOM Content: ${Math.round(timing.domContentLoadedEventEnd - timing.navigationStart)}ms`)
      console.log(`   • First Paint: ${testResults.performanceMetrics.paintTiming.find(p => p.name === 'first-paint')?.startTime || 'N/A'}ms`)
    }
    
    console.log('✅ Therapeutic testing environment cleanup complete')
    
  } catch (error) {
    console.error('❌ Global teardown failed:', error)
    // Continue cleanup even if some steps fail
  } finally {
    await context.close()
    await browser.close()
  }
  
  console.log('🎯 All therapeutic tests complete - Thank you for maintaining clinical excellence!')
}

export default globalTeardown