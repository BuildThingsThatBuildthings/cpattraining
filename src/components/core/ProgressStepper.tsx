import React from 'react'
import { Check } from 'lucide-react'

interface StepData {
  id: string
  title: string
  description?: string
  status: 'completed' | 'current' | 'upcoming' | 'locked'
  duration?: string
  index: number
}

interface ProgressStepperProps {
  steps: StepData[]
  currentStep?: number
  onStepClick?: (stepIndex: number, stepId: string) => void
  variant?: 'horizontal' | 'vertical'
  showDescription?: boolean
  className?: string
  size?: 'compact' | 'default' | 'large'
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({
  steps,
  currentStep: _currentStep = 0,
  onStepClick,
  variant = 'horizontal',
  showDescription = true,
  className = "",
  size = 'default'
}) => {
  const sizeStyles = {
    compact: {
      circle: 'w-8 h-8',
      title: 'text-sm',
      description: 'text-xs',
      spacing: 'gap-3'
    },
    default: {
      circle: 'w-12 h-12',
      title: 'text-base',
      description: 'text-sm',
      spacing: 'gap-4'
    },
    large: {
      circle: 'w-16 h-16',
      title: 'text-lg',
      description: 'text-base',
      spacing: 'gap-6'
    }
  }

  const currentSizeStyles = sizeStyles[size]

  const getStepStyles = (step: StepData, index: number) => {
    // Suppress unused parameter warning - index is used in calling code
    void index;
    const styles = {
      container: "relative flex items-center",
      circle: `${currentSizeStyles.circle} rounded-full border-2 flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer`,
      title: `${currentSizeStyles.title} font-semibold transition-colors duration-300`,
      description: `${currentSizeStyles.description} text-slate-400 transition-colors duration-300`,
      connector: "absolute bg-slate-600 transition-all duration-300"
    }

    switch (step.status) {
      case 'completed':
        return {
          ...styles,
          circle: `${styles.circle} bg-sage-700 border-sage-700 text-text-primary hover:bg-sage-600 hover:border-sage-600 hover:shadow-lg hover:shadow-sage-700/25`,
          title: `${styles.title} text-text-primary`,
          description: `${styles.description} text-slate-300`,
          connector: `${styles.connector} bg-sage-700`
        }
      case 'current':
        return {
          ...styles,
          circle: `${styles.circle} bg-sage-700/20 border-sage-600 text-sage-600 ring-4 ring-sage-600/20 hover:bg-sage-700/30 hover:shadow-lg hover:shadow-sage-600/25`,
          title: `${styles.title} text-text-primary`,
          description: `${styles.description} text-slate-300`,
          connector: `${styles.connector} bg-slate-600`
        }
      case 'upcoming':
        return {
          ...styles,
          circle: `${styles.circle} bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700 hover:border-slate-500 hover:text-slate-300`,
          title: `${styles.title} text-slate-400 hover:text-slate-300`,
          description: `${styles.description} text-slate-500`,
          connector: `${styles.connector} bg-slate-600`
        }
      case 'locked':
      default:
        return {
          ...styles,
          circle: `${styles.circle} bg-slate-900 border-slate-700 text-slate-600 cursor-not-allowed`,
          title: `${styles.title} text-slate-600`,
          description: `${styles.description} text-slate-600`,
          connector: `${styles.connector} bg-slate-700`
        }
    }
  }

  const handleStepClick = (step: StepData, index: number) => {
    if (step.status !== 'locked' && onStepClick) {
      onStepClick(index, step.id)
    }
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col ${className}`} data-whimsy="progress-stepper">
        {steps.map((step, index) => {
          const stepStyles = getStepStyles(step, index)
          const isNotLast = index < steps.length - 1

          return (
            <div key={step.id} className="relative">
              <div 
                className={`flex items-start ${currentSizeStyles.spacing} p-4 rounded-xl hover:bg-slate-800/30 transition-all duration-300`}
                onClick={() => handleStepClick(step, index)}
                role="button"
                tabIndex={step.status === 'locked' ? -1 : 0}
                aria-current={step.status === 'current' ? 'step' : undefined}
                data-whimsy="step-item"
              >
                {/* Step Circle */}
                <div className={stepStyles.circle}>
                  {step.status === 'completed' ? (
                    <Check size={size === 'compact' ? 16 : size === 'large' ? 24 : 20} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className={stepStyles.title}>
                      {step.title}
                    </h3>
                    {step.duration && (
                      <span className="text-xs text-champagne-600 bg-champagne-600/10 px-2 py-1 rounded-full">
                        {step.duration}
                      </span>
                    )}
                  </div>
                  {showDescription && step.description && (
                    <p className={stepStyles.description}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Vertical Connector */}
              {isNotLast && (
                <div 
                  className={`${stepStyles.connector} w-0.5 h-8 ml-6`}
                  style={{ marginLeft: `calc(1.5rem + ${currentSizeStyles.circle.includes('w-8') ? '1rem' : currentSizeStyles.circle.includes('w-16') ? '2rem' : '1.5rem'})` }}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Horizontal Layout
  return (
    <div className={`flex items-center justify-between ${className}`} data-whimsy="progress-stepper">
      {steps.map((step, index) => {
        const stepStyles = getStepStyles(step, index)
        const isNotLast = index < steps.length - 1

        return (
          <React.Fragment key={step.id}>
            <div 
              className="flex flex-col items-center text-center max-w-xs"
              onClick={() => handleStepClick(step, index)}
              role="button"
              tabIndex={step.status === 'locked' ? -1 : 0}
              aria-current={step.status === 'current' ? 'step' : undefined}
              data-whimsy="step-item"
            >
              {/* Step Circle */}
              <div className={stepStyles.circle}>
                {step.status === 'completed' ? (
                  <Check size={size === 'compact' ? 16 : size === 'large' ? 24 : 20} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Step Content */}
              <div className="mt-3 space-y-1">
                <div className="flex flex-col items-center gap-1">
                  <h3 className={stepStyles.title}>
                    {step.title}
                  </h3>
                  {step.duration && (
                    <span className="text-xs text-champagne-600 bg-champagne-600/10 px-2 py-1 rounded-full whitespace-nowrap">
                      {step.duration}
                    </span>
                  )}
                </div>
                {showDescription && step.description && (
                  <p className={`${stepStyles.description} max-w-28`}>
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Horizontal Connector */}
            {isNotLast && (
              <div className={`${stepStyles.connector} h-0.5 flex-1 mx-4`} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default ProgressStepper