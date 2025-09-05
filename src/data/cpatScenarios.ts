export interface CPATScenario {
  id: number
  title: string
  context: string
  clientStatement: string
  options: {
    text: string
    isCorrect: boolean
    feedback: string
    explanation: string
  }[]
  learningPoints: string[]
  category: 'anxiety' | 'depression' | 'addiction' | 'trauma' | 'general'
}

export const cpatScenarios: CPATScenario[] = [
  {
    id: 1,
    title: "Anxiety - Client Expressing Fear",
    context: "Client is starting their third CPAT+CLAS session. They've been working on anxiety related to social situations.",
    clientStatement: "I'm still so scared to go to social events. I feel like everyone is judging me and I just want to hide.",
    options: [
      {
        text: "You shouldn't feel that way. Most people aren't actually judging you.",
        isCorrect: false,
        feedback: "This dismisses the client's feelings and uses negative language ('shouldn't').",
        explanation: "CPAT requires positive-only language that validates emotions rather than dismissing them."
      },
      {
        text: "I hear you and validate how challenging social situations feel for you right now. It takes courage to keep working on this.",
        isCorrect: true,
        feedback: "Excellent! This validates feelings and affirms their courage.",
        explanation: "Perfect CPAT response: validates emotions and highlights positive qualities (courage)."
      },
      {
        text: "Why do you think you feel this way? What triggered this fear?",
        isCorrect: false,
        feedback: "This is analytical rather than validating, and focuses on problems rather than strengths.",
        explanation: "CPAT focuses on present-moment validation and positive affirmation, not analysis."
      }
    ],
    learningPoints: [
      "Always validate client emotions without trying to change or dismiss them",
      "Look for opportunities to affirm positive qualities (courage, effort, commitment)",
      "Avoid analytical questioning in favor of supportive presence"
    ],
    category: 'anxiety'
  },
  {
    id: 2,
    title: "Depression - Client Feeling Hopeless",
    context: "Client has been struggling with depression and is expressing feelings of hopelessness about their healing journey.",
    clientStatement: "I don't think I'm getting better. This therapy isn't working. I feel just as depressed as when I started.",
    options: [
      {
        text: "That's not true. You've made progress - remember when you said you felt better last week?",
        isCorrect: false,
        feedback: "This contradicts the client's experience and focuses on past rather than present validation.",
        explanation: "CPAT never contradicts client experience. We validate their current feelings."
      },
      {
        text: "I'm validating how difficult and discouraging this feels right now. It's incredible that you continue to show up for your healing.",
        isCorrect: true,
        feedback: "Perfect validation plus affirmation of their commitment to healing.",
        explanation: "This validates their current experience while affirming their dedication to the healing process."
      },
      {
        text: "Depression can be stubborn. Let's try a different approach.",
        isCorrect: false,
        feedback: "This is analytical and solution-focused rather than validating the present moment.",
        explanation: "CPAT stays with the client's current emotional experience rather than moving to solutions."
      }
    ],
    learningPoints: [
      "Never contradict or dismiss client's current emotional experience",
      "Find the strength in their continued participation despite difficulties",
      "Stay present-focused rather than referencing past sessions"
    ],
    category: 'depression'
  },
  {
    id: 3,
    title: "Addiction - Relapse Guilt",
    context: "Client with substance use issues had a relapse and is expressing shame and guilt about it.",
    clientStatement: "I screwed up again. I drank last weekend after two months sober. I'm such a failure.",
    options: [
      {
        text: "You're not a failure. Relapse is part of recovery for many people.",
        isCorrect: false,
        feedback: "While supportive, this contradicts their self-expression and provides education rather than validation.",
        explanation: "CPAT validates the person's current emotional state without contradicting or educating."
      },
      {
        text: "I'm hearing how painful this is for you, and I want you to know I'm proud that you're here sharing this with me. That takes real courage.",
        isCorrect: true,
        feedback: "Excellent validation of pain plus affirmation of their courage in sharing.",
        explanation: "This validates their emotional pain while affirming the positive action of seeking support."
      },
      {
        text: "What do you think led to the relapse? Let's figure out your triggers.",
        isCorrect: false,
        feedback: "This moves immediately to analysis rather than staying with their current emotional experience.",
        explanation: "CPAT prioritizes emotional validation before any problem-solving or analysis."
      }
    ],
    learningPoints: [
      "Validate painful emotions without trying to change or minimize them",
      "Affirm positive actions like seeking support or sharing difficult experiences",
      "Avoid immediate problem-solving in favor of emotional presence"
    ],
    category: 'addiction'
  },
  {
    id: 4,
    title: "Trauma - Feeling Overwhelmed",
    context: "Client is working through childhood trauma and feeling overwhelmed by the therapeutic process.",
    clientStatement: "This trauma work is so intense. Sometimes I wonder if it would be easier to just not deal with it.",
    options: [
      {
        text: "Trauma work is hard, but you have to face it to heal.",
        isCorrect: false,
        feedback: "This is directive and contains 'have to' language which isn't positive-only.",
        explanation: "CPAT avoids directive language and instead honors the client's pace and choices."
      },
      {
        text: "I'm validating how intense and overwhelming this work can feel. It's valuable that you're diving into this healing - be proud of your courage.",
        isCorrect: true,
        feedback: "Perfect validation plus affirmation of their value and courage.",
        explanation: "This validates the difficulty while reframing trauma work as valuable and courageous."
      },
      {
        text: "Maybe we should slow down if it's too overwhelming.",
        isCorrect: false,
        feedback: "While caring, this moves to solutions rather than staying with their current experience.",
        explanation: "CPAT stays with the client's emotional experience before considering any changes to approach."
      }
    ],
    learningPoints: [
      "Validate the intensity of trauma work without minimizing difficulty",
      "Reframe challenging therapeutic work as valuable and courageous",
      "Avoid directive language like 'have to' or 'should'"
    ],
    category: 'trauma'
  },
  {
    id: 5,
    title: "General - Self-Criticism",
    context: "Client is being very self-critical about their progress in therapy.",
    clientStatement: "I'm so slow at this. Everyone else probably gets better faster than me. I'm just not good at healing.",
    options: [
      {
        text: "Don't compare yourself to others. Everyone heals at their own pace.",
        isCorrect: false,
        feedback: "This is directive ('don't') and educational rather than validating their current feelings.",
        explanation: "CPAT avoids directive language and focuses on emotional validation first."
      },
      {
        text: "I hear the frustration and self-judgment you're experiencing right now. Your openness to healing is a gift you're giving yourself.",
        isCorrect: true,
        feedback: "Excellent validation of feelings plus reframing healing work as a gift.",
        explanation: "This validates their current emotional state while reframing their healing efforts positively."
      },
      {
        text: "Why are you being so hard on yourself?",
        isCorrect: false,
        feedback: "This is analytical questioning rather than emotional validation.",
        explanation: "CPAT prioritizes validation and affirmation over analytical exploration."
      }
    ],
    learningPoints: [
      "Validate self-critical feelings without trying to argue with them",
      "Reframe healing work as a gift or positive choice",
      "Avoid directive language like 'don't' or analytical questioning"
    ],
    category: 'general'
  },
  {
    id: 6,
    title: "Anxiety - Session Preparation",
    context: "Client arrives for CPAT+CLAS session expressing anxiety about the light therapy component.",
    clientStatement: "I'm nervous about the light therapy today. What if it makes my anxiety worse?",
    options: [
      {
        text: "Don't worry, the light therapy is very gentle and safe.",
        isCorrect: false,
        feedback: "This dismisses their concern and uses directive language ('don't worry').",
        explanation: "CPAT validates all feelings, including concerns, rather than reassuring away anxiety."
      },
      {
        text: "I'm validating your nervousness - it's wonderful that you're sharing these feelings with me. Your awareness is a strength.",
        isCorrect: true,
        feedback: "Perfect validation plus affirmation of their self-awareness and communication.",
        explanation: "This honors their nervousness while affirming positive qualities like awareness and sharing."
      },
      {
        text: "What specifically about the light therapy concerns you?",
        isCorrect: false,
        feedback: "While this shows interest, it moves to analysis rather than validating the current emotional state.",
        explanation: "CPAT stays with emotional validation before exploring details or specifics."
      }
    ],
    learningPoints: [
      "Validate all emotions, including anxiety and nervousness",
      "Affirm positive qualities like self-awareness and open communication",
      "Avoid reassurance that dismisses legitimate concerns"
    ],
    category: 'anxiety'
  },
  {
    id: 7,
    title: "Depression - Lack of Energy",
    context: "Client with depression is expressing how difficult it is to do basic daily activities.",
    clientStatement: "I can barely get out of bed most days. Simple things like showering feel impossible.",
    options: [
      {
        text: "You managed to come here today - that's something.",
        isCorrect: false,
        feedback: "While positive, this minimizes their struggle with 'that's something' language.",
        explanation: "CPAT fully validates difficult experiences and gives stronger affirmations."
      },
      {
        text: "I'm hearing how exhausting and overwhelming daily life feels right now. I want to honor the tremendous effort it took for you to be here with me today.",
        isCorrect: true,
        feedback: "Excellent validation of their struggle plus strong affirmation of their effort.",
        explanation: "This fully validates their experience while strongly affirming the courage it took to attend."
      },
      {
        text: "Have you tried any strategies to help with the morning routine?",
        isCorrect: false,
        feedback: "This moves to problem-solving rather than staying with their current emotional experience.",
        explanation: "CPAT prioritizes emotional validation and presence over strategies and solutions."
      }
    ],
    learningPoints: [
      "Fully validate how overwhelming depression can make basic tasks",
      "Give strong affirmations for any effort, especially showing up for healing",
      "Avoid immediate problem-solving or strategy discussions"
    ],
    category: 'depression'
  },
  {
    id: 8,
    title: "Addiction - Cravings Management",
    context: "Client is discussing ongoing cravings and how difficult they are to manage.",
    clientStatement: "The cravings are still really strong. Sometimes I feel like I'm white-knuckling it through the day.",
    options: [
      {
        text: "That sounds really difficult. What coping strategies are you using?",
        isCorrect: false,
        feedback: "While empathetic, this moves quickly to strategy discussion rather than full validation.",
        explanation: "CPAT stays longer with emotional validation before exploring coping approaches."
      },
      {
        text: "I'm validating how intense and challenging these cravings are for you. Your commitment to staying sober despite this difficulty shows incredible strength.",
        isCorrect: true,
        feedback: "Perfect validation of the struggle plus strong affirmation of their strength and commitment.",
        explanation: "This honors the difficulty while affirming their resilience and dedication to recovery."
      },
      {
        text: "Cravings are normal in recovery. They will get easier with time.",
        isCorrect: false,
        feedback: "This is educational and minimizes their current struggle with reassurance about the future.",
        explanation: "CPAT stays present-focused and validates current experience rather than providing education."
      }
    ],
    learningPoints: [
      "Validate the intensity of cravings and recovery challenges",
      "Affirm strength and commitment shown by continuing sobriety despite difficulties",
      "Stay present-focused rather than offering future-oriented reassurance"
    ],
    category: 'addiction'
  },
  {
    id: 9,
    title: "Trauma - Hypervigilance",
    context: "Client is describing feeling constantly on edge and hypervigilant after trauma.",
    clientStatement: "I feel like I'm always scanning for danger. I can't relax even when I know I'm safe.",
    options: [
      {
        text: "Your nervous system is trying to protect you. It makes sense after what you've been through.",
        isCorrect: false,
        feedback: "While understanding, this is educational rather than emotionally validating.",
        explanation: "CPAT prioritizes emotional validation over educational explanations of symptoms."
      },
      {
        text: "I'm validating how exhausting and overwhelming it feels to be in that constant state of alertness. Your system is working so hard to keep you safe.",
        isCorrect: true,
        feedback: "Excellent validation of the experience plus positive reframe of hypervigilance as protective.",
        explanation: "This validates their exhaustion while reframing hypervigilance as their system caring for them."
      },
      {
        text: "Have you tried any grounding techniques when you feel hypervigilant?",
        isCorrect: false,
        feedback: "This jumps to techniques rather than staying with their current emotional experience.",
        explanation: "CPAT stays with validation before exploring any techniques or interventions."
      }
    ],
    learningPoints: [
      "Validate the exhausting nature of trauma responses like hypervigilance",
      "Reframe trauma responses as the system trying to provide protection",
      "Avoid jumping to techniques before fully validating the experience"
    ],
    category: 'trauma'
  },
  {
    id: 10,
    title: "General - Family Relationship Stress",
    context: "Client is expressing frustration about difficult family relationships.",
    clientStatement: "My family just doesn't understand what I'm going through. They keep telling me to just get over it.",
    options: [
      {
        text: "Family members often don't understand mental health struggles. That's frustrating.",
        isCorrect: false,
        feedback: "While validating, this focuses on family education rather than the client's emotional experience.",
        explanation: "CPAT keeps focus on the client's experience rather than explaining family dynamics."
      },
      {
        text: "I hear how isolated and misunderstood you feel with your family. It takes real courage to keep doing this healing work without their support.",
        isCorrect: true,
        feedback: "Perfect validation of isolation plus strong affirmation of courage in continuing healing.",
        explanation: "This validates their emotional experience while affirming their strength in continuing despite lack of support."
      },
      {
        text: "Have you considered having a conversation with them about what you need?",
        isCorrect: false,
        feedback: "This moves to problem-solving rather than staying with their current emotional pain.",
        explanation: "CPAT prioritizes emotional validation before any suggestions or problem-solving."
      }
    ],
    learningPoints: [
      "Validate feelings of isolation and being misunderstood",
      "Affirm courage in continuing healing work without family support",
      "Keep focus on client's experience rather than explaining family dynamics"
    ],
    category: 'general'
  },
  {
    id: 11,
    title: "Anxiety - Work Performance Concerns",
    context: "Client is anxious about work performance and potential job loss.",
    clientStatement: "I'm so anxious at work that I can't concentrate. I'm making mistakes and I'm afraid I'll get fired.",
    options: [
      {
        text: "Try not to catastrophize. You're probably doing better than you think.",
        isCorrect: false,
        feedback: "This dismisses their concerns and uses directive language ('try not to').",
        explanation: "CPAT validates all concerns without labeling them as catastrophizing or dismissing them."
      },
      {
        text: "I'm validating how scary and overwhelming it feels when anxiety affects your work. Your willingness to address this anxiety shows you care deeply about your responsibilities.",
        isCorrect: true,
        feedback: "Great validation plus positive reframe of their concern as caring about responsibilities.",
        explanation: "This validates their fear while reframing their anxiety work as showing care and responsibility."
      },
      {
        text: "What specific mistakes are you making? Maybe we can address them directly.",
        isCorrect: false,
        feedback: "This moves to problem-solving details rather than staying with the emotional experience.",
        explanation: "CPAT stays with emotional validation before exploring specific details or solutions."
      }
    ],
    learningPoints: [
      "Validate workplace anxiety without dismissing realistic concerns",
      "Reframe anxiety work as showing care and responsibility",
      "Avoid analyzing specific situations before validating emotions"
    ],
    category: 'anxiety'
  },
  {
    id: 12,
    title: "Depression - Medication Concerns",
    context: "Client is expressing ambivalence about taking antidepressant medication.",
    clientStatement: "I don't know if I want to keep taking these antidepressants. I feel like I should be able to get better without them.",
    options: [
      {
        text: "Medication can be really helpful for depression. There's no shame in taking them.",
        isCorrect: false,
        feedback: "This is educational advocacy rather than validating their current ambivalence.",
        explanation: "CPAT validates all feelings, including ambivalence about treatment, rather than advocating for specific approaches."
      },
      {
        text: "I hear the internal conflict you're experiencing about medication. It's beautiful that you want to explore all your options for healing.",
        isCorrect: true,
        feedback: "Perfect validation of their ambivalence plus positive reframe of their exploration.",
        explanation: "This validates their internal conflict while affirming their desire to explore healing options."
      },
      {
        text: "What makes you feel like you should be able to do it without medication?",
        isCorrect: false,
        feedback: "This explores the 'should' thinking rather than validating their current emotional experience.",
        explanation: "CPAT validates feelings first before exploring the thoughts behind them."
      }
    ],
    learningPoints: [
      "Validate ambivalence about any treatment approach, including medication",
      "Reframe exploration of treatment options as positive and beautiful",
      "Avoid advocating for specific treatments - stay with their process"
    ],
    category: 'depression'
  },
  {
    id: 13,
    title: "Addiction - Social Pressure",
    context: "Client is struggling with social situations where others are drinking or using substances.",
    clientStatement: "All my friends still party and drink. I feel so isolated and different now. Sometimes I wonder if sobriety is worth it.",
    options: [
      {
        text: "Sobriety is definitely worth it. You'll find new friends who support your recovery.",
        isCorrect: false,
        feedback: "This is reassurance and future-focused advice rather than validating current feelings.",
        explanation: "CPAT stays with current emotional experience rather than providing reassurance about the future."
      },
      {
        text: "I'm validating how isolating and painful it feels to be in a different place than your friends. Your commitment to sobriety despite this loneliness shows tremendous strength.",
        isCorrect: true,
        feedback: "Excellent validation of isolation plus strong affirmation of their commitment and strength.",
        explanation: "This honors their loneliness while affirming the strength it takes to maintain sobriety despite social pressure."
      },
      {
        text: "Have you considered talking to them about how you're feeling?",
        isCorrect: false,
        feedback: "This jumps to problem-solving rather than staying with their current emotional pain.",
        explanation: "CPAT prioritizes emotional validation before exploring communication strategies."
      }
    ],
    learningPoints: [
      "Validate the isolation that can come with recovery choices",
      "Affirm strength in maintaining recovery despite social pressure",
      "Avoid future-focused reassurance in favor of present-moment validation"
    ],
    category: 'addiction'
  },
  {
    id: 14,
    title: "Trauma - Therapeutic Relationship",
    context: "Client is expressing difficulty trusting the therapeutic relationship due to past betrayals.",
    clientStatement: "It's hard for me to trust you completely. I keep waiting for you to hurt me or abandon me like others have.",
    options: [
      {
        text: "I understand your caution. I'm committed to being trustworthy and consistent with you.",
        isCorrect: false,
        feedback: "While caring, this focuses on therapist reassurance rather than validating client's experience.",
        explanation: "CPAT keeps focus on validating the client's emotional experience rather than providing therapist reassurance."
      },
      {
        text: "I'm honoring your wisdom in being cautious after experiencing betrayal. Your awareness of your needs shows incredible self-care.",
        isCorrect: true,
        feedback: "Perfect validation plus reframing caution as wisdom and self-care.",
        explanation: "This validates their protective stance while reframing it as wisdom and healthy self-care."
      },
      {
        text: "What specifically makes it difficult to trust me?",
        isCorrect: false,
        feedback: "This explores specifics rather than validating the courageous act of sharing this vulnerability.",
        explanation: "CPAT validates the emotional courage first before exploring specific details."
      }
    ],
    learningPoints: [
      "Honor protective responses as wisdom after trauma",
      "Reframe caution and self-protection as healthy self-care",
      "Focus on client's emotional experience rather than therapist reassurance"
    ],
    category: 'trauma'
  },
  {
    id: 15,
    title: "General - Life Transitions",
    context: "Client is struggling with a major life transition (job change, relationship ending, moving, etc.)",
    clientStatement: "Everything in my life is changing at once. I feel completely overwhelmed and like I'm losing control.",
    options: [
      {
        text: "Change is hard, but it often leads to growth. Try to see the opportunities in this transition.",
        isCorrect: false,
        feedback: "This minimizes their overwhelm and uses directive language ('try to see').",
        explanation: "CPAT validates difficult experiences fully without trying to reframe them prematurely."
      },
      {
        text: "I'm validating how overwhelming and disorienting it feels when multiple life changes happen at once. Your willingness to navigate this uncertainty shows real courage.",
        isCorrect: true,
        feedback: "Great validation of overwhelm plus affirmation of courage in facing uncertainty.",
        explanation: "This validates their disorientation while affirming the courage it takes to navigate major transitions."
      },
      {
        text: "What aspect of these changes feels most challenging to you?",
        isCorrect: false,
        feedback: "This moves to analysis rather than staying with the overall emotional experience.",
        explanation: "CPAT stays with broad emotional validation before exploring specific details."
      }
    ],
    learningPoints: [
      "Validate the overwhelming nature of multiple life transitions",
      "Affirm courage in navigating uncertainty and change",
      "Avoid premature reframing or finding silver linings"
    ],
    category: 'general'
  },
  {
    id: 16,
    title: "Anxiety - Physical Symptoms",
    context: "Client is describing physical symptoms of anxiety and fear about their intensity.",
    clientStatement: "My heart races and I get so dizzy during panic attacks. I'm scared there's something seriously wrong with me physically.",
    options: [
      {
        text: "Those are common anxiety symptoms. Have you been checked by a doctor to rule out physical causes?",
        isCorrect: false,
        feedback: "This is educational and moves to medical advice rather than validating their fear.",
        explanation: "CPAT validates the fear and discomfort rather than providing medical education or advice."
      },
      {
        text: "I'm validating how frightening and uncomfortable these physical sensations are for you. It takes courage to continue living your life while experiencing this intensity.",
        isCorrect: true,
        feedback: "Perfect validation of physical discomfort plus affirmation of courage in continuing to function.",
        explanation: "This validates both the fear and physical discomfort while affirming their resilience in daily functioning."
      },
      {
        text: "When do these symptoms typically occur? Let's identify your triggers.",
        isCorrect: false,
        feedback: "This moves to analysis and trigger identification rather than validating current experience.",
        explanation: "CPAT stays with emotional validation before exploring patterns or triggers."
      }
    ],
    learningPoints: [
      "Validate both the physical discomfort and fear around anxiety symptoms",
      "Affirm courage in continuing to function despite physical symptoms",
      "Avoid medical education or trigger analysis before validating experience"
    ],
    category: 'anxiety'
  },
  {
    id: 17,
    title: "Depression - Sleep Difficulties",
    context: "Client is describing sleep problems related to depression.",
    clientStatement: "I either can't fall asleep or I sleep for 12 hours and still feel exhausted. My sleep is completely messed up.",
    options: [
      {
        text: "Sleep problems are very common with depression. There are some good sleep hygiene techniques we could try.",
        isCorrect: false,
        feedback: "This is educational and solution-focused rather than validating their current frustration.",
        explanation: "CPAT validates the experience first before considering any techniques or solutions."
      },
      {
        text: "I'm validating how frustrating and exhausting it feels when sleep becomes disrupted. Your body is working hard to find balance during this challenging time.",
        isCorrect: true,
        feedback: "Great validation plus positive reframe of sleep disruption as the body seeking balance.",
        explanation: "This validates their frustration while reframing sleep issues as their body's attempt to cope and find balance."
      },
      {
        text: "How long have you been having these sleep problems?",
        isCorrect: false,
        feedback: "This gathers information rather than staying with their current emotional experience.",
        explanation: "CPAT prioritizes emotional validation over information gathering or timeline details."
      }
    ],
    learningPoints: [
      "Validate frustration with sleep disruption without minimizing the impact",
      "Reframe sleep problems as the body attempting to find balance during difficulty",
      "Avoid immediate solutions or information gathering before validating experience"
    ],
    category: 'depression'
  },
  {
    id: 18,
    title: "Addiction - Shame Cycles",
    context: "Client is describing feelings of shame that seem to fuel their addictive behaviors.",
    clientStatement: "When I feel ashamed about my addiction, I just want to use more to numb the shame. It's like a vicious cycle.",
    options: [
      {
        text: "Shame is a common trigger for addictive behaviors. Breaking this cycle is important for recovery.",
        isCorrect: false,
        feedback: "This is educational analysis rather than validating their current emotional experience.",
        explanation: "CPAT validates the emotional pain rather than analyzing addiction cycles."
      },
      {
        text: "I'm validating how painful and trapped you feel in this cycle of shame. Your awareness of this pattern shows incredible insight and is a gift to your healing process.",
        isCorrect: true,
        feedback: "Perfect validation of pain plus strong affirmation of their insight as beneficial to healing.",
        explanation: "This validates the painful cycle while strongly affirming their self-awareness as valuable for healing."
      },
      {
        text: "What do you think would help interrupt this cycle when it starts?",
        isCorrect: false,
        feedback: "This moves to problem-solving rather than staying with their current emotional experience.",
        explanation: "CPAT stays with validation before exploring interruption strategies or solutions."
      }
    ],
    learningPoints: [
      "Validate painful cycles without analyzing addiction patterns",
      "Affirm self-awareness and insight as gifts to the healing process",
      "Avoid problem-solving before fully validating the emotional experience"
    ],
    category: 'addiction'
  },
  {
    id: 19,
    title: "Trauma - Anniversary Reactions",
    context: "Client is experiencing increased symptoms around the anniversary of a traumatic event.",
    clientStatement: "It's coming up on the anniversary of my trauma, and I feel like I'm falling apart. All my symptoms are getting worse.",
    options: [
      {
        text: "Anniversary reactions are normal. Your symptoms should improve once the date passes.",
        isCorrect: false,
        feedback: "This is educational reassurance rather than validating their current distress.",
        explanation: "CPAT validates current distress without providing timeline reassurance about symptom improvement."
      },
      {
        text: "I'm validating how intense and overwhelming it feels as this meaningful date approaches. Your body and heart are remembering, and that's part of your healing journey.",
        isCorrect: true,
        feedback: "Excellent validation plus positive reframe of anniversary reactions as part of healing.",
        explanation: "This validates their distress while reframing anniversary reactions as meaningful remembrance and healing."
      },
      {
        text: "What specific symptoms are you noticing getting worse?",
        isCorrect: false,
        feedback: "This gathers symptom details rather than staying with their overall emotional experience.",
        explanation: "CPAT stays with broad emotional validation before exploring specific symptom details."
      }
    ],
    learningPoints: [
      "Validate intensity of anniversary reactions without minimizing distress",
      "Reframe anniversary responses as meaningful remembrance and healing",
      "Avoid timeline reassurance about symptom improvement"
    ],
    category: 'trauma'
  },
  {
    id: 20,
    title: "General - Therapeutic Progress Reflection",
    context: "Client is reflecting on their overall therapeutic progress and expressing mixed feelings.",
    clientStatement: "I've been in therapy for months now. Sometimes I feel like I'm making progress, but other days I feel like I'm back at square one.",
    options: [
      {
        text: "Healing isn't linear. It's normal to have ups and downs in therapy.",
        isCorrect: false,
        feedback: "This is educational explanation rather than validating their mixed feelings about progress.",
        explanation: "CPAT validates the emotional experience of ups and downs rather than explaining healing patterns."
      },
      {
        text: "I'm validating the mixture of hope and discouragement you're feeling about your healing journey. Your commitment to continuing this work despite the challenges shows tremendous dedication to yourself.",
        isCorrect: true,
        feedback: "Perfect validation of mixed feelings plus strong affirmation of dedication and commitment.",
        explanation: "This validates both the hope and discouragement while affirming their commitment to continued healing."
      },
      {
        text: "What makes you feel like you're back at square one on the difficult days?",
        isCorrect: false,
        feedback: "This explores the negative experience rather than validating the overall mixed feelings.",
        explanation: "CPAT validates the full range of feelings before exploring specific aspects of the experience."
      }
    ],
    learningPoints: [
      "Validate mixed feelings about therapeutic progress without explaining healing patterns",
      "Affirm commitment and dedication shown by continuing therapy despite challenges",
      "Honor both hope and discouragement as valid parts of the healing journey"
    ],
    category: 'general'
  }
]