import React from 'react'

const WhatIsCPATSection: React.FC = () => {
  return (
    <div className="fade-in-up">
      {/* Luxury Header */}
      <div className="text-center mb-20">
        <div className="w-28 h-28 rounded-full mx-auto mb-12 flex items-center justify-center therapeutic-glow floating" style={{ background: 'linear-gradient(135deg, #D4AF37, #C8B8DB)' }}>
          <span className="text-white text-5xl">💎</span>
        </div>
        <h1 className="display-heading text-6xl font-bold mb-8 font-display" style={{ color: '#6B7D6A' }}>
          Understanding CPAT Excellence
        </h1>
        <p className="text-2xl max-w-5xl mx-auto leading-relaxed" style={{ color: '#8FA68E', lineHeight: '1.6' }}>
          CPAT represents <span className="cpat-highlight inline-block px-6 py-3 rounded-2xl font-semibold">CLAS Positive Affirmation Therapy</span> — 
          a revolutionary evidence-based approach that transforms therapeutic dialogue through compassionate, affirming communication.
        </p>
      </div>

      {/* Luxury Core Definition */}
      <div className="therapeutic-section mb-20 slide-in-right" style={{ animationDelay: '0.3s' }}>
        <h2 className="display-heading text-5xl font-bold text-center mb-12 font-display" style={{ color: '#6B7D6A' }}>
          The CPAT Philosophy of Healing
        </h2>
        <p className="text-3xl leading-relaxed mb-16 text-center max-w-6xl mx-auto" style={{ color: '#8FA68E' }}>
          CPAT establishes that <em className="font-semibold" style={{ color: '#6B7D6A' }}>every therapeutic interaction should honor, 
          validate, and affirm the client's inherent wisdom</em> while maintaining exclusively positive, 
          non-judgmental, and empowering communication patterns.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="therapeutic-card hover:scale-102 transition-transform duration-500 fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="card-body">
              <h3 className="text-2xl font-bold mb-6 font-display" style={{ color: '#C8856A' }}>⚡ Traditional Methods</h3>
              <div className="p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(200, 133, 106, 0.08), rgba(200, 133, 106, 0.05))', border: '1px solid rgba(200, 133, 106, 0.15)' }}>
                <p className="text-xl mb-6 italic leading-relaxed" style={{ color: '#8FA68E' }}>
                  "You shouldn't feel that way about your progress."
                </p>
                <p className="text-xl mb-6 italic leading-relaxed" style={{ color: '#8FA68E' }}>
                  "Don't worry about the anxiety - it will pass."
                </p>
                <p className="text-xl italic leading-relaxed" style={{ color: '#8FA68E' }}>
                  "Why do you think you keep having these thoughts?"
                </p>
              </div>
            </div>
          </div>
          
          <div className="therapeutic-card hover:scale-102 transition-transform duration-500 fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="card-body">
              <h3 className="text-2xl font-bold mb-6 font-display" style={{ color: '#6B7D6A' }}>✨ CPAT Excellence</h3>
              <div className="p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(168, 192, 154, 0.12), rgba(143, 166, 142, 0.08))', border: '1px solid rgba(143, 166, 142, 0.2)' }}>
                <p className="text-xl mb-6 italic leading-relaxed" style={{ color: '#6B7D6A' }}>
                  "I hear and validate your feelings about progress. This awareness demonstrates remarkable insight."
                </p>
                <p className="text-xl mb-6 italic leading-relaxed" style={{ color: '#6B7D6A' }}>
                  "I'm validating the intensity of this anxiety. Your courage to experience these feelings is profound."
                </p>
                <p className="text-xl italic leading-relaxed" style={{ color: '#6B7D6A' }}>
                  "I honor how challenging these thoughts feel. Your awareness is a sacred gift to your healing journey."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Four Pillars of CLAS */}
      <div className="mb-20">
        <h2 className="display-heading text-5xl font-bold text-center mb-16 font-display" style={{ color: '#6B7D6A' }}>
          The Four Sacred Pillars of CLAS
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="therapeutic-card text-center hover:scale-105 transition-transform duration-700 fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="card-body">
              <div className="w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center floating therapeutic-glow" style={{ background: 'linear-gradient(135deg, #E8C4C8, #C8856A)', animationDelay: '0s' }}>
                <span className="text-white text-3xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-display" style={{ color: '#6B7D6A' }}>Color Therapy</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#8FA68E' }}>
                Precise therapeutic wavelengths that harmonize emotional states and accelerate healing responses
              </p>
            </div>
          </div>
          
          <div className="therapeutic-card text-center hover:scale-105 transition-transform duration-700 fade-in-up" style={{ animationDelay: '1.0s' }}>
            <div className="card-body">
              <div className="w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center floating therapeutic-glow" style={{ background: 'linear-gradient(135deg, #D4AF37, #C8B8DB)', animationDelay: '0.5s' }}>
                <span className="text-white text-3xl">💡</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-display" style={{ color: '#6B7D6A' }}>Light Medicine</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#8FA68E' }}>
                Evidence-based phototherapy for circadian optimization and neurological restoration
              </p>
            </div>
          </div>
          
          <div className="therapeutic-card text-center hover:scale-105 transition-transform duration-700 fade-in-up" style={{ animationDelay: '1.2s' }}>
            <div className="card-body">
              <div className="w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center floating therapeutic-glow" style={{ background: 'linear-gradient(135deg, #C1E0D4, #A8C09A)', animationDelay: '1.0s' }}>
                <span className="text-white text-3xl">🌿</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-display" style={{ color: '#6B7D6A' }}>Aromatherapy</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#8FA68E' }}>
                Pure essential oil compounds that activate healing pathways through olfactory neural networks
              </p>
            </div>
          </div>
          
          <div className="therapeutic-card text-center hover:scale-105 transition-transform duration-700 fade-in-up" style={{ animationDelay: '1.4s' }}>
            <div className="card-body">
              <div className="w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center floating therapeutic-glow" style={{ background: 'linear-gradient(135deg, #B8D4E3, #C8B8DB)', animationDelay: '1.5s' }}>
                <span className="text-white text-3xl">🎵</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-display" style={{ color: '#6B7D6A' }}>Sound Healing</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#8FA68E' }}>
                Therapeutic frequencies and binaural beats for brainwave entrainment and deep restoration
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Key Insight */}
      <div className="therapeutic-section text-center fade-in-up" style={{ animationDelay: '1.6s' }}>
        <div className="max-w-5xl mx-auto">
          <div className="w-24 h-24 rounded-full mx-auto mb-12 flex items-center justify-center breathing-light" style={{ background: 'linear-gradient(135deg, #D4AF37, #A8C09A)' }}>
            <span className="text-white text-4xl">🎯</span>
          </div>
          <h3 className="display-heading text-4xl font-bold mb-8 font-display" style={{ color: '#6B7D6A' }}>
            The Transformative Power of Positive-Only Language
          </h3>
          <p className="text-2xl leading-relaxed" style={{ color: '#8FA68E' }}>
            CPAT revolutionizes therapeutic dialogue by <strong className="cpat-highlight inline-block px-4 py-2 rounded-xl" style={{ color: '#6B7D6A' }}>reframing every interaction 
            as a sacred affirmation</strong>. Rather than analyzing challenges or prescribing solutions, 
            we witness the client's profound wisdom and reflect back their innate capacity for healing and transformation.
          </p>
        </div>
      </div>
    </div>
  )
}

export default WhatIsCPATSection