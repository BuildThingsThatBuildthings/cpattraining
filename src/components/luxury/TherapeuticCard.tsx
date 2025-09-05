import React, { useRef, useEffect } from 'react'
import { enhanceCardWithLift, addBreathingAnimation } from '../../utils/whimsicalInteractions'

interface TherapeuticCardProps {
  variant?: 'floating' | 'grounded' | 'elevated' | 'gentle' | 'luxury'
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  gradient?: boolean
  role?: string
  ariaLabel?: string
  ariaLabelledBy?: string
  tabIndex?: number
  whimsical?: boolean
  breathing?: boolean
  stackEffect?: boolean
}

const TherapeuticCard: React.FC<TherapeuticCardProps> = ({
  variant = 'floating',
  children,
  className = '',
  hover = true,
  onClick,
  gradient = false,
  role,
  ariaLabel,
  ariaLabelledBy,
  tabIndex,
  whimsical = false,
  breathing = false,
  stackEffect = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const baseClasses = 'rounded-2xl sm:rounded-3xl border backdrop-blur-sm transition-all duration-300 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-sage-primary focus:ring-offset-2 h-full flex flex-col'
  
  const variantClasses = {
    floating: 'hover:scale-[1.02] hover:-translate-y-1 active:scale-100 active:translate-y-0',
    grounded: 'hover:scale-[1.005] active:scale-100',
    elevated: 'hover:scale-[1.02] hover:-translate-y-2 active:scale-100 active:translate-y-0',
    gentle: 'hover:scale-[1.005] active:scale-100',
    luxury: 'luxury-card-lift premium-hover-lift'
  }
  
  const variantStyles = {
    floating: {
      background: gradient 
        ? 'linear-gradient(145deg, #F7F5F3, rgba(232, 240, 229, 0.9))'
        : 'rgba(247, 245, 243, 0.95)',
      borderColor: 'rgba(143, 166, 142, 0.15)',
      boxShadow: '0 8px 32px -8px rgba(143, 166, 142, 0.15)'
    },
    grounded: {
      background: gradient
        ? 'linear-gradient(145deg, rgba(232, 240, 229, 0.8), #F7F5F3)'
        : 'rgba(232, 240, 229, 0.6)',
      borderColor: 'rgba(143, 166, 142, 0.12)',
      boxShadow: '0 4px 16px -4px rgba(143, 166, 142, 0.12)'
    },
    elevated: {
      background: gradient
        ? 'linear-gradient(145deg, rgba(247, 245, 243, 0.98), rgba(232, 240, 229, 0.95))'
        : 'rgba(247, 245, 243, 0.98)',
      borderColor: 'rgba(143, 166, 142, 0.2)',
      boxShadow: '0 12px 48px -12px rgba(143, 166, 142, 0.2)'
    },
    gentle: {
      background: gradient
        ? 'linear-gradient(145deg, rgba(232, 240, 229, 0.4), rgba(247, 245, 243, 0.6))'
        : 'rgba(232, 240, 229, 0.4)',
      borderColor: 'rgba(143, 166, 142, 0.08)',
      boxShadow: '0 2px 12px -2px rgba(143, 166, 142, 0.08)'
    },
    luxury: {
      background: gradient
        ? 'linear-gradient(145deg, rgba(247, 245, 243, 0.98), rgba(232, 240, 229, 0.95))'
        : 'rgba(247, 245, 243, 0.98)',
      borderColor: 'rgba(143, 166, 142, 0.2)',
      boxShadow: '0 16px 64px -16px rgba(143, 166, 142, 0.25)',
      backdropFilter: 'blur(12px)'
    }
  }
  
  const hoverStyles = {
    floating: {
      borderColor: 'rgba(143, 166, 142, 0.25)',
      boxShadow: '0 16px 48px -12px rgba(143, 166, 142, 0.25)'
    },
    grounded: {
      borderColor: 'rgba(143, 166, 142, 0.18)',
      boxShadow: '0 8px 24px -6px rgba(143, 166, 142, 0.18)'
    },
    elevated: {
      borderColor: 'rgba(143, 166, 142, 0.3)',
      boxShadow: '0 20px 64px -16px rgba(143, 166, 142, 0.3)'
    },
    gentle: {
      borderColor: 'rgba(143, 166, 142, 0.12)',
      boxShadow: '0 4px 16px -4px rgba(143, 166, 142, 0.12)'
    },
    luxury: {
      borderColor: 'rgba(143, 166, 142, 0.35)',
      boxShadow: '0 24px 80px -20px rgba(143, 166, 142, 0.35)'
    }
  }

  // Enhanced whimsical interactions
  useEffect(() => {
    if (!cardRef.current) return

    if (whimsical) {
      enhanceCardWithLift(cardRef.current)
    }

    if (breathing) {
      addBreathingAnimation(cardRef.current)
    }
  }, [whimsical, breathing])

  return (
    <div
      ref={cardRef}
      className={`${baseClasses} ${hover ? variantClasses[variant] : ''} ${stackEffect ? 'card-stack' : ''} ${whimsical ? 'whimsy-optimized' : ''} ${breathing ? 'breathing-container' : ''} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      style={variantStyles[variant]}
      onClick={onClick}
      role={role || (onClick ? 'button' : undefined)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      tabIndex={onClick ? (tabIndex !== undefined ? tabIndex : 0) : tabIndex}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
      onMouseEnter={(e) => {
        if (hover && variant !== 'luxury') {
          Object.assign(e.currentTarget.style, {
            ...variantStyles[variant],
            ...hoverStyles[variant]
          })
        }
      }}
      onMouseLeave={(e) => {
        if (hover && variant !== 'luxury') {
          Object.assign(e.currentTarget.style, variantStyles[variant])
        }
      }}
    >
      {/* Enhanced therapeutic gradient border effect */}
      <div 
        className={`absolute inset-0 rounded-3xl p-px bg-gradient-to-br from-transparent via-sage-light to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${whimsical ? 'therapeutic-shimmer' : ''}`}
        style={{
          background: variant === 'luxury' 
            ? 'linear-gradient(135deg, transparent, rgba(218, 165, 32, 0.2), rgba(168, 192, 154, 0.3), transparent)'
            : 'linear-gradient(135deg, transparent, rgba(168, 192, 154, 0.3), transparent)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor'
        }}
      />
      
      {/* Therapeutic accent bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-3xl"
        style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)' }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  )
}

export default TherapeuticCard