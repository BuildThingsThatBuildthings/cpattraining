import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressTracking } from '../../hooks/useProgressTracking';
import { trainingModules } from '../../data/trainingModules';
import TherapeuticCard from '../../components/luxury/TherapeuticCard';
import TherapeuticButton from '../../components/luxury/TherapeuticButton';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const TrainingCertificate = () => {
  const navigate = useNavigate();
  const { progress, earnCertificate } = useProgressTracking();
  const [isDownloading, setIsDownloading] = useState(false);
  const [certificateEarned, setCertificateEarned] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const canEarnCertificate = 
    progress.completedModules.length === trainingModules.length && 
    progress.safetyAcknowledged;

  const totalTimeSpent = Object.values(progress.moduleProgress)
    .reduce((total, module) => total + (module.timeSpent || 0), 0);

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const averageScore = () => {
    const scoresWithValues = Object.values(progress.moduleProgress)
      .map(module => module.score)
      .filter((score): score is number => score !== undefined);
    
    if (scoresWithValues.length === 0) return 100;
    return Math.round(scoresWithValues.reduce((sum, score) => sum + score, 0) / scoresWithValues.length);
  };

  useEffect(() => {
    if (!canEarnCertificate) {
      navigate('/training/journey');
      return;
    }

    if (!progress.certificateEarned && !certificateEarned) {
      earnCertificate();
      setCertificateEarned(true);
    }
  }, [canEarnCertificate, progress.certificateEarned, certificateEarned, earnCertificate, navigate]);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    setIsDownloading(true);
    
    try {
      // Create canvas from certificate element
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        width: 1200,
        height: 900,
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1200, 900]
      });

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, 1200, 900);
      
      // Download the PDF
      const date = new Date().toISOString().split('T')[0];
      pdf.save(`CPAT-Professional-Certificate-${date}.pdf`);
      
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('There was an error generating your certificate. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!canEarnCertificate) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 text-white shadow-2xl">
            <span className="text-4xl">🏆</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Congratulations!
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-4">
            You have successfully completed the CPAT Professional Training Program
          </p>
          
          <p className="text-lg text-gray-600">
            You are now certified in Color Light Aromatherapy Sound Positive Affirmation Therapy
          </p>
        </div>

        {/* Achievement Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <TherapeuticCard className="text-center">
            <div className="p-6">
              <div className="text-3xl mb-3">📚</div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {progress.completedModules.length}
              </div>
              <div className="text-gray-600">Modules Completed</div>
            </div>
          </TherapeuticCard>
          
          <TherapeuticCard className="text-center">
            <div className="p-6">
              <div className="text-3xl mb-3">⏱️</div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {formatTime(totalTimeSpent)}
              </div>
              <div className="text-gray-600">Time Invested</div>
            </div>
          </TherapeuticCard>
          
          <TherapeuticCard className="text-center">
            <div className="p-6">
              <div className="text-3xl mb-3">🎯</div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {averageScore()}%
              </div>
              <div className="text-gray-600">Average Score</div>
            </div>
          </TherapeuticCard>
        </div>

        {/* Certificate */}
        <TherapeuticCard className="mb-8 relative overflow-hidden">
          <div 
            ref={certificateRef}
            className="p-12 md:p-16 bg-gradient-to-br from-white via-yellow-50 to-orange-50 relative"
            style={{ minHeight: '600px' }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              <div className="absolute top-8 left-8 w-32 h-32 border-8 border-yellow-400 rounded-full"></div>
              <div className="absolute top-8 right-8 w-32 h-32 border-8 border-orange-400 rounded-full"></div>
              <div className="absolute bottom-8 left-8 w-32 h-32 border-8 border-red-400 rounded-full"></div>
              <div className="absolute bottom-8 right-8 w-32 h-32 border-8 border-pink-400 rounded-full"></div>
            </div>

            {/* Certificate Content */}
            <div className="relative z-10 text-center">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                  Certificate of Completion
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600">
                  This certifies that
                </p>
              </div>

              {/* Recipient Name Placeholder */}
              <div className="mb-8">
                <div className="text-3xl md:text-4xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-6 mx-auto max-w-md">
                  [Your Name]
                </div>
                <p className="text-lg text-gray-600">
                  has successfully completed the comprehensive training program in
                </p>
              </div>

              {/* Program Title */}
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
                  Color Light Aromatherapy Sound
                </h3>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">
                  Positive Affirmation Therapy
                </h3>
                <p className="text-xl text-gray-700 font-medium">
                  (CPAT) Professional Certification Program
                </p>
              </div>

              {/* Training Details */}
              <div className="mb-8">
                <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3">Training Completed:</h4>
                    <ul className="space-y-2 text-gray-700">
                      {trainingModules.map(module => (
                        <li key={module.id} className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">{module.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3">Certification Details:</h4>
                    <div className="space-y-2 text-gray-700 text-sm">
                      <div className="flex justify-between">
                        <span>Modules Completed:</span>
                        <span className="font-semibold">{progress.completedModules.length}/{trainingModules.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Training Time:</span>
                        <span className="font-semibold">{formatTime(totalTimeSpent)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Assessment Score:</span>
                        <span className="font-semibold">{averageScore()}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completion Date:</span>
                        <span className="font-semibold">
                          {progress.certificateDate 
                            ? new Date(progress.certificateDate).toLocaleDateString()
                            : new Date().toLocaleDateString()
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certification Statement */}
              <div className="mb-8">
                <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                  This certification demonstrates competency in evidence-based multi-sensory therapeutic interventions, 
                  including color light therapy, aromatherapy, sound therapy, and positive affirmation techniques. 
                  The recipient has completed comprehensive training in clinical applications, safety protocols, 
                  and ethical practice standards for CPAT implementation.
                </p>
              </div>

              {/* Signature Section */}
              <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left max-w-4xl mx-auto">
                <div className="mb-6 md:mb-0">
                  <div className="w-48 border-b-2 border-gray-400 mb-2 mx-auto md:mx-0"></div>
                  <p className="text-sm text-gray-600">
                    <strong>CPAT Training Director</strong><br />
                    Professional Development Institute
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-bold">CPAT</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Certificate ID: CPAT-{Date.now().toString().slice(-8)}
                  </p>
                </div>
                
                <div>
                  <div className="w-48 border-b-2 border-gray-400 mb-2 mx-auto md:mx-0"></div>
                  <p className="text-sm text-gray-600">
                    <strong>Date of Completion</strong><br />
                    {progress.certificateDate 
                      ? new Date(progress.certificateDate).toLocaleDateString()
                      : new Date().toLocaleDateString()
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TherapeuticCard>

        {/* Action Buttons */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TherapeuticButton
              onClick={downloadCertificate}
              variant="primary"
              size="large"
              disabled={isDownloading}
            >
              {isDownloading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  <span>Generating Certificate...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Download Certificate (PDF)</span>
                  <span>📄</span>
                </span>
              )}
            </TherapeuticButton>
            
            <TherapeuticButton
              onClick={() => navigate('/training/journey')}
              variant="secondary"
              size="large"
            >
              Return to Training Journey
            </TherapeuticButton>
          </div>

          {/* Additional Information */}
          <div className="max-w-3xl mx-auto">
            <TherapeuticCard className="bg-blue-50 border-blue-200">
              <div className="p-6">
                <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <span>💡</span>
                  Next Steps for Your CPAT Practice
                </h3>
                <div className="text-blue-700 text-left space-y-2">
                  <p>• <strong>Continuing Education:</strong> Stay updated with the latest CPAT research and techniques</p>
                  <p>• <strong>Professional Development:</strong> Consider advanced specialization courses</p>
                  <p>• <strong>Community Engagement:</strong> Join the CPAT practitioner community for ongoing support</p>
                  <p>• <strong>Clinical Implementation:</strong> Begin integrating CPAT techniques into your practice</p>
                  <p>• <strong>Supervision:</strong> Seek mentorship as you develop your CPAT expertise</p>
                </div>
              </div>
            </TherapeuticCard>
          </div>

          {/* Contact Information */}
          <div className="text-center text-gray-600 text-sm">
            <p className="mb-2">
              <strong>Questions about your certification or continuing education?</strong>
            </p>
            <p>
              Contact CPAT Professional Development at training@cpat-institute.org
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCertificate;