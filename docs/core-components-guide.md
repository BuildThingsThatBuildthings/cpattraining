# CPAT Core Components Guide

## Overview
The CPAT Core Components system provides luxury therapeutic components designed with a "calm, clinical, confident" aesthetic. Built for the CPAT Training Platform using the established sage/champagne color system.

## Component Library

### Hero Component
Landing page hero with eyebrow → H1 → proof → CTA pattern.

```tsx
import { Hero } from '@/components/core'

<Hero
  eyebrow="CPAT Professional Training"
  title="Transform Your Therapeutic Practice"
  subtitle="Evidence-based training for mental health professionals"
  proofPoints={[
    "Evidence-based clinical methodology",
    "Comprehensive 6-module curriculum",
    "Professional continuing education credits"
  ]}
  ctaText="Begin Your Journey"
  ctaSecondaryText="Learn More"
  variant="luxury"
  onPrimaryAction={() => navigate('/training')}
  onSecondaryAction={() => navigate('/modules')}
/>
```

### Progress Stepper
6-module navigation stepper (no loading bar).

```tsx
import { ProgressStepper } from '@/components/core'

const moduleSteps = [
  {
    id: 'intro',
    title: 'Introduction',
    description: 'Foundation concepts',
    status: 'completed',
    duration: '45 min',
    index: 0
  },
  // ... more steps
]

<ProgressStepper
  steps={moduleSteps}
  currentStep={currentIndex}
  variant="horizontal" // or "vertical"
  showDescription
  onStepClick={(index, id) => navigateToStep(id)}
/>
```

### Clinical Callouts
Important information blocks (colored border + icon, never button-like).

```tsx
import { 
  ClinicalCallout,
  SafetyCallout,
  CPATCallout,
  PracticeCallout,
  TCMCallout 
} from '@/components/core'

// Pre-configured callouts
<SafetyCallout variant="emphasised">
  CPAT light exposure is contraindicated for epilepsy patients.
</SafetyCallout>

<CPATCallout>
  Use positive-only paraphrase: "You can be proud of this healing journey."
</CPATCallout>

<PracticeCallout variant="subtle">
  Begin with relaxation breathing (5-10 minutes).
</PracticeCallout>

// Generic callout
<ClinicalCallout type="warning" title="Important Notice">
  Review safety protocols before proceeding.
</ClinicalCallout>
```

### Module Cards
Course module cards (title, outcome, duration, CE credit).

```tsx
import { ModuleCard } from '@/components/core'

<ModuleCard
  title="CPAT Fundamentals"
  description="Learn foundational principles of Cognitive Processing and Affective Therapy"
  outcome="Understand core CPAT methodology for clinical application"
  duration="2.5 hours"
  ceCredits={2.5}
  status="available" // locked | available | in-progress | completed
  progress={65} // for in-progress modules
  moduleNumber={1}
  onStart={() => startModule()}
  onContinue={() => continueModule()}
  onReview={() => reviewModule()}
  variant="default" // compact | default | detailed
/>
```

### Pearl Surface Cards
Glass morphism containers for elevated content.

```tsx
import { 
  PearlSurface,
  LuxuryPearlSurface,
  ClinicalPearlSurface,
  FloatingPearlSurface,
  ElevatedPearlSurface 
} from '@/components/core'

// Pre-configured variants
<LuxuryPearlSurface size="lg" interactive>
  <h3>Premium Content</h3>
  <p>Enhanced glass morphism with champagne accents</p>
</LuxuryPearlSurface>

<ClinicalPearlSurface size="md">
  <h4>Clinical Information</h4>
  <p>Professional aesthetic for medical content</p>
</ClinicalPearlSurface>

// Customizable pearl surface
<PearlSurface
  variant="elevated"
  size="xl"
  glow
  interactive
  blur="lg"
  opacity={15}
  borderStyle="accent"
>
  <div>Your content here</div>
</PearlSurface>
```

## Design Principles

### Color System
- **Sage**: Primary therapeutic green (`--sage-700`, `--sage-600`, `--sage-500`)
- **Champagne**: Luxury accent gold (`--champagne-600`, `--champagne-500`)
- **Slate**: Dark foundation (`--slate-900`, `--slate-800`, `--slate-700`)

### Typography Integration
- Uses established typography system from `src/index.css`
- Hero titles: 48-64px Playfair Display
- Body text: 18px Inter for clinical readability
- Heading hierarchy: H2 at 36px as specified

### Aesthetic Guidelines
- **Calm**: Soft shadows, breathing animations, generous spacing
- **Clinical**: Clean borders, professional icons, accessible contrast
- **Confident**: Subtle luxury touches, champagne accents, glass morphism

## Accessibility Features
- WCAG AA contrast ratios
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Reduced motion support
- Touch-friendly targets (44px minimum)

## Best Practices

### Component Usage
1. **Hero**: Use on landing pages and module introductions
2. **Progress Stepper**: Limit to 6-8 steps maximum
3. **Clinical Callouts**: Never make them clickable/button-like
4. **Module Cards**: Include clear learning outcomes and CE credits
5. **Pearl Surface**: Use sparingly for emphasis

### Styling Guidelines
1. Maintain sage/champagne color harmony
2. Use glass morphism thoughtfully
3. Test text legibility on all backgrounds
4. Ensure proper spacing (16px, 24px, 32px scale)
5. Keep animations subtle and therapeutic

### Integration
- All components support `data-whimsy` attributes for enhanced interactions
- Components automatically inherit from the established CSS custom properties
- TypeScript interfaces provided for all components
- Pre-configured variants available for common use cases

## Examples and Patterns

### Training Module Layout
```tsx
function TrainingModulePage() {
  return (
    <div>
      <Hero
        title="Module 1: CPAT Fundamentals"
        subtitle="Building the foundation for therapeutic excellence"
        variant="clinical"
      />
      
      <LuxuryPearlSurface size="xl">
        <ProgressStepper
          steps={moduleSteps}
          variant="horizontal"
          currentStep={currentIndex}
        />
        
        <SafetyCallout variant="emphasised">
          Review all safety protocols before proceeding
        </SafetyCallout>
        
        <CPATCallout>
          Remember to use positive-only language throughout
        </CPATCallout>
      </LuxuryPearlSurface>
    </div>
  )
}
```

### Module Selection Grid
```tsx
function ModuleSelection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map(module => (
        <ModuleCard
          key={module.id}
          {...module}
          onStart={() => startModule(module.id)}
        />
      ))}
    </div>
  )
}
```

## Version
Core Components v1.0.0
Compatible with Luxury Therapeutic Components v2.2.0