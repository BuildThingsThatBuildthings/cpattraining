// Comprehensive TypeScript definitions for CPAT Training Platform
// This file provides all type definitions to eliminate 'any' types

import { ReactNode } from 'react';

// =============================================================================
// Training Module Types
// =============================================================================

export interface TrainingModuleInteractiveElement {
  type: 'quiz' | 'scenario' | 'reflection' | 'practice';
  data: Record<string, unknown>;
}

export interface TrainingModuleSection {
  id: string;
  title: string;
  content: string;
  interactiveElements?: TrainingModuleInteractiveElement[];
}

export interface TrainingModuleQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'scenario';
  options?: string[];
  correct: string | string[];
  explanation: string;
}

export interface TrainingModuleAssessment {
  questions: TrainingModuleQuestion[];
  passingScore: number;
}

export interface TrainingModuleContent {
  sections: TrainingModuleSection[];
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  learningObjectives: string[];
  prerequisites: string[];
  content: TrainingModuleContent;
  assessment?: TrainingModuleAssessment;
}

// =============================================================================
// Progress Tracking Types
// =============================================================================

export interface SafetyAcknowledgment {
  acknowledged: boolean;
  timestamp: string;
  version: string;
  userAgent: string;
  ipAddress?: string;
}

export interface ModuleProgress {
  completed: boolean;
  completedAt: Date | null;
  timeSpent: number;
  score?: number;
  attempts: number;
}

export interface TrainingProgress {
  journeyStarted: boolean;
  safetyAcknowledged: SafetyAcknowledgment | null;
  completedModules: string[];
  currentModule: string | null;
  quizScores: Record<string, number>;
  certificateEligible: boolean;
  lastAccessed: string;
  moduleProgress: Record<string, ModuleProgress>;
  certificateEarned: boolean;
  certificateDate: Date | null;
}

// =============================================================================
// Accessibility Types
// =============================================================================

export interface ColorContrastTest {
  name: string;
  foreground: string;
  background: string;
  ratio: string;
  level: 'AAA' | 'AA' | 'FAIL';
  AA: boolean;
}

export interface AccessibilityReport {
  focusableElements: number;
  ariaLabels: number;
  headingStructure: string[];
  colorContrast: ColorContrastTest[];
  issues: string[];
  recommendations: string[];
}

// =============================================================================
// Whimsical Interaction Types
// =============================================================================

export interface WhimsicalOptions {
  count?: number;
  duration?: number;
  colors?: string[];
  showConfetti?: boolean;
  showShimmer?: boolean;
  position?: 'top' | 'bottom';
}

export interface WhimsicalProps {
  whimsical?: boolean;
  celebration?: boolean;
  breathing?: boolean;
  stackEffect?: boolean;
}

export type TherapeuticGlyphType = 'healing' | 'growth' | 'balance';
export type TherapeuticState = 'loading' | 'success' | 'error';
export type CelebrationType = 'step' | 'module' | 'achievement';

// =============================================================================
// Component Props Types
// =============================================================================

export interface TherapeuticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'champagne' | 'luxury';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  whimsical?: boolean;
  celebration?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface TherapeuticCardProps {
  children: ReactNode;
  variant?: 'default' | 'luxury' | 'pearl' | 'sage';
  whimsical?: boolean;
  breathing?: boolean;
  stackEffect?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface TherapeuticNotificationProps {
  type?: 'success' | 'info' | 'warning' | 'gentle';
  title?: string;
  message: string;
  duration?: number;
  onClose?: () => void;
  showIcon?: boolean;
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
}

export interface TherapeuticProgressProps {
  value: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
  variant?: 'circular' | 'linear';
  showLabel?: boolean;
  label?: string;
  color?: string;
  whimsical?: boolean;
}

// =============================================================================
// Event Handler Types
// =============================================================================

export type ClickEventHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type ChangeEventHandler<T = HTMLInputElement> = (event: React.ChangeEvent<T>) => void;
export type FocusEventHandler<T = HTMLElement> = (event: React.FocusEvent<T>) => void;

// =============================================================================
// Utility Types
// =============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredNonNull<T> = { [P in keyof T]-?: NonNullable<T[P]> };

// =============================================================================
// CPAT Scenario Types
// =============================================================================

export interface CPATScenarioChoice {
  id: string;
  text: string;
  cpatResponse: string;
  explanation: string;
  isOptimal: boolean;
}

export interface CPATScenario {
  id: string;
  title: string;
  description: string;
  context: string;
  patientStatement: string;
  choices: CPATScenarioChoice[];
  learningObjectives: string[];
  category: 'depression' | 'anxiety' | 'trauma' | 'addiction' | 'grief' | 'relationship';
}

// =============================================================================
// Form Validation Types
// =============================================================================

export interface ValidationRule<T = unknown> {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | null;
}

export interface FormField<T = string> {
  value: T;
  error?: string;
  touched?: boolean;
  rules?: ValidationRule<T>;
}

export interface FormState<T extends Record<string, unknown>> {
  fields: { [K in keyof T]: FormField<T[K]> };
  isValid: boolean;
  isSubmitting: boolean;
  submitCount: number;
}

// =============================================================================
// Error Boundary Types
// =============================================================================

export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
  errorBoundaryStack?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
}

// =============================================================================
// Performance Monitoring Types
// =============================================================================

export interface PerformanceMetrics {
  renderTime: number;
  componentCount: number;
  memoryUsage?: number;
  bundleSize?: number;
}

export interface ComponentPerformanceData {
  componentName: string;
  renderCount: number;
  averageRenderTime: number;
  lastRenderTime: number;
  propsChanges: number;
}