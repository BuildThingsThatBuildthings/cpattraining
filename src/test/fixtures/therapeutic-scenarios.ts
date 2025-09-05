// Therapeutic test scenarios for CPAT Training Platform
// Clinical reliability testing data

export interface TherapeuticScenario {
  id: string
  type: 'crisis' | 'routine' | 'assessment' | 'safety'
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  patientProfile: {
    age: number
    condition: string
    riskFactors: string[]
    previousHistory: boolean
  }
  requiredProtocols: string[]
  timeConstraints: boolean
  expectedOutcomes: string[]
  clinicalNotes: string[]
}

export const therapeuticTestScenarios: TherapeuticScenario[] = [
  {
    id: 'crisis-acute-anxiety',
    type: 'crisis',
    title: 'Acute Anxiety Crisis',
    description: 'Patient experiencing severe anxiety with panic symptoms',
    severity: 'high',
    patientProfile: {
      age: 28,
      condition: 'Generalized Anxiety Disorder',
      riskFactors: ['Previous panic attacks', 'Work stress', 'Sleep deprivation'],
      previousHistory: true
    },
    requiredProtocols: [
      'immediate-safety-assessment',
      'grounding-techniques',
      'breathing-exercises',
      'de-escalation',
      'crisis-plan-activation'
    ],
    timeConstraints: true,
    expectedOutcomes: [
      'Reduced anxiety symptoms',
      'Stable vital signs',
      'Clear safety plan',
      'Follow-up scheduled'
    ],
    clinicalNotes: [
      'Monitor for escalation signs',
      'Document intervention effectiveness',
      'Ensure environment safety'
    ]
  },

  {
    id: 'routine-progress-check',
    type: 'routine',
    title: 'Routine Progress Check',
    description: 'Regular therapeutic check-in session',
    severity: 'low',
    patientProfile: {
      age: 35,
      condition: 'Depression - Maintenance Phase',
      riskFactors: ['Seasonal changes', 'Work transitions'],
      previousHistory: true
    },
    requiredProtocols: [
      'progress-review',
      'medication-adherence-check',
      'goal-setting',
      'therapeutic-relationship-maintenance'
    ],
    timeConstraints: false,
    expectedOutcomes: [
      'Progress documented',
      'Goals updated',
      'Medication compliance confirmed',
      'Next session scheduled'
    ],
    clinicalNotes: [
      'Assess treatment effectiveness',
      'Monitor for early warning signs',
      'Reinforce positive changes'
    ]
  },

  {
    id: 'assessment-comprehensive',
    type: 'assessment',
    title: 'Comprehensive Clinical Assessment',
    description: 'Initial comprehensive assessment for new patient',
    severity: 'medium',
    patientProfile: {
      age: 42,
      condition: 'Initial Presentation',
      riskFactors: ['Family history', 'Recent trauma', 'Substance use'],
      previousHistory: false
    },
    requiredProtocols: [
      'comprehensive-intake',
      'risk-assessment',
      'mental-status-exam',
      'treatment-planning',
      'safety-planning'
    ],
    timeConstraints: false,
    expectedOutcomes: [
      'Complete assessment documented',
      'Diagnosis formulated',
      'Treatment plan developed',
      'Safety plan established'
    ],
    clinicalNotes: [
      'Thorough documentation required',
      'Cultural considerations noted',
      'Collateral information gathered'
    ]
  },

  {
    id: 'safety-imminent-risk',
    type: 'safety',
    title: 'Imminent Safety Risk',
    description: 'Patient expressing active suicidal ideation with plan',
    severity: 'critical',
    patientProfile: {
      age: 19,
      condition: 'Major Depression with Suicidal Ideation',
      riskFactors: ['Recent loss', 'Social isolation', 'Access to means'],
      previousHistory: false
    },
    requiredProtocols: [
      'immediate-safety-assessment',
      'suicide-risk-evaluation',
      'means-restriction',
      'emergency-contacts',
      'crisis-team-activation',
      'documentation-critical'
    ],
    timeConstraints: true,
    expectedOutcomes: [
      'Immediate safety ensured',
      'Risk factors mitigated',
      'Support system activated',
      'Higher level of care arranged'
    ],
    clinicalNotes: [
      'Continuous monitoring required',
      'Legal obligations met',
      'Family notification appropriate'
    ]
  },

  {
    id: 'trauma-processing',
    type: 'assessment',
    title: 'Trauma Processing Session',
    description: 'Therapeutic session for processing recent trauma',
    severity: 'high',
    patientProfile: {
      age: 31,
      condition: 'Acute Stress Disorder',
      riskFactors: ['Recent MVA', 'Physical injuries', 'Sleep disturbance'],
      previousHistory: false
    },
    requiredProtocols: [
      'trauma-informed-approach',
      'stabilization-techniques',
      'grounding-exercises',
      'psychoeducation',
      'resource-connection'
    ],
    timeConstraints: false,
    expectedOutcomes: [
      'Emotional stabilization',
      'Trauma psychoeducation provided',
      'Coping skills taught',
      'Specialized referral made'
    ],
    clinicalNotes: [
      'Monitor for dissociation',
      'Paced exposure approach',
      'Validate experience'
    ]
  }
]

// Test data for training modules
export const trainingModuleTestData = {
  'light-color-fundamentals': {
    title: 'Light & Color Fundamentals',
    duration: 45,
    sections: [
      'Introduction to Chromotherapy',
      'Scientific Foundation',
      'Color Psychology',
      'Clinical Applications'
    ],
    safetyNotes: [
      'Always assess for photosensitivity',
      'Monitor patient comfort levels',
      'Contraindications for seizure disorders'
    ],
    assessment: {
      passingScore: 80,
      questions: 25,
      timeLimit: 30
    }
  },
  'therapeutic-mechanisms': {
    title: 'Therapeutic Mechanisms',
    duration: 60,
    sections: [
      'Neurological Pathways',
      'Hormonal Responses',
      'Circadian Rhythm Effects',
      'Evidence Base'
    ],
    safetyNotes: [
      'Understanding contraindications',
      'Patient screening protocols',
      'Monitoring adverse effects'
    ],
    assessment: {
      passingScore: 85,
      questions: 30,
      timeLimit: 45
    }
  }
}

// User journey test data
export const userJourneyTestData = {
  newUser: {
    profile: {
      role: 'clinician',
      experience: 'beginner',
      specialization: 'general-practice'
    },
    expectedPath: [
      '/training',
      '/training/safety',
      '/training/journey',
      '/training/module/01-light-color-fundamentals'
    ]
  },
  returningUser: {
    profile: {
      role: 'therapist',
      experience: 'intermediate',
      specialization: 'trauma-therapy'
    },
    progress: {
      completedModules: ['01-light-color-fundamentals', '02-therapeutic-mechanisms'],
      currentModule: '03-clinical-applications'
    },
    expectedPath: [
      '/training/journey',
      '/training/module/03-clinical-applications'
    ]
  },
  expertUser: {
    profile: {
      role: 'supervisor',
      experience: 'expert',
      specialization: 'training-delivery'
    },
    progress: {
      completedModules: [
        '01-light-color-fundamentals',
        '02-therapeutic-mechanisms',
        '03-clinical-applications',
        '04-safety-protocols',
        '05-patient-assessment',
        '06-practical-implementation'
      ],
      certificateEligible: true
    },
    expectedPath: [
      '/training/certificate'
    ]
  }
}

// Accessibility test scenarios
export const accessibilityTestScenarios = {
  visualImpairment: {
    settings: {
      highContrast: true,
      largeText: true,
      screenReader: true
    },
    requirements: [
      'All images have alt text',
      'Color contrast ratio >= 4.5:1',
      'Focus indicators visible',
      'Navigation by keyboard only'
    ]
  },
  motorImpairment: {
    settings: {
      keyboardOnly: true,
      largeClickTargets: true,
      reducedMotion: true
    },
    requirements: [
      'Click targets >= 44px',
      'Keyboard navigation available',
      'No motion-based interactions',
      'Sufficient spacing between elements'
    ]
  },
  cognitiveSupport: {
    settings: {
      simplifiedLanguage: true,
      clearNavigation: true,
      consistentLayout: true
    },
    requirements: [
      'Clear, simple language',
      'Consistent navigation patterns',
      'Error messages are helpful',
      'Progress indicators present'
    ]
  }
}

// Performance benchmarks for luxury components
export const performanceBenchmarks = {
  pageLoad: {
    therapeutic: 2000, // 2 seconds max for therapeutic UX
    luxury: 1500,      // 1.5 seconds for luxury components
    critical: 1000     // 1 second for critical paths
  },
  interaction: {
    buttonClick: 100,   // 100ms max response time
    navigation: 200,    // 200ms max navigation time
    animation: 300      // 300ms max animation duration
  },
  memory: {
    baseline: 50 * 1024 * 1024,  // 50MB baseline
    luxury: 75 * 1024 * 1024,    // 75MB with luxury components
    maximum: 100 * 1024 * 1024   // 100MB absolute maximum
  }
}