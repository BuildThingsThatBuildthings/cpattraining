import React from 'react'
import { AlertTriangle, Info, CheckCircle, XCircle, Shield, Brain, Heart, Users } from 'lucide-react'

interface ClinicalCalloutProps {
  type: 'safety' | 'cpat' | 'practice' | 'tcm' | 'info' | 'warning' | 'success' | 'error'
  title?: string
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
  variant?: 'default' | 'subtle' | 'emphasised'
}

const ClinicalCallout: React.FC<ClinicalCalloutProps> = ({
  type,
  title,
  children,
  icon,
  className = "",
  variant = 'default'
}) => {
  const getCalloutConfig = () => {
    const configs = {
      safety: {
        icon: AlertTriangle,
        title: 'Safety',
        borderColor: 'border-l-red-600',
        bgColor: 'bg-red-600/5',
        iconColor: 'text-red-600',
        titleColor: 'text-red-400',
        textColor: 'text-red-200'
      },
      cpat: {
        icon: Brain,
        title: 'CPAT',
        borderColor: 'border-l-sage-600',
        bgColor: 'bg-sage-600/5',
        iconColor: 'text-sage-600',
        titleColor: 'text-sage-400',
        textColor: 'text-sage-200'
      },
      practice: {
        icon: Heart,
        title: 'Practice',
        borderColor: 'border-l-blue-600',
        bgColor: 'bg-blue-600/5',
        iconColor: 'text-blue-600',
        titleColor: 'text-blue-400',
        textColor: 'text-blue-200'
      },
      tcm: {
        icon: Users,
        title: 'TCM',
        borderColor: 'border-l-green-600',
        bgColor: 'bg-green-600/5',
        iconColor: 'text-green-600',
        titleColor: 'text-green-400',
        textColor: 'text-green-200'
      },
      info: {
        icon: Info,
        title: 'Information',
        borderColor: 'border-l-blue-500',
        bgColor: 'bg-blue-500/5',
        iconColor: 'text-blue-500',
        titleColor: 'text-blue-400',
        textColor: 'text-blue-200'
      },
      warning: {
        icon: AlertTriangle,
        title: 'Warning',
        borderColor: 'border-l-yellow-600',
        bgColor: 'bg-yellow-600/5',
        iconColor: 'text-yellow-600',
        titleColor: 'text-yellow-400',
        textColor: 'text-yellow-200'
      },
      success: {
        icon: CheckCircle,
        title: 'Success',
        borderColor: 'border-l-green-500',
        bgColor: 'bg-green-500/5',
        iconColor: 'text-green-500',
        titleColor: 'text-green-400',
        textColor: 'text-green-200'
      },
      error: {
        icon: XCircle,
        title: 'Error',
        borderColor: 'border-l-red-500',
        bgColor: 'bg-red-500/5',
        iconColor: 'text-red-500',
        titleColor: 'text-red-400',
        textColor: 'text-red-200'
      }
    }
    
    return configs[type]
  }

  const config = getCalloutConfig()
  const IconComponent = icon ? () => <>{icon}</> : config.icon
  const displayTitle = title || config.title

  const variantStyles = {
    default: "p-6 rounded-xl border backdrop-blur-sm",
    subtle: "p-4 rounded-lg border-l-4 border-r-0 border-t-0 border-b-0",
    emphasised: "p-8 rounded-2xl border-2 shadow-lg"
  }

  const getBorderStyle = () => {
    switch (variant) {
      case 'subtle':
        return config.borderColor
      case 'emphasised':
        return config.borderColor.replace('border-l-', 'border-')
      default:
        return `${config.borderColor} border-slate-700/50`
    }
  }

  const getBackgroundStyle = () => {
    switch (variant) {
      case 'subtle':
        return `${config.bgColor} bg-slate-800/30`
      case 'emphasised':
        return `${config.bgColor} bg-slate-800/50`
      default:
        return `${config.bgColor} bg-slate-800/40`
    }
  }

  return (
    <div 
      className={`
        ${variantStyles[variant]}
        ${getBorderStyle()}
        ${getBackgroundStyle()}
        transition-all duration-300 hover:shadow-lg
        ${type === 'safety' ? 'hover:shadow-red-600/10' : ''}
        ${type === 'cpat' ? 'hover:shadow-sage-600/10' : ''}
        ${type === 'practice' ? 'hover:shadow-blue-600/10' : ''}
        ${type === 'tcm' ? 'hover:shadow-green-600/10' : ''}
        ${className}
      `}
      role="note"
      aria-label={`${displayTitle} callout`}
      data-whimsy="clinical-callout"
    >
      {/* Header with Icon and Title */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          <IconComponent size={variant === 'emphasised' ? 24 : 20} />
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold ${config.titleColor} ${variant === 'emphasised' ? 'text-lg' : 'text-base'} uppercase tracking-wider`}>
            {displayTitle}
          </h4>
        </div>
        
        {/* Type-specific badge */}
        {type === 'safety' && (
          <div className="flex-shrink-0">
            <Shield size={16} className="text-red-600/60" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`prose prose-sm max-w-none ${config.textColor}`}>
        {typeof children === 'string' ? (
          <p className="mb-0 leading-relaxed">{children}</p>
        ) : (
          children
        )}
      </div>

      {/* Special safety emphasis */}
      {type === 'safety' && (
        <div className="mt-4 pt-4 border-t border-red-600/20">
          <div className="flex items-center gap-2 text-xs text-red-300">
            <AlertTriangle size={14} />
            <span className="uppercase tracking-wide font-medium">
              Always prioritize patient safety and clinical protocols
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

// Pre-configured callout components for common use cases
export const SafetyCallout: React.FC<Omit<ClinicalCalloutProps, 'type'>> = (props) => (
  <ClinicalCallout type="safety" {...props} />
)

export const CPATCallout: React.FC<Omit<ClinicalCalloutProps, 'type'>> = (props) => (
  <ClinicalCallout type="cpat" {...props} />
)

export const PracticeCallout: React.FC<Omit<ClinicalCalloutProps, 'type'>> = (props) => (
  <ClinicalCallout type="practice" {...props} />
)

export const TCMCallout: React.FC<Omit<ClinicalCalloutProps, 'type'>> = (props) => (
  <ClinicalCallout type="tcm" {...props} />
)

export default ClinicalCallout