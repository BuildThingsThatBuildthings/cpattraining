import { ModuleMetadata } from '../hooks/useProgressTracking';

export const TRAINING_MODULES: Record<string, ModuleMetadata> = {
  '01-light-color-fundamentals': {
    id: '01-light-color-fundamentals',
    title: 'Light & Color Fundamentals',
    duration: '3-4 minutes',
    outcomes: [
      'Master spectral theory and therapeutic wavelength ranges',
      'Understand photobiomodulation mechanisms',
      'Identify optimal treatment parameters'
    ],
    safetyFlags: ['photosensitivity-warning'],
    prerequisites: ['safety-acknowledgment']
  },
  '02-therapeutic-mechanisms': {
    id: '02-therapeutic-mechanisms',
    title: 'Therapeutic Mechanisms',
    duration: '4-5 minutes',
    outcomes: [
      'Understand cellular response pathways',
      'Master mitochondrial activation principles',
      'Apply therapeutic dose calculations'
    ],
    safetyFlags: ['dosage-critical'],
    prerequisites: ['safety-acknowledgment', '01-light-color-fundamentals']
  },
  '03-clinical-applications': {
    id: '03-clinical-applications',
    title: 'Clinical Applications',
    duration: '5-6 minutes',
    outcomes: [
      'Apply evidence-based treatment protocols',
      'Understand indication-specific approaches',
      'Master patient selection criteria'
    ],
    safetyFlags: ['contraindication-critical'],
    prerequisites: ['safety-acknowledgment', '01-light-color-fundamentals', '02-therapeutic-mechanisms']
  },
  '04-safety-protocols': {
    id: '04-safety-protocols',
    title: 'Safety Protocols',
    duration: '6-7 minutes',
    outcomes: [
      'Implement comprehensive safety screening',
      'Master protective equipment protocols',
      'Apply emergency response procedures'
    ],
    safetyFlags: ['safety-critical', 'emergency-procedures'],
    prerequisites: ['safety-acknowledgment', '01-light-color-fundamentals', '02-therapeutic-mechanisms', '03-clinical-applications']
  },
  '05-patient-assessment': {
    id: '05-patient-assessment',
    title: 'Patient Assessment',
    duration: '5-6 minutes',
    outcomes: [
      'Conduct thorough pre-treatment evaluation',
      'Document medical history requirements',
      'Apply risk stratification protocols'
    ],
    safetyFlags: ['medical-history-critical'],
    prerequisites: ['safety-acknowledgment', '01-light-color-fundamentals', '02-therapeutic-mechanisms', '03-clinical-applications', '04-safety-protocols']
  },
  '06-practical-implementation': {
    id: '06-practical-implementation',
    title: 'Practical Implementation',
    duration: '7-8 minutes',
    outcomes: [
      'Execute complete treatment protocols',
      'Master equipment operation and maintenance',
      'Apply quality assurance procedures'
    ],
    safetyFlags: ['equipment-operation'],
    prerequisites: ['safety-acknowledgment', '01-light-color-fundamentals', '02-therapeutic-mechanisms', '03-clinical-applications', '04-safety-protocols', '05-patient-assessment']
  }
};

export const getModuleMetadata = (moduleId: string): ModuleMetadata | undefined => {
  return TRAINING_MODULES[moduleId];
};

export const getModuleOrder = (): string[] => {
  return Object.keys(TRAINING_MODULES);
};


export const getEstimatedDuration = (): string => {
  const totalMinutes = Object.values(TRAINING_MODULES).reduce((total, module) => {
    const range = module.duration.match(/(\d+)-(\d+)/);
    if (range) {
      const avg = (parseInt(range[1]) + parseInt(range[2])) / 2;
      return total + avg;
    }
    return total;
  }, 0);
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} minutes`;
};