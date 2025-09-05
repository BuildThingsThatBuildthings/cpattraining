/**
 * Clinical-Grade Performance Monitoring System
 * Ensures therapeutic luxury interactions maintain clinical performance standards
 * Implements Web Vitals tracking, performance budgets, and real-time optimization
 */

// Web Vitals and Core Performance Metrics
interface WebVitals {
  CLS: number; // Cumulative Layout Shift
  FID: number; // First Input Delay
  FCP: number; // First Contentful Paint
  LCP: number; // Largest Contentful Paint
  TTFB: number; // Time to First Byte
  TTI: number; // Time to Interactive
  TBT: number; // Total Blocking Time
  FMP: number; // First Meaningful Paint
}

// Performance Budget Thresholds for Clinical Environments
interface PerformanceBudget {
  maxLCP: number; // 1000ms for clinical standards
  maxFID: number; // 50ms for immediate response
  maxCLS: number; // 0.1 for visual stability
  maxTTI: number; // 2000ms for interactivity
  maxBundleSize: number; // 250KB gzipped
  maxImageSize: number; // 100KB per image
  maxFonts: number; // 2 font families max
  maxAnimationDuration: number; // 300ms for therapeutic calm
}

// Real-time Performance Alert
interface PerformanceAlert {
  type: 'budget_exceeded' | 'animation_janky' | 'memory_leak' | 'critical_error';
  severity: 'low' | 'medium' | 'high' | 'critical';
  metric: string;
  threshold: number;
  actual: number;
  impact: string;
  recommendation: string;
  timestamp: number;
}

// Performance monitoring for luxury interactions
export class LuxuryPerformanceMonitor {
  private static instance: LuxuryPerformanceMonitor;
  private performanceEntries: Map<string, number[]> = new Map();
  private webVitals: Partial<WebVitals> = {};
  private performanceBudget: PerformanceBudget;
  private alerts: PerformanceAlert[] = [];
  private observers: Map<string, PerformanceObserver> = new Map();
  private resourceMetrics: Map<string, any> = new Map();
  private animationFrameTimings: number[] = [];
  private isEnabled: boolean = true;
  private alertCallbacks: ((alert: PerformanceAlert) => void)[] = [];

  static getInstance(): LuxuryPerformanceMonitor {
    if (!LuxuryPerformanceMonitor.instance) {
      LuxuryPerformanceMonitor.instance = new LuxuryPerformanceMonitor();
    }
    return LuxuryPerformanceMonitor.instance;
  }

  constructor() {
    // Always monitor in clinical environments, but with different reporting levels
    this.isEnabled = true;
    
    // Clinical-grade performance budgets
    this.performanceBudget = {
      maxLCP: 1000, // 1s for clinical immediacy
      maxFID: 50, // 50ms for therapeutic responsiveness
      maxCLS: 0.1, // Minimal layout shift for patient comfort
      maxTTI: 2000, // 2s max for full interactivity
      maxBundleSize: 250000, // 250KB gzipped
      maxImageSize: 100000, // 100KB per image
      maxFonts: 2, // Minimal font loading
      maxAnimationDuration: 300 // Calm, non-distracting animations
    };

    this.initializeWebVitalsTracking();
    this.startMemoryMonitoring();
    this.initializeResourceTracking();
  }

  // Initialize Web Vitals tracking with clinical-grade monitoring
  private initializeWebVitalsTracking() {
    if (!('PerformanceObserver' in window)) return;

    // Track Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      this.webVitals.LCP = lastEntry.startTime;
      
      if (this.webVitals.LCP! > this.performanceBudget.maxLCP) {
        this.triggerAlert({
          type: 'budget_exceeded',
          severity: 'high',
          metric: 'LCP',
          threshold: this.performanceBudget.maxLCP,
          actual: this.webVitals.LCP!,
          impact: 'Delayed therapeutic content visibility',
          recommendation: 'Optimize critical rendering path and reduce resource loading',
          timestamp: Date.now()
        });
      }
    });
    
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.set('lcp', lcpObserver);

    // Track First Input Delay (FID)
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        this.webVitals.FID = entry.processingStart - entry.startTime;
        
        if (this.webVitals.FID! > this.performanceBudget.maxFID) {
          this.triggerAlert({
            type: 'budget_exceeded',
            severity: 'critical',
            metric: 'FID',
            threshold: this.performanceBudget.maxFID,
            actual: this.webVitals.FID!,
            impact: 'Delayed response to therapeutic interactions',
            recommendation: 'Reduce JavaScript execution time and optimize event handlers',
            timestamp: Date.now()
          });
        }
      });
    });
    
    fidObserver.observe({ entryTypes: ['first-input'] });
    this.observers.set('fid', fidObserver);

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      this.webVitals.CLS = clsValue;
      
      if (this.webVitals.CLS! > this.performanceBudget.maxCLS) {
        this.triggerAlert({
          type: 'budget_exceeded',
          severity: 'medium',
          metric: 'CLS',
          threshold: this.performanceBudget.maxCLS,
          actual: this.webVitals.CLS!,
          impact: 'Visual instability affecting patient focus',
          recommendation: 'Reserve space for dynamic content and avoid layout shifts',
          timestamp: Date.now()
        });
      }
    });
    
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    this.observers.set('cls', clsObserver);

    // Track navigation timing
    this.trackNavigationTiming();
  }

  // Track enhanced animation performance with frame timing
  trackAnimation(name: string, startTime: number, endTime: number, frameCount: number = 1) {
    if (!this.isEnabled) return;

    const duration = endTime - startTime;
    const fps = frameCount / (duration / 1000);
    
    if (!this.performanceEntries.has(name)) {
      this.performanceEntries.set(name, []);
    }
    
    const entries = this.performanceEntries.get(name)!;
    entries.push(duration);
    
    // Keep only last 20 entries for better trend analysis
    if (entries.length > 20) {
      entries.shift();
    }

    // Clinical-grade animation performance checks
    if (duration > 16.67) { // 60fps threshold
      this.triggerAlert({
        type: 'animation_janky',
        severity: fps < 30 ? 'critical' : 'medium',
        metric: `animation_${name}`,
        threshold: 16.67,
        actual: duration,
        impact: `Janky animation (${fps.toFixed(1)} fps) may disrupt therapeutic experience`,
        recommendation: 'Use transform and opacity properties, enable GPU acceleration',
        timestamp: Date.now()
      });
    }

    // Track frame timing for this animation
    this.animationFrameTimings.push(duration);
    if (this.animationFrameTimings.length > 100) {
      this.animationFrameTimings.shift();
    }
  }

  // Initialize resource tracking
  private initializeResourceTracking() {
    if (!('PerformanceObserver' in window)) return;

    const resourceObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        const size = entry.transferSize || entry.encodedBodySize || 0;
        const type = this.getResourceType(entry.name);
        
        this.resourceMetrics.set(entry.name, {
          size,
          duration: entry.duration,
          type,
          timestamp: entry.startTime
        });

        // Check image size budgets
        if (type === 'image' && size > this.performanceBudget.maxImageSize) {
          this.triggerAlert({
            type: 'budget_exceeded',
            severity: 'medium',
            metric: 'image_size',
            threshold: this.performanceBudget.maxImageSize,
            actual: size,
            impact: 'Large images slow therapeutic content loading',
            recommendation: 'Optimize images: WebP format, responsive sizes, lazy loading',
            timestamp: Date.now()
          });
        }
      });
    });

    resourceObserver.observe({ entryTypes: ['resource'] });
    this.observers.set('resource', resourceObserver);
  }

  // Track navigation timing for TTFB and other metrics
  private trackNavigationTiming() {
    if (!('navigation' in performance)) return;

    const navTiming = performance.getEntriesByType('navigation')[0] as any;
    if (navTiming) {
      this.webVitals.TTFB = navTiming.responseStart - navTiming.fetchStart;
      this.webVitals.FCP = navTiming.loadEventEnd - navTiming.fetchStart;
      this.webVitals.TTI = navTiming.domInteractive - navTiming.fetchStart;
    }
  }

  // Start memory monitoring for leak detection
  private startMemoryMonitoring() {
    if (!('memory' in performance)) return;

    let lastMemoryUsage = (performance as any).memory?.usedJSHeapSize || 0;
    
    setInterval(() => {
      const currentMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryDelta = currentMemory - lastMemoryUsage;
      
      // Detect potential memory leaks (consistent growth over 5MB)
      if (memoryDelta > 5 * 1024 * 1024) {
        this.triggerAlert({
          type: 'memory_leak',
          severity: 'high',
          metric: 'memory_growth',
          threshold: 5 * 1024 * 1024,
          actual: memoryDelta,
          impact: 'Potential memory leak affecting application stability',
          recommendation: 'Review animation cleanup and component unmounting',
          timestamp: Date.now()
        });
      }
      
      lastMemoryUsage = currentMemory;
    }, 30000); // Check every 30 seconds
  }

  // Get comprehensive performance statistics
  getStats(animationName?: string) {
    if (!this.isEnabled) return null;

    if (animationName && this.performanceEntries.has(animationName)) {
      const entries = this.performanceEntries.get(animationName)!;
      const avg = entries.reduce((a, b) => a + b, 0) / entries.length;
      const max = Math.max(...entries);
      const min = Math.min(...entries);
      const p95 = this.calculatePercentile(entries, 95);
      const fps = entries.map(duration => 1000 / duration);
      const avgFps = fps.reduce((a, b) => a + b, 0) / fps.length;
      
      return { 
        name: animationName, 
        average: avg, 
        max, 
        min, 
        p95,
        count: entries.length,
        avgFps,
        budgetCompliance: avg <= this.performanceBudget.maxAnimationDuration
      };
    }

    // Return comprehensive performance overview
    const animationStats: any[] = [];
    this.performanceEntries.forEach((entries, name) => {
      const avg = entries.reduce((a, b) => a + b, 0) / entries.length;
      const max = Math.max(...entries);
      const min = Math.min(...entries);
      const p95 = this.calculatePercentile(entries, 95);
      animationStats.push({ 
        name, 
        average: avg, 
        max, 
        min, 
        p95,
        count: entries.length,
        budgetCompliance: avg <= this.performanceBudget.maxAnimationDuration
      });
    });
    
    return {
      animations: animationStats,
      webVitals: this.webVitals,
      budgetCompliance: this.calculateBudgetCompliance(),
      alerts: this.alerts.slice(-10), // Last 10 alerts
      resourceMetrics: Array.from(this.resourceMetrics.entries()).slice(-20),
      memoryUsage: this.getMemoryUsage(),
      frameTimingStats: this.calculateFrameTimingStats()
    };
  }

  // Trigger performance alert
  private triggerAlert(alert: PerformanceAlert) {
    this.alerts.push(alert);
    
    // Keep only last 50 alerts to prevent memory issues
    if (this.alerts.length > 50) {
      this.alerts.shift();
    }

    // Notify registered callbacks
    this.alertCallbacks.forEach(callback => {
      try {
        callback(alert);
      } catch (error) {
        console.warn('Error in performance alert callback:', error);
      }
    });

    // Console logging based on severity
    if (alert.severity === 'critical') {
      console.error(`🚨 Critical Performance Issue: ${alert.metric}`, alert);
    } else if (alert.severity === 'high') {
      console.warn(`⚠️ High Performance Issue: ${alert.metric}`, alert);
    } else if (process.env.NODE_ENV === 'development') {
      console.info(`ℹ️ Performance Notice: ${alert.metric}`, alert);
    }
  }

  // Register alert callback
  onAlert(callback: (alert: PerformanceAlert) => void) {
    this.alertCallbacks.push(callback);
    return () => {
      const index = this.alertCallbacks.indexOf(callback);
      if (index > -1) {
        this.alertCallbacks.splice(index, 1);
      }
    };
  }

  // Calculate budget compliance percentage
  private calculateBudgetCompliance(): { score: number; details: any } {
    const checks = [
      { metric: 'LCP', actual: this.webVitals.LCP || 0, budget: this.performanceBudget.maxLCP },
      { metric: 'FID', actual: this.webVitals.FID || 0, budget: this.performanceBudget.maxFID },
      { metric: 'CLS', actual: this.webVitals.CLS || 0, budget: this.performanceBudget.maxCLS },
      { metric: 'TTI', actual: this.webVitals.TTI || 0, budget: this.performanceBudget.maxTTI }
    ];

    let passedChecks = 0;
    const details: any = {};

    checks.forEach(check => {
      const passed = check.actual <= check.budget;
      if (passed) passedChecks++;
      details[check.metric] = {
        passed,
        actual: check.actual,
        budget: check.budget,
        compliance: (check.budget / Math.max(check.actual, 1)) * 100
      };
    });

    return {
      score: (passedChecks / checks.length) * 100,
      details
    };
  }

  // Calculate percentile for performance data
  private calculatePercentile(values: number[], percentile: number): number {
    const sorted = values.slice().sort((a, b) => a - b);
    const index = (percentile / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index % 1;
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  }

  // Get current memory usage
  private getMemoryUsage() {
    if (!('memory' in performance)) return null;
    
    const memory = (performance as any).memory;
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
      usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
    };
  }

  // Calculate frame timing statistics
  private calculateFrameTimingStats() {
    if (this.animationFrameTimings.length === 0) return null;

    const timings = this.animationFrameTimings;
    const fps = timings.map(timing => 1000 / timing);
    
    return {
      averageFrameTime: timings.reduce((a, b) => a + b, 0) / timings.length,
      averageFPS: fps.reduce((a, b) => a + b, 0) / fps.length,
      p95FrameTime: this.calculatePercentile(timings, 95),
      p99FrameTime: this.calculatePercentile(timings, 99),
      droppedFrames: timings.filter(timing => timing > 16.67).length,
      smoothnessScore: (timings.filter(timing => timing <= 16.67).length / timings.length) * 100
    };
  }

  // Get resource type from URL
  private getResourceType(url: string): string {
    const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];
    const fontExts = ['.woff', '.woff2', '.ttf', '.eot'];
    const scriptExts = ['.js', '.mjs', '.jsx', '.ts', '.tsx'];
    const styleExts = ['.css', '.scss', '.sass'];
    
    const lowerUrl = url.toLowerCase();
    
    if (imageExts.some(ext => lowerUrl.includes(ext))) return 'image';
    if (fontExts.some(ext => lowerUrl.includes(ext))) return 'font';
    if (scriptExts.some(ext => lowerUrl.includes(ext))) return 'script';
    if (styleExts.some(ext => lowerUrl.includes(ext))) return 'style';
    
    return 'other';
  }

  // Generate performance report
  generateReport(): string {
    const stats = this.getStats();
    if (!stats) return 'Performance monitoring disabled';

    const report = [
      '🏥 Clinical Performance Report',
      '================================',
      '',
      '📊 Web Vitals:',
      `  LCP: ${this.webVitals.LCP?.toFixed(2) || 'N/A'}ms (budget: ${this.performanceBudget.maxLCP}ms)`,
      `  FID: ${this.webVitals.FID?.toFixed(2) || 'N/A'}ms (budget: ${this.performanceBudget.maxFID}ms)`,
      `  CLS: ${this.webVitals.CLS?.toFixed(3) || 'N/A'} (budget: ${this.performanceBudget.maxCLS})`,
      `  TTI: ${this.webVitals.TTI?.toFixed(2) || 'N/A'}ms (budget: ${this.performanceBudget.maxTTI}ms)`,
      '',
      `🎯 Budget Compliance: ${(stats.budgetCompliance as any)?.score?.toFixed(1) || 'N/A'}%`,
      '',
      `🚨 Active Alerts: ${this.alerts.filter(a => Date.now() - a.timestamp < 300000).length}`,
      '',
      '🎬 Animation Performance:',
      ...(stats.animations || []).map((anim: any) => 
        `  ${anim.name}: ${anim.average.toFixed(2)}ms avg (${anim.budgetCompliance ? '✅' : '❌'} budget)`
      ),
      '',
      `🧠 Memory Usage: ${stats.memoryUsage ? 
        `${(stats.memoryUsage.usagePercentage).toFixed(1)}%` : 'N/A'}`,
      '',
      `🎯 Frame Timing: ${stats.frameTimingStats ? 
        `${stats.frameTimingStats.smoothnessScore.toFixed(1)}% smooth` : 'N/A'}`
    ];

    return report.join('\n');
  }

  // Clear performance data
  clear() {
    this.performanceEntries.clear();
    this.webVitals = {};
    this.alerts = [];
    this.resourceMetrics.clear();
    this.animationFrameTimings = [];
  }

  // Destroy observers and cleanup
  destroy() {
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn('Error disconnecting performance observer:', error);
      }
    });
    this.observers.clear();
    this.alertCallbacks = [];
    this.clear();
  }
}

// Optimized requestAnimationFrame wrapper
export const optimizedRaf = (() => {
  let rafId: number;
  let callbacks: (() => void)[] = [];

  const flushCallbacks = () => {
    const currentCallbacks = callbacks.slice();
    callbacks = [];
    
    currentCallbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.warn('Error in luxury animation callback:', error);
      }
    });
  };

  return (callback: () => void) => {
    callbacks.push(callback);
    
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        flushCallbacks();
        rafId = 0;
      });
    }
  };
})();

// Debounced interaction handler for luxury effects
export const debouncedLuxuryEffect = (() => {
  const timeouts = new Map<string, number>();

  return (key: string, callback: () => void, delay: number = 150) => {
    const existingTimeout = timeouts.get(key);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    const timeoutId = window.setTimeout(() => {
      callback();
      timeouts.delete(key);
    }, delay);

    timeouts.set(key, timeoutId);
  };
})();

// Intersection Observer for performance-aware animations
export const createLuxuryIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null => {
  if (!('IntersectionObserver' in window)) {
    return null;
  }

  const defaultOptions = {
    root: null,
    rootMargin: '10px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// CSS Transform optimization helper
export const optimizeTransform = (element: HTMLElement, properties: Record<string, string | number>) => {
  // Combine transforms into single property for better performance
  const transforms: string[] = [];
  
  if (properties.translateX !== undefined) transforms.push(`translateX(${properties.translateX})`);
  if (properties.translateY !== undefined) transforms.push(`translateY(${properties.translateY})`);
  if (properties.translateZ !== undefined) transforms.push(`translateZ(${properties.translateZ})`);
  if (properties.scale !== undefined) transforms.push(`scale(${properties.scale})`);
  if (properties.rotate !== undefined) transforms.push(`rotate(${properties.rotate})`);
  if (properties.skew !== undefined) transforms.push(`skew(${properties.skew})`);

  if (transforms.length > 0) {
    element.style.transform = transforms.join(' ');
    
    // Enable hardware acceleration for better performance
    if (!element.style.willChange.includes('transform')) {
      element.style.willChange = element.style.willChange 
        ? `${element.style.willChange}, transform` 
        : 'transform';
    }
  }
};

// Memory-efficient animation cleanup
export const createLuxuryAnimationCleanup = () => {
  const cleanupTasks: (() => void)[] = [];

  const addCleanup = (task: () => void) => {
    cleanupTasks.push(task);
  };

  const cleanup = () => {
    cleanupTasks.forEach(task => {
      try {
        task();
      } catch (error) {
        console.warn('Error during luxury animation cleanup:', error);
      }
    });
    cleanupTasks.length = 0;
  };

  return { addCleanup, cleanup };
};

// Performance-aware luxury effect scheduler
export const scheduleLuxuryEffect = (
  effect: () => void,
  priority: 'high' | 'normal' | 'low' = 'normal'
) => {
  const monitor = LuxuryPerformanceMonitor.getInstance();
  const startTime = performance.now();

  const wrappedEffect = () => {
    try {
      effect();
    } finally {
      const endTime = performance.now();
      monitor.trackAnimation('scheduled-effect', startTime, endTime);
    }
  };

  switch (priority) {
    case 'high':
      // Immediate execution for critical therapeutic interactions
      wrappedEffect();
      break;
    case 'normal':
      // Standard RAF scheduling
      optimizedRaf(wrappedEffect);
      break;
    case 'low':
      // Defer until browser is idle
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(wrappedEffect, { timeout: 1000 });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(wrappedEffect, 0);
      }
      break;
  }
};

// Clinical-grade animation validator
export const validateClinicalMotion = (
  animationName: string,
  duration: number,
  properties: string[]
): { isValid: boolean; warnings: string[] } => {
  const warnings: string[] = [];
  let isValid = true;

  // Check duration limits (clinical environments prefer shorter, less distracting animations)
  if (duration > 500) {
    warnings.push(`Animation "${animationName}" duration (${duration}ms) exceeds clinical recommendation (500ms max)`);
    isValid = false;
  }

  // Check for potentially distracting properties
  const distractingProperties = ['rotate', 'skew', 'scale'];
  const foundDistracting = properties.filter(prop => 
    distractingProperties.some(d => prop.includes(d))
  );

  if (foundDistracting.length > 0) {
    warnings.push(`Animation "${animationName}" uses potentially distracting properties: ${foundDistracting.join(', ')}`);
  }

  // Check for proper easing (clinical environments prefer ease-out for calming effect)
  // This would need to be checked at the CSS level, but we can provide guidance
  
  return { isValid, warnings };
};

// Export singleton instance
export const luxuryPerformance = LuxuryPerformanceMonitor.getInstance();

// Development helper to log performance stats
if (process.env.NODE_ENV === 'development') {
  (window as any).luxuryPerformance = luxuryPerformance;
  console.log('🎭 Luxury Performance Monitor available at window.luxuryPerformance');
}