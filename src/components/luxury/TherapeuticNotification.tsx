import React, { useState, useEffect } from 'react'

interface TherapeuticNotificationProps {
  type?: 'success' | 'info' | 'warning' | 'gentle'
  title?: string
  message: string
  duration?: number
  onClose?: () => void
  showIcon?: boolean
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center'
}

const TherapeuticNotification: React.FC<TherapeuticNotificationProps> = ({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  showIcon = true,
  position = 'top-right'
}) => {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(100)

  const handleClose = React.useCallback(() => {
    setVisible(false)
    setTimeout(() => {
      onClose?.()
    }, 300) // Wait for fade out animation
  }, [onClose])

  useEffect(() => {
    if (duration > 0) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / (duration / 100))
          if (newProgress <= 0) {
            clearInterval(progressInterval)
            handleClose()
            return 0
          }
          return newProgress
        })
      }, 100)

      return () => clearInterval(progressInterval)
    }
  }, [duration, handleClose])


  const typeStyles = {
    success: {
      background: 'linear-gradient(135deg, rgba(168, 192, 154, 0.95), rgba(143, 166, 142, 0.9))',
      borderColor: '#8FA68E',
      icon: '✓',
      progressColor: '#6B7D6A'
    },
    info: {
      background: 'linear-gradient(135deg, rgba(184, 212, 227, 0.95), rgba(193, 224, 212, 0.9))',
      borderColor: '#B8D4E3',
      icon: 'ℹ',
      progressColor: '#9BB8C4'
    },
    warning: {
      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.95), rgba(200, 133, 106, 0.9))',
      borderColor: '#D4AF37',
      icon: '⚠',
      progressColor: '#C8856A'
    },
    gentle: {
      background: 'linear-gradient(135deg, rgba(232, 240, 229, 0.98), rgba(247, 245, 243, 0.95))',
      borderColor: 'rgba(143, 166, 142, 0.3)',
      icon: '🌿',
      progressColor: '#8FA68E'
    }
  }

  const positionClasses = {
    'top-right': 'top-6 right-6',
    'top-center': 'top-6 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-6 right-6',
    'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2'
  }

  if (!visible) return null

  return (
    <div 
      className={`fixed ${positionClasses[position]} z-50 w-96 max-w-sm transform transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95'
      }`}
    >
      <div 
        className="rounded-2xl border shadow-lg backdrop-blur-sm overflow-hidden"
        style={{
          background: typeStyles[type].background,
          borderColor: typeStyles[type].borderColor,
          boxShadow: '0 8px 32px -8px rgba(143, 166, 142, 0.25)'
        }}
      >
        {/* Progress bar */}
        {duration > 0 && (
          <div 
            className="h-1 transition-all duration-100 ease-linear"
            style={{
              width: `${progress}%`,
              backgroundColor: typeStyles[type].progressColor
            }}
          />
        )}
        
        <div className="p-6">
          <div className="flex items-start gap-4">
            {showIcon && (
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                style={{ backgroundColor: typeStyles[type].progressColor }}
              >
                {typeStyles[type].icon}
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              {title && (
                <h4 
                  className="text-lg font-semibold mb-1"
                  style={{ color: typeStyles[type].progressColor }}
                >
                  {title}
                </h4>
              )}
              <p 
                className="text-sm leading-relaxed"
                style={{ color: typeStyles[type].progressColor }}
              >
                {message}
              </p>
            </div>
            
            <button
              onClick={handleClose}
              className="ml-2 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200 flex-shrink-0"
              style={{ color: typeStyles[type].progressColor }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Therapeutic glow effect */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-50"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${typeStyles[type].progressColor}20, transparent 50%)`,
            animation: 'therapeuticGlow 4s ease-in-out infinite'
          }}
        />
      </div>
      
      <style>{`
        @keyframes therapeuticGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}

export default TherapeuticNotification