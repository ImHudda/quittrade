'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const questions = [
  {
    id: 'type',
    title: 'What best describes your situation?',
    subtitle: 'Be honest. No one else sees this.',
    options: [
      { value: 'day-trading', label: 'Day trading / scalping', desc: 'Multiple trades daily, often intraday' },
      { value: 'crypto', label: 'Crypto / meme coins', desc: 'FOMO entries, altcoin gambling' },
      { value: 'sports', label: 'Sports betting', desc: 'Regular bets on sports outcomes' },
      { value: 'casino', label: 'Casino / slots', desc: 'Online or in-person gambling' },
      { value: 'mixed', label: 'Multiple of the above', desc: 'It shifts between platforms' },
    ],
  },
  {
    id: 'trigger',
    title: 'What usually triggers a session?',
    subtitle: 'Think about the last 5 times you opened a trading or betting app.',
    options: [
      { value: 'boredom', label: 'Boredom / restlessness', desc: "I'm not doing anything, I open it" },
      { value: 'stress', label: 'Stress or anxiety', desc: 'Trading feels like relief or escape' },
      { value: 'loss', label: 'After a loss', desc: "I need to win it back" },
      { value: 'win', label: 'After a win', desc: 'I feel unstoppable, want more' },
      { value: 'habit', label: 'It just happens', desc: "I don't even notice why anymore" },
    ],
  },
  {
    id: 'severity',
    title: 'How much is this affecting your life?',
    subtitle: 'No judgment — this calibrates the program to your starting point.',
    options: [
      { value: 'aware', label: "Starting to notice it", desc: 'Not serious yet, but I see the pattern' },
      { value: 'moderate', label: 'Affecting my finances', desc: 'Real money lost, some stress about it' },
      { value: 'significant', label: 'Affecting relationships / work', desc: "Others have noticed or I've lied about it" },
      { value: 'severe', label: 'Out of control', desc: "I've tried to stop and couldn't" },
    ],
  },
  {
    id: 'deception',
    title: 'Which thought feels most true to you right now?',
    subtitle: "Choose the one that most resonates — even if it doesn't feel like a deception.",
    options: [
      { value: 'system', label: '"I have a system that works"', desc: 'I just need to be more disciplined with it' },
      { value: 'recovery', label: '"I need to win my losses back"', desc: "I can't stop until I'm back to even" },
      { value: 'skill', label: '"I\'m getting better over time"', desc: "The near-misses mean I'm improving" },
      { value: 'different', label: '"I\'m different from a gambler"', desc: 'This is analysis, not gambling' },
      { value: 'control', label: '"I can stop whenever I want"', desc: "I just don't want to right now" },
    ],
  },
];

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const q = questions[step];
  const isLast = step === questions.length - 1;

  function next() {
    if (!selected) return;
    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (isLast) {
      // Save to localStorage and go to program
      if (typeof window !== 'undefined') {
        localStorage.setItem('qt_assessment', JSON.stringify(newAnswers));
        localStorage.setItem('qt_current_day', '1');
        localStorage.setItem('qt_completed_days', JSON.stringify([]));
      }
      router.push('/program');
    } else {
      setStep(step + 1);
    }
  }

  const progress = ((step) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#080810] text-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-white/40">
              Question {step + 1} of {questions.length}
            </span>
            {step > 0 && (
              <button
                onClick={() => { setStep(step - 1); setSelected(null); }}
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                ← Back
              </button>
            )}
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-start justify-center px-6 pt-12 pb-20">
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-2">{q.title}</h1>
          <p className="text-sm text-white/40 mb-8">{q.subtitle}</p>

          <div className="space-y-3">
            {q.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelected(opt.value)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selected === opt.value
                    ? 'border-emerald-500/60 bg-emerald-500/10'
                    : 'border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                    selected === opt.value ? 'border-emerald-500 bg-emerald-500' : 'border-white/20'
                  }`}>
                    {selected === opt.value && (
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{opt.label}</div>
                    <div className="text-xs text-white/40 mt-0.5">{opt.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={next}
            disabled={!selected}
            className={`w-full mt-6 py-4 rounded-xl font-semibold transition-all ${
              selected
                ? 'bg-emerald-500 hover:bg-emerald-400 text-black'
                : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
          >
            {isLast ? 'Start my program →' : 'Continue →'}
          </button>

          {step === 0 && (
            <p className="mt-4 text-center text-xs text-white/20">
              This is not stored anywhere. It stays on your device.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
