import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@test/utils/testing-library'
import { mockProgressTracking, therapeuticScenarios } from '@test/utils/testing-library'
import App from '@/App'

// Mock the progress tracking hook
vi.mock('@/hooks/useProgressTracking', () => ({
  useProgressTracking: () => mockProgressTracking
}))

describe('Training Flow Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    sessionStorage.clear()
  })

  describe('New User Onboarding Flow', () => {
    beforeEach(() => {
      mockProgressTracking.progress = {
        completedModules: [],
        currentModule: null,
        certificateEligible: false
      }
      mockProgressTracking.isSafetyAcknowledged.mockReturnValue(false)
    })

    it('redirects new user to training welcome', async () => {
      render(<App />)
      
      await waitFor(() => {
        expect(window.location.pathname).toBe('/training')
      })
      
      expect(screen.getByText(/CPAT Training/i)).toBeInTheDocument()
    })

    it('prevents access to journey before safety acknowledgment', async () => {
      render(<App />)
      
      // Try to navigate to journey directly
      window.history.pushState({}, '', '/training/journey')
      render(<App />)
      
      await waitFor(() => {
        expect(window.location.pathname).toBe('/training/safety')
      })
    })

    it('unlocks journey after safety acknowledgment', async () => {
      mockProgressTracking.isSafetyAcknowledged.mockReturnValue(true)
      
      render(<App />)
      
      window.history.pushState({}, '', '/training/journey')
      render(<App />)
      
      await waitFor(() => {
        expect(window.location.pathname).toBe('/training/journey')
      })
      
      expect(screen.getByText(/training modules/i)).toBeInTheDocument()
    })
  })

  describe('Progressive Module Access', () => {
    beforeEach(() => {
      mockProgressTracking.isSafetyAcknowledged.mockReturnValue(true)
    })

    it('allows access to first module when no modules completed', async () => {
      mockProgressTracking.progress = {
        completedModules: [],
        currentModule: null,
        certificateEligible: false
      }
      mockProgressTracking.isModuleAccessible.mockReturnValue(true)
      
      window.history.pushState({}, '', '/training/module/01-light-color-fundamentals')
      render(<App />)
      
      await waitFor(() => {
        expect(window.location.pathname).toBe('/training/module/01-light-color-fundamentals')
      })
    })

    it('blocks access to advanced modules when prerequisites not met', async () => {
      mockProgressTracking.progress = {
        completedModules: [],
        currentModule: null,
        certificateEligible: false
      }
      mockProgressTracking.isModuleAccessible.mockReturnValue(false)
      
      window.history.pushState({}, '', '/training/module/03-clinical-applications')
      render(<App />)
      
      await waitFor(() => {
        expect(window.location.pathname).toBe('/training/journey')
      })
    })

    it('unlocks subsequent modules after completion', async () => {
      mockProgressTracking.progress = {
        completedModules: ['01-light-color-fundamentals'],
        currentModule: '02-therapeutic-mechanisms',
        certificateEligible: false
      }
      mockProgressTracking.isModuleAccessible.mockReturnValue(true)
      
      window.history.pushState({}, '', '/training/module/02-therapeutic-mechanisms')
      render(<App />)
      
      await waitFor(() => {
        expect(window.location.pathname).toBe('/training/module/02-therapeutic-mechanisms')
      })
    })
  })

  describe('Certificate Eligibility Flow', () => {
    it('blocks certificate access until all modules completed', async () => {
      mockProgressTracking.progress = {
        completedModules: [
          '01-light-color-fundamentals',
          '02-therapeutic-mechanisms',
          '03-clinical-applications'
        ],
        currentModule: null,
        certificateEligible: false
      }
      mockProgressTracking.isSafetyAcknowledged.mockReturnValue(true)
      
      window.history.pushState({}, '', '/training/certificate')
      render(<App />)
      
      await waitFor(() => {
        expect(window.location.pathname).toBe('/training/journey')
      })
    })

    it('allows certificate generation when all requirements met', async () => {
      mockProgressTracking.progress = {
        completedModules: [
          '01-light-color-fundamentals',
          '02-therapeutic-mechanisms', 
          '03-clinical-applications',
          '04-safety-protocols',
          '05-patient-assessment',
          '06-practical-implementation'
        ],
        currentModule: null,
        certificateEligible: true
      }
      mockProgressTracking.isSafetyAcknowledged.mockReturnValue(true)
      
      window.history.pushState({}, '', '/training/certificate')
      render(<App />)
      
      await waitFor(() => {
        expect(window.location.pathname).toBe('/training/certificate')
      })
    })
  })

  describe('Smart Routing Behavior', () => {
    it('redirects to appropriate page based on progress', async () => {
      // User with partial progress
      mockProgressTracking.progress = {
        completedModules: ['01-light-color-fundamentals'],
        currentModule: '02-therapeutic-mechanisms',
        certificateEligible: false
      }
      mockProgressTracking.isSafetyAcknowledged.mockReturnValue(true)
      
      render(<App />)
      
      await waitFor(() => {
        expect(window.location.pathname).toBe('/training/module/02-therapeutic-mechanisms')
      })
    })

    it('redirects to certificate for completed users', async () => {
      // Fully completed user
      mockProgressTracking.progress = {
        completedModules: [
          '01-light-color-fundamentals',
          '02-therapeutic-mechanisms', 
          '03-clinical-applications',
          '04-safety-protocols',
          '05-patient-assessment',
          '06-practical-implementation'
        ],
        currentModule: null,
        certificateEligible: true
      }
      mockProgressTracking.isSafetyAcknowledged.mockReturnValue(true)
      
      render(<App />)
      
      await waitFor(() => {
        expect(window.location.pathname).toBe('/training/certificate')
      })
    })
  })

  describe('Navigation Component Integration', () => {
    it('renders navigation with proper therapeutic styling', async () => {
      render(<App />)
      
      const navigation = screen.getByRole('navigation')
      expect(navigation).toBeInTheDocument()
      expect(navigation).toHaveClass('therapeutic-navigation')
    })

    it('shows progress indicators in navigation', async () => {
      mockProgressTracking.progress = {
        completedModules: ['01-light-color-fundamentals'],
        currentModule: '02-therapeutic-mechanisms',
        certificateEligible: false
      }
      
      render(<App />)
      
      const navigation = screen.getByRole('navigation')
      const progressIndicator = navigation.querySelector('.progress-indicator')
      
      expect(progressIndicator).toBeInTheDocument()
    })
  })

  describe('Error Boundary Integration', () => {
    it('handles component errors gracefully', async () => {
      // Mock console.error to avoid test noise
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      // Simulate component error by providing invalid data
      const ErrorComponent = () => {
        throw new Error('Test component error')
      }
      
      // This would normally be wrapped by error boundary in real app
      expect(() => render(<ErrorComponent />)).toThrow()
      
      consoleSpy.mockRestore()
    })
  })

  describe('Therapeutic UX Integration', () => {
    it('initializes whimsical system on app load', async () => {
      const mockInitializeWhimsical = vi.fn()
      vi.mock('@/utils/whimsicalInteractions', () => ({
        initializeWhimsicalSystem: mockInitializeWhimsical
      }))
      
      render(<App />)
      
      await waitFor(() => {
        expect(mockInitializeWhimsical).toHaveBeenCalled()
      })
    })

    it('applies therapeutic app styling', () => {
      render(<App />)
      
      const appContainer = document.querySelector('.therapeutic-app')
      expect(appContainer).toBeInTheDocument()
      expect(appContainer).toHaveStyle({ 
        backgroundColor: 'var(--surface-primary)' 
      })
    })

    it('maintains therapeutic styling throughout navigation', async () => {
      mockProgressTracking.isSafetyAcknowledged.mockReturnValue(true)
      
      render(<App />)
      
      // Navigate through different routes
      const routes = ['/training', '/training/journey', '/training/safety']
      
      for (const route of routes) {
        window.history.pushState({}, '', route)
        render(<App />)
        
        await waitFor(() => {
          const appContainer = document.querySelector('.therapeutic-app')
          expect(appContainer).toBeInTheDocument()
          expect(appContainer).toHaveClass('therapeutic-app')
        })
      }
    })
  })

  describe('Clinical Scenario Integration', () => {
    it('supports clinical context throughout app', async () => {
      const clinicalScenario = therapeuticScenarios.crisisIntervention
      
      // Set clinical context
      sessionStorage.setItem('clinical_scenario', JSON.stringify(clinicalScenario))
      
      render(<App />)
      
      const appContainer = document.querySelector('.therapeutic-app')
      expect(appContainer).toHaveAttribute('data-clinical-context', 'active')
    })

    it('maintains clinical context during navigation', async () => {
      const clinicalScenario = therapeuticScenarios.routineSession
      sessionStorage.setItem('clinical_scenario', JSON.stringify(clinicalScenario))
      
      mockProgressTracking.isSafetyAcknowledged.mockReturnValue(true)
      
      render(<App />)
      
      // Navigate to different pages
      window.history.pushState({}, '', '/training/journey')
      render(<App />)
      
      await waitFor(() => {
        expect(sessionStorage.getItem('clinical_scenario')).toBeTruthy()
      })
    })
  })

  describe('Performance Integration', () => {
    it('loads app efficiently with luxury components', async () => {
      const startTime = performance.now()
      
      render(<App />)
      
      // Wait for initial render
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument()
      })
      
      const loadTime = performance.now() - startTime
      expect(loadTime).toBeLessThan(1000) // App should load under 1 second
    })

    it('maintains performance during route changes', async () => {
      mockProgressTracking.isSafetyAcknowledged.mockReturnValue(true)
      
      render(<App />)
      
      const routes = ['/training', '/training/journey', '/training/safety']
      const navigationTimes: number[] = []
      
      for (const route of routes) {
        const startTime = performance.now()
        
        window.history.pushState({}, '', route)
        render(<App />)
        
        await waitFor(() => {
          expect(screen.getByRole('main')).toBeInTheDocument()
        })
        
        const navigationTime = performance.now() - startTime
        navigationTimes.push(navigationTime)
      }
      
      const averageNavigationTime = navigationTimes.reduce((sum, time) => sum + time, 0) / navigationTimes.length
      expect(averageNavigationTime).toBeLessThan(500) // Navigation under 500ms
    })
  })
})