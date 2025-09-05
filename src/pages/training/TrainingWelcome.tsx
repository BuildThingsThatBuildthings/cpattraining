import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressTracking } from '../../hooks/useProgressTracking';
import { trainingModules } from '../../data/trainingModules';
import TherapeuticButton from '../../components/luxury/TherapeuticButton';
import { 
  announceToScreenReader, 
  handleTherapeuticKeyboardNavigation, 
  FocusManager,
  respectsReducedMotion
} from '../../utils/accessibility';

const TrainingWelcome = () => {
  const navigate = useNavigate();
  const { progress, startJourney, isSafetyAcknowledged } = useProgressTracking();
  const [isAnimating, setIsAnimating] = useState(false);
  const [focusedModuleIndex, setFocusedModuleIndex] = useState<number>(-1);
  const [skipToMain, setSkipToMain] = useState(false);
  // Suppress unused variable warning - will be used for skip links
  void skipToMain;
  const reducedMotion = respectsReducedMotion();

  useEffect(() => {
    // Add entrance animation (respect reduced motion preference)
    if (!reducedMotion) {
      setIsAnimating(true);
    } else {
      setIsAnimating(true); // Still set true but animations are CSS-controlled
    }

    // Announce page load to screen readers
    announceToScreenReader('CPAT Training Welcome page loaded. Navigate with Tab key or use the skip to main content link.', 'polite');
  }, [reducedMotion]);

  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      handleTherapeuticKeyboardNavigation(e, (direction) => {
        if (direction === 'down' && focusedModuleIndex < trainingModules.length - 1) {
          setFocusedModuleIndex(prev => prev + 1);
          announceToScreenReader(`Module ${focusedModuleIndex + 2}: ${trainingModules[focusedModuleIndex + 1]?.title}`);
        } else if (direction === 'up' && focusedModuleIndex > 0) {
          setFocusedModuleIndex(prev => prev - 1);
          announceToScreenReader(`Module ${focusedModuleIndex}: ${trainingModules[focusedModuleIndex - 1]?.title}`);
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusedModuleIndex]);

  const handleStartJourney = () => {
    FocusManager.saveFocus();
    if (!isSafetyAcknowledged()) {
      announceToScreenReader('Starting CPAT training journey. Please review safety guidelines first.', 'assertive');
      navigate('/training/safety');
    } else {
      announceToScreenReader('Continuing CPAT training journey.', 'assertive');
      startJourney();
      navigate('/training/journey');
    }
  };

  const handleContinueJourney = () => {
    FocusManager.saveFocus();
    announceToScreenReader('Continuing CPAT training journey.', 'assertive');
    navigate('/training/journey');
  };

  const handleSkipToMain = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      setSkipToMain(true);
      announceToScreenReader('Skipped to main content area.');
    }
  };

  return (
    <>
      {/* Skip to main content link for screen readers and keyboard users */}
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          handleSkipToMain();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg therapeutic-focus-ring"
        style={{
          backgroundColor: 'var(--sage-primary)',
          color: 'white',
          textDecoration: 'none'
        }}
      >
        Skip to main content
      </a>

      <div className="min-h-screen relative overflow-hidden">
        {/* Soft Rainbow Background */}
        <div className="absolute inset-0 rainbow-cycle-bg"></div>
        {/* Subtle Glass Layer */}
        <div className="absolute inset-0 glass-morphism-ultra-light"></div>
        
        <div className="relative z-10">
          <div className="container mx-auto px-6 py-20" role="banner" aria-label="CPAT Training Welcome">
            <main id="main-content" tabIndex={-1} className="focus:outline-none">
              {/* Cinematic Hero Section */}
              <div className={`text-center mb-24 transform transition-all duration-1000 ${
                isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}>
                {/* Simplified Headlines */}
                <div className="space-y-6 max-w-4xl mx-auto">
                  <h1 className="text-4xl md:text-5xl font-bold text-center leading-tight">
                    <span className="text-white drop-shadow-lg">
                      Welcome to Your CPAT Journey
                    </span>
                  </h1>
                  
                  <p className="text-xl text-center font-light text-slate-200 leading-relaxed max-w-3xl mx-auto">
                    Transform your therapeutic practice with 
                    <span className="text-champagne-400 font-medium">Color Light Aromatherapy Sound</span> 
                    <span className="text-sage-400 font-medium">Positive Affirmation Therapy</span>
                  </p>
                  
                  <p className="text-lg text-center text-slate-300 leading-relaxed max-w-2xl mx-auto">
                    A comprehensive, evidence-based training program for multi-sensory therapeutic integration
                  </p>
                  
                  {/* Simplified Trust Indicators */}
                  <div className="flex justify-center items-center gap-6 pt-6">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-morphism-light">
                      <div className="w-2 h-2 bg-sage-400 rounded-full"></div>
                      <span className="text-sage-300 text-sm font-medium">Evidence-Based</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-morphism-light">
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                      <span className="text-slate-200 text-sm font-medium">Clinically Validated</span>
                    </div>
                  </div>
                </div>
        </div>

              {/* Training Overview */}
              <div className="luxury-card p-8 md:p-12 mb-12">
                <h2 className="text-center mb-12 text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                  Your Learning Journey
                </h2>
            
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {trainingModules.map((module, index) => (
                    <div
                      key={module.id}
                      className={`transform transition-all duration-500 ${
                        isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="luxury-card p-6 h-full group hover:shadow-sage transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 mr-3 flex items-center justify-center rounded-xl" style={{
                            background: 'linear-gradient(135deg, var(--sage-600), var(--champagne-500))',
                            color: 'white'
                          }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                      </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-sage-300 transition-colors duration-300">
                              {module.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <span className="px-2 py-1 bg-sage-700/20 text-sage-400 rounded-lg">
                                {module.difficulty}
                              </span>
                              <span>{module.duration}</span>
                            </div>
                          </div>
                    </div>
                    
                        <p className="text-slate-300 leading-relaxed mb-4 text-sm group-hover:text-slate-200 transition-colors duration-300">
                          {module.description}
                        </p>
                    
                        <div className="space-y-2">
                          <h4 className="text-xs font-medium text-champagne-400 uppercase tracking-wide">
                            Key Objectives
                          </h4>
                          <ul className="text-xs text-slate-400 space-y-1">
                            {module.learningObjectives.slice(0, 2).map((objective, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1 h-1 bg-sage-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                <span className="leading-relaxed">{objective}</span>
                              </li>
                            ))}
                            {module.learningObjectives.length > 2 && (
                              <li className="text-xs text-slate-500 opacity-75">
                                +{module.learningObjectives.length - 2} more...
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Premium Key Benefits */}
                <div className="relative p-12 rounded-3xl mb-16 overflow-hidden group champagne-shimmer" style={{
                  background: 'linear-gradient(135deg, rgba(93, 142, 117, 0.1), rgba(214, 194, 155, 0.1))',
                  border: '1px solid rgba(93, 142, 117, 0.3)',
                  backdropFilter: 'blur(20px)'
                }}>
                  {/* Background Decoration */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-sage-600/20 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-champagne-600/20 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" style={{ animationDelay: '0.5s' }}></div>
                  
                  <h3 className="relative text-center text-4xl font-bold mb-12 text-white drop-shadow-lg">
                    Why Choose CPAT Training?
                  </h3>
              
                  <div className="relative grid md:grid-cols-2 gap-12">
                    <div className="relative">
                      <div className="absolute -top-2 -left-2 w-20 h-20 bg-sage-400/20 rounded-full blur-xl"></div>
                      <h4 className="relative flex items-center gap-3 text-2xl font-bold text-luxury mb-6">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-sage-600 to-sage-700 shadow-luxury-lift">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="drop-shadow-sm">
                            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                          </svg>
                        </div>
                        <span className="text-white drop-shadow-lg">
                          Evidence-Based Approach
                        </span>
                      </h4>
                      <ul className="space-y-4 text-slate-300">
                        <li className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-sage-400 rounded-full mt-3 shadow-glow flex-shrink-0"></div>
                          <span className="text-lg leading-relaxed">Backed by peer-reviewed research in neuroscience and psychology</span>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-sage-400 rounded-full mt-3 shadow-glow flex-shrink-0"></div>
                          <span className="text-lg leading-relaxed">Integrates proven therapeutic modalities</span>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-sage-400 rounded-full mt-3 shadow-glow flex-shrink-0"></div>
                          <span className="text-lg leading-relaxed">Measurable outcomes and progress tracking</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -top-2 -right-2 w-20 h-20 bg-champagne-400/20 rounded-full blur-xl"></div>
                      <h4 className="relative flex items-center gap-3 text-2xl font-bold text-luxury mb-6">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-champagne-600 to-champagne-700 shadow-luxury-lift">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="drop-shadow-sm">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <span className="text-white drop-shadow-lg">
                          Clinical Excellence
                        </span>
                      </h4>
                      <ul className="space-y-4 text-slate-300">
                        <li className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-champagne-400 rounded-full mt-3 shadow-glow flex-shrink-0"></div>
                          <span className="text-lg leading-relaxed">Enhanced therapeutic outcomes for clients</span>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-champagne-400 rounded-full mt-3 shadow-glow flex-shrink-0"></div>
                          <span className="text-lg leading-relaxed">Expanded treatment modalities and options</span>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-champagne-400 rounded-full mt-3 shadow-glow flex-shrink-0"></div>
                          <span className="text-lg leading-relaxed">Enhanced therapeutic outcomes for clients</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Premium Training Features */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                  <div className="text-center group luxury-interactive">
                    <div className="relative mb-6">
                      <div className="flex items-center justify-center w-20 h-20 mx-auto luxury-card group-hover:scale-125 transition-all duration-500 floating-element" style={{
                        background: 'linear-gradient(135deg, var(--sage-600), var(--sage-700))',
                        borderRadius: '1.5rem',
                        boxShadow: 'var(--shadow-luxury-lift)'
                      }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg">
                          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-sage-600 to-sage-700 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                    </div>
                    <h4 className="text-2xl font-bold text-luxury mb-4 group-hover:text-sage-300 transition-colors duration-300">
                      Interactive Learning
                    </h4>
                    <p className="text-slate-300 leading-relaxed group-hover:text-sage-200 transition-colors duration-300">
                      Engaging content with practical exercises, case studies, and hands-on applications
                    </p>
                  </div>
                  
                  
                  <div className="text-center group luxury-interactive">
                    <div className="relative mb-6">
                      <div className="flex items-center justify-center w-20 h-20 mx-auto luxury-card group-hover:scale-125 transition-all duration-500 floating-element" style={{
                        background: 'linear-gradient(135deg, var(--sage-600), var(--champagne-600))',
                        borderRadius: '1.5rem',
                        boxShadow: 'var(--shadow-luxury-lift)',
                        animationDelay: '2s'
                      }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg">
                          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-sage-600 to-champagne-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                    </div>
                    <h4 className="text-2xl font-bold text-luxury mb-4 group-hover:text-sage-300 transition-colors duration-300">
                      Ongoing Support
                    </h4>
                    <p className="text-slate-300 leading-relaxed group-hover:text-sage-200 transition-colors duration-300">
                      Access to resources, updates, and professional community
                    </p>
                  </div>
                </div>

                {/* Premium Action Section */}
                <div className="text-center relative">
                  {/* Background Glow Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sage-600/20 via-transparent to-champagne-600/20 blur-3xl"></div>
                  
                  {progress.journeyStarted ? (
                    <div className="relative space-y-8">
                      <p className="text-2xl font-light text-sage-300 leading-relaxed">
                        Welcome back! Ready to continue your 
                        <span className="font-medium text-champagne-400">CPAT journey</span>?
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <div className="relative group">
                          <div className="absolute -inset-2 bg-gradient-to-r from-sage-600 to-champagne-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                          <TherapeuticButton
                            onClick={handleContinueJourney}
                            variant="primary"
                            size="large"
                            className="relative min-w-80 py-4 px-8 text-xl font-semibold champagne-shimmer luxury-interactive"
                            whimsical
                            celebration
                          >
                            <span className="flex items-center gap-3">
                              <span>Continue Your Journey</span>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="transform group-hover:translate-x-2 transition-transform duration-300">
                                <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                              </svg>
                            </span>
                          </TherapeuticButton>
                        </div>
                        
                        <div className="text-center px-6 py-3 rounded-2xl glass-morphism-sage">
                          <div className="text-lg font-medium text-sage-300 mb-2">Your Progress</div>
                          <div className="text-2xl font-bold text-champagne-400">
                            {Math.round((progress.completedModules.length / trainingModules.length) * 100)}% Complete
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative space-y-10">
                      <p className="text-2xl font-light text-sage-300 leading-relaxed max-w-4xl mx-auto">
                        Ready to transform your therapeutic practice with 
                        <span className="font-medium text-champagne-400">evidence-based</span> 
                        <span className="font-medium text-sage-400"> multi-sensory interventions</span>?
                      </p>
                      
                      <div className="relative group">
                        {/* Ultra-Premium Glow Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-champagne-600 via-sage-600 to-champagne-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 animate-pulse"></div>
                        <TherapeuticButton
                          onClick={handleStartJourney}
                          variant="champagne"
                          size="large"
                          className="relative min-w-96 py-5 px-12 text-2xl font-bold champagne-shimmer luxury-interactive"
                          whimsical
                          celebration
                        >
                          <span className="flex items-center gap-4">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="floating-element">
                              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                            </svg>
                            <span>{isSafetyAcknowledged() ? 'Continue Training' : 'Begin Your CPAT Journey'}</span>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="transform group-hover:translate-x-3 transition-transform duration-300">
                              <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                            </svg>
                          </span>
                        </TherapeuticButton>
                      </div>
                      
                      <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto font-light">
                        {isSafetyAcknowledged() 
                          ? 'Continue your comprehensive training in CPAT modalities and clinical applications.'
                          : 'Your learning journey begins with essential safety guidelines and clinical considerations, followed by comprehensive training in each CPAT modality.'
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </main>
          </div>
        </div>
        
        {/* Premium Footer Section */}
        <div className="relative z-10 text-center py-16 glass-morphism-light mx-6 rounded-3xl mb-8">
          <p className="text-lg font-medium text-slate-300 mb-4">
            CPAT Professional Training
          </p>
          <p className="text-sm text-slate-400">
            Advancing Therapeutic Practice Through Multi-Sensory Integration
          </p>
        </div>
      </div>
    </>
  );
};

export default TrainingWelcome;