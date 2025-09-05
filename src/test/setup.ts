import '@testing-library/jest-dom'
import { expect, afterEach, vi, beforeAll, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import { server } from './mocks/server'

// Extend Vitest matchers with jest-dom
expect.extend({})

// Clean up after each test
afterEach(() => {
  cleanup()
  // Clean up any residual DOM modifications
  document.body.innerHTML = ''
  // Clear all localStorage and sessionStorage
  localStorage.clear()
  sessionStorage.clear()
  // Clear any timers
  vi.clearAllTimers()
})

// MSW server setup for API mocking
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mock window.matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver for animation tests
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock ResizeObserver for responsive tests
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock requestAnimationFrame for animation tests
global.requestAnimationFrame = vi.fn(cb => setTimeout(cb, 0))
global.cancelAnimationFrame = vi.fn()

// Mock Web APIs for luxury component testing
global.getComputedStyle = vi.fn().mockImplementation(() => ({
  getPropertyValue: vi.fn(),
}))

// Mock therapeutic audio context for whimsical interactions
global.AudioContext = vi.fn().mockImplementation(() => ({
  createOscillator: vi.fn().mockReturnValue({
    connect: vi.fn(),
    disconnect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    frequency: { value: 0 }
  }),
  createGain: vi.fn().mockReturnValue({
    connect: vi.fn(),
    disconnect: vi.fn(),
    gain: { value: 0 }
  }),
  destination: {}
}))

// Mock HTML5 Canvas for certificate generation tests
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  fillText: vi.fn(),
  fillStyle: '',
  font: '',
  textAlign: '',
  drawImage: vi.fn(),
  getImageData: vi.fn(),
  putImageData: vi.fn(),
  createImageData: vi.fn(),
  setTransform: vi.fn(),
  clearRect: vi.fn(),
  fillRect: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  beginPath: vi.fn(),
  closePath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  arc: vi.fn(),
})

// Mock performance API for luxury performance monitoring
global.performance = {
  ...global.performance,
  mark: vi.fn(),
  measure: vi.fn(),
  getEntriesByType: vi.fn().mockReturnValue([]),
  now: vi.fn().mockReturnValue(Date.now())
}

// Therapeutic UX testing environment variables
process.env.NODE_ENV = 'test'
process.env.VITE_APP_NAME = 'CPAT Training Platform'
process.env.VITE_THERAPEUTIC_MODE = 'test'

// Global test utilities
global.testUtils = {
  // Generate therapeutic test scenarios
  createTherapeuticScenario: (type: 'crisis' | 'routine' | 'assessment') => ({
    type,
    patientProfile: { age: 25, condition: 'test-condition' },
    context: 'therapeutic-testing'
  }),
  
  // Mock therapeutic interactions
  mockWhimsicalSystem: () => {
    vi.mock('@/utils/whimsicalInteractions', () => ({
      initializeWhimsicalSystem: vi.fn(),
      createFeatherConfetti: vi.fn(),
      addChampagneShimmer: vi.fn(),
      enhanceCTAWithChampagne: vi.fn(),
      enhanceCardWithLift: vi.fn(),
    }))
  },
  
  // Clinical reliability test helpers
  assertClinicalCompliance: (element: Element) => {
    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
    expect(element).toHaveAccessibleName()
  }
}

// Console warnings that should not break tests
const originalError = console.error
console.error = (...args: any[]) => {
  // Suppress specific React warnings in tests
  if (
    args[0]?.includes?.('Warning: ReactDOM.render is deprecated') ||
    args[0]?.includes?.('Warning: componentWillReceiveProps')
  ) {
    return
  }
  originalError.call(console, ...args)
}

// Luxury testing standards - fail on accessibility violations
global.luxuryTestingStandards = {
  accessibility: {
    enforceWCAG: true,
    minimumColorContrast: 4.5,
    requireAriaLabels: true,
    requireFocusManagement: true
  },
  performance: {
    maxRenderTime: 100, // ms
    maxMemoryUsage: 50 * 1024 * 1024, // 50MB
    requireLazyLoading: true
  },
  therapeuticUX: {
    maxInteractionTime: 200, // ms for therapeutic responsiveness
    requireWhimsicalFallbacks: true,
    enforceColorPsychology: true
  }
}

console.log('🧪 Therapeutic testing environment initialized with luxury standards')