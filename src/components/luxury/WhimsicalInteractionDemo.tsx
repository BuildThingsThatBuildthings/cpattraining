import React, { useState } from 'react';
import TherapeuticButton from './TherapeuticButton';
import TherapeuticCard from './TherapeuticCard';

const WhimsicalInteractionDemo: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState(0);
  const [moduleComplete, setModuleComplete] = useState(false);
  const [showEasterEggs, setShowEasterEggs] = useState(false);

  const totalSteps = 4;

  const handleStepComplete = () => {
    const newCompletedSteps = completedSteps + 1;
    setCompletedSteps(newCompletedSteps);

    if (newCompletedSteps === totalSteps) {
      setTimeout(() => {
        setModuleComplete(true);
      }, 500);
    }
  };

  const resetDemo = () => {
    setCompletedSteps(0);
    setModuleComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800">
            Whimsical Therapeutic Interactions
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Luxury micro-interactions that maintain clinical credibility while adding 
            delightful moments that enhance the user experience.
          </p>
        </div>

        {/* Demo Controls */}
        <TherapeuticCard className="p-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <TherapeuticButton
              variant="primary"
              onClick={resetDemo}
            >
              🔄 Reset Demo
            </TherapeuticButton>

            <TherapeuticButton
              variant="secondary"
              onClick={() => setShowEasterEggs(!showEasterEggs)}
            >
              {showEasterEggs ? '🙈 Hide' : '👀 Show'} Easter Eggs
            </TherapeuticButton>
          </div>
        </TherapeuticCard>

        {/* Progress Demo */}
        <div id="module-container" className="space-y-6">
          <TherapeuticCard className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Module Progress with Celebrations
            </h2>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-700 ease-out bg-gradient-to-r from-blue-500 to-green-500"
                  style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                />
              </div>
              <p className="text-center mt-2 text-gray-600">
                Progress: {completedSteps}/{totalSteps} steps completed
                {moduleComplete && (
                  <span className="ml-2 text-green-600 font-semibold">
                    🌟 Module Complete!
                  </span>
                )}
              </p>
            </div>

            {/* Interactive Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: totalSteps }, (_, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber <= completedSteps;
                const isNext = stepNumber === completedSteps + 1;

                return (
                  <div
                    key={stepNumber}
                    id={`step-${stepNumber}`}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      isCompleted 
                        ? 'border-green-300 bg-gradient-to-br from-green-50 to-blue-50'
                        : isNext
                        ? 'border-blue-300 bg-white'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg text-gray-800">
                        Step {stepNumber}: Therapeutic Technique
                      </h3>
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isNext
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {isCompleted ? '✓' : stepNumber}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      Learn advanced therapeutic approaches that 
                      promote healing through mindful awareness.
                    </p>
                    
                    {isNext && (
                      <TherapeuticButton
                        variant="primary"
                        onClick={() => handleStepComplete()}
                        className="w-full"
                      >
                        Complete Step {stepNumber}
                      </TherapeuticButton>
                    )}
                  </div>
                );
              })}
            </div>
          </TherapeuticCard>
        </div>

        {/* Card Variations Demo */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
            Interactive Card Demonstrations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TherapeuticCard className="p-6 hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✨</span>
                  <h3 className="font-semibold text-lg text-gray-800">Enhanced Card</h3>
                </div>
                <p className="text-gray-600">
                  Enhanced with sophisticated effects and therapeutic aesthetics.
                </p>
                <TherapeuticButton variant="secondary" size="small">
                  Interact
                </TherapeuticButton>
              </div>
            </TherapeuticCard>

            <TherapeuticCard className="p-6 transform hover:scale-105 transition-transform">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🌱</span>
                  <h3 className="font-semibold text-lg text-gray-800">Growth Card</h3>
                </div>
                <p className="text-gray-600">
                  Gentle animations with professional therapeutic approach.
                </p>
                <TherapeuticButton variant="primary" size="small">
                  Explore
                </TherapeuticButton>
              </div>
            </TherapeuticCard>

            <TherapeuticCard className="p-6 hover:bg-gradient-to-br hover:from-blue-50 hover:to-green-50 transition-all">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚖️</span>
                  <h3 className="font-semibold text-lg text-gray-800">Balance Card</h3>
                </div>
                <p className="text-gray-600">
                  Hover for micro-interactions that maintain professionalism.
                </p>
                <TherapeuticButton variant="secondary" size="small">
                  Discover
                </TherapeuticButton>
              </div>
            </TherapeuticCard>
          </div>
        </div>

        {/* Easter Eggs Demo */}
        {showEasterEggs && (
          <TherapeuticCard className="p-8 bg-gradient-to-r from-yellow-50 to-orange-50">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              Hidden Therapeutic Features
            </h2>
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                This demonstration showcases how therapeutic applications can include
                delightful interactions while maintaining clinical credibility.
              </p>
              <p className="text-sm text-gray-500">
                All interactions respect user preferences and accessibility guidelines.
              </p>
            </div>
          </TherapeuticCard>
        )}

        {/* Technical Specs */}
        <TherapeuticCard className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Technical Implementation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-700">Performance Optimized</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 60fps animations with GPU acceleration</li>
                <li>• CSS transforms over JavaScript animations</li>
                <li>• Intersection observers for efficiency</li>
                <li>• Memory-conscious implementations</li>
                <li>• Reduced motion fallbacks</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-700">Accessibility Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• ARIA labels and semantic HTML</li>
                <li>• Keyboard navigation support</li>
                <li>• High contrast mode compatibility</li>
                <li>• Screen reader friendly</li>
                <li>• Touch-friendly interactions</li>
              </ul>
            </div>
          </div>
        </TherapeuticCard>
      </div>
    </div>
  );
};

export default WhimsicalInteractionDemo;