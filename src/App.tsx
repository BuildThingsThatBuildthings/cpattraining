import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import React from 'react';
import { useProgressTracking } from './hooks/useProgressTracking';

// Define ActivePage type for component props
export type ActivePage = 'dialogue' | 'transformer' | 'generator' | 'safety-screening' | 'training' | 'dashboard';
import { initializeWhimsicalSystem } from './utils/whimsicalInteractions';
import Navigation from './components/Navigation';

// Training Pages
import TrainingWelcome from './pages/training/TrainingWelcome';
import TrainingJourney from './pages/training/TrainingJourney';
import TrainingSafety from './pages/training/TrainingSafety';
import TrainingModule from './pages/training/TrainingModule';
import TrainingCertificate from './pages/training/TrainingCertificate';

// Original Dashboard Pages
import Dashboard from './pages/Dashboard';
import DialogueTrainer from './pages/DialogueTrainer';
import PhraseTransformer from './pages/PhraseTransformer';
import SessionGenerator from './pages/SessionGenerator';
import SafetyScreening from './pages/SafetyScreening';


// Protected Route Component for Safety Gates
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  requiresSafety?: boolean;
  requiresModules?: string[];
}> = ({ children, requiresSafety = false, requiresModules = [] }) => {
  const { isSafetyAcknowledged, progress } = useProgressTracking();
  
  // Check safety acknowledgment requirement
  if (requiresSafety && !isSafetyAcknowledged()) {
    return <Navigate to="/training/safety" replace />;
  }
  
  // Check module completion requirements
  if (requiresModules.length > 0) {
    const hasRequiredModules = requiresModules.every(moduleId => 
      progress.completedModules.includes(moduleId)
    );
    if (!hasRequiredModules) {
      return <Navigate to="/training/journey" replace />;
    }
  }
  
  return <>{children}</>;
};

function App() {
  const { progress, isSafetyAcknowledged } = useProgressTracking();
  
  // Initialize luxury therapeutic interactions and performance monitoring
  useEffect(() => {
    initializeWhimsicalSystem();
    
    // Initialize performance monitoring for clinical environments
    if (process.env.NODE_ENV === 'development') {
      console.log('🏥 Clinical Performance Monitoring initialized');
    }
  }, []);

  return (
    <div className="min-h-screen therapeutic-app" style={{ backgroundColor: 'var(--surface-primary)' }}>
      {/* Global Navigation */}
      <Navigation />
      
      {/* Main Application Routes */}
      <main role="main" className="pt-20">
        <Routes>
          {/* Training Journey Routes with Protection */}
          <Route path="/training" element={<TrainingWelcome />} />
          <Route 
            path="/training/journey" 
            element={
              <ProtectedRoute requiresSafety={true}>
                <TrainingJourney />
              </ProtectedRoute>
            } 
          />
          <Route path="/training/safety" element={<TrainingSafety />} />
          <Route 
            path="/training/module/:moduleId" 
            element={
              <ProtectedRoute requiresSafety={true}>
                <TrainingModule />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/training/certificate" 
            element={
              <ProtectedRoute 
                requiresSafety={true}
                requiresModules={[
                  '01-light-color-fundamentals',
                  '02-therapeutic-mechanisms', 
                  '03-clinical-applications',
                  '04-safety-protocols',
                  '05-patient-assessment',
                  '06-practical-implementation'
                ]}
              >
                <TrainingCertificate />
              </ProtectedRoute>
            } 
          />
          
          {/* Dashboard and Tools Routes */}
          <Route path="/dashboard" element={<Dashboard onNavigate={(page) => console.log('Navigate to:', page)} />} />
          <Route path="/dialogue" element={<DialogueTrainer />} />
          <Route path="/transformer" element={<PhraseTransformer />} />
          <Route path="/generator" element={<SessionGenerator />} />
          <Route path="/safety-screening" element={<SafetyScreening />} />
          
          
          {/* Smart Default Redirect */}
          <Route 
            path="/" 
            element={
              <Navigate 
                to={
                  !isSafetyAcknowledged() ? "/training" :
                  progress.certificateEligible ? "/training/certificate" :
                  progress.currentModule ? `/training/module/${progress.currentModule}` :
                  progress.completedModules.length > 0 ? "/training/journey" :
                  "/training"
                } 
                replace 
              />
            } 
          />
          
          {/* Catch all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
    </div>
  );
}

export default App;