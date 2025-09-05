import React, { useState } from 'react'

const PhraseTransformer: React.FC = () => {
  const [inputText, setInputText] = useState('')
  const [transformedText, setTransformedText] = useState('')

  const exampleTransformations = [
    {
      neutral: "You shouldn't feel that way about your progress.",
      cpat: "I hear you and validate how you're feeling about your progress. Your awareness of your feelings shows real insight."
    },
    {
      neutral: "Don't worry about the anxiety - it will pass.",
      cpat: "I'm validating how intense this anxiety feels for you right now. Your willingness to experience these feelings takes courage."
    },
    {
      neutral: "Why do you think you keep having these thoughts?",
      cpat: "I'm honoring the difficulty of experiencing these recurring thoughts. Your awareness of them is a gift to your healing process."
    }
  ]

  const handleTransform = () => {
    // This is a placeholder - in a full implementation, this would use AI or a more sophisticated transformation system
    if (inputText.trim()) {
      setTransformedText("This feature is coming soon! In the full version, this will provide AI-assisted CPAT transformations.")
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Phrase Transformation Workshop
        </h1>
        <p className="text-lg text-gray-600">
          Transform neutral or directive therapeutic statements into CPAT positive-only language. 
          Practice creating validating, affirming responses that honor client experience.
        </p>
      </div>

      {/* CPAT Reminder */}
      <div className="callout callout-cpat mb-8">
        <div className="callout-title">
          <span>🎯</span>
          CPAT Transformation Principles
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Transform FROM:</h4>
            <ul className="text-sm space-y-1">
              <li>• Directive language ("you should/shouldn't")</li>
              <li>• Dismissive responses ("don't worry")</li>
              <li>• Analytical questions ("why do you think...")</li>
              <li>• Problem-focused statements</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Transform TO:</h4>
            <ul className="text-sm space-y-1">
              <li>• Validating acknowledgment ("I hear you...")</li>
              <li>• Affirming interpretations ("It shows courage...")</li>
              <li>• Present-moment awareness</li>
              <li>• Strength-based reflections</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Transformation Tool */}
      <div className="card mb-8">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-gray-900">
            Transform Your Phrase
          </h2>
        </div>
        <div className="card-body">
          <div className="space-y-6">
            {/* Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter a therapeutic statement to transform:
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Example: You shouldn't be so hard on yourself about this..."
                className="w-full h-24 resize-none"
              />
            </div>

            {/* Transform Button */}
            <button
              onClick={handleTransform}
              disabled={!inputText.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Transform to CPAT
            </button>

            {/* Output */}
            {transformedText && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPAT-Compliant Version:
                </label>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <p className="text-gray-800">{transformedText}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Example Transformations */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-gray-900">
            Example Transformations
          </h2>
        </div>
        <div className="card-body">
          <div className="space-y-6">
            {exampleTransformations.map((example, index) => (
              <div key={index} className="border-l-4 border-gray-200 pl-4">
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-red-700 mb-1">❌ Neutral/Directive:</h4>
                  <p className="text-gray-700 italic">"{example.neutral}"</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-700 mb-1">✅ CPAT Positive-Only:</h4>
                  <p className="text-gray-700 italic">"{example.cpat}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-footer">
          <p className="text-sm text-gray-600 text-center">
            More examples and AI-powered transformations coming in the full version!
          </p>
        </div>
      </div>
    </div>
  )
}

export default PhraseTransformer