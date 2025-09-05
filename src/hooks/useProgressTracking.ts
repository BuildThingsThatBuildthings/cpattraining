import { useState, useEffect, useCallback } from 'react';
// import { ModuleProgress } from '../types';

export interface SafetyAcknowledgment {
  acknowledged: boolean;
  timestamp: string;
  version: string;
  userAgent: string;
  ipAddress?: string;
}

export interface ModuleMetadata {
  id: string;
  title: string;
  duration: string;
  outcomes: string[];
  safetyFlags: string[];
  prerequisites: string[];
}

export interface TrainingProgress {
  journeyStarted: boolean;
  safetyAcknowledged: SafetyAcknowledgment | null;
  completedModules: string[];
  currentModule: string | null;
  quizScores: Record<string, number>;
  certificateEligible: boolean;
  lastAccessed: string;
  moduleProgress: Record<string, {
    completed: boolean;
    completedAt: Date | null;
    timeSpent: number;
    score?: number;
    attempts: number;
  }>;
  certificateEarned: boolean;
  certificateDate: Date | null;
}

const STORAGE_KEY = 'cpat_training_progress';

const SAFETY_CONTENT_VERSION = '2024.1.0';

const defaultProgress: TrainingProgress = {
  journeyStarted: false,
  safetyAcknowledged: null,
  completedModules: [],
  currentModule: null,
  quizScores: {},
  certificateEligible: false,
  lastAccessed: new Date().toISOString(),
  moduleProgress: {},
  certificateEarned: false,
  certificateDate: null,
};

export const useProgressTracking = () => {
  const [progress, setProgress] = useState<TrainingProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...defaultProgress,
          ...parsed,
          completedModules: parsed.completedModules || [],
          certificateDate: parsed.certificateDate ? new Date(parsed.certificateDate) : null,
          moduleProgress: Object.fromEntries(
            Object.entries(parsed.moduleProgress || {}).map(([key, value]: [string, any]) => [
              key,
              {
                ...value,
                completedAt: value.completedAt ? new Date(value.completedAt) : null,
              }
            ])
          ),
        };
      }
    } catch (error) {
      console.warn('Failed to load progress from localStorage:', error);
    }
    return defaultProgress;
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      const toStore = {
        ...progress,
        lastAccessed: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch (error) {
      console.warn('Failed to save progress to localStorage:', error);
    }
  }, [progress]);

  const startJourney = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      journeyStarted: true,
    }));
  }, []);

  const acknowledgeSafety = useCallback(() => {
    const acknowledgment: SafetyAcknowledgment = {
      acknowledged: true,
      timestamp: new Date().toISOString(),
      version: SAFETY_CONTENT_VERSION,
      userAgent: navigator.userAgent,
    };

    setProgress(prev => ({
      ...prev,
      safetyAcknowledged: acknowledgment,
    }));
  }, []);

  const startModule = useCallback((moduleId: string) => {
    setProgress(prev => ({
      ...prev,
      currentModule: moduleId,
      moduleProgress: {
        ...prev.moduleProgress,
        [moduleId]: {
          ...prev.moduleProgress[moduleId],
          completed: false,
          completedAt: null,
          timeSpent: 0,
          attempts: (prev.moduleProgress[moduleId]?.attempts || 0) + 1,
        },
      },
    }));
  }, []);

  const completeModule = useCallback((moduleId: string, score?: number) => {
    setProgress(prev => {
      const newCompletedModules = [...prev.completedModules];
      if (!newCompletedModules.includes(moduleId)) {
        newCompletedModules.push(moduleId);
      }
      
      const newProgress = {
        ...prev,
        completedModules: newCompletedModules,
        currentModule: null,
        quizScores: score ? { ...prev.quizScores, [moduleId]: score } : prev.quizScores,
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: {
            ...prev.moduleProgress[moduleId],
            completed: true,
            completedAt: new Date(),
            score,
          },
        },
      };

      // Check certificate eligibility
      const totalModules = 6;
      newProgress.certificateEligible = newCompletedModules.length >= totalModules;

      return newProgress;
    });
  }, []);

  const updateModuleTime = useCallback((moduleId: string, additionalTime: number) => {
    setProgress(prev => ({
      ...prev,
      moduleProgress: {
        ...prev.moduleProgress,
        [moduleId]: {
          ...prev.moduleProgress[moduleId],
          timeSpent: (prev.moduleProgress[moduleId]?.timeSpent || 0) + additionalTime,
        },
      },
    }));
  }, []);

  const earnCertificate = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      certificateEarned: true,
      certificateDate: new Date(),
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getOverallProgress = useCallback(() => {
    const totalModules = 6;
    const completedCount = progress.completedModules.length;
    return Math.round((completedCount / totalModules) * 100);
  }, [progress.completedModules.length]);

  const isModuleAccessible = useCallback((_requiredModuleId: string, requiredModules: string[] = []) => {
    if (!progress.safetyAcknowledged?.acknowledged) return false;
    return requiredModules.every(reqId => progress.completedModules.includes(reqId));
  }, [progress.safetyAcknowledged, progress.completedModules]);

  const isSafetyAcknowledged = useCallback(() => {
    return !!progress.safetyAcknowledged?.acknowledged;
  }, [progress.safetyAcknowledged]);

  const getNextModule = useCallback(() => {
    const moduleOrder = [
      '01-light-color-fundamentals',
      '02-therapeutic-mechanisms',
      '03-clinical-applications',
      '04-safety-protocols',
      '05-patient-assessment',
      '06-practical-implementation'
    ];

    for (const moduleId of moduleOrder) {
      if (!progress.completedModules.includes(moduleId)) {
        return moduleId;
      }
    }
    return null;
  }, [progress.completedModules]);

  return {
    progress,
    startJourney,
    acknowledgeSafety,
    startModule,
    completeModule,
    updateModuleTime,
    earnCertificate,
    resetProgress,
    getOverallProgress,
    isModuleAccessible,
    isSafetyAcknowledged,
    getNextModule,
  };
};