/**
 * Performance Monitoring Utilities for Luxury Therapeutic Design
 * Focuses on mobile optimization and 60fps animations
 */

export interface PerformanceMetrics {
  fcp: number // First Contentful Paint
  lcp: number // Largest Contentful Paint
  cls: number // Cumulative Layout Shift
  fid: number // First Input Delay
  ttfb: number // Time to First Byte
  fps: number // Current FPS
  memoryUsage: number // Memory usage in MB
  renderTime: number // Component render time
}

export interface MobileOptimizationReport {
  touchTargetSize: { passed: number; total: number }
  viewportConfiguration: boolean
  preventZoom: boolean
  touchCallouts: boolean
  textSizeAdjust: boolean
  tapHighlight: boolean
  performanceScore: number
  recommendations: string[]
}

class TherapeuticPerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {}
  private observers: PerformanceObserver[] = []
  private rafId: number | null = null
  private frameCount = 0
  private lastFrameTime = 0
  private fpsHistory: number[] = []

  constructor() {
    this.initializeObservers()
    this.startFPSMonitoring()
  }

  private initializeObservers() {
    // Core Web Vitals observer
    if ('PerformanceObserver' in window) {
      // First Contentful Paint & Largest Contentful Paint
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint') {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.fcp = entry.startTime
            }
          } else if (entry.entryType === 'largest-contentful-paint') {
            this.metrics.lcp = entry.startTime
          }
        }
      })
      
      try {
        paintObserver.observe({ type: 'paint', buffered: true })
        paintObserver.observe({ type: 'largest-contentful-paint', buffered: true })
        this.observers.push(paintObserver)
      } catch {
        console.warn('Paint observer not supported')
      }

      // Layout Shift observer
      const layoutShiftObserver = new PerformanceObserver((list) => {
        let cls = 0
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            cls += (entry as any).value
          }
        }
        this.metrics.cls = cls
      })

      try {
        layoutShiftObserver.observe({ type: 'layout-shift', buffered: true })
        this.observers.push(layoutShiftObserver)
      } catch (e) {
        console.warn('Layout shift observer not supported')
      }

      // First Input Delay observer
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.fid = (entry as any).processingStart - entry.startTime
        }
      })

      try {
        fidObserver.observe({ type: 'first-input', buffered: true })
        this.observers.push(fidObserver)
      } catch (e) {
        console.warn('First input observer not supported')
      }
    }

    // Navigation timing for TTFB
    if (performance.timing) {
      this.metrics.ttfb = performance.timing.responseStart - performance.timing.requestStart
    }

    // Memory usage (if available)
    this.updateMemoryUsage()
  }

  private startFPSMonitoring() {
    const measureFPS = (currentTime: number) => {
      if (this.lastFrameTime > 0) {
        const delta = currentTime - this.lastFrameTime
        const fps = 1000 / delta
        this.fpsHistory.push(fps)
        
        // Keep only last 60 frames for averaging
        if (this.fpsHistory.length > 60) {
          this.fpsHistory.shift()
        }
        
        this.metrics.fps = this.fpsHistory.reduce((sum, fps) => sum + fps, 0) / this.fpsHistory.length
      }
      
      this.lastFrameTime = currentTime
      this.frameCount++
      this.rafId = requestAnimationFrame(measureFPS)
    }
    
    this.rafId = requestAnimationFrame(measureFPS)
  }

  private updateMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      this.metrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024 // Convert to MB
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    this.updateMemoryUsage()
    return { ...this.metrics }
  }

  public getPerformanceScore(): number {
    const metrics = this.getMetrics()
    let score = 100

    // Deduct points based on Core Web Vitals thresholds
    if (metrics.fcp && metrics.fcp > 1800) score -= 15
    if (metrics.lcp && metrics.lcp > 2500) score -= 20
    if (metrics.cls && metrics.cls > 0.1) score -= 15
    if (metrics.fid && metrics.fid > 100) score -= 20
    if (metrics.fps && metrics.fps < 55) score -= 10

    return Math.max(0, score)
  }

  public measureComponentRenderTime<T>(component: () => T): T {
    const start = performance.now()
    const result = component()
    const end = performance.now()
    this.metrics.renderTime = end - start
    return result
  }

  public auditMobileOptimization(): MobileOptimizationReport {
    const report: MobileOptimizationReport = {
      touchTargetSize: { passed: 0, total: 0 },
      viewportConfiguration: false,
      preventZoom: false,
      touchCallouts: false,
      textSizeAdjust: false,
      tapHighlight: false,
      performanceScore: this.getPerformanceScore(),
      recommendations: []
    }

    // Check touch target sizes
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea')
    interactiveElements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      const size = Math.min(rect.width, rect.height)
      report.touchTargetSize.total++
      if (size >= 44) {
        report.touchTargetSize.passed++
      }
    })

    // Check viewport configuration
    const viewportMeta = document.querySelector('meta[name="viewport"]')
    if (viewportMeta && viewportMeta.getAttribute('content')?.includes('width=device-width')) {
      report.viewportConfiguration = true
    }

    // Check zoom prevention
    if (viewportMeta && viewportMeta.getAttribute('content')?.includes('user-scalable=no')) {
      report.preventZoom = true
    }

    // Check CSS properties for mobile optimization
    const computedStyle = getComputedStyle(document.body)
    
    if (computedStyle.getPropertyValue('-webkit-text-size-adjust') === '100%') {
      report.textSizeAdjust = true
    }

    if (computedStyle.getPropertyValue('-webkit-tap-highlight-color') !== 'rgba(0, 0, 0, 0)') {
      report.tapHighlight = true
    }

    // Generate recommendations
    if (report.touchTargetSize.passed / report.touchTargetSize.total < 0.8) {
      report.recommendations.push('Increase touch target sizes to minimum 44px')
    }

    if (!report.viewportConfiguration) {
      report.recommendations.push('Add proper viewport meta tag')
    }

    if (this.metrics.fps && this.metrics.fps < 55) {
      report.recommendations.push('Optimize animations to maintain 60fps')
    }

    if (this.metrics.cls && this.metrics.cls > 0.1) {
      report.recommendations.push('Reduce layout shifts for better stability')
    }

    if (!report.textSizeAdjust) {
      report.recommendations.push('Set -webkit-text-size-adjust to prevent text scaling')
    }

    return report
  }

  public startPerformanceProfiler(duration: number = 5000): Promise<PerformanceMetrics> {
    return new Promise((resolve) => {
      const startTime = performance.now()
      // Initial state is captured for potential future use

      setTimeout(() => {
        const endTime = performance.now()
        const finalMetrics = this.getMetrics()

        resolve({
          fcp: finalMetrics.fcp || 0,
          lcp: finalMetrics.lcp || 0,
          cls: finalMetrics.cls || 0,
          fid: finalMetrics.fid || 0,
          ttfb: finalMetrics.ttfb || 0,
          fps: finalMetrics.fps || 0,
          memoryUsage: finalMetrics.memoryUsage || 0,
          renderTime: endTime - startTime
        })
      }, duration)
    })
  }

  public optimizeForMobile() {
    // Add viewport meta tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta')
      viewport.name = 'viewport'
      viewport.content = 'width=device-width, initial-scale=1.0, user-scalable=no'
      document.head.appendChild(viewport)
    }

    // Add mobile-specific CSS optimizations
    const mobileStyles = document.createElement('style')
    mobileStyles.textContent = `
      /* Therapeutic Mobile Optimizations */
      * {
        -webkit-tap-highlight-color: rgba(143, 166, 142, 0.2);
        -webkit-touch-callout: none;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      /* Optimize scrolling */
      body {
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
      }

      /* Improve touch responsiveness */
      button, a, input, select, textarea {
        touch-action: manipulation;
        min-height: 44px;
        min-width: 44px;
      }

      /* GPU acceleration for therapeutic animations */
      .therapeutic-card,
      .therapeutic-button,
      .therapeutic-progress {
        transform: translateZ(0);
        backface-visibility: hidden;
        will-change: transform;
      }
    `
    document.head.appendChild(mobileStyles)
  }

  public dispose() {
    // Clean up observers
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []

    // Stop FPS monitoring
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }
}

// Singleton instance
let performanceMonitor: TherapeuticPerformanceMonitor | null = null

export function getPerformanceMonitor(): TherapeuticPerformanceMonitor {
  if (!performanceMonitor) {
    performanceMonitor = new TherapeuticPerformanceMonitor()
  }
  return performanceMonitor
}

// React hook for performance monitoring
export function usePerformanceMonitor() {
  const monitor = getPerformanceMonitor()
  
  return {
    getMetrics: () => monitor.getMetrics(),
    getPerformanceScore: () => monitor.getPerformanceScore(),
    auditMobileOptimization: () => monitor.auditMobileOptimization(),
    measureComponentRenderTime: <T>(component: () => T) => monitor.measureComponentRenderTime(component),
    startProfiler: (duration?: number) => monitor.startPerformanceProfiler(duration)
  }
}

// Utility functions for therapeutic performance
export function isHighPerformanceDevice(): boolean {
  // Check for hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency >= 4) {
    return true
  }

  // Check for memory
  if ('memory' in performance && (performance as any).memory.jsHeapSizeLimit > 1024 * 1024 * 1024) {
    return true
  }

  // Check connection type
  if ('connection' in navigator) {
    const connection = (navigator as any).connection
    if (connection && (connection.effectiveType === '4g' || connection.downlink > 10)) {
      return true
    }
  }

  return false
}

export function getOptimalAnimationSettings() {
  const isHighPerf = isHighPerformanceDevice()
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  return {
    enableComplexAnimations: isHighPerf && !prefersReducedMotion,
    animationDuration: isHighPerf ? 'normal' : 'fast',
    useGPUAcceleration: isHighPerf,
    maxConcurrentAnimations: isHighPerf ? 10 : 5,
    enableParallax: isHighPerf && !prefersReducedMotion
  }
}