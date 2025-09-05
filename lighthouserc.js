module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:4173',
        'http://localhost:4173/training',
        'http://localhost:4173/training/safety',
        'http://localhost:4173/training/journey',
        'http://localhost:4173/components'
      ],
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:.*4173',
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --headless',
        // Therapeutic UX performance standards
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0
        }
      }
    },
    assert: {
      assertions: {
        // Luxury UX Performance Standards
        'categories:performance': ['error', { minScore: 0.9 }], // 90+ for luxury
        'categories:accessibility': ['error', { minScore: 1.0 }], // 100% for clinical
        'categories:best-practices': ['error', { minScore: 0.95 }], // 95+ for therapeutic
        'categories:seo': ['warn', { minScore: 0.8 }], // 80+ sufficient for training platform
        
        // Core Web Vitals - Therapeutic Standards
        'first-contentful-paint': ['error', { maxNumericValue: 1200 }], // 1.2s max
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }], // 2.5s max
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }], // 0.1 max
        'total-blocking-time': ['error', { maxNumericValue: 200 }], // 200ms max
        
        // Luxury Component Performance
        'speed-index': ['error', { maxNumericValue: 2000 }], // 2s max for visual completeness
        'interactive': ['error', { maxNumericValue: 3000 }], // 3s max for interactivity
        
        // Clinical Reliability Standards
        'unused-css-rules': ['warn', { maxLength: 10 }], // Minimize unused CSS
        'unused-javascript': ['warn', { maxLength: 20 }], // Minimize unused JS
        'modern-image-formats': ['warn', { minScore: 0.8 }], // Optimize images
        
        // Therapeutic UX Specific
        'color-contrast': ['error', { minScore: 1.0 }], // Perfect contrast for sage colors
        'tap-targets': ['error', { minScore: 1.0 }], // Touch targets for mobile therapeutic UX
        'viewport': ['error', { minScore: 1.0 }], // Responsive therapeutic design
        
        // Security for Healthcare
        'is-on-https': ['warn', { minScore: 1.0 }], // HTTPS for clinical data
        'external-anchors-use-rel-noopener': ['error', { minScore: 1.0 }] // Security best practices
      }
    },
    upload: {
      target: 'temporary-public-storage'
    },
    server: {
      port: 9009,
      storage: './tests/reports/lighthouse'
    }
  }
}