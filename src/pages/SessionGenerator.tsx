import React, { useState } from 'react'

interface SessionProtocol {
  clientName: string
  sessionType: string
  primaryIssue: string
  colorSelection: string
  sessionDuration: number
  breathingStart: number
  breathingEnd: number
  affirmation: string
  safetyScreened: boolean
  notes: string
}

const SessionGenerator: React.FC = () => {
  const [protocol, setProtocol] = useState<SessionProtocol>({
    clientName: '',
    sessionType: 'CPAT+CLAS',
    primaryIssue: '',
    colorSelection: '',
    sessionDuration: 60,
    breathingStart: 7,
    breathingEnd: 5,
    affirmation: '',
    safetyScreened: false,
    notes: ''
  })

  const handleInputChange = (field: keyof SessionProtocol, value: string | number | boolean) => {
    setProtocol(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGenerateProtocol = () => {
    // This would generate a PDF in the full version
    alert('Protocol generation complete! In the full version, this would create a PDF document.')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Session Protocol Generator
        </h1>
        <p className="text-lg text-gray-600">
          Create structured CPAT+CLAS session plans with built-in safety protocols and timing guidance.
        </p>
      </div>

      {/* Safety Banner */}
      <div className="callout callout-safety mb-8">
        <div className="callout-title">
          <span>⚠️</span>
          Required Safety Screening
        </div>
        <p className="mb-0">
          <strong>Always complete safety screening before generating session protocols.</strong> 
          CLAS/light therapy is contraindicated for epilepsy, seizures, and certain photosensitive conditions.
        </p>
      </div>

      {/* Protocol Form */}
      <div className="card mb-8">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-gray-900">
            Session Details
          </h2>
        </div>
        <div className="card-body">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Client Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Initials
              </label>
              <input
                type="text"
                value={protocol.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                placeholder="A.B."
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Type
              </label>
              <select
                value={protocol.sessionType}
                onChange={(e) => handleInputChange('sessionType', e.target.value)}
                className="w-full"
              >
                <option value="CPAT+CLAS">CPAT + CLAS Integration</option>
                <option value="CPAT">CPAT Only</option>
                <option value="CLAS">CLAS Only</option>
              </select>
            </div>

            {/* Primary Issue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Issue/Focus
              </label>
              <select
                value={protocol.primaryIssue}
                onChange={(e) => handleInputChange('primaryIssue', e.target.value)}
                className="w-full"
              >
                <option value="">Select primary issue...</option>
                <option value="anxiety">Anxiety</option>
                <option value="depression">Depression</option>
                <option value="addiction">Addiction/Substance Use</option>
                <option value="trauma">Trauma/PTSD</option>
                <option value="general">General Wellness</option>
              </select>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Selection Framework
              </label>
              <select
                value={protocol.colorSelection}
                onChange={(e) => handleInputChange('colorSelection', e.target.value)}
                className="w-full"
              >
                <option value="">Choose approach...</option>
                <option value="sedating">Sedating (Cool colors - Blue, Green)</option>
                <option value="stimulating">Stimulating (Warm colors - Red, Orange)</option>
                <option value="harmonizing">Harmonizing (Balanced spectrum)</option>
                <option value="complementary">Complementary/Antidote</option>
              </select>
            </div>

            {/* Session Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Session Duration (minutes)
              </label>
              <input
                type="number"
                value={protocol.sessionDuration}
                onChange={(e) => handleInputChange('sessionDuration', parseInt(e.target.value))}
                min="30"
                max="90"
                className="w-full"
              />
            </div>

            {/* Breathing Protocols */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start: Relaxation Breathing (minutes)
              </label>
              <input
                type="number"
                value={protocol.breathingStart}
                onChange={(e) => handleInputChange('breathingStart', parseInt(e.target.value))}
                min="5"
                max="15"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End: Grounding/Alertness (minutes)
              </label>
              <input
                type="number"
                value={protocol.breathingEnd}
                onChange={(e) => handleInputChange('breathingEnd', parseInt(e.target.value))}
                min="3"
                max="10"
                className="w-full"
              />
            </div>

            {/* Weekly Affirmation */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weekly Affirmation (3x daily)
              </label>
              <textarea
                value={protocol.affirmation}
                onChange={(e) => handleInputChange('affirmation', e.target.value)}
                placeholder="I am capable of healing and deserve to feel peaceful and grounded..."
                className="w-full h-20 resize-none"
              />
            </div>

            {/* Safety Screening Confirmation */}
            <div className="md:col-span-2">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={protocol.safetyScreened}
                  onChange={(e) => handleInputChange('safetyScreened', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">
                  <strong>I confirm that safety screening has been completed</strong> and client has no contraindications 
                  for light therapy (epilepsy, seizures, photosensitive conditions).
                </span>
              </label>
            </div>

            {/* Session Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Session Notes
              </label>
              <textarea
                value={protocol.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any specific considerations, client preferences, or therapeutic notes..."
                className="w-full h-24 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="card-footer">
          <button
            onClick={handleGenerateProtocol}
            disabled={!protocol.safetyScreened || !protocol.clientName || !protocol.primaryIssue}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
          >
            Generate Session Protocol PDF
          </button>
        </div>
      </div>

      {/* Session Flow Preview */}
      <div className="callout callout-practice">
        <div className="callout-title">
          <span>📋</span>
          Standard Session Flow
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Opening (10-15 min)</h4>
            <ul className="space-y-1">
              <li>• Safety check & intention</li>
              <li>• Relaxation breathing ({protocol.breathingStart} min)</li>
              <li>• Color selection</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Core Session (25-35 min)</h4>
            <ul className="space-y-1">
              <li>• CLAS exposure with on-screen affirmations</li>
              <li>• Continuous CPAT dialogue</li>
              <li>• Integration pause</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Closing (10-15 min)</h4>
            <ul className="space-y-1">
              <li>• Grounding breathing ({protocol.breathingEnd} min)</li>
              <li>• Home plan review</li>
              <li>• Session documentation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionGenerator