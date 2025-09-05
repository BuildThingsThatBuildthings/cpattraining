import { test, expect, Page } from '@playwright/test'

/**
 * Performance testing for luxury therapeutic components
 * Ensuring optimal user experience with Web Vitals compliance
 */

interface PerformanceMetrics {
  loadTime: number
  domContentLoaded: number
  firstPaint: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
  totalBlockingTime: number
  memoryUsage?: {
    usedJSHeapSize: number
    totalJSHeapSize: number
    jsHeapSizeLimit: number
  }
}

async function measurePagePerformance(page: Page): Promise<PerformanceMetrics> {
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const paint = performance.getEntriesByType('paint')
    
    // Get Web Vitals metrics
    return new Promise<PerformanceMetrics>((resolve) => {
      const metrics: Partial<PerformanceMetrics> = {
        loadTime: navigation.loadEventEnd - navigation.navigationStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0,
        firstInputDelay: 0,
        totalBlockingTime: 0
      }
      
      // Add memory usage if available
      if ('memory' in performance) {
        const memory = (performance as any).memory
        metrics.memoryUsage = {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit
        }
      }
      
      // Use Web Vitals library if available
      if (window.webVitals) {
        let vitalsCollected = 0
        const expectedVitals = 3 // LCP, FID, CLS
        
        window.webVitals.getLCP((metric) => {
          metrics.largestContentfulPaint = metric.value
          vitalsCollected++
          if (vitalsCollected >= expectedVitals) resolve(metrics as PerformanceMetrics)
        })
        
        window.webVitals.getFID((metric) => {
          metrics.firstInputDelay = metric.value
          vitalsCollected++
          if (vitalsCollected >= expectedVitals) resolve(metrics as PerformanceMetrics)
        })
        
        window.webVitals.getCLS((metric) => {
          metrics.cumulativeLayoutShift = metric.value
          vitalsCollected++
          if (vitalsCollected >= expectedVitals) resolve(metrics as PerformanceMetrics)
        })
        
        // Fallback timeout
        setTimeout(() => resolve(metrics as PerformanceMetrics), 3000)
      } else {
        // Immediate resolution if Web Vitals not available
        resolve(metrics as PerformanceMetrics)
      }
    })
  })
  
  return metrics
}

async function measureInteractionPerformance(page: Page, selector: string): Promise<number> {
  const startTime = await page.evaluate(() => performance.now())
  
  await page.click(selector)
  
  const endTime = await page.evaluate(() => performance.now())
  
  return endTime - startTime
}

test.describe('Luxury Component Performance Standards', () => {
  
  test('Training welcome page meets luxury performance standards', async ({ page }) => {
    await page.goto('/training')
    await page.waitForLoadState('networkidle')
    
    const metrics = await measurePagePerformance(page)
    
    // Luxury standards (stricter than typical web apps)
    expect(metrics.loadTime).toBeLessThan(2000) // 2 seconds max
    expect(metrics.domContentLoaded).toBeLessThan(1500) // 1.5 seconds DOM
    expect(metrics.firstPaint).toBeLessThan(1000) // 1 second first paint
    expect(metrics.firstContentfulPaint).toBeLessThan(1200) // 1.2 seconds FCP
    
    // Web Vitals compliance
    if (metrics.largestContentfulPaint > 0) {
      expect(metrics.largestContentfulPaint).toBeLessThan(2500) // LCP under 2.5s
    }
    
    if (metrics.cumulativeLayoutShift > 0) {
      expect(metrics.cumulativeLayoutShift).toBeLessThan(0.1) // CLS under 0.1
    }
    
    if (metrics.firstInputDelay > 0) {
      expect(metrics.firstInputDelay).toBeLessThan(100) // FID under 100ms
    }
    
    // Memory usage should be reasonable for luxury components
    if (metrics.memoryUsage) {
      expect(metrics.memoryUsage.usedJSHeapSize).toBeLessThan(100 * 1024 * 1024) // 100MB max
    }
    
    console.log('📊 Training Welcome Performance:', {
      loadTime: `${metrics.loadTime}ms`,
      fcp: `${metrics.firstContentfulPaint}ms`,
      lcp: `${metrics.largestContentfulPaint}ms`,
      cls: metrics.cumulativeLayoutShift.toFixed(3),
      memory: metrics.memoryUsage ? `${(metrics.memoryUsage.usedJSHeapSize / 1024 / 1024).toFixed(1)}MB` : 'N/A'
    })
  })

  test('Module cards render efficiently with luxury effects', async ({ page }) => {
    // Set up user with progress to load all modules
    await page.evaluate(() => {
      localStorage.setItem('cpat_progress', JSON.stringify({
        safetyAcknowledged: true,
        completedModules: ['01-light-color-fundamentals'],
        currentModule: '02-therapeutic-mechanisms'
      }))
    })
    
    await page.goto('/training/journey')
    await page.waitForLoadState('networkidle')
    
    // Wait for whimsical enhancements to load
    await page.waitForSelector('[data-whimsy-ready="true"]', { timeout: 5000 })
    
    const metrics = await measurePagePerformance(page)
    
    // Module-heavy page should still meet performance standards
    expect(metrics.loadTime).toBeLessThan(2500) // Slightly more lenient for complex page
    expect(metrics.firstContentfulPaint).toBeLessThan(1500)
    
    // Test individual module card interaction performance
    const moduleCards = page.locator('.module-card')
    const cardCount = await moduleCards.count()
    
    expect(cardCount).toBe(6) // Should have 6 modules
    
    // Test hover performance on each card
    for (let i = 0; i < Math.min(cardCount, 3); i++) { // Test first 3 cards
      const hoverTime = await page.evaluate(async (index) => {
        const card = document.querySelectorAll('.module-card')[index] as HTMLElement
        if (!card) return 0
        
        const startTime = performance.now()
        
        // Trigger hover event
        const hoverEvent = new MouseEvent('mouseenter', { bubbles: true })
        card.dispatchEvent(hoverEvent)
        
        // Wait for any animations to start
        await new Promise(resolve => setTimeout(resolve, 50))
        
        return performance.now() - startTime
      }, i)
      
      expect(hoverTime).toBeLessThan(50) // Hover response under 50ms
    }
    
    console.log('✨ Module Cards Performance: Luxury effects render smoothly')
  })

  test('Whimsical interactions perform within therapeutic standards', async ({ page }) => {
    await page.goto('/training')
    await page.waitForLoadState('networkidle')
    
    // Wait for whimsical system to initialize
    await page.waitForSelector('[data-whimsy-ready="true"]', { timeout: 10000 })
    
    // Test champagne button performance
    const champagneButtons = page.locator('[data-whimsy="champagne"], .therapeutic-button--champagne')
    const buttonCount = await champagneButtons.count()
    
    if (buttonCount > 0) {
      const interactionTime = await measureInteractionPerformance(page, '[data-whimsy="champagne"]:first-child, .therapeutic-button--champagne:first-child')
      
      // Therapeutic interactions should feel immediate
      expect(interactionTime).toBeLessThan(200) // Under 200ms for therapeutic UX
      
      // Verify celebration effects don't block UI
      const isResponsive = await page.evaluate(async () => {
        // Test UI responsiveness during celebration
        const startTime = performance.now()
        
        // Simulate additional interactions during celebration
        for (let i = 0; i < 5; i++) {
          const testDiv = document.createElement('div')
          document.body.appendChild(testDiv)
          document.body.removeChild(testDiv)
          await new Promise(resolve => requestAnimationFrame(resolve))
        }
        
        return performance.now() - startTime < 100 // Should complete quickly
      })
      
      expect(isResponsive).toBeTruthy()
      
      console.log(`🎉 Champagne interactions: ${interactionTime}ms response time`)
    }
  })

  test('Certificate generation performance with luxury animations', async ({ page }) => {
    // Set up completed user
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
        certificateEligible: true
      }))
    })
    
    await page.goto('/training/certificate')
    await page.waitForLoadState('networkidle')
    
    // Fill certificate form
    await page.fill('[name="fullName"]', 'Performance Test User')
    await page.fill('[name="credentials"]', 'MD')
    await page.fill('[name="organization"]', 'Test Healthcare')
    
    // Measure certificate generation performance
    const generateBtn = page.locator('[data-testid="generate-certificate-btn"]')
    await expect(generateBtn).toBeVisible()
    
    const generationStartTime = Date.now()
    
    await generateBtn.click()
    
    // Wait for certificate to be generated
    await page.waitForSelector('[data-testid="certificate-preview"]', { timeout: 10000 })
    
    const generationTime = Date.now() - generationStartTime
    
    // Certificate generation should complete within luxury standards
    expect(generationTime).toBeLessThan(5000) // 5 seconds max for complex generation
    
    // Verify celebration animations don't impact performance
    const celebrationElements = page.locator('.luxury-confetti, .champagne-celebration')
    const celebrationCount = await celebrationElements.count()
    
    if (celebrationCount > 0) {
      // Check that animations are smooth (no frame drops)
      const animationPerformance = await page.evaluate(() => {
        return new Promise((resolve) => {
          let frameCount = 0
          let lastFrameTime = performance.now()
          let maxFrameTime = 0
          
          function checkFrame() {
            const currentTime = performance.now()
            const frameTime = currentTime - lastFrameTime
            maxFrameTime = Math.max(maxFrameTime, frameTime)
            lastFrameTime = currentTime
            frameCount++
            
            if (frameCount < 60) { // Test 60 frames
              requestAnimationFrame(checkFrame)
            } else {
              resolve(maxFrameTime)
            }
          }
          
          requestAnimationFrame(checkFrame)
        })
      })
      
      // No frame should take longer than 33ms (30 FPS minimum)
      expect(animationPerformance).toBeLessThan(33)
    }
    
    console.log(`🎓 Certificate generation: ${generationTime}ms`)
  })

  test('Memory usage remains stable during extended use', async ({ page }) => {
    await page.goto('/training/journey')
    await page.waitForLoadState('networkidle')
    
    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory ? (performance as any).memory.usedJSHeapSize : 0
    })
    
    if (initialMemory === 0) {
      test.skip('Memory API not available in this browser')
      return
    }
    
    // Simulate extended usage by navigating through multiple pages
    const navigationSequence = [
      '/training',
      '/training/journey',
      '/training/module/01-light-color-fundamentals',
      '/training/journey',
      '/training/module/02-therapeutic-mechanisms',
      '/training/journey'
    ]
    
    for (const path of navigationSequence) {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1000) // Let components fully load
      
      // Interact with whimsical components
      const whimsicalElements = page.locator('[data-whimsy], .therapeutic-button, .module-card')
      const elementCount = await whimsicalElements.count()
      
      for (let i = 0; i < Math.min(elementCount, 3); i++) {
        try {
          await whimsicalElements.nth(i).hover({ timeout: 1000 })
          await page.waitForTimeout(200)
        } catch (error) {
          // Continue if element not interactable
        }
      }
    }
    
    // Force garbage collection if possible
    await page.evaluate(() => {
      if ('gc' in window) {
        (window as any).gc()
      }
    })
    
    await page.waitForTimeout(2000) // Allow GC to complete
    
    // Check final memory usage
    const finalMemory = await page.evaluate(() => {
      return (performance as any).memory.usedJSHeapSize
    })
    
    const memoryIncrease = finalMemory - initialMemory
    const memoryIncreasePercent = (memoryIncrease / initialMemory) * 100
    
    // Memory usage should not increase by more than 50% during normal use
    expect(memoryIncreasePercent).toBeLessThan(50)
    
    // Absolute memory usage should stay under 150MB
    expect(finalMemory).toBeLessThan(150 * 1024 * 1024)
    
    console.log(`💾 Memory usage: ${(initialMemory / 1024 / 1024).toFixed(1)}MB → ${(finalMemory / 1024 / 1024).toFixed(1)}MB (+${memoryIncreasePercent.toFixed(1)}%)`)
  })

  test('Network resource loading optimization', async ({ page }) => {
    // Monitor network requests
    const networkRequests: Array<{ url: string, size: number, duration: number }> = []
    
    page.on('response', async (response) => {
      const request = response.request()
      const size = (await response.body().catch(() => Buffer.alloc(0))).length
      const timing = response.timing()
      
      networkRequests.push({
        url: request.url(),
        size,
        duration: timing.responseEnd
      })
    })
    
    await page.goto('/training/journey')
    await page.waitForLoadState('networkidle')
    
    // Analyze network performance
    const totalSize = networkRequests.reduce((sum, req) => sum + req.size, 0)
    const jsRequests = networkRequests.filter(req => req.url.includes('.js'))
    const cssRequests = networkRequests.filter(req => req.url.includes('.css'))
    const imageRequests = networkRequests.filter(req => /\.(jpg|jpeg|png|gif|svg|webp)/.test(req.url))
    
    // Luxury standards for resource loading
    expect(totalSize).toBeLessThan(5 * 1024 * 1024) // Total payload under 5MB
    
    // JavaScript bundles should be reasonably sized
    const totalJSSize = jsRequests.reduce((sum, req) => sum + req.size, 0)
    expect(totalJSSize).toBeLessThan(2 * 1024 * 1024) // JS under 2MB
    
    // CSS should be optimized
    const totalCSSSize = cssRequests.reduce((sum, req) => sum + req.size, 0)
    expect(totalCSSSize).toBeLessThan(500 * 1024) // CSS under 500KB
    
    // Images should be optimized
    if (imageRequests.length > 0) {
      const averageImageSize = imageRequests.reduce((sum, req) => sum + req.size, 0) / imageRequests.length
      expect(averageImageSize).toBeLessThan(200 * 1024) // Average image under 200KB
    }
    
    console.log('📡 Network Performance:', {
      totalRequests: networkRequests.length,
      totalSize: `${(totalSize / 1024 / 1024).toFixed(2)}MB`,
      jsSize: `${(totalJSSize / 1024).toFixed(1)}KB`,
      cssSize: `${(totalCSSSize / 1024).toFixed(1)}KB`,
      images: imageRequests.length
    })
  })
})

test.describe('Therapeutic UX Performance Standards', () => {
  
  test('Breathing animations maintain 60fps', async ({ page }) => {
    await page.goto('/training')
    await page.waitForLoadState('networkidle')
    
    // Look for breathing animation elements
    const breathingElements = page.locator('.therapeutic-breathing, [data-animate="breathing"]')
    const count = await breathingElements.count()
    
    if (count > 0) {
      const animationPerformance = await page.evaluate(() => {
        return new Promise<{ avgFrameTime: number, maxFrameTime: number }>((resolve) => {
          let frameCount = 0
          let totalFrameTime = 0
          let lastFrameTime = performance.now()
          let maxFrameTime = 0
          
          function measureFrame() {
            const currentTime = performance.now()
            const frameTime = currentTime - lastFrameTime
            
            totalFrameTime += frameTime
            maxFrameTime = Math.max(maxFrameTime, frameTime)
            lastFrameTime = currentTime
            frameCount++
            
            if (frameCount < 120) { // Test 2 seconds at 60fps
              requestAnimationFrame(measureFrame)
            } else {
              resolve({
                avgFrameTime: totalFrameTime / frameCount,
                maxFrameTime
              })
            }
          }
          
          requestAnimationFrame(measureFrame)
        })
      })
      
      // Should maintain smooth 60fps (16.67ms per frame)
      expect(animationPerformance.avgFrameTime).toBeLessThan(20) // Allow some variance
      expect(animationPerformance.maxFrameTime).toBeLessThan(33) // No frame over 33ms (30fps)
      
      console.log(`🫁 Breathing animation performance: ${animationPerformance.avgFrameTime.toFixed(1)}ms avg frame time`)
    }
  })

  test('Page transitions feel therapeutic (not rushed)', async ({ page }) => {
    await page.goto('/training')
    await page.waitForLoadState('networkidle')
    
    const transitionTimes: number[] = []
    
    // Test several page transitions
    const transitions = [
      ['/training', '/training/safety'],
      ['/training/safety', '/training/journey'],
      ['/training/journey', '/training']
    ]
    
    for (const [from, to] of transitions) {
      await page.goto(from)
      await page.waitForLoadState('networkidle')
      
      const startTime = Date.now()
      await page.goto(to)
      await page.waitForLoadState('networkidle')
      const transitionTime = Date.now() - startTime
      
      transitionTimes.push(transitionTime)
      
      // Therapeutic transitions should not be too fast (jarring) or too slow (frustrating)
      expect(transitionTime).toBeGreaterThan(200) // At least 200ms for therapeutic feel
      expect(transitionTime).toBeLessThan(2000) // Under 2 seconds for responsiveness
    }
    
    const avgTransitionTime = transitionTimes.reduce((sum, time) => sum + time, 0) / transitionTimes.length
    console.log(`🧘 Average therapeutic transition time: ${avgTransitionTime.toFixed(0)}ms`)
  })
})