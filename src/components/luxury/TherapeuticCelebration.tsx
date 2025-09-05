import React, { useEffect, useState } from 'react'
import { Sparkles, Trophy, Star, Crown, Gem } from 'lucide-react'

interface TherapeuticCelebrationProps {
  isVisible: boolean
  variant?: 'completion' | 'milestone' | 'achievement' | 'mastery'
  title?: string
  message?: string
  onComplete?: () => void
  duration?: number
  size?: 'small' | 'medium' | 'large'
  showConfetti?: boolean
  showIcon?: boolean
  autoHide?: boolean
}

const TherapeuticCelebration: React.FC<TherapeuticCelebrationProps> = ({
  isVisible,
  variant = 'completion',
  title,
  message,
  onComplete,
  duration = 3000,
  size = 'medium',
  showConfetti = true,
  showIcon = true,
  autoHide = true
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const celebrationConfigs = {
    completion: {
      icon: Sparkles,
      title: 'Module Complete!',
      message: 'Excellent progress on your therapeutic journey',
      primaryColor: 'var(--sage-primary)',
      secondaryColor: 'var(--sage-secondary)',
      accentColor: 'var(--champagne-primary)',
      gradient: 'linear-gradient(135deg, var(--sage-primary), var(--champagne-primary))'
    },
    milestone: {
      icon: Trophy,
      title: 'Milestone Achieved!',
      message: 'You\'ve reached an important learning milestone',
      primaryColor: 'var(--champagne-primary)',
      secondaryColor: 'var(--champagne-secondary)',
      accentColor: 'var(--sage-primary)',
      gradient: 'linear-gradient(135deg, var(--champagne-primary), var(--sage-primary))'
    },
    achievement: {
      icon: Star,
      title: 'Achievement Unlocked!',
      message: 'Your dedication to learning is inspiring',
      primaryColor: 'var(--sage-primary)',
      secondaryColor: 'var(--pearl-primary)',
      accentColor: 'var(--champagne-accent)',
      gradient: 'linear-gradient(135deg, var(--sage-primary), var(--pearl-primary))'
    },
    mastery: {
      icon: Crown,
      title: 'Mastery Level!',
      message: 'You\'ve demonstrated exceptional understanding',
      primaryColor: 'var(--champagne-primary)',
      secondaryColor: 'var(--champagne-accent)',
      accentColor: '#FFD700',
      gradient: 'linear-gradient(135deg, var(--champagne-primary), #FFD700)'
    }
  }

  const config = celebrationConfigs[variant]
  const displayTitle = title || config.title
  const displayMessage = message || config.message
  const IconComponent = config.icon

  const sizeStyles = {
    small: {
      container: 'w-80 p-6',
      icon: 'w-12 h-12',
      iconSize: 28,
      title: 'text-lg',
      message: 'text-sm',
      confetti: 'w-2 h-2'
    },
    medium: {
      container: 'w-96 p-8',
      icon: 'w-16 h-16',
      iconSize: 36,
      title: 'text-xl',
      message: 'text-base',
      confetti: 'w-3 h-3'
    },
    large: {
      container: 'w-112 p-10',
      icon: 'w-20 h-20',
      iconSize: 44,
      title: 'text-2xl',
      message: 'text-lg',
      confetti: 'w-4 h-4'
    }
  }

  const currentSize = sizeStyles[size]

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      setTimeout(() => setShowContent(true), 200)
      
      if (autoHide) {
        setTimeout(() => {
          setShowContent(false)
          setTimeout(() => {
            setIsAnimating(false)
            onComplete?.()
          }, 300)
        }, duration)
      }
    } else {
      setShowContent(false)
      setIsAnimating(false)
    }
  }, [isVisible, duration, autoHide, onComplete])

  const generateConfetti = () => {
    const confettiElements = []
    const confettiCount = size === 'large' ? 20 : size === 'medium' ? 15 : 10
    
    for (let i = 0; i < confettiCount; i++) {
      const delay = Math.random() * 0.5
      const duration = 2 + Math.random() * 1
      const xOffset = (Math.random() - 0.5) * 200
      const rotation = Math.random() * 360
      const isGem = Math.random() > 0.7
      
      confettiElements.push(
        <div
          key={i}
          className={`absolute ${currentSize.confetti} opacity-80 pointer-events-none`}
          style={{
            left: '50%',
            top: '20%',
            transform: `translateX(${xOffset}px) rotate(${rotation}deg)`,
            animation: `confettiFall ${duration}s ease-out ${delay}s forwards`,
            background: isGem 
              ? config.accentColor 
              : i % 3 === 0 
                ? config.primaryColor 
                : i % 3 === 1 
                  ? config.secondaryColor 
                  : config.accentColor,
            borderRadius: isGem ? '2px' : '50%',
            boxShadow: `0 0 6px ${isGem ? config.accentColor : config.primaryColor}33`
          }}
        >
          {isGem && <Gem size={currentSize.confetti === 'w-4 h-4' ? 16 : currentSize.confetti === 'w-3 h-3' ? 12 : 8} />}
        </div>
      )
    }
    
    return confettiElements
  }

  if (!isAnimating) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: showContent ? 1 : 0 }}
      />
      
      {/* Confetti */}
      {showConfetti && showContent && (
        <div className="absolute inset-0 overflow-hidden">
          {generateConfetti()}
        </div>
      )}
      
      {/* Main Content */}
      <div 
        className={`
          ${currentSize.container} 
          bg-slate-800/95 backdrop-blur-xl
          border border-slate-600/50
          rounded-3xl shadow-2xl
          pointer-events-auto
          transition-all duration-500 ease-out
          ${showContent 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-8'
          }
        `}
        style={{
          background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))`,
          boxShadow: `0 20px 40px -12px ${config.primaryColor}33, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
        }}
      >
        {/* Header with Icon */}
        {showIcon && (
          <div className="flex justify-center mb-6">
            <div 
              className={`
                ${currentSize.icon} 
                rounded-2xl flex items-center justify-center
                shadow-lg transition-all duration-700
                ${showContent ? 'animate-bounce' : ''}
              `}
              style={{
                background: config.gradient,
                animation: showContent ? 'therapeuticPulse 2s ease-in-out infinite' : 'none'
              }}
            >
              <IconComponent 
                size={currentSize.iconSize} 
                className="text-white drop-shadow-sm" 
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="text-center space-y-4">
          <h2 
            className={`
              ${currentSize.title} 
              font-bold text-white mb-3
              transition-all duration-700 delay-100
              ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            {displayTitle}
          </h2>
          
          <p 
            className={`
              ${currentSize.message} 
              text-slate-300 leading-relaxed
              transition-all duration-700 delay-200
              ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            {displayMessage}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none">
          {/* Shimmer Effect */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-30"
            style={{
              background: `linear-gradient(45deg, transparent 30%, ${config.accentColor}22 50%, transparent 70%)`,
              animation: showContent ? 'champagneShimmer 3s ease-in-out infinite' : 'none'
            }}
          />
          
          {/* Border Glow */}
          <div 
            className="absolute inset-0 rounded-3xl transition-opacity duration-1000"
            style={{
              background: `linear-gradient(135deg, ${config.primaryColor}22, transparent, ${config.accentColor}22)`,
              padding: '2px',
              opacity: showContent ? 1 : 0
            }}
          />
        </div>

        {/* Close Button (if not auto-hide) */}
        {!autoHide && (
          <button
            onClick={() => {
              setShowContent(false)
              setTimeout(() => {
                setIsAnimating(false)
                onComplete?.()
              }, 300)
            }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 therapeutic-focus-ring"
            aria-label="Close celebration"
          >
            ✕
          </button>
        )}
      </div>

      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(400px) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes therapeuticPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 ${config.primaryColor}66;
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 8px ${config.primaryColor}22;
          }
        }
        
        @keyframes champagneShimmer {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default TherapeuticCelebration