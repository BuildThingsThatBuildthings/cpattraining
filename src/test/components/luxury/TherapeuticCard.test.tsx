import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@test/utils/testing-library'
import { luxuryTestingUtils } from '@test/utils/testing-library'
import TherapeuticCard from '@luxury/TherapeuticCard'

describe('TherapeuticCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Core Card Functionality', () => {
    it('renders therapeutic card with luxury styling', () => {
      render(
        <TherapeuticCard data-testid="therapeutic-card">
          <h3>Module Content</h3>
          <p>Therapeutic training content goes here</p>
        </TherapeuticCard>
      )
      
      const card = screen.getByTestId('therapeutic-card')
      
      expect(card).toBeInTheDocument()
      expect(card).toBeVisible()
      expect(card).toHaveClass('therapeutic-card')
      luxuryTestingUtils.assertTherapeuticColors(card)
    })

    it('supports different card variants', () => {
      const { rerender } = render(
        <TherapeuticCard variant="luxury" data-testid="card">
          Luxury Content
        </TherapeuticCard>
      )
      
      expect(screen.getByTestId('card')).toHaveClass('therapeutic-card--luxury')
      
      rerender(
        <TherapeuticCard variant="clinical" data-testid="card">
          Clinical Content
        </TherapeuticCard>
      )
      
      expect(screen.getByTestId('card')).toHaveClass('therapeutic-card--clinical')
    })

    it('handles interactive cards with click events', async () => {
      const handleClick = vi.fn()
      
      render(
        <TherapeuticCard 
          interactive 
          onClick={handleClick} 
          data-testid="interactive-card"
        >
          <h3>Interactive Module</h3>
          <p>Click to explore</p>
        </TherapeuticCard>
      )
      
      const card = screen.getByTestId('interactive-card')
      
      expect(card).toHaveClass('therapeutic-card--interactive')
      expect(card).toHaveAttribute('role', 'button')
      expect(card).toHaveAttribute('tabindex', '0')
      
      await fireEvent.click(card)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Whimsical Enhancements', () => {
    it('applies whimsical interactions when enabled', async () => {
      render(
        <TherapeuticCard whimsical data-testid="whimsical-card">
          <h3>Whimsical Module</h3>
          <p>Enhanced with delightful interactions</p>
        </TherapeuticCard>
      )
      
      const card = screen.getByTestId('whimsical-card')
      
      await waitFor(() => {
        luxuryTestingUtils.assertWhimsicalEnhancements(card)
      })
    })

    it('implements luxury lift effect on hover', async () => {
      render(
        <TherapeuticCard 
          whimsical 
          stackEffect 
          data-testid="lift-card"
        >
          <h3>Hover for Luxury Lift</h3>
        </TherapeuticCard>
      )
      
      const card = screen.getByTestId('lift-card')
      
      // Simulate hover
      await fireEvent.mouseEnter(card)
      
      await waitFor(() => {
        expect(card).toHaveClass('luxury-lift-active')
      })
      
      await fireEvent.mouseLeave(card)
      
      await waitFor(() => {
        expect(card).not.toHaveClass('luxury-lift-active')
      })
    })

    it('supports breathing animation for calming effect', () => {
      render(
        <TherapeuticCard breathing data-testid="breathing-card">
          <h3>Breathing Card</h3>
          <p>Gentle, therapeutic animation</p>
        </TherapeuticCard>
      )
      
      const card = screen.getByTestId('breathing-card')
      
      expect(card).toHaveClass('therapeutic-breathing')
    })
  })

  describe('Content Layout and Structure', () => {
    it('renders card with header, body, and footer sections', () => {
      render(
        <TherapeuticCard data-testid="structured-card">
          <TherapeuticCard.Header>
            <h3>Module Title</h3>
            <span className="duration">45 minutes</span>
          </TherapeuticCard.Header>
          
          <TherapeuticCard.Body>
            <p>Main therapeutic content</p>
            <ul>
              <li>Learning objective 1</li>
              <li>Learning objective 2</li>
            </ul>
          </TherapeuticCard.Body>
          
          <TherapeuticCard.Footer>
            <button>Start Module</button>
            <span className="progress">0% Complete</span>
          </TherapeuticCard.Footer>
        </TherapeuticCard>
      )
      
      const card = screen.getByTestId('structured-card')
      
      expect(card.querySelector('.therapeutic-card__header')).toBeInTheDocument()
      expect(card.querySelector('.therapeutic-card__body')).toBeInTheDocument()
      expect(card.querySelector('.therapeutic-card__footer')).toBeInTheDocument()
      
      expect(screen.getByText('Module Title')).toBeInTheDocument()
      expect(screen.getByText('Main therapeutic content')).toBeInTheDocument()
      expect(screen.getByText('Start Module')).toBeInTheDocument()
    })

    it('supports image content with therapeutic styling', () => {
      render(
        <TherapeuticCard data-testid="image-card">
          <TherapeuticCard.Image 
            src="/api/placeholder/400/200" 
            alt="Therapeutic visualization"
          />
          <TherapeuticCard.Body>
            <h3>Visualization Module</h3>
            <p>Learn therapeutic visualization techniques</p>
          </TherapeuticCard.Body>
        </TherapeuticCard>
      )
      
      const card = screen.getByTestId('image-card')
      const image = screen.getByAltText('Therapeutic visualization')
      
      expect(image).toBeInTheDocument()
      expect(image).toHaveClass('therapeutic-card__image')
      expect(card.querySelector('.therapeutic-card__body')).toBeInTheDocument()
    })
  })

  describe('Progress Indication', () => {
    it('displays progress indicators for training modules', () => {
      render(
        <TherapeuticCard 
          progress={65} 
          data-testid="progress-card"
        >
          <h3>Module Progress</h3>
          <p>Continue your learning journey</p>
        </TherapeuticCard>
      )
      
      const card = screen.getByTestId('progress-card')
      const progressBar = card.querySelector('.therapeutic-progress-bar')
      
      expect(progressBar).toBeInTheDocument()
      expect(progressBar).toHaveAttribute('aria-valuenow', '65')
      expect(progressBar).toHaveAttribute('aria-valuemin', '0')
      expect(progressBar).toHaveAttribute('aria-valuemax', '100')
    })

    it('shows completion state with celebration', async () => {
      render(
        <TherapeuticCard 
          progress={100} 
          completed
          celebration
          data-testid="completed-card"
        >
          <h3>Module Complete!</h3>
          <p>Congratulations on completing this module</p>
        </TherapeuticCard>
      )
      
      const card = screen.getByTestId('completed-card')
      
      expect(card).toHaveClass('therapeutic-card--completed')
      
      // Should trigger celebration effects
      await waitFor(() => {
        expect(card).toHaveAttribute('data-celebration-active')
      })
    })
  })

  describe('Clinical Context Integration', () => {
    it('displays safety warnings appropriately', () => {
      render(
        <TherapeuticCard 
          variant="safety" 
          data-testid="safety-card"
        >
          <TherapeuticCard.SafetyAlert>
            ⚠️ Important: Always assess for photosensitivity before beginning light therapy
          </TherapeuticCard.SafetyAlert>
          
          <TherapeuticCard.Body>
            <h3>Light Therapy Module</h3>
            <p>Learn safe application of chromotherapy techniques</p>
          </TherapeuticCard.Body>
        </TherapeuticCard>
      )
      
      const card = screen.getByTestId('safety-card')
      const alert = card.querySelector('.therapeutic-safety-alert')
      
      expect(card).toHaveClass('therapeutic-card--safety')
      expect(alert).toBeInTheDocument()
      expect(alert).toHaveAttribute('role', 'alert')
      expect(screen.getByText(/Important.*photosensitivity/)).toBeInTheDocument()
    })

    it('integrates with clinical scenarios', () => {
      render(
        <TherapeuticCard 
          data-scenario-type="crisis"
          data-severity="high"
          data-testid="scenario-card"
        >
          <h3>Crisis Intervention Scenario</h3>
          <p>Practice your crisis intervention skills</p>
        </TherapeuticCard>
      )
      
      const card = screen.getByTestId('scenario-card')
      
      expect(card).toHaveAttribute('data-scenario-type', 'crisis')
      expect(card).toHaveAttribute('data-severity', 'high')
      
      luxuryTestingUtils.assertClinicalReliability(card, ['scenario-type', 'severity'])
    })
  })

  describe('Accessibility and WCAG Compliance', () => {
    it('meets WCAG 2.1 AA accessibility standards', () => {
      render(
        <TherapeuticCard 
          interactive
          aria-label="Interactive training module"
          data-testid="a11y-card"
        >
          <h3>Accessible Module</h3>
          <p>Content with proper accessibility</p>
        </TherapeuticCard>
      )
      
      const card = screen.getByTestId('a11y-card')
      
      expect(card).toHaveAccessibleName('Interactive training module')
      luxuryTestingUtils.assertTherapeuticAccessibility(card)
    })

    it('supports keyboard navigation', async () => {
      const handleKeyDown = vi.fn()
      
      render(
        <TherapeuticCard 
          interactive
          onKeyDown={handleKeyDown}
          data-testid="keyboard-card"
        >
          <h3>Keyboard Accessible</h3>
        </TherapeuticCard>
      )
      
      const card = screen.getByTestId('keyboard-card')
      
      card.focus()
      expect(card).toHaveFocus()
      
      // Test Enter key activation
      await fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' })
      expect(handleKeyDown).toHaveBeenCalled()
      
      // Test Space key activation
      await fireEvent.keyDown(card, { key: ' ', code: 'Space' })
      expect(handleKeyDown).toHaveBeenCalledTimes(2)
    })

    it('provides proper focus management', () => {
      render(
        <div>
          <TherapeuticCard interactive data-testid="card-1">
            Card 1
          </TherapeuticCard>
          <TherapeuticCard interactive data-testid="card-2">
            Card 2
          </TherapeuticCard>
        </div>
      )
      
      const card1 = screen.getByTestId('card-1')
      const card2 = screen.getByTestId('card-2')
      
      // Test tab navigation
      card1.focus()
      expect(card1).toHaveFocus()
      
      // Simulate tab key
      fireEvent.keyDown(card1, { key: 'Tab', code: 'Tab' })
      card2.focus()
      expect(card2).toHaveFocus()
    })
  })

  describe('Performance and Memory Management', () => {
    it('renders efficiently within luxury standards', async () => {
      const performanceResult = await luxuryTestingUtils.measureTherapeuticPerformance(() => {
        render(
          <TherapeuticCard whimsical stackEffect data-testid="perf-card">
            <h3>Performance Test Card</h3>
            <p>Testing render performance with luxury features</p>
          </TherapeuticCard>
        )
      })
      
      expect(performanceResult.renderTime).toBeLessThan(100)
    })

    it('handles memory efficiently with complex content', () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0
      
      render(
        <div>
          {Array.from({ length: 50 }, (_, i) => (
            <TherapeuticCard 
              key={i} 
              whimsical 
              breathing 
              data-testid={`memory-card-${i}`}
            >
              <h3>Memory Test Card {i + 1}</h3>
              <p>Testing memory usage with multiple luxury cards</p>
            </TherapeuticCard>
          ))}
        </div>
      )
      
      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0
      const memoryIncrease = finalMemory - initialMemory
      
      // Should not exceed luxury memory standards
      expect(memoryIncrease).toBeLessThan(25 * 1024 * 1024) // 25MB max increase
    })
  })

  describe('Error Handling', () => {
    it('handles missing content gracefully', () => {
      render(
        <TherapeuticCard data-testid="empty-card" />
      )
      
      const card = screen.getByTestId('empty-card')
      
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('therapeutic-card--empty')
    })

    it('handles image loading errors', () => {
      render(
        <TherapeuticCard data-testid="error-card">
          <TherapeuticCard.Image 
            src="/invalid-image.jpg" 
            alt="Failed to load"
            onError={() => console.log('Image failed to load')}
          />
        </TherapeuticCard>
      )
      
      const image = screen.getByAltText('Failed to load')
      
      // Simulate image error
      fireEvent.error(image)
      
      expect(image).toBeInTheDocument()
      // Should show placeholder or error state
      expect(image.closest('.therapeutic-card__image')).toHaveClass('image-error')
    })
  })
})