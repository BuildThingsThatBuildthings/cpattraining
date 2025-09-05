# Troubleshooting Guide - CPAT Training Platform

## Common Issues & Solutions for Luxury Wellness Platform

This guide provides solutions for common issues that may arise during development, deployment, or usage of the therapeutic CPAT Training Platform.

## 🔧 Development Issues

### Build & Compilation Problems

#### TypeScript Compilation Errors
```bash
# Issue: TypeScript compilation fails
Error: Cannot find module '@/components/luxury' or its corresponding type declarations

# Solution: Check path aliases configuration
# Verify tsconfig.json includes correct paths:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@luxury/*": ["./src/components/luxury/*"]
    }
  }
}

# Restart TypeScript server
# VS Code: Ctrl/Cmd + Shift + P > "TypeScript: Restart TS Server"
```

#### Vite Build Failures
```bash
# Issue: Build fails with dependency errors
Error: Failed to resolve entry for package "lucide-react"

# Solution: Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use npm ci for consistent builds
npm ci
```

#### CSS Import Issues
```bash
# Issue: Therapeutic styles not loading
Error: Unknown at rule @import

# Solution: Ensure CSS imports are in correct order
# In main.tsx or index.css:
import './index.css'  // Base styles first
import './components/luxury/therapeutic.css'  // Component styles
```

### Component Development Issues

#### Therapeutic Button Not Rendering
```tsx
// Issue: TherapeuticButton shows default styling
<TherapeuticButton>Click me</TherapeuticButton>

// Problem: Missing therapeutic classes or CSS variables
// Solution: Ensure CSS variables are defined
:root {
  --sage-primary: #8FA68E;
  --sage-light: #A8C09A;
  --sage-dark: #6B7D6A;
}

// Check component implementation includes base classes
className="therapeutic-button sage-primary"
```

#### Animation Performance Issues
```css
/* Issue: Choppy therapeutic animations */
/* Problem: Not using GPU acceleration */

/* Solution: Add transform3d and will-change */
.therapeutic-breathe {
  animation: breathe 4s ease-in-out infinite;
  transform: translateZ(0); /* Force GPU layer */
  will-change: transform, opacity;
}

/* For mobile optimization */
@media (hover: none) and (pointer: coarse) {
  .therapeutic-breathe {
    animation-duration: 6s; /* Slower on mobile */
  }
}
```

#### Accessibility Issues
```tsx
// Issue: Screen readers not announcing changes
// Problem: Missing ARIA live regions

// Solution: Add proper ARIA attributes
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {statusMessage}
</div>

// Issue: Focus not visible
// Solution: Ensure focus indicators are prominent
.therapeutic-button:focus {
  outline: 3px solid var(--sage-light);
  outline-offset: 2px;
}
```

## 🎨 Styling & Design Issues

### Color Palette Problems

#### Sage Colors Not Displaying
```css
/* Issue: Default colors showing instead of sage palette */
/* Problem: CSS variables not loaded or overridden */

/* Solution: Ensure variables are defined in :root */
:root {
  --sage-primary: #8FA68E;
  --sage-light: #A8C09A;
  --sage-dark: #6B7D6A;
  --sage-mist: #E8F0E5;
  --sage-cream: #F7F5F3;
  --sage-pearl: #E6E4E0;
  --sage-gold: #D4AF37;
}

/* Check CSS specificity - use !important if necessary */
.therapeutic-button {
  background-color: var(--sage-primary) !important;
}
```

#### Contrast Ratio Issues
```bash
# Issue: Accessibility audit failing on contrast
# Tool to check contrast ratios:
npm install -g colour-contrast

# Check specific combinations
contrast-ratio #8FA68E #FFFFFF  # Should return 7.1:1 or higher

# Solution: Adjust colors or use darker/lighter variants
# For text on sage-primary background, use white or sage-dark
```

### Responsive Design Issues

#### Mobile Layout Breaking
```css
/* Issue: Components not responsive on mobile */
/* Problem: Fixed widths or inadequate breakpoints */

/* Solution: Use flexible units and proper breakpoints */
.therapeutic-card {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: clamp(16px, 4vw, 24px);
}

/* Mobile-first approach */
@media (min-width: 768px) {
  .therapeutic-card {
    max-width: 600px;
    padding: 32px;
  }
}
```

#### Touch Targets Too Small
```css
/* Issue: Buttons hard to tap on mobile */
/* Problem: Touch targets under 44px */

/* Solution: Ensure minimum touch target size */
.therapeutic-button {
  min-height: 48px;  /* Exceeds 44px minimum */
  min-width: 48px;
  padding: 12px 24px;
}

/* Add comfortable spacing between interactive elements */
.button-group > * + * {
  margin-left: 12px;
}
```

## ⚡ Performance Issues

### Slow Loading Times

#### Large Bundle Size
```bash
# Issue: Application loads slowly
# Diagnosis: Analyze bundle size
npm run build
npm install -g vite-bundle-analyzer
npx vite-bundle-analyzer dist/

# Solution: Implement code splitting
# In router configuration:
const Dashboard = lazy(() => import('./pages/Dashboard'))
const DialogueTrainer = lazy(() => import('./pages/DialogueTrainer'))

# Wrap with Suspense
<Suspense fallback={<TherapeuticLoading />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</Suspense>
```

#### Unoptimized Images
```bash
# Issue: Images loading slowly
# Solution: Optimize images

# Install imagemin for optimization
npm install -g imagemin-cli imagemin-webp

# Convert and optimize images
imagemin src/assets/**/*.{jpg,png} --out-dir=src/assets/optimized --plugin=webp

# Use picture element for responsive images
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" loading="lazy" />
</picture>
```

#### Memory Leaks
```tsx
// Issue: Application slowing down over time
// Problem: Event listeners or timers not cleaned up

// Solution: Proper cleanup in useEffect
useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth)
  window.addEventListener('resize', handleResize)
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])

// For intervals/timers
useEffect(() => {
  const interval = setInterval(() => {
    setTimer(prev => prev + 1)
  }, 1000)
  
  return () => clearInterval(interval)
}, [])
```

### Animation Performance

#### Choppy Animations
```css
/* Issue: Animations not smooth */
/* Problem: Animating expensive properties */

/* Solution: Use transform and opacity only */
/* ❌ Avoid animating these properties */
.bad-animation {
  animation: badMove 1s ease-in-out infinite;
}
@keyframes badMove {
  0% { left: 0px; width: 100px; }
  100% { left: 100px; width: 200px; }
}

/* ✅ Animate transform and opacity instead */
.good-animation {
  animation: goodMove 1s ease-in-out infinite;
  will-change: transform;
}
@keyframes goodMove {
  0% { transform: translateX(0) scale(1); opacity: 0.8; }
  100% { transform: translateX(100px) scale(1.2); opacity: 1; }
}
```

## 📱 Mobile Issues

### iOS Specific Problems

#### Safari Viewport Issues
```css
/* Issue: Layout breaking on iOS Safari */
/* Problem: 100vh includes address bar */

/* Solution: Use CSS environment variables */
.full-height {
  height: 100vh;
  height: calc(100vh - env(safe-area-inset-bottom));
}

/* Or use dvh (dynamic viewport height) if supported */
.full-height {
  height: 100dvh;
}
```

#### Touch Scrolling Issues
```css
/* Issue: Scrolling feels sticky on iOS */
/* Solution: Enable momentum scrolling */
.scrollable {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}

/* Prevent bounce scrolling if needed */
body {
  overscroll-behavior: none;
}
```

### Android Specific Problems

#### Font Rendering Issues
```css
/* Issue: Fonts look blurry on Android */
/* Solution: Add font smoothing */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

## ♿ Accessibility Issues

### Screen Reader Problems

#### Content Not Announced
```tsx
// Issue: Screen readers not reading dynamic content
// Problem: Missing live regions

// Solution: Add proper ARIA live regions
const [status, setStatus] = useState('')

// In JSX:
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {status}
</div>

// When updating status:
setStatus('Session started successfully')
```

#### Navigation Issues
```tsx
// Issue: Screen readers can't navigate efficiently
// Problem: Missing landmarks and headings

// Solution: Use semantic HTML structure
<main role="main">
  <header role="banner">
    <h1>CPAT Training Dashboard</h1>
  </header>
  
  <nav role="navigation" aria-label="Main navigation">
    <ul>
      <li><a href="/dashboard">Dashboard</a></li>
      <li><a href="/training">Training</a></li>
    </ul>
  </nav>
  
  <section>
    <h2>Current Training Modules</h2>
    {/* Content */}
  </section>
</main>
```

### Keyboard Navigation

#### Focus Trapping in Modals
```tsx
// Issue: Focus escaping from modal dialogs
// Problem: No focus management

// Solution: Implement focus trap
import { useEffect, useRef } from 'react'

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!isOpen) return
    
    const modal = modalRef.current
    if (!modal) return
    
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
    
    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      } else if (e.key === 'Escape') {
        onClose()
      }
    }
    
    modal.addEventListener('keydown', handleTab)
    firstElement.focus()
    
    return () => {
      modal.removeEventListener('keydown', handleTab)
    }
  }, [isOpen, onClose])
  
  if (!isOpen) return null
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        ref={modalRef}
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  )
}
```

## 🚀 Deployment Issues

### Build Failures

#### Environment Variables
```bash
# Issue: Build fails with undefined environment variables
# Problem: Missing or incorrectly named env vars

# Solution: Check environment variable names
# Vite requires VITE_ prefix for client-side variables
# ❌ Wrong
REACT_APP_API_URL=...

# ✅ Correct
VITE_API_URL=...

# Create .env.example with all required variables
# Copy to .env.local and configure
```

#### Asset Path Issues
```typescript
// Issue: Assets not loading in production
// Problem: Incorrect base path configuration

// Solution: Configure base in vite.config.ts
export default defineConfig({
  base: '/cpat-training-platform/',  // For subdirectory deployment
  // or base: '/' for root deployment
  
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
})
```

### Runtime Errors

#### Hydration Mismatches
```tsx
// Issue: React hydration errors
// Problem: Server and client render differently

// Solution: Ensure consistent rendering
// Use useEffect for client-only code
const [isClient, setIsClient] = useState(false)

useEffect(() => {
  setIsClient(true)
}, [])

if (!isClient) {
  return <div>Loading...</div>  // Consistent loading state
}

return <ClientSpecificComponent />
```

### Performance in Production

#### Slow API Responses
```typescript
// Issue: API calls timing out
// Problem: No timeout configuration

// Solution: Add timeout and retry logic
const fetchWithTimeout = async (url: string, options: RequestInit = {}) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  }
}
```

## 🔍 Debugging Tools

### Development Tools
```bash
# React Developer Tools
# Install browser extension for component debugging

# Performance Profiling
# Use React Profiler to identify slow components
npm run dev
# Open React DevTools > Profiler tab

# Accessibility Testing
# Install axe-core browser extension
npm install -g axe-core
```

### Testing Commands
```bash
# Run all tests
npm run test

# Build and preview locally
npm run build
npm run preview

# Check TypeScript types
npm run typecheck

# Lint code
npm run lint

# Check bundle size
npm run build:analyze
```

### Monitoring Tools
```bash
# Lighthouse audit
npm install -g lighthouse
lighthouse http://localhost:3000 --view

# Web Vitals monitoring
npm install web-vitals
# Add to your app for real-user monitoring
```

## 🆘 Emergency Procedures

### Critical Performance Issues
1. **Immediate**: Check error monitoring dashboard
2. **Quick Fix**: Disable expensive animations temporarily
3. **Rollback**: Revert to previous stable version if needed
4. **Investigation**: Profile performance bottlenecks
5. **Fix**: Apply targeted optimizations

### Accessibility Violations
1. **Assessment**: Run automated accessibility scan
2. **Prioritization**: Focus on critical violations first
3. **Quick Fixes**: Color contrast and keyboard navigation
4. **Testing**: Verify with screen readers
5. **Documentation**: Update accessibility guide

### Security Issues
1. **Immediate**: Update dependencies with vulnerabilities
2. **CSP**: Ensure Content Security Policy is active
3. **Headers**: Verify security headers are set
4. **Audit**: Run security audit with npm audit
5. **Monitoring**: Set up security monitoring alerts

## 📞 Getting Help

### Community Resources
- **React Documentation**: https://react.dev
- **Vite Documentation**: https://vitejs.dev
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/Understanding/
- **MDN Web Docs**: https://developer.mozilla.org

### Professional Support
- **Accessibility Consultants**: For WCAG compliance
- **Performance Experts**: For optimization issues
- **React Specialists**: For complex component problems
- **Mental Health UX**: For therapeutic design guidance

### Internal Escalation
1. **Development Issues**: Technical team lead
2. **Design Issues**: UX/UI design team
3. **Accessibility Issues**: Accessibility specialist
4. **Performance Issues**: DevOps/Performance team
5. **User Experience**: Product manager

---

**Remember: The therapeutic nature of this platform means that any issue affecting user experience could impact someone's mental wellness training. Treat every problem with the urgency and care it deserves.**

*When in doubt, prioritize accessibility, performance, and user safety over feature complexity.*