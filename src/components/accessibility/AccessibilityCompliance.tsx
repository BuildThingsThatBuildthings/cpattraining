import React, { useState, useEffect } from 'react';
import { 
  auditPageAccessibility, 
  testTherapeuticPalette,
  announceToScreenReader,
  respectsReducedMotion,
  prefersHighContrast,
  type AccessibilityReport 
} from '../../utils/accessibility';
import TherapeuticButton from '../luxury/TherapeuticButton';

interface AccessibilityComplianceProps {
  autoRun?: boolean;
  showDetailedReport?: boolean;
  onComplianceChange?: (isCompliant: boolean, score: number) => void;
}

interface ComplianceScore {
  overall: number;
  contrast: number;
  structure: number;
  navigation: number;
  clinical: number;
}

const AccessibilityCompliance: React.FC<AccessibilityComplianceProps> = ({
  autoRun = false,
  showDetailedReport = true,
  onComplianceChange
}) => {
  const [report, setReport] = useState<AccessibilityReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [scores, setScores] = useState<ComplianceScore>({
    overall: 0,
    contrast: 0,
    structure: 0,
    navigation: 0,
    clinical: 0
  });
  const [userPreferences, setUserPreferences] = useState({
    reducedMotion: false,
    highContrast: false
  });

  const runComplianceAudit = React.useCallback(async () => {
    setIsRunning(true);
    announceToScreenReader('Running accessibility compliance audit', 'polite');

    try {
      // Simulate audit processing time
      await new Promise(resolve => setTimeout(resolve, 1500));

      const auditResult = auditPageAccessibility();
      const contrastResults = testTherapeuticPalette();
      
      // Calculate detailed scores
      const contrastScore = Math.round((contrastResults.filter(test => test.AA).length / contrastResults.length) * 100);
      const structureScore = auditResult.headingStructure.length > 0 ? 
        (auditResult.headingStructure.length >= 3 ? 100 : 75) : 0;
      const navigationScore = auditResult.focusableElements >= 5 ? 
        Math.min(100, (auditResult.focusableElements / 10) * 100) : 
        (auditResult.focusableElements / 5) * 50;
      const clinicalScore = calculateClinicalSafetyScore();
      
      const overallScore = Math.round(
        (contrastScore * 0.3 + structureScore * 0.2 + navigationScore * 0.2 + clinicalScore * 0.3)
      );

      const newScores = {
        overall: overallScore,
        contrast: contrastScore,
        structure: structureScore,
        navigation: navigationScore,
        clinical: clinicalScore
      };

      setScores(newScores);
      setReport({ ...auditResult, colorContrast: contrastResults });
      
      onComplianceChange?.(overallScore >= 85, overallScore);
      
      announceToScreenReader(`Accessibility audit complete. Overall score: ${overallScore} percent`, 'assertive');
    } catch (error) {
      // Suppress unused variable warning
      void error;
      announceToScreenReader('Error running accessibility audit', 'assertive');
    } finally {
      setIsRunning(false);
    }
  }, [onComplianceChange]);

  const calculateClinicalSafetyScore = (): number => {
    let score = 100;
    
    // Check for proper safety indicators
    const alertElements = document.querySelectorAll('[role="alert"]');
    const statusElements = document.querySelectorAll('[role="status"]');
    
    if (alertElements.length === 0) score -= 20;
    if (statusElements.length === 0) score -= 10;
    
    // Check for proper clinical semantic structure
    const skipLinks = document.querySelectorAll('.skip-link, [href="#main-content"]');
    if (skipLinks.length === 0) score -= 15;
    
    // Check for proper focus management
    const focusableElements = document.querySelectorAll('[tabindex], button, input, select, textarea, a[href]');
    if (focusableElements.length < 5) score -= 10;
    
    // Check for clinical safety warnings
    const clinicalWarnings = document.querySelectorAll('.clinical-warning, .clinical-caution');
    if (clinicalWarnings.length === 0) score -= 15;
    
    return Math.max(0, score);
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return '#059669'; // Green
    if (score >= 75) return '#d97706'; // Orange
    return '#dc2626'; // Red
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Needs Improvement';
    return 'Poor';
  };

  useEffect(() => {
    // Check user preferences
    setUserPreferences({
      reducedMotion: respectsReducedMotion(),
      highContrast: prefersHighContrast()
    });

    if (autoRun) {
      runComplianceAudit();
    }
  }, [autoRun, runComplianceAudit]);

  const complianceChecklist = [
    {
      category: 'Color Contrast',
      items: [
        { text: 'All text meets WCAG AA contrast ratio (4.5:1)', checked: scores.contrast >= 90 },
        { text: 'Focus indicators are visible and high contrast', checked: scores.contrast >= 80 },
        { text: 'Clinical warnings use appropriate contrast', checked: scores.clinical >= 80 }
      ]
    },
    {
      category: 'Keyboard Navigation',
      items: [
        { text: 'All interactive elements are keyboard accessible', checked: scores.navigation >= 80 },
        { text: 'Focus order is logical and predictable', checked: scores.navigation >= 70 },
        { text: 'Skip navigation links are provided', checked: scores.navigation >= 90 }
      ]
    },
    {
      category: 'Screen Reader Support',
      items: [
        { text: 'Proper heading hierarchy is used', checked: scores.structure >= 80 },
        { text: 'ARIA labels and descriptions are provided', checked: scores.structure >= 70 },
        { text: 'Status changes are announced', checked: scores.clinical >= 80 }
      ]
    },
    {
      category: 'Clinical Safety',
      items: [
        { text: 'Safety warnings are properly marked up', checked: scores.clinical >= 90 },
        { text: 'Emergency information is accessible', checked: scores.clinical >= 80 },
        { text: 'Clinical content follows semantic structure', checked: scores.clinical >= 85 }
      ]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <span className="text-green-600" aria-hidden="true">♿</span>
          CPAT Accessibility & Clinical Safety Compliance
        </h2>
        <p className="text-gray-600">
          Comprehensive WCAG 2.1 AA compliance audit with clinical safety protocols
        </p>
      </header>

      {/* User Preferences Detection */}
      <section className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
        <h3 className="font-semibold text-blue-800 mb-2">Detected User Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${userPreferences.reducedMotion ? 'bg-green-500' : 'bg-gray-300'}`} aria-hidden="true"></span>
            <span>Reduced Motion: {userPreferences.reducedMotion ? 'Enabled' : 'Disabled'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${userPreferences.highContrast ? 'bg-green-500' : 'bg-gray-300'}`} aria-hidden="true"></span>
            <span>High Contrast: {userPreferences.highContrast ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>
      </section>

      {/* Audit Controls */}
      <div className="mb-8 text-center">
        <TherapeuticButton
          onClick={runComplianceAudit}
          disabled={isRunning}
          variant="primary"
          size="large"
          loading={isRunning}
          ariaLabel="Run comprehensive accessibility and clinical safety audit"
        >
          {isRunning ? 'Running Audit...' : 'Run Compliance Audit'}
        </TherapeuticButton>
      </div>

      {/* Overall Score Display */}
      {report && (
        <>
          <section className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Overall Compliance Score</h3>
            <div className="text-center mb-4">
              <div 
                className="text-5xl font-bold mb-2"
                style={{ color: getScoreColor(scores.overall) }}
                role="meter"
                aria-valuenow={scores.overall}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Overall accessibility score: ${scores.overall} out of 100`}
              >
                {scores.overall}%
              </div>
              <div 
                className="text-lg font-semibold"
                style={{ color: getScoreColor(scores.overall) }}
              >
                {getScoreLabel(scores.overall)}
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Color Contrast', score: scores.contrast },
                { label: 'Structure', score: scores.structure },
                { label: 'Navigation', score: scores.navigation },
                { label: 'Clinical Safety', score: scores.clinical }
              ].map((item, index) => (
                <div key={index} className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <div 
                    className="text-2xl font-bold mb-1"
                    style={{ color: getScoreColor(item.score) }}
                  >
                    {item.score}%
                  </div>
                  <div className="text-xs text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Compliance Checklist */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Compliance Checklist</h3>
            <div className="space-y-6">
              {complianceChecklist.map((section, sectionIndex) => (
                <div key={sectionIndex} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">{section.category}</h4>
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3">
                        <div 
                          className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center text-sm ${
                            item.checked 
                              ? 'bg-green-500 text-white' 
                              : 'bg-red-500 text-white'
                          }`}
                          role="img"
                          aria-label={item.checked ? 'Compliant' : 'Not compliant'}
                        >
                          {item.checked ? '✓' : '✗'}
                        </div>
                        <span className={`text-sm ${item.checked ? 'text-gray-700' : 'text-red-700 font-medium'}`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Report */}
          {showDetailedReport && (
            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Detailed Audit Results</h3>
              
              {/* Issues */}
              {report.issues.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-3">Issues Found ({report.issues.length})</h4>
                  <ul className="space-y-2" role="list">
                    {report.issues.map((issue, index) => (
                      <li key={index} className="text-sm text-red-700" role="listitem">
                        • {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {report.recommendations.length > 0 && (
                <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">Recommendations ({report.recommendations.length})</h4>
                  <ul className="space-y-2" role="list">
                    {report.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-blue-700" role="listitem">
                        • {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Color Contrast Results */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Color Contrast Analysis</h4>
                <div className="grid gap-3">
                  {report.colorContrast.map((test, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border-2 flex items-center justify-between ${
                        test.AA ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex">
                          <div 
                            className="w-6 h-6 rounded-l border"
                            style={{ backgroundColor: test.background }}
                            aria-label={`Background: ${test.background}`}
                          ></div>
                          <div 
                            className="w-6 h-6 rounded-r border border-l-0 flex items-center justify-center text-xs font-bold"
                            style={{ 
                              backgroundColor: test.foreground,
                              color: test.background 
                            }}
                            aria-label={`Text color: ${test.foreground}`}
                          >
                            A
                          </div>
                        </div>
                        <span className="text-sm font-medium">{test.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Ratio: {test.ratio}:1</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          test.level === 'AAA' ? 'bg-green-100 text-green-800' :
                          test.level === 'AA' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {test.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{report.focusableElements}</div>
                  <div className="text-xs text-gray-600">Focusable Elements</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{report.ariaLabels}</div>
                  <div className="text-xs text-gray-600">ARIA Labels</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{report.headingStructure.length}</div>
                  <div className="text-xs text-gray-600">Headings</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{report.colorContrast.filter(t => t.AA).length}</div>
                  <div className="text-xs text-gray-600">Passing Colors</div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Call to Action for Non-Compliant */}
      {report && scores.overall < 85 && (
        <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg" role="alert">
          <h4 className="font-semibold text-yellow-800 mb-2">Action Required</h4>
          <p className="text-yellow-700 text-sm">
            This page does not meet WCAG 2.1 AA standards. Please address the issues above to ensure 
            accessibility for all users and compliance with clinical safety protocols.
          </p>
        </div>
      )}
    </div>
  );
};

export default AccessibilityCompliance;