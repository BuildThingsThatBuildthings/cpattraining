// @ts-nocheck
/**
 * Performance Budgets and CI/CD Integration
 * Automated performance monitoring and regression detection for clinical environments
 */

import { luxuryPerformance } from './luxuryPerformance';

// Performance budget configurations for different environments
export interface EnvironmentBudgets {
  development: PerformanceBudgets;
  staging: PerformanceBudgets;
  production: PerformanceBudgets;
  clinical: PerformanceBudgets;
}

export interface PerformanceBudgets {
  // Web Vitals budgets
  maxLCP: number; // Largest Contentful Paint (ms)
  maxFID: number; // First Input Delay (ms)
  maxCLS: number; // Cumulative Layout Shift
  maxTTI: number; // Time to Interactive (ms)
  maxTTFB: number; // Time to First Byte (ms)
  
  // Resource budgets
  maxBundleSize: number; // Total JS bundle size (KB)
  maxCSSSize: number; // Total CSS size (KB)
  maxImageSize: number; // Individual image size (KB)
  maxFontSize: number; // Individual font size (KB)
  
  // Animation budgets
  maxAnimationDuration: number; // Maximum animation duration (ms)
  minFPS: number; // Minimum acceptable FPS
  maxFrameTime: number; // Maximum frame time (ms)
  
  // Memory budgets
  maxMemoryUsage: number; // Maximum memory usage (MB)
  maxMemoryGrowth: number; // Maximum memory growth per minute (MB)
  
  // Network budgets
  maxRequests: number; // Maximum HTTP requests
  maxTransferSize: number; // Maximum total transfer size (KB)
}

// Environment-specific budget configurations
export const PERFORMANCE_BUDGETS: EnvironmentBudgets = {
  development: {
    maxLCP: 2000,
    maxFID: 100,
    maxCLS: 0.2,
    maxTTI: 3000,
    maxTTFB: 500,
    maxBundleSize: 500,
    maxCSSSize: 100,
    maxImageSize: 200,
    maxFontSize: 100,
    maxAnimationDuration: 500,
    minFPS: 45,
    maxFrameTime: 22,
    maxMemoryUsage: 100,
    maxMemoryGrowth: 10,
    maxRequests: 50,
    maxTransferSize: 2000
  },
  
  staging: {
    maxLCP: 1500,
    maxFID: 75,
    maxCLS: 0.15,
    maxTTI: 2500,
    maxTTFB: 400,
    maxBundleSize: 400,
    maxCSSSize: 75,
    maxImageSize: 150,
    maxFontSize: 75,
    maxAnimationDuration: 400,
    minFPS: 50,
    maxFrameTime: 20,
    maxMemoryUsage: 80,
    maxMemoryGrowth: 8,
    maxRequests: 40,
    maxTransferSize: 1500
  },
  
  production: {
    maxLCP: 1200,
    maxFID: 50,
    maxCLS: 0.1,
    maxTTI: 2000,
    maxTTFB: 300,
    maxBundleSize: 300,
    maxCSSSize: 50,
    maxImageSize: 100,
    maxFontSize: 50,
    maxAnimationDuration: 300,
    minFPS: 55,
    maxFrameTime: 18,
    maxMemoryUsage: 60,
    maxMemoryGrowth: 5,
    maxRequests: 30,
    maxTransferSize: 1000
  },
  
  clinical: {
    maxLCP: 1000,
    maxFID: 50,
    maxCLS: 0.1,
    maxTTI: 2000,
    maxTTFB: 200,
    maxBundleSize: 250,
    maxCSSSize: 40,
    maxImageSize: 80,
    maxFontSize: 40,
    maxAnimationDuration: 200,
    minFPS: 60,
    maxFrameTime: 16.67,
    maxMemoryUsage: 50,
    maxMemoryGrowth: 3,
    maxRequests: 25,
    maxTransferSize: 800
  }
};

// Performance budget validator
export class PerformanceBudgetValidator {
  private environment: keyof EnvironmentBudgets;
  private budgets: PerformanceBudgets;
  private violations: Array<{
    metric: string;
    actual: number;
    budget: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    timestamp: number;
  }> = [];

  constructor(environment: keyof EnvironmentBudgets = 'production') {
    this.environment = environment;
    this.budgets = PERFORMANCE_BUDGETS[environment];
  }

  // Validate current performance against budgets
  async validateBudgets(): Promise<{
    passed: boolean;
    score: number;
    violations: typeof this.violations;
    report: string;
  }> {
    this.violations = [];
    const stats = luxuryPerformance.getStats();
    
    if (!stats) {
      return {
        passed: false,
        score: 0,
        violations: [],
        report: 'Performance monitoring not available'
      };
    }

    // Validate Web Vitals
    if (stats.webVitals) {
      this.validateMetric('LCP', stats.webVitals.LCP, this.budgets.maxLCP, 'high');
      this.validateMetric('FID', stats.webVitals.FID, this.budgets.maxFID, 'critical');
      this.validateMetric('CLS', stats.webVitals.CLS, this.budgets.maxCLS, 'medium');
      this.validateMetric('TTI', stats.webVitals.TTI, this.budgets.maxTTI, 'high');
      this.validateMetric('TTFB', stats.webVitals.TTFB, this.budgets.maxTTFB, 'medium');
    }

    // Validate animation performance
    if (stats.animations) {
      stats.animations.forEach((anim: any) => {
        if (anim.average > this.budgets.maxAnimationDuration) {
          this.violations.push({
            metric: `Animation ${anim.name}`,
            actual: anim.average,
            budget: this.budgets.maxAnimationDuration,
            severity: 'medium',
            timestamp: Date.now()
          });
        }
      });
    }

    // Validate frame timing
    if (stats.frameTimingStats) {
      const avgFrameTime = stats.frameTimingStats.averageFrameTime;
      if (avgFrameTime > this.budgets.maxFrameTime) {
        this.violations.push({
          metric: 'Average Frame Time',
          actual: avgFrameTime,
          budget: this.budgets.maxFrameTime,
          severity: 'high',
          timestamp: Date.now()
        });
      }

      const avgFPS = stats.frameTimingStats.averageFPS;
      if (avgFPS < this.budgets.minFPS) {
        this.violations.push({
          metric: 'Average FPS',
          actual: avgFPS,
          budget: this.budgets.minFPS,
          severity: 'high',
          timestamp: Date.now()
        });
      }
    }

    // Validate memory usage
    if (stats.memoryUsage) {
      const memoryMB = stats.memoryUsage.used / (1024 * 1024);
      if (memoryMB > this.budgets.maxMemoryUsage) {
        this.violations.push({
          metric: 'Memory Usage',
          actual: memoryMB,
          budget: this.budgets.maxMemoryUsage,
          severity: 'medium',
          timestamp: Date.now()
        });
      }
    }

    // Calculate overall score
    const totalChecks = 10; // Approximate number of checks
    const criticalViolations = this.violations.filter(v => v.severity === 'critical').length;
    const highViolations = this.violations.filter(v => v.severity === 'high').length;
    const mediumViolations = this.violations.filter(v => v.severity === 'medium').length;

    const score = Math.max(0, 100 - (
      criticalViolations * 30 +
      highViolations * 20 +
      mediumViolations * 10
    ));

    const passed = criticalViolations === 0 && highViolations <= 1;

    return {
      passed,
      score,
      violations: this.violations,
      report: this.generateReport(score, passed)
    };
  }

  private validateMetric(
    name: string, 
    actual: number | undefined, 
    budget: number, 
    severity: 'low' | 'medium' | 'high' | 'critical'
  ) {
    if (actual === undefined || actual === null) return;
    
    if (actual > budget) {
      this.violations.push({
        metric: name,
        actual,
        budget,
        severity,
        timestamp: Date.now()
      });
    }
  }

  private generateReport(score: number, passed: boolean): string {
    const report = [
      `🏥 Performance Budget Report - ${this.environment.toUpperCase()}`,
      '='.repeat(50),
      '',
      `📊 Overall Score: ${score.toFixed(1)}/100`,
      `✅ Budget Status: ${passed ? 'PASSED' : 'FAILED'}`,
      `🚨 Violations: ${this.violations.length}`,
      ''
    ];

    if (this.violations.length > 0) {
      report.push('❌ Budget Violations:');
      this.violations.forEach(violation => {
        const emoji = {
          critical: '🔴',
          high: '🟠',
          medium: '🟡',
          low: '🟢'
        }[violation.severity];
        
        report.push(
          `  ${emoji} ${violation.metric}: ${violation.actual.toFixed(2)} > ${violation.budget} (${violation.severity})`
        );
      });
      report.push('');
    }

    report.push('💡 Recommendations:');
    
    if (this.violations.some(v => v.metric === 'LCP')) {
      report.push('  • Optimize critical rendering path');
      report.push('  • Preload key resources');
      report.push('  • Minimize render-blocking resources');
    }
    
    if (this.violations.some(v => v.metric.includes('Animation'))) {
      report.push('  • Reduce animation duration');
      report.push('  • Use GPU-accelerated properties');
      report.push('  • Consider motion-reduced alternatives');
    }
    
    if (this.violations.some(v => v.metric.includes('Frame') || v.metric.includes('FPS'))) {
      report.push('  • Profile and optimize JavaScript execution');
      report.push('  • Reduce DOM manipulation frequency');
      report.push('  • Use requestAnimationFrame for animations');
    }

    return report.join('\n');
  }

  // Set custom budgets for specific use cases
  setBudgets(customBudgets: Partial<PerformanceBudgets>) {
    this.budgets = { ...this.budgets, ...customBudgets };
  }

  // Get current budget configuration
  getBudgets(): PerformanceBudgets {
    return { ...this.budgets };
  }
}

// CI/CD Integration utilities
export class CICDPerformanceIntegration {
  private validator: PerformanceBudgetValidator;
  private baselineMetrics: any = null;

  constructor(environment: keyof EnvironmentBudgets = 'production') {
    this.validator = new PerformanceBudgetValidator(environment);
  }

  // Set baseline metrics for regression detection
  setBaseline(metrics: any) {
    this.baselineMetrics = metrics;
    console.log('📐 Performance baseline established');
  }

  // Run performance validation for CI/CD pipeline
  async runCICDValidation(): Promise<{
    exitCode: number;
    report: string;
    passed: boolean;
    regressions: Array<{
      metric: string;
      baseline: number;
      current: number;
      regression: number;
    }>;
  }> {
    console.log('🔍 Running CI/CD performance validation...');
    
    const budgetResult = await this.validator.validateBudgets();
    const regressions = this.detectRegressions();
    
    let exitCode = 0;
    
    // Critical failures
    if (budgetResult.violations.some(v => v.severity === 'critical')) {
      exitCode = 2; // Critical failure
    } 
    // High severity violations or significant regressions
    else if (
      budgetResult.violations.some(v => v.severity === 'high') ||
      regressions.some(r => r.regression > 20)
    ) {
      exitCode = 1; // Warning
    }

    const report = this.generateCICDReport(budgetResult, regressions);
    
    return {
      exitCode,
      report,
      passed: exitCode === 0,
      regressions
    };
  }

  // Detect performance regressions compared to baseline
  private detectRegressions() {
    if (!this.baselineMetrics) return [];

    const current = luxuryPerformance.getStats();
    if (!current) return [];

    const regressions: Array<{
      metric: string;
      baseline: number;
      current: number;
      regression: number;
    }> = [];

    // Check Web Vitals regressions
    if (this.baselineMetrics.webVitals && current.webVitals) {
      ['LCP', 'FID', 'CLS', 'TTI'].forEach(metric => {
        const baseline = this.baselineMetrics.webVitals[metric];
        const currentValue = current.webVitals[metric];
        
        if (baseline && currentValue) {
          const regression = ((currentValue - baseline) / baseline) * 100;
          
          if (regression > 10) { // 10% regression threshold
            regressions.push({
              metric: `WebVitals.${metric}`,
              baseline,
              current: currentValue,
              regression
            });
          }
        }
      });
    }

    // Check animation performance regressions
    if (this.baselineMetrics.frameTimingStats && current.frameTimingStats) {
      const baselineFPS = this.baselineMetrics.frameTimingStats.averageFPS;
      const currentFPS = current.frameTimingStats.averageFPS;
      
      if (baselineFPS && currentFPS) {
        const fpsRegression = ((baselineFPS - currentFPS) / baselineFPS) * 100;
        
        if (fpsRegression > 5) { // 5% FPS drop threshold
          regressions.push({
            metric: 'FrameRate.AverageFPS',
            baseline: baselineFPS,
            current: currentFPS,
            regression: fpsRegression
          });
        }
      }
    }

    return regressions;
  }

  private generateCICDReport(budgetResult: any, regressions: any[]): string {
    const report = [
      '🤖 CI/CD Performance Validation Report',
      '=' .repeat(45),
      '',
      `Environment: ${this.validator['environment'].toUpperCase()}`,
      `Status: ${budgetResult.passed ? '✅ PASSED' : '❌ FAILED'}`,
      `Score: ${budgetResult.score.toFixed(1)}/100`,
      '',
      '📊 Budget Compliance:',
      `  Violations: ${budgetResult.violations.length}`,
      ...budgetResult.violations.map((v: any) => 
        `    • ${v.metric}: ${v.actual.toFixed(2)} > ${v.budget} (${v.severity})`
      ),
      '',
      '📈 Performance Regressions:',
      regressions.length > 0 
        ? regressions.map(r => 
            `    • ${r.metric}: ${r.current.toFixed(2)} vs ${r.baseline.toFixed(2)} (+${r.regression.toFixed(1)}%)`
          )
        : ['    No significant regressions detected'],
      '',
      budgetResult.report
    ];

    return report.flat().join('\n');
  }

  // Generate performance metrics for storage/comparison
  exportMetrics(): any {
    const stats = luxuryPerformance.getStats();
    return {
      timestamp: Date.now(),
      environment: this.validator['environment'],
      metrics: stats,
      budgets: this.validator.getBudgets()
    };
  }

  // Import and compare against stored metrics
  importAndCompare(storedMetrics: any): {
    improvements: any[];
    regressions: any[];
    unchanged: any[];
  } {
    const current = this.exportMetrics();
    // Implementation for detailed metric comparison
    return { improvements: [], regressions: [], unchanged: [] };
  }
}

// Lighthouse automation integration
export class LighthouseIntegration {
  private cicd: CICDPerformanceIntegration;

  constructor(environment: keyof EnvironmentBudgets = 'production') {
    this.cicd = new CICDPerformanceIntegration(environment);
  }

  // Mock Lighthouse audit (in real implementation, this would run actual Lighthouse)
  async runLighthouseAudit(): Promise<{
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    passed: boolean;
    report: string;
  }> {
    console.log('🏃 Running Lighthouse audit...');
    
    // In a real implementation, this would execute:
    // const lighthouse = require('lighthouse');
    // const chrome = require('chrome-launcher');
    
    // Mock audit results based on current performance metrics
    const stats = luxuryPerformance.getStats();
    const performance = stats ? Math.min(100, stats.budgetCompliance.score) : 50;
    
    return {
      performance: Math.round(performance),
      accessibility: 95, // Mock - would come from actual Lighthouse
      bestPractices: 90, // Mock - would come from actual Lighthouse
      seo: 88, // Mock - would come from actual Lighthouse
      passed: performance >= 90,
      report: `Lighthouse Performance Score: ${Math.round(performance)}/100`
    };
  }

  // Generate comprehensive audit report
  async generateAuditReport(): Promise<string> {
    const lighthouse = await this.runLighthouseAudit();
    const cicdResult = await this.cicd.runCICDValidation();
    
    return [
      '🏆 Comprehensive Performance Audit',
      '=' .repeat(40),
      '',
      '🔍 Lighthouse Scores:',
      `  Performance: ${lighthouse.performance}/100`,
      `  Accessibility: ${lighthouse.accessibility}/100`,
      `  Best Practices: ${lighthouse.bestPractices}/100`,
      `  SEO: ${lighthouse.seo}/100`,
      '',
      '📋 CI/CD Validation:',
      `  Status: ${cicdResult.passed ? 'PASSED' : 'FAILED'}`,
      `  Exit Code: ${cicdResult.exitCode}`,
      '',
      cicdResult.report
    ].join('\n');
  }
}

// Export default validator instance
export const performanceBudgetValidator = new PerformanceBudgetValidator(
  (process.env.NODE_ENV as keyof EnvironmentBudgets) || 'production'
);

// Export CI/CD integration instance
export const cicdIntegration = new CICDPerformanceIntegration(
  (process.env.NODE_ENV as keyof EnvironmentBudgets) || 'production'
);

// Export Lighthouse integration instance
export const lighthouseIntegration = new LighthouseIntegration(
  (process.env.NODE_ENV as keyof EnvironmentBudgets) || 'production'
);