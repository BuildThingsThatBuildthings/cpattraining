import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgressTracking } from '../../hooks/useProgressTracking';
import { getModuleById, getNextModule } from '../../data/trainingModules';
import Hero from '../../components/core/Hero';
import ProgressStepper from '../../components/core/ProgressStepper';
import { SafetyCallout, CPATCallout } from '../../components/core/ClinicalCallout';
import TherapeuticButton from '../../components/luxury/TherapeuticButton';

const TrainingModule = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { startModule, completeModule, updateModuleTime, isModuleAccessible } = useProgressTracking();
  
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sessionStartTime] = useState(Date.now());
  const [sectionStartTime, setSectionStartTime] = useState(Date.now());
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string>>({});
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);
  
  const contentRef = useRef<HTMLDivElement>(null);

  const module = moduleId ? getModuleById(moduleId) : null;
  const nextModule = moduleId ? getNextModule(moduleId) : null;

  useEffect(() => {
    if (!moduleId || !module) {
      navigate('/training/journey');
      return;
    }

    // Check if module is accessible
    if (!isModuleAccessible(moduleId, module.prerequisites)) {
      navigate('/training/journey');
      return;
    }

    // Start the module
    startModule(moduleId);
    setSectionStartTime(Date.now());
  }, [moduleId, module, isModuleAccessible, startModule, navigate]);

  useEffect(() => {
    // Update time spent when section changes
    return () => {
      if (moduleId) {
        const timeSpent = Date.now() - sectionStartTime;
        updateModuleTime(moduleId, timeSpent);
      }
    };
  }, [currentSectionIndex, moduleId, sectionStartTime, updateModuleTime]);

  const handleSectionComplete = () => {
    if (!module) return;

    const timeSpent = Date.now() - sectionStartTime;
    if (moduleId) {
      updateModuleTime(moduleId, timeSpent);
    }

    if (currentSectionIndex < module.content.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      setSectionStartTime(Date.now());
      
      // Scroll to top of content
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    } else {
      // All sections completed
      if (module.assessment) {
        setShowAssessment(true);
      } else {
        handleModuleComplete();
      }
    }
  };

  const handleModuleComplete = (score?: number) => {
    if (!moduleId) return;

    const totalTime = Date.now() - sessionStartTime;
    updateModuleTime(moduleId, totalTime);
    completeModule(moduleId, score);
    setIsComplete(true);
  };

  const handleAssessmentSubmit = () => {
    if (!module?.assessment) return;

    let correct = 0;
    module.assessment.questions.forEach(question => {
      const userAnswer = assessmentAnswers[question.id];
      if (userAnswer === question.correct) {
        correct++;
      }
    });

    const score = Math.round((correct / module.assessment.questions.length) * 100);
    setAssessmentScore(score);

    if (score >= module.assessment.passingScore) {
      handleModuleComplete(score);
    }
  };

  const handleReflectionChange = (questionId: string, value: string) => {
    setReflectionAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleAssessmentChange = (questionId: string, value: string) => {
    setAssessmentAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Module Not Found</h2>
          <TherapeuticButton onClick={() => navigate('/training/journey')}>
            Return to Training Journey
          </TherapeuticButton>
        </div>
      </div>
    );
  }

  const currentSection = module.content.sections[currentSectionIndex];
  const moduleProgress = Math.round(((currentSectionIndex + (showAssessment ? 1 : 0)) / (module.content.sections.length + (module.assessment ? 1 : 0))) * 100);

  // Create step data for progress stepper
  const stepperSteps = module.content.sections.map((section, index) => ({
    id: section.id,
    title: section.title,
    description: `Section ${index + 1}`,
    status: index < currentSectionIndex ? 'completed' as const : 
           index === currentSectionIndex ? 'current' as const : 'upcoming' as const,
    index
  }));

  if (module.assessment) {
    stepperSteps.push({
      id: 'assessment',
      title: 'Assessment',
      description: 'Final Quiz',
      status: showAssessment || isComplete ? 'current' : 'upcoming',
      index: stepperSteps.length
    });
  }

  // Show intro hero for first module only
  const isIntroModule = moduleId === 'light-colour-fundamentals';
  const showHero = isIntroModule && currentSectionIndex === 0 && !showAssessment && !isComplete;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-text-primary">
      {/* Hero Section for Intro Module */}
      {showHero && (
        <Hero
          title={`${module.icon} ${module.title}`}
          subtitle={`${module.description} | ${module.duration} • ${module.difficulty}`}
          proofPoints={[
            `${module.learningObjectives.length} Learning Objectives`,
            `${module.content.sections.length} Interactive Sections`,
            `${module.assessment ? 'Certification Assessment' : 'Knowledge Validation'}`
          ]}
          ctaText="Begin Module"
          ctaSecondaryText="Module Overview"
          onPrimaryAction={() => {
            // Scroll to content
            const content = document.getElementById('module-content');
            content?.scrollIntoView({ behavior: 'smooth' });
          }}
          onSecondaryAction={() => navigate('/training/journey')}
          variant="luxury"
        />
      )}

      <div className="container mx-auto px-4 py-8 max-w-5xl" id="module-content">
        {!showHero && (
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <TherapeuticButton
                onClick={() => navigate('/training/journey')}
                variant="secondary"
                size="small"
              >
                ← Back to Journey
              </TherapeuticButton>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{module.icon}</span>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                      {module.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700">{module.difficulty}</span>
                      <span>{module.duration}</span>
                      <span>{module.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Stepper */}
            <div className="mb-8">
              <ProgressStepper 
                steps={stepperSteps}
                currentStep={currentSectionIndex}
                onStepClick={(stepIndex, stepId) => {
                  if (stepIndex <= currentSectionIndex) {
                    if (stepId === 'assessment') {
                      setShowAssessment(true);
                    } else {
                      setCurrentSectionIndex(stepIndex);
                      setShowAssessment(false);
                    }
                  }
                }}
                variant="horizontal"
                size="default"
                className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50"
              />
            </div>

            {/* Progress Information */}
            <div className="flex items-center justify-between text-sm text-slate-400 bg-slate-800/40 rounded-lg p-4 mb-6 border border-slate-700/30">
              <div>
                {showAssessment ? (
                  <span className="font-medium text-champagne-600">Final Assessment</span>
                ) : (
                  <span>
                    <span className="text-slate-300">Section {currentSectionIndex + 1} of {module.content.sections.length}:</span>
                    <span className="font-medium text-text-primary ml-2">{currentSection.title}</span>
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sage-600">{moduleProgress}% Complete</span>
                <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sage-600 to-sage-500 transition-all duration-500"
                    style={{ width: `${moduleProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clinical Safety Acknowledgment for Intro Module */}
        {isIntroModule && !isComplete && !showAssessment && (
          <div className="mb-8">
            <SafetyCallout
              title="Clinical Safety & Contraindications"
              variant="emphasised"
              className="mb-6"
            >
              <div className="space-y-4">
                <p className="font-medium text-red-300">
                  CLAS/light therapy sessions are <strong>CONTRAINDICATED</strong> for individuals with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-red-200">
                  <li>Epilepsy or seizure history</li>
                  <li>Severe photosensitivity disorders</li>
                  <li>Active psychotic episodes</li>
                  <li>Certain medications causing light sensitivity</li>
                </ul>
                <div className="mt-4 p-4 bg-red-600/10 rounded-lg border border-red-600/20">
                  <p className="text-sm text-red-200">
                    <strong>Always screen clients, obtain informed consent, and adjust brightness/colour exposure with sensitivity.</strong>
                    When in doubt, consult with medical professionals and err on the side of caution.
                  </p>
                </div>
              </div>
            </SafetyCallout>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 rounded-2xl p-8 backdrop-blur-sm border border-slate-700/30 mb-8">
          <div ref={contentRef} className="max-h-screen overflow-y-auto">
            {isComplete ? (
              /* Completion Screen */
              <div className="text-center py-12">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-3xl font-bold text-text-primary mb-4">
                  Module Complete!
                </h2>
                <p className="text-xl text-slate-300 mb-8">
                  Congratulations on completing "{module.title}"
                </p>

                {assessmentScore !== null && (
                  <div className={`inline-block px-6 py-3 rounded-xl mb-6 border ${
                    assessmentScore >= (module.assessment?.passingScore || 80)
                      ? 'bg-sage-700/20 border-sage-600 text-sage-300'
                      : 'bg-red-600/20 border-red-600 text-red-300'
                  }`}>
                    <div className="text-lg font-bold">
                      Assessment Score: {assessmentScore}%
                    </div>
                    <div className="text-sm opacity-80">
                      {assessmentScore >= (module.assessment?.passingScore || 80)
                        ? `✅ Passed (Required: ${module.assessment?.passingScore}%)`
                        : `❌ Below passing score (Required: ${module.assessment?.passingScore}%)`
                      }
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {nextModule ? (
                    <TherapeuticButton
                      onClick={() => navigate(`/training/module/${nextModule.id}`)}
                      variant="primary"
                      size="large"
                    >
                      <span className="flex items-center gap-2">
                        <span>Next Module: {nextModule.title}</span>
                        <span>→</span>
                      </span>
                    </TherapeuticButton>
                  ) : (
                    <TherapeuticButton
                      onClick={() => navigate('/training/certificate')}
                      variant="primary"
                      size="large"
                    >
                      <span className="flex items-center gap-2">
                        <span>Claim Your Certificate</span>
                        <span>🏆</span>
                      </span>
                    </TherapeuticButton>
                  )}
                  
                  <div>
                    <TherapeuticButton
                      onClick={() => navigate('/training/journey')}
                      variant="secondary"
                    >
                      Return to Training Journey
                    </TherapeuticButton>
                  </div>
                </div>
              </div>
            ) : showAssessment && module.assessment ? (
              /* Assessment Screen */
              <div>
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">📝</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Module Assessment</h2>
                  <p className="text-gray-600">
                    Test your knowledge of {module.title}. 
                    You need {module.assessment.passingScore}% to pass.
                  </p>
                </div>

                <div className="space-y-6">
                  {module.assessment.questions.map((question, index) => (
                    <div key={question.id} className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-bold text-gray-800 mb-4">
                        Question {index + 1}: {question.question}
                      </h3>
                      
                      {question.type === 'multiple-choice' && question.options ? (
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <label key={optionIndex} className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="radio"
                                name={question.id}
                                value={option}
                                checked={assessmentAnswers[question.id] === option}
                                onChange={(e) => handleAssessmentChange(question.id, e.target.value)}
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      ) : question.type === 'true-false' ? (
                        <div className="space-y-2">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name={question.id}
                              value="true"
                              checked={assessmentAnswers[question.id] === 'true'}
                              onChange={(e) => handleAssessmentChange(question.id, e.target.value)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-gray-700">True</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name={question.id}
                              value="false"
                              checked={assessmentAnswers[question.id] === 'false'}
                              onChange={(e) => handleAssessmentChange(question.id, e.target.value)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-gray-700">False</span>
                          </label>
                        </div>
                      ) : null}

                      {/* Show explanation after answering */}
                      {assessmentAnswers[question.id] && assessmentScore !== null && (
                        <div className={`mt-4 p-3 rounded-lg ${
                          assessmentAnswers[question.id] === question.correct
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          <div className="font-medium mb-1">
                            {assessmentAnswers[question.id] === question.correct ? '✅ Correct' : '❌ Incorrect'}
                          </div>
                          <div className="text-sm">{question.explanation}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  {assessmentScore !== null ? (
                    assessmentScore >= module.assessment.passingScore ? (
                      <div className="space-y-4">
                        <div className="text-green-600 text-lg font-bold">
                          🎉 Congratulations! You passed with {assessmentScore}%
                        </div>
                        <TherapeuticButton
                          onClick={() => setIsComplete(true)}
                          variant="primary"
                        >
                          Continue
                        </TherapeuticButton>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-red-600 text-lg font-bold">
                          You scored {assessmentScore}%. Please review the content and try again.
                        </div>
                        <div className="flex gap-4 justify-center">
                          <TherapeuticButton
                            onClick={() => {
                              setShowAssessment(false);
                              setCurrentSectionIndex(0);
                              setAssessmentAnswers({});
                              setAssessmentScore(null);
                            }}
                            variant="secondary"
                          >
                            Review Content
                          </TherapeuticButton>
                          <TherapeuticButton
                            onClick={() => {
                              setAssessmentAnswers({});
                              setAssessmentScore(null);
                            }}
                            variant="primary"
                          >
                            Retake Assessment
                          </TherapeuticButton>
                        </div>
                      </div>
                    )
                  ) : (
                    <TherapeuticButton
                      onClick={handleAssessmentSubmit}
                      variant="primary"
                      disabled={Object.keys(assessmentAnswers).length < module.assessment.questions.length}
                    >
                      Submit Assessment
                    </TherapeuticButton>
                  )}
                </div>
              </div>
            ) : (
              /* Section Content */
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-sage-700/20 rounded-lg flex items-center justify-center text-sage-600 font-bold text-sm">
                    {currentSectionIndex + 1}
                  </div>
                  {currentSection.title}
                </h2>
                
                {/* Render Enhanced Markdown-like content with Clinical Notes */}
                <div className="prose prose-slate prose-invert max-w-none">
                  <div 
                    className="text-slate-300 leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{
                      __html: currentSection.content
                        .replace(/### (.*$)/gm, '<h3 class="text-xl font-bold text-text-primary mt-8 mb-4 border-l-4 border-sage-600 pl-4">$1</h3>')
                        .replace(/## (.*$)/gm, '<h2 class="text-2xl font-bold text-text-primary mt-10 mb-6 border-l-4 border-champagne-600 pl-4">$1</h2>')
                        .replace(/# (.*$)/gm, '<h1 class="text-3xl font-bold text-text-primary mt-12 mb-8 border-l-4 border-sage-700 pl-6">$1</h1>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-text-primary">$1</strong>')
                        .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc marker:text-sage-600">$1</li>')
                        .replace(/> \*\*(Clinical Note|Safety Note|Clinical Protocol)\*\*: (.*$)/gm, '<div class="my-6 p-4 bg-sage-700/10 border-l-4 border-sage-600 rounded-r-lg"><div class="text-sage-400 text-sm font-semibold uppercase tracking-wider mb-2">$1</div><div class="text-sage-200">$2</div></div>')
                    }}
                  />
                </div>

                {/* Clinical Context for specific sections */}
                {isIntroModule && currentSection.id === 'terminology-measurements' && (
                  <div className="mt-8">
                    <CPATCallout title="Clinical Application Note" className="mb-6">
                      <p>Understanding these measurements is critical for safe, effective practice. Always document wavelength, intensity, and duration for reproducible treatments and regulatory compliance.</p>
                    </CPATCallout>
                  </div>
                )}

                {/* Interactive Elements */}
                {currentSection.interactiveElements?.map((element, index) => (
                  <div key={index} className="mt-8">
                    {element.type === 'reflection' && (
                      <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-600/50 backdrop-blur-sm">
                        <h4 className="font-bold text-sage-400 mb-3 flex items-center gap-2">
                          <span>💭</span>
                          Reflection Exercise
                        </h4>
                        <p className="text-slate-300 mb-4">{(element.data as any).prompt}</p>
                        <textarea
                          value={reflectionAnswers[`section-${currentSectionIndex}-${index}`] || ''}
                          onChange={(e) => handleReflectionChange(`section-${currentSectionIndex}-${index}`, e.target.value)}
                          placeholder={(element.data as any).placeholder}
                          className="w-full h-24 p-4 bg-slate-800/80 border border-slate-600 rounded-lg text-text-primary placeholder:text-slate-500 focus:ring-2 focus:ring-sage-600 focus:border-sage-600 transition-colors"
                        />
                      </div>
                    )}
                    
                    {element.type === 'practice' && (
                      <div className="bg-champagne-600/10 rounded-xl p-6 border border-champagne-600/30 backdrop-blur-sm">
                        <h4 className="font-bold text-champagne-400 mb-3 flex items-center gap-2">
                          <span>🎯</span>
                          {(element.data as any).title}
                        </h4>
                        <p className="text-champagne-200 mb-4">{(element.data as any).prompt}</p>
                        <textarea
                          value={reflectionAnswers[`section-${currentSectionIndex}-${index}`] || ''}
                          onChange={(e) => handleReflectionChange(`section-${currentSectionIndex}-${index}`, e.target.value)}
                          placeholder={(element.data as any).placeholder}
                          className="w-full h-24 p-4 bg-slate-800/80 border border-champagne-600/50 rounded-lg text-text-primary placeholder:text-slate-500 focus:ring-2 focus:ring-champagne-600 focus:border-champagne-600 transition-colors"
                        />
                      </div>
                    )}

                    {element.type === 'quiz' && (
                      <div className="bg-blue-600/10 rounded-xl p-6 border border-blue-600/30 backdrop-blur-sm">
                        <h4 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
                          <span>❓</span>
                          Quick Knowledge Check
                        </h4>
                        <p className="text-blue-200 mb-4">{(element.data as any).question}</p>
                        <div className="space-y-2">
                          {((element.data as any).options as string[]).map((option: string, optionIndex: number) => (
                            <label key={optionIndex} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                              <input
                                type="radio"
                                name={`quiz-${currentSectionIndex}-${index}`}
                                value={option}
                                className="w-4 h-4 text-blue-600 border-blue-400 focus:ring-blue-600 focus:ring-2"
                              />
                              <span className="text-slate-300">{option}</span>
                            </label>
                          ))}
                        </div>
                        <div className="mt-4 p-3 bg-blue-600/20 rounded-lg border border-blue-600/40">
                          <p className="text-sm text-blue-200">
                            <strong>Correct Answer:</strong> {(element.data as any).correct}
                          </p>
                          <p className="text-sm text-blue-300 mt-1">
                            {(element.data as any).explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        {!isComplete && !showAssessment && (
          <div className="flex justify-between items-center mt-8">
            <TherapeuticButton
              onClick={() => {
                if (currentSectionIndex > 0) {
                  setCurrentSectionIndex(prev => prev - 1);
                  setSectionStartTime(Date.now());
                  // Scroll to top
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              variant="secondary"
              disabled={currentSectionIndex === 0}
            >
              ← Previous Section
            </TherapeuticButton>

            <div className="text-center text-slate-400 text-sm flex items-center gap-4">
              <span>Section {currentSectionIndex + 1} of {module.content.sections.length}</span>
              <div className="flex gap-1">
                {module.content.sections.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index <= currentSectionIndex ? 'bg-sage-600' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <TherapeuticButton
              onClick={() => {
                handleSectionComplete();
                // Scroll to top for next section
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              variant="primary"
            >
              {currentSectionIndex === module.content.sections.length - 1 
                ? (module.assessment ? 'Take Assessment' : 'Complete Module')
                : 'Next Section →'
              }
            </TherapeuticButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingModule;