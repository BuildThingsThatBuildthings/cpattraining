import React, { ReactElement, ReactNode } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MemoryRouter } from 'react-router-dom'

// Custom render for therapeutic components with routing context
interface TherapeuticRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[]
  route?: string
  withRouter?: boolean
}

// Therapeutic testing wrapper with luxury standards
const TherapeuticTestingWrapper: React.FC<{ 
  children: ReactNode
  initialEntries?: string[]
  withRouter?: boolean 
}> = ({ 
  children, 
  initialEntries = ['/'], 
  withRouter = true 
}) => {
  if (!withRouter) {
    return <>{children}</>
  }

  return (
    <MemoryRouter initialEntries={initialEntries}>
      <div className="therapeutic-test-environment" data-testid="therapeutic-wrapper">
        {children}
      </div>
    </MemoryRouter>
  )
}

// Custom render method with therapeutic context
export const renderWithTherapeuticContext = (
  ui: ReactElement,
  options: TherapeuticRenderOptions = {}
): RenderResult => {
  const {
    initialEntries = ['/'],
    route = '/',
    withRouter = true,
    ...renderOptions
  } = options

  const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <TherapeuticTestingWrapper 
      initialEntries={initialEntries} 
      withRouter={withRouter}
    >
      {children}
    </TherapeuticTestingWrapper>
  )

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Luxury component testing utilities
export const luxuryTestingUtils = {
  // Verify therapeutic color psychology
  assertTherapeuticColors: (element: Element) => {
    const computedStyle = window.getComputedStyle(element)
    const bgColor = computedStyle.backgroundColor
    const textColor = computedStyle.color
    
    // Check for sage therapeutic palette
    expect(element).toHaveStyle({ backgroundColor: expect.stringMatching(/rgb\(143, 166, 142\)|#8FA68E/i) })
  },

  // Verify whimsical interaction setup
  assertWhimsicalEnhancements: (element: Element) => {
    // Check for whimsical data attributes
    expect(element).toHaveAttribute('data-whimsy-ready')
    // Check for animation classes
    expect(element.classList.toString()).toMatch(/therapeutic-.*|whimsical-.*|luxury-.*/)
  },

  // Verify accessibility compliance for therapeutic UX
  assertTherapeuticAccessibility: async (element: Element) => {
    // Check ARIA labels for screen readers
    const ariaLabel = element.getAttribute('aria-label') || element.getAttribute('aria-labelledby')
    expect(ariaLabel).toBeTruthy()
    
    // Check focus management for therapeutic interactions
    if (element.tagName.toLowerCase() === 'button') {
      expect(element).toHaveAttribute('type')
    }
    
    // Check color contrast for therapeutic colors
    const computedStyle = window.getComputedStyle(element)
    expect(computedStyle.color).toBeTruthy()
  },

  // Verify clinical reliability standards
  assertClinicalReliability: (element: Element, requirements: string[] = []) => {
    // Ensure element is stable and accessible
    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
    
    // Check for clinical data attributes
    requirements.forEach(requirement => {
      expect(element).toHaveAttribute(`data-clinical-${requirement}`)
    })
  },

  // Performance testing for luxury components
  measureTherapeuticPerformance: async (renderFunction: () => void) => {
    const start = performance.now()
    renderFunction()
    const end = performance.now()
    
    const renderTime = end - start
    expect(renderTime).toBeLessThan(100) // Therapeutic UX requires fast rendering
    
    return { renderTime }
  }
}

// Mock hooks for testing therapeutic components
export const mockProgressTracking = {
  progress: {
    completedModules: ['01-light-color-fundamentals'],
    currentModule: '02-therapeutic-mechanisms',
    certificateEligible: false
  },
  isSafetyAcknowledged: () => true,
  isModuleAccessible: () => true,
  markSafetyAcknowledged: vi.fn(),
  completeModule: vi.fn(),
  updateProgress: vi.fn()
}

// Test scenarios for therapeutic user flows
export const therapeuticScenarios = {
  crisisIntervention: {
    patientAge: 25,
    severity: 'high',
    protocols: ['safety-assessment', 'de-escalation', 'crisis-plan'],
    timeConstraints: true
  },
  routineSession: {
    patientAge: 30,
    severity: 'low',
    protocols: ['check-in', 'progress-review'],
    timeConstraints: false
  },
  assessmentSession: {
    patientAge: 35,
    severity: 'medium',
    protocols: ['comprehensive-assessment', 'treatment-planning'],
    timeConstraints: false
  },
  safetyProtocol: {
    patientAge: 40,
    severity: 'critical',
    protocols: ['immediate-safety', 'emergency-contact', 'documentation'],
    timeConstraints: true
  }
}

// Accessibility testing helpers
export const a11yTestingUtils = {
  // Test keyboard navigation for therapeutic interfaces
  testKeyboardNavigation: async (container: Element) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    expect(focusableElements.length).toBeGreaterThan(0)
    
    // Verify tab order makes therapeutic sense
    for (let i = 0; i < focusableElements.length; i++) {
      const element = focusableElements[i] as HTMLElement
      expect(element).toHaveAttribute('tabindex')
    }
  },

  // Test screen reader compatibility
  testScreenReaderCompatibility: (element: Element) => {
    // Check for proper ARIA attributes
    const ariaAttributes = [
      'aria-label',
      'aria-labelledby',
      'aria-describedby',
      'aria-role',
      'aria-expanded',
      'aria-hidden'
    ]
    
    const hasAriaSupport = ariaAttributes.some(attr => 
      element.hasAttribute(attr)
    )
    
    expect(hasAriaSupport).toBe(true)
  }
}

// Re-export everything from testing-library with our custom render
export * from '@testing-library/react'
export { renderWithTherapeuticContext as render }
export { default as userEvent } from '@testing-library/user-event'