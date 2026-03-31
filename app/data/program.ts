export const experts = [
  {
    name: "Dr. Anna Lembke",
    title: "Chief of Stanford Addiction Medicine",
    book: "Dopamine Nation",
    quote: "Dopamine is not about pleasure. It is about the anticipation of reward. Trading and gambling exploit this circuit with surgical precision.",
    avatar: "AL",
    color: "from-violet-600 to-purple-700",
  },
  {
    name: "Dr. Mark Griffiths",
    title: "Professor of Behavioural Addiction, Nottingham Trent University",
    book: "20+ years of gambling addiction research",
    quote: "Trading addiction meets every criterion of gambling disorder in DSM-5. The only difference is social legitimacy — which makes it more dangerous, not less.",
    avatar: "MG",
    color: "from-blue-600 to-cyan-700",
  },
  {
    name: "Nassim Nicholas Taleb",
    title: "Author, Former Options Trader",
    book: "Fooled by Randomness",
    quote: "The market has no memory. Your last trade tells you nothing about your next one. The trader who thinks otherwise is not skilled — they are lucky, and luck runs out.",
    avatar: "NT",
    color: "from-amber-600 to-orange-700",
  },
  {
    name: "Daniel Kahneman",
    title: "Nobel Laureate, Behavioral Economics",
    book: "Thinking, Fast and Slow",
    quote: "Losses loom larger than gains. The pain of losing $1,000 is psychologically twice as powerful as the pleasure of gaining $1,000. This asymmetry drives every revenge trade.",
    avatar: "DK",
    color: "from-emerald-600 to-teal-700",
  },
];

export const deceptions = [
  { title: "\"I have a system\"", reality: "If your system worked, you would be profitable. You are not. The system is a story your dopamine-addicted brain invented to justify continuing." },
  { title: "\"Just one more trade\"", reality: "There is no such thing as one more trade. This is the ITCH speaking. The urge will be temporarily relieved, then return stronger." },
  { title: "\"I can win back my losses\"", reality: "Chasing losses is DSM-5 diagnostic criterion #4 for Gambling Disorder. This thought is not logic — it is the addiction operating." },
  { title: "\"I almost had it — I'm improving\"", reality: "Near-misses are random. Your brain fires dopamine as if you won. You didn't. Near-misses are not feedback. They are the trap." },
  { title: "\"The market is wrong, not me\"", reality: "Blame externalization protects the addiction. As long as the problem is the market, there is no reason to stop. The market doesn't know you exist." },
  { title: "\"I'm different from a gambler\"", reality: "3.9–5.7% of retail investors meet full gambling disorder criteria (DSM-5). The brain circuitry is identical. The spreadsheet doesn't change the diagnosis." },
];

export const days = [
  {
    day: 1,
    title: "The Dopamine Loop",
    subtitle: "Understanding why you actually trade",
    color: "from-blue-600 to-blue-800",
    icon: "🧠",
    duration: "45 min",
    reading: {
      title: "The Honest Truth About Why You Trade",
      content: `You believe you trade for money. Your brain has a different agenda entirely.

Every time you place a trade, your brain releases dopamine — not when you win, but in the moments of uncertainty before you know the outcome. The 50/50 uncertainty state produces the strongest dopamine response known to neuroscience. This is not a metaphor. It is measurable, reproducible brain chemistry.

This is why you keep trading after a losing streak. Your rational mind says stop — the dopamine system says the next uncertainty event is coming, and it feels urgent.

**The Variable Ratio Schedule**
Slot machines use the same mechanism: random rewards at unpredictable intervals. This produces stronger behavioral conditioning than any other reward pattern. Trading platforms are slot machines with Bloomberg terminals attached.

**The Tolerance Problem**
Over months and years, your baseline dopamine sensitivity drops. Activities that used to feel satisfying — relationships, hobbies, food, exercise — feel flat. Only trading produces the spike. This is not preference. It is addiction-driven neuroplasticity.`,
    },
    videoExercise: {
      title: "The Dopamine Trap",
      instruction: "Watch this exercise 4 times across today — morning, before trading, after a trade, and before bed. Do NOT watch 4x in one sitting.",
      script: `Close your eyes. Think about your last 5 trades.\n\nFor each trade: what were you feeling in the moment before you placed it?\n\nNot what you thought — what you felt. In your body.\n\nNow notice: that feeling is the ITCH. That anticipation, that urgency — that is not analysis. That is dopamine seeking its next hit.\n\nThe trade was never about the money. Your brain was seeking the chemical. The market was the delivery mechanism.\n\nRepeat this awareness every time you feel the urge to check your P&L.`,
    },
    exercise: {
      title: "The Honest P&L Audit",
      steps: [
        "Open your last 3 months of trading history. All of it.",
        "Calculate: total wins minus total losses minus all fees and spreads",
        "Calculate: total hours per week spent trading + researching + thinking about markets",
        "Divide your net result by your hours. What is your effective hourly rate?",
        "Sit with that number for 60 seconds. No judgment. Just awareness.",
        "Write one sentence: What I learned about my trading today is ___",
      ],
    },
  },
  {
    day: 2,
    title: "The Deceptions",
    subtitle: "Naming the lies your addiction tells you",
    color: "from-violet-600 to-violet-800",
    icon: "🎭",
    duration: "50 min",
    reading: {
      title: "Every Lie Your Brain Tells You Before Every Trade",
      content: `Your subconscious mind has developed an extraordinary defense system for your addiction. It generates compelling, logical-sounding reasons to keep trading. These are not your thoughts — they are the addiction speaking through you.

**The Deception Architecture**
Each deception has the same structure: it converts a red flag into a green light. "I'm chasing losses" becomes "I'm being disciplined about recovery." "I'm addicted" becomes "I'm learning and improving." The addiction is intelligent. It has had years to learn what arguments work on you specifically.

**The Most Dangerous Deception**
"I'm different from a gambler." This belief keeps traders from recognizing their condition and seeking change. Research shows 3.9–5.7% of retail investors meet full DSM-5 criteria for Gambling Disorder. The neural circuitry is identical. The only difference is that trading comes with a Bloomberg terminal and a spreadsheet — neither of which makes the dopamine loop less real.

**What Kahneman Showed Us**
Nobel laureate Daniel Kahneman's research proved that humans systematically overestimate their skill in uncertain domains. Traders rate themselves in the top quartile of performance at rates far higher than statistics allow. Your brain is designed to believe you have an edge. It is wrong.`,
    },
    videoExercise: {
      title: "The 9 Lies",
      instruction: "Watch 4x across the day. Before each watch, identify which deception feels most true for you right now.",
      script: `Your addiction has a voice. Today you will learn to recognize it.\n\nThe voice says: "This setup is different."\nThe voice says: "I just need one good trade to get back to even."\nThe voice says: "I've done my research. This isn't gambling."\nThe voice says: "I can stop whenever I want."\n\nNone of these are your thoughts. They are the dopamine system generating justifications.\n\nWhen you hear these thoughts today — in any form — say this silently:\n"That is the ITCH. Not me. The ITCH."\n\nThe thought is not you. It is a pattern. You can observe it without obeying it.`,
    },
    exercise: {
      title: "Your Personal Deception Map",
      steps: [
        "From the list of deceptions, choose your top 3 — the ones that feel most true",
        "For each: write 'I believe that ___' as a complete sentence",
        "For each belief: write 2 pieces of evidence your addiction gives you for it",
        "For each belief: write 2 pieces of evidence your trading history gives against it",
        "Notice which evidence feels more emotionally real. That is the depth of the deception.",
        "Carry your top deception as a reminder today. When you hear it, name it: 'That is Deception #1.'",
      ],
    },
  },
  {
    day: 3,
    title: "The Real Reason",
    subtitle: "What you are actually running from",
    color: "from-rose-600 to-rose-800",
    icon: "🔍",
    duration: "45 min",
    reading: {
      title: "Trading Is Not a Financial Activity. It Is an Emotional Strategy.",
      content: `Most compulsive traders are not primarily motivated by money. If they were, they would stop when the money runs out. They don't. They find more money.

What trading actually provides:
- **Escape** from stress, boredom, loneliness, anxiety, or emotional pain
- **Stimulation** in an otherwise flat emotional life (trading creates intensity)
- **Identity** ("I am a trader" provides meaning and self-worth)
- **Revenge** — the overwhelming urge to "fix" a bad day right now

Dr. Anna Lembke at Stanford describes this as using dopamine release to self-medicate emotional pain. The market becomes your therapist. It is an extremely expensive, unreliable therapist with a gambling license.

**The Escape Loop**
When you lose, you feel guilt, shame, and anxiety. These are painful. The fastest available escape from the pain of trading losses is — trading. This creates the merry-go-round pattern: gambling to escape the feelings caused by gambling.

**The Identity Trap**
"I am a trader" is one of the most dangerous phrases in recovery. When your entire self-concept is built on your trading identity, stopping trading feels like dying. This is why identity work is central to Day 6.`,
    },
    videoExercise: {
      title: "What You Are Really Running From",
      instruction: "Watch 4x. Before each watch, write one emotion you felt in the hour before your last trading session.",
      script: `Before your last trade: what emotion were you feeling?\n\nWas it boredom? The urge to create intensity where there was none.\nWas it anxiety? The urge to convert financial pressure into action.\nWas it after a loss? The urge to escape the shame through the thing that caused it.\nWas it after a win? The urge to amplify the dopamine before it fades.\n\nNone of these are financial reasons. All of them are emotional ones.\n\nThe trade was a response to a feeling, not a market condition.\n\nToday, before every trade: name the feeling first.\nIf the feeling is on this list — pause. The trade is emotional, not analytical.`,
    },
    exercise: {
      title: "The Trigger Journal",
      steps: [
        "For every trading/gambling session today: write the trigger BEFORE you start",
        "Emotional triggers: stressed / bored / lonely / anxious / overconfident / ashamed",
        "Situational: saw volatility / payday / someone else's win / bad news",
        "Social: trading group / influencer / friend mentioned a trade",
        "At end of day: which trigger category appears most? This is your primary driver.",
        "This is not a moral judgment. It is diagnostic. Your recovery plan targets this trigger.",
      ],
    },
  },
  {
    day: 4,
    title: "The Withdrawal Myth",
    subtitle: "What stopping actually feels like — and why it passes",
    color: "from-amber-600 to-orange-800",
    icon: "🌊",
    duration: "40 min",
    reading: {
      title: "The Discomfort Is Not Real. It Just Feels Real.",
      content: `Gambling and trading withdrawal is almost entirely psychological. There is no chemical to remove from your body. This matters because it means the discomfort has a ceiling — and that ceiling is lower than you think.

**What Withdrawal Actually Is**
- Low dopamine baseline: your brain is recalibrating after years of artificial stimulation
- Habitual urge: the same automatic trigger fired thousands of times, now firing into emptiness
- Identity vacuum: "if I'm not trading, what am I doing with this time?"
- Time that previously felt productive or exciting now feels hollow and purposeless

**The Research Data**
Gambling/trading withdrawal symptoms peak in Days 1–7: anxiety, restlessness, irritability, depression, strong urges. All of these subside naturally. None of them require you to trade to fix them. The urge itself peaks and passes in 10–20 minutes if you do not act on it.

**Urge Surfing (Marlatt & Gordon)**
The Relapse Prevention Model shows that urges function like waves — they rise, peak, and break. Fighting an urge strengthens it. Riding it passively weakens it. Each time you allow an urge to peak and pass without acting, the neural pathway weakens. Recovery is built one unacted urge at a time.`,
    },
    videoExercise: {
      title: "The Wave",
      instruction: "Watch 4x. Practice the urge surfing technique during at least one real urge today.",
      script: `When the urge to trade arrives — stop.\n\nDo not fight it. Do not obey it. Simply observe it.\n\nRate its intensity: 1 to 10.\n\nSet a timer for 20 minutes.\n\nEvery 2 minutes: re-rate the intensity.\n\nNotice what happens. The urge rises. It peaks. Then it begins to fall.\n\nYou did not trade. The urge passed anyway.\n\nThis is the most important thing you will learn in this program:\nThe urge is not a need. It is a wave. And waves break.`,
    },
    exercise: {
      title: "Urge Surfing Practice",
      steps: [
        "The next time you feel an urge to trade or check your P&L: stop",
        "Set a timer for 20 minutes. Do NOT act on the urge during this time.",
        "Rate urge intensity 1–10 every 2 minutes. Write it down.",
        "At the 20-minute mark: re-rate. Notice the pattern — it rose and fell.",
        "After it passes: write one sentence about what you noticed",
        "Repeat with every urge today. Each unacted urge is a recovery rep.",
      ],
    },
  },
  {
    day: 5,
    title: "Your Quit Day",
    subtitle: "The prepared exit — not cold turkey, but a conscious choice",
    color: "from-emerald-600 to-teal-800",
    icon: "🚪",
    duration: "60 min",
    reading: {
      title: "You Are Ready. This Is Different From Before.",
      content: `Every previous attempt to stop trading was willpower against an unprepared brain. Today is different. You have spent 4 days changing what you believe about trading. Your subconscious is not the same as it was on Day 1.

You now know:
- The urge is dopamine-seeking, not financial wisdom
- Your "system" is a deception your addiction generated
- The emotional states that drive you to trade — and what to do instead
- That urges peak and pass without you acting

**This is not willpower. This is readiness.**

**The Freedom Reframe**
You are not giving something up. The compulsive trading gave you nothing real. It took everything.

You are getting back:
- Your money (even if it takes time to recover what was lost)
- Your time (how many hours did the market have that should have been yours?)
- Your attention (a mind no longer split between the chart and real life)
- Your identity (beyond P&L)
- Your relationships (how much presence did trading steal?)

**The Quit Event**
xQuit's clinical research showed that a guided, conscious quit event — rather than cold turkey — dramatically improves outcomes. You will complete one final session mindfully, then close everything deliberately.`,
    },
    videoExercise: {
      title: "The Last Day",
      instruction: "Watch this exercise 4x: morning, noon, before your final session, and after.",
      script: `Read this slowly. Read it like you mean it.\n\nCompulsive trading gave me nothing real.\nIt gave me the illusion of purpose. The real purpose is gone.\nIt gave me the illusion of excitement. The real excitement was pain disguised.\nIt gave me the illusion of progress. The real progress was running in place.\n\nI am not giving something up.\nI am choosing something better.\n\nI choose my time back.\nI choose my money back.\nI choose my mind back.\nI choose my life back.\n\nToday is the last day I trade compulsively.\nNot because I am forcing myself.\nBecause I no longer want to.`,
    },
    exercise: {
      title: "The Conscious Quit",
      steps: [
        "Morning: Read the Freedom Reframe above out loud, alone",
        "If you choose: complete one final deliberate session — conscious, not compulsive",
        "Before any last trade: read 'I am choosing. This is deliberate. This is the last one.'",
        "After your last trade/bet: write exactly: 'I am done. I choose freedom. [Date].'",
        "Close all trading apps. Delete betting apps. Set up Gamban or app restrictions.",
        "Tell one person in your life: 'I have stopped compulsive trading.' Say it out loud.",
      ],
    },
  },
  {
    day: 6,
    title: "Building Your New Life",
    subtitle: "Relapse prevention, identity, and the gap you need to fill",
    color: "from-slate-600 to-slate-800",
    icon: "🌱",
    duration: "55 min",
    reading: {
      title: "Recovery Is Not About Resisting. It Is About Replacing.",
      content: `The gap left by stopping compulsive trading is real. For months or years, it has filled time, identity, emotional regulation, and stimulation. That gap must be filled deliberately. Willpower is not a gap-filler. Structure and replacement rewards are.

**What Trading Gave You (and What to Replace It With)**
- If it gave you excitement → High-intensity physical activity, competitive sports, strategic games with real stakes (chess, poker with friends — social not solitary)
- If it gave you escape → Therapy, journaling, meditation, creative work
- If it gave you identity → Professional development, mentorship, building something
- If it gave you stimulation → Any activity with genuine feedback loops and skill progression

**The Abstinence Violation Effect**
Research by Marlatt & Gordon identified the most dangerous moment in recovery: the first slip. The thought "I've already failed, so I might as well continue" turns a single trade into a full relapse. Pre-planning your response to a slip is as important as the quit itself. A slip is information, not failure.

**Financial Restitution**
The practical damage of compulsive trading — debt, lost savings, financial shame — is itself a relapse trigger. The desperate need to "win back" losses is one of the strongest urges in recovery. A concrete repayment plan, even a slow one, removes this trigger by converting the loss from an open wound into a managed project.`,
    },
    videoExercise: {
      title: "Who You Are Without This",
      instruction: "Watch 4x today. After each watch, write one answer to: 'Who am I, beyond trading?'",
      script: `You have traded compulsively because some part of you needed something.\n\nNot money. Something deeper.\n\nMaybe it was excitement. Maybe it was escape. Maybe it was identity.\nMaybe it was the feeling of being in control of something when everything else felt out of control.\n\nThat need is real. The trading was a bad answer to a real question.\n\nToday you begin finding better answers.\n\nWhat makes you feel genuinely alive — not just stimulated?\nWhat have you been meaning to build, learn, or become?\nWhat have the markets been stealing from?\n\nYou are not a trader who stopped trading.\nYou are a person who was briefly captured by a dopamine loop.\nYou have broken free.\n\nNow: who are you?`,
    },
    exercise: {
      title: "The Relapse Prevention Plan",
      steps: [
        "Write your 3 highest-risk trigger situations with specific response plans for each",
        "Write what you will do instead when an urge hits (20-min activity that absorbs attention)",
        "If a slip occurs: write now — 'I will not quit the program. I will identify the trigger and return to Day 4.'",
        "List all trading/gambling-related accounts, apps, and communities. Remove or restrict each.",
        "Create a 'money saved' tracker — watch your account grow instead of shrink",
        "Write your new identity statement: 'I am someone who ___' — without trading in the answer",
      ],
    },
  },
];

export const stats = [
  { value: "97%", label: "of day traders lose money over 3 years", source: "Journal of Finance" },
  { value: "5.7%", label: "of retail investors meet DSM-5 gambling disorder criteria", source: "PMC Research" },
  { value: "90%", label: "CBT success rate in program completers at 6 months", source: "Clinical Trials" },
  { value: "10–20", label: "minutes until an urge passes if you don't act on it", source: "Relapse Prevention Model" },
  { value: "8–10%", label: "of those with gambling disorder ever seek help", source: "NCPG" },
  { value: "86.4%", label: "of xQuit completers reported no severe withdrawal", source: "PMC Efficacy Study" },
];
