import React, { useState, useEffect } from 'react'
import TherapeuticCard from './TherapeuticCard'
import TherapeuticButton from './TherapeuticButton'
import TherapeuticInput from './TherapeuticForm'
import TherapeuticProgress from './TherapeuticProgress'
import TherapeuticAccessibilityTester from './TherapeuticAccessibilityTester'
import { usePerformanceMonitor, getOptimalAnimationSettings } from '../../utils/performance'
import { announceToScreenReader, respectsReducedMotion, prefersHighContrast } from '../../utils/accessibility'

const TherapeuticAccessibilityDemo: React.FC = () => {
  const [showTester, setShowTester] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  })
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const performanceMonitor = usePerformanceMonitor()
  const animationSettings = getOptimalAnimationSettings()

  useEffect(() => {
    // Simulate progress update
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async () => {
    setIsLoading(true)
    announceToScreenReader('Form submission started', 'polite')
    
    // Simulate form processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    announceToScreenReader('Form submitted successfully', 'assertive')
  }

  const metrics = performanceMonitor.getMetrics()
  const performanceScore = performanceMonitor.getPerformanceScore()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Skip Link for Screen Readers */}
      <a 
        href="#main-content" 
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 rounded-lg text-white font-semibold"
        style={{ backgroundColor: '#8FA68E' }}
      >
        Skip to main content
      </a>

      {/* Accessibility Status Banner */}
      <div 
        className="mb-8 p-4 rounded-xl border-l-4 bg-white bg-opacity-80"
        style={{ borderColor: '#8FA68E' }}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#6B7D6A' }}>
              🌿 Therapeutic Accessibility Status
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden="true">
                  {respectsReducedMotion() ? '🟢' : '🔴'}
                </span>
                <span style={{ color: '#8FA68E' }}>
                  Reduced Motion: {respectsReducedMotion() ? 'Respected' : 'Standard'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden="true">
                  {prefersHighContrast() ? '🟢' : '🟡'}
                </span>
                <span style={{ color: '#8FA68E' }}>
                  High Contrast: {prefersHighContrast() ? 'Active' : 'Standard'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden="true">
                  {performanceScore >= 80 ? '🟢' : performanceScore >= 60 ? '🟡' : '🔴'}
                </span>
                <span style={{ color: '#8FA68E' }}>
                  Performance: {performanceScore}/100
                </span>
              </div>
            </div>
          </div>
          
          <TherapeuticButton
            variant="secondary"
            size="medium"
            onClick={() => setShowTester(true)}
            ariaLabel="Open accessibility testing dashboard"
          >
            🔍 Test Accessibility
          </TherapeuticButton>
        </div>
      </div>

      <main id="main-content" tabIndex={-1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Demo Section */}
          <TherapeuticCard
            variant="floating"
            gradient
            ariaLabelledBy="form-demo-title"
            role="region"
          >
            <h2 
              id="form-demo-title"
              className="text-2xl font-bold mb-6 font-display" 
              style={{ color: '#6B7D6A' }}
            >
              Accessible Form Demo
            </h2>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
              noValidate
              className="space-y-6"
            >
              <TherapeuticInput
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                required
                validation
                errorMessage="Name is required for personalized therapeutic support"
                autoComplete="name"
              />
              
              <TherapeuticInput
                label="Email Address"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                required
                validation
                errorMessage="Please enter a valid email address"
                autoComplete="email"
              />
              
              <TherapeuticInput
                label="Therapeutic Feedback"
                type="textarea"
                placeholder="Share your experience with our therapeutic approach..."
                value={formData.feedback}
                onChange={(value) => setFormData(prev => ({ ...prev, feedback: value }))}
                rows={4}
              />
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <TherapeuticButton
                  type="submit"
                  variant="primary"
                  size="large"
                  loading={isLoading}
                  className="flex-1"
                  ariaLabel="Submit therapeutic feedback form"
                >
                  {isLoading ? 'Processing...' : 'Submit Feedback'}
                </TherapeuticButton>
                
                <TherapeuticButton
                  type="button"
                  variant="secondary"
                  size="large"
                  onClick={() => setFormData({ name: '', email: '', feedback: '' })}
                  ariaLabel="Clear all form fields"
                >
                  Clear Form
                </TherapeuticButton>
              </div>
            </form>
          </TherapeuticCard>

          {/* Interactive Demo Section */}
          <div className="space-y-6">
            {/* Progress Demo */}
            <TherapeuticCard
              variant="gentle"
              ariaLabelledBy="progress-demo-title"
              role="region"
            >
              <h3 
                id="progress-demo-title"
                className="text-xl font-semibold mb-4" 
                style={{ color: '#6B7D6A' }}
              >
                Therapeutic Progress Tracking
              </h3>
              
              <TherapeuticProgress
                progress={progress}
                variant="healing"
                size="large"
                showLabel
                label="Wellness Journey Progress"
                animated={!respectsReducedMotion()}
              />
              
              <p className="text-sm mt-3" style={{ color: '#8FA68E' }}>
                Progress updates are announced to screen readers for accessibility.
              </p>
            </TherapeuticCard>

            {/* Performance Metrics */}
            <TherapeuticCard
              variant="elevated"
              ariaLabelledBy="performance-title"
              role="region"
            >
              <h3 
                id="performance-title"
                className="text-xl font-semibold mb-4" 
                style={{ color: '#6B7D6A' }}
              >
                Real-time Performance
              </h3>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded-lg bg-white bg-opacity-50">
                  <div className="text-2xl font-bold" style={{ color: '#8FA68E' }}>
                    {Math.round(metrics.fps || 0)}
                  </div>
                  <div className="text-sm" style={{ color: '#6B7D6A' }}>
                    FPS
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-white bg-opacity-50">
                  <div className="text-2xl font-bold" style={{ color: '#8FA68E' }}>
                    {Math.round(metrics.memoryUsage || 0)}
                  </div>
                  <div className="text-sm" style={{ color: '#6B7D6A' }}>
                    MB Used
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-white bg-opacity-50">
                  <div className="text-2xl font-bold" style={{ color: '#8FA68E' }}>
                    {Math.round(metrics.lcp || 0)}
                  </div>
                  <div className="text-sm" style={{ color: '#6B7D6A' }}>
                    LCP (ms)
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-white bg-opacity-50">
                  <div className="text-2xl font-bold" style={{ color: '#8FA68E' }}>
                    {(metrics.cls || 0).toFixed(3)}
                  </div>
                  <div className="text-sm" style={{ color: '#6B7D6A' }}>
                    CLS
                  </div>
                </div>
              </div>
            </TherapeuticCard>

            {/* Animation Settings */}
            <TherapeuticCard
              variant="grounded"
              ariaLabelledBy="animation-title"
              role="region"
            >
              <h3 
                id="animation-title"
                className="text-xl font-semibold mb-4" 
                style={{ color: '#6B7D6A' }}
              >
                Adaptive Animation Settings
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: '#8FA68E' }}>
                    Complex Animations
                  </span>
                  <span 
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      animationSettings.enableComplexAnimations ? 'text-white' : 'text-white'
                    }`}
                    style={{ 
                      backgroundColor: animationSettings.enableComplexAnimations ? '#8FA68E' : '#C8856A'
                    }}
                  >
                    {animationSettings.enableComplexAnimations ? 'Enabled' : 'Simplified'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: '#8FA68E' }}>
                    GPU Acceleration
                  </span>
                  <span 
                    className={`px-2 py-1 rounded text-xs font-medium text-white`}
                    style={{ 
                      backgroundColor: animationSettings.useGPUAcceleration ? '#8FA68E' : '#C8856A'
                    }}
                  >
                    {animationSettings.useGPUAcceleration ? 'Active' : 'Disabled'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: '#8FA68E' }}>
                    Animation Speed
                  </span>
                  <span 
                    className="px-2 py-1 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: '#8FA68E' }}
                  >
                    {animationSettings.animationDuration}
                  </span>
                </div>
              </div>
            </TherapeuticCard>
          </div>
        </div>

        {/* Keyboard Navigation Instructions */}
        <TherapeuticCard
          variant="floating"
          className="mt-8"
          ariaLabelledBy="keyboard-nav-title"
          role="region"
        >
          <h2 
            id="keyboard-nav-title"
            className="text-xl font-semibold mb-4" 
            style={{ color: '#6B7D6A' }}
          >
            🎹 Keyboard Navigation Guide
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'Tab', action: 'Navigate forward through interactive elements' },
              { key: 'Shift + Tab', action: 'Navigate backward through elements' },
              { key: 'Enter / Space', action: 'Activate buttons and links' },
              { key: 'Escape', action: 'Close modals or remove focus' }
            ].map((item, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg bg-white bg-opacity-50 text-center"
              >
                <div 
                  className="font-mono font-semibold text-sm mb-2 px-2 py-1 rounded"
                  style={{ 
                    backgroundColor: '#8FA68E',
                    color: 'white'
                  }}
                >
                  {item.key}
                </div>
                <p className="text-xs" style={{ color: '#6B7D6A' }}>
                  {item.action}
                </p>
              </div>
            ))}
          </div>
        </TherapeuticCard>
      </main>

      {/* Accessibility Tester Modal */}
      {showTester && (
        <TherapeuticAccessibilityTester
          isOpen={showTester}
          onClose={() => setShowTester(false)}
        />
      )}
    </div>
  )
}

export default TherapeuticAccessibilityDemo