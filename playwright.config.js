// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Enhanced Playwright configuration for CPAT Training Platform
 * Focus on therapeutic user journeys and clinical reliability
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  
  /* Therapeutic UX requires careful timing */
  fullyParallel: false,
  timeout: 30 * 1000, // 30 seconds for therapeutic interactions
  expect: { timeout: 10 * 1000 }, // 10 seconds for assertions
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI for clinical reliability */
  retries: process.env.CI ? 3 : 1,
  
  /* Single worker for consistent therapeutic timing */
  workers: process.env.CI ? 1 : 1,
  
  /* Enhanced reporting for clinical documentation */
  reporter: [
    ['html', { outputFolder: 'tests/reports/e2e' }],
    ['json', { outputFile: 'tests/reports/test-results.json' }],
    ['junit', { outputFile: 'tests/reports/junit.xml' }]
  ],
  
  /* Global test settings optimized for therapeutic UX */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: 'http://localhost:5173',

    /* Collect trace on first retry for debugging therapeutic flows */
    trace: 'retain-on-failure',
    
    /* Enhanced screenshot strategy for clinical documentation */
    screenshot: 'only-on-failure',
    
    /* Video recording for complex therapeutic scenarios */
    video: 'retain-on-failure',
    
    /* Slower actions for therapeutic UX testing */
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    
    /* Emulate therapeutic environment settings */
    colorScheme: 'light', // Therapeutic sage colors work best in light mode
    reduceMotion: 'reduce', // Test accessibility compliance
    
    /* Browser context for luxury testing */
    contextOptions: {
      strictSelectors: true,
    }
  },

  /* Multi-browser testing for clinical reliability */
  projects: [
    {
      name: 'Desktop Chrome - Therapeutic UX',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 }, // Luxury desktop experience
      },
    },
    
    {
      name: 'Desktop Safari - Clinical Compliance',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1440, height: 900 },
      },
    },
    
    {
      name: 'iPad - Mobile Therapeutic Experience',
      use: { 
        ...devices['iPad Pro'],
      },
    },
    
    {
      name: 'iPhone - Accessibility Testing',
      use: { 
        ...devices['iPhone 13'],
      },
    },
    
    // Accessibility-focused testing
    {
      name: 'High Contrast - Visual Accessibility',
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'dark',
        forcedColors: 'active',
      },
    },
    
    {
      name: 'Reduced Motion - Motor Accessibility',
      use: {
        ...devices['Desktop Chrome'],
        reduceMotion: 'reduce',
      },
    }
  ],

  /* Run development server before starting tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2 minutes for luxury component loading
  },
  
  /* Global setup for therapeutic testing environment */
  // globalSetup: './tests/e2e/global-setup.ts',
  // globalTeardown: './tests/e2e/global-teardown.ts',
});