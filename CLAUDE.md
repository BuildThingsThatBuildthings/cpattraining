# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains content and design specifications for CPAT + Light Therapy Training - a written-only educational program that integrates CLAS (Color, Light, Aromatherapy, Sound) Positive Affirmation Therapy with light/color therapy techniques.

**Key Files:**
- `trainingcontext.md` - Complete training program specification and requirements
- `design.md` - CLAS brand design standards and course styling guidelines

## Architecture & Content Structure

### Training Program Architecture
The course is designed as a modular system with 11 core modules:

1. **Module 0** - Orientation & Safety
2. **Module 1** - Light & Color Fundamentals 
3. **Module 2** - Biology & Psychology of Light
4. **Module 3** - History & Methods of Color Therapy
5. **Module 4** - Color Effects & Selection Frameworks
6. **Module 5** - Brainwave Entrainment & Breathwork
7. **Module 6** - CPAT (CLAS Positive Affirmation Therapy)
8. **Module 7** - CPAT + CLAS Integration Protocols
9. **Module 8** - Condition-Focused Playbooks
10. **Module 9** - Practice Settings & Home Plans
11. **Module 10** - Ethics, Safety & Scope

### Planned Directory Structure
```
cpat-light-training/
├── README.md
├── 00-orientation-safety/
├── 01-what-is-colour/
├── 02-biology-of-light/
├── 03-psychology-of-colour/
├── 04-history-and-modalities/
├── 05-what-is-colour-therapy/
├── 06-conditions-and-colour-use/
├── 07-colour-selection-frameworks/
├── 08-brain-entrainment-and-breath/
├── 09-condition-methods-playbooks/
├── 10-practice-integration-and-home/
├── 11-cpat-core/
├── 12-cpat-class-integration/
├── 13-faq-and-appendices/
├── assets/ (icons, diagrams, worksheets)
├── scripts/ (therapist scripts, affirmation banks)
├── quizzes/ (JSON format)
├── templates/ (protocol canvas, consent, home plan)
└── _meta/ (authoring guidelines, theme, change log)
```

## Content Development Guidelines

### Writing Standards
- **Positive-only language** consistent with CPAT methodology
- **Source fidelity** - use only provided content from trainingcontext.md
- **Safety-first approach** - always include contraindication warnings for epilepsy/seizures
- **Markdown format** with specific callout patterns

### Callout Patterns
```markdown
> **Safety** — CLAS/light exposure is contraindicated for epilepsy/seizure history.

> **CPAT** — Use positive-only paraphrase, affirming interpretations.

> **Practice** — 5–10 min relaxation breathing at start; ~5 min grounding at end.

> **TCM** — Use five-elements lens for hot/full vs cold/deficient.
```

### Brand Alignment
Follow CLAS brand standards from design.md:
- Calm, reassuring, evidence-aware tone
- Color system based on brand pillars (Color/Light/Aromatherapy/Sound)
- Accessibility-first approach (WCAG AA compliance)
- Print-friendly layouts with high contrast

## File Naming Conventions
- Modules: `NN-topic-format_vX.ext` (e.g., `06-cpat-slides_v1.pptx`)
- Content files: descriptive names with hyphens
- Assets: organized by type in dedicated directories

## Key Requirements & Safety Notes

### Critical Safety Requirements
- **Epilepsy/seizure screening** - Always include contraindication warnings
- **Gentle light introduction** - No sudden bright lights
- **Hydration requirements** - Include in all session protocols
- **Semi-hypnotic state awareness** - Monitor client sensitivity

### Session Protocol Standards
- **Start:** Relaxation breathing (5-10 minutes)
- **End:** Grounding/alertness breathing (~5 minutes)  
- **Documentation:** Color choices, duration, client responses
- **CPAT dialogue:** Maintain positive-only language throughout

### Content Constraints
- Written training only (no videos in initial build)
- Source material limited to provided context
- No external links or resources beyond those specified
- Licensed therapist/intern audience focus

## Development Workflow
1. Reference `trainingcontext.md` for all content requirements
2. Apply design standards from `design.md` for styling
3. Use modular structure for scalable content development
4. Include safety warnings and CPAT guidelines in all therapeutic content
5. Maintain accessibility standards throughout

## Quality Standards
- All content must be traceable to source materials
- Safety warnings required for any light/CLAS exposure content
- CPAT positive-only language validation
- Accessibility compliance (color-blind safe, screen reader friendly)
- Print-friendly formatting for clinical use