import React from 'react'

const WelcomeSection: React.FC = () => {
  return (
    <div className="text-center">
      {/* Luxury Hero Section */}
      <div className="mb-20 fade-in-up">
        <div className="w-32 h-32 mx-auto mb-12 flex items-center justify-center relative rounded-full bg-gradient-to-br from-blue-600 to-blue-800 shadow-xl">
          <div className="text-white text-4xl font-bold font-mono tracking-wider">
            CPAT
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-12 leading-tight max-w-4xl mx-auto" style={{ color: 'var(--ink-900)', fontFamily: 'var(--font-heading)' }}>
          CPAT Professional Training Program
        </h1>
        <p className="text-xl max-w-4xl mx-auto leading-relaxed mb-12" style={{ color: 'var(--ink-600)', lineHeight: '1.7' }}>
          Advanced clinical training in Color Light Aromatherapy Sound (CLAS) Positive Affirmation Therapy — 
          a research-validated therapeutic methodology for licensed mental health professionals and certified practitioners.
        </p>
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 max-w-3xl mx-auto border border-slate-200">
          <p className="text-lg font-medium text-center" style={{ color: 'var(--ink-700)' }}>
            Evidence-Based • Clinically Validated • Continuing Education Approved
          </p>
        </div>
      </div>

      {/* Professional Safety Guidelines */}
      <div className="callout callout-safety mb-20 fade-in-up" style={{ animationDelay: '0.4s', background: 'linear-gradient(135deg, rgba(200, 133, 106, 0.08), rgba(212, 175, 55, 0.06))', border: '1px solid rgba(200, 133, 106, 0.2)', borderRadius: '24px' }}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
              ⚕
            </div>
          </div>
          <div className="ml-8">
            <h3 className="text-3xl font-bold mb-6 font-display" style={{ color: '#6B7D6A' }}>
              Clinical Safety Guidelines
            </h3>
            <p className="mb-8 text-xl" style={{ color: '#8FA68E', lineHeight: '1.7' }}>
              CLAS light therapy requires comprehensive client assessment. Professional screening identifies contraindications for:
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-2xl border-l-4" style={{ background: 'rgba(247, 245, 243, 0.8)', borderColor: '#D4AF37' }}>
                <h4 className="font-bold mb-3 text-lg" style={{ color: '#C8856A' }}>Seizure History</h4>
                <p className="text-base" style={{ color: '#8FA68E' }}>Any epileptic episodes or seizure activity</p>
              </div>
              <div className="p-6 rounded-2xl border-l-4" style={{ background: 'rgba(247, 245, 243, 0.8)', borderColor: '#D4AF37' }}>
                <h4 className="font-bold mb-3 text-lg" style={{ color: '#C8856A' }}>Light Sensitivity</h4>
                <p className="text-base" style={{ color: '#8FA68E' }}>Photosensitive conditions or reactions</p>
              </div>
              <div className="p-6 rounded-2xl border-l-4" style={{ background: 'rgba(247, 245, 243, 0.8)', borderColor: '#D4AF37' }}>
                <h4 className="font-bold mb-3 text-lg" style={{ color: '#C8856A' }}>Visual Triggers</h4>
                <p className="text-base" style={{ color: '#8FA68E' }}>Strobe or flashing light sensitivity</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(168, 192, 154, 0.15), rgba(143, 166, 142, 0.1))' }}>
              <p className="font-semibold text-xl" style={{ color: '#6B7D6A' }}>
                ✅ Comprehensive screening ensures therapeutic safety and efficacy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Experience - Luxury */}
      <div className="text-left mb-20">
        <h2 className="display-heading text-5xl font-bold text-center mb-16">
          Your Professional Development Journey
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="h-full therapeutic-card hover:scale-[1.01] transition-transform duration-300 fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="card-body">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg">
                <div className="text-2xl font-bold tracking-wide">I</div>
              </div>
              <h3 className="text-3xl font-bold mb-6 font-display" style={{ color: '#6B7D6A' }}>
                CPAT Foundations
              </h3>
              <ul className="space-y-4" style={{ color: '#8FA68E' }}>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)' }}></div>
                  <span className="text-lg">Explore evidence-based CPAT methodology distinguished from conventional therapeutic approaches</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)' }}></div>
                  <span className="text-lg">Develop expertise in positive-focused therapeutic communication patterns</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)' }}></div>
                  <span className="text-lg">Integrate core philosophical principles that facilitate profound therapeutic outcomes</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="h-full therapeutic-card hover:scale-[1.01] transition-transform duration-300 fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="card-body">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br from-slate-600 to-slate-800 text-white shadow-lg">
                <div className="text-2xl font-bold tracking-wide">II</div>
              </div>
              <h3 className="text-3xl font-bold mb-6 font-display" style={{ color: '#6B7D6A' }}>
                Clinical Excellence
              </h3>
              <ul className="space-y-4" style={{ color: '#8FA68E' }}>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #B8D4E3, #C1E0D4)' }}></div>
                  <span className="text-lg">Master structured session protocols that consistently produce transformative client experiences</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #B8D4E3, #C1E0D4)' }}></div>
                  <span className="text-lg">Implement comprehensive safety assessment and ethical practice standards</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #B8D4E3, #C1E0D4)' }}></div>
                  <span className="text-lg">Create personalized advancement pathway toward advanced CPAT specialization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Commitment Section - Luxury */}
      <div className="therapeutic-section text-center fade-in-up" style={{ animationDelay: '0.9s' }}>
        <h3 className="text-4xl font-bold mb-8 font-display" style={{ color: '#6B7D6A' }}>
          Your Professional Development Experience
        </h3>
        <p className="text-2xl mb-12 max-w-4xl mx-auto leading-relaxed" style={{ color: '#8FA68E' }}>
          This comprehensive introduction requires <strong>20-25 minutes</strong> of focused attention. 
          Engage with 6 carefully structured modules that build your understanding of 
          evidence-based positive therapeutic methodology and advanced CLAS protocols.
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="p-8 rounded-3xl border" style={{ background: 'rgba(247, 245, 243, 0.6)', backdropFilter: 'blur(10px)', borderColor: 'rgba(143, 166, 142, 0.2)' }}>
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-blue-600"></div>
            </div>
            <h4 className="font-bold mb-3 text-xl" style={{ color: '#6B7D6A' }}>Immersive Learning</h4>
            <p className="text-lg" style={{ color: '#8FA68E' }}>20-25 minutes of deep therapeutic exploration</p>
          </div>
          <div className="p-8 rounded-3xl border" style={{ background: 'rgba(247, 245, 243, 0.6)', backdropFilter: 'blur(10px)', borderColor: 'rgba(143, 166, 142, 0.2)' }}>
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-slate-600"></div>
            </div>
            <h4 className="font-bold mb-3 text-xl" style={{ color: '#6B7D6A' }}>Structured Progression</h4>
            <p className="text-lg" style={{ color: '#8FA68E' }}>6 integrated professional development modules</p>
          </div>
          <div className="p-8 rounded-3xl border" style={{ background: 'rgba(247, 245, 243, 0.6)', backdropFilter: 'blur(10px)', borderColor: 'rgba(143, 166, 142, 0.2)' }}>
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-amber-600"></div>
            </div>
            <h4 className="font-bold mb-3 text-xl" style={{ color: '#6B7D6A' }}>Clinical Integration</h4>
            <p className="text-lg" style={{ color: '#8FA68E' }}>Immediate application in therapeutic practice</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeSection