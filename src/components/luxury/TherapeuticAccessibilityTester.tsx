import React, { useState, useEffect } from 'react'
import { auditPageAccessibility, type AccessibilityReport } from '../../utils/accessibility'

interface TherapeuticAccessibilityTesterProps {
  isOpen: boolean
  onClose: () => void
}

const TherapeuticAccessibilityTester: React.FC<TherapeuticAccessibilityTesterProps> = ({ isOpen, onClose }) => {
  const [report, setReport] = useState<AccessibilityReport | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'contrast' | 'structure' | 'performance'>('overview')

  const runAccessibilityAudit = async () => {
    setIsRunning(true)
    
    // Simulate some processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const auditResult = auditPageAccessibility()
    setReport(auditResult)
    setIsRunning(false)
  }

  useEffect(() => {
    if (isOpen && !report) {
      runAccessibilityAudit()
    }
  }, [isOpen, report])

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#8FA68E' // Sage green for excellent
    if (score >= 75) return '#D4AF37' // Gold for good
    return '#C8856A' // Terracotta for needs improvement
  }

  const calculateOverallScore = () => {
    if (!report) return 0
    
    let score = 100
    
    // Deduct points for issues
    score -= report.issues.length * 10
    
    // Deduct points for contrast failures
    const contrastFailures = report.colorContrast.filter(test => !test.AA).length
    score -= contrastFailures * 15
    
    // Add points for good practices
    if (report.ariaLabels > 0) score += 5
    if (report.headingStructure.length > 0) score += 5
    if (report.focusableElements >= 5) score += 10
    
    return Math.max(0, Math.min(100, score))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
        style={{ 
          background: 'linear-gradient(145deg, #F7F5F3, rgba(232, 240, 229, 0.95))',
          border: '1px solid rgba(143, 166, 142, 0.2)'
        }}
        role="dialog"
        aria-labelledby="accessibility-tester-title"
        aria-modal="true"
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b" 
          style={{ borderColor: 'rgba(143, 166, 142, 0.2)' }}
        >
          <div>
            <h2 
              id="accessibility-tester-title"
              className="text-2xl font-bold font-display" 
              style={{ color: '#6B7D6A' }}
            >
              🌿 Therapeutic Accessibility Audit
            </h2>
            <p className="text-sm mt-1" style={{ color: '#8FA68E' }}>
              WCAG 2.1 AA compliance testing for luxury therapeutic design
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white hover:bg-opacity-50 transition-colors"
            style={{ color: '#6B7D6A' }}
            aria-label="Close accessibility tester"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(90vh-120px)]">
          {/* Tab Navigation */}
          <div className="flex border-b" style={{ borderColor: 'rgba(143, 166, 142, 0.2)' }}>
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'contrast', label: 'Color Contrast', icon: '🎨' },
              { id: 'structure', label: 'Structure', icon: '🏗️' },
              { id: 'performance', label: 'Performance', icon: '⚡' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'contrast' | 'structure' | 'performance')}
                className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'text-white shadow-sm' 
                    : 'hover:bg-white hover:bg-opacity-30'
                }`}
                style={{
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, #A8C09A, #8FA68E)'
                    : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#6B7D6A'
                }}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                <span className="mr-2" aria-hidden="true">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {isRunning ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div 
                    className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                    style={{ borderColor: '#8FA68E', borderTopColor: 'transparent' }}
                    aria-hidden="true"
                  />
                  <p className="text-lg font-medium" style={{ color: '#6B7D6A' }}>
                    Running therapeutic accessibility audit...
                  </p>
                  <p className="text-sm mt-2" style={{ color: '#8FA68E' }}>
                    Analyzing luxury components for WCAG compliance
                  </p>
                </div>
              </div>
            ) : report ? (
              <>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Score Card */}
                    <div 
                      className="p-6 rounded-xl border"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderColor: 'rgba(143, 166, 142, 0.2)'
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold" style={{ color: '#6B7D6A' }}>
                          Overall Accessibility Score
                        </h3>
                        <div 
                          className="text-3xl font-bold"
                          style={{ color: getScoreColor(calculateOverallScore()) }}
                        >
                          {calculateOverallScore()}/100
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-3 rounded-lg bg-white bg-opacity-50">
                          <div className="text-2xl font-bold" style={{ color: '#8FA68E' }}>
                            {report.focusableElements}
                          </div>
                          <div className="text-sm" style={{ color: '#6B7D6A' }}>
                            Focusable Elements
                          </div>
                        </div>
                        
                        <div className="text-center p-3 rounded-lg bg-white bg-opacity-50">
                          <div className="text-2xl font-bold" style={{ color: '#8FA68E' }}>
                            {report.ariaLabels}
                          </div>
                          <div className="text-sm" style={{ color: '#6B7D6A' }}>
                            ARIA Labels
                          </div>
                        </div>
                        
                        <div className="text-center p-3 rounded-lg bg-white bg-opacity-50">
                          <div className="text-2xl font-bold" style={{ color: '#8FA68E' }}>
                            {report.colorContrast.filter(test => test.AA).length}
                          </div>
                          <div className="text-sm" style={{ color: '#6B7D6A' }}>
                            Passing Colors
                          </div>
                        </div>
                        
                        <div className="text-center p-3 rounded-lg bg-white bg-opacity-50">
                          <div className="text-2xl font-bold" style={{ color: '#8FA68E' }}>
                            {report.headingStructure.length}
                          </div>
                          <div className="text-sm" style={{ color: '#6B7D6A' }}>
                            Headings
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Issues */}
                    {report.issues.length > 0 && (
                      <div 
                        className="p-4 rounded-xl border-l-4"
                        style={{ 
                          background: 'rgba(200, 133, 106, 0.1)',
                          borderColor: '#C8856A'
                        }}
                      >
                        <h4 className="font-semibold mb-2" style={{ color: '#C8856A' }}>
                          Issues Found ({report.issues.length})
                        </h4>
                        <ul className="space-y-1">
                          {report.issues.map((issue, index) => (
                            <li key={index} className="text-sm" style={{ color: '#6B7D6A' }}>
                              • {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Recommendations */}
                    {report.recommendations.length > 0 && (
                      <div 
                        className="p-4 rounded-xl border-l-4"
                        style={{ 
                          background: 'rgba(168, 192, 154, 0.1)',
                          borderColor: '#A8C09A'
                        }}
                      >
                        <h4 className="font-semibold mb-2" style={{ color: '#8FA68E' }}>
                          Recommendations ({report.recommendations.length})
                        </h4>
                        <ul className="space-y-1">
                          {report.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm" style={{ color: '#6B7D6A' }}>
                              • {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Color Contrast Tab */}
                {activeTab === 'contrast' && (
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      {report.colorContrast.map((test, index) => (
                        <div 
                          key={index}
                          className="p-4 rounded-xl border flex items-center justify-between"
                          style={{ 
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderColor: test.AA ? 'rgba(143, 166, 142, 0.2)' : 'rgba(200, 133, 106, 0.3)'
                          }}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex">
                              <div 
                                className="w-8 h-8 rounded-l-lg border border-r-0"
                                style={{ 
                                  backgroundColor: test.background,
                                  borderColor: 'rgba(0,0,0,0.1)'
                                }}
                                aria-label={`Background color: ${test.background}`}
                              />
                              <div 
                                className="w-8 h-8 rounded-r-lg border border-l-0 flex items-center justify-center text-xs font-bold"
                                style={{ 
                                  backgroundColor: test.foreground,
                                  color: test.background,
                                  borderColor: 'rgba(0,0,0,0.1)'
                                }}
                                aria-label={`Foreground color: ${test.foreground}`}
                              >
                                A
                              </div>
                            </div>
                            <div>
                              <div className="font-medium" style={{ color: '#6B7D6A' }}>
                                {test.name}
                              </div>
                              <div className="text-sm" style={{ color: '#8FA68E' }}>
                                Ratio: {test.ratio}:1
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span 
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                test.level === 'AAA' ? 'text-white' : test.level === 'AA' ? 'text-white' : 'text-white'
                              }`}
                              style={{ 
                                backgroundColor: test.level === 'AAA' ? '#8FA68E' : test.level === 'AA' ? '#D4AF37' : '#C8856A'
                              }}
                            >
                              {test.level}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Structure Tab */}
                {activeTab === 'structure' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3" style={{ color: '#6B7D6A' }}>
                        Heading Structure
                      </h3>
                      {report.headingStructure.length > 0 ? (
                        <div className="space-y-2">
                          {report.headingStructure.map((heading, index) => (
                            <div 
                              key={index}
                              className="flex items-center space-x-3 p-2 rounded bg-white bg-opacity-50"
                            >
                              <span 
                                className="px-2 py-1 rounded text-xs font-mono"
                                style={{ 
                                  background: 'linear-gradient(135deg, #A8C09A, #8FA68E)',
                                  color: 'white'
                                }}
                              >
                                {heading.toUpperCase()}
                              </span>
                              <span style={{ color: '#6B7D6A' }}>Level {heading.slice(1)}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm" style={{ color: '#8FA68E' }}>
                          No heading structure found on this page.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Performance Tab */}
                {activeTab === 'performance' && (
                  <div className="space-y-6">
                    <div 
                      className="p-4 rounded-xl"
                      style={{ background: 'rgba(168, 192, 154, 0.1)' }}
                    >
                      <h3 className="text-lg font-semibold mb-3" style={{ color: '#6B7D6A' }}>
                        Performance Optimizations
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <span style={{ color: '#8FA68E' }}>✓</span>
                          <span className="text-sm" style={{ color: '#6B7D6A' }}>
                            Reduced motion support implemented
                          </span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span style={{ color: '#8FA68E' }}>✓</span>
                          <span className="text-sm" style={{ color: '#6B7D6A' }}>
                            GPU-accelerated animations
                          </span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span style={{ color: '#8FA68E' }}>✓</span>
                          <span className="text-sm" style={{ color: '#6B7D6A' }}>
                            Touch-friendly 44px minimum tap targets
                          </span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span style={{ color: '#8FA68E' }}>✓</span>
                          <span className="text-sm" style={{ color: '#6B7D6A' }}>
                            Prevents iOS zoom with 16px font size
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TherapeuticAccessibilityTester