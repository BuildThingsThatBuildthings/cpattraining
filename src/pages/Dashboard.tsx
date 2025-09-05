import React from 'react'
import { ActivePage } from '../App'

interface DashboardProps {
  onNavigate: (page: ActivePage) => void
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const tools = [
    {
      id: 'dialogue',
      title: 'CPAT Dialogue Trainer',
      description: 'Practice positive-only therapeutic conversations with interactive scenarios',
      icon: '💬',
      color: 'from-blue-500 to-blue-600',
      features: ['20 Practice Scenarios', 'Instant Feedback', 'Progress Tracking'],
    },
    {
      id: 'transformer',
      title: 'Phrase Transformation Workshop',
      description: 'Transform neutral statements into CPAT positive-only language',
      icon: '✨',
      color: 'from-purple-500 to-purple-600',
      features: ['AI-Assisted Conversion', '100+ Examples', 'Personal Library'],
    },
    {
      id: 'generator',
      title: 'Session Protocol Generator',
      description: 'Create structured CPAT+CLAS session plans with built-in safety protocols',
      icon: '📋',
      color: 'from-green-500 to-green-600',
      features: ['Step-by-Step Guidance', 'Timer Integration', 'PDF Export'],
    },
    {
      id: 'safety',
      title: 'Safety Screening Checklist',
      description: 'Comprehensive contraindication assessment for light therapy',
      icon: '🛡️',
      color: 'from-red-500 to-red-600',
      features: ['Epilepsy Screening', 'Red Flag Detection', 'Documentation'],
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 style={{
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-4)'
        }}>
          CPAT Professional Training Platform
        </h1>
        <p className="p-lead" style={{
          textAlign: 'center',
          margin: '0 auto'
        }}>
          Master the art of positive-only therapeutic dialogue and light therapy integration. 
          Build your skills with interactive tools designed for licensed therapists.
        </p>
      </div>

      {/* Safety Banner */}
      <div className="callout callout-safety mb-12">
        <div className="callout-title">
          <span>⚠️</span>
          Safety Notice
        </div>
        <p className="mb-0">
          <strong>CLAS/light exposure is contraindicated for individuals with epilepsy or seizure history.</strong> 
          Always screen clients thoroughly and obtain informed consent before beginning any light therapy protocols.
        </p>
      </div>

      {/* Training Tools Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {tools.map((tool) => (
          <div 
            key={tool.id} 
            className="card hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onNavigate(tool.id as ActivePage)}
          >
            <div className="card-header">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center text-white text-2xl`}>
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card-body">
              <ul className="space-y-2">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-footer">
              <button className="btn-primary w-full">
                Start Training
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CPAT Principles Quick Reference */}
      <div className="callout callout-cpat">
        <div className="callout-title">
          <span>🎯</span>
          Core CPAT Principles
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Therapeutic Dialogue Rules</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Paraphrase</strong> with validation</li>
              <li>• <strong>Interpret</strong> with affirmations</li>
              <li>• <strong>Reflect</strong> positively</li>
              <li>• <strong>Assign</strong> as gifts</li>
              <li>• <strong>Summarize</strong> with positive reinforcement</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Session Structure</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Start:</strong> Relaxation breathing (5-10 min)</li>
              <li>• <strong>Core:</strong> CPAT dialogue + CLAS exposure</li>
              <li>• <strong>End:</strong> Grounding/alertness breathing (~5 min)</li>
              <li>• <strong>Assignment:</strong> 1 affirmation/week, 3× daily</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
        </div>
        <div className="card-body">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">0/20</div>
              <div className="text-sm text-gray-600">Scenarios Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">0</div>
              <div className="text-sm text-gray-600">Phrases Transformed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">0</div>
              <div className="text-sm text-gray-600">Protocols Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">0</div>
              <div className="text-sm text-gray-600">Safety Screenings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard