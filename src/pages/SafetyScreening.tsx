import React, { useState } from 'react'

interface SafetyAssessment {
  clientInitials: string
  epilepsyHistory: boolean
  seizureHistory: boolean
  photosensitivity: boolean
  migraines: boolean
  pregnancy: boolean
  medications: string
  medicalConditions: string
  previousLightTherapy: boolean
  lightSensitivity: boolean
  mentalHealthStatus: string
  consentGiven: boolean
  assessmentDate: string
  assessorInitials: string
}

const SafetyScreening: React.FC = () => {
  const [assessment, setAssessment] = useState<SafetyAssessment>({
    clientInitials: '',
    epilepsyHistory: false,
    seizureHistory: false,
    photosensitivity: false,
    migraines: false,
    pregnancy: false,
    medications: '',
    medicalConditions: '',
    previousLightTherapy: false,
    lightSensitivity: false,
    mentalHealthStatus: '',
    consentGiven: false,
    assessmentDate: new Date().toISOString().split('T')[0],
    assessorInitials: ''
  })

  const handleInputChange = (field: keyof SafetyAssessment, value: string | boolean) => {
    setAssessment(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getScreeningResult = () => {
    const redFlags = [
      assessment.epilepsyHistory,
      assessment.seizureHistory,
      assessment.photosensitivity
    ]

    if (redFlags.some(flag => flag)) {
      return { 
        status: 'contraindicated', 
        message: 'CLAS/Light therapy is CONTRAINDICATED due to red flag conditions.' 
      }
    }

    const yellowFlags = [
      assessment.migraines,
      assessment.pregnancy,
      assessment.lightSensitivity
    ]

    if (yellowFlags.some(flag => flag)) {
      return { 
        status: 'caution', 
        message: 'Proceed with CAUTION. Consider lower intensity and careful monitoring.' 
      }
    }

    return { 
      status: 'cleared', 
      message: 'Client cleared for CLAS/Light therapy with standard protocols.' 
    }
  }

  const result = getScreeningResult()

  const handleSaveAssessment = () => {
    // In full version, this would save to secure storage
    console.log('Assessment saved:', assessment)
    alert('Safety assessment saved! In the full version, this would be securely stored.')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Safety Screening Checklist
        </h1>
        <p className="text-lg text-gray-600">
          Comprehensive contraindication assessment for CLAS/Light therapy. 
          Complete this screening before every new client or when health status changes.
        </p>
      </div>

      {/* Critical Safety Notice */}
      <div className="callout callout-safety mb-8">
        <div className="callout-title">
          <span>🛡️</span>
          Critical Safety Requirements
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-red-800 mb-2">ABSOLUTE CONTRAINDICATIONS:</h4>
            <ul className="text-sm space-y-1">
              <li>• History of epilepsy or seizures</li>
              <li>• Known photosensitive conditions</li>
              <li>• Active photosensitive medication reactions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">USE CAUTION WITH:</h4>
            <ul className="text-sm space-y-1">
              <li>• Photosensitive migraines</li>
              <li>• Pregnancy (device-specific)</li>
              <li>• Severe light sensitivity</li>
              <li>• Certain medications</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Screening Form */}
      <div className="card mb-8">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-gray-900">
            Safety Assessment Form
          </h2>
        </div>
        <div className="card-body">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Initials
                </label>
                <input
                  type="text"
                  value={assessment.clientInitials}
                  onChange={(e) => handleInputChange('clientInitials', e.target.value)}
                  placeholder="A.B."
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assessment Date
                </label>
                <input
                  type="date"
                  value={assessment.assessmentDate}
                  onChange={(e) => handleInputChange('assessmentDate', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assessor Initials
                </label>
                <input
                  type="text"
                  value={assessment.assessorInitials}
                  onChange={(e) => handleInputChange('assessorInitials', e.target.value)}
                  placeholder="Your initials"
                  className="w-full"
                />
              </div>
            </div>

            {/* Red Flag Conditions */}
            <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800 mb-4">🚫 Contraindication Screening</h3>
              <div className="space-y-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={assessment.epilepsyHistory}
                    onChange={(e) => handleInputChange('epilepsyHistory', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    <strong>History of epilepsy or epileptic seizures</strong> (any type, any age)
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={assessment.seizureHistory}
                    onChange={(e) => handleInputChange('seizureHistory', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    <strong>History of any seizures</strong> (including febrile, medication-induced, or unknown cause)
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={assessment.photosensitivity}
                    onChange={(e) => handleInputChange('photosensitivity', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    <strong>Known photosensitive conditions</strong> or reactions to flashing/strobe lights
                  </span>
                </label>
              </div>
            </div>

            {/* Caution Conditions */}
            <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">⚠️ Caution Conditions</h3>
              <div className="space-y-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={assessment.migraines}
                    onChange={(e) => handleInputChange('migraines', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    History of photosensitive migraines or light-triggered headaches
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={assessment.pregnancy}
                    onChange={(e) => handleInputChange('pregnancy', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    Currently pregnant (check device-specific guidelines)
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={assessment.lightSensitivity}
                    onChange={(e) => handleInputChange('lightSensitivity', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    Severe sensitivity to bright lights or eye strain
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={assessment.previousLightTherapy}
                    onChange={(e) => handleInputChange('previousLightTherapy', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    Previous adverse reactions to light therapy or phototherapy
                  </span>
                </label>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Medications (especially photosensitizing)
                </label>
                <textarea
                  value={assessment.medications}
                  onChange={(e) => handleInputChange('medications', e.target.value)}
                  placeholder="List any medications, especially those that may increase light sensitivity..."
                  className="w-full h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relevant Medical Conditions
                </label>
                <textarea
                  value={assessment.medicalConditions}
                  onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                  placeholder="Any medical conditions that may affect light therapy tolerance..."
                  className="w-full h-20 resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Mental Health Status & Goals
                </label>
                <textarea
                  value={assessment.mentalHealthStatus}
                  onChange={(e) => handleInputChange('mentalHealthStatus', e.target.value)}
                  placeholder="Brief summary of current mental health status and therapeutic goals..."
                  className="w-full h-16 resize-none"
                />
              </div>
            </div>

            {/* Informed Consent */}
            <div className="border border-gray-200 bg-gray-50 p-4 rounded-lg">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={assessment.consentGiven}
                  onChange={(e) => handleInputChange('consentGiven', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">
                  <strong>Informed consent obtained:</strong> Client has been informed about CLAS/light therapy procedures, 
                  potential risks, benefits, and alternatives. Client understands this is an adjunctive treatment 
                  and agrees to participate voluntarily.
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <button
            onClick={handleSaveAssessment}
            disabled={!assessment.clientInitials || !assessment.assessorInitials || !assessment.consentGiven}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Safety Assessment
          </button>
        </div>
      </div>

      {/* Screening Result */}
      <div className={`
        callout mb-8
        ${result.status === 'contraindicated' ? 'callout-safety' : 
          result.status === 'caution' ? 'bg-yellow-50 border-yellow-400' : 
          'bg-green-50 border-green-400'}
      `}>
        <div className="callout-title">
          <span>
            {result.status === 'contraindicated' ? '🚫' : 
             result.status === 'caution' ? '⚠️' : '✅'}
          </span>
          Screening Result
        </div>
        <p className={`mb-0 font-medium ${
          result.status === 'contraindicated' ? 'text-red-800' : 
          result.status === 'caution' ? 'text-yellow-800' : 
          'text-green-800'
        }`}>
          {result.message}
        </p>
        
        {result.status === 'contraindicated' && (
          <div className="mt-4 text-red-700">
            <p className="font-medium">Recommended Actions:</p>
            <ul className="mt-2 text-sm space-y-1">
              <li>• Document contraindications clearly</li>
              <li>• Do not proceed with light therapy</li>
              <li>• Consider CPAT-only sessions</li>
              <li>• Refer to medical provider if needed</li>
            </ul>
          </div>
        )}

        {result.status === 'caution' && (
          <div className="mt-4 text-yellow-700">
            <p className="font-medium">Recommended Precautions:</p>
            <ul className="mt-2 text-sm space-y-1">
              <li>• Start with very low light intensity</li>
              <li>• Monitor closely for any adverse reactions</li>
              <li>• Be prepared to discontinue if needed</li>
              <li>• Document any sensitivities or reactions</li>
            </ul>
          </div>
        )}
      </div>

      {/* Documentation Template */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Documentation Template</h3>
        </div>
        <div className="card-body">
          <div className="bg-gray-50 p-4 rounded text-sm">
            <p><strong>Safety Screening Completed:</strong> {assessment.assessmentDate}</p>
            <p><strong>Client:</strong> {assessment.clientInitials || '[Client Initials]'}</p>
            <p><strong>Assessor:</strong> {assessment.assessorInitials || '[Assessor Initials]'}</p>
            <p><strong>Result:</strong> {result.message}</p>
            <p><strong>Contraindications:</strong> {
              [assessment.epilepsyHistory && 'Epilepsy history', 
               assessment.seizureHistory && 'Seizure history', 
               assessment.photosensitivity && 'Photosensitivity']
                .filter(Boolean).join(', ') || 'None identified'
            }</p>
            <p><strong>Cautions:</strong> {
              [assessment.migraines && 'Migraines', 
               assessment.pregnancy && 'Pregnancy', 
               assessment.lightSensitivity && 'Light sensitivity']
                .filter(Boolean).join(', ') || 'None identified'
            }</p>
            <p><strong>Informed Consent:</strong> {assessment.consentGiven ? 'Obtained' : 'Not obtained'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SafetyScreening