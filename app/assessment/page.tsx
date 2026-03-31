'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    subtitle: 'Think about the last 5 times you opened a trading app.',
    options: [
      { value: 'boredom', label: 'Boredom / restlessness', desc: "Nothing happening, so I open it" },
      { value: 'stress', label: 'Stress or anxiety', desc: 'Trading feels like relief or escape' },
      { value: 'loss', label: 'After a loss', desc: "I need to win it back" },
      { value: 'win', label: 'After a win', desc: 'I feel unstoppable, want more' },
      { value: 'habit', label: 'It just happens', desc: "I don't even notice why anymore" },
    ],
  },
  {
    id: 'severity',
    title: 'How much is this affecting your life?',
    subtitle: 'No judgment — this calibrates the program.',
    options: [
      { value: 'aware', label: "Starting to notice it", desc: 'Not serious yet, but I see the pattern' },
      { value: 'moderate', label: 'Affecting my finances', desc: 'Real money lost, some stress about it' },
      { value: 'significant', label: 'Affecting relationships', desc: "Others have noticed or I've lied about it" },
      { value: 'severe', label: 'Out of control', desc: "I've tried to stop and couldn't" },
    ],
  },
  {
    id: 'deception',
    title: 'Which thought feels most true right now?',
    subtitle: "Choose the one that resonates — even if it feels logical.",
    options: [
      { value: 'system', label: '"I have a system that works"', desc: 'I just need to stick to it' },
      { value: 'recovery', label: '"I need to win losses back"', desc: "Can't stop until I'm back to even" },
      { value: 'skill', label: '"I\'m getting better over time"', desc: "Near-misses mean I'm improving" },
      { value: 'different', label: '"I\'m not like a gambler"', desc: 'This is analysis, not gambling' },
      { value: 'control', label: '"I can stop whenever I want"', desc: "I just choose not to right now" },
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
  const progress = (step / questions.length) * 100;

  function next() {
    if (!selected) return;
    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (isLast) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('qt_assessment', JSON.stringify(newAnswers));
        localStorage.setItem('qt_current_day', '1');
        localStorage.setItem('qt_completed_days', JSON.stringify([]));
      }
      router.push('/auth');
    } else {
      setStep(step + 1);
    }
  }

  return (
    <div className="min-h-[100svh] bg-[#080810] text-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-10 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {step > 0 && (
              <button onClick={() => { setStep(step - 1); setSelected(null); }} className="text-white/30">
                ←
              </button>
            )}
            <Link href="/" className="text-white/30 text-sm">
              {step === 0 ? '← Back' : ''}
            </Link>
          </div>
          <span className="text-xs text-white/30 font-medium">{step + 1} / {questions.length}</span>
        </div>

        {/* Progress */}
        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col px-5 pt-6">
        <h1 className="text-xl font-bold mb-1.5">{q.title}</h1>
        <p className="text-sm text-white/40 mb-6">{q.subtitle}</p>

        <div className="space-y-2.5 flex-1">
          {q.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selected === opt.value
                  ? 'border-emerald-500/50 bg-emerald-500/10'
                  : 'border-white/8 bg-white/[0.03]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border flex-shrink-0 mt-0.5 flex items-center justify-center ${
                  selected === opt.value ? 'border-emerald-500 bg-emerald-500' : 'border-white/25'
                }`}>
                  {selected === opt.value && (
                    <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 10 10">
                      <path d="M2 5l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div>
                  <div className="font-medium text-sm">{opt.label}</div>
                  <div className="text-xs text-white/35 mt-0.5">{opt.desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="pt-5 pb-8">
          <button
            onClick={next}
            disabled={!selected}
            className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
              selected ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
          >
            {isLast ? 'Continue →' : 'Next →'}
          </button>
          {step === 0 && (
            <p className="mt-3 text-center text-[11px] text-white/20">Stays on your device. Not stored anywhere.</p>
          )}
        </div>
      </div>
    </div>
  );
}
