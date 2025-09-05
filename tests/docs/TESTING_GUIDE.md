# 🧪 CPAT Training Platform - Testing Excellence Guide

> **Clinical Reliability Through Comprehensive Testing**  
> Ensuring therapeutic user experience and luxury component standards

## 🎯 Testing Philosophy

The CPAT Training Platform maintains the highest standards of clinical reliability through a comprehensive testing approach that validates:

- **🏥 Clinical Reliability**: Every therapeutic scenario functions correctly
- **♿ Universal Accessibility**: WCAG 2.1 AA compliance for all users
- **✨ Luxury User Experience**: Premium interactions with whimsical delights
- **🔒 Security Compliance**: Healthcare-grade security standards

## 📋 Testing Pyramid

```
         /\
        /E2E\      <- Clinical User Journeys (Playwright)
       /------\
      /Visual \ <- Regression Testing (Screenshots)
     /--------\
    /Integration\ <- API & Component Integration
   /------------\
  /   Unit Tests  \ <- Component Logic & Utilities (Vitest)
 /----------------\
```

## 🚀 Quick Start

### Prerequisites
```bash
# Install dependencies
npm install

# Install Playwright browsers
npm run test:install
```

### Running Tests

```bash
# All tests
npm run test:all

# Unit tests only
npm test                    # Watch mode
npm run test:unit          # Single run
npm run test:unit:coverage # With coverage

# End-to-end tests
npm run test:e2e           # All browsers
npm run test:e2e:headed    # See browser
npm run test:e2e:debug     # Debug mode

# Specific test suites
npm run test:therapeutic   # Clinical user journeys
npm run test:accessibility # WCAG compliance
npm run test:performance   # Web Vitals & luxury standards
npm run test:luxury        # Combined accessibility + performance
```

## 📁 Test Structure

```
tests/
├── e2e/                           # End-to-end tests
│   ├── therapeutic-user-journeys.spec.ts  # Clinical scenarios
│   ├── accessibility-compliance.spec.ts   # WCAG 2.1 AA testing
│   ├── performance-testing.spec.ts        # Web Vitals & luxury UX
│   ├── global-setup.ts                    # Test environment setup
│   └── global-teardown.ts                 # Cleanup and reporting
├── docs/                          # Testing documentation
│   ├── TESTING_GUIDE.md                  # This file
│   └── CLINICAL_SCENARIOS.md             # Therapeutic test scenarios
└── reports/                       # Test output and coverage
    ├── e2e/                              # Playwright HTML reports
    ├── coverage/                         # Unit test coverage
    └── accessibility/                    # A11y audit results

src/test/
├── components/                    # Component unit tests
│   └── luxury/                           # Luxury component tests
├── fixtures/                      # Test data and scenarios
│   └── therapeutic-scenarios.ts          # Clinical test data
├── mocks/                         # API and service mocks
│   └── server.ts                         # MSW mock server
└── utils/                         # Testing utilities
    └── testing-library.tsx              # Custom render helpers
```

## 🧬 Unit Testing Standards

### Luxury Component Testing
Every luxury therapeutic component requires comprehensive unit tests covering:

```typescript
describe('TherapeuticButton', () => {
  // ✅ Core functionality
  it('renders with therapeutic styling and accessibility')
  it('handles click events for therapeutic interactions')
  it('supports disabled state for clinical safety')
  
  // ✅ Therapeutic variants
  it('renders primary variant with sage therapeutic colors')
  it('renders champagne variant for celebration moments')
  it('renders safety variant for critical actions')
  
  // ✅ Whimsical interactions
  it('applies whimsical enhancements when enabled')
  it('triggers celebration effects on completion')
  
  // ✅ Accessibility compliance
  it('meets WCAG 2.1 AA standards')
  it('supports screen reader navigation')
  it('handles reduced motion preferences')
  
  // ✅ Performance standards
  it('renders within therapeutic performance standards')
})
```

### Coverage Requirements
- **Overall Coverage**: ≥80%
- **Luxury Components**: ≥95%
- **Clinical Modules**: ≥95%
- **Utility Functions**: ≥85%

### Test Quality Standards
```typescript
// ✅ Good test structure
describe('Component Name', () => {
  beforeEach(() => {
    // Clean setup for each test
  })
  
  it('should describe expected behavior clearly', () => {
    // Arrange
    const props = { variant: 'therapeutic' }
    
    // Act
    render(<Component {...props} />)
    
    // Assert
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})

// ❌ Avoid these patterns
it('works') // Vague description
expect(true).toBe(true) // Meaningless assertion
// No cleanup between tests
```

## 🎭 End-to-End Testing

### Therapeutic User Journeys
E2E tests focus on complete clinical workflows:

1. **New Clinician Onboarding**
   - Welcome experience with luxury interactions
   - Safety acknowledgment (critical clinical step)  
   - Module progression with therapeutic pacing
   - Certificate generation with celebration

2. **Returning User Experience**
   - Progress restoration and continuation
   - Module accessibility based on completion
   - Whimsical enhancements maintain state

3. **Clinical Scenario Simulations**
   - Crisis intervention protocols
   - Routine therapeutic sessions
   - Assessment workflows
   - Safety protocol adherence

### Browser Matrix
```typescript
// Multi-browser testing for clinical reliability
projects: [
  'Desktop Chrome - Therapeutic UX',
  'Desktop Safari - Clinical Compliance', 
  'iPad - Mobile Therapeutic Experience',
  'iPhone - Accessibility Testing',
  'High Contrast - Visual Accessibility',
  'Reduced Motion - Motor Accessibility'
]
```

## ♿ Accessibility Testing

### WCAG 2.1 AA Compliance
Automated accessibility testing with `@axe-core/playwright`:

```typescript
// Comprehensive accessibility audit
const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
  .analyze()

expect(results.violations).toHaveLength(0)
```

### Manual Accessibility Checks
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and roles
- **Color Contrast**: ≥4.5:1 ratio for therapeutic colors
- **Focus Management**: Clear focus indicators and logical tab order
- **Reduced Motion**: Animations respect user preferences

## ⚡ Performance Testing

### Luxury Standards
Performance benchmarks for therapeutic user experience:

- **Page Load**: <2 seconds total
- **First Contentful Paint**: <1.2 seconds
- **Largest Contentful Paint**: <2.5 seconds
- **First Input Delay**: <100ms
- **Cumulative Layout Shift**: <0.1
- **Memory Usage**: <100MB for luxury components

### Web Vitals Integration
```typescript
// Measure Core Web Vitals
const metrics = await measurePagePerformance(page)

expect(metrics.largestContentfulPaint).toBeLessThan(2500)
expect(metrics.cumulativeLayoutShift).toBeLessThan(0.1)
expect(metrics.firstInputDelay).toBeLessThan(100)
```

## 👀 Visual Regression Testing

### Screenshot Testing
Automated visual regression with Playwright screenshots:

```typescript
// Component visual consistency
await expect(page).toHaveScreenshot('therapeutic-component.png', {
  fullPage: true,
  animations: 'disabled'
})
```

### Visual Testing Strategy
- **Component Library**: Screenshots of all luxury components
- **User Journeys**: Key steps in therapeutic workflows  
- **Responsive Design**: Mobile, tablet, desktop variations
- **Accessibility States**: High contrast, large text variations

## 🤖 Continuous Integration

### GitHub Actions Pipeline
The therapeutic testing suite runs on every commit:

```yaml
# .github/workflows/therapeutic-testing.yml
jobs:
  unit-tests:          # Luxury component standards
  accessibility-tests: # WCAG 2.1 AA compliance
  performance-tests:   # Web Vitals & luxury UX
  therapeutic-e2e:     # Clinical user journeys
  visual-regression:   # UI consistency
  clinical-reliability: # Overall health report
```

### Quality Gates
Pull requests must pass:
- ✅ All unit tests with >80% coverage
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Performance budget adherence
- ✅ Critical therapeutic user journeys
- ✅ Visual regression checks

## 🔧 Testing Configuration

### Vitest Configuration
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      thresholds: {
        global: { branches: 80, functions: 85, lines: 85 },
        'src/components/luxury/': { branches: 90, functions: 95 }
      }
    }
  }
})
```

### Playwright Configuration
```typescript
// playwright.config.js
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000, // Therapeutic interactions need time
  use: {
    colorScheme: 'light', // Sage colors optimized for light mode
    reduceMotion: 'reduce' // Test accessibility compliance
  }
})
```

## 📊 Test Reporting

### Coverage Reports
- **HTML Report**: `coverage/index.html`
- **LCOV**: `coverage/lcov.info` (for CI integration)
- **JSON**: `coverage/coverage-final.json`

### E2E Reports
- **HTML Report**: `tests/reports/e2e/index.html`
- **Traces**: Available for failed tests
- **Screenshots**: Captured on test failure
- **Videos**: Recorded for complex scenarios

### Accessibility Reports
- **Axe Results**: JSON format with violation details
- **WCAG Checklist**: Manual testing results
- **Color Contrast**: Automated contrast analysis

## 🎯 Best Practices

### Writing Therapeutic Tests
1. **Test User Intent**: Focus on clinical workflows, not implementation
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText`
3. **Therapeutic Pacing**: Allow time for animations and transitions
4. **Error Messages**: Test supportive, therapeutic error handling
5. **Progressive Enhancement**: Test with and without JavaScript

### Mock Data Strategy
```typescript
// Use realistic therapeutic scenarios
const therapeuticScenario = {
  type: 'crisis',
  severity: 'high',
  requiredProtocols: ['safety-assessment', 'de-escalation'],
  expectedOutcomes: ['reduced-anxiety', 'stable-vitals']
}
```

### Accessibility First
```typescript
// Always test accessibility alongside functionality  
const button = screen.getByRole('button', { name: 'Complete Assessment' })
expect(button).toBeVisible()
expect(button).toBeEnabled()
expect(button).toHaveAccessibleName()
```

## 🚨 Debugging Failed Tests

### Unit Test Failures
```bash
# Debug specific test
npm test -- --reporter=verbose ComponentName

# Run test in debug mode
npm run test:unit:ui

# Check coverage impact
npm run test:unit:coverage
```

### E2E Test Failures
```bash
# Run with browser visible
npm run test:e2e:headed

# Debug specific test
npm run test:e2e:debug -- --grep "therapeutic journey"

# View test report
npm run test:e2e:report
```

### Performance Issues
```bash
# Run performance tests specifically
npm run test:performance

# Check Lighthouse scores
npm install -g @lhci/cli
lhci autorun
```

## 📚 Additional Resources

- **[Playwright Documentation](https://playwright.dev/)**
- **[Vitest Guide](https://vitest.dev/)**
- **[Testing Library Best Practices](https://testing-library.com/docs/)**
- **[WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)**
- **[Web Vitals](https://web.dev/vitals/)**

## 🤝 Contributing to Tests

When adding new features:
1. **Write Tests First**: TDD approach for clinical reliability
2. **Test All Scenarios**: Happy path, edge cases, error states
3. **Document Clinical Context**: Explain therapeutic requirements
4. **Maintain Performance**: Ensure luxury UX standards
5. **Verify Accessibility**: Test with assistive technologies

---

**Remember**: Our tests ensure that healthcare professionals can rely on this platform for critical therapeutic training. Every test contributes to better patient outcomes through improved clinician preparation.

*For questions about testing strategy, reach out to the Clinical Engineering Team.*