import React, { useState } from 'react'

interface TherapeuticInputProps {
  label?: string
  type?: 'text' | 'email' | 'textarea' | 'select'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  className?: string
  options?: string[]
  rows?: number
  validation?: boolean
  errorMessage?: string
  id?: string
  name?: string
  autoComplete?: string
  ariaDescribedBy?: string
}

const TherapeuticInput: React.FC<TherapeuticInputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  options = [],
  rows = 3,
  validation = false,
  errorMessage,
  id,
  name,
  autoComplete,
  ariaDescribedBy
}) => {
  const [focused, setFocused] = useState(false)
  const [touched, setTouched] = useState(false)
  
  const hasError = validation && touched && !value && required
  
  const inputId = id || `therapeutic-input-${Math.random().toString(36).substr(2, 9)}`
  const errorId = `${inputId}-error`
  const successId = `${inputId}-success`
  
  const baseInputStyles = {
    width: '100%',
    padding: '14px 16px',
    border: `2px solid ${hasError ? '#C8856A' : focused ? '#8FA68E' : 'rgba(143, 166, 142, 0.2)'}`,
    borderRadius: '12px',
    background: focused 
      ? 'rgba(232, 240, 229, 0.8)' 
      : 'rgba(247, 245, 243, 0.9)',
    fontSize: '16px', // Prevents zoom on iOS
    fontFamily: 'Inter, sans-serif',
    color: '#6B7D6A',
    transition: 'all 0.3s ease',
    outline: 'none',
    backdropFilter: 'blur(10px)',
    boxShadow: focused 
      ? '0 4px 16px -4px rgba(143, 166, 142, 0.2), 0 0 0 1px rgba(143, 166, 142, 0.1)' 
      : '0 2px 8px -2px rgba(143, 166, 142, 0.1)',
    minHeight: type === 'textarea' ? 'auto' : '48px'
  }
  
  const labelStyles = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: hasError ? '#C8856A' : '#8FA68E',
    transition: 'color 0.3s ease'
  }

  const renderInput = () => {
    const commonProps = {
      id: inputId,
      name: name || inputId,
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => 
        onChange(e.target.value),
      onFocus: () => setFocused(true),
      onBlur: () => {
        setFocused(false)
        setTouched(true)
      },
      placeholder,
      style: baseInputStyles,
      className: `therapeutic-input ${className}`,
      'aria-invalid': hasError,
      'aria-describedby': [
        ariaDescribedBy,
        hasError ? errorId : null,
        validation && touched && value && required ? successId : null
      ].filter(Boolean).join(' ') || undefined,
      autoComplete,
      required
    }

    switch (type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={rows}
            style={{
              ...baseInputStyles,
              minHeight: `${Math.max(rows * 1.5, 3)}em`,
              resize: 'vertical'
            }}
          />
        )
        
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">{placeholder || 'Select an option...'}</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
        
      default:
        return <input {...commonProps} type={type} />
    }
  }

  return (
    <div className="therapeutic-form-group mb-4 sm:mb-6">
      {label && (
        <label 
          htmlFor={inputId}
          style={labelStyles}
        >
          {label}
          {required && <span className="ml-1 text-therapeutic-gold" aria-label="required">*</span>}
        </label>
      )}
      
      <div className="relative">
        {renderInput()}
        
        {/* Therapeutic focus indicator */}
        <div 
          className="absolute bottom-0 left-4 right-4 h-0.5 transition-all duration-300 rounded-full"
          style={{
            background: focused 
              ? 'linear-gradient(135deg, #A8C09A, #8FA68E)' 
              : 'transparent',
            transform: `scaleX(${focused ? 1 : 0})`,
            transformOrigin: 'center'
          }}
        />
        
        {/* Gentle glow effect */}
        {focused && (
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 192, 154, 0.05), rgba(143, 166, 142, 0.05))',
              opacity: focused ? 1 : 0
            }}
          />
        )}
      </div>
      
      {/* Error message with therapeutic approach */}
      {hasError && errorMessage && (
        <div 
          id={errorId}
          className="mt-2 text-sm font-medium flex items-center gap-2 animate-fade-in"
          style={{ color: '#C8856A' }}
          role="alert"
          aria-live="polite"
        >
          <span className="w-4 h-4 flex-shrink-0" aria-hidden="true">⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}
      
      {/* Success indicator */}
      {validation && touched && value && required && (
        <div 
          id={successId}
          className="mt-2 text-sm font-medium flex items-center gap-2 animate-fade-in"
          style={{ color: '#8FA68E' }}
          aria-live="polite"
        >
          <span className="w-4 h-4 flex-shrink-0" aria-hidden="true">✓</span>
          <span>Looking good</span>
        </div>
      )}
      
      <style>{`
        .therapeutic-input::placeholder {
          color: rgba(143, 166, 142, 0.6);
          font-style: italic;
        }
        
        .therapeutic-input:focus::placeholder {
          color: rgba(143, 166, 142, 0.4);
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

export default TherapeuticInput