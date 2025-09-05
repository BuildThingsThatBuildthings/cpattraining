/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/',
        'build/',
        'coverage/',
        'public/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/mocks/**'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 85,
          lines: 85,
          statements: 85
        },
        // Luxury components require higher test coverage
        'src/components/luxury/': {
          branches: 90,
          functions: 95,
          lines: 95,
          statements: 95
        },
        // Critical therapeutic paths require maximum coverage
        'src/pages/training/': {
          branches: 90,
          functions: 95,
          lines: 95,
          statements: 95
        }
      }
    },
    // Test performance: max 5000ms per test for therapeutic UX
    testTimeout: 5000,
    hookTimeout: 10000,
    teardownTimeout: 5000
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@luxury': resolve(__dirname, './src/components/luxury'),
      '@utils': resolve(__dirname, './src/utils'),
      '@pages': resolve(__dirname, './src/pages'),
      '@test': resolve(__dirname, './src/test')
    }
  }
})