import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressTracking } from '../../hooks/useProgressTracking';
import { TRAINING_MODULES, getModuleMetadata } from '../../data/modules';
import Hero from '../../components/core/Hero';
import ProgressStepper from '../../components/core/ProgressStepper';
import TherapeuticCard from '../../components/luxury/TherapeuticCard';
import TherapeuticButton from '../../components/luxury/TherapeuticButton';
import { SafetyCallout } from '../../components/core/ClinicalCallout';
import { 
  announceToScreenReader, 
  FocusManager 
} from '../../utils/accessibility';
import { Clock, Award, BookOpen, Play, CheckCircle, Lock } from 'lucide-react';

const TrainingJourney = () => {
  const navigate = useNavigate();
  const { progress, isModuleAccessible, isSafetyAcknowledged, getOverallProgress, getNextModule } = useProgressTracking();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  // Suppress unused variable warnings - will be used in future iterations
  void selectedModule;
  void setSelectedModule;
  
  const overallProgress = getOverallProgress();
  const nextModule = getNextModule();

  useEffect(() => {
    // Redirect if safety not acknowledged
    if (!isSafetyAcknowledged()) {
      navigate('/training/safety');
      return;
    }
    
    // Announce page load
    announceToScreenReader(`Training Journey loaded. Overall progress: ${overallProgress}%. Navigate with Tab key.`, 'polite');
  }, [isSafetyAcknowledged, navigate, overallProgress]);

  const getModuleStatus = (moduleId: string): 'completed' | 'current' | 'upcoming' | 'locked' => {
    if (progress.completedModules.includes(moduleId)) return 'completed';
    if (progress.currentModule === moduleId) return 'current';
    
    const metadata = getModuleMetadata(moduleId);
    if (!metadata) return 'locked';
    
    if (isModuleAccessible(moduleId, metadata.prerequisites)) return 'upcoming';
    return 'locked';
  };

  const handleModuleClick = (moduleId: string) => {
    const status = getModuleStatus(moduleId);
    if (status === 'upcoming' || status === 'current' || status === 'completed') {
      FocusManager.saveFocus();
      navigate(`/training/module/${moduleId}`);
    } else {
      announceToScreenReader('This module is locked. Complete prerequisite modules first.', 'assertive');
    }
  };

  const handleCertificateClick = () => {
    FocusManager.saveFocus();
    navigate('/training/certificate');
  };

  const handleStartNextModule = () => {
    if (nextModule) {
      FocusManager.saveFocus();
      announceToScreenReader(`Starting ${getModuleMetadata(nextModule)?.title}`, 'assertive');
      navigate(`/training/module/${nextModule}`);
    }
  };

  // Create stepper data from modules
  const stepperData = Object.values(TRAINING_MODULES).map((module, index) => ({
    id: module.id,
    title: module.title,
    description: module.duration,
    status: getModuleStatus(module.id),
    duration: module.duration,
    index
  }));

  const canEarnCertificate = progress.certificateEligible && progress.completedModules.length >= Object.keys(TRAINING_MODULES).length;

  // Show hero for first time visitors
  const showHero = progress.completedModules.length === 0 && !progress.currentModule;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--surface-primary)' }}>
      {/* Hero Section for New Learners */}
      {showHero && (
        <Hero
          title="Your CPAT Training Journey"
          subtitle="Master Color Light Aromatherapy Sound Positive Affirmation Therapy through our evidence-based curriculum"
          proofPoints={[
            `${Object.keys(TRAINING_MODULES).length} Comprehensive Modules`,
            `${Object.keys(TRAINING_MODULES).length} Modules Available`,
            "Professional Certification Pathway"
          ]}
          ctaText="Start Module 1"
          ctaSecondaryText="View All Modules"
          onPrimaryAction={() => navigate('/training/module/01-light-color-fundamentals')}
          onSecondaryAction={() => {
            const content = document.getElementById('modules-overview');
            content?.scrollIntoView({ behavior: 'smooth' });
          }}
          variant="clinical"
        />
      )}

      <div className="container mx-auto px-4 py-12 max-w-7xl" id="modules-overview">
        {!showHero && (
          <div className="text-center mb-12">
            <h1 className="h1-hero mb-6" style={{ color: 'var(--text-primary)' }}>
              Your CPAT Training Journey
            </h1>
            
            <p className="p-lead text-center max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
              Track your progress through comprehensive CPAT professional training
            </p>

            {/* Overall Progress Card */}
            <TherapeuticCard className="max-w-3xl mx-auto mb-12">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Overall Progress</h2>
                  <span className="text-3xl font-bold text-sage-600">{overallProgress}%</span>
                </div>
                
                <div className="mb-6">
                  <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-sage-600 to-sage-500 transition-all duration-1000 ease-out rounded-full"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-sage-600 mb-1">
                      {progress.completedModules.length}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Modules Completed
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-champagne-600 mb-1">
                      {Object.values(progress.quizScores).reduce((sum, score) => sum + score, 0) / Object.keys(progress.quizScores).length || 0}%
                    </div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Average Quiz Score
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {progress.completedModules.length}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Modules Completed
                    </div>
                  </div>
                </div>

                {/* Next Action */}
                {nextModule && (
                  <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                          Continue Learning
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {getModuleMetadata(nextModule)?.title}
                        </p>
                      </div>
                      <TherapeuticButton
                        onClick={handleStartNextModule}
                        variant="primary"
                        size="large"
                        whimsical
                      >
                        <span className="flex items-center gap-2">
                          <Play size={16} />
                          <span>Continue</span>
                        </span>
                      </TherapeuticButton>
                    </div>
                  </div>
                )}
              </div>
            </TherapeuticCard>
          </div>
        )}

        {/* Progress Stepper */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Training Pathway
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Follow the sequential learning path through CPAT methodology
            </p>
          </div>
          
          <ProgressStepper
            steps={stepperData}
            currentStep={stepperData.findIndex(step => step.status === 'current')}
            onStepClick={(_, stepId) => handleModuleClick(stepId)}
            variant="vertical"
            size="large"
            showDescription={true}
            className="max-w-4xl mx-auto"
          />
        </div>

        {/* Detailed Module Cards */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Training Modules
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Comprehensive curriculum designed for clinical excellence
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {Object.values(TRAINING_MODULES).map((module) => {
              const status = getModuleStatus(module.id);
              const moduleProgress = progress.moduleProgress[module.id];
              const isAccessible = status !== 'locked';
              
              return (
                <div key={module.id} className={`group ${!isAccessible ? 'opacity-60' : ''}`}>
                  <TherapeuticCard className={`h-full transition-all duration-300 ${isAccessible ? 'hover:shadow-xl cursor-pointer' : 'cursor-not-allowed'}`}>
                    <div 
                      className="p-6 h-full flex flex-col"
                      onClick={() => isAccessible && handleModuleClick(module.id)}
                      role="button"
                      tabIndex={isAccessible ? 0 : -1}
                      aria-label={`${module.title} module, ${status}`}
                    >
                      {/* Module Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                            status === 'completed' ? 'bg-green-600' :
                            status === 'current' ? 'bg-sage-600' :
                            status === 'upcoming' ? 'bg-blue-600' : 'bg-gray-600'
                          }`}>
                            {status === 'completed' ? (
                              <CheckCircle size={24} className="text-white" />
                            ) : status === 'locked' ? (
                              <Lock size={24} className="text-white" />
                            ) : (
                              <BookOpen size={24} className="text-white" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                              {module.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {module.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Award size={14} />
                                {module.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Status Badge */}
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          status === 'completed' ? 'bg-green-100 text-green-800' :
                          status === 'current' ? 'bg-sage-100 text-sage-800' :
                          status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {status === 'completed' ? 'Completed' :
                           status === 'current' ? 'In Progress' :
                           status === 'upcoming' ? 'Available' : 'Locked'}
                        </div>
                      </div>

                      {/* Learning Outcomes */}
                      <div className="flex-1 mb-6">
                        <h4 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                          Learning Outcomes
                        </h4>
                        <ul className="space-y-2">
                          {module.outcomes.map((outcome, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                              <span className="text-sage-600 mt-1">•</span>
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Progress Bar for In-Progress Modules */}
                      {moduleProgress && status !== 'completed' && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Progress</span>
                            <span className="text-sm font-medium text-sage-600">
                              {Math.round((moduleProgress.timeSpent / 300) * 100)}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-full bg-sage-600 rounded-full transition-all duration-300"
                              style={{ width: `${Math.round((moduleProgress.timeSpent / 300) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <div className="mt-auto">
                        {status === 'completed' ? (
                          <TherapeuticButton
                            variant="secondary"
                            size="small"
                            className="w-full"
                            onClick={() => {
                              handleModuleClick(module.id);
                            }}
                          >
                            Review Module
                          </TherapeuticButton>
                        ) : status === 'current' ? (
                          <TherapeuticButton
                            variant="primary"
                            size="small"
                            className="w-full"
                            onClick={() => {
                              handleModuleClick(module.id);
                            }}
                            whimsical
                          >
                            Continue Learning
                          </TherapeuticButton>
                        ) : status === 'upcoming' ? (
                          <TherapeuticButton
                            variant="primary"
                            size="small"
                            className="w-full"
                            onClick={() => {
                              handleModuleClick(module.id);
                            }}
                          >
                            Start Module
                          </TherapeuticButton>
                        ) : (
                          <div className="w-full py-2 px-4 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg text-center">
                            Complete Prerequisites
                          </div>
                        )}
                      </div>
                    </div>
                  </TherapeuticCard>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certificate Section */}
        <div className={`text-center rounded-2xl p-8 mb-8 border backdrop-blur-sm ${
          canEarnCertificate 
            ? 'bg-gradient-to-br from-champagne-600/10 to-sage-600/10 border-champagne-600/30' 
            : 'bg-slate-800/10 border-slate-300/30'
        }`}>
          <div className="text-6xl mb-6">
            {canEarnCertificate ? '🎓' : '🎯'}
          </div>
          
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            CPAT Professional Certification
          </h2>
          
          {canEarnCertificate ? (
            <div>
              <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Congratulations! You've completed all training modules and are eligible for certification.
              </p>
              
              <TherapeuticButton
                onClick={handleCertificateClick}
                variant="champagne"
                size="large"
                whimsical
                celebration
              >
                <span className="flex items-center gap-2">
                  <Award size={20} />
                  <span>Claim Your Certificate</span>
                </span>
              </TherapeuticButton>
              
              <div className="mt-6 grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="font-bold text-sage-600 text-xl">{Object.keys(TRAINING_MODULES).length}</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Duration</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-champagne-600 text-xl">{progress.completedModules.length}</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Modules Completed</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600 text-xl">Professional</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Certification</div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-lg mb-6 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Complete all {Object.keys(TRAINING_MODULES).length} training modules to earn your professional certification.
              </p>
              
              <div className="text-sm bg-slate-100 rounded-lg p-4 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Progress: {progress.completedModules.length} of {Object.keys(TRAINING_MODULES).length} modules completed
              </div>
            </div>
          )}
        </div>

        {/* Learning Support */}
        <div className="max-w-4xl mx-auto">
          <SafetyCallout 
            title="Learning Support & Clinical Guidance"
            variant="subtle"
          >
            <div className="space-y-3">
              <p>Need help with your CPAT training journey?</p>
              <ul className="space-y-2 text-sm">
                <li>• Complete modules sequentially for optimal learning</li>
                <li>• Review safety guidelines throughout your training</li>
                <li>• Take your time with clinical concepts and applications</li>
                <li>• Contact support for technical or clinical questions</li>
              </ul>
            </div>
          </SafetyCallout>
        </div>
      </div>
    </div>
  );
};

export default TrainingJourney;