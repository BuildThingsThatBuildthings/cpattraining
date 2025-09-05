import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@test/utils/testing-library'
import { luxuryTestingUtils, therapeuticScenarios } from '@test/utils/testing-library'
import TherapeuticButton from '@luxury/TherapeuticButton'

describe('TherapeuticButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Core Functionality', () => {
    it('renders with therapeutic styling and accessibility', () => {
      render(
        <TherapeuticButton data-testid="therapeutic-btn">
          Complete Assessment
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('therapeutic-btn')
      
      expect(button).toBeInTheDocument()
      expect(button).toBeVisible()
      expect(button).toHaveAccessibleName('Complete Assessment')
      luxuryTestingUtils.assertTherapeuticAccessibility(button)
    })

    it('handles click events for therapeutic interactions', async () => {
      const handleClick = vi.fn()
      
      render(
        <TherapeuticButton onClick={handleClick} data-testid="click-btn">
          Start Session
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('click-btn')
      
      await fireEvent.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object))
    })

    it('supports disabled state for clinical safety', () => {
      render(
        <TherapeuticButton disabled data-testid="disabled-btn">
          Complete Module
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('disabled-btn')
      
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Therapeutic Variants', () => {
    it('renders primary variant with sage therapeutic colors', () => {
      render(
        <TherapeuticButton variant="primary" data-testid="primary-btn">
          Primary Action
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('primary-btn')
      luxuryTestingUtils.assertTherapeuticColors(button)
    })

    it('renders secondary variant for supporting actions', () => {
      render(
        <TherapeuticButton variant="secondary" data-testid="secondary-btn">
          Secondary Action
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('secondary-btn')
      expect(button).toHaveClass('therapeutic-button--secondary')
    })

    it('renders champagne variant for celebration moments', () => {
      render(
        <TherapeuticButton variant="champagne" data-testid="champagne-btn">
          Celebrate Success
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('champagne-btn')
      expect(button).toHaveClass('therapeutic-button--champagne')
    })

    it('renders safety variant for critical actions', () => {
      render(
        <TherapeuticButton variant="safety" data-testid="safety-btn">
          Emergency Protocol
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('safety-btn')
      expect(button).toHaveClass('therapeutic-button--safety')
      expect(button).toHaveAttribute('role', 'button')
    })
  })

  describe('Whimsical Interactions', () => {
    it('applies whimsical enhancements when enabled', async () => {
      render(
        <TherapeuticButton whimsical data-testid="whimsical-btn">
          Whimsical Button
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('whimsical-btn')
      
      await waitFor(() => {
        luxuryTestingUtils.assertWhimsicalEnhancements(button)
      })
    })

    it('triggers celebration effects on completion', async () => {
      const mockCreateConfetti = vi.fn()
      vi.mock('@/utils/whimsicalInteractions', async () => ({
        ...await vi.importActual('@/utils/whimsicalInteractions'),
        createFeatherConfetti: mockCreateConfetti
      }))

      render(
        <TherapeuticButton 
          celebration 
          whimsical 
          data-testid="celebration-btn"
        >
          Complete Training
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('celebration-btn')
      await fireEvent.click(button)
      
      // Celebration effects should be triggered on completion
      await waitFor(() => {
        expect(button).toHaveAttribute('data-celebration-ready')
      })
    })

    it('applies breathing animation for calming effect', () => {
      render(
        <TherapeuticButton breathing data-testid="breathing-btn">
          Breathe
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('breathing-btn')
      expect(button).toHaveClass('therapeutic-breathing')
    })
  })

  describe('Clinical Scenarios Integration', () => {
    it('handles crisis scenario buttons appropriately', () => {
      const crisisScenario = therapeuticScenarios.crisisIntervention
      
      render(
        <TherapeuticButton 
          variant="safety"
          size="large"
          data-clinical-scenario="crisis"
          data-testid="crisis-btn"
        >
          Activate Crisis Protocol
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('crisis-btn')
      
      luxuryTestingUtils.assertClinicalReliability(button, ['scenario'])
      expect(button).toHaveAttribute('data-clinical-scenario', 'crisis')
    })

    it('supports routine session workflow', () => {
      const routineScenario = therapeuticScenarios.routineSession
      
      render(
        <TherapeuticButton 
          variant="primary"
          data-clinical-scenario="routine"
          data-testid="routine-btn"
        >
          Continue Session
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('routine-btn')
      expect(button).toHaveAttribute('data-clinical-scenario', 'routine')
    })
  })

  describe('Accessibility Compliance', () => {
    it('meets WCAG 2.1 AA standards', async () => {
      render(
        <TherapeuticButton data-testid="a11y-btn">
          Accessible Button
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('a11y-btn')
      
      // Test keyboard navigation
      button.focus()
      expect(button).toHaveFocus()
      
      // Test ARIA attributes
      expect(button).toHaveAttribute('role', 'button')
      expect(button).toHaveAttribute('type', 'button')
      
      // Test color contrast (mocked)
      luxuryTestingUtils.assertTherapeuticAccessibility(button)
    })

    it('supports screen reader navigation', () => {
      render(
        <TherapeuticButton 
          aria-label="Complete therapeutic assessment"
          aria-describedby="assessment-help"
          data-testid="sr-btn"
        >
          Complete
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('sr-btn')
      
      expect(button).toHaveAccessibleName('Complete therapeutic assessment')
      expect(button).toHaveAttribute('aria-describedby', 'assessment-help')
    })

    it('handles reduced motion preferences', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }))
      })

      render(
        <TherapeuticButton whimsical data-testid="reduced-motion-btn">
          Animated Button
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('reduced-motion-btn')
      expect(button).toHaveClass('reduce-motion')
    })
  })

  describe('Performance Testing', () => {
    it('renders within therapeutic performance standards', async () => {
      const performanceResult = await luxuryTestingUtils.measureTherapeuticPerformance(() => {
        render(
          <TherapeuticButton data-testid="perf-btn">
            Performance Test
          </TherapeuticButton>
        )
      })
      
      expect(performanceResult.renderTime).toBeLessThan(100) // 100ms max for therapeutic UX
    })

    it('handles rapid interactions without performance degradation', async () => {
      const handleClick = vi.fn()
      
      render(
        <TherapeuticButton onClick={handleClick} data-testid="rapid-btn">
          Rapid Test
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('rapid-btn')
      
      // Simulate rapid clicks
      const startTime = performance.now()
      for (let i = 0; i < 10; i++) {
        await fireEvent.click(button)
      }
      const endTime = performance.now()
      
      expect(handleClick).toHaveBeenCalledTimes(10)
      expect(endTime - startTime).toBeLessThan(200) // Total time under 200ms
    })
  })

  describe('Error States', () => {
    it('handles loading state appropriately', () => {
      render(
        <TherapeuticButton loading data-testid="loading-btn">
          Processing...
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('loading-btn')
      
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-busy', 'true')
      expect(screen.getByText('Processing...')).toBeInTheDocument()
    })

    it('displays error state for failed actions', () => {
      render(
        <TherapeuticButton 
          variant="error" 
          data-testid="error-btn"
          aria-describedby="error-message"
        >
          Retry Action
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('error-btn')
      
      expect(button).toHaveClass('therapeutic-button--error')
      expect(button).toHaveAttribute('aria-describedby', 'error-message')
    })
  })

  describe('Integration with Training Platform', () => {
    it('integrates with progress tracking system', () => {
      const mockUpdateProgress = vi.fn()
      
      render(
        <TherapeuticButton 
          onProgress={mockUpdateProgress}
          data-module-id="01-fundamentals"
          data-testid="progress-btn"
        >
          Complete Lesson
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('progress-btn')
      
      fireEvent.click(button)
      
      expect(mockUpdateProgress).toHaveBeenCalledWith(
        expect.objectContaining({
          moduleId: '01-fundamentals'
        })
      )
    })

    it('supports certificate generation workflow', async () => {
      render(
        <TherapeuticButton 
          variant="champagne"
          celebration
          data-action="generate-certificate"
          data-testid="certificate-btn"
        >
          Generate Certificate
        </TherapeuticButton>
      )
      
      const button = screen.getByTestId('certificate-btn')
      
      expect(button).toHaveAttribute('data-action', 'generate-certificate')
      expect(button).toHaveClass('therapeutic-button--champagne')
      
      await fireEvent.click(button)
      
      // Should trigger celebration effects
      await waitFor(() => {
        expect(button).toHaveAttribute('data-celebration-triggered')
      })
    })
  })
})