// Core Luxury Components for CPAT Training Platform
// Professional therapeutic design system with glass morphism and sage/champagne aesthetics
// Version 1.0.0 - Core Component System

// Hero Components
export { default as Hero } from './Hero'

// Navigation & Progress Components  
export { default as ProgressStepper } from './ProgressStepper'

// Content Components
export { default as ClinicalCallout } from './ClinicalCallout'
export { SafetyCallout, CPATCallout, PracticeCallout, TCMCallout } from './ClinicalCallout'

// Card Components
export { default as ModuleCard } from './ModuleCard'

// Surface Components (Glass Morphism)
export { default as PearlSurface } from './PearlSurface'
export { LuxuryPearlSurface, ClinicalPearlSurface, FloatingPearlSurface, ElevatedPearlSurface } from './PearlSurface'

// TypeScript interface exports
export interface HeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  proofPoints?: string[]
  ctaText?: string
  ctaSecondaryText?: string
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
  className?: string
  variant?: 'default' | 'luxury' | 'clinical'
}

export interface ProgressStepperProps {
  steps: StepData[]
  currentStep?: number
  onStepClick?: (stepIndex: number, stepId: string) => void
  variant?: 'horizontal' | 'vertical'
  showDescription?: boolean
  className?: string
  size?: 'compact' | 'default' | 'large'
}

export interface ClinicalCalloutProps {
  type: 'safety' | 'cpat' | 'practice' | 'tcm' | 'info' | 'warning' | 'success' | 'error'
  title?: string
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
  variant?: 'default' | 'subtle' | 'emphasised'
}

export interface ModuleCardProps {
  title: string
  description?: string
  outcome: string
  duration: string
  ceCredits?: number
  status: 'locked' | 'available' | 'in-progress' | 'completed'
  progress?: number
  moduleNumber?: number
  imageSrc?: string
  onStart?: () => void
  onContinue?: () => void
  onReview?: () => void
  className?: string
  variant?: 'default' | 'compact' | 'detailed'
}

export interface PearlSurfaceProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'luxury' | 'clinical' | 'elevated' | 'floating'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  glow?: boolean
  interactive?: boolean
  blur?: 'none' | 'sm' | 'md' | 'lg'
  opacity?: number
  borderStyle?: 'subtle' | 'visible' | 'accent' | 'none'
}

export interface StepData {
  id: string
  title: string
  description?: string
  status: 'completed' | 'current' | 'upcoming' | 'locked'
  duration?: string
  index: number
}

// Core Design System Constants
export const CPAT_CORE_COMPONENTS = {
  version: '1.0.0',
  theme: 'Clinical Luxury',
  colorSystem: 'Sage/Champagne',
  aesthetic: 'Calm, Clinical, Confident'
} as const

// Component Usage Patterns
export const USAGE_PATTERNS = {
  hero: {
    primary: 'Landing pages, module introductions',
    variants: ['default', 'luxury', 'clinical'],
    bestPractices: [
      'Use eyebrow text for context',
      'Keep titles concise and impactful', 
      'Include proof points for credibility',
      'Ensure CTA text is action-oriented'
    ]
  },
  progressStepper: {
    primary: 'Module navigation, course progress',
    variants: ['horizontal', 'vertical'],
    bestPractices: [
      'Limit to 6-8 steps maximum',
      'Use clear, descriptive step titles',
      'Show duration for each step',
      'Indicate locked/available states clearly'
    ]
  },
  clinicalCallout: {
    primary: 'Important information, safety notices',
    types: ['safety', 'cpat', 'practice', 'tcm', 'info', 'warning', 'success', 'error'],
    bestPractices: [
      'Never make callouts clickable/button-like',
      'Use appropriate icons for each type',
      'Keep content concise and scannable',
      'Prioritize safety callouts visually'
    ]
  },
  moduleCard: {
    primary: 'Course modules, learning materials',
    statuses: ['locked', 'available', 'in-progress', 'completed'],
    bestPractices: [
      'Include clear learning outcomes',
      'Show duration and completion status',
      'Use progress indicators for active modules',
      'Disable interaction for locked modules'
    ]
  },
  pearlSurface: {
    primary: 'Glass morphism containers, elevated content',
    variants: ['default', 'luxury', 'clinical', 'elevated', 'floating'],
    bestPractices: [
      'Use sparingly for emphasis',
      'Ensure sufficient contrast for text',
      'Layer appropriately with other elements',
      'Test accessibility across different displays'
    ]
  }
} as const

// Accessibility Guidelines
export const ACCESSIBILITY_GUIDELINES = {
  hero: [
    'Ensure hero text has sufficient contrast (4.5:1 minimum)',
    'Provide descriptive alt text for background images',
    'Make CTAs keyboard accessible',
    'Use semantic heading hierarchy'
  ],
  progressStepper: [
    'Use aria-current="step" for current step',
    'Provide step numbers for screen readers',  
    'Ensure clickable steps have proper focus states',
    'Use role="progressbar" for completion percentage'
  ],
  clinicalCallout: [
    'Use role="note" for informational callouts',
    'Ensure icon colors meet contrast requirements',
    'Provide text alternatives to color coding',
    'Use appropriate heading levels within callouts'
  ],
  moduleCard: [
    'Use proper button semantics for actions',
    'Provide status information to screen readers',
    'Ensure disabled states are clearly indicated',
    'Use aria-describedby for additional context'
  ],
  pearlSurface: [
    'Test text legibility on glass morphism backgrounds',
    'Provide fallback styles for reduced motion',
    'Ensure interactive surfaces have focus indicators',
    'Maintain minimum touch target sizes (44px)'
  ]
} as const

// Integration with existing luxury components
export const INTEGRATION_NOTES = {
  withLuxuryComponents: 'Core components work seamlessly with existing luxury therapeutic components',
  withWhimsicalSystem: 'All core components support data-whimsy attributes for enhanced interactions',
  withTypographySystem: 'Components automatically inherit from established typography scale',
  withColorSystem: 'Components use CSS custom properties from the sage/champagne color system'
} as const