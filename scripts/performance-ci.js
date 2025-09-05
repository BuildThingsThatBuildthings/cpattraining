#!/usr/bin/env node

/**
 * Performance CI/CD Integration Script
 * Automated performance testing and budget validation for clinical environments
 * Usage: node scripts/performance-ci.js [environment] [--baseline] [--lighthouse]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  environments: ['development', 'staging', 'production', 'clinical'],
  budgets: {
    development: { maxLCP: 2000, maxFID: 100, maxCLS: 0.2, minScore: 70 },
    staging: { maxLCP: 1500, maxFID: 75, maxCLS: 0.15, minScore: 80 },
    production: { maxLCP: 1200, maxFID: 50, maxCLS: 0.1, minScore: 90 },
    clinical: { maxLCP: 1000, maxFID: 50, maxCLS: 0.1, minScore: 95 }
  },
  paths: {
    baseline: './performance-baseline.json',
    reports: './reports/performance',
    artifacts: './artifacts/performance'
  }
};

// CLI argument parsing
const args = process.argv.slice(2);
const environment = args[0] || process.env.NODE_ENV || 'production';
const shouldSetBaseline = args.includes('--baseline');
const shouldRunLighthouse = args.includes('--lighthouse');
const isCI = process.env.CI === 'true';

console.log('🏥 Clinical Performance CI/CD Integration');
console.log('=' .repeat(45));
console.log(`Environment: ${environment}`);
console.log(`CI Mode: ${isCI ? 'Yes' : 'No'}`);
console.log(`Lighthouse: ${shouldRunLighthouse ? 'Enabled' : 'Disabled'}`);
console.log('');

// Ensure directories exist
function ensureDirectories() {
  const dirs = [CONFIG.paths.reports, CONFIG.paths.artifacts];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Build the application
async function buildApplication() {
  console.log('🔨 Building application...');
  try {
    execSync('npm run build', { 
      stdio: isCI ? 'pipe' : 'inherit',
      cwd: process.cwd()
    });
    console.log('✅ Build completed successfully');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Start development server for testing
function startDevServer() {
  console.log('🚀 Starting development server...');
  const { spawn } = require('child_process');
  
  const server = spawn('npm', ['run', 'preview'], {
    stdio: isCI ? 'pipe' : 'inherit',
    cwd: process.cwd()
  });

  return new Promise((resolve, reject) => {
    let output = '';
    
    server.stdout?.on('data', (data) => {
      output += data.toString();
      if (output.includes('Local:') || output.includes('localhost')) {
        setTimeout(resolve, 2000); // Wait 2 seconds for server to be ready
      }
    });

    server.on('error', reject);
    
    // Timeout after 30 seconds
    setTimeout(() => {
      reject(new Error('Server start timeout'));
    }, 30000);
  });
}

// Run Lighthouse audit
async function runLighthouseAudit(url = 'http://localhost:4173') {
  if (!shouldRunLighthouse) {
    console.log('⚡ Skipping Lighthouse audit (not requested)');
    return null;
  }

  console.log('🏃 Running Lighthouse audit...');
  
  try {
    // Install lighthouse if not available
    try {
      require('lighthouse');
    } catch (e) {
      console.log('📦 Installing Lighthouse...');
      execSync('npm install -g lighthouse chrome-launcher', { stdio: 'inherit' });
    }

    const lighthouse = require('lighthouse');
    const chromeLauncher = require('chrome-launcher');

    // Launch Chrome
    const chrome = await chromeLauncher.launch({
      chromeFlags: [
        '--headless',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage'
      ]
    });

    // Run Lighthouse
    const options = {
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices'],
      port: chrome.port
    };

    const runnerResult = await lighthouse(url, options);
    await chrome.kill();

    // Extract scores
    const scores = {
      performance: Math.round(runnerResult.lhr.categories.performance.score * 100),
      accessibility: Math.round(runnerResult.lhr.categories.accessibility.score * 100),
      bestPractices: Math.round(runnerResult.lhr.categories['best-practices'].score * 100)
    };

    // Extract Web Vitals
    const webVitals = {
      LCP: runnerResult.lhr.audits['largest-contentful-paint'].numericValue,
      FID: runnerResult.lhr.audits['max-potential-fid']?.numericValue || 0,
      CLS: runnerResult.lhr.audits['cumulative-layout-shift'].numericValue,
      TTI: runnerResult.lhr.audits['interactive'].numericValue,
      FCP: runnerResult.lhr.audits['first-contentful-paint'].numericValue
    };

    console.log(`✅ Lighthouse audit completed`);
    console.log(`   Performance: ${scores.performance}/100`);
    console.log(`   Accessibility: ${scores.accessibility}/100`);
    console.log(`   Best Practices: ${scores.bestPractices}/100`);

    return { scores, webVitals, fullReport: runnerResult.lhr };

  } catch (error) {
    console.error('❌ Lighthouse audit failed:', error.message);
    return null;
  }
}

// Validate performance budgets
function validatePerformanceBudgets(metrics, lighthouseResult) {
  console.log('📊 Validating performance budgets...');
  
  const budget = CONFIG.budgets[environment];
  const violations = [];
  let passed = true;

  // Validate Lighthouse scores
  if (lighthouseResult) {
    if (lighthouseResult.scores.performance < budget.minScore) {
      violations.push({
        metric: 'Lighthouse Performance Score',
        actual: lighthouseResult.scores.performance,
        expected: budget.minScore,
        severity: 'critical'
      });
      passed = false;
    }

    // Validate Web Vitals from Lighthouse
    const vitals = lighthouseResult.webVitals;
    
    if (vitals.LCP > budget.maxLCP) {
      violations.push({
        metric: 'Largest Contentful Paint',
        actual: Math.round(vitals.LCP),
        expected: budget.maxLCP,
        severity: 'high'
      });
      passed = false;
    }

    if (vitals.FID > budget.maxFID) {
      violations.push({
        metric: 'First Input Delay',
        actual: Math.round(vitals.FID),
        expected: budget.maxFID,
        severity: 'critical'
      });
      passed = false;
    }

    if (vitals.CLS > budget.maxCLS) {
      violations.push({
        metric: 'Cumulative Layout Shift',
        actual: vitals.CLS.toFixed(3),
        expected: budget.maxCLS,
        severity: 'medium'
      });
    }
  }

  return { passed, violations };
}

// Compare with baseline metrics
function compareWithBaseline(currentMetrics) {
  if (!fs.existsSync(CONFIG.paths.baseline)) {
    console.log('⚠️  No baseline found, skipping regression detection');
    return { regressions: [], improvements: [] };
  }

  console.log('📈 Checking for performance regressions...');
  
  const baseline = JSON.parse(fs.readFileSync(CONFIG.paths.baseline, 'utf8'));
  const regressions = [];
  const improvements = [];

  // Compare Lighthouse scores
  if (baseline.lighthouse && currentMetrics.lighthouse) {
    const perfDiff = currentMetrics.lighthouse.scores.performance - baseline.lighthouse.scores.performance;
    
    if (perfDiff < -5) { // 5 point drop
      regressions.push({
        metric: 'Lighthouse Performance',
        baseline: baseline.lighthouse.scores.performance,
        current: currentMetrics.lighthouse.scores.performance,
        change: perfDiff
      });
    } else if (perfDiff > 5) {
      improvements.push({
        metric: 'Lighthouse Performance',
        baseline: baseline.lighthouse.scores.performance,
        current: currentMetrics.lighthouse.scores.performance,
        change: perfDiff
      });
    }
  }

  return { regressions, improvements };
}

// Generate performance report
function generateReport(validation, comparison, metrics) {
  const timestamp = new Date().toISOString();
  const reportFile = path.join(CONFIG.paths.reports, `performance-${environment}-${Date.now()}.md`);
  
  const report = [
    `# Performance Report - ${environment.toUpperCase()}`,
    `Generated: ${timestamp}`,
    '',
    '## Summary',
    `- **Status**: ${validation.passed ? '✅ PASSED' : '❌ FAILED'}`,
    `- **Environment**: ${environment}`,
    `- **Violations**: ${validation.violations.length}`,
    `- **Regressions**: ${comparison.regressions.length}`,
    `- **Improvements**: ${comparison.improvements.length}`,
    '',
  ];

  // Budget violations
  if (validation.violations.length > 0) {
    report.push('## ❌ Budget Violations');
    validation.violations.forEach(v => {
      const emoji = v.severity === 'critical' ? '🔴' : 
                   v.severity === 'high' ? '🟠' : '🟡';
      report.push(`- ${emoji} **${v.metric}**: ${v.actual} > ${v.expected} (${v.severity})`);
    });
    report.push('');
  }

  // Performance regressions
  if (comparison.regressions.length > 0) {
    report.push('## 📉 Performance Regressions');
    comparison.regressions.forEach(r => {
      report.push(`- **${r.metric}**: ${r.current} vs ${r.baseline} (${r.change > 0 ? '+' : ''}${r.change})`);
    });
    report.push('');
  }

  // Performance improvements
  if (comparison.improvements.length > 0) {
    report.push('## 📈 Performance Improvements');
    comparison.improvements.forEach(i => {
      report.push(`- **${i.metric}**: ${i.current} vs ${i.baseline} (+${i.change})`);
    });
    report.push('');
  }

  // Lighthouse scores
  if (metrics.lighthouse) {
    report.push('## 🏆 Lighthouse Scores');
    report.push(`- Performance: ${metrics.lighthouse.scores.performance}/100`);
    report.push(`- Accessibility: ${metrics.lighthouse.scores.accessibility}/100`);
    report.push(`- Best Practices: ${metrics.lighthouse.scores.bestPractices}/100`);
    report.push('');
  }

  // Recommendations
  report.push('## 💡 Recommendations');
  
  if (validation.violations.some(v => v.metric.includes('LCP'))) {
    report.push('- Optimize critical rendering path');
    report.push('- Preload key resources');
    report.push('- Minimize render-blocking resources');
  }
  
  if (validation.violations.some(v => v.metric.includes('FID'))) {
    report.push('- Reduce JavaScript execution time');
    report.push('- Break up long tasks');
    report.push('- Use web workers for heavy computations');
  }
  
  if (validation.violations.some(v => v.metric.includes('CLS'))) {
    report.push('- Reserve space for dynamic content');
    report.push('- Avoid layout shifts during loading');
    report.push('- Use proper image dimensions');
  }

  const reportContent = report.join('\n');
  fs.writeFileSync(reportFile, reportContent);
  
  console.log(`📄 Report generated: ${reportFile}`);
  return reportContent;
}

// Save baseline metrics
function saveBaseline(metrics) {
  console.log('💾 Saving performance baseline...');
  
  const baseline = {
    timestamp: new Date().toISOString(),
    environment,
    metrics
  };
  
  fs.writeFileSync(CONFIG.paths.baseline, JSON.stringify(baseline, null, 2));
  console.log(`✅ Baseline saved to ${CONFIG.paths.baseline}`);
}

// Main execution function
async function main() {
  let serverProcess = null;
  let exitCode = 0;

  try {
    ensureDirectories();
    
    // Build application
    await buildApplication();
    
    // Start server for testing
    serverProcess = await startDevServer();
    
    // Run Lighthouse audit
    const lighthouseResult = await runLighthouseAudit();
    
    // Collect metrics
    const metrics = {
      timestamp: new Date().toISOString(),
      environment,
      lighthouse: lighthouseResult
    };

    // Save baseline if requested
    if (shouldSetBaseline) {
      saveBaseline(metrics);
      console.log('✅ Baseline established successfully');
      return 0;
    }

    // Validate performance budgets
    const validation = validatePerformanceBudgets(metrics, lighthouseResult);
    
    // Compare with baseline
    const comparison = compareWithBaseline(metrics);
    
    // Generate report
    const report = generateReport(validation, comparison, metrics);
    
    // Output summary
    console.log('');
    console.log('📋 Performance Validation Summary');
    console.log('=' .repeat(35));
    
    if (validation.passed) {
      console.log('✅ All performance budgets passed');
    } else {
      console.log('❌ Performance budget violations detected');
      console.log(`   Violations: ${validation.violations.length}`);
      exitCode = validation.violations.some(v => v.severity === 'critical') ? 2 : 1;
    }
    
    if (comparison.regressions.length > 0) {
      console.log(`📉 Performance regressions detected: ${comparison.regressions.length}`);
      exitCode = Math.max(exitCode, 1);
    }
    
    if (comparison.improvements.length > 0) {
      console.log(`📈 Performance improvements: ${comparison.improvements.length}`);
    }

    // In CI mode, output report to stdout for pipeline consumption
    if (isCI) {
      console.log('');
      console.log('--- PERFORMANCE REPORT ---');
      console.log(report);
      console.log('--- END REPORT ---');
    }

    return exitCode;

  } catch (error) {
    console.error('💥 Performance CI failed:', error.message);
    return 2;
  } finally {
    // Cleanup: stop server if it was started
    if (serverProcess) {
      try {
        process.kill(-serverProcess.pid);
      } catch (e) {
        // Server already stopped
      }
    }
  }
}

// Handle CLI execution
if (require.main === module) {
  main()
    .then(exitCode => {
      console.log(`\n🏁 Performance CI completed with exit code: ${exitCode}`);
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('💥 Fatal error:', error);
      process.exit(2);
    });
}

module.exports = { main, CONFIG };