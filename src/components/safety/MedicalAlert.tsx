import React from 'react';
import { AlertTriangle, Shield, Info } from 'lucide-react';
import ClinicalCallout from '../core/ClinicalCallout';

export interface MedicalAlertProps {
  type: 'contraindication' | 'caution' | 'note';
  title: string;
  children: React.ReactNode;
  className?: string;
}

const MedicalAlert: React.FC<MedicalAlertProps> = ({
  type,
  title,
  children,
  className = ""
}) => {
  const alertConfig = {
    contraindication: {
      variant: 'emphasised' as const,
      calloutType: 'safety' as const,
      icon: <AlertTriangle size={24} className="text-red-600" />,
      bgColor: 'bg-red-600/10',
      borderColor: 'border-red-600/30',
      titleColor: 'text-red-400'
    },
    caution: {
      variant: 'default' as const,
      calloutType: 'warning' as const,
      icon: <Shield size={20} className="text-yellow-600" />,
      bgColor: 'bg-yellow-600/10',
      borderColor: 'border-yellow-600/30',
      titleColor: 'text-yellow-400'
    },
    note: {
      variant: 'subtle' as const,
      calloutType: 'info' as const,
      icon: <Info size={18} className="text-blue-500" />,
      bgColor: 'bg-blue-500/5',
      borderColor: 'border-blue-500/20',
      titleColor: 'text-blue-400'
    }
  };

  const config = alertConfig[type];

  return (
    <ClinicalCallout
      type={config.calloutType}
      title={title}
      variant={config.variant}
      icon={config.icon}
      className={className}
    >
      {children}
      
      {/* Add severity indicator */}
      <div className="mt-4 pt-3 border-t border-current/10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold opacity-75">
          {config.icon}
          <span>
            {type === 'contraindication' && 'CONTRAINDICATION - CRITICAL'}
            {type === 'caution' && 'CAUTION - IMPORTANT'}
            {type === 'note' && 'NOTE - INFORMATIONAL'}
          </span>
        </div>
      </div>
    </ClinicalCallout>
  );
};

// Pre-configured components for easy use
export const ContraindicationAlert: React.FC<Omit<MedicalAlertProps, 'type'>> = (props) => (
  <MedicalAlert type="contraindication" {...props} />
);

export const CautionAlert: React.FC<Omit<MedicalAlertProps, 'type'>> = (props) => (
  <MedicalAlert type="caution" {...props} />
);

export const NoteAlert: React.FC<Omit<MedicalAlertProps, 'type'>> = (props) => (
  <MedicalAlert type="note" {...props} />
);

export default MedicalAlert;