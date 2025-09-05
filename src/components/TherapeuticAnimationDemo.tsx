import React from 'react'

/**
 * Therapeutic Animation Demo Component
 * Showcases the new calming, spa-like animation library
 */
const TherapeuticAnimationDemo: React.FC = () => {
  return (
    <div className="p-8 space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 font-display">
          Therapeutic Animation Library
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience the calming, luxury wellness animations designed to reduce anxiety 
          and support therapeutic interactions in the CPAT platform.
        </p>
      </div>

      {/* Breathing Light Animation */}
      <div className="therapeutic-card p-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Breathing Light Effect</h3>
        <div className="flex justify-center space-x-6">
          <div className="w-16 h-16 bg-gradient-to-br from-sage-primary to-sage-dark rounded-full breathing-light"></div>
          <div className="w-16 h-16 bg-gradient-to-br from-sage-light to-sage-primary rounded-full breathing-light" style={{ animationDelay: '1s' }}></div>
          <div className="w-16 h-16 bg-gradient-to-br from-sage-dark to-sage-primary rounded-full breathing-light" style={{ animationDelay: '2s' }}></div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Matches natural breathing rhythm (3 second cycles)
        </p>
      </div>

      {/* Gentle Floating Elements */}
      <div className="therapeutic-card p-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Gentle Floating</h3>
        <div className="flex justify-center space-x-8">
          <div className="floating">
            <div className="w-12 h-12 bg-sage-primary rounded-full flex items-center justify-center text-white text-xl">
              🌿
            </div>
          </div>
          <div className="floating" style={{ animationDelay: '2s' }}>
            <div className="w-12 h-12 bg-sage-light rounded-full flex items-center justify-center text-white text-xl">
              🍃
            </div>
          </div>
          <div className="floating" style={{ animationDelay: '4s' }}>
            <div className="w-12 h-12 bg-sage-dark rounded-full flex items-center justify-center text-white text-xl">
              🌱
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Subtle, organic movement that doesn't distract
        </p>
      </div>

      {/* Therapeutic Buttons */}
      <div className="therapeutic-card p-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Therapeutic Button Interactions</h3>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary therapeutic-button">
            Primary Action
          </button>
          <button className="btn-secondary therapeutic-button">
            Secondary Action
          </button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Gentle hover states with organic transitions
        </p>
      </div>

      {/* Gentle Pulse Indicators */}
      <div className="therapeutic-card p-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Gentle Pulse Notifications</h3>
        <div className="flex justify-center space-x-6">
          <div className="w-8 h-8 bg-sage-primary rounded-full gentle-pulse"></div>
          <div className="w-8 h-8 bg-sage-light rounded-full gentle-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-8 h-8 bg-sage-dark rounded-full gentle-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Calming notifications that don't startle
        </p>
      </div>

      {/* Therapeutic Progress */}
      <div className="therapeutic-card p-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Therapeutic Progress Indicators</h3>
        <div className="space-y-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden therapeutic-progress">
            <div className="h-full bg-gradient-to-r from-sage-primary to-sage-light w-3/4 rounded-full"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-sage-light to-sage-primary w-1/2 rounded-full therapeutic-loading"></div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Progress that reduces anxiety and encourages completion
        </p>
      </div>

      {/* Serenity Glow */}
      <div className="therapeutic-card p-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Serenity Glow Effect</h3>
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-2xl serenity-glow flex items-center justify-center text-white text-4xl font-bold"
               style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E, #6B7D6A)' }}>
            ✨
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Subtle color shifts that create a spa-like atmosphere
        </p>
      </div>

      {/* Mindful Focus */}
      <div className="therapeutic-card p-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Mindful Focus Animation</h3>
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-sage-light to-sage-primary rounded-full mindful-focus flex items-center justify-center text-white text-2xl">
            🧘
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Encourages mindful attention and presence
        </p>
      </div>

      {/* Reduced Motion Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
        <h4 className="font-semibold text-blue-800 mb-2">Accessibility First</h4>
        <p className="text-blue-700 text-sm">
          All animations respect user's reduced motion preferences and include 
          fallback states for better accessibility.
        </p>
      </div>
    </div>
  )
}

export default TherapeuticAnimationDemo