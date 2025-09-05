import React from 'react'

const NextStepsSection: React.FC = () => {
  return (
    <div className="fade-in-up">
      {/* Luxury Header */}
      <div className="text-center mb-20">
        <div className="w-28 h-28 rounded-full mx-auto mb-12 flex items-center justify-center therapeutic-glow floating" style={{ background: 'linear-gradient(135deg, #C8B8DB, #D4AF37)' }}>
          <span className="text-white text-5xl">🚀</span>
        </div>
        <h1 className="display-heading text-6xl font-bold mb-8 font-display" style={{ color: '#6B7D6A' }}>
          Your CPAT Excellence Journey
        </h1>
        <p className="text-2xl max-w-5xl mx-auto leading-relaxed" style={{ color: '#8FA68E', lineHeight: '1.6' }}>
          Congratulations on completing this foundational CPAT introduction! This comprehensive knowledge 
          prepares you for advanced specialization and masterful implementation in your therapeutic practice.
        </p>
      </div>

      {/* Luxury Completion Badge */}
      <div className="text-center mb-20 fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="inline-block therapeutic-card p-0 hover:scale-105 transition-transform duration-700">
          <div className="card-body p-16">
            <div className="w-32 h-32 rounded-full mx-auto mb-12 flex items-center justify-center therapeutic-glow breathing-light" style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)' }}>
              <span className="text-white text-6xl font-bold">✓</span>
            </div>
            <h2 className="display-heading text-5xl font-bold mb-6 font-display" style={{ color: '#6B7D6A' }}>
              Excellence Achieved!
            </h2>
            <p className="text-2xl leading-relaxed" style={{ color: '#8FA68E' }}>
              You have mastered the foundational principles of CPAT methodology 
              and comprehensive CLAS safety protocols for professional practice
            </p>
          </div>
        </div>
      </div>

      {/* What You've Learned */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          What You've Mastered
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">CPAT Philosophy</h3>
                <p className="text-gray-600 text-sm">Understanding positive-only therapeutic dialogue</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Core Principles</h3>
                <p className="text-gray-600 text-sm">Honor, validate, and affirm client experiences</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">CLAS Overview</h3>
                <p className="text-gray-600 text-sm">The four pillars: Color, Light, Aromatherapy, Sound</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Session Structure</h3>
                <p className="text-gray-600 text-sm">Opening, core session, and closing protocols</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Safety Protocols</h3>
                <p className="text-gray-600 text-sm">Contraindications and screening procedures</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Language Transformation</h3>
                <p className="text-gray-600 text-sm">Converting traditional responses to CPAT format</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Next Training Modules */}
      <div className="mb-20">
        <h2 className="display-heading text-5xl font-bold text-center mb-16 font-display" style={{ color: '#6B7D6A' }}>
          Advanced Specialization Pathway
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="therapeutic-card hover:scale-105 transition-transform duration-700 fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="card-body">
              <div className="w-20 h-20 rounded-3xl mb-8 flex items-center justify-center floating therapeutic-glow" style={{ background: 'linear-gradient(135deg, #B8D4E3, #C1E0D4)', animationDelay: '0s' }}>
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-3xl font-bold mb-6 font-display" style={{ color: '#6B7D6A' }}>Light & Color Mastery</h3>
              <p className="text-xl leading-relaxed mb-8" style={{ color: '#8FA68E' }}>
                Advanced photobiological principles and precise color wavelength applications for therapeutic excellence
              </p>
              <div className="inline-block px-6 py-3 rounded-full font-semibold" style={{ background: 'linear-gradient(135deg, rgba(184, 212, 227, 0.15), rgba(193, 224, 212, 0.1))', color: '#6B7D6A' }}>
                Advanced Module
              </div>
            </div>
          </div>

          <div className="therapeutic-card hover:scale-105 transition-transform duration-700 fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="card-body">
              <div className="w-20 h-20 rounded-3xl mb-8 flex items-center justify-center floating therapeutic-glow" style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)', animationDelay: '0.5s' }}>
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-3xl font-bold mb-6 font-display" style={{ color: '#6B7D6A' }}>CPAT Mastery Techniques</h3>
              <p className="text-xl leading-relaxed mb-8" style={{ color: '#8FA68E' }}>
                Complex therapeutic scenarios, advanced dialogue patterns, and sophisticated affirmation methodologies
              </p>
              <div className="inline-block px-6 py-3 rounded-full font-semibold" style={{ background: 'linear-gradient(135deg, rgba(168, 192, 154, 0.15), rgba(143, 166, 142, 0.1))', color: '#6B7D6A' }}>
                Advanced Module
              </div>
            </div>
          </div>

          <div className="therapeutic-card hover:scale-105 transition-transform duration-700 fade-in-up" style={{ animationDelay: '0.9s' }}>
            <div className="card-body">
              <div className="w-20 h-20 rounded-3xl mb-8 flex items-center justify-center floating therapeutic-glow" style={{ background: 'linear-gradient(135deg, #D4AF37, #C8B8DB)', animationDelay: '1.0s' }}>
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-3xl font-bold mb-6 font-display" style={{ color: '#6B7D6A' }}>Clinical Excellence</h3>
              <p className="text-xl leading-relaxed mb-8" style={{ color: '#8FA68E' }}>
                Seamless CPAT + CLAS integration, practice management systems, and professional development pathways
              </p>
              <div className="inline-block px-6 py-3 rounded-full font-semibold" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(200, 184, 219, 0.1))', color: '#6B7D6A' }}>
                Advanced Module
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Immediate Action Steps */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-lg border-l-4 border-orange-400">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>🎯</span> Ready to Practice?
          </h3>
          <p className="text-gray-700 mb-6">
            Start implementing CPAT principles in your practice today:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">This Week:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Practice CPAT language patterns in daily conversations</li>
                <li>• Review contraindication screening with existing clients</li>
                <li>• Identify opportunities to use affirming interpretations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">This Month:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Integrate basic CPAT principles into sessions</li>
                <li>• Create a safety screening protocol for your practice</li>
                <li>• Plan for advanced CPAT training modules</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Resources & Support */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Continued Learning Resources
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>📚</span> Reference Materials
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li>• CPAT Quick Reference Guide</li>
              <li>• Safety Screening Checklist</li>
              <li>• Session Documentation Templates</li>
              <li>• Emergency Protocol Guidelines</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>🤝</span> Community & Support
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li>• CPAT Practitioner Community</li>
              <li>• Monthly Virtual Practice Sessions</li>
              <li>• Peer Consultation Groups</li>
              <li>• Advanced Training Notifications</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NextStepsSection