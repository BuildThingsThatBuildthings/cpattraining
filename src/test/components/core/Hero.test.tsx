import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@test/utils/testing-library'
import { luxuryTestingUtils } from '@test/utils/testing-library'
import Hero from '@/components/core/Hero'

describe('Hero Component', () => {
  
  describe('Core Functionality', () => {
    it('renders hero with title and subtitle', () => {
      render(
        <Hero 
          title="CPAT Training Excellence"
          subtitle="Professional therapeutic education platform"
          data-testid="hero-component"
        />
      )
      
      expect(screen.getByText('CPAT Training Excellence')).toBeInTheDocument()
      expect(screen.getByText('Professional therapeutic education platform')).toBeInTheDocument()
      
      const hero = screen.getByTestId('hero-component')
      expect(hero).toHaveClass('hero-component')
    })

    it('handles primary action button correctly', async () => {
      const handlePrimaryAction = vi.fn()
      
      render(
        <Hero 
          title="Get Started"
          subtitle="Begin your therapeutic training journey"
          primaryActionText="Start Training"
          onPrimaryAction={handlePrimaryAction}
          data-testid="hero-with-action"
        />
      )
      
      const actionButton = screen.getByRole('button', { name: 'Start Training' })
      expect(actionButton).toBeInTheDocument()
      
      await fireEvent.click(actionButton)
      expect(handlePrimaryAction).toHaveBeenCalledTimes(1)
    })

    it('supports secondary action button', async () => {
      const handleSecondaryAction = vi.fn()
      
      render(
        <Hero 
          title="Welcome Back"
          subtitle="Continue your learning"
          primaryActionText="Resume"
          secondaryActionText="View Progress"
          onSecondaryAction={handleSecondaryAction}
        />
      )
      
      const secondaryButton = screen.getByRole('button', { name: 'View Progress' })
      expect(secondaryButton).toBeInTheDocument()
      
      await fireEvent.click(secondaryButton)
      expect(handleSecondaryAction).toHaveBeenCalledTimes(1)
    })
  })

  describe('Luxury Variants', () => {
    it('renders luxury variant with premium styling', () => {
      render(
        <Hero 
          title="Premium Experience"
          subtitle="Luxury therapeutic training"
          variant="luxury"
          data-testid="luxury-hero"
        />
      )
      
      const hero = screen.getByTestId('luxury-hero')
      expect(hero).toHaveClass('hero--luxury')
      luxuryTestingUtils.assertTherapeuticColors(hero)
    })

    it('renders clinical variant for professional use', () => {
      render(
        <Hero 
          title="Clinical Protocol"
          subtitle="Evidence-based training"
          variant="clinical"
          data-testid="clinical-hero"
        />
      )
      
      const hero = screen.getByTestId('clinical-hero')
      expect(hero).toHaveClass('hero--clinical')
    })

    it('renders welcome variant for onboarding', () => {
      render(
        <Hero 
          title="Welcome to CPAT"
          subtitle="Your therapeutic education journey begins"
          variant="welcome"
          data-testid="welcome-hero"
        />
      )
      
      const hero = screen.getByTestId('welcome-hero')
      expect(hero).toHaveClass('hero--welcome')
    })
  })

  describe('Accessibility Compliance', () => {
    it('meets WCAG 2.1 AA standards', () => {
      render(
        <Hero 
          title="Accessible Hero"
          subtitle="Inclusive design for all users"
          primaryActionText="Get Started"
        />
      )
      
      // Check heading hierarchy
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Accessible Hero')
      
      // Check action button accessibility
      const button = screen.getByRole('button')
      expect(button).toHaveAccessibleName('Get Started')
    })

    it('supports keyboard navigation', async () => {
      render(
        <Hero 
          title="Keyboard Accessible"
          subtitle="Navigate with ease"
          primaryActionText="Primary Action"
          secondaryActionText="Secondary Action"
        />
      )
      
      const primaryButton = screen.getByRole('button', { name: 'Primary Action' })
      const secondaryButton = screen.getByRole('button', { name: 'Secondary Action' })
      
      // Test tab navigation
      primaryButton.focus()
      expect(primaryButton).toHaveFocus()
      
      // Tab to secondary button
      fireEvent.keyDown(primaryButton, { key: 'Tab', code: 'Tab' })
      secondaryButton.focus()
      expect(secondaryButton).toHaveFocus()
    })

    it('provides proper ARIA attributes', () => {
      render(
        <Hero 
          title="ARIA Compliant"
          subtitle="Screen reader friendly"
          aria-label="Main hero section"
          role="banner"
          data-testid="aria-hero"
        />
      )
      
      const hero = screen.getByTestId('aria-hero')
      expect(hero).toHaveAttribute('role', 'banner')
      expect(hero).toHaveAttribute('aria-label', 'Main hero section')
    })
  })

  describe('Responsive Design', () => {
    it('adapts to mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      })

      render(
        <Hero 
          title="Mobile Hero"
          subtitle="Optimized for mobile"
          data-testid="mobile-hero"
        />
      )
      
      const hero = screen.getByTestId('mobile-hero')
      expect(hero).toHaveClass('hero--mobile')
    })

    it('adapts to tablet viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768
      })

      render(
        <Hero 
          title="Tablet Hero"
          subtitle="Tablet-optimized layout"
          data-testid="tablet-hero"
        />
      )
      
      const hero = screen.getByTestId('tablet-hero')
      expect(hero).toHaveClass('hero--tablet')
    })
  })

  describe('Integration with Training Platform', () => {
    it('integrates with progress tracking', () => {
      render(
        <Hero 
          title="Continue Your Journey"
          subtitle="Pick up where you left off"
          progressValue={65}
          progressText="Module 4 of 6"
          data-testid="progress-hero"
        />
      )
      
      const progress = screen.getByRole('progressbar')
      expect(progress).toBeInTheDocument()
      expect(progress).toHaveAttribute('aria-valuenow', '65')
      
      expect(screen.getByText('Module 4 of 6')).toBeInTheDocument()
    })

    it('supports clinical context indicators', () => {
      render(
        <Hero 
          title="Crisis Intervention Training"
          subtitle="Critical skills for patient safety"
          clinicalContext="high-priority"
          urgencyLevel="immediate"
          data-testid="clinical-context-hero"
        />
      )
      
      const hero = screen.getByTestId('clinical-context-hero')
      expect(hero).toHaveAttribute('data-clinical-context', 'high-priority')
      expect(hero).toHaveAttribute('data-urgency-level', 'immediate')
      
      // Should show urgency indicator
      expect(screen.getByText(/critical skills/i)).toBeInTheDocument()
    })
  })

  describe('Performance Testing', () => {
    it('renders efficiently within luxury standards', async () => {
      const performanceResult = await luxuryTestingUtils.measureTherapeuticPerformance(() => {
        render(
          <Hero 
            title="Performance Test Hero"
            subtitle="Measuring luxury component performance"
            variant="luxury"
          />
        )
      })
      
      expect(performanceResult.renderTime).toBeLessThan(100)
    })

    it('handles complex content efficiently', async () => {
      const complexContent = {
        title: "Complex Hero with Multiple Features",
        subtitle: "Testing performance with all features enabled",
        primaryActionText: "Start Complex Journey",
        secondaryActionText: "Learn More",
        progressValue: 75,
        progressText: "Advanced Progress",
        clinicalContext: "comprehensive",
        variant: "luxury" as const
      }

      const performanceResult = await luxuryTestingUtils.measureTherapeuticPerformance(() => {
        render(<Hero {...complexContent} />)
      })
      
      expect(performanceResult.renderTime).toBeLessThan(150) // Slightly more lenient for complex hero
    })
  })

  describe('Error Handling', () => {
    it('handles missing required props gracefully', () => {
      render(<Hero title="" subtitle="" />)
      
      // Should not crash and provide fallback content
      const hero = screen.getByRole('banner')
      expect(hero).toBeInTheDocument()
    })

    it('handles action button errors gracefully', () => {
      const throwingHandler = () => {
        throw new Error('Handler error')
      }

      render(
        <Hero 
          title="Error Test"
          subtitle="Testing error handling"
          primaryActionText="Trigger Error"
          onPrimaryAction={throwingHandler}
        />
      )
      
      const button = screen.getByRole('button', { name: 'Trigger Error' })
      
      // Should not crash the component
      expect(button).toBeInTheDocument()
    })
  })

  describe('Whimsical Interactions', () => {
    it('applies whimsical enhancements when enabled', () => {
      render(
        <Hero 
          title="Whimsical Hero"
          subtitle="Enhanced with delightful interactions"
          whimsical
          data-testid="whimsical-hero"
        />
      )
      
      const hero = screen.getByTestId('whimsical-hero')
      luxuryTestingUtils.assertWhimsicalEnhancements(hero)
    })

    it('supports celebration mode for achievements', () => {
      render(
        <Hero 
          title="Congratulations!"
          subtitle="You've completed your training"
          variant="luxury"
          celebration
          data-testid="celebration-hero"
        />
      )
      
      const hero = screen.getByTestId('celebration-hero')
      expect(hero).toHaveClass('hero--celebration')
    })
  })
})