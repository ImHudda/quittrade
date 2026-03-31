export const affirmations = [
  // Identity
  "I am not my urges. I am the one who watches them pass.",
  "Every urge I don't act on is a rep. I am getting stronger.",
  "The market does not own my time. My life does.",
  "I am not a trader who stopped trading. I am a person who broke free.",
  "My worth is not measured in P&L.",

  // The science reframe
  "The urge is dopamine seeking, not wisdom speaking.",
  "In 20 minutes, this urge will have passed. It always does.",
  "I am not weak. I am recalibrating a biological system.",
  "Near-misses are not feedback. They are the trap. I see it clearly now.",
  "My brain is healing. Every quiet day is evidence of that.",

  // Daily strength
  "Today I choose my time back.",
  "Today I choose my money back.",
  "Today I choose my attention back.",
  "I do not need the market to feel alive.",
  "One day at a time. Today is enough.",

  // The honest truth
  "The trade was never about the money. Now I know what it was really about.",
  "I am not missing out. I was being taken from.",
  "The chart has no memory of me. I am free to move on.",
  "Freedom is not willpower. Freedom is no longer wanting the thing.",
  "I have already done the hardest part: I am aware.",

  // Long game
  "Six months from now, I will be grateful I started today.",
  "Recovery is not a straight line. Progress is still progress.",
  "I am building something that cannot be lost on a bad trade.",
  "The person I am becoming does not need a P&L to feel worthy.",
  "What the markets took, I am taking back — one day, one choice, one breath.",
];

// Pick a deterministic affirmation based on the day of year
export function getDailyAffirmation(): string {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return affirmations[dayOfYear % affirmations.length];
}

// Pick a random affirmation
export function getRandomAffirmation(): string {
  return affirmations[Math.floor(Math.random() * affirmations.length)];
}
