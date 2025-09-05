/**
 * Animation Optimizer for Clinical Environments
 * Optimizes animations for 60fps therapeutic standards with clinical considerations
 */

import { luxuryPerformance } from './luxuryPerformance';
// import { validateClinicalMotion, therapeuticMotionPresets, createAccessibleMotion } from './luxuryPerformance';

// Animation performance targets for clinical environments
export const CLINICAL_ANIMATION_TARGETS = {
  targetFPS: 60,
  maxFrameTime: 16.67, // ms for 60fps
  maxAnimationDuration: 300, // ms for therapeutic calm
  maxSimultaneousAnimations: 3, // Prevent overwhelming patients
  gpuAccelerationThreshold: 2, // Enable GPU acceleration for 2+ properties
  motionSensitivityThreshold: 0.2, // Respect reduced motion preferences
};

// Animation queue for managing simultaneous animations
class AnimationQueue {
  private queue: Array<{
    id: string;
    element: HTMLElement;
    animation: () => void;
    priority: 'critical' | 'high' | 'normal' | 'low';
    duration: number;
    startTime: number;
  }> = [];
  
  private running = new Set<string>();
  private maxConcurrent = CLINICAL_ANIMATION_TARGETS.maxSimultaneousAnimations;

  add(animation: {
    id: string;
    element: HTMLElement;
    animation: () => void;
    priority?: 'critical' | 'high' | 'normal' | 'low';
    duration?: number;
  }) {
    const item = {
      ...animation,
      priority: animation.priority || 'normal',
      duration: animation.duration || 300,
      startTime: 0
    };

    // Remove any existing animation with the same ID
    this.remove(animation.id);
    
    // Insert based on priority
    const priorityOrder = { critical: 0, high: 1, normal: 2, low: 3 };
    const insertIndex = this.queue.findIndex(
      item => priorityOrder[item.priority] > priorityOrder[animation.priority || 'normal']
    );
    
    if (insertIndex === -1) {
      this.queue.push(item);
    } else {
      this.queue.splice(insertIndex, 0, item);
    }

    this.processQueue();
  }

  remove(id: string) {
    this.queue = this.queue.filter(item => item.id !== id);
    this.running.delete(id);
  }

  private processQueue() {
    // Start animations if we have capacity
    while (this.running.size < this.maxConcurrent && this.queue.length > 0) {
      const item = this.queue.shift()!;
      this.running.add(item.id);
      item.startTime = performance.now();

      // Execute animation with performance tracking
      try {
        item.animation();
        
        // Remove from running after duration
        setTimeout(() => {
          this.running.delete(item.id);
          this.processQueue(); // Process more items
        }, item.duration);
        
      } catch (error) {
        console.error(`Animation ${item.id} failed:`, error);
        this.running.delete(item.id);
        this.processQueue();
      }
    }
  }

  getStats() {
    return {
      queued: this.queue.length,
      running: this.running.size,
      capacity: this.maxConcurrent
    };
  }

  clear() {
    this.queue = [];
    this.running.clear();
  }
}

// Global animation queue instance
const animationQueue = new AnimationQueue();

// Clinical animation optimizer
export class ClinicalAnimationOptimizer {
  private performanceMonitor = luxuryPerformance;
  private prefersReducedMotion = false;
  private deviceCapabilities: {
    deviceMemory: number;
    hardwareConcurrency: number;
    connection: string;
  };

  constructor() {
    // Detect motion preferences
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Listen for changes in motion preferences
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
    });

    // Detect device capabilities
    this.deviceCapabilities = {
      deviceMemory: (navigator as any).deviceMemory || 4,
      hardwareConcurrency: navigator.hardwareConcurrency || 4,
      connection: (navigator as any).connection?.effectiveType || '4g'
    };
  }

  // Optimize animation based on clinical standards and device capabilities
  optimizeAnimation(config: {
    element: HTMLElement;
    properties: Record<string, any>;
    duration?: number;
    easing?: string;
    context?: 'therapeutic' | 'ui' | 'feedback';
    patientSensitivity?: 'low' | 'medium' | 'high';
    priority?: 'critical' | 'high' | 'normal' | 'low';
    id?: string;
  }): {
    optimizedConfig: any;
    shouldAnimate: boolean;
    warnings: string[];
    recommendations: string[];
  } {
    const {
      element,
      properties,
      duration = 300,
      easing = 'ease-out',
      context = 'ui',
      patientSensitivity = 'medium',
      priority = 'normal',
      id = `anim_${Date.now()}_${Math.random()}`
    } = config;

    const warnings: string[] = [];
    const recommendations: string[] = [];
    let shouldAnimate = true;
    let optimizedDuration = duration;
    let optimizedEasing = easing;
    let optimizedProperties = { ...properties };

    // Check motion preferences
    if (this.prefersReducedMotion) {
      if (context === 'therapeutic' || priority === 'critical') {
        // Allow critical therapeutic animations even with reduced motion
        optimizedDuration = Math.min(duration, 150);
        warnings.push('Reduced motion preference detected, shortening animation');
      } else {
        shouldAnimate = false;
        recommendations.push('Consider instant state changes for non-critical animations');
        return { optimizedConfig: null, shouldAnimate, warnings, recommendations };
      }
    }

    // Validate clinical motion standards
    // const validation = validateClinicalMotion(
    //   id,
    //   optimizedDuration,
    //   Object.keys(properties),
    //   { context, patientSensitivity, easing }
    // );

    // warnings.push(...validation.warnings);
    // recommendations.push(...validation.recommendations);

    // if (!validation.isValid && validation.severity === 'high') {
    //   shouldAnimate = false;
    //   return { optimizedConfig: null, shouldAnimate, warnings, recommendations };
    // }

    // Device-based optimizations
    if (this.deviceCapabilities.deviceMemory < 2) {
      optimizedDuration = Math.min(optimizedDuration, 200);
      warnings.push('Low memory device detected, reducing animation complexity');
    }

    if (this.deviceCapabilities.connection === 'slow-2g' || this.deviceCapabilities.connection === '2g') {
      optimizedDuration = Math.min(optimizedDuration, 150);
      warnings.push('Slow connection detected, shortening animations');
    }

    // Optimize properties for performance
    optimizedProperties = this.optimizeProperties(optimizedProperties, warnings, recommendations);

    // Apply clinical easing if not specified
    if (context === 'therapeutic' && easing === 'ease-out') {
      optimizedEasing = 'cubic-bezier(0.4, 0, 0.2, 1)'; // Therapeutic calming curve
    }

    const optimizedConfig = {
      element,
      properties: optimizedProperties,
      duration: optimizedDuration,
      easing: optimizedEasing,
      context,
      patientSensitivity,
      priority,
      id
    };

    return { optimizedConfig, shouldAnimate, warnings, recommendations };
  }

  // Optimize animation properties for performance
  private optimizeProperties(properties: Record<string, any>, warnings: string[], recommendations: string[]) {
    const optimized = { ...properties };
    const performantProps = ['transform', 'opacity', 'filter'];
    const expensiveProps = ['width', 'height', 'top', 'left', 'margin', 'padding'];

    // Check for expensive properties
    Object.keys(properties).forEach(prop => {
      if (expensiveProps.includes(prop)) {
        warnings.push(`Property '${prop}' may cause layout thrashing`);
        recommendations.push(`Use 'transform: scale()' or 'transform: translate()' instead of '${prop}'`);
        
        // Auto-convert common expensive properties
        if (prop === 'width' && typeof properties[prop] === 'string') {
          const match = properties[prop].match(/scale\((\d*\.?\d+)\)/);
          if (match) {
            delete optimized[prop];
            optimized.transform = (optimized.transform || '') + ` scaleX(${match[1]})`;
          }
        }
      }
    });

    // Ensure GPU acceleration for multiple properties
    const animatedProps = Object.keys(optimized);
    if (animatedProps.length >= CLINICAL_ANIMATION_TARGETS.gpuAccelerationThreshold) {
      if (!optimized.transform && !animatedProps.includes('transform')) {
        optimized.willChange = animatedProps.filter(prop => performantProps.includes(prop)).join(', ');
        recommendations.push('GPU acceleration enabled for multi-property animation');
      }
    }

    return optimized;
  }

  // Execute optimized animation
  executeAnimation(config: any): Promise<void> {
    return new Promise((resolve, _reject) => {
      if (!config) {
        resolve();
        return;
      }

      const { element, properties, duration, easing, id, priority } = config;
      const startTime = performance.now();

      // Add to animation queue
      animationQueue.add({
        id,
        element,
        priority,
        duration,
        animation: () => {
          // Apply optimized properties
          Object.entries(properties).forEach(([prop, value]) => {
            if (prop === 'transform') {
              element.style.transform = value as string;
            } else if (prop === 'opacity') {
              element.style.opacity = String(value);
            } else if (prop === 'willChange') {
              element.style.willChange = value as string;
            } else {
              (element.style as any)[prop] = value;
            }
          });

          // Apply transition
          element.style.transition = `all ${duration}ms ${easing}`;

          // Track performance
          const endTime = performance.now();
          this.performanceMonitor.trackAnimation(id, startTime, endTime);

          // Clean up after animation
          setTimeout(() => {
            if (properties.willChange) {
              element.style.willChange = 'auto';
            }
            resolve();
          }, duration);
        }
      });
    });
  }

  // Batch animation optimizer for multiple elements
  optimizeBatchAnimation(configs: Array<Parameters<typeof this.optimizeAnimation>[0]>): {
    optimizedConfigs: any[];
    totalWarnings: string[];
    batchRecommendations: string[];
  } {
    const optimizedConfigs: any[] = [];
    const totalWarnings: string[] = [];
    const batchRecommendations: string[] = [];

    // Check batch size for clinical environments
    if (configs.length > CLINICAL_ANIMATION_TARGETS.maxSimultaneousAnimations) {
      batchRecommendations.push(
        `Batch size (${configs.length}) exceeds clinical recommendation (${CLINICAL_ANIMATION_TARGETS.maxSimultaneousAnimations}). Consider staggering animations.`
      );
    }

    configs.forEach((config, index) => {
      const result = this.optimizeAnimation({
        ...config,
        id: config.id || `batch_${Date.now()}_${index}`
      });

      if (result.shouldAnimate && result.optimizedConfig) {
        optimizedConfigs.push(result.optimizedConfig);
      }

      totalWarnings.push(...result.warnings);
      batchRecommendations.push(...result.recommendations);
    });

    return {
      optimizedConfigs,
      totalWarnings: [...new Set(totalWarnings)],
      batchRecommendations: [...new Set(batchRecommendations)]
    };
  }

  // Execute batch animation with staggering
  async executeBatchAnimation(configs: any[], staggerDelay: number = 50): Promise<void> {
    const promises: Promise<void>[] = [];

    configs.forEach((config, index) => {
      const delayedExecution = new Promise<void>((resolve) => {
        setTimeout(async () => {
          await this.executeAnimation(config);
          resolve();
        }, index * staggerDelay);
      });

      promises.push(delayedExecution);
    });

    await Promise.all(promises);
  }

  // Get animation performance report
  getPerformanceReport(): string {
    const queueStats = animationQueue.getStats();
    const performanceStats = this.performanceMonitor.getStats();
    
    return [
      '🎬 Animation Performance Report',
      '=' .repeat(35),
      '',
      `📊 Animation Queue:`,
      `  Queued: ${queueStats.queued}`,
      `  Running: ${queueStats.running}/${queueStats.capacity}`,
      '',
      `⚡ Device Capabilities:`,
      `  Memory: ${this.deviceCapabilities.deviceMemory}GB`,
      `  CPU Cores: ${this.deviceCapabilities.hardwareConcurrency}`,
      `  Connection: ${this.deviceCapabilities.connection}`,
      '',
      `🏥 Clinical Settings:`,
      `  Reduced Motion: ${this.prefersReducedMotion ? 'Yes' : 'No'}`,
      `  Target FPS: ${CLINICAL_ANIMATION_TARGETS.targetFPS}`,
      `  Max Duration: ${CLINICAL_ANIMATION_TARGETS.maxAnimationDuration}ms`,
      '',
      performanceStats ? `📈 Recent Performance: ${JSON.stringify(performanceStats.frameTimingStats, null, 2)}` : '📈 No performance data available'
    ].join('\\n');
  }
}

// Therapeutic animation presets with optimization
export const optimizedTherapeuticAnimations = {
  gentleFadeIn: (element: HTMLElement, duration: number = 200) => ({
    element,
    properties: { opacity: 1 },
    duration,
    easing: 'ease-out',
    context: 'therapeutic' as const,
    patientSensitivity: 'medium' as const
  }),

  calmSlideIn: (element: HTMLElement, direction: 'up' | 'down' | 'left' | 'right' = 'up', duration: number = 250) => {
    const transforms = {
      up: 'translateY(0)',
      down: 'translateY(0)',
      left: 'translateX(0)',
      right: 'translateX(0)'
    };

    return {
      element,
      properties: { 
        transform: transforms[direction],
        opacity: 1
      },
      duration,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      context: 'therapeutic' as const,
      patientSensitivity: 'medium' as const
    };
  },

  therapeuticPulse: (element: HTMLElement, duration: number = 150) => ({
    element,
    properties: { 
      transform: 'scale(1.02)',
      opacity: 1
    },
    duration,
    easing: 'ease-in-out',
    context: 'feedback' as const,
    patientSensitivity: 'low' as const
  }),

  instantResponse: (element: HTMLElement) => ({
    element,
    properties: { opacity: 1 },
    duration: 0,
    easing: 'linear',
    context: 'therapeutic' as const,
    patientSensitivity: 'high' as const,
    priority: 'critical' as const
  })
};

// Export default optimizer instance
export const clinicalAnimationOptimizer = new ClinicalAnimationOptimizer();

// Utility functions for easy integration
export const animateTherapeutically = async (
  element: HTMLElement,
  properties: Record<string, any>,
  options: {
    duration?: number;
    context?: 'therapeutic' | 'ui' | 'feedback';
    patientSensitivity?: 'low' | 'medium' | 'high';
    priority?: 'critical' | 'high' | 'normal' | 'low';
  } = {}
) => {
  const result = clinicalAnimationOptimizer.optimizeAnimation({
    element,
    properties,
    ...options
  });

  if (result.shouldAnimate && result.optimizedConfig) {
    await clinicalAnimationOptimizer.executeAnimation(result.optimizedConfig);
  }

  return result;
};

// Batch animation utility
export const animateBatchTherapeutically = async (
  animations: Array<{
    element: HTMLElement;
    properties: Record<string, any>;
    options?: Parameters<typeof animateTherapeutically>[2];
  }>,
  staggerDelay: number = 50
) => {
  const configs = animations.map(({ element, properties, options }) => ({
    element,
    properties,
    ...options
  }));

  const batchResult = clinicalAnimationOptimizer.optimizeBatchAnimation(configs);
  
  if (batchResult.optimizedConfigs.length > 0) {
    await clinicalAnimationOptimizer.executeBatchAnimation(
      batchResult.optimizedConfigs,
      staggerDelay
    );
  }

  return batchResult;
};

// Performance monitoring integration
if (typeof window !== 'undefined') {
  (window as any).clinicalAnimationOptimizer = clinicalAnimationOptimizer;
  (window as any).animationQueue = animationQueue;
  
  if (process.env.NODE_ENV === 'development') {
    console.log('🎬 Clinical Animation Optimizer initialized');
    console.log('Available: clinicalAnimationOptimizer, animationQueue, animateTherapeutically');
  }
}