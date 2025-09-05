import React, { useState } from 'react'

const SafetySection: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const handleCheckboxChange = (itemId: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId)
    } else {
      newChecked.add(itemId)
    }
    setCheckedItems(newChecked)
  }

  const contraindications = [
    { id: 'epilepsy', text: 'History of epilepsy or epileptic seizures (any type, any age)', critical: true },
    { id: 'seizures', text: 'History of any seizures (including febrile, medication-induced, or unknown cause)', critical: true },
    { id: 'photosensitive', text: 'Known photosensitive conditions or reactions to flashing/strobe lights', critical: true },
    { id: 'medication-reaction', text: 'Active photosensitive medication reactions', critical: true }
  ]

  const cautionConditions = [
    { id: 'migraines', text: 'History of photosensitive migraines or light-triggered headaches' },
    { id: 'pregnancy', text: 'Currently pregnant (check device-specific guidelines)' },
    { id: 'light-sensitivity', text: 'Severe sensitivity to bright lights or eye strain' },
    { id: 'previous-reactions', text: 'Previous adverse reactions to light therapy or phototherapy' }
  ]

  return (
    <div className="fade-in-up">
      {/* Luxury Header */}
      <div className="text-center mb-20">
        <div className="w-28 h-28 rounded-full mx-auto mb-12 flex items-center justify-center therapeutic-glow floating" style={{ background: 'linear-gradient(135deg, #D4AF37, #C8856A)' }}>
          <span className="text-white text-5xl">🛡️</span>
        </div>
        <h1 className="display-heading text-6xl font-bold mb-8 font-display" style={{ color: '#6B7D6A' }}>
          Clinical Safety Excellence
        </h1>
        <p className="text-2xl max-w-5xl mx-auto leading-relaxed" style={{ color: '#8FA68E', lineHeight: '1.6' }}>
          Professional safety represents our sacred commitment in CLAS therapy. Comprehensive understanding of 
          contraindications and screening protocols ensures optimal protection for both clients and practitioners.
        </p>
      </div>

      {/* Professional Safety Alert */}
      <div className="therapeutic-section mb-20 fade-in-up" style={{ animationDelay: '0.3s', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(200, 133, 106, 0.06))', border: '2px solid rgba(212, 175, 55, 0.2)' }}>
        <div className="text-center mb-12">
          <div className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center breathing-light" style={{ background: 'linear-gradient(135deg, #D4AF37, #C8856A)' }}>
            <span className="text-white text-4xl">🚨</span>
          </div>
          <h2 className="display-heading text-5xl font-bold mb-8 font-display" style={{ color: '#6B7D6A' }}>
            ABSOLUTE CONTRAINDICATIONS
          </h2>
          <p className="text-2xl font-semibold leading-relaxed" style={{ color: '#8FA68E' }}>
            CLAS/Light therapy requires complete contraindication screening. These conditions represent absolute exclusions:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {contraindications.map((item, index) => (
            <div key={item.id} className="therapeutic-card p-0 hover:scale-102 transition-transform duration-500 fade-in-up" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
              <div className="card-body">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center therapeutic-glow" style={{ background: 'linear-gradient(135deg, #D4AF37, #C8856A)' }}>
                      <span className="text-white text-xl font-bold">!</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-semibold leading-relaxed" style={{ color: '#6B7D6A' }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-3xl text-center" style={{ background: 'linear-gradient(135deg, rgba(168, 192, 154, 0.12), rgba(143, 166, 142, 0.08))', border: '1px solid rgba(143, 166, 142, 0.2)' }}>
          <p className="text-2xl font-semibold leading-relaxed" style={{ color: '#6B7D6A' }}>
            If ANY contraindication exists, proceed exclusively with CPAT dialogue 
            or provide appropriate professional referrals for optimal client care.
          </p>
        </div>
      </div>

      {/* Luxury Caution Conditions - Professional Guidance */}
      <div className="therapeutic-section mb-20 fade-in-up" style={{ animationDelay: '0.8s', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.06), rgba(168, 192, 154, 0.04))', border: '1px solid rgba(212, 175, 55, 0.15)' }}>
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center gentle-pulse" style={{ background: 'linear-gradient(135deg, #D4AF37, #A8C09A)' }}>
            <span className="text-white text-3xl">💎</span>
          </div>
          <h2 className="display-heading text-4xl font-bold mb-6 font-display" style={{ color: '#6B7D6A' }}>
            Enhanced Assessment Protocol
          </h2>
          <p className="text-xl font-medium leading-relaxed max-w-4xl mx-auto" style={{ color: '#8FA68E' }}>
            These conditions invite thoughtful consideration and personalized therapeutic approaches 
            to ensure optimal safety and profound healing outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cautionConditions.map((item, index) => (
            <div key={item.id} className="therapeutic-card hover:scale-102 transition-transform duration-500 fade-in-up" style={{ animationDelay: `${1.0 + index * 0.1}s` }}>
              <div className="card-body">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center therapeutic-glow" style={{ background: 'linear-gradient(135deg, #D4AF37, #A8C09A)' }}>
                      <span className="text-white text-xl">💡</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-medium leading-relaxed" style={{ color: '#6B7D6A' }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(168, 192, 154, 0.12), rgba(212, 175, 55, 0.08))', border: '1px solid rgba(143, 166, 142, 0.2)' }}>
          <h3 className="text-2xl font-bold mb-6 text-center font-display" style={{ color: '#6B7D6A' }}>Therapeutic Excellence Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold" style={{ color: '#6B7D6A' }}>🌿 Gentle Introduction Protocol:</h4>
              <ul className="space-y-3" style={{ color: '#8FA68E' }}>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)' }}></div>
                  <span>Begin with nurturing low-intensity therapeutic light</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)' }}></div>
                  <span>Create comfortable session duration based on individual needs</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold" style={{ color: '#6B7D6A' }}>✨ Mindful Observation Practice:</h4>
              <ul className="space-y-3" style={{ color: '#8FA68E' }}>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #D4AF37, #A8C09A)' }}></div>
                  <span>Maintain compassionate awareness throughout healing process</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #D4AF37, #A8C09A)' }}></div>
                  <span>Document therapeutic insights and personalized responses</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Professional Preparation Protocol */}
      <div className="therapeutic-section mb-20 fade-in-up" style={{ animationDelay: '1.1s' }}>
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center breathing-light" style={{ background: 'linear-gradient(135deg, #B8D4E3, #C1E0D4)' }}>
            <span className="text-white text-3xl">📋</span>
          </div>
          <h2 className="display-heading text-4xl font-bold mb-6 font-display" style={{ color: '#6B7D6A' }}>
            Therapeutic Excellence Preparation
          </h2>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: '#8FA68E' }}>
            Complete this comprehensive wellness assessment to ensure optimal therapeutic 
            experience and profound healing outcomes for each cherished client.
          </p>
        </div>
        
        <div className="therapeutic-card p-10">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              'Comprehensive wellness history exploration',
              'Gentle inquiry about neurological wellness history',
              'Thoughtful assessment of photosensitive considerations',
              'Light sensitivity and comfort level evaluation',
              'Current wellness goals and therapeutic intentions review',
              'CLAS procedure explanation with informed partnership consent',
              'Collaborative comfort and safety protocol establishment',
              'Optimal hydration and wellness preparation confirmation'
            ].map((item, index) => (
              <label key={index} className="flex items-start gap-4 cursor-pointer therapeutic-button p-4 rounded-2xl hover:scale-102 transition-all duration-300" style={{ background: 'rgba(247, 245, 243, 0.6)' }}>
                <div className="flex-shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={checkedItems.has(`checklist-${index}`)}
                    onChange={() => handleCheckboxChange(`checklist-${index}`)}
                    className="w-6 h-6 rounded-lg border-2 transition-all duration-200"
                    style={{ 
                      borderColor: checkedItems.has(`checklist-${index}`) ? '#8FA68E' : '#E8F0E5',
                      background: checkedItems.has(`checklist-${index}`) ? 'linear-gradient(135deg, #A8C09A, #8FA68E)' : 'white'
                    }}
                  />
                </div>
                <span className="text-lg leading-relaxed" style={{ color: '#6B7D6A' }}>{item}</span>
              </label>
            ))}
          </div>
          
          <div className="mt-12 p-8 rounded-3xl text-center" style={{ background: 'linear-gradient(135deg, rgba(168, 192, 154, 0.15), rgba(143, 166, 142, 0.1))' }}>
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center therapeutic-glow" style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)' }}>
              <span className="text-white text-2xl">✨</span>
            </div>
            <p className="text-2xl font-semibold leading-relaxed" style={{ color: '#6B7D6A' }}>
              Complete therapeutic preparation ensures profound, 
              safe, and transformative CLAS therapy experiences
            </p>
          </div>
        </div>
      </div>

      {/* Professional Support Protocol - Luxury Transformation */}
      <div className="therapeutic-section mb-20 fade-in-up" style={{ animationDelay: '1.4s', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(200, 133, 106, 0.06))', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center gentle-pulse" style={{ background: 'linear-gradient(135deg, #D4AF37, #C8856A)' }}>
            <span className="text-white text-3xl">🤝</span>
          </div>
          <h3 className="display-heading text-4xl font-bold mb-6 font-display" style={{ color: '#6B7D6A' }}>
            Compassionate Support Protocol
          </h3>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: '#8FA68E' }}>
            In the rare event a client experiences discomfort during CLAS therapy, 
            our compassionate response protocol ensures immediate care and professional support.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="therapeutic-card">
            <div className="card-body">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center therapeutic-glow" style={{ background: 'linear-gradient(135deg, #B8D4E3, #C1E0D4)' }}>
                <span className="text-white text-2xl">🌟</span>
              </div>
              <h4 className="text-2xl font-bold mb-6 text-center font-display" style={{ color: '#6B7D6A' }}>Immediate Care Response</h4>
              <div className="space-y-4">
                {[
                  'Gently pause light therapy with compassionate presence',
                  'Create comfortable ambient lighting environment', 
                  'Assess client comfort and wellness with caring attention',
                  'Provide safe, supportive transition from therapy space'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg, #B8D4E3, #C1E0D4)' }}>
                      {index + 1}
                    </div>
                    <p className="text-lg leading-relaxed pt-1" style={{ color: '#8FA68E' }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="therapeutic-card">
            <div className="card-body">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center therapeutic-glow" style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)' }}>
                <span className="text-white text-2xl">📝</span>
              </div>
              <h4 className="text-2xl font-bold mb-6 text-center font-display" style={{ color: '#6B7D6A' }}>Professional Follow-Through</h4>
              <div className="space-y-4">
                {[
                  'Document experience with therapeutic insights',
                  'Provide appropriate professional wellness referrals',
                  'Connect with healthcare providers as beneficial',
                  'Review and enhance safety protocols thoughtfully'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)' }}>
                      {index + 1}
                    </div>
                    <p className="text-lg leading-relaxed pt-1" style={{ color: '#8FA68E' }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Excellence Summary - Luxury */}
      <div className="therapeutic-section text-center fade-in-up" style={{ animationDelay: '1.7s' }}>
        <h3 className="display-heading text-5xl font-bold mb-12 font-display" style={{ color: '#6B7D6A' }}>
          Therapeutic Excellence Foundation
        </h3>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="therapeutic-card text-center hover:scale-105 transition-transform duration-500">
            <div className="card-body">
              <div className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center therapeutic-glow floating" style={{ background: 'linear-gradient(135deg, #B8D4E3, #C1E0D4)', animationDelay: '0s' }}>
                <span className="text-white text-4xl font-bold">1</span>
              </div>
              <h4 className="text-2xl font-bold mb-6 font-display" style={{ color: '#6B7D6A' }}>Comprehensive Assessment</h4>
              <p className="text-lg leading-relaxed" style={{ color: '#8FA68E' }}>
                Never compromise on thorough wellness screening. 
                When questions arise, choose compassionate caution and personalized care approaches.
              </p>
            </div>
          </div>
          <div className="therapeutic-card text-center hover:scale-105 transition-transform duration-500">
            <div className="card-body">
              <div className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center therapeutic-glow floating" style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)', animationDelay: '0.8s' }}>
                <span className="text-white text-4xl font-bold">2</span>
              </div>
              <h4 className="text-2xl font-bold mb-6 font-display" style={{ color: '#6B7D6A' }}>Gentle Introduction</h4>
              <p className="text-lg leading-relaxed" style={{ color: '#8FA68E' }}>
                Begin with nurturing, low-intensity therapeutic experiences. 
                Gradually enhance only when optimal comfort and tolerance is established.
              </p>
            </div>
          </div>
          <div className="therapeutic-card text-center hover:scale-105 transition-transform duration-500">
            <div className="card-body">
              <div className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center therapeutic-glow floating" style={{ background: 'linear-gradient(135deg, #D4AF37, #C8856A)', animationDelay: '1.6s' }}>
                <span className="text-white text-4xl font-bold">3</span>
              </div>
              <h4 className="text-2xl font-bold mb-6 font-display" style={{ color: '#6B7D6A' }}>Mindful Presence</h4>
              <p className="text-lg leading-relaxed" style={{ color: '#8FA68E' }}>
                Maintain compassionate, attentive awareness throughout each therapeutic session. 
                Your presence ensures profound safety and transformative healing experiences.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 p-10 rounded-3xl text-center" style={{ background: 'linear-gradient(135deg, rgba(168, 192, 154, 0.1), rgba(212, 175, 55, 0.05))', border: '1px solid rgba(143, 166, 142, 0.15)' }}>
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center breathing-light" style={{ background: 'linear-gradient(135deg, #A8C09A, #8FA68E)' }}>
            <span className="text-white text-3xl">🌿</span>
          </div>
          <h4 className="text-3xl font-bold mb-4 font-display" style={{ color: '#6B7D6A' }}>Your Professional Commitment</h4>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: '#8FA68E' }}>
            Through comprehensive preparation, gentle therapeutic approaches, and mindful presence, 
            you create sacred healing spaces where profound transformation naturally unfolds.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SafetySection