import React, { useRef, useEffect } from 'react'
import { addChampagneShimmer, enhanceCTAWithChampagne, enhanceTherapeuticButton } from '../../utils/whimsicalInteractions'

interface TherapeuticButtonProps {
  variant?: 'primary' | 'secondary' | 'therapeutic' | 'gentle' | 'champagne'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
  ariaDescribedBy?: string
  autoFocus?: boolean
  whimsical?: boolean
  celebration?: boolean
}

const TherapeuticButton: React.FC<TherapeuticButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled = false,
  className = '',
  icon,
  loading = false,
  type = 'button',
  ariaLabel,
  ariaDescribedBy,
  autoFocus = false,
  whimsical = false,
  celebration = false
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const baseClasses = 'font-semibold transition-all duration-300 border-0 cursor-pointer flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden group therapeutic-focus-ring focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2 active:transform active:scale-95'
  
  const sizeClasses = {
    small: 'px-3 sm:px-4 py-2 text-sm rounded-lg sm:rounded-xl min-h-[36px] sm:min-h-[40px]',
    medium: 'px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl sm:rounded-2xl min-h-[44px] sm:min-h-[48px]',
    large: 'px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-2xl sm:rounded-3xl min-h-[52px] sm:min-h-[56px]'
  }
  
  const variantClasses = {
    primary: 'text-white shadow-lg hover:shadow-xl clinical-hover-lift therapeutic-button-primary',
    secondary: 'border-2 shadow-md hover:shadow-lg clinical-hover-lift',
    therapeutic: 'text-white shadow-md hover:shadow-lg clinical-hover-lift',
    gentle: 'shadow-sm hover:shadow-md clinical-hover-lift pearl-surface',
    champagne: 'text-white shadow-lg hover:shadow-xl champagne-cta therapeutic-button-primary clinical-hover-lift'
  }
  
  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #A8C09A, #8FA68E)',
      boxShadow: '0 4px 12px -2px rgba(143, 166, 142, 0.25)'
    },
    secondary: {
      background: '#F7F5F3',
      color: '#6B7D6A',
      borderColor: '#8FA68E',
      boxShadow: '0 2px 8px -2px rgba(143, 166, 142, 0.15)'
    },
    therapeutic: {
      background: 'linear-gradient(135deg, #C8B8DB, #B8D4E3)',
      boxShadow: '0 3px 10px -2px rgba(200, 184, 219, 0.3)'
    },
    gentle: {
      background: 'rgba(232, 240, 229, 0.8)',
      color: '#8FA68E',
      backdropFilter: 'blur(10px)'
    },
    champagne: {
      background: 'linear-gradient(135deg, var(--sage-primary), var(--warm-accent))',
      boxShadow: '0 4px 12px -2px rgba(218, 165, 32, 0.25)'
    }
  }
  
  const hoverStyles = {
    primary: {
      background: 'linear-gradient(135deg, #6B7D6A, #8FA68E)',
      boxShadow: '0 8px 24px -4px rgba(143, 166, 142, 0.35)'
    },
    secondary: {
      background: 'linear-gradient(135deg, #A8C09A, #8FA68E)',
      color: 'white',
      borderColor: '#6B7D6A'
    },
    therapeutic: {
      background: 'linear-gradient(135deg, #B8D4E3, #C1E0D4)',
      boxShadow: '0 6px 20px -3px rgba(184, 212, 227, 0.4)'
    },
    gentle: {
      background: 'rgba(168, 192, 154, 0.2)',
      color: '#6B7D6A'
    },
    champagne: {
      background: 'linear-gradient(135deg, var(--warm-accent), var(--sage-primary))',
      boxShadow: '0 8px 24px -4px rgba(218, 165, 32, 0.35)'
    }
  }
  
  const disabledStyles = {
    opacity: 0.5,
    cursor: 'not-allowed',
    transform: 'none'
  }

  // Enhanced whimsical interactions
  useEffect(() => {
    if (buttonRef.current) {
      enhanceTherapeuticButton(buttonRef.current)
      if (whimsical) {
        enhanceCTAWithChampagne(buttonRef.current)
      }
    }
  }, [whimsical])

  const handleClick = () => {
    if (celebration && buttonRef.current) {
      addChampagneShimmer(buttonRef.current, 800)
    }
    onClick?.()
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${whimsical ? 'whimsy-optimized whimsy-touch' : ''} ${className}`}
      style={{
        ...variantStyles[variant],
        ...(disabled ? disabledStyles : {})
      }}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      autoFocus={autoFocus}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.currentTarget.style, hoverStyles[variant])
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.currentTarget.style, variantStyles[variant])
        }
      }}
    >
      {/* Enhanced therapeutic shimmer effect - moved to CSS classes */}
      {variant !== 'gentle' && (
        <div 
          className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none ${variant === 'champagne' ? 'opacity-80' : 'opacity-60'}`}
          style={{
            background: variant === 'champagne' 
              ? 'linear-gradient(90deg, transparent, rgba(214, 194, 155, 0.6), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
          }}
        />
      )}
      
      {loading ? (
        <>
          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" aria-hidden="true">{icon}</span>}
          <span className="relative z-10 truncate transition-all duration-300 group-hover:tracking-wide">{children}</span>
        </>
      )}
    </button>
  )
}

export default TherapeuticButton