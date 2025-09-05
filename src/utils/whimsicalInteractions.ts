/**
 * Enhanced Whimsical Interactions for Therapeutic UI
 * Premium luxury experience with clinical appropriateness
 */

// Enhanced configuration for therapeutic interactions
type WhimsicalConfig = {
  respectReducedMotion: boolean;
  therapeuticTiming: boolean;
  clinicalSafeColors: boolean;
  performanceOptimized: boolean;
};

const config: WhimsicalConfig = {
  respectReducedMotion: true,
  therapeuticTiming: true,
  clinicalSafeColors: true,
  performanceOptimized: true,
};

// Utility function to check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Therapeutic color palette
export const therapeuticColors = {
  sage: {
    primary: '#8FA68E',
    secondary: '#A8C09A',
    accent: '#6B7D6A',
    light: '#C7D2CC'
  },
  champagne: {
    primary: '#D4AF37',
    secondary: '#F7E98E',
    accent: '#C8856A',
    light: '#F5E6B3'
  },
  pearl: {
    primary: '#F7F5F3',
    secondary: '#FDF8F1',
    accent: '#EDEAE7',
    surface: 'rgba(247, 245, 243, 0.95)'
  },
  healing: {
    primary: '#B8D4E3',
    secondary: '#C1E0D4',
    accent: '#9BB8C4'
  }
};

/**
 * Enhanced champagne shimmer effect for celebration moments
 */
export const addChampagneShimmer = (
  element: HTMLElement,
  duration: number = 600,
  intensity: 'subtle' | 'medium' | 'strong' = 'medium'
): void => {
  if (prefersReducedMotion() && config.respectReducedMotion) return;

  const intensityMap = {
    subtle: { opacity: 0.3, width: '50%' },
    medium: { opacity: 0.6, width: '100%' },
    strong: { opacity: 0.9, width: '150%' }
  };

  const settings = intensityMap[intensity];
  const shimmer = document.createElement('div');
  
  shimmer.style.cssText = `
    position: absolute;
    top: 0;
    left: -100%;
    width: ${settings.width};
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(212, 175, 55, ${settings.opacity}),
      transparent
    );
    pointer-events: none;
    z-index: 10;
    border-radius: inherit;
    animation: champagneShimmer ${duration}ms ease-out;
  `;

  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(shimmer);

  setTimeout(() => {
    if (shimmer.parentNode) {
      shimmer.parentNode.removeChild(shimmer);
    }
  }, duration);
};

/**
 * Enhanced sage therapeutic pulse for focus states
 */
export const addSagePulse = (
  element: HTMLElement,
  pulseCount: number = 2,
  intensity: 'gentle' | 'medium' | 'strong' = 'medium'
): void => {
  if (prefersReducedMotion() && config.respectReducedMotion) return;

  const intensityMap = {
    gentle: { scale: 1.01, opacity: 0.2, size: 4 },
    medium: { scale: 1.02, opacity: 0.3, size: 8 },
    strong: { scale: 1.05, opacity: 0.4, size: 12 }
  };

  const settings = intensityMap[intensity];
  const originalBoxShadow = element.style.boxShadow;
  const originalTransform = element.style.transform;
  let pulses = 0;

  const pulse = () => {
    if (pulses >= pulseCount) {
      element.style.boxShadow = originalBoxShadow;
      element.style.transform = originalTransform;
      return;
    }

    element.style.transform = `${originalTransform} scale(${settings.scale})`;
    element.style.boxShadow = `${originalBoxShadow}, 0 0 0 ${settings.size}px rgba(143, 166, 142, ${settings.opacity})`;
    element.style.transition = 'all 250ms ease-out';
    
    setTimeout(() => {
      element.style.transform = originalTransform;
      element.style.boxShadow = `${originalBoxShadow}, 0 0 0 0 rgba(143, 166, 142, 0)`;
      pulses++;
      if (pulses < pulseCount) {
        setTimeout(pulse, config.therapeuticTiming ? 400 : 300);
      } else {
        setTimeout(() => {
          element.style.boxShadow = originalBoxShadow;
          element.style.transition = '';
        }, 250);
      }
    }, config.therapeuticTiming ? 250 : 200);
  };

  pulse();
};

/**
 * Enhanced pearl surface glow for premium interactions
 */
export const addPearlGlow = (
  element: HTMLElement,
  intensity: 'subtle' | 'medium' | 'prominent' = 'medium',
  duration: number = 2000
): void => {
  if (prefersReducedMotion() && config.respectReducedMotion) return;

  const glowIntensity = {
    subtle: {
      inner: '0 0 15px rgba(247, 245, 243, 0.3)',
      outer: '0 0 25px rgba(247, 245, 243, 0.1)'
    },
    medium: {
      inner: '0 0 25px rgba(247, 245, 243, 0.5)',
      outer: '0 0 35px rgba(247, 245, 243, 0.2)'
    },
    prominent: {
      inner: '0 0 35px rgba(247, 245, 243, 0.7)',
      outer: '0 0 45px rgba(247, 245, 243, 0.3)'
    },
  };

  const originalBoxShadow = element.style.boxShadow;
  const glow = glowIntensity[intensity];
  
  element.style.boxShadow = `${originalBoxShadow}, ${glow.inner}, ${glow.outer}`;
  element.style.transition = 'box-shadow 300ms ease-in-out';

  setTimeout(() => {
    element.style.boxShadow = originalBoxShadow;
    setTimeout(() => {
      element.style.transition = '';
    }, 300);
  }, duration);
};

/**
 * Therapeutic breathing animation for mindfulness
 */
export const addTherapeuticBreathing = (
  element: HTMLElement,
  cycles: number = 3,
  duration: number = 4000
): void => {
  if (prefersReducedMotion() && config.respectReducedMotion) return;

  const originalTransform = element.style.transform;
  let currentCycle = 0;
  
  const breathe = () => {
    if (currentCycle >= cycles) {
      element.style.transform = originalTransform;
      element.style.transition = '';
      return;
    }

    // Inhale phase
    element.style.transition = `transform ${duration / 2}ms ease-in-out`;
    element.style.transform = `${originalTransform} scale(1.02)`;
    
    setTimeout(() => {
      // Exhale phase
      element.style.transform = `${originalTransform} scale(0.99)`;
      
      setTimeout(() => {
        element.style.transform = originalTransform;
        currentCycle++;
        if (currentCycle < cycles) {
          setTimeout(breathe, 300); // Brief pause between cycles
        }
      }, duration / 2);
    }, duration / 2);
  };

  breathe();
};

/**
 * Enhanced therapeutic celebration particles
 */
export const createTherapeuticConfetti = (
  container: HTMLElement,
  variant: 'gentle' | 'celebration' | 'mastery' = 'gentle'
): void => {
  if (prefersReducedMotion()) return;

  const variants = {
    gentle: { count: 6, colors: [therapeuticColors.sage.primary, therapeuticColors.pearl.primary], duration: 2000 },
    celebration: { count: 12, colors: [therapeuticColors.champagne.primary, therapeuticColors.sage.primary], duration: 3000 },
    mastery: { count: 20, colors: [therapeuticColors.champagne.primary, '#FFD700', therapeuticColors.sage.primary], duration: 4000 }
  };

  const variantConfig = variants[variant];
  
  for (let i = 0; i < variantConfig.count; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      const color = variantConfig.colors[Math.floor(Math.random() * variantConfig.colors.length)];
      
      particle.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}%;
        width: ${3 + Math.random() * 4}px;
        height: ${3 + Math.random() * 4}px;
        background: ${color};
        border-radius: 50%;
        z-index: 9999;
        pointer-events: none;
        opacity: 0.8;
        transform: rotate(${Math.random() * 360}deg);
        animation: therapeuticConfettiFall ${variantConfig.duration}ms ease-out forwards;
      `;
      
      container.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, variantConfig.duration);
    }, i * 100);
  }
};

/**
 * Enhanced button interactions with haptic feedback
 */
export const enhanceTherapeuticButton = (button: HTMLElement): void => {
  if (config.performanceOptimized) {
    button.style.willChange = 'transform, box-shadow';
    button.style.backfaceVisibility = 'hidden';
  }

  // Enhanced focus management
  button.addEventListener('focus', () => {
    button.style.outline = '2px solid var(--sage-600)';
    button.style.outlineOffset = '2px';
    if (!prefersReducedMotion()) {
      addSagePulse(button, 1, 'gentle');
    }
  });

  button.addEventListener('blur', () => {
    button.style.outline = '';
    button.style.outlineOffset = '';
  });

  // Haptic-like click feedback
  button.addEventListener('mousedown', () => {
    if (!prefersReducedMotion()) {
      button.style.transform = 'scale(0.96)';
      button.style.transition = 'transform 100ms ease';
    }
  });

  button.addEventListener('mouseup', () => {
    if (!prefersReducedMotion()) {
      button.style.transform = '';
      setTimeout(() => {
        button.style.transition = '';
      }, 100);
    }
  });

  // Enhanced hover effects
  if (button.classList.contains('pearl-surface')) {
    button.addEventListener('mouseenter', () => {
      addPearlGlow(button, 'subtle', 1500);
    });
  }

  // Celebration effects for completion buttons
  if (button.classList.contains('celebration') || button.dataset.celebration) {
    button.addEventListener('click', () => {
      addChampagneShimmer(button, 800, 'strong');
      createTherapeuticConfetti(button, 'celebration');
    });
  }
};

/**
 * Enhanced module card interactions with status awareness
 */
export const enhanceModuleCard = (card: HTMLElement): void => {
  const status = card.dataset.status;
  
  if (status === 'locked') return;

  if (config.performanceOptimized) {
    card.style.willChange = 'transform, box-shadow';
  }

  card.addEventListener('mouseenter', () => {
    if (!prefersReducedMotion()) {
      card.style.transform = 'translateY(-4px) scale(1.01)';
      card.style.transition = 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)';
      
      switch (status) {
        case 'completed':
          setTimeout(() => addChampagneShimmer(card, 600, 'medium'), 100);
          break;
        case 'available':
          addSagePulse(card, 1, 'gentle');
          break;
        case 'in-progress':
          addTherapeuticBreathing(card, 1, 2000);
          break;
      }
    }
  });

  card.addEventListener('mouseleave', () => {
    if (!prefersReducedMotion()) {
      card.style.transform = '';
    }
  });

  // Click celebration
  if (status !== 'locked') {
    card.addEventListener('click', () => {
      if (!prefersReducedMotion()) {
        addSagePulse(card, 2, 'medium');
      }
    });
  }
};

/**
 * Enhanced CTA with champagne effects and accessibility
 */
export const enhanceCTAWithChampagne = (element: HTMLElement): void => {
  element.addEventListener('mouseenter', () => {
    if (!prefersReducedMotion()) {
      addChampagneShimmer(element, 600, 'medium');
    }
  });

  // Periodic gentle shimmer for high-priority CTAs
  if (element.classList.contains('high-priority')) {
    const shimmerInterval = setInterval(() => {
      if (!element.isConnected) {
        clearInterval(shimmerInterval);
        return;
      }
      if (!prefersReducedMotion()) {
        addChampagneShimmer(element, 800, 'subtle');
      }
    }, 8000);
  }
};

/**
 * Enhanced progress celebration with milestone tracking
 */
export const celebrateProgress = (
  element: HTMLElement,
  progressPercentage: number,
  previousPercentage: number = 0
): void => {
  if (prefersReducedMotion() && config.respectReducedMotion) return;

  const milestones = [25, 50, 75, 100];
  const crossedMilestone = milestones.find(
    milestone => previousPercentage < milestone && progressPercentage >= milestone
  );

  if (crossedMilestone) {
    if (crossedMilestone === 100) {
      // Full completion celebration
      addChampagneShimmer(element, 1200, 'strong');
      setTimeout(() => addSagePulse(element, 3, 'strong'), 300);
      setTimeout(() => {
        createTherapeuticConfetti(element, 'mastery');
        addTherapeuticBreathing(element, 2, 3000);
      }, 600);
    } else {
      // Milestone celebration
      addSagePulse(element, 2, 'medium');
      setTimeout(() => addChampagneShimmer(element, 800, 'medium'), 200);
      createTherapeuticConfetti(element, 'celebration');
    }
  } else if (progressPercentage > previousPercentage) {
    // General progress
    addSagePulse(element, 1, 'gentle');
  }
};

/**
 * Enhanced notification with therapeutic timing
 */
export const enhanceNotification = (
  notification: HTMLElement,
  type: 'success' | 'info' | 'warning' | 'error' | 'therapeutic'
): void => {
  if (prefersReducedMotion() && config.respectReducedMotion) {
    notification.style.opacity = '0';
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transition = 'opacity 300ms ease';
    }, 100);
    return;
  }

  // Enhanced entrance animation
  notification.style.transform = 'translateY(-20px) scale(0.95)';
  notification.style.opacity = '0';
  
  setTimeout(() => {
    notification.style.transform = 'translateY(0) scale(1)';
    notification.style.opacity = '1';
    notification.style.transition = 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)';
  }, 100);

  // Type-specific enhancements
  setTimeout(() => {
    switch (type) {
      case 'success':
        addChampagneShimmer(notification, 600, 'medium');
        createTherapeuticConfetti(notification, 'celebration');
        break;
      case 'therapeutic':
        addTherapeuticBreathing(notification, 1, 2000);
        break;
      case 'info':
        addSagePulse(notification, 1, 'gentle');
        break;
      case 'warning':
      case 'error':
        addPearlGlow(notification, 'medium', 1000);
        break;
    }
  }, 300);
};

/**
 * Enhanced progress stepper with accessibility
 */
export const enhanceProgressStepper = (stepper: HTMLElement): void => {
  const steps = stepper.querySelectorAll('[data-whimsy="step-item"]');
  
  steps.forEach((step) => {
    const stepElement = step as HTMLElement;
    const isCompleted = step.classList.contains('completed');
    const isCurrent = step.classList.contains('current');
    
    step.addEventListener('mouseenter', () => {
      if (!prefersReducedMotion()) {
        stepElement.style.transform = 'scale(1.02)';
        stepElement.style.transition = 'transform 200ms ease';
        
        if (isCompleted) {
          const circle = step.querySelector('.rounded-full');
          if (circle) {
            addChampagneShimmer(circle as HTMLElement, 400, 'subtle');
          }
        } else if (isCurrent) {
          addSagePulse(stepElement, 1, 'gentle');
        }
      }
    });
    
    step.addEventListener('mouseleave', () => {
      if (!prefersReducedMotion()) {
        stepElement.style.transform = '';
      }
    });

    step.addEventListener('click', () => {
      if (!step.classList.contains('locked') && !prefersReducedMotion()) {
        addSagePulse(stepElement, 1, 'medium');
      }
    });
  });
};

/**
 * Loading state enhancements
 */
export const enhanceLoadingState = (
  loader: HTMLElement,
  variant: 'breathing' | 'flowing' | 'gentle' | 'healing' = 'breathing'
): void => {
  if (prefersReducedMotion() && config.respectReducedMotion) return;

  switch (variant) {
    case 'breathing':
      addTherapeuticBreathing(loader, 999, 3000);
      break;
    case 'flowing':
      const waves = loader.querySelectorAll('[data-wave]');
      waves.forEach((wave, index) => {
        const waveElement = wave as HTMLElement;
        setTimeout(() => {
          addSagePulse(waveElement, 999, 'gentle');
        }, index * 200);
      });
      break;
    case 'gentle':
      addPearlGlow(loader, 'subtle', 999999);
      break;
    case 'healing':
      addTherapeuticBreathing(loader, 999, 4000);
      setTimeout(() => addSagePulse(loader, 999, 'gentle'), 1000);
      break;
  }
};

/**
 * Form field enhancements
 */
export const enhanceFormField = (
  field: HTMLElement,
  type: 'focus' | 'success' | 'error' | 'therapeutic' = 'focus'
): void => {
  switch (type) {
    case 'focus':
      addSagePulse(field, 1, 'gentle');
      break;
    case 'success':
      addChampagneShimmer(field, 600, 'subtle');
      break;
    case 'error':
      addPearlGlow(field, 'prominent', 1000);
      break;
    case 'therapeutic':
      addTherapeuticBreathing(field, 1, 2000);
      break;
  }
};

/**
 * Accessibility-aware interaction enhancement
 */
export const enhanceForAccessibility = (element: HTMLElement): void => {
  element.addEventListener('focus', () => {
    element.style.outline = '2px solid var(--sage-600)';
    element.style.outlineOffset = '2px';
    if (!prefersReducedMotion()) {
      addSagePulse(element, 1, 'gentle');
    }
  });

  element.addEventListener('blur', () => {
    element.style.outline = '';
    element.style.outlineOffset = '';
  });

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (!prefersReducedMotion()) {
        addSagePulse(element, 1, 'medium');
      }
    }
  });
};

/**
 * Performance optimization utilities
 */
export const optimizeForPerformance = (element: HTMLElement): void => {
  element.style.willChange = 'transform, opacity, box-shadow';
  element.style.backfaceVisibility = 'hidden';
  element.style.transform = 'translateZ(0)';
};

/**
 * Cleanup utility
 */
export const cleanupWhimsicalEffects = (element: HTMLElement): void => {
  element.style.transform = '';
  element.style.transition = '';
  element.style.boxShadow = '';
  element.style.opacity = '';
  element.style.willChange = '';
};

/**
 * CSS animations injection
 */
export const injectWhimsicalStyles = (): void => {
  if (typeof document === 'undefined') return;
  
  const styleId = 'whimsical-therapeutic-styles';
  if (document.getElementById(styleId)) return;

  const styles = `
    <style id="${styleId}">
      @keyframes champagneShimmer {
        0% {
          transform: translateX(-100%) skewX(-15deg);
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: translateX(200%) skewX(-15deg);
          opacity: 0;
        }
      }
      
      @keyframes therapeuticConfettiFall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
      
      @keyframes sagePulse {
        0%, 100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(143, 166, 142, 0.4);
        }
        50% {
          transform: scale(1.02);
          box-shadow: 0 0 0 8px rgba(143, 166, 142, 0);
        }
      }
      
      @keyframes therapeuticBreathing {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.01); }
        50% { transform: scale(1.02); }
        75% { transform: scale(1.01); }
      }
      
      @keyframes pearlGlow {
        0%, 100% {
          box-shadow: 0 0 20px rgba(247, 245, 243, 0.2);
        }
        50% {
          box-shadow: 0 0 30px rgba(247, 245, 243, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1);
        }
      }
      
      .whimsy-optimized {
        will-change: transform, opacity, box-shadow;
        backface-visibility: hidden;
        transform: translateZ(0);
      }
      
      .whimsy-touch:active {
        transition: transform 100ms ease;
        transform: scale(0.95);
      }
      
      .therapeutic-interactive {
        cursor: pointer;
        user-select: none;
      }
      
      .therapeutic-interactive:hover {
        filter: brightness(1.02);
      }
      
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
      
      @media (prefers-contrast: high) {
        .therapeutic-focus-ring:focus {
          outline: 3px solid !important;
          outline-offset: 3px !important;
        }
      }
    </style>
  `;
  
  document.head.insertAdjacentHTML('beforeend', styles);
};

// Auto-initialize
injectWhimsicalStyles();

// Export configuration
export { config };

// Legacy support for existing components
export const respectsReducedMotion = prefersReducedMotion;
export const createFeatherConfetti = (container?: HTMLElement) => {
  createTherapeuticConfetti(container || document.body, 'gentle');
};
export const therapeuticPulse = (element: HTMLElement, duration: number = 2000) => {
  addSagePulse(element, Math.ceil(duration / 1000), 'medium');
};
export const celebrateStepCompletion = (element: HTMLElement) => {
  addSagePulse(element, 2, 'medium');
  createTherapeuticConfetti(element, 'celebration');
};
export const celebrateModuleCompletion = (element: HTMLElement) => {
  celebrateProgress(element, 100, 0);
};

// Missing exports for component compatibility
export const initializeWhimsicalSystem = injectWhimsicalStyles;
export const enhancePearlSurface = (element: HTMLElement) => {
  addPearlGlow(element, 'subtle', 2000);
};
export const enhanceCardWithLift = (element: HTMLElement) => {
  enhanceTherapeuticButton(element);
};
export const addBreathingAnimation = addTherapeuticBreathing;

// Default export
export default {
  addChampagneShimmer,
  addSagePulse,
  addPearlGlow,
  addTherapeuticBreathing,
  createTherapeuticConfetti,
  enhanceTherapeuticButton,
  enhanceModuleCard,
  enhanceCTAWithChampagne,
  celebrateProgress,
  enhanceNotification,
  enhanceProgressStepper,
  enhanceLoadingState,
  enhanceFormField,
  enhanceForAccessibility,
  optimizeForPerformance,
  cleanupWhimsicalEffects,
  prefersReducedMotion,
  therapeuticColors,
  config
};