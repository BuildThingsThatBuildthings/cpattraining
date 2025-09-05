// Luxury Therapeutic Components for CPAT Training Platform
// Designed for professional wellness applications with therapeutic aesthetics
// All components follow evidence-based design principles for mental health applications
// Color psychology: Sage promotes calm, focus, and therapeutic connection
// Version 2.2.0 - Now with Core Component System

// Type-safe window interface
interface WhimsicalWindow extends Window {
  __whimsical_initialized__?: boolean;
}

// Auto-initialize whimsical system on import
if (typeof window !== 'undefined' && !(window as WhimsicalWindow).__whimsical_initialized__) {
  import('../../utils/whimsicalInteractions')
    .then(({ initializeWhimsicalSystem }) => {
      initializeWhimsicalSystem()
      ;(window as WhimsicalWindow).__whimsical_initialized__ = true
    })
    .catch(() => {}) // Silent fail for non-critical enhancement
}

// Core Interactive Components (Enhanced with Whimsy)
export { default as TherapeuticButton } from './TherapeuticButton'
export { default as TherapeuticCard } from './TherapeuticCard'
export { default as TherapeuticProgress } from './TherapeuticProgress'
export { default as TherapeuticInput } from './TherapeuticForm'

// Advanced UI Components
export { default as TherapeuticLoading } from './TherapeuticLoadingState'
export { default as TherapeuticNotification } from './TherapeuticNotification'
export { useTherapeuticNotification } from '../../hooks/useTherapeuticNotification'
export { default as TherapeuticAccessibilityTester } from './TherapeuticAccessibilityTester'

// Enhanced Therapeutic Components (New)
export { default as TherapeuticCelebration } from './TherapeuticCelebration'
export { default as TherapeuticTooltip } from './TherapeuticTooltip'

// Core Component System (NEW - Phase 3)
export * from '../core'

// Whimsical Interaction System
export { default as WhimsicalInteractionDemo } from './WhimsicalInteractionDemo'
export {
  therapeuticColors,
  addChampagneShimmer,
  addSagePulse,
  addPearlGlow,
  addTherapeuticBreathing,
  createTherapeuticConfetti,
  enhanceTherapeuticButton,
  enhanceModuleCard,
  celebrateProgress,
  initializeWhimsicalSystem,
  enhancePearlSurface,
  enhanceCardWithLift,
  addBreathingAnimation,
  prefersReducedMotion as respectsReducedMotion
} from '../../utils/whimsicalInteractions'

// Accessibility & Performance Utilities
export * from '../../utils/accessibility'
export * from '../../utils/performance'

// Component Collections for quick styling (Enhanced with Whimsical Support)
export const LuxurySageTheme = {
  colors: {
    primary: '#8FA68E',
    primaryLight: '#A8C09A', 
    primaryDark: '#6B7D6A',
    mist: '#E8F0E5',
    cream: '#F7F5F3',
    stone: '#9B9B9B',
    pearl: '#E6E4E0',
    gold: '#D4AF37',
    // Whimsical additions
    champagne: '#DAA520',
    warmAccent: '#CD853F',
    therapeuticBlue: '#B8D4E3',
    healingRose: '#E8C4C8'
  },
  gradients: {
    sage: 'linear-gradient(135deg, #A8C09A, #8FA68E)',
    therapeutic: 'linear-gradient(135deg, #F7F5F3, #E6E4E0)',
    luxury: 'linear-gradient(135deg, #E8F0E5, #F7F5F3)',
    premium: 'linear-gradient(135deg, #C8B8DB, #A8C09A)',
    // Whimsical gradients
    champagne: 'linear-gradient(135deg, var(--sage-primary), var(--warm-accent))',
    celebration: 'linear-gradient(135deg, #DAA520, #8FA68E, #B8D4E3)',
    shimmer: 'linear-gradient(90deg, transparent, rgba(218, 165, 32, 0.3), transparent)'
  },
  shadows: {
    soft: '0 4px 12px -2px rgba(143, 166, 142, 0.15)',
    medium: '0 8px 32px -8px rgba(143, 166, 142, 0.2)',
    strong: '0 16px 48px -12px rgba(143, 166, 142, 0.25)',
    // Whimsical shadows
    luxury: '0 24px 64px -16px rgba(143, 166, 142, 0.25)',
    champagne: '0 8px 24px -4px rgba(218, 165, 32, 0.3)'
  },
  borderRadius: {
    small: '12px',
    medium: '16px', 
    large: '24px',
    xl: '32px'
  }
}

// Utility functions for therapeutic design (Enhanced with Whimsical Interactions)
export const therapeuticAnimations = {
  breathe: (duration = '4s') => `
    @keyframes therapeuticBreathe {
      0%, 100% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.02); opacity: 1; }
    }
    animation: therapeuticBreathe ${duration} ease-in-out infinite;
  `,
  float: (duration = '6s') => `
    @keyframes therapeuticFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(2deg); }
    }
    animation: therapeuticFloat ${duration} ease-in-out infinite;
  `,
  shimmer: (duration = '3s') => `
    @keyframes therapeuticShimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }
    animation: therapeuticShimmer ${duration} ease-in-out infinite;
  `,
  // New whimsical animations
  luxuryLift: (duration = '200ms') => `
    @keyframes luxuryLift {
      0% {
        transform: translateY(0) rotateX(0) rotateY(0) scale(1);
        box-shadow: 0 8px 32px -8px rgba(143, 166, 142, 0.15);
      }
      100% {
        transform: translateY(-8px) rotateX(2deg) rotateY(1deg) scale(1.02);
        box-shadow: 0 24px 64px -16px rgba(143, 166, 142, 0.25);
      }
    }
    animation: luxuryLift ${duration} cubic-bezier(0.4, 0, 0.2, 1) forwards;
  `,
  champagneGlint: (duration = '600ms') => `
    @keyframes champagneGlint {
      0% { transform: translateX(-100%) rotate(35deg); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateX(100%) rotate(35deg); opacity: 0; }
    }
    animation: champagneGlint ${duration} cubic-bezier(0.25, 0.46, 0.45, 0.94);
  `,
  featherDrift: (duration = '3s') => `
    @keyframes featherDrift {
      0% { transform: translateY(-10px) rotate(0deg) scale(0); opacity: 0; }
      10% { opacity: 1; transform: translateY(0px) rotate(0deg) scale(1); }
      50% { transform: translateY(50vh) rotate(180deg) scale(1.1); }
      100% { transform: translateY(120vh) rotate(360deg) scale(0.8); opacity: 0; }
    }
    animation: featherDrift ${duration} ease-out forwards;
  `
}

// Therapeutic spacing scale based on golden ratio for optimal cognitive rest
export const therapeuticSpacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '40px',
  '2xl': '64px',
  '3xl': '104px'
}

// Whimsical Interaction Constants and Utilities
export const WHIMSICAL_CONSTANTS = {
  ANIMATION_DURATION: {
    SHIMMER: 1500,
    CONFETTI: 3000,
    CARD_LIFT: 200,
    STEP_COMPLETE: 800,
    MODULE_COMPLETE: 2000,
    FADE_SOFT: 150,
    FADE_MEDIUM: 175,
    FADE_SMOOTH: 200
  },
  PARTICLE_COUNTS: {
    FEATHER_CONFETTI: 12,
    CHAMPAGNE_BUBBLES: 8,
    SUCCESS_SPARKLES: 6
  },
  EASING: {
    WHIMSICAL: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    THERAPEUTIC: 'cubic-bezier(0.23, 1, 0.32, 1)',
    ORGANIC: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  THERAPEUTIC_FREQUENCY: 528, // Hz - healing frequency for audio feedback
  REDUCED_MOTION_DURATION: 10 // ms - fallback for accessibility
} as const

// Type definitions for whimsical interactions
export interface WhimsicalProps {
  whimsical?: boolean
  celebration?: boolean
  breathing?: boolean
  stackEffect?: boolean
}

export interface WhimsicalOptions {
  count?: number
  duration?: number
  colors?: string[]
  showConfetti?: boolean
  showShimmer?: boolean
  position?: 'top' | 'bottom'
}

export type TherapeuticGlyphType = 'healing' | 'growth' | 'balance'
export type TherapeuticState = 'loading' | 'success' | 'error'
export type CelebrationType = 'step' | 'module' | 'achievement'

// Feature flags for gradual rollout
export const WHIMSICAL_FEATURES = {
  CONFETTI_SYSTEM: true,
  CHAMPAGNE_EFFECTS: true,
  EASTER_EGGS: true,
  BREATHING_ANIMATIONS: true,
  THERAPEUTIC_AUDIO: true,
  LUXURY_CARD_LIFTS: true,
  WITTY_FOOTNOTES: true,
  PERFORMANCE_MONITORING: true
} as const

// Quick utility functions for applying whimsical enhancements
export const applyWhimsicalEnhancements = (element: HTMLElement, options: WhimsicalOptions = {}) => {
  // Suppress unused parameter warning
  void options;
  
  // Auto-detect and apply appropriate whimsical features
  const elementType = element.tagName.toLowerCase()
  const hasDataWhimsy = element.hasAttribute('data-whimsy')
  
  if (elementType === 'button' || element.classList.contains('btn')) {
    import('../../utils/whimsicalInteractions').then(({ enhanceCTAWithChampagne }) => {
      enhanceCTAWithChampagne(element)
    })
  } else if (element.classList.contains('card') || hasDataWhimsy) {
    import('../../utils/whimsicalInteractions').then(({ enhanceCardWithLift }) => {
      enhanceCardWithLift(element)
    })
  }
}

// Usage Examples and Quick Start Guide
export const WHIMSICAL_USAGE_EXAMPLES = {
  // Enhanced button with champagne effects
  champagneButton: `
    <TherapeuticButton 
      variant="champagne" 
      whimsical 
      celebration 
      onClick={handleComplete}
    >
      Complete Module
    </TherapeuticButton>
  `,
  
  // Luxury card with lift effects
  luxuryCard: `
    <TherapeuticCard 
      variant="luxury" 
      whimsical 
      breathing 
      stackEffect
    >
      Content with whimsical interactions
    </TherapeuticCard>
  `,
  
  // New Core Components
  heroComponent: `
    <Hero 
      title="CPAT Training Excellence"
      subtitle="Professional therapeutic education"
      variant="luxury"
      onPrimaryAction={startTraining}
    />
  `,
  
  progressStepper: `
    <ProgressStepper 
      steps={moduleSteps}
      variant="horizontal"
      showDescription
    />
  `,
  
  clinicalCallout: `
    <SafetyCallout variant="emphasised">
      Always prioritize patient safety protocols
    </SafetyCallout>
  `,
  
  // Manual whimsical enhancements
  manualEnhancement: `
    import { createFeatherConfetti, addChampagneShimmer } from '@/components/luxury'
    
    // Celebrate completion
    createFeatherConfetti()
    
    // Add shimmer to element
    addChampagneShimmer(buttonElement)
  `,
  
  // Auto-enhancement via data attributes
  dataAttributes: `
    <div data-whimsy="card" class="therapeutic-card">
      Auto-enhanced with whimsical interactions
    </div>
  `
}

// Version and metadata
export const LUXURY_THERAPEUTIC_VERSION = '2.2.0' // Updated with core component system
export const COMPONENT_LIBRARY_NAME = 'Luxury Therapeutic Components with Whimsical Interactions'
export const WHIMSICAL_SYSTEM_VERSION = '1.0.0'
export const CORE_COMPONENTS_VERSION = '1.0.0'
export const LAST_UPDATED = '2025-01-04'
export const DOCUMENTATION_URL = '/src/docs/WhimsicalInteractionSpecs.md'