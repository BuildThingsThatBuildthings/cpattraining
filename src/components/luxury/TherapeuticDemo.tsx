import React, { useState } from 'react'
import {
  TherapeuticButton,
  TherapeuticCard,
  TherapeuticProgress,
  TherapeuticInput,
  TherapeuticLoading,
  useTherapeuticNotification,
  LuxurySageTheme
} from './index'

const TherapeuticDemo: React.FC = () => {
  const [progress, setProgress] = useState(45)
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const { showNotification, NotificationContainer } = useTherapeuticNotification()

  const handleProgressUpdate = () => {
    const newProgress = Math.min(progress + 15, 100)
    setProgress(newProgress)
    
    if (newProgress >= 100) {
      showNotification({
        type: 'success',
        title: 'Journey Complete',
        message: 'You have successfully completed your therapeutic learning experience.',
        duration: 4000
      })
    }
  }

  const handleLoadingDemo = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showNotification({
        type: 'info',
        title: 'Therapeutic Process Complete',
        message: 'Your healing session preparation is ready. Take a moment to center yourself.',
        duration: 3000
      })
    }, 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: LuxurySageTheme.gradients.luxury }}>
        <TherapeuticLoading 
          variant="healing" 
          size="large" 
          message="Preparing your therapeutic experience..." 
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8" style={{ background: LuxurySageTheme.gradients.luxury }}>
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6" style={{ color: LuxurySageTheme.colors.primaryDark }}>
            Luxury Therapeutic Components
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: LuxurySageTheme.colors.primary }}>
            Experience the elegance of professional wellness interface design with our therapeutic component library.
          </p>
        </div>

        {/* Button Showcase */}
        <TherapeuticCard variant="elevated" gradient>
          <h2 className="text-3xl font-bold mb-8" style={{ color: LuxurySageTheme.colors.primaryDark }}>
            Therapeutic Buttons
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TherapeuticButton 
              variant="primary" 
              size="medium"
              onClick={handleProgressUpdate}
            >
              Advance Progress
            </TherapeuticButton>
            
            <TherapeuticButton 
              variant="secondary" 
              size="medium"
              icon="🌿"
            >
              Gentle Action
            </TherapeuticButton>
            
            <TherapeuticButton 
              variant="therapeutic" 
              size="medium"
              icon="✨"
            >
              Healing Touch
            </TherapeuticButton>
            
            <TherapeuticButton 
              variant="gentle" 
              size="medium"
              onClick={handleLoadingDemo}
            >
              Begin Journey
            </TherapeuticButton>
          </div>
        </TherapeuticCard>

        {/* Progress Showcase */}
        <TherapeuticCard variant="floating" gradient>
          <h2 className="text-3xl font-bold mb-8" style={{ color: LuxurySageTheme.colors.primaryDark }}>
            Therapeutic Progress Indicators
          </h2>
          <div className="space-y-8">
            <TherapeuticProgress 
              progress={progress} 
              variant="gentle" 
              size="large" 
              showLabel 
              label="Learning Journey Progress"
              animated
            />
            <TherapeuticProgress 
              progress={78} 
              variant="flowing" 
              size="medium" 
              showLabel 
              label="Mindfulness Development"
              animated
            />
            <TherapeuticProgress 
              progress={92} 
              variant="breathing" 
              size="medium" 
              showLabel 
              label="Therapeutic Breathing"
              animated
            />
          </div>
        </TherapeuticCard>

        {/* Form Showcase */}
        <div className="grid md:grid-cols-2 gap-8">
          <TherapeuticCard variant="grounded">
            <h2 className="text-2xl font-bold mb-6" style={{ color: LuxurySageTheme.colors.primaryDark }}>
              Therapeutic Input Fields
            </h2>
            <div className="space-y-6">
              <TherapeuticInput
                label="Your Name"
                type="text"
                placeholder="Enter your preferred name..."
                value={inputValue}
                onChange={setInputValue}
                required
                validation
              />
              
              <TherapeuticInput
                label="Therapeutic Goals"
                type="textarea"
                placeholder="Share your intentions for this healing journey..."
                value=""
                onChange={() => {}}
                rows={4}
              />
              
              <TherapeuticInput
                label="Experience Level"
                type="select"
                value=""
                onChange={() => {}}
                options={['Beginner', 'Intermediate', 'Advanced', 'Professional']}
                placeholder="Select your experience level..."
              />
            </div>
          </TherapeuticCard>

          <TherapeuticCard variant="gentle">
            <h2 className="text-2xl font-bold mb-6" style={{ color: LuxurySageTheme.colors.primaryDark }}>
              Notification Examples
            </h2>
            <div className="space-y-4">
              <TherapeuticButton
                variant="primary"
                size="small"
                onClick={() => showNotification({
                  type: 'success',
                  title: 'Session Complete',
                  message: 'Your therapeutic practice session has been successfully completed.',
                  duration: 3000
                })}
              >
                Success Notification
              </TherapeuticButton>
              
              <TherapeuticButton
                variant="therapeutic"
                size="small"
                onClick={() => showNotification({
                  type: 'info',
                  title: 'Mindful Moment',
                  message: 'Take a deep breath and center yourself in this present moment.',
                  duration: 4000
                })}
              >
                Info Notification
              </TherapeuticButton>
              
              <TherapeuticButton
                variant="gentle"
                size="small"
                onClick={() => showNotification({
                  type: 'gentle',
                  title: 'Gentle Reminder',
                  message: 'Remember to practice self-compassion throughout your journey.',
                  duration: 5000
                })}
              >
                Gentle Notification
              </TherapeuticButton>
            </div>
            
            <div className="mt-8 p-6 rounded-2xl" style={{ backgroundColor: LuxurySageTheme.colors.mist }}>
              <h3 className="font-semibold mb-3" style={{ color: LuxurySageTheme.colors.primaryDark }}>
                Design Principles
              </h3>
              <ul className="text-sm space-y-2" style={{ color: LuxurySageTheme.colors.primary }}>
                <li>• Sage palette promotes calm and focus</li>
                <li>• Generous spacing for cognitive rest</li>
                <li>• Gentle animations respect therapeutic context</li>
                <li>• Professional aesthetics build trust</li>
                <li>• Accessible design supports all users</li>
              </ul>
            </div>
          </TherapeuticCard>
        </div>

        {/* Color Palette Showcase */}
        <TherapeuticCard variant="elevated">
          <h2 className="text-3xl font-bold mb-8" style={{ color: LuxurySageTheme.colors.primaryDark }}>
            Luxury Sage Therapeutic Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(LuxurySageTheme.colors).map(([name, color]) => (
              <div key={name} className="text-center">
                <div 
                  className="w-20 h-20 rounded-2xl mx-auto mb-3 shadow-lg"
                  style={{ backgroundColor: color }}
                />
                <div className="text-sm font-medium" style={{ color: LuxurySageTheme.colors.primaryDark }}>
                  {name}
                </div>
                <div className="text-xs font-mono" style={{ color: LuxurySageTheme.colors.primary }}>
                  {color}
                </div>
              </div>
            ))}
          </div>
        </TherapeuticCard>
      </div>

      {/* Notification Container */}
      <NotificationContainer />
      
      <style>{`
        .grid {
          display: grid;
        }
        .grid-cols-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .grid-cols-4 {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        @media (min-width: 768px) {
          .md\\:grid-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
          .md\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  )
}

export default TherapeuticDemo