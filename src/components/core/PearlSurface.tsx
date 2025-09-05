import React, { useEffect, useRef } from 'react'
import { enhancePearlSurface } from '../../utils/whimsicalInteractions'

interface PearlSurfaceProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'luxury' | 'clinical' | 'elevated' | 'floating'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  glow?: boolean
  interactive?: boolean
  blur?: 'none' | 'sm' | 'md' | 'lg'
  opacity?: number // 0-100
  borderStyle?: 'subtle' | 'visible' | 'accent' | 'none'
}

const PearlSurface: React.FC<PearlSurfaceProps> = ({
  children,
  className = "",
  variant = 'default',
  size = 'md',
  glow = false,
  interactive = false,
  blur = 'md',
  opacity = 10,
  borderStyle = 'subtle'
}) => {
  const surfaceRef = useRef<HTMLDivElement>(null)
  
  // Initialize luxury interactions
  useEffect(() => {
    if (surfaceRef.current) {
      enhancePearlSurface(surfaceRef.current)
    }
  }, [interactive, variant])
  // Size configurations
  const sizeStyles = {
    sm: 'p-4 rounded-xl',
    md: 'p-6 rounded-xl',
    lg: 'p-8 rounded-2xl',
    xl: 'p-10 rounded-2xl',
    full: 'p-12 rounded-3xl'
  }

  // Blur configurations
  const blurStyles = {
    none: '',
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  }

  // Border configurations
  const borderStyles = {
    none: 'border-0',
    subtle: 'border border-slate-700/30',
    visible: 'border border-slate-600/50',
    accent: 'border border-sage-600/30'
  }

  // Variant-specific styles
  const variantConfigs = {
    default: {
      background: `bg-slate-800/${opacity}`,
      shadow: 'shadow-lg',
      hoverShadow: 'hover:shadow-xl',
      border: borderStyles[borderStyle],
      glow: glow ? 'shadow-slate-600/20' : ''
    },
    luxury: {
      background: `bg-gradient-to-br from-slate-800/${opacity} via-slate-700/${Math.min(opacity + 5, 20)} to-sage-900/${Math.max(opacity - 5, 5)}`,
      shadow: 'shadow-xl',
      hoverShadow: 'hover:shadow-2xl',
      border: borderStyles[borderStyle] || 'border border-sage-600/20',
      glow: glow ? 'shadow-sage-600/20' : ''
    },
    clinical: {
      background: `bg-slate-900/${opacity}`,
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg',
      border: borderStyles[borderStyle] || 'border border-slate-600/40',
      glow: glow ? 'shadow-slate-500/15' : ''
    },
    elevated: {
      background: `bg-gradient-to-b from-slate-700/${opacity + 5} to-slate-800/${opacity}`,
      shadow: 'shadow-2xl',
      hoverShadow: 'hover:shadow-3xl',
      border: borderStyles[borderStyle] || 'border border-slate-600/30',
      glow: glow ? 'shadow-sage-600/25' : ''
    },
    floating: {
      background: `bg-slate-800/${opacity}`,
      shadow: 'shadow-2xl shadow-slate-900/50',
      hoverShadow: 'hover:shadow-3xl hover:shadow-slate-900/60',
      border: borderStyles[borderStyle] || 'border border-slate-600/20',
      glow: glow ? 'shadow-champagne-600/20' : ''
    }
  }

  const config = variantConfigs[variant]

  // Glass morphism effect layers
  const glassMorphismLayers = (
    <>
      {/* Base glass layer */}
      <div className={`absolute inset-0 ${sizeStyles[size].split(' ')[1]} ${config.background} ${blurStyles[blur]}`}></div>
      
      {/* Shimmer overlay for luxury variants */}
      {(variant === 'luxury' || variant === 'elevated') && (
        <div className={`absolute inset-0 ${sizeStyles[size].split(' ')[1]} bg-gradient-to-br from-champagne-600/5 via-transparent to-sage-600/5`}></div>
      )}
      
      {/* Subtle inner highlight */}
      <div className={`absolute inset-[1px] ${sizeStyles[size].split(' ')[1]} bg-gradient-to-b from-white/5 to-transparent`}></div>
      
      {/* Glow effect */}
      {glow && (
        <div className={`absolute inset-0 ${sizeStyles[size].split(' ')[1]} bg-gradient-to-br from-sage-600/10 via-transparent to-champagne-600/10 blur-xl`}></div>
      )}
    </>
  )

  return (
    <div 
      ref={surfaceRef}
      className={`
        relative overflow-hidden pearl-surface
        ${sizeStyles[size]}
        ${config.border}
        ${config.shadow} ${config.glow}
        ${interactive ? `${config.hoverShadow} clinical-hover-lift cursor-pointer transition-all duration-300` : 'transition-shadow duration-300'}
        ${className}
      `}
      data-whimsy={interactive ? "pearl-surface-interactive" : "pearl-surface"}
    >
      {/* Glass morphism background layers */}
      {glassMorphismLayers}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Interactive states */}
      {interactive && (
        <>
          {/* Hover state shimmer - enhanced */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
            <div className={`absolute inset-0 ${sizeStyles[size].split(' ')[1]} bg-gradient-to-r from-transparent via-champagne-600/8 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-800 ease-in-out`}></div>
          </div>
          
          {/* Champagne glint effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`absolute inset-0 ${sizeStyles[size].split(' ')[1]} bg-gradient-to-br from-champagne-600/5 via-transparent to-sage-600/5 animate-pulse`}></div>
          </div>
          
          {/* Enhanced focus ring */}
          <div className="absolute inset-0 rounded-[inherit] ring-2 ring-sage-600/0 focus-within:ring-sage-600/50 focus-within:ring-offset-2 focus-within:ring-offset-slate-800 transition-all duration-200"></div>
        </>
      )}
    </div>
  )
}

// Pre-configured pearl surface variants for common use cases
export const LuxuryPearlSurface: React.FC<Omit<PearlSurfaceProps, 'variant'>> = (props) => (
  <PearlSurface variant="luxury" glow interactive {...props} />
)

export const ClinicalPearlSurface: React.FC<Omit<PearlSurfaceProps, 'variant'>> = (props) => (
  <PearlSurface variant="clinical" {...props} />
)

export const FloatingPearlSurface: React.FC<Omit<PearlSurfaceProps, 'variant'>> = (props) => (
  <PearlSurface variant="floating" interactive glow blur="lg" {...props} />
)

export const ElevatedPearlSurface: React.FC<Omit<PearlSurfaceProps, 'variant'>> = (props) => (
  <PearlSurface variant="elevated" glow blur="lg" {...props} />
)

export default PearlSurface