import React, { useState } from 'react'

const KeyPrinciplesSection: React.FC = () => {
  const [activeExample, setActiveExample] = useState<number>(0)

  const examples = [
    {
      situation: "Client expresses shame about relapsing",
      traditional: "You need to forgive yourself and move on. This is just a setback.",
      cpat: "I'm witnessing the courage it takes to share this vulnerability with me. Your awareness of your feelings shows remarkable self-compassion and growth.",
      principle: "Honor without judgment"
    },
    {
      situation: "Client feels overwhelmed by anxiety",
      traditional: "Try not to focus on the anxiety. Let's work on coping strategies.",
      cpat: "I'm validating how intense this experience feels for you right now. Your willingness to be present with these feelings demonstrates incredible strength.",
      principle: "Validate experience completely"
    },
    {
      situation: "Client struggles with negative self-talk",
      traditional: "Those thoughts aren't helpful. Let's challenge them.",
      cpat: "I'm honoring how exhausting it must be to navigate these thoughts. Your awareness of them is a profound gift to your healing journey.",
      principle: "Affirm inherent wisdom"
    }
  ]

  return (
    <div className="fade-in-up max-w-7xl mx-auto">
      {/* Luxury Header */}
      <div className="text-center mb-16 lg:mb-20">
        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full mx-auto mb-8 lg:mb-12 flex items-center justify-center therapeutic-glow floating" style={{ background: 'linear-gradient(135deg, #C8B8DB, #B8D4E3)' }}>
          <span className="text-white text-3xl sm:text-4xl lg:text-5xl">🎯</span>
        </div>
        <h1 className="display-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8 font-display px-4" style={{ color: '#6B7D6A' }}>
          Core CPAT Principles
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl max-w-5xl mx-auto leading-relaxed px-4" style={{ color: '#8FA68E', lineHeight: '1.6' }}>
          These sacred foundational principles guide every therapeutic interaction, ensuring that 
          all communication remains profoundly positive, deeply affirming, and genuinely empowering.
        </p>
      </div>

      {/* Luxury Three Core Principles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16 lg:mb-20 px-4">
        <div className="therapeutic-card text-center transition-transform duration-300 fade-in-up h-full" style={{ animationDelay: '0.3s' }}>
          <div className="card-body h-full flex flex-col">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full mx-auto mb-6 lg:mb-10 flex items-center justify-center floating therapeutic-glow flex-shrink-0" style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)', animationDelay: '0s' }}>
              <span className="text-white text-2xl sm:text-3xl lg:text-4xl">👂</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 font-display" style={{ color: '#6B7D6A' }}>
              1. Honor Without Judgment
            </h3>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed flex-grow" style={{ color: '#8FA68E' }}>
              Every client experience represents sacred truth deserving profound respect. We encounter clients 
              exactly where they exist, without imposing change or attempting repair.
            </p>
          </div>
        </div>

        <div className="therapeutic-card text-center transition-transform duration-300 fade-in-up h-full" style={{ animationDelay: '0.5s' }}>
          <div className="card-body h-full flex flex-col">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full mx-auto mb-6 lg:mb-10 flex items-center justify-center floating therapeutic-glow flex-shrink-0" style={{ background: 'linear-gradient(135deg, #B8D4E3, #C1E0D4)', animationDelay: '0.5s' }}>
              <span className="text-white text-2xl sm:text-3xl lg:text-4xl">✨</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 font-display" style={{ color: '#6B7D6A' }}>
              2. Validate Experience Completely
            </h3>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed flex-grow" style={{ color: '#8FA68E' }}>
              Acknowledge the complete intensity and authentic reality of client experiences, 
              never minimizing their truth or rushing toward premature solutions.
            </p>
          </div>
        </div>

        <div className="therapeutic-card text-center transition-transform duration-300 fade-in-up h-full" style={{ animationDelay: '0.7s' }}>
          <div className="card-body h-full flex flex-col">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full mx-auto mb-6 lg:mb-10 flex items-center justify-center floating therapeutic-glow flex-shrink-0" style={{ background: 'linear-gradient(135deg, #D4AF37, #C8B8DB)', animationDelay: '1.0s' }}>
              <span className="text-white text-2xl sm:text-3xl lg:text-4xl">💎</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 font-display" style={{ color: '#6B7D6A' }}>
              3. Affirm Inherent Wisdom
            </h3>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed flex-grow" style={{ color: '#8FA68E' }}>
              Recognize and mirror the client's natural capacity for healing, 
              transformation, and profound self-understanding that already exists within their being.
            </p>
          </div>
        </div>
      </div>

      {/* Luxury Therapeutic Examples */}
      <div className="therapeutic-section mb-16 lg:mb-20 fade-in-up px-4" style={{ animationDelay: '0.9s' }}>
        <div className="text-center mb-8 lg:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-6 lg:mb-8 flex items-center justify-center breathing-light" style={{ background: 'linear-gradient(135deg, #C8B8DB, #B8D4E3)' }}>
            <span className="text-white text-2xl sm:text-3xl">🎭</span>
          </div>
          <h2 className="display-heading text-3xl sm:text-4xl font-bold mb-4 lg:mb-6 font-display" style={{ color: '#6B7D6A' }}>
            Therapeutic Excellence in Practice
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: '#8FA68E' }}>
            Experience the profound transformation that occurs when traditional therapeutic approaches 
            evolve into CPAT excellence through compassionate, affirming communication.
          </p>
        </div>
        
        {/* Luxury Example Selector */}
        <div className="flex justify-center mb-12">
          <div className="p-2 rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(168, 192, 154, 0.1), rgba(143, 166, 142, 0.05))', border: '1px solid rgba(143, 166, 142, 0.15)' }}>
            {examples.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveExample(index)}
                className={`px-8 py-4 rounded-2xl transition-all duration-300 font-medium text-lg ${
                  activeExample === index
                    ? 'therapeutic-glow scale-105'
                    : 'hover:scale-102'
                }`}
                style={{
                  background: activeExample === index 
                    ? 'linear-gradient(135deg, #A8C09A, #8FA68E)' 
                    : 'transparent',
                  color: activeExample === index ? 'white' : '#8FA68E'
                }}
              >
                Scenario {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Luxury Active Example */}
        <div className="therapeutic-card p-12">
          <div className="mb-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center therapeutic-glow" style={{ background: 'linear-gradient(135deg, #D4AF37, #C8B8DB)' }}>
                <span className="text-white text-2xl">📋</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 font-display" style={{ color: '#6B7D6A' }}>Therapeutic Scenario</h4>
            </div>
            <div className="p-8 rounded-3xl text-center" style={{ background: 'linear-gradient(135deg, rgba(247, 245, 243, 0.8), rgba(232, 240, 229, 0.6))', border: '1px solid rgba(143, 166, 142, 0.15)' }}>
              <p className="text-2xl leading-relaxed font-medium" style={{ color: '#6B7D6A' }}>
                {examples[activeExample].situation}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12 max-w-6xl mx-auto">
            <div className="therapeutic-card transition-transform duration-300 h-full">
              <div className="card-body h-full flex flex-col">
                <div className="text-center mb-6 flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C8856A, #E8C4C8)' }}>
                    <span className="text-white text-lg sm:text-xl">⚡</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold font-display" style={{ color: '#C8856A' }}>Traditional Method</h4>
                </div>
                <div className="p-4 sm:p-6 rounded-2xl flex-grow flex items-center" style={{ background: 'linear-gradient(135deg, rgba(200, 133, 106, 0.08), rgba(232, 196, 200, 0.05))', border: '1px solid rgba(200, 133, 106, 0.15)' }}>
                  <p className="text-base sm:text-lg italic leading-relaxed text-center" style={{ color: '#8FA68E' }}>
                    "{examples[activeExample].traditional}"
                  </p>
                </div>
              </div>
            </div>

            <div className="therapeutic-card transition-transform duration-300 h-full">
              <div className="card-body h-full flex flex-col">
                <div className="text-center mb-6 flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto mb-4 flex items-center justify-center therapeutic-glow" style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)' }}>
                    <span className="text-white text-lg sm:text-xl">✨</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold font-display" style={{ color: '#6B7D6A' }}>CPAT Excellence</h4>
                </div>
                <div className="p-4 sm:p-6 rounded-2xl flex-grow flex items-center" style={{ background: 'linear-gradient(135deg, rgba(168, 192, 154, 0.12), rgba(143, 166, 142, 0.08))', border: '1px solid rgba(143, 166, 142, 0.2)' }}>
                  <p className="text-base sm:text-lg italic leading-relaxed text-center" style={{ color: '#6B7D6A' }}>
                    "{examples[activeExample].cpat}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-4 p-6 rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(200, 184, 219, 0.08))', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center therapeutic-glow" style={{ background: 'linear-gradient(135deg, #D4AF37, #C8B8DB)' }}>
                <span className="text-white text-xl">🎯</span>
              </div>
              <span className="text-2xl font-semibold font-display" style={{ color: '#6B7D6A' }}>
                Core Principle: {examples[activeExample].principle}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Language Transformation Guide */}
      <div className="therapeutic-section text-center fade-in-up" style={{ animationDelay: '1.2s' }}>
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center breathing-light" style={{ background: 'linear-gradient(135deg, #D4AF37, #A8C09A)' }}>
            <span className="text-white text-3xl">🗣️</span>
          </div>
          <h3 className="display-heading text-4xl font-bold mb-6 font-display" style={{ color: '#6B7D6A' }}>
            CPAT Language Transformation Mastery
          </h3>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: '#8FA68E' }}>
            Master the profound art of therapeutic communication transformation through these 
            sacred language patterns that honor, validate, and affirm every client interaction.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <div className="therapeutic-card transition-transform duration-300 h-full">
            <div className="card-body h-full flex flex-col">
              <div className="text-center mb-6 lg:mb-8 flex-shrink-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-4 lg:mb-6 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C8856A, #E8C4C8)' }}>
                  <span className="text-white text-xl sm:text-2xl">⚡</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-display" style={{ color: '#C8856A' }}>Transform FROM Traditional</h4>
                <p className="text-base sm:text-lg mt-2" style={{ color: '#8FA68E' }}>Language patterns that limit healing</p>
              </div>
              <div className="space-y-3 sm:space-y-4 flex-grow">
                {[
                  '"You should/shouldn\'t..."',
                  '"Don\'t worry about..."',
                  '"Why do you think..."',
                  '"Try not to focus on..."',
                  '"That\'s not helpful..."'
                ].map((item, index) => (
                  <div key={index} className="p-3 sm:p-4 rounded-xl" style={{ background: 'rgba(200, 133, 106, 0.08)', border: '1px solid rgba(200, 133, 106, 0.15)' }}>
                    <p className="text-base sm:text-lg font-medium" style={{ color: '#8FA68E' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="therapeutic-card transition-transform duration-300 h-full">
            <div className="card-body h-full flex flex-col">
              <div className="text-center mb-6 lg:mb-8 flex-shrink-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-4 lg:mb-6 flex items-center justify-center therapeutic-glow" style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)' }}>
                  <span className="text-white text-xl sm:text-2xl">✨</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-display" style={{ color: '#6B7D6A' }}>Transform TO CPAT Excellence</h4>
                <p className="text-base sm:text-lg mt-2" style={{ color: '#8FA68E' }}>Affirming language that catalyzes healing</p>
              </div>
              <div className="space-y-3 sm:space-y-4 flex-grow">
                {[
                  '"I\'m witnessing..."',
                  '"I\'m validating how..."',
                  '"I\'m honoring..."',
                  '"Your awareness shows..."',
                  '"This demonstrates your..."'
                ].map((item, index) => (
                  <div key={index} className="p-3 sm:p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(168, 192, 154, 0.12), rgba(143, 166, 142, 0.08))', border: '1px solid rgba(143, 166, 142, 0.2)' }}>
                    <p className="text-base sm:text-lg font-semibold" style={{ color: '#6B7D6A' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 p-10 rounded-3xl text-center" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(200, 184, 219, 0.06))', border: '1px solid rgba(212, 175, 55, 0.15)' }}>
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center breathing-light" style={{ background: 'linear-gradient(135deg, #D4AF37, #C8B8DB)' }}>
            <span className="text-white text-3xl">💎</span>
          </div>
          <h4 className="text-3xl font-bold mb-4 font-display" style={{ color: '#6B7D6A' }}>The Sacred Art of Therapeutic Communication</h4>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: '#8FA68E' }}>
            Every word becomes a healing gift when we choose language that witnesses, 
            validates, and affirms the client's profound capacity for transformation and growth.
          </p>
        </div>
      </div>
    </div>
  )
}

export default KeyPrinciplesSection