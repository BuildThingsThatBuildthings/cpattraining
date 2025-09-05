Awesome—here’s a **written-only course design standard** that matches the CLAS brand and fits the CPAT+Light training we’re building. I pulled brand signals from CLAS materials (the “Color / Light / Aromatherapy / Sound” pillars and voice) and aligned the standard to a calm, clinical-meets-spa feel. ([CLAS WELLNESS][1])
_(Note: CLAS365 positions itself as a full-year continuum across Detox, Residential, IOP, PHP, and After Care. Tone below respects that integrated-care context.)_ ([Clas365][2])

# CLAS Course Design Standard (Written Training Only)

## 1) Brand essence → writing & layout cues

- **Tone:** calm, reassuring, evidence-aware, never sensational. Use positive-only phrasing consistent with CPAT.
- **Positioning:** a **gentle, empowering** relaxation/stress-reduction modality using **Color / Light / Aromatherapy / Sound** as core pillars. ([CLAS WELLNESS][1])
- **Reading experience:** quiet whitespace, short paragraphs, generous line-height, high contrast, no flashing/animated elements.

## 2) Color system (tokens)

> If you have official hex values, we’ll swap them in. Until then, use this spectrum-inspired set that reads spa-clean and keeps AAA/AA contrast.

**Core neutrals**

- `--ink-900: #1E293B` (charcoal for body text)
- `--ink-600: #334155` (subheads, rules)
- `--paper-000: #FAFAF8` (page background)
- `--paper-100: #F1F5F9` (alternate rows, sidebars)

**Pillars accents** _(map directly to brand pillars)_

- `--accent-color: #4FB3BF` (COLOR)
- `--accent-light: #7FA7F6` (LIGHT)
- `--accent-aroma: #87C7A1` (AROMATHERAPY)
- `--accent-sound: #8B80D9` (SOUND)

**Utility states**

- `--safe-cta: #0E7C86` (links, gentle CTAs)
- `--warning-500: #B45309` (cautions)
- `--contra-500: #9B1C1C` (contraindication banner trim)

**Contrast rules**

- Body text = `--ink-900` on `--paper-000` (AAA at 16–18px)
- Inline highlights use **underlines** or a subtle tint—not color alone (color-blind safe).

## 3) Typography

- **Headings:** _Montserrat_ (600/700). All-caps allowed for H1/H2; track +2%.
- **Body:** _Inter_ (400/500). Sentence case, 16–18px (print 11–12pt), line-height 1.6–1.75.
- **Fallback stack:** `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`.

## 4) Layout & rhythm

- **Measure (line length):** 64–80 chars.
- **Grid:** single-column body (640–720px), optional 240px right sidebar for callouts.
- **Spacing scale:** 4/8/12/16/24/32px; section blocks = 32–40px top, 24–32px bottom.
- **Lists:** use short bullets; avoid nested bullets > 2 levels.

## 5) Markdown components (exact patterns for our written course)

**Headings**

- `#` H1 (module title)
- `##` H2 (lesson)
- `###` H3 (subtopic)

**Callout blocks**

- **Safety** (red trim):

  > **Safety** — CLAS/light exposure is contraindicated for epilepsy/seizure history. Start low, avoid bright lights, ensure hydration.

- **CPAT** (teal trim):

  > **CPAT** — Use positive-only paraphrase, affirming interpretations, positive reflections, “gift” assignments, positive summarizing.

- **Practice** (indigo trim):

  > **Practice** — 5–10 min relaxation breathing at start; \~5 min grounding/alertness at end.

- **TCM** (green trim):

  > **TCM** — Use five-elements lens for hot/full vs cold/deficient, damp/dry.

**Tables** (no vertical rules; zebra on `--paper-100`)

| Topic | Key Points | Notes |
| ----- | ---------- | ----- |

**Inline tags**

- **Term** (first use): _italic_ + brief definition in parentheses.
- Contraindications: **bold** + “Safety” tag.

## 6) Iconography & motif (print-friendly)

- Use **simple line icons** or ASCII bullets; avoid photo-heavy layouts.
- Section dividers: thin rule in the related **pillar accent** (e.g., LIGHT section uses `--accent-light`).

## 7) Accessibility

- No reliance on color alone; include labels/icons.
- Contrast ≥ WCAG AA; body text aims AAA.
- Zero flashing, strobing, or animated gradients (seizure-safe).
- All images get alt-text; tables get captions.
- Keep reading order strictly linear (screen-reader friendly).

## 8) File structure (slots for styling)

- **Theme file:** `/cpat-light-training/_meta/theme.md` describing tokens above.
- Each module top file starts with front-matter:

  ```yaml
  title: "Module 06 — CPAT Core"
  brand_pillar: "SOUND" # or COLOR/LIGHT/AROMATHERAPY
  accent_token: "--accent-sound"
  safety_banner: true
  ```

- Use the `brand_pillar` to color the right-rail callouts consistently.

## 9) Page patterns (repeatable)

**Module cover (H1 page)**

- H1 title → big, calm; one-line subtitle; thin rule in pillar accent; Safety banner if applicable.

**Lesson page**

1. H2 lesson title
2. 2–3 short paragraphs (≤ 120 words each)
3. One **CPAT** callout
4. One **Practice** callout (start/finish breathing rule)
5. Mini checklist or a 3-row table
6. “What to log” list (objective, colors chosen, duration, client response)

**Protocol card (print)**

- 1 column, 700–760px; headings only + blank form fields; trim in pillar accent.

## 10) Examples (drop-in snippets)

**Safety banner**

> **Safety** — Avoid CLAS/light exposure for anyone with epilepsy or seizure history. Begin with very low brightness; never introduce bright light suddenly.

**CPAT phrasing block**

> **CPAT** — “You can be proud of choosing this healing journey.” “It’s beneficial to embrace whatever you feel—comfortable or not.”

**Breathing rules**

> **Practice** — Start with relaxation breathing (5–10 minutes). End with grounding/alertness breathing (\~5 minutes).

## 11) Voice & copy rules

- Replace problem-first lines with **benefit-first** lines (“You are building capacity…”).
- Avoid neutral/directive interrogatives; **affirm** and **validate** (CPAT).
- Use plain terms for science sections; keep advanced terms as labeled side notes.

---

### How this maps to CLAS

- We visibly organize content around **Color / Light / Aromatherapy / Sound** so the written experience mirrors CLAS’s core. ([CLAS WELLNESS][1])
- We keep a **gentle, empowering** feel and a clinical-adjacent clarity that fits a continuum of care (Detox → After Care). ([Clas365][2])

If you want, I’ll drop a `theme.md` into the repo and wire the accents to each module (e.g., Module 01 uses `--accent-light`, Module 11 uses `--accent-sound`).

[1]: https://www.claswellness.com/ "CLAS WELLNESS"
[2]: https://clas365.com/?utm_source=chatgpt.com "CLAS365"
