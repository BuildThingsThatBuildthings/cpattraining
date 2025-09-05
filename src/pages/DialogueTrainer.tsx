import React, { useState, useEffect } from 'react'
import { cpatScenarios } from '../data/cpatScenarios'

const DialogueTrainer: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [completedScenarios, setCompletedScenarios] = useState<Set<number>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const currentScenario = cpatScenarios[currentScenarioIndex]

  // Filter scenarios by category (currently unused but kept for future functionality)
  // const filteredScenarios = selectedCategory === 'all' 
  //   ? cpatScenarios 
  //   : cpatScenarios.filter(scenario => scenario.category === selectedCategory)

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cpat-progress')
    if (saved) {
      const progress = JSON.parse(saved)
      setCompletedScenarios(new Set(progress.completed || []))
    }
  }, [])

  // Save progress to localStorage
  const saveProgress = (completed: Set<number>) => {
    localStorage.setItem('cpat-progress', JSON.stringify({
      completed: Array.from(completed),
      lastUpdated: new Date().toISOString()
    }))
  }

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    
    setShowFeedback(true)
    
    // Mark scenario as completed if correct answer was selected
    const isCorrect = currentScenario.options[selectedAnswer].isCorrect
    if (isCorrect) {
      const newCompleted = new Set(completedScenarios)
      newCompleted.add(currentScenario.id)
      setCompletedScenarios(newCompleted)
      saveProgress(newCompleted)
    }
  }

  const handleNextScenario = () => {
    if (currentScenarioIndex < cpatScenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1)
      resetScenarioState()
    }
  }

  const handlePreviousScenario = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(currentScenarioIndex - 1)
      resetScenarioState()
    }
  }

  const resetScenarioState = () => {
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      anxiety: 'from-yellow-500 to-orange-500',
      depression: 'from-blue-500 to-purple-500',
      addiction: 'from-red-500 to-pink-500',
      trauma: 'from-purple-500 to-indigo-500',
      general: 'from-gray-500 to-slate-500'
    }
    return colors[category as keyof typeof colors] || colors.general
  }

  const isCorrectAnswer = selectedAnswer !== null && currentScenario.options[selectedAnswer].isCorrect

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          CPAT Dialogue Trainer
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Practice positive-only therapeutic conversations with interactive scenarios. 
          Choose the best CPAT-compliant response for each situation.
        </p>

        {/* Progress Overview */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Progress: {completedScenarios.size}/{cpatScenarios.length} scenarios completed
            </div>
            <div className="progress-bar w-48">
              <div 
                className="progress-fill" 
                style={{ width: `${(completedScenarios.size / cpatScenarios.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-sm"
          >
            <option value="all">All Categories</option>
            <option value="anxiety">Anxiety</option>
            <option value="depression">Depression</option>
            <option value="addiction">Addiction</option>
            <option value="trauma">Trauma</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>

      {/* Safety Banner */}
      <div className="callout callout-safety mb-8">
        <div className="callout-title">
          <span>⚠️</span>
          Safety Reminder
        </div>
        <p className="mb-0">
          Remember: CLAS/light therapy is contraindicated for clients with epilepsy or seizure history. 
          Always screen thoroughly before beginning any therapeutic protocols.
        </p>
      </div>

      {/* Main Scenario Card */}
      <div className="card mb-8">
        <div className="card-header">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Scenario {currentScenarioIndex + 1}: {currentScenario.title}
              </h2>
              <div className="flex items-center gap-3">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getCategoryColor(currentScenario.category)}`}>
                  {currentScenario.category.charAt(0).toUpperCase() + currentScenario.category.slice(1)}
                </div>
                {completedScenarios.has(currentScenario.id) && (
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Completed
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          {/* Context */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Therapeutic Context:</h4>
            <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">
              {currentScenario.context}
            </p>
          </div>

          {/* Client Statement */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Client says:</h4>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-gray-900 font-medium italic">
                "{currentScenario.clientStatement}"
              </p>
            </div>
          </div>

          {/* Answer Options */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">How would you respond? (Choose the best CPAT response)</h4>
            <div className="space-y-3">
              {currentScenario.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showFeedback && handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`
                    w-full text-left p-4 border-2 rounded-lg transition-colors
                    ${selectedAnswer === index 
                      ? showFeedback 
                        ? option.isCorrect 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-red-500 bg-red-50'
                        : 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                    }
                    ${showFeedback && option.isCorrect ? 'border-green-500 bg-green-50' : ''}
                    ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                      ${selectedAnswer === index 
                        ? showFeedback 
                          ? option.isCorrect 
                            ? 'border-green-500 bg-green-500' 
                            : 'border-red-500 bg-red-500'
                          : 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                      }
                      ${showFeedback && option.isCorrect ? 'border-green-500 bg-green-500' : ''}
                    `}>
                      {selectedAnswer === index && (
                        <span className="text-white text-sm">
                          {showFeedback ? (option.isCorrect ? '✓' : '✗') : '●'}
                        </span>
                      )}
                      {showFeedback && option.isCorrect && selectedAnswer !== index && (
                        <span className="text-white text-sm">✓</span>
                      )}
                    </div>
                    <p className="text-gray-900">{option.text}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          {!showFeedback && (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          )}

          {/* Feedback Section */}
          {showFeedback && selectedAnswer !== null && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className={`mb-4 p-4 rounded-lg ${isCorrectAnswer ? 'bg-green-100' : 'bg-red-100'}`}>
                <h4 className={`font-semibold mb-2 ${isCorrectAnswer ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrectAnswer ? '✓ Excellent!' : '✗ Not quite right'}
                </h4>
                <p className={isCorrectAnswer ? 'text-green-700' : 'text-red-700'}>
                  {currentScenario.options[selectedAnswer].feedback}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Explanation:</h4>
                <p className="text-gray-700">
                  {currentScenario.options[selectedAnswer].explanation}
                </p>
              </div>

              {/* Learning Points */}
              <div className="callout callout-cpat">
                <div className="callout-title">
                  <span>🎯</span>
                  Key Learning Points
                </div>
                <ul className="space-y-2 mb-0">
                  {currentScenario.learningPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-2"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="card-footer">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousScenario}
              disabled={currentScenarioIndex === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <span className="text-sm text-gray-600">
              {currentScenarioIndex + 1} of {cpatScenarios.length}
            </span>

            <button
              onClick={handleNextScenario}
              disabled={currentScenarioIndex === cpatScenarios.length - 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Training Progress</h3>
        </div>
        <div className="card-body">
          <div className="grid md:grid-cols-5 gap-4">
            {['anxiety', 'depression', 'addiction', 'trauma', 'general'].map(category => {
              const categoryScenarios = cpatScenarios.filter(s => s.category === category)
              const completed = categoryScenarios.filter(s => completedScenarios.has(s.id)).length
              const total = categoryScenarios.length
              
              return (
                <div key={category} className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br ${getCategoryColor(category)} flex items-center justify-center text-white font-bold text-lg`}>
                    {completed}/{total}
                  </div>
                  <div className="text-sm font-medium text-gray-900 capitalize">
                    {category}
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round((completed / total) * 100)}% Complete
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DialogueTrainer