import React, { useEffect, useRef } from 'react'
import { celebrateProgress, addTherapeuticBreathing, addChampagneShimmer, prefersReducedMotion } from '../../utils/whimsicalInteractions'

interface TherapeuticProgressProps {
  progress: number
  variant?: 'gentle' | 'flowing' | 'breathing' | 'healing' | 'sage' | 'champagne' | 'pearl'
  size?: 'small' | 'medium' | 'large' | 'xl'
  showLabel?: boolean
  label?: string
  className?: string
  animated?: boolean
  showMilestones?: boolean
  whimsical?: boolean
  breathing?: boolean
  previousProgress?: number
  onMilestone?: (milestone: number) => void
  ariaLabel?: string
}

const TherapeuticProgress: React.FC<TherapeuticProgressProps> = ({
  progress,
  variant = 'gentle',
  size = 'medium',
  showLabel = false,
  label,
  className = '',
  animated = true,
  showMilestones = false,
  whimsical = false,
  breathing = false,
  previousProgress = 0,
  onMilestone,
  ariaLabel
}) => {
  const progressRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const prevProgressRef = useRef(previousProgress)

  const sizeClasses = {
    small: { height: 'h-2', text: 'text-xs', spacing: 'mb-1' },
    medium: { height: 'h-4', text: 'text-sm', spacing: 'mb-2' },
    large: { height: 'h-6', text: 'text-base', spacing: 'mb-3' },
    xl: { height: 'h-8', text: 'text-lg', spacing: 'mb-4' }
  }
  
  const variantStyles = {
    gentle: {
      background: 'rgba(232, 240, 229, 0.8)',
      progressBg: 'linear-gradient(135deg, #A8C09A, #8FA68E)',
      glow: '0 0 8px rgba(143, 166, 142, 0.3)',
      shimmerColor: 'rgba(255, 255, 255, 0.4)'
    },
    flowing: {
      background: 'rgba(184, 212, 227, 0.3)',
      progressBg: 'linear-gradient(135deg, #B8D4E3, #C1E0D4)',
      glow: '0 0 12px rgba(184, 212, 227, 0.4)',
      shimmerColor: 'rgba(255, 255, 255, 0.5)'
    },
    breathing: {
      background: 'rgba(200, 184, 219, 0.2)',
      progressBg: 'linear-gradient(135deg, #C8B8DB, #E8C4C8)',
      glow: '0 0 10px rgba(200, 184, 219, 0.35)',
      shimmerColor: 'rgba(255, 255, 255, 0.3)'
    },
    healing: {
      background: 'rgba(212, 175, 55, 0.15)',
      progressBg: 'linear-gradient(135deg, #D4AF37, #C8856A)',
      glow: '0 0 15px rgba(212, 175, 55, 0.4)',
      shimmerColor: 'rgba(255, 255, 255, 0.6)'
    },
    sage: {
      background: 'rgba(143, 166, 142, 0.1)',
      progressBg: 'linear-gradient(135deg, var(--sage-primary), var(--sage-secondary))',
      glow: '0 0 16px rgba(143, 166, 142, 0.4)',
      shimmerColor: 'rgba(255, 255, 255, 0.4)'
    },
    champagne: {
      background: 'rgba(212, 175, 55, 0.1)',
      progressBg: 'linear-gradient(135deg, var(--champagne-primary), var(--champagne-secondary))',
      glow: '0 0 16px rgba(212, 175, 55, 0.4)',
      shimmerColor: 'rgba(255, 255, 255, 0.5)'
    },
    pearl: {
      background: 'rgba(247, 245, 243, 0.2)',
      progressBg: 'linear-gradient(135deg, var(--pearl-primary), var(--pearl-secondary))',
      glow: '0 0 16px rgba(247, 245, 243, 0.4)',
      shimmerColor: 'rgba(255, 255, 255, 0.3)'
    }
  }

  const currentSize = sizeClasses[size]
  const currentVariant = variantStyles[variant]
  const boundedProgress = Math.max(0, Math.min(100, progress))
  const milestones = [25, 50, 75, 100]

  // Enhanced celebration effects
  useEffect(() => {
    if (whimsical && progressRef.current && boundedProgress !== prevProgressRef.current) {
      celebrateProgress(progressRef.current, boundedProgress, prevProgressRef.current)
      
      const crossedMilestone = milestones.find(
        milestone => prevProgressRef.current < milestone && boundedProgress >= milestone
      )
      
      if (crossedMilestone && onMilestone) {
        onMilestone(crossedMilestone)
      }
      
      prevProgressRef.current = boundedProgress
    }
  }, [boundedProgress, whimsical, onMilestone])

  // Therapeutic breathing animation
  useEffect(() => {
    if (breathing && fillRef.current && boundedProgress > 0 && !prefersReducedMotion()) {
      addTherapeuticBreathing(fillRef.current, 999, 4000)
    }
  }, [breathing, boundedProgress])

  // Completion celebration
  useEffect(() => {
    if (whimsical && fillRef.current && boundedProgress === 100 && !prefersReducedMotion()) {
      setTimeout(() => {
        if (fillRef.current) {
          addChampagneShimmer(fillRef.current, 1200, 'strong')
        }
      }, 500)
    }
  }, [boundedProgress, whimsical])

  const breathingAnimation = {
    animation: (animated && !prefersReducedMotion()) ? 'therapeuticBreathing 4s ease-in-out infinite' : 'none'
  }

  const flowingAnimation = {
    animation: (animated && !prefersReducedMotion()) ? 'therapeuticFlow 3s ease-in-out infinite' : 'none'
  }

  return (
    <div className={`w-full ${className}`} data-whimsy="therapeutic-progress">
      {showLabel && (
        <div className={`flex justify-between items-center ${currentSize.spacing}`}>
          <span className={`${currentSize.text} font-medium`} style={{ color: '#8FA68E' }}>
            {label || 'Progress'}
          </span>
          <div className="flex items-center gap-2">
            <span className={`${currentSize.text} font-semibold tabular-nums`} style={{ color: '#6B7D6A' }}>
              {Math.round(boundedProgress)}%
            </span>
            {boundedProgress === 100 && (
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#D4AF37' }} />
            )}
          </div>
        </div>
      )}
      
      {/* Progress Track */}
      <div 
        ref={progressRef}
        className={`
          relative w-full ${currentSize.height} rounded-full overflow-hidden
          ${whimsical ? 'therapeutic-focus-ring shadow-lg' : 'shadow-sm'}
          transition-all duration-300
        `}
        style={{ 
          backgroundColor: currentVariant.background,
          boxShadow: 'inset 0 2px 4px rgba(143, 166, 142, 0.1)'
        }}
        role="progressbar"
        aria-valuenow={boundedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel || `${label || 'Progress'}: ${Math.round(boundedProgress)}%`}
      >
        {/* Milestone Markers */}
        {showMilestones && milestones.slice(0, -1).map((milestone) => (
          <div
            key={milestone}
            className={`
              absolute top-0 bottom-0 w-px transition-colors duration-300
              ${boundedProgress >= milestone ? 'bg-sage-400' : 'bg-slate-600'}
            `}
            style={{ left: `${milestone}%` }}
          />
        ))}

        {/* Background breathing effect */}
        {((variant === 'breathing' && animated) || breathing) && !prefersReducedMotion() && (
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'rgba(200, 184, 219, 0.1)',
              ...breathingAnimation
            }}
          />
        )}
        
        {/* Progress Fill */}
        <div
          ref={fillRef}
          className={`
            ${currentSize.height} rounded-full transition-all duration-1000 ease-out 
            relative overflow-hidden
          `}
          style={{
            width: `${boundedProgress}%`,
            background: currentVariant.progressBg,
            boxShadow: boundedProgress > 0 ? currentVariant.glow : 'none',
            ...flowingAnimation
          }}
        >
          {/* Enhanced Shimmer Effect */}
          <div 
            className="absolute inset-0 -skew-x-12 -translate-x-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${currentVariant.shimmerColor}, transparent)`,
              animation: (animated && !prefersReducedMotion()) ? 'therapeuticShimmer 2s ease-in-out infinite' : 'none'
            }}
          />
          
          {/* Gentle pulse overlay */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.1)',
              animation: (animated && !prefersReducedMotion()) ? 'gentlePulse 3s ease-in-out infinite' : 'none'
            }}
          />

          {/* Completion Glow */}
          {boundedProgress === 100 && (
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent)',
                animation: !prefersReducedMotion() ? 'completionGlow 2s ease-in-out infinite' : 'none'
              }}
            />
          )}
        </div>
        
        {/* Completion celebration effect */}
        {boundedProgress >= 100 && !prefersReducedMotion() && (
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(168, 192, 154, 0.3))',
              animation: 'celebrateCompletion 2s ease-in-out'
            }}
          />
        )}

        {/* Therapeutic Breathing Overlay */}
        {breathing && boundedProgress > 0 && !prefersReducedMotion() && (
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(184, 212, 227, 0.1), transparent)',
              animation: 'therapeuticBreathingOverlay 4s ease-in-out infinite'
            }}
          />
        )}
      </div>
      
      {/* Milestone Labels */}
      {showMilestones && (
        <div className="flex justify-between mt-2">
          {milestones.map((milestone) => (
            <div 
              key={milestone}
              className={`
                text-xs transition-colors duration-300
                ${boundedProgress >= milestone 
                  ? 'text-sage-400 font-medium' 
                  : 'text-slate-500'
                }
              `}
            >
              {milestone}%
            </div>
          ))}
        </div>
      )}
      
      {/* Healing affirmation for completion */}
      {boundedProgress >= 100 && (
        <div className="text-center mt-3 text-sm font-medium animate-fade-in" style={{ color: '#6B7D6A' }}>
          ✨ Journey Complete - Well Done ✨
        </div>
      )}
      
      <style>{`
        @keyframes therapeuticBreathing {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        
        @keyframes therapeuticBreathingOverlay {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        @keyframes therapeuticFlow {
          0%, 100% { filter: brightness(1); }
          33% { filter: brightness(1.1); }
          66% { filter: brightness(0.95); }
        }
        
        @keyframes therapeuticShimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes gentlePulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes completionGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes celebrateCompletion {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.7; transform: scale(1); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}

export default TherapeuticProgress