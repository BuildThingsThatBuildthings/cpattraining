import React, { useState } from 'react'

const SessionStructureSection: React.FC = () => {
  const [activePhase, setActivePhase] = useState<number>(0)

  const sessionPhases = [
    {
      title: "Opening (10-15 minutes)",
      icon: "🌅",
      color: "from-yellow-400 to-orange-500",
      activities: [
        "Safety check & intention setting",
        "Relaxation breathing (5-10 minutes)",
        "Color/light selection based on client needs",
        "Comfortable positioning and environment setup"
      ],
      cpatFocus: "Creating a safe, affirming space where the client feels completely supported and honored."
    },
    {
      title: "Core Session (25-35 minutes)", 
      icon: "💫",
      color: "from-teal-400 to-blue-500",
      activities: [
        "CLAS exposure with selected color/light",
        "Continuous CPAT dialogue throughout",
        "On-screen affirmations when appropriate",
        "Integration pauses for processing"
      ],
      cpatFocus: "Maintaining positive-only language while the client experiences the therapeutic modalities."
    },
    {
      title: "Closing (10-15 minutes)",
      icon: "🏡",
      color: "from-green-400 to-teal-500",
      activities: [
        "Gentle transition from therapeutic state",
        "Grounding breathing exercises (5 minutes)",
        "Home plan review and next session planning",
        "Session documentation and client feedback"
      ],
      cpatFocus: "Affirming the client's experience and empowering them with tools for continued healing."
    }
  ]

  return (
    <div className="fade-in-up">
      {/* Luxury Header */}
      <div className="text-center mb-20">
        <div className="w-28 h-28 rounded-full mx-auto mb-12 flex items-center justify-center therapeutic-glow floating" style={{ background: 'linear-gradient(135deg, #B8D4E3, #A8C09A)' }}>
          <span className="text-white text-5xl">📋</span>
        </div>
        <h1 className="display-heading text-6xl font-bold mb-8 font-display" style={{ color: '#6B7D6A' }}>
          CPAT Session Architecture
        </h1>
        <p className="text-2xl max-w-5xl mx-auto leading-relaxed" style={{ color: '#8FA68E', lineHeight: '1.6' }}>
          Each professional CPAT + CLAS session follows a precisely structured format that establishes safety, 
          delivers optimal therapeutic benefits, and ensures comprehensive integration for lasting transformation.
        </p>
      </div>

      {/* Luxury Session Overview Timeline */}
      <div className="mb-20">
        <div className="therapeutic-section fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="display-heading text-4xl font-bold text-center mb-12 font-display" style={{ color: '#6B7D6A' }}>
            Professional Session Timeline (50-65 minutes)
          </h2>
          
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              {sessionPhases.map((phase, index) => (
                <div key={index} className="flex items-center">
                  <button
                    onClick={() => setActivePhase(index)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg transition-all ${
                      activePhase === index 
                        ? `bg-gradient-to-r ${phase.color} scale-110 shadow-lg` 
                        : 'bg-gray-400 hover:bg-gray-500'
                    }`}
                  >
                    {phase.icon}
                  </button>
                  {index < sessionPhases.length - 1 && (
                    <div className="w-8 h-1 bg-gray-300 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Active Phase Detail */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-2xl">{sessionPhases[activePhase].icon}</span>
              {sessionPhases[activePhase].title}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Key Activities:</h4>
                <ul className="space-y-2">
                  {sessionPhases[activePhase].activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">CPAT Focus:</h4>
                <p className="text-gray-700 bg-blue-50 p-4 rounded-lg italic">
                  {sessionPhases[activePhase].cpatFocus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Session Elements */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Essential Session Elements
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
              <span>🛡️</span> Safety Requirements
            </h3>
            <ul className="space-y-2 text-red-700">
              <li>• Complete contraindication screening before every session</li>
              <li>• Start with gentle light introduction - never sudden brightness</li>
              <li>• Monitor client for any adverse reactions throughout</li>
              <li>• Ensure adequate hydration before and after</li>
              <li>• Have emergency stop procedures readily available</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <span>💬</span> CPAT Dialogue
            </h3>
            <ul className="space-y-2 text-green-700">
              <li>• Maintain positive-only language throughout entire session</li>
              <li>• Use "I'm witnessing/validating/honoring" framing</li>
              <li>• Avoid directive statements or advice-giving</li>
              <li>• Reflect back client's inherent strength and wisdom</li>
              <li>• Allow natural silences for integration</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Breathing Protocols */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-8 rounded-lg mb-10">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Breathing Protocol Integration
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-xl">🌬️</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Opening: Relaxation Breathing
            </h4>
            <p className="text-gray-700 mb-4">
              <strong>5-10 minutes</strong> of guided deep breathing to transition 
              into therapeutic state and prepare for CLAS exposure.
            </p>
            <div className="bg-white p-4 rounded-lg text-sm">
              <strong>Technique:</strong> 4-7-8 breathing or box breathing
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-xl">⚡</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Closing: Grounding Breathing
            </h4>
            <p className="text-gray-700 mb-4">
              <strong>~5 minutes</strong> of energizing breath work to return 
              to normal alertness and integrate the session experience.
            </p>
            <div className="bg-white p-4 rounded-lg text-sm">
              <strong>Technique:</strong> Bellows breathing or energizing pranayama
            </div>
          </div>
        </div>
      </div>

      {/* Documentation Requirements */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
        <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
          <span>📝</span> Session Documentation
        </h3>
        <p className="text-yellow-700 mb-4">
          Proper documentation is essential for tracking progress and ensuring safety:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <ul className="space-y-1 text-yellow-700 text-sm">
            <li>• Color/light selections and intensity levels</li>
            <li>• Session duration and any modifications</li>
            <li>• Client responses and notable reactions</li>
          </ul>
          <ul className="space-y-1 text-yellow-700 text-sm">
            <li>• CPAT dialogue highlights or breakthroughs</li>
            <li>• Home plan assignments or recommendations</li>
            <li>• Next session planning and adjustments</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SessionStructureSection