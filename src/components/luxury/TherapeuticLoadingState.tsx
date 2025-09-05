import React from 'react'

interface TherapeuticLoadingProps {
  variant?: 'breathing' | 'flowing' | 'gentle' | 'healing'
  size?: 'small' | 'medium' | 'large'
  message?: string
  showMessage?: boolean
}

const TherapeuticLoading: React.FC<TherapeuticLoadingProps> = ({
  variant = 'breathing',
  size = 'medium',
  message = 'Preparing your healing journey...',
  showMessage = true
}) => {
  const sizeClasses = {
    small: { width: '32px', height: '32px', text: 'text-sm' },
    medium: { width: '48px', height: '48px', text: 'text-base' },
    large: { width: '64px', height: '64px', text: 'text-lg' }
  }
  
  const variantStyles = {
    breathing: {
      primary: '#8FA68E',
      secondary: '#A8C09A',
      accent: '#6B7D6A'
    },
    flowing: {
      primary: '#B8D4E3',
      secondary: '#C1E0D4',
      accent: '#9BB8C4'
    },
    gentle: {
      primary: '#E8F0E5',
      secondary: '#F7F5F3',
      accent: '#D4D4D4'
    },
    healing: {
      primary: '#D4AF37',
      secondary: '#C8856A',
      accent: '#B8956F'
    }
  }

  const renderLoadingAnimation = () => {
    switch (variant) {
      case 'breathing':
        return (
          <div 
            className="rounded-full animate-pulse relative"
            style={{
              width: sizeClasses[size].width,
              height: sizeClasses[size].height,
              background: `linear-gradient(135deg, ${variantStyles[variant].primary}, ${variantStyles[variant].secondary})`,
              animation: 'therapeuticBreathing 3s ease-in-out infinite'
            }}
          >
            <div 
              className="absolute inset-2 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(255,255,255,0.3), transparent)`,
                animation: 'innerBreathing 3s ease-in-out infinite reverse'
              }}
            />
          </div>
        )
      
      case 'flowing':
        return (
          <div className="relative" style={{ width: sizeClasses[size].width, height: sizeClasses[size].height }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${variantStyles[variant].primary}, ${variantStyles[variant].secondary})`,
                  animation: `therapeuticFlow 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                  opacity: 0.7 - i * 0.2
                }}
              />
            ))}
          </div>
        )
      
      case 'gentle':
        return (
          <div 
            className="relative"
            style={{ width: sizeClasses[size].width, height: sizeClasses[size].height }}
          >
            <div 
              className="absolute inset-0 rounded-full border-4"
              style={{
                borderColor: `${variantStyles[variant].primary} transparent ${variantStyles[variant].primary} transparent`,
                animation: 'gentleRotate 4s linear infinite'
              }}
            />
            <div 
              className="absolute inset-2 rounded-full"
              style={{
                background: `linear-gradient(45deg, ${variantStyles[variant].secondary}, ${variantStyles[variant].accent})`,
                animation: 'gentlePulse 2s ease-in-out infinite'
              }}
            />
          </div>
        )
      
      case 'healing':
        return (
          <div className="relative" style={{ width: sizeClasses[size].width, height: sizeClasses[size].height }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${20 + i * 8}px`,
                  height: `${20 + i * 8}px`,
                  top: `${(48 - (20 + i * 8)) / 2}px`,
                  left: `${(48 - (20 + i * 8)) / 2}px`,
                  border: `2px solid ${variantStyles[variant].primary}`,
                  animation: `healingRipple 3s ease-out infinite`,
                  animationDelay: `${i * 0.7}s`,
                  opacity: 1 - i * 0.25
                }}
              />
            ))}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${variantStyles[variant].primary}, ${variantStyles[variant].secondary})`,
                transform: 'scale(0.3)',
                animation: 'healingCore 3s ease-in-out infinite'
              }}
            />
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      {renderLoadingAnimation()}
      
      {showMessage && (
        <div 
          className={`${sizeClasses[size].text} font-medium text-center animate-fade-in`}
          style={{ color: variantStyles[variant].primary }}
        >
          {message}
        </div>
      )}
      
      <style>{`
        @keyframes therapeuticBreathing {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(143, 166, 142, 0.3);
          }
          50% { 
            transform: scale(1.1);
            box-shadow: 0 0 0 15px rgba(143, 166, 142, 0);
          }
        }
        
        @keyframes innerBreathing {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.1; }
        }
        
        @keyframes therapeuticFlow {
          0% { transform: scale(0.8); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.5; }
          100% { transform: scale(0.8); opacity: 1; }
        }
        
        @keyframes gentleRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes gentlePulse {
          0%, 100% { opacity: 0.6; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        @keyframes healingRipple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
        
        @keyframes healingCore {
          0%, 100% { transform: scale(0.3); }
          50% { transform: scale(0.6); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  )
}

export default TherapeuticLoading