import React, { useEffect, useRef } from 'react'
import { Clock, CheckCircle, Lock, Play, ArrowRight } from 'lucide-react'
import { enhanceModuleCard } from '../../utils/whimsicalInteractions'

interface ModuleCardProps {
  title: string
  description?: string
  outcome: string
  duration: string
  status: 'locked' | 'available' | 'in-progress' | 'completed'
  progress?: number // 0-100
  moduleNumber?: number
  imageSrc?: string
  onStart?: () => void
  onContinue?: () => void
  onReview?: () => void
  className?: string
  variant?: 'default' | 'compact' | 'detailed'
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  outcome,
  duration,
  status,
  progress = 0,
  moduleNumber,
  imageSrc: _imageSrc, // eslint-disable-line @typescript-eslint/no-unused-vars
  onStart,
  onContinue,
  onReview,
  className = "",
  variant = 'default'
}) => {
  const getStatusConfig = () => {
    const configs = {
      locked: {
        icon: Lock,
        label: 'Locked',
        bgColor: 'bg-slate-900',
        borderColor: 'border-slate-700',
        textColor: 'text-slate-600',
        badgeColor: 'bg-slate-700 text-slate-400',
        actionDisabled: true,
        actionText: 'Locked'
      },
      available: {
        icon: Play,
        label: 'Available',
        bgColor: 'bg-slate-800',
        borderColor: 'border-slate-600 hover:border-sage-600',
        textColor: 'text-text-primary',
        badgeColor: 'bg-sage-700/20 text-sage-600',
        actionDisabled: false,
        actionText: 'Start Module'
      },
      'in-progress': {
        icon: Play,
        label: 'In Progress',
        bgColor: 'bg-slate-800',
        borderColor: 'border-sage-600',
        textColor: 'text-text-primary',
        badgeColor: 'bg-sage-700 text-text-primary',
        actionDisabled: false,
        actionText: 'Continue'
      },
      completed: {
        icon: CheckCircle,
        label: 'Completed',
        bgColor: 'bg-slate-800',
        borderColor: 'border-sage-700',
        textColor: 'text-text-primary',
        badgeColor: 'bg-sage-700 text-text-primary',
        actionDisabled: false,
        actionText: 'Review'
      }
    }
    
    return configs[status]
  }

  const statusConfig = getStatusConfig()
  const StatusIcon = statusConfig.icon

  const handleAction = () => {
    switch (status) {
      case 'available':
        onStart?.()
        break
      case 'in-progress':
        onContinue?.()
        break
      case 'completed':
        onReview?.()
        break
      default:
        break
    }
  }

  const cardRef = useRef<HTMLDivElement>(null)
  
  const cardSizeClass = {
    compact: 'p-4',
    default: 'p-6',
    detailed: 'p-8'
  }
  
  // Initialize luxury interactions
  useEffect(() => {
    if (cardRef.current) {
      enhanceModuleCard(cardRef.current)
    }
  }, [status])

  return (
    <div 
      ref={cardRef}
      className={`
        relative group luxury-card
        ${status !== 'locked' ? 'hover:shadow-sage hover:-translate-y-2' : ''}
        rounded-2xl ${cardSizeClass[variant]}
        transition-all duration-300
        ${status === 'locked' ? 'opacity-60' : ''}
        overflow-hidden
        ${className}
      `}
      data-whimsy="module-card"
      data-status={status}
      style={{
        background: status === 'locked' 
          ? 'linear-gradient(135deg, rgba(26, 32, 40, 0.7), rgba(36, 43, 52, 0.6))' 
          : status === 'completed'
          ? 'linear-gradient(135deg, rgba(26, 32, 40, 0.95), rgba(214, 194, 155, 0.03))'
          : status === 'in-progress'
          ? 'linear-gradient(135deg, rgba(26, 32, 40, 0.95), rgba(93, 142, 117, 0.03))'
          : 'linear-gradient(135deg, rgba(26, 32, 40, 0.95), rgba(36, 43, 52, 0.9))',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(93, 142, 117, 0.15)'
      }}
    >
      {/* Simplified Progress Bar */}
      {status === 'in-progress' && progress > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800/20 rounded-t-2xl overflow-hidden">
          <div 
            className="h-full transition-all duration-700 ease-out bg-gradient-to-r from-sage-600 to-sage-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Module Number */}
          {moduleNumber && (
            <div className="flex-shrink-0 w-8 h-8 bg-slate-700/40 rounded-lg flex items-center justify-center text-slate-400 font-medium text-xs">
              {moduleNumber.toString().padStart(2, '0')}
            </div>
          )}
          
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-medium ${statusConfig.badgeColor}`}>
            <StatusIcon size={12} />
            <span>{statusConfig.label}</span>
          </div>
        </div>

      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Title */}
        <h3 className={`font-semibold ${statusConfig.textColor} ${variant === 'detailed' ? 'text-lg' : variant === 'compact' ? 'text-sm' : 'text-base'}`}>
          {title}
        </h3>

        {/* Description (if variant allows) */}
        {variant !== 'compact' && description && (
          <p className="text-slate-400 text-sm leading-relaxed">
            {description}
          </p>
        )}

        {/* Outcome */}
        <div className="space-y-1">
          <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wide">
            Learning Outcome
          </h4>
          <p className={`text-xs ${status === 'locked' ? 'text-slate-600' : 'text-slate-400'} leading-relaxed`}>
            {outcome}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-3 text-slate-500 text-xs">
          <div className="flex items-center gap-1.5">
            <Clock size={12} />
            <span>{duration}</span>
          </div>
          
          {status === 'in-progress' && progress > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-sage-600 rounded-full"></div>
              <span>{progress}% Complete</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4">
        <button
          onClick={handleAction}
          disabled={statusConfig.actionDisabled}
          className={`
            group/btn w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm therapeutic-focus-ring transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800
            ${statusConfig.actionDisabled 
              ? 'bg-slate-800 border border-slate-700 text-slate-600 cursor-not-allowed' 
              : status === 'completed'
                ? 'bg-slate-700 hover:bg-sage-700 border border-slate-600 hover:border-sage-600 text-slate-300 hover:text-text-primary focus:ring-sage-600'
                : 'bg-sage-700 hover:bg-sage-600 text-text-primary hover:shadow-sage focus:ring-sage-600'
            }
          `}
        >
          <span>{statusConfig.actionText}</span>
          {!statusConfig.actionDisabled && (
            <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
          )}
        </button>
      </div>

      {/* Simplified locked overlay */}
      {status === 'locked' && (
        <div className="absolute inset-0 bg-slate-900/40 rounded-2xl"></div>
      )}
    </div>
  )
}

export default ModuleCard