import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressTracking } from '../../hooks/useProgressTracking';
import TherapeuticCard from '../../components/luxury/TherapeuticCard';
import TherapeuticButton from '../../components/luxury/TherapeuticButton';
import { ContraindicationAlert, CautionAlert, NoteAlert } from '../../components/safety/MedicalAlert';
import { SafetyCallout } from '../../components/core/ClinicalCallout';
import { 
  announceToScreenReader
} from '../../utils/accessibility';
import { AlertTriangle, Clock, Shield, CheckCircle } from 'lucide-react';

const TrainingSafety = () => {
  const navigate = useNavigate();
  const { acknowledgeSafety, isSafetyAcknowledged } = useProgressTracking();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [readingStartTime] = useState(Date.now());
  const [hasReadMinimumTime, setHasReadMinimumTime] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes minimum reading time
  
  // If already acknowledged, redirect to journey
  useEffect(() => {
    if (isSafetyAcknowledged()) {
      navigate('/training/journey');
    }
  }, [isSafetyAcknowledged, navigate]);

  const safetyChecklist = [
    {
      id: 'medical-clearance',
      title: 'Medical Clearance Understanding',
      content: 'I understand that CPAT is not a replacement for medical treatment and that clients should have appropriate medical clearance when indicated.',
      required: true
    },
    {
      id: 'contraindications',
      title: 'Contraindications Awareness',
      content: 'I am aware of contraindications including photosensitive epilepsy, severe respiratory conditions, and specific allergies that may affect CPAT implementation.',
      required: true
    },
    {
      id: 'scope-of-practice',
      title: 'Scope of Practice',
      content: 'I will practice CPAT within my professional scope of practice and seek appropriate consultation when needed.',
      required: true
    },
    {
      id: 'informed-consent',
      title: 'Informed Consent',
      content: 'I will obtain proper informed consent from all clients, explaining the nature, benefits, and potential risks of CPAT interventions.',
      required: true
    },
    {
      id: 'environmental-safety',
      title: 'Environmental Safety',
      content: 'I will maintain a safe therapeutic environment with proper ventilation, electrical safety, and emergency protocols.',
      required: true
    },
    {
      id: 'emergency-protocols',
      title: 'Emergency Preparedness',
      content: 'I understand emergency protocols for adverse reactions and will maintain appropriate emergency contacts and procedures.',
      required: true
    }
  ];
  
  // Timer for minimum reading time
  useEffect(() => {
    const timer = setInterval(() => {
      const timeElapsed = Math.floor((Date.now() - readingStartTime) / 1000);
      const remaining = Math.max(0, 120 - timeElapsed);
      setTimeRemaining(remaining);
      
      if (remaining === 0 && !hasReadMinimumTime) {
        setHasReadMinimumTime(true);
        announceToScreenReader('Minimum reading time completed. You may now proceed with acknowledgment.', 'polite');
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [readingStartTime, hasReadMinimumTime]);

  const handleItemCheck = (itemId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      const item = safetyChecklist.find(item => item.id === itemId);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
        announceToScreenReader(`Unchecked: ${item?.title}`, 'polite');
      } else {
        newSet.add(itemId);
        announceToScreenReader(`Checked: ${item?.title}. ${newSet.size} of ${safetyChecklist.length} items completed.`, 'polite');
      }
      return newSet;
    });
  };
  
  const canProceed = () => {
    const requiredItems = safetyChecklist.filter(item => item.required);
    const checkedRequired = requiredItems.filter(item => checkedItems.has(item.id));
    return hasReadMinimumTime && isScrolledToBottom && checkedRequired.length === requiredItems.length;
  };
  
  const handleAcknowledge = () => {
    if (!canProceed()) {
      announceToScreenReader('Please complete all requirements before proceeding.', 'assertive');
      return;
    }
    
    acknowledgeSafety();
    announceToScreenReader('Safety acknowledgment completed. Proceeding to training journey.', 'assertive');
    navigate('/training/journey');
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
    if (isAtBottom && !isScrolledToBottom) {
      setIsScrolledToBottom(true);
      announceToScreenReader('Reached end of safety information. Please complete the acknowledgment checklist.', 'polite');
    }
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Announce page load to screen readers
    announceToScreenReader('CPAT Safety Guidelines page loaded. Please read all content and complete the acknowledgment to proceed.', 'polite');
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--surface-primary)' }}>
      <a
        href="#main-safety-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg therapeutic-focus-ring"
        style={{
          backgroundColor: 'var(--sage-primary)',
          color: 'white',
          textDecoration: 'none'
        }}
      >
        Skip to safety content
      </a>
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <main id="main-safety-content" tabIndex={-1} className="focus:outline-none">
          
          {/* Header */}
          <header className="text-center mb-12" role="banner" aria-labelledby="safety-title">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6" style={{
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--red-600)',
              color: 'white',
              boxShadow: 'var(--shadow-xl)'
            }}>
              <Shield size={32} />
            </div>
            
            <h1 id="safety-title" className="h1-hero text-center mb-4">
              Medical Safety & Clinical Guidelines
            </h1>
            
            <p className="p-lead text-center" style={{ color: 'var(--text-secondary)' }}>
              Essential safety protocols and clinical considerations for CPAT implementation
            </p>

            {/* Reading Timer */}
            <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-red-600/10 border border-red-600/20 rounded-xl">
              <Clock size={16} className="text-red-600" />
              <span className="text-sm font-medium text-red-600">
                {timeRemaining > 0 ? `Minimum reading time: ${formatTime(timeRemaining)}` : 'Reading time requirement met'}
              </span>
            </div>
          </header>

          {/* Safety Content */}
          <div 
            className="space-y-8 mb-12" 
            onScroll={handleScroll}
            style={{ maxHeight: '70vh', overflowY: 'auto' }}
          >
            
            {/* Critical Contraindications */}
            <ContraindicationAlert 
              title="Absolute Contraindications"
              className="mb-8"
            >
              <div className="space-y-4">
                <p className="font-semibold">CPAT therapy must NOT be administered to patients with:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Photosensitive epilepsy</strong> or history of seizures triggered by light stimulation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Severe respiratory conditions</strong> including acute asthma, COPD exacerbation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Active pregnancy</strong> without explicit medical clearance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Severe allergic reactions</strong> to essential oils or fragrance compounds</span>
                  </li>
                </ul>
              </div>
            </ContraindicationAlert>

            {/* Important Cautions */}
            <CautionAlert 
              title="Clinical Cautions & Precautions"
              className="mb-8"
            >
              <div className="space-y-4">
                <p>Exercise clinical judgment and obtain medical clearance when indicated for:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <Shield size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>Patients with <strong>cardiac conditions</strong> or pacemakers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>History of <strong>psychiatric disorders</strong> or medication interactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Hypertension</strong> or blood pressure medications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>Patients under <strong>age 12</strong> or over <strong>age 85</strong></span>
                  </li>
                </ul>
              </div>
            </CautionAlert>

            {/* Clinical Guidelines */}
            <NoteAlert 
              title="Clinical Practice Guidelines"
              className="mb-8"
            >
              <div className="space-y-4">
                <p>Best practices for safe and effective CPAT implementation:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Maintain current CPR and first aid certification</li>
                  <li>• Document all contraindications and medical history</li>
                  <li>• Ensure adequate ventilation and room temperature control</li>
                  <li>• Have emergency contact information readily available</li>
                  <li>• Follow standard infection control and hygiene protocols</li>
                  <li>• Maintain professional liability insurance coverage</li>
                </ul>
              </div>
            </NoteAlert>

            {/* Professional Standards */}
            <SafetyCallout 
              title="Professional Standards & Ethics"
              variant="default"
              className="mb-8"
            >
              <div className="space-y-3">
                <p>As a healthcare professional implementing CPAT, you must:</p>
                <ul className="space-y-2">
                  <li>• Practice within your licensed scope of practice</li>
                  <li>• Obtain proper informed consent for all interventions</li>
                  <li>• Maintain confidentiality and privacy standards (HIPAA)</li>
                  <li>• Document treatment plans and patient responses</li>
                  <li>• Refer to appropriate medical specialists when indicated</li>
                  <li>• Participate in continuing education and competency maintenance</li>
                </ul>
              </div>
            </SafetyCallout>

            {/* Emergency Protocols */}
            <ContraindicationAlert 
              title="Emergency Response Protocols"
              className="mb-8"
            >
              <div className="space-y-4">
                <p className="font-semibold">Immediate actions for adverse reactions:</p>
                <ol className="space-y-3 ml-4">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <span><strong>Stop treatment immediately</strong> - Discontinue all light, sound, and aromatherapy</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <span><strong>Assess patient condition</strong> - Check vital signs and level of consciousness</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <span><strong>Call emergency services</strong> if severe reaction (911/local emergency number)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    <span><strong>Document incident</strong> - Record all details for follow-up and reporting</span>
                  </li>
                </ol>
              </div>
            </ContraindicationAlert>
          </div>

          {/* Acknowledgment Checklist */}
          <TherapeuticCard className="mb-8">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
                Safety Acknowledgment Checklist
              </h2>
              
              <div className="space-y-4 mb-8">
                {safetyChecklist.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-md"
                    style={{
                      backgroundColor: checkedItems.has(item.id) ? 'var(--sage-100)' : 'var(--surface-secondary)',
                      borderColor: checkedItems.has(item.id) ? 'var(--sage-600)' : 'var(--border-primary)'
                    }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <input
                        type="checkbox"
                        checked={checkedItems.has(item.id)}
                        onChange={() => handleItemCheck(item.id)}
                        className="w-5 h-5 rounded border-2 focus:ring-2 focus:ring-sage-600 focus:ring-offset-2"
                        aria-describedby={`${item.id}-description`}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                        {item.title}
                        {item.required && <span className="text-red-600 ml-1">*</span>}
                      </h3>
                      <p id={`${item.id}-description`} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {item.content}
                      </p>
                    </div>
                    
                    {checkedItems.has(item.id) && (
                      <CheckCircle size={20} className="text-sage-600 mt-1" />
                    )}
                  </label>
                ))}
              </div>

              {/* Progress indicators */}
              <div className="space-y-4 mb-8 p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>Reading Time:</span>
                  <span className={`font-medium ${hasReadMinimumTime ? 'text-green-600' : 'text-red-600'}`}>
                    {hasReadMinimumTime ? '✓ Complete' : `${formatTime(timeRemaining)} remaining`}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>Content Review:</span>
                  <span className={`font-medium ${isScrolledToBottom ? 'text-green-600' : 'text-yellow-600'}`}>
                    {isScrolledToBottom ? '✓ Complete' : 'Scroll to end'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>Checklist:</span>
                  <span className={`font-medium ${checkedItems.size === safetyChecklist.length ? 'text-green-600' : 'text-yellow-600'}`}>
                    {checkedItems.size}/{safetyChecklist.length} items
                  </span>
                </div>
              </div>

              {/* Acknowledge Button */}
              <div className="text-center">
                <TherapeuticButton
                  onClick={handleAcknowledge}
                  variant={canProceed() ? "primary" : "gentle"}
                  size="large"
                  className="min-w-80"
                  disabled={!canProceed()}
                  whimsical={canProceed()}
                >
                  <span className="flex items-center gap-2">
                    <Shield size={20} />
                    <span>I Acknowledge & Accept Responsibility</span>
                  </span>
                </TherapeuticButton>
                
                {!canProceed() && (
                  <p className="mt-4 text-sm text-red-600 text-center">
                    Complete all requirements above to proceed with training
                  </p>
                )}
              </div>
            </div>
          </TherapeuticCard>

          {/* Footer */}
          <footer className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            <p>
              This safety acknowledgment creates a timestamped record of your acceptance of clinical responsibility.
              <br />
              Professional liability and continuing education are your ongoing responsibility as a healthcare provider.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default TrainingSafety;