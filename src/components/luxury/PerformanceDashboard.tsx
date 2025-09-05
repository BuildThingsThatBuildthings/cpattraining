/**
 * Clinical Performance Monitoring Dashboard
 * Real-time performance monitoring with therapeutic-grade standards
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Activity, AlertTriangle, CheckCircle, TrendingUp, Monitor, Zap, Eye } from 'lucide-react';
import { luxuryPerformance } from '../../utils/luxuryPerformance';

// Mock bundle analyzer for now - in real implementation would be imported from separate module
const BundleAnalyzer = {
  analyzeBundle: () => ({
    recommendations: [
      'Add resource preloading for critical assets',
      'Convert images to modern formats (WebP/AVIF)',
      'Enable lazy loading for images'
    ],
    estimatedSavings: 150,
    criticalIssues: []
  })
};

interface PerformanceMetrics {
  webVitals?: any;
  animations?: any[];
  budgetCompliance?: any;
  alerts?: any[];
  memoryUsage?: any;
  frameTimingStats?: any;
  name?: string;
  average?: number;
  max?: number;
  min?: number;
  p95?: number;
  count?: number;
  avgFps?: number;
}

interface PerformanceDashboardProps {
  isVisible?: boolean;
  position?: 'fixed' | 'relative';
  theme?: 'clinical' | 'development';
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  isVisible = false,
  position = 'fixed',
  theme = 'development',
  autoRefresh = true,
  refreshInterval = 2000
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [bundleAnalysis, setBundleAnalysis] = useState<any>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'vitals' | 'animations' | 'bundle' | 'alerts'>('overview');

  const updateMetrics = useCallback(() => {
    const stats = luxuryPerformance.getStats();
    if (stats) {
      setMetrics(stats);
    }
    
    const analysis = BundleAnalyzer.analyzeBundle();
    setBundleAnalysis(analysis);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    updateMetrics();
    
    if (autoRefresh) {
      const interval = setInterval(updateMetrics, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [isVisible, autoRefresh, refreshInterval, updateMetrics]);

  if (!isVisible) return null;

  const clinicalColors = {
    primary: 'rgb(34, 197, 94)',
    warning: 'rgb(249, 115, 22)',
    danger: 'rgb(239, 68, 68)',
    neutral: 'rgb(107, 114, 128)',
    bg: 'rgba(255, 255, 255, 0.95)',
    cardBg: 'rgba(248, 250, 252, 0.98)'
  };

  const developmentColors = {
    primary: 'rgb(59, 130, 246)',
    warning: 'rgb(245, 158, 11)',
    danger: 'rgb(220, 38, 38)',
    neutral: 'rgb(156, 163, 175)',
    bg: 'rgba(17, 24, 39, 0.95)',
    cardBg: 'rgba(31, 41, 55, 0.98)'
  };

  const colors = theme === 'clinical' ? clinicalColors : developmentColors;

  const containerStyle: React.CSSProperties = {
    position,
    top: position === 'fixed' ? '20px' : undefined,
    right: position === 'fixed' ? '20px' : undefined,
    width: isMinimized ? '60px' : '400px',
    height: isMinimized ? '60px' : '600px',
    backgroundColor: colors.bg,
    border: `1px solid ${colors.neutral}`,
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    color: theme === 'clinical' ? '#1f2937' : '#f9fafb',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '14px',
    zIndex: 9999,
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  if (isMinimized) {
    return (
      <div style={containerStyle} onClick={() => setIsMinimized(false)}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          cursor: 'pointer'
        }}>
          <Monitor size={24} color={colors.primary} />
        </div>
      </div>
    );
  }

  const getComplianceColor = (score: number) => {
    if (score >= 90) return colors.primary;
    if (score >= 70) return colors.warning;
    return colors.danger;
  };

  const renderOverview = () => (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
          {theme === 'clinical' ? '🏥 Clinical Performance' : '⚡ Performance Overview'}
        </h3>
        
        {metrics?.budgetCompliance && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            backgroundColor: colors.cardBg,
            borderRadius: '8px',
            border: `1px solid ${getComplianceColor(metrics.budgetCompliance.score)}`,
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: getComplianceColor(metrics.budgetCompliance.score),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600'
            }}>
              {Math.round(metrics.budgetCompliance.score)}
            </div>
            <div>
              <div style={{ fontWeight: '500' }}>Budget Compliance</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>
                Clinical performance standards
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        <div style={{
          padding: '12px',
          backgroundColor: colors.cardBg,
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '20px', fontWeight: '600', color: colors.primary }}>
            {metrics?.animations?.length || 0}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.7 }}>Active Animations</div>
        </div>
        
        <div style={{
          padding: '12px',
          backgroundColor: colors.cardBg,
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '20px', fontWeight: '600', color: colors.warning }}>
            {metrics?.alerts?.filter(a => Date.now() - a.timestamp < 300000).length || 0}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.7 }}>Active Alerts</div>
        </div>
      </div>

      {metrics?.frameTimingStats && (
        <div style={{
          padding: '12px',
          backgroundColor: colors.cardBg,
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Activity size={16} color={colors.primary} />
            <span style={{ fontWeight: '500' }}>Frame Performance</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Smoothness:</span>
            <span style={{ fontWeight: '600' }}>
              {metrics.frameTimingStats.smoothnessScore.toFixed(1)}%
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Avg FPS:</span>
            <span style={{ fontWeight: '600' }}>
              {metrics.frameTimingStats.averageFPS.toFixed(1)}
            </span>
          </div>
        </div>
      )}

      {bundleAnalysis && bundleAnalysis.recommendations.length > 0 && (
        <div style={{
          padding: '12px',
          backgroundColor: colors.cardBg,
          borderRadius: '8px',
          border: `1px solid ${colors.warning}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <TrendingUp size={16} color={colors.warning} />
            <span style={{ fontWeight: '500' }}>Optimization Opportunities</span>
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>
            {bundleAnalysis.recommendations.length} recommendations
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>
            Est. savings: {bundleAnalysis.estimatedSavings}KB
          </div>
        </div>
      )}
    </div>
  );

  const renderWebVitals = () => (
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
        📊 Web Vitals
      </h3>
      
      {metrics?.webVitals && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Object.entries(metrics.webVitals).map(([key, value]: [string, any]) => {
            if (typeof value !== 'number') return null;
            
            const getBudget = (metric: string) => {
              switch (metric) {
                case 'LCP': return 1000;
                case 'FID': return 50;
                case 'CLS': return 0.1;
                case 'TTI': return 2000;
                default: return 0;
              }
            };
            
            const budget = getBudget(key);
            const isGood = value <= budget;
            
            return (
              <div key={key} style={{
                padding: '12px',
                backgroundColor: colors.cardBg,
                borderRadius: '8px',
                border: `1px solid ${isGood ? colors.primary : colors.danger}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '500' }}>{key}</span>
                  {isGood ? (
                    <CheckCircle size={16} color={colors.primary} />
                  ) : (
                    <AlertTriangle size={16} color={colors.danger} />
                  )}
                </div>
                <div style={{ fontSize: '18px', fontWeight: '600', margin: '4px 0' }}>
                  {key === 'CLS' ? value.toFixed(3) : `${value.toFixed(1)}ms`}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>
                  Budget: {key === 'CLS' ? budget.toFixed(1) : `${budget}ms`}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderAnimations = () => (
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
        🎬 Animation Performance
      </h3>
      
      {metrics?.animations && metrics.animations.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
          {metrics.animations.map((anim: any, index: number) => (
            <div key={index} style={{
              padding: '10px',
              backgroundColor: colors.cardBg,
              borderRadius: '6px',
              border: `1px solid ${anim.budgetCompliance ? colors.primary : colors.warning}`
            }}>
              <div style={{ fontWeight: '500', fontSize: '13px', marginBottom: '4px' }}>
                {anim.name}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span>Avg: {anim.average.toFixed(2)}ms</span>
                <span>P95: {anim.p95.toFixed(2)}ms</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.7 }}>
                <span>Count: {anim.count}</span>
                <span>{anim.budgetCompliance ? '✅ Budget' : '⚠️ Over budget'}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', opacity: 0.7, padding: '40px' }}>
          No animation data available
        </div>
      )}
    </div>
  );

  const renderAlerts = () => (
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
        🚨 Performance Alerts
      </h3>
      
      {metrics?.alerts && metrics.alerts.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
          {metrics.alerts.slice(-10).reverse().map((alert: any, index: number) => {
            const getSeverityColor = (severity: string) => {
              switch (severity) {
                case 'critical': return colors.danger;
                case 'high': return colors.warning;
                default: return colors.neutral;
              }
            };
            
            return (
              <div key={index} style={{
                padding: '10px',
                backgroundColor: colors.cardBg,
                borderRadius: '6px',
                border: `1px solid ${getSeverityColor(alert.severity)}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '500', fontSize: '13px' }}>
                    {alert.metric}
                  </span>
                  <span style={{ 
                    fontSize: '11px', 
                    padding: '2px 6px', 
                    borderRadius: '4px',
                    backgroundColor: getSeverityColor(alert.severity),
                    color: 'white'
                  }}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <div style={{ fontSize: '12px', marginBottom: '4px' }}>
                  {alert.impact}
                </div>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>
                  {alert.recommendation}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', opacity: 0.7, padding: '40px' }}>
          No active alerts
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Monitor },
    { id: 'vitals', label: 'Vitals', icon: Activity },
    { id: 'animations', label: 'Animations', icon: Zap },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle }
  ];

  return (
    <div style={containerStyle}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: `1px solid ${colors.neutral}`,
        backgroundColor: colors.cardBg
      }}>
        <h2 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>
          Performance Monitor
        </h2>
        <button
          onClick={() => setIsMinimized(true)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            color: colors.neutral
          }}
        >
          <Eye size={16} />
        </button>
      </div>

      <div style={{
        display: 'flex',
        borderBottom: `1px solid ${colors.neutral}`,
        backgroundColor: colors.cardBg
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            style={{
              flex: 1,
              padding: '8px 4px',
              border: 'none',
              background: selectedTab === tab.id ? colors.bg : 'transparent',
              color: selectedTab === tab.id ? colors.primary : colors.neutral,
              cursor: 'pointer',
              fontSize: '11px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'vitals' && renderWebVitals()}
        {selectedTab === 'animations' && renderAnimations()}
        {selectedTab === 'alerts' && renderAlerts()}
      </div>
    </div>
  );
};

// Development helper component
export const DevPerformanceMonitor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(() => {
    return process.env.NODE_ENV === 'development' && 
           localStorage.getItem('dev-performance-monitor') !== 'hidden';
  });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => {
          const newValue = !prev;
          localStorage.setItem('dev-performance-monitor', newValue ? 'visible' : 'hidden');
          return newValue;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <PerformanceDashboard
      isVisible={isVisible}
      theme="development"
      autoRefresh={true}
      refreshInterval={2000}
    />
  );
};

export default PerformanceDashboard;