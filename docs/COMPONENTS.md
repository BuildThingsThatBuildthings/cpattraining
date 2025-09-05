# Therapeutic Component Development Guide

## Building Luxury Components for Mental Health Applications

This guide provides comprehensive documentation for developing, customizing, and extending the therapeutic component library used in the CPAT Training Platform.

## 🎨 Design Philosophy

### Therapeutic Design Principles
1. **Calming Aesthetics**: Colors and animations that reduce stress
2. **Cognitive Ease**: Simplified interfaces that don't overwhelm
3. **Professional Trust**: Sophisticated design that builds confidence
4. **Accessibility First**: WCAG 2.1 AA+ compliance built-in
5. **Evidence-Based UX**: Patterns proven effective in mental health

### Color Psychology Implementation
```css
/* Sage palette promotes calm and focus */
:root {
  --therapeutic-sage: #8FA68E;     /* Primary - calming, trustworthy */
  --therapeutic-sage-light: #A8C09A; /* Hover - encouraging, gentle */
  --therapeutic-sage-dark: #6B7D6A;  /* Active - grounding, stable */
  
  --therapeutic-mist: #E8F0E5;     /* Background - soft, peaceful */
  --therapeutic-cream: #F7F5F3;    /* Surface - warm, welcoming */
  --therapeutic-pearl: #E6E4E0;    /* Border - subtle, elegant */
  --therapeutic-gold: #D4AF37;     /* Accent - premium, confidence */
}
```

## 🧩 Core Component Library

### TherapeuticButton

#### Basic Implementation
```tsx
import React from 'react'

interface TherapeuticButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export const TherapeuticButton: React.FC<TherapeuticButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium transition-all duration-300
    focus:outline-none focus:ring-4 focus:ring-sage-light/50
    disabled:opacity-50 disabled:cursor-not-allowed
    rounded-xl shadow-soft hover:shadow-medium
  `
  
  const variants = {
    primary: `
      bg-gradient-sage text-white
      hover:shadow-lg hover:scale-[1.02]
      active:scale-[0.98]
    `,
    secondary: `
      bg-therapeutic-pearl text-sage-dark
      hover:bg-therapeutic-mist
      border border-therapeutic-sage/20
    `,
    ghost: `
      text-sage-primary
      hover:bg-therapeutic-mist/50
    `
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
      ) : (
        children
      )}
    </button>
  )
}
```

#### Usage Examples
```tsx
// Primary action button
<TherapeuticButton variant="primary" size="lg">
  Begin Training Session
</TherapeuticButton>

// Secondary action
<TherapeuticButton variant="secondary" size="md">
  Save Progress
</TherapeuticButton>

// Loading state
<TherapeuticButton variant="primary" loading>
  Processing...
</TherapeuticButton>
```

### TherapeuticCard

#### Implementation
```tsx
interface TherapeuticCardProps {
  title?: string
  variant?: 'default' | 'premium' | 'floating'
  animation?: 'breathe' | 'float' | 'none'
  children: React.ReactNode
  className?: string
}

export const TherapeuticCard: React.FC<TherapeuticCardProps> = ({
  title,
  variant = 'default',
  animation = 'none',
  children,
  className = ''
}) => {
  const baseStyles = `
    bg-therapeutic-cream rounded-2xl
    transition-all duration-500 ease-out
    border border-therapeutic-pearl/50
  `
  
  const variants = {
    default: 'p-6 shadow-soft',
    premium: 'p-8 shadow-medium bg-gradient-luxury',
    floating: 'p-6 shadow-strong hover:shadow-xl'
  }
  
  const animations = {
    breathe: 'animate-therapeutic-breathe',
    float: 'animate-therapeutic-float',
    none: ''
  }

  return (
    <div className={`${baseStyles} ${variants[variant]} ${animations[animation]} ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold text-sage-dark mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
```

### TherapeuticProgress

#### Implementation
```tsx
interface TherapeuticProgressProps {
  value: number
  max?: number
  variant?: 'sage' | 'premium' | 'minimal'
  showPercentage?: boolean
  therapeutic?: boolean
  label?: string
}

export const TherapeuticProgress: React.FC<TherapeuticProgressProps> = ({
  value,
  max = 100,
  variant = 'sage',
  showPercentage = false,
  therapeutic = false,
  label
}) => {
  const percentage = Math.min((value / max) * 100, 100)
  
  const variants = {
    sage: 'bg-gradient-sage',
    premium: 'bg-gradient-to-r from-therapeutic-gold to-sage-light',
    minimal: 'bg-sage-primary'
  }
  
  return (
    <div className="w-full" role="progressbar" aria-valuenow={value} aria-valuemax={max}>
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-sage-dark">{label}</span>
          {showPercentage && (
            <span className="text-sm text-sage-primary">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      
      <div className="w-full bg-therapeutic-mist rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${variants[variant]} transition-all duration-${therapeutic ? '2000' : '300'} ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
```

## 🎯 Advanced Components

### TherapeuticNotification

#### Hook Implementation
```tsx
import { useState, useCallback } from 'react'

interface NotificationOptions {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number | 'therapeutic'
  action?: {
    label: string
    onClick: () => void
  }
}

export const useTherapeuticNotification = () => {
  const [notifications, setNotifications] = useState<NotificationOptions[]>([])
  
  const showNotification = useCallback((options: NotificationOptions) => {
    const duration = options.duration === 'therapeutic' ? 4000 : (options.duration || 3000)
    
    setNotifications(prev => [...prev, options])
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n !== options))
    }, duration)
  }, [])
  
  return { notifications, showNotification }
}
```

### TherapeuticLoadingState

#### Implementation
```tsx
interface TherapeuticLoadingProps {
  message?: string
  variant?: 'breathe' | 'pulse' | 'shimmer'
  size?: 'sm' | 'md' | 'lg'
}

export const TherapeuticLoading: React.FC<TherapeuticLoadingProps> = ({
  message = "Loading...",
  variant = 'breathe',
  size = 'md'
}) => {
  const variants = {
    breathe: 'animate-therapeutic-breathe',
    pulse: 'animate-pulse',
    shimmer: 'animate-therapeutic-shimmer'
  }
  
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizes[size]} ${variants[variant]} mb-4`}>
        <div className="w-full h-full rounded-full bg-gradient-sage opacity-80" />
      </div>
      <p className="text-sage-primary font-medium">{message}</p>
    </div>
  )
}
```

## 🎨 Styling System

### CSS Custom Properties
```css
/* Animation Durations - Therapeutic Timing */
:root {
  --therapeutic-fast: 200ms;      /* Quick feedback */
  --therapeutic-normal: 300ms;    /* Standard interactions */
  --therapeutic-slow: 500ms;      /* Gentle transitions */
  --therapeutic-breath: 4s;       /* Breathing rhythm */
  --therapeutic-float: 6s;        /* Floating animation */
}

/* Spacing Scale - Golden Ratio Based */
:root {
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2.5rem;    /* 40px */
  --space-2xl: 4rem;     /* 64px */
  --space-3xl: 6.5rem;   /* 104px */
}

/* Shadow System */
:root {
  --shadow-soft: 0 4px 12px -2px rgba(143, 166, 142, 0.15);
  --shadow-medium: 0 8px 32px -8px rgba(143, 166, 142, 0.2);
  --shadow-strong: 0 16px 48px -12px rgba(143, 166, 142, 0.25);
  --shadow-premium: 0 24px 64px -16px rgba(143, 166, 142, 0.3);
}
```

### Therapeutic Animations
```css
/* Breathing Animation - Reduces Anxiety */
@keyframes therapeuticBreathe {
  0%, 100% { 
    transform: scale(1); 
    opacity: 0.8; 
  }
  50% { 
    transform: scale(1.02); 
    opacity: 1; 
  }
}

/* Floating Animation - Gentle Movement */
@keyframes therapeuticFloat {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-8px) rotate(2deg); 
  }
}

/* Shimmer Effect - Premium Loading */
@keyframes therapeuticShimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

/* Utility Classes */
.animate-therapeutic-breathe {
  animation: therapeuticBreathe var(--therapeutic-breath) ease-in-out infinite;
}

.animate-therapeutic-float {
  animation: therapeuticFloat var(--therapeutic-float) ease-in-out infinite;
}

.animate-therapeutic-shimmer {
  animation: therapeuticShimmer 3s ease-in-out infinite;
}
```

## 📱 Responsive Design Patterns

### Breakpoint System
```css
/* Mobile-First Breakpoints */
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Responsive Utilities */
@media (max-width: 640px) {
  .therapeutic-button {
    min-height: 48px; /* Larger touch targets on mobile */
  }
  
  .therapeutic-card {
    padding: 1rem; /* Reduced padding on mobile */
  }
}
```

### Touch-Friendly Design
```css
/* Enhanced Touch Targets */
.therapeutic-interactive {
  min-height: 44px;
  min-width: 44px;
  touch-action: manipulation;
}

/* Mobile-Optimized Animations */
@media (hover: none) and (pointer: coarse) {
  .therapeutic-hover-effect:hover {
    transform: none; /* Disable hover transforms on touch devices */
  }
}
```

## ♿ Accessibility Integration

### Focus Management
```tsx
// Focus trap for modals
import { useEffect, useRef } from 'react'

const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return
    
    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
    
    firstElement?.focus()
    
    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }
    
    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isActive])
  
  return containerRef
}
```

### ARIA Patterns
```tsx
// Therapeutic Progress with full ARIA support
export const AccessibleProgress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  description
}) => {
  const percentage = Math.round((value / max) * 100)
  
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label id="progress-label" className="text-sm font-medium">
          {label}
        </label>
        <span id="progress-description" className="text-sm text-gray-600">
          {description}
        </span>
      </div>
      
      <div
        role="progressbar"
        aria-labelledby="progress-label"
        aria-describedby="progress-description"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuetext={`${percentage}% complete`}
        className="w-full bg-gray-200 rounded-full h-2"
      >
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
```

## 🧪 Testing Components

### Component Testing Template
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { TherapeuticButton } from './TherapeuticButton'

expect.extend(toHaveNoViolations)

describe('TherapeuticButton', () => {
  it('renders with therapeutic styling', () => {
    render(<TherapeuticButton>Click me</TherapeuticButton>)
    const button = screen.getByRole('button', { name: /click me/i })
    
    expect(button).toHaveClass('therapeutic-button')
    expect(button).toBeInTheDocument()
  })
  
  it('handles loading state', () => {
    render(<TherapeuticButton loading>Processing</TherapeuticButton>)
    const button = screen.getByRole('button')
    
    expect(button).toBeDisabled()
    expect(screen.getByRole('status')).toBeInTheDocument() // Loading spinner
  })
  
  it('meets accessibility requirements', async () => {
    const { container } = render(
      <TherapeuticButton>Accessible Button</TherapeuticButton>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
  
  it('supports keyboard navigation', () => {
    const handleClick = jest.fn()
    render(<TherapeuticButton onClick={handleClick}>Click me</TherapeuticButton>)
    
    const button = screen.getByRole('button')
    
    // Test Enter key
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
    expect(handleClick).toHaveBeenCalledTimes(1)
    
    // Test Space key
    fireEvent.keyDown(button, { key: ' ', code: 'Space' })
    expect(handleClick).toHaveBeenCalledTimes(2)
  })
})
```

## 📈 Performance Considerations

### Optimization Strategies
```tsx
// Lazy loading for heavy components
import { lazy, Suspense } from 'react'
import { TherapeuticLoading } from './TherapeuticLoading'

const HeavyChart = lazy(() => import('./HeavyChart'))

export const ChartContainer = () => (
  <Suspense fallback={<TherapeuticLoading message="Loading chart..." />}>
    <HeavyChart />
  </Suspense>
)
```

### Memory Management
```tsx
// Proper cleanup in components
import { useEffect, useCallback } from 'react'

export const TherapeuticTimer = ({ onComplete }: { onComplete: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  
  const tick = useCallback(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        onComplete()
        return 0
      }
      return prev - 1
    })
  }, [onComplete])
  
  useEffect(() => {
    if (timeLeft <= 0) return
    
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [timeLeft, tick])
  
  return (
    <div className="therapeutic-timer">
      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
    </div>
  )
}
```

## 🚀 Deployment & Build

### Component Library Build
```bash
# Build component library
npm run build:components

# Generate type definitions
npm run build:types

# Create component documentation
npm run docs:generate
```

### Tree Shaking Optimization
```tsx
// Individual component exports for tree shaking
export { TherapeuticButton } from './TherapeuticButton'
export { TherapeuticCard } from './TherapeuticCard'
export { TherapeuticProgress } from './TherapeuticProgress'
export { TherapeuticLoading } from './TherapeuticLoading'
export { TherapeuticNotification } from './TherapeuticNotification'

// Utility exports
export * from './utils/accessibility'
export * from './utils/performance'
export * from './types'
```

## 📚 Best Practices

### Component Guidelines
1. **Single Responsibility**: Each component has one clear purpose
2. **Composability**: Components work well together
3. **Consistency**: Follow established patterns
4. **Accessibility**: WCAG 2.1 AA+ compliance built-in
5. **Performance**: Optimized for mobile devices
6. **Testing**: Comprehensive test coverage
7. **Documentation**: Clear usage examples

### Code Quality
```tsx
// Use TypeScript for better DX
interface ComponentProps {
  /** Primary content of the component */
  children: React.ReactNode
  /** Visual style variant */
  variant?: 'default' | 'premium'
  /** Additional CSS classes */
  className?: string
}

// Provide default props
const defaultProps: Partial<ComponentProps> = {
  variant: 'default',
  className: ''
}

// Use meaningful prop names
export const TherapeuticComponent: React.FC<ComponentProps> = ({
  children,
  variant = 'default',
  className = '',
  ...rest
}) => {
  // Implementation
}
```

---

**Building therapeutic interfaces requires attention to both technical excellence and human compassion.**  
Every component should contribute to a calming, trustworthy, and accessible experience.