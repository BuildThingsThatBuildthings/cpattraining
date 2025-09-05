export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  learningObjectives: string[];
  prerequisites: string[];
  content: {
    sections: {
      id: string;
      title: string;
      content: string;
      interactiveElements?: {
        type: 'quiz' | 'scenario' | 'reflection' | 'practice';
        data: Record<string, unknown>;
      }[];
    }[];
  };
  assessment?: {
    questions: {
      id: string;
      question: string;
      type: 'multiple-choice' | 'true-false' | 'scenario';
      options?: string[];
      correct: string | string[];
      explanation: string;
    }[];
    passingScore: number;
  };
}

export const trainingModules: TrainingModule[] = [
  {
    id: 'light-colour-fundamentals',
    title: 'Light & Colour Fundamentals',
    description: 'Master the foundational principles of light and colour therapy as the cornerstone of evidence-based CPAT clinical practice for licensed therapeutic professionals.',
    icon: '🌈',
    duration: '60 minutes',
    difficulty: 'Beginner',
    category: 'Foundations 101',
    learningObjectives: [
      'Explain light/colour fundamentals (wavelength, frequency, intensity, coherence, monochromaticity, saturation) in clear client-friendly language',
      'Describe biological and psychological pathways of light through skin and eyes, including visual & non-visual routes, hypothalamic, endocrine, and circadian responses',
      'Apply CPAT dialogue rules (positive paraphrasing, affirming interpretations, reflective validation, positive assignments) throughout clinical sessions',
      'Understand bio-photons and Fritz-Albert Popp\'s research in biological light systems for therapeutic application'
    ],
    prerequisites: [],
    content: {
      sections: [
        {
          id: 'what-is-colour',
          title: 'What is Colour?',
          content: `
# Understanding Colour: The Foundation of CPAT Light Therapy

## What is Colour?

Colour represents a fundamental aspect of electromagnetic energy that interacts with biological systems in measurable, therapeutic ways. Within CPAT methodology, colour serves as a primary therapeutic modality that operates through both physical and psychological pathways.

> **CPAT Clinical Note**: In CPAT practice, we approach colour therapy with positive-only therapeutic dialogue, viewing each client's response to colour as inherently wise and healing-oriented.

### Electromagnetic Spectrum in Clinical Context

The electromagnetic spectrum encompasses all forms of electromagnetic radiation. For CPAT practitioners, understanding the visible spectrum is essential for safe, effective therapeutic application:

- **Visible Light Range**: 380-750 nanometers (nm) - the therapeutic window for CLAS exposure
- **Infrared (IR)**: Above 750nm - penetrates tissue depths, supports cellular ATP production
- **Ultraviolet (UV)**: Below 380nm - affects vitamin D synthesis, requires careful clinical consideration

### Wave vs Particle Nature: Clinical Implications

Light exhibits both wave and particle properties, demonstrated through the double-slit experiment. This duality has direct therapeutic relevance:

**Wave Properties:**
- **Wavelength**: Distance between successive peaks, determines colour perception and biological effects
- **Frequency**: Wave cycles per second (Hz), directly relates to photon energy levels
- **Amplitude**: Wave height determining intensity/brightness - critical for therapeutic dosing

**Particle Properties (Photons):**
- Discrete energy packets that interact directly with cellular systems
- Energy inversely related to wavelength (shorter wavelengths = higher energy)
- Enable precise therapeutic targeting through wavelength selection

> **Safety Protocol**: Always document wavelength, intensity, and duration for each CLAS session. Contraindicated for individuals with epilepsy or seizure history.
          `,
          interactiveElements: [
            {
              type: 'practice',
              data: {
                title: 'Colour Spectrum Exploration',
                prompt: 'Observe the colours around you. Can you identify which would be considered "warm" (longer wavelengths) versus "cool" (shorter wavelengths)?',
                placeholder: 'Describe what colours you observe and their potential therapeutic associations...'
              }
            }
          ]
        },
        {
          id: 'bio-photons-biological-light',
          title: 'Bio-photons & Biological Light',
          content: `
# Bio-photons and Biological Light in CPAT Practice

## Fritz-Albert Popp's Revolutionary Discovery

German physicist Fritz-Albert Popp transformed our understanding of living systems through his discovery of bio-photon emissions—ultra-weak light emissions from living cells that suggest an inherent photonic nature of biological systems.

### Bio-photon Characteristics in Clinical Context

- **Ultra-weak light emissions**: 10-18 to 10-23 watts per square centimeter
- **Coherent light properties**: Organized, laser-like characteristics suggesting cellular communication
- **Biological information carrier**: May coordinate intercellular communication networks
- **Health status indicator**: Emission patterns correlate with wellness and disease states

> **CPAT Integration**: Bio-photon research supports the CPAT understanding that living systems naturally respond to and emit light. This validates our positive-only approach to light therapy as supporting the body's inherent healing wisdom.

### Clinical Relevance for CPAT Practitioners

Bio-photon research provides scientific foundation for CPAT principles:
- Living systems demonstrate inherent photonic intelligence
- CLAS therapy may enhance natural cellular communication networks
- Healthy cellular states correlate with more coherent bio-photon emissions
- Therapeutic light exposure can support optimal cellular function

## Biological Light Processing Pathways

### Human Light Processing (Non-Photosynthetic)

While humans don't photosynthesize, we process therapeutic light through multiple biological pathways:

**Skin Pathways:**
- Mitochondrial cytochrome c oxidase responds to red and near-infrared wavelengths
- Enhanced ATP production through specific wavelength exposure
- Light-responsive cellular repair and regeneration mechanisms
- Depth of penetration varies by wavelength and tissue type

**Eye Pathways:**
- **Visual pathways**: Process colour information for psychological responses
- **Non-visual pathways**: Regulate circadian rhythms through hypothalamic stimulation
- **Endocrine responses**: Light exposure affects hormone production and regulation
- **Limbic activation**: Colours trigger emotional and memory responses

> **Clinical Protocol**: CPAT sessions begin with relaxation breathing (5-10 minutes) and end with grounding/alertness breathing (~5 minutes) to support optimal light processing and integration.
          `,
          interactiveElements: [
            {
              type: 'reflection',
              data: {
                prompt: 'Consider how understanding bio-photons might change your perspective on light therapy. What questions does this raise about traditional approaches?',
                placeholder: 'Reflect on the implications of bio-photon research for your practice...'
              }
            }
          ]
        },
        {
          id: 'terminology-measurements',
          title: 'Essential Terminology & Measurements',
          content: `
# Essential CPAT Light Therapy Terminology

## Core Measurements for Clinical Practice

### Wavelength (λ - Lambda)
- **Definition**: Distance between successive wave peaks - the fundamental determinant of colour
- **Measurement**: Nanometers (nm) - critical for precise therapeutic application
- **Clinical Application**: Determines both colour perception and specific biological effects
- **CLAS Therapeutic Range**: 380nm (violet) to 750nm (red) - the safe, effective therapeutic window

### Frequency (f)
- **Definition**: Number of wave cycles per second - directly relates to photon energy
- **Measurement**: Hertz (Hz)
- **Clinical Relationship**: Frequency = Speed of Light / Wavelength
- **CPAT Application**: Higher frequency wavelengths (blues, violets) = higher energy = more stimulating effects

### Intensity (I)
- **Definition**: Amount of light energy per unit area - determines therapeutic "dose"
- **Measurement**: Lumens, lux, or watts per square meter
- **Clinical Importance**: Critical for safe, effective therapeutic outcomes
- **Safety Protocol**: Excessive intensity can trigger photosensitivity reactions - always start gently

## Advanced Clinical Concepts

### Coherence
- **Definition**: Degree to which light waves maintain synchronized phase relationships
- **Clinical Distinction**: Laser light (highly coherent) vs LED light (partially coherent)
- **Therapeutic Significance**: May influence depth of tissue penetration and cellular response

### Monochromaticity
- **Definition**: Purity of colour - single wavelength vs broad spectrum
- **Clinical Measurement**: Bandwidth in nanometers
- **CPAT Application**: Narrow bandwidth enables precise therapeutic targeting

### Saturation
- **Definition**: Intensity or purity of colour perception
- **Psychological Impact**: Affects emotional and physiological responses
- **Clinical Consideration**: Highly saturated colours may be overstimulating for sensitive clients

## CPAT Therapeutic Wavelength Classifications

### Stimulating Colours (Warm Spectrum):
- **Red (620-750nm)**: Energizing, circulation-enhancing, vitality-supporting
- **Orange (590-620nm)**: Warming, creativity-stimulating, confidence-building  
- **Yellow (570-590nm)**: Uplifting, mental clarity-enhancing, optimism-promoting

### Harmonising Colour (Balance Point):
- **Green (495-570nm)**: Balancing, heart-centered, emotional equilibrium

### Sedating Colours (Cool Spectrum):
- **Blue (450-495nm)**: Calming, cooling, communication-enhancing
- **Indigo/Violet (380-450nm)**: Deeply sedating, intuitive, spiritually-opening

> **CPAT Clinical Protocol**: Document wavelength, intensity, and duration for every CLAS session. Always begin with gentle intensity and allow client feedback to guide adjustments. Maintain positive-only dialogue throughout colour selection and application.

> **Safety Requirement**: Contraindicated for individuals with epilepsy or seizure history. Always screen clients and obtain informed consent before any light exposure.
          `,
          interactiveElements: [
            {
              type: 'quiz',
              data: {
                question: 'Which measurement is most important for determining the colour of therapeutic light?',
                options: ['Frequency', 'Wavelength', 'Intensity', 'Coherence'],
                correct: 'Wavelength',
                explanation: 'Wavelength directly determines the colour of light and its specific biological effects.'
              }
            }
          ]
        }
      ]
    },
    assessment: {
      questions: [
        {
          id: 'q1',
          question: 'What is the visible light range in the electromagnetic spectrum?',
          type: 'multiple-choice',
          options: [
            '200-400 nanometers',
            '380-750 nanometers', 
            '500-900 nanometers',
            '100-500 nanometers'
          ],
          correct: '380-750 nanometers',
          explanation: 'The visible light spectrum ranges from approximately 380nm (violet) to 750nm (red), representing the wavelengths that human eyes can perceive.'
        },
        {
          id: 'q2',
          question: 'Who discovered bio-photons in living systems?',
          type: 'multiple-choice',
          options: [
            'Albert Einstein',
            'Fritz-Albert Popp',
            'Max Planck',
            'Niels Bohr'
          ],
          correct: 'Fritz-Albert Popp',
          explanation: 'German physicist Fritz-Albert Popp discovered bio-photons - ultra-weak light emissions from living cells that may play a role in cellular communication.'
        },
        {
          id: 'q3',
          question: 'True or False: Wavelength determines the colour of light, while frequency determines its energy level.',
          type: 'true-false',
          correct: 'true',
          explanation: 'Correct! Wavelength determines what colour we perceive, and frequency (inversely related to wavelength) determines the energy level of photons.'
        },
        {
          id: 'q4',
          question: 'Which measurement is most important for therapeutic dosing in light therapy?',
          type: 'multiple-choice',
          options: [
            'Wavelength only',
            'Intensity only',
            'Both wavelength and intensity',
            'Coherence only'
          ],
          correct: 'Both wavelength and intensity',
          explanation: 'Therapeutic effectiveness depends on both the wavelength (which determines the type of biological effect) and intensity (which determines the therapeutic dose).'
        }
      ],
      passingScore: 75
    }
  },
  {
    id: 'foundations',
    title: 'CPAT Core Methodology',
    description: 'Master CPAT\'s positive-only therapeutic dialogue principles and evidence-based CLAS integration for licensed mental health professionals.',
    icon: '🌟',
    duration: '45 minutes',
    difficulty: 'Beginner',
    category: 'Core Concepts',
    learningObjectives: [
      'Apply CPAT dialogue rules (positive paraphrasing, affirming interpretations, reflective validation, positive assignments, positive summarizing) throughout a session',
      'Design a 45-60 minute CPAT+CLAS protocol using colour selection frameworks (stimulating/sedating/harmonising)',
      'Implement weekly affirmation cadence (3x daily, ~3 months for full internalization)',
      'Run safe sessions with front-loaded relaxation breathing (5-10 min) and closing grounding (5 min)'
    ],
    prerequisites: ['light-colour-fundamentals'],
    content: {
      sections: [
        {
          id: 'intro',
          title: 'What is CPAT?',
          content: `
# CPAT: Positive-Only Therapeutic Methodology

## Definition & Clinical Stance

CPAT (CLAS Positive Affirmation Therapy) represents a distinct therapeutic approach that integrates Color Light Aromatherapy Sound (CLAS) with positive-only therapeutic dialogue. Licensed therapists and clinical interns use CPAT to create profoundly supportive, affirming therapeutic experiences.

> **CPAT vs CBT**: While CBT focuses on cognitive restructuring, CPAT emphasizes mindful, here-and-now, emotional and spiritual components through positive-only dialogue.

## Core CPAT Principles

### Positive-Only Therapeutic Dialogue

CPAT maintains positive-only language throughout the entire therapeutic encounter:

- **Paraphrasing with Validation**: "I hear you, and I'm validating your feelings."
- **Affirming Interpretations**: "It's valuable that you're diving into trauma work; be proud of your courage."
- **Reflective Validation**: "Since last session, you did amazing work in your healing."
- **Assignments as Gifts**: "Let's keep gifting yourself this week..."
- **Positive Summarizing**: Reinforcing client strengths and progress

### Session Protocol Structure

**Opening (5-10 minutes):**
- Screening/safety & intention setting
- **Relaxation breathing** - essential for CLAS preparation

**Core Session (30-40 minutes):**
- Colour selection (stimulate/sedate/harmonise based on client needs)
- **CLAS exposure** with **on-screen affirmations** tailored to presenting issues
- **Continuous CPAT dialogue** throughout light exposure
- Integration pauses with reflective validation

**Closing (5-10 minutes):**
- **Grounding/alertness breathing** - essential for safe re-emergence
- Home plan review with affirmation scheduling
- Session documentation

### Affirmation Cadence & Integration

**Weekly Affirmation Protocol:**
- Provide **1 focus affirmation per week**
- Client practices **3x daily** (morning, midday, evening)
- Expect approximately **3 months** for full internalization
- Document progress and adjust affirmations as needed

### CPAT Clinical Affirmation Examples

These evidence-based affirmations support positive therapeutic outcomes:

- "You need to be proud of yourself for choosing this healing journey."
- "It's wonderful and a benefit to embrace your true emotions - comfortable or not."
- "It is important to know that this positive beneficial journey will continue supporting your growth."
- "Where there's depression and anxiety, it's okay to experience these symptoms while knowing they will shift."
- "It is incredible that you are able to open your heart and mind to positive self-messages."
- "Where there's depression and anxiety, you are not alone - I'm with you as we explore this together."

> **Clinical Application**: These affirmations integrate during CLAS exposure, creating multi-sensory therapeutic experiences that support deep healing and positive self-perception.

## Safety & Contraindications

### Absolute Contraindications for CLAS Therapy
- **Epilepsy or seizure history** - light exposure can trigger episodes
- **Severe photosensitivity disorders**
- **Active psychotic episodes**
- **Certain medications** causing light sensitivity

### Clinical Safety Protocol
- Always screen clients before every session
- Obtain informed consent for light exposure
- Start with gentle light introduction
- Monitor client responses continuously
- Ensure adequate hydration
- Have emergency procedures readily available
          `,
          interactiveElements: [
            {
              type: 'reflection',
              data: {
                prompt: 'Take a moment to reflect: Which of the four CPAT modalities resonates most with your current therapeutic practice? How might you integrate these concepts?',
                placeholder: 'Share your thoughts on integrating CPAT modalities...'
              }
            }
          ]
        },
        {
          id: 'cpat-session-integration',
          title: 'CPAT + CLAS Session Integration',
          content: `
# Professional CPAT + CLAS Session Protocol

## Complete Session Flow (45-60 minutes)

### Phase 1: Opening & Safety (5-10 minutes)
1. **Screening/Safety Check**
   - Review contraindications (epilepsy/seizure history)
   - Confirm client comfort with light exposure
   - Set therapeutic intention

2. **Relaxation Breathing Protocol**
   - Guide 5-10 minutes of deep, calming breathwork
   - Box breathing (4-4-4-4) or client's preferred technique
   - Essential preparation for CLAS receptivity

> **CPAT Dialogue**: "I'm witnessing your body's natural wisdom as you prepare for this healing experience. You can be proud of choosing this supportive journey."

### Phase 2: CLAS Integration (30-40 minutes)

**Colour Selection Process:**
- **Stimulating colours** (red, orange, yellow) for depression, low energy
- **Sedating colours** (blue, indigo, violet) for anxiety, hyperarousal  
- **Harmonising colour** (green) for balance and integration
- Consider complementary colours for enhanced therapeutic effect

**During CLAS Exposure:**
- Display **on-screen affirmations** specific to client's presenting concerns
- Maintain **continuous CPAT dialogue** with positive-only language
- Allow natural pauses for integration and processing
- Monitor client responses and adjust as needed

**Sample Issue-Specific Affirmations:**
- **Anxiety**: "I welcome calm as I breathe; my system knows how to settle."
- **Depression**: "I am deserving of joy and brightness in my life."
- **Trauma**: "It's incredible that I am able to open my heart to healing."
- **Addiction**: "I honor my courage in choosing health and wellness."

### Phase 3: Grounding & Integration (5-10 minutes)

1. **Grounding/Alertness Breathing**
   - 5 minutes of energizing breathwork
   - Ensures safe return to normal alertness
   - Prevents post-session disorientation

2. **Home Plan Creation**
   - Weekly affirmation assignment (3x daily practice)
   - Color meditation or visualization techniques
   - Hydration and self-care recommendations
   - Schedule next session

> **CPAT Closing**: "Since our session today, you've done amazing work in your healing. I'm validating the strength and wisdom you've shown in embracing this supportive process."
- The brain's ability to reorganize and form new neural connections
- Multi-sensory experiences enhance memory consolidation
- Cross-modal plasticity supports therapeutic change

### Polyvagal Theory Applications
- Understanding autonomic nervous system responses
- Creating safety and regulation through sensory input
- Supporting co-regulation in therapeutic relationships

### Color Psychology Research
Recent studies demonstrate measurable physiological responses to color exposure:
- Heart rate variability changes with color wavelength
- Cortisol reduction with specific color therapies
- Enhanced cognitive performance with targeted light exposure

### Aromatherapy Clinical Evidence
- Peer-reviewed studies on essential oil efficacy
- Neuroimaging showing limbic system activation
- Documented improvements in anxiety and depression

## Clinical Applications

CPAT has shown effectiveness in:
- Anxiety and stress disorders
- Depression and mood regulation
- PTSD and trauma recovery
- Pain management
- Sleep disorders
- Attention and focus challenges
          `
        }
      ]
    },
    assessment: {
      questions: [
        {
          id: 'q1',
          question: 'What are the four main components of CPAT?',
          type: 'multiple-choice',
          options: [
            'Color, Light, Aromatherapy, Sound',
            'Color Light, Aromatherapy, Sound, Positive Affirmations',
            'Chromotherapy, Essential Oils, Music, Meditation',
            'Lighting, Scents, Audio, Visualization'
          ],
          correct: 'Color Light, Aromatherapy, Sound, Positive Affirmations',
          explanation: 'CPAT specifically combines Color Light therapy, Aromatherapy, Sound therapy, and Positive Affirmation techniques.'
        },
        {
          id: 'q2',
          question: 'True or False: CPAT works through a synergistic effect of multiple sensory modalities.',
          type: 'true-false',
          correct: 'true',
          explanation: 'Correct! CPAT\'s effectiveness comes from the combined and enhanced effect of multiple therapeutic modalities working together.'
        }
      ],
      passingScore: 80
    }
  },
  {
    id: 'assessment-intake',
    title: 'Assessment & Intake Protocols',
    description: 'Master the comprehensive assessment process and intake procedures for CPAT clients.',
    icon: '📋',
    duration: '60 minutes',
    difficulty: 'Intermediate',
    category: 'Clinical Practice',
    learningObjectives: [
      'Conduct comprehensive CPAT assessments',
      'Identify contraindications and precautions',
      'Develop personalized treatment plans',
      'Document findings appropriately'
    ],
    prerequisites: ['foundations'],
    content: {
      sections: [
        {
          id: 'assessment-overview',
          title: 'Comprehensive Assessment Process',
          content: `
# CPAT Assessment & Intake Protocol

## Initial Client Interview

The CPAT assessment process begins with a thorough understanding of the client's needs, preferences, and therapeutic goals.

### Primary Assessment Areas

1. **Sensory Preferences & Sensitivities**
   - Color associations and preferences
   - Scent tolerance and allergies
   - Sound sensitivities or preferences
   - Previous experiences with sensory therapies

2. **Mental Health History**
   - Current symptoms and concerns
   - Previous therapeutic experiences
   - Medication considerations
   - Support system assessment

3. **Physical Health Considerations**
   - Medical conditions affecting sensory processing
   - Medications that may interact with aromatherapy
   - Physical limitations or accommodations needed
   - History of seizures or photosensitivity

## Contraindications and Precautions

### Absolute Contraindications
- Severe photosensitive epilepsy
- Acute psychotic episodes
- Severe respiratory conditions with aromatherapy restrictions
- Pregnancy (certain essential oils)

### Relative Contraindications
- History of seizures (modified lighting protocols)
- Severe allergies (careful scent selection)
- Hearing impairments (adapted sound therapy)
- Migraine triggers (personalized approach)

## Creating the Therapeutic Environment

### Environmental Assessment
- Lighting capabilities and controls
- Ventilation and air circulation
- Sound system and acoustic considerations
- Comfort and safety features
- Emergency protocols
          `
        }
      ]
    }
  },
  {
    id: 'session-planning',
    title: 'Session Design & Planning',
    description: 'Learn to design effective CPAT sessions tailored to individual client needs and therapeutic goals.',
    icon: '🎯',
    duration: '75 minutes',
    difficulty: 'Intermediate',
    category: 'Treatment Planning',
    learningObjectives: [
      'Design structured CPAT sessions',
      'Select appropriate modalities for specific goals',
      'Create therapeutic progressions',
      'Plan for session documentation'
    ],
    prerequisites: ['foundations', 'assessment-intake'],
    content: {
      sections: [
        {
          id: 'session-structure',
          title: 'CPAT Session Framework',
          content: `
# Designing Effective CPAT Sessions

## Standard Session Structure

### Opening Phase (5-10 minutes)
- **Grounding and Centering**
  - Brief mindfulness exercise
  - Intention setting
  - Environmental adjustment check

- **Sensory Baseline Assessment**
  - Current mood and energy check
  - Sensory preference verification
  - Any session-specific concerns

### Active Treatment Phase (30-45 minutes)
- **Sequential Modality Introduction**
  - Color light therapy initiation
  - Aromatherapy diffusion
  - Sound therapy activation
  - Positive affirmation integration

- **Therapeutic Activities**
  - Guided relaxation
  - Cognitive restructuring exercises
  - Mindfulness practices
  - Creative expression (optional)

### Integration Phase (10-15 minutes)
- **Processing and Reflection**
  - Experience sharing
  - Insight identification
  - Connection to therapeutic goals

- **Grounding and Closure**
  - Return to baseline
  - Take-home practices
  - Next session planning

## Modality Selection Guidelines

### For Anxiety and Stress
- **Colors**: Soft blues, greens, lavender
- **Scents**: Lavender, chamomile, bergamot
- **Sounds**: Nature sounds, 528Hz frequency
- **Affirmations**: Safety, calm, peace-focused

### For Depression and Low Mood
- **Colors**: Warm yellows, soft oranges, gold
- **Scents**: Citrus oils, peppermint, rosemary
- **Sounds**: Uplifting frequencies, gentle rhythms
- **Affirmations**: Hope, strength, self-worth focused

### For Focus and Concentration
- **Colors**: Clear whites, soft blues, yellow-green
- **Scents**: Peppermint, rosemary, eucalyptus
- **Sounds**: Binaural beats (40Hz), white noise
- **Affirmations**: Clarity, focus, capability focused
          `
        }
      ]
    }
  },
  {
    id: 'therapeutic-techniques',
    title: 'Advanced Therapeutic Techniques',
    description: 'Master advanced CPAT techniques for complex presentations and specialized populations.',
    icon: '🧠',
    duration: '90 minutes',
    difficulty: 'Advanced',
    category: 'Clinical Techniques',
    learningObjectives: [
      'Apply advanced CPAT techniques',
      'Adapt approaches for special populations',
      'Handle complex therapeutic presentations',
      'Integrate trauma-informed practices'
    ],
    prerequisites: ['foundations', 'assessment-intake', 'session-planning'],
    content: {
      sections: [
        {
          id: 'advanced-techniques',
          title: 'Specialized CPAT Applications',
          content: `
# Advanced CPAT Therapeutic Techniques

## Trauma-Informed CPAT Approaches

### Window of Tolerance Considerations
- Recognizing hyperarousal and hypoarousal states
- Using color and light to regulate nervous system
- Aromatherapy for grounding and safety
- Sound therapy for co-regulation

### Trauma-Specific Protocols
- **Safety First**: Always prioritize client safety and choice
- **Titrated Exposure**: Gradual sensory introduction
- **Client Control**: Empowering choice in sensory selection
- **Grounding Resources**: Multiple sensory anchors

## Working with Special Populations

### Children and Adolescents
- **Developmental Considerations**
  - Age-appropriate sensory levels
  - Shorter attention spans
  - Interactive and playful approaches
  - Family involvement considerations

- **Adapted Techniques**
  - Color games and exploration
  - Child-safe aromatherapy
  - Music and movement integration
  - Simplified affirmations

### Older Adults
- **Cognitive Considerations**
  - Memory support through familiar scents
  - Clear, simple instructions
  - Respect for sensory changes with aging
  - Medication interaction awareness

- **Physical Adaptations**
  - Comfortable positioning
  - Appropriate lighting levels
  - Volume and frequency adjustments
  - Safety considerations

### Neurodivergent Individuals
- **Sensory Processing Differences**
  - Individual sensory profiles
  - Sensory seeking vs. avoiding patterns
  - Flexible modality application
  - Strength-based approaches

## Complex Presentation Management

### Comorbid Conditions
- Anxiety with depression
- PTSD with substance use
- ADHD with mood disorders
- Chronic pain with mental health concerns

### Crisis Intervention Protocols
- De-escalation through sensory regulation
- Emergency sensory kits
- Safety planning integration
- Professional consultation guidelines
          `
        }
      ]
    }
  },
  {
    id: 'ethics-safety',
    title: 'Ethics & Safety in Practice',
    description: 'Understand the ethical considerations and safety protocols essential for responsible CPAT practice.',
    icon: '🛡️',
    duration: '60 minutes',
    difficulty: 'Intermediate',
    category: 'Professional Practice',
    learningObjectives: [
      'Apply ethical principles to CPAT practice',
      'Ensure client safety in all interventions',
      'Maintain appropriate professional boundaries',
      'Navigate ethical dilemmas in practice'
    ],
    prerequisites: ['foundations'],
    content: {
      sections: [
        {
          id: 'ethical-principles',
          title: 'Core Ethical Principles',
          content: `
# Ethics and Safety in CPAT Practice

## Fundamental Ethical Principles

### Beneficence and Non-Maleficence
- **Do Good, Do No Harm**
  - Evidence-based practice requirements
  - Regular outcome monitoring
  - Appropriate training and competence
  - Referral when necessary

### Autonomy and Self-Determination
- **Client Choice and Consent**
  - Informed consent for all modalities
  - Right to refuse or modify interventions
  - Cultural sensitivity and respect
  - Age-appropriate decision making

### Justice and Fairness
- **Equitable Access and Treatment**
  - Non-discriminatory practices
  - Cultural competence requirements
  - Accessible service delivery
  - Fair fee structures

### Fidelity and Responsibility
- **Professional Competence**
  - Scope of practice adherence
  - Continuing education requirements
  - Supervision and consultation
  - Professional development

## Safety Protocols

### Environmental Safety
- **Physical Environment**
  - Proper ventilation for aromatherapy
  - Electrical safety for lighting equipment
  - Emergency egress and accessibility
  - Cleaning and sanitization protocols

- **Sensory Safety**
  - Light intensity monitoring
  - Essential oil dilution standards
  - Sound level measurements
  - Allergy and sensitivity protocols

### Client Safety Monitoring
- **During Sessions**
  - Continuous client observation
  - Regular comfort and safety checks
  - Immediate response to distress
  - Emergency intervention protocols

- **Between Sessions**
  - Progress monitoring
  - Safety planning updates
  - Crisis contact information
  - Follow-up procedures

## Professional Boundaries

### Therapeutic Relationship
- **Clear Role Definition**
  - Professional vs. personal relationships
  - Gift and dual relationship policies
  - Social media and technology boundaries
  - Termination and referral processes

### Scope of Practice
- **CPAT-Specific Limitations**
  - Not a replacement for medical treatment
  - Psychiatric emergency procedures
  - Medication interaction awareness
  - Collaboration with other professionals

## Documentation and Confidentiality

### Record Keeping Requirements
- **Essential Documentation**
  - Informed consent forms
  - Assessment and intake records
  - Session notes and progress tracking
  - Safety and incident reports

### Confidentiality Protections
- **Privacy Standards**
  - HIPAA compliance requirements
  - Secure storage and transmission
  - Appropriate information sharing
  - Mandated reporting obligations
          `
        }
      ]
    }
  },
  {
    id: 'outcome-evaluation',
    title: 'Outcome Measurement & Evaluation',
    description: 'Learn to measure and evaluate the effectiveness of CPAT interventions using evidence-based assessment tools.',
    icon: '📊',
    duration: '50 minutes',
    difficulty: 'Advanced',
    category: 'Assessment & Evaluation',
    learningObjectives: [
      'Select appropriate outcome measures',
      'Implement systematic progress monitoring',
      'Interpret and use assessment data',
      'Modify treatment based on outcomes'
    ],
    prerequisites: ['foundations', 'assessment-intake'],
    content: {
      sections: [
        {
          id: 'measurement-tools',
          title: 'CPAT-Specific Assessment Tools',
          content: `
# Outcome Measurement in CPAT Practice

## Standardized Assessment Instruments

### Pre/Post Treatment Measures

#### General Mental Health
- **GAD-7 (Generalized Anxiety Disorder Scale)**
  - 7-item self-report measure
  - Tracks anxiety symptoms over time
  - Validated across diverse populations

- **PHQ-9 (Patient Health Questionnaire)**
  - Depression screening and monitoring
  - Sensitive to treatment changes
  - Brief and client-friendly

#### CPAT-Specific Measures
- **Sensory Experience Rating Scale (SERS)**
  - Measures subjective sensory experiences
  - Tracks modality-specific responses
  - Pre/during/post session ratings

- **Therapeutic Environment Assessment (TEA)**
  - Evaluates environmental factors
  - Client comfort and safety ratings
  - Optimization recommendations

### Session-by-Session Tracking

#### Immediate Response Measures
- **Mood and Energy Visual Analog Scales**
  - 0-10 ratings before/after sessions
  - Quick and easy administration
  - Sensitive to immediate changes

- **Sensory Comfort Index**
  - Multi-modal comfort ratings
  - Individual preference tracking
  - Adaptation recommendations

#### Progress Indicators
- **Goal Attainment Scaling**
  - Individualized outcome measurement
  - Flexible to client needs
  - Quantifies subjective improvements

## Data Collection and Analysis

### Systematic Monitoring
- **Regular Assessment Schedules**
  - Baseline, mid-treatment, post-treatment
  - Monthly progress reviews
  - Long-term follow-up planning

### Outcome Interpretation
- **Clinical Significance**
  - Reliable change indices
  - Effect size calculations
  - Meaningful improvement thresholds

### Treatment Modification
- **Data-Driven Decisions**
  - Progress plateau identification
  - Modality effectiveness analysis
  - Individualized adjustments

## Quality Improvement

### Program Evaluation
- **Aggregate Outcome Analysis**
  - Overall effectiveness rates
  - Modality-specific outcomes
  - Population-specific results

### Continuous Improvement
- **Feedback Integration**
  - Client satisfaction surveys
  - Professional consultation
  - Evidence-based updates
          `
        }
      ]
    }
  }
];

export const getModuleById = (id: string): TrainingModule | undefined => {
  return trainingModules.find(module => module.id === id);
};

export const getPrerequisiteModules = (moduleId: string): TrainingModule[] => {
  const module = getModuleById(moduleId);
  if (!module) return [];
  
  return module.prerequisites
    .map(id => getModuleById(id))
    .filter((mod): mod is TrainingModule => mod !== undefined);
};

export const getNextModule = (currentModuleId: string): TrainingModule | undefined => {
  const currentIndex = trainingModules.findIndex(mod => mod.id === currentModuleId);
  if (currentIndex === -1 || currentIndex === trainingModules.length - 1) return undefined;
  return trainingModules[currentIndex + 1];
};

export const isAllPrerequisitesCompleted = (moduleId: string, completedModules: Set<string>): boolean => {
  const module = getModuleById(moduleId);
  if (!module) return false;
  
  return module.prerequisites.every(prereqId => completedModules.has(prereqId));
};