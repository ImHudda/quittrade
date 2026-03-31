'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { days } from '../data/program';
import { getDailyAffirmation, getRandomAffirmation } from '../data/affirmations';

export default function ProgramDashboard() {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [assessment, setAssessment] = useState<Record<string, string> | null>(null);
  const [affirmation, setAffirmation] = useState('');
  const [affirmationKey, setAffirmationKey] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cd = localStorage.getItem('qt_completed_days');
      const curD = localStorage.getItem('qt_current_day');
      const ass = localStorage.getItem('qt_assessment');
      if (cd) setCompletedDays(JSON.parse(cd));
      if (curD) setCurrentDay(parseInt(curD));
      if (ass) setAssessment(JSON.parse(ass));
    }
    setAffirmation(getDailyAffirmation());
  }, []);

  function nextAffirmation() {
    setAffirmation(getRandomAffirmation());
    setAffirmationKey(k => k + 1);
  }

  const unlocked = (day: number) => day <= currentDay;
  const completed = (day: number) => completedDays.includes(day);

  const motivationMessages: Record<string, string> = {
    boredom: 'Your trigger is boredom. Day 3 is critical — it addresses emotional drivers directly.',
    stress: 'Your trigger is stress. Day 3 explains the escape loop and gives you alternatives.',
    loss: 'Your trigger is chasing losses. Day 2 names the exact deception driving this.',
    win: "Your trigger is winning momentum. Day 1's P&L audit will be eye-opening.",
    habit: "Automatic behavior means the pattern is deep. Day 1 brings it back to conscious awareness.",
  };

  const currentDayData = days.find(d => d.day === currentDay && !completed(currentDay));
  const progressPct = (completedDays.length / 6) * 100;

  return (
    <div className="min-h-[100svh] bg-[#080810] text-white"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}>

      {/* Header */}
      <div className="px-5 pt-8 pb-5 border-b border-white/5">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-white/35 mb-5 font-medium py-2 pr-3">
          ← xQuit
        </Link>

        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-xs text-white/35 mb-1">Your progress</p>
            <h1 className="text-2xl font-black tracking-tight">Day {currentDay} of 6</h1>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-emerald-400">{completedDays.length}</span>
            <span className="text-sm text-white/25 ml-1">/6</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-3">
          {[1,2,3,4,5,6].map(d => (
            <div key={d} className={`flex-1 h-1 rounded-full transition-all ${
              completed(d) ? 'bg-emerald-400' : d === currentDay ? 'bg-emerald-400/40' : 'bg-white/8'
            }`} />
          ))}
        </div>

        {completedDays.length === 6 && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center font-semibold">
            🎉 Program complete. You are not the same person who started Day 1.
          </div>
        )}
      </div>

      <div className="px-5 py-5 space-y-4 pb-12">

        {/* Daily affirmation */}
        {affirmation && (
          <button
            key={affirmationKey}
            onClick={nextAffirmation}
            className="w-full text-left p-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="text-[10px] text-emerald-500/60 font-semibold uppercase tracking-wider">
                Today&apos;s affirmation
              </div>
              <div className="text-emerald-500/40 text-base leading-none flex-shrink-0">↻</div>
            </div>
            <p className="text-sm text-emerald-100/80 leading-relaxed italic">
              &ldquo;{affirmation}&rdquo;
            </p>
            <p className="text-[10px] text-emerald-500/30 mt-2">Tap to refresh</p>
          </button>
        )}

        {/* Personalised note */}
        {assessment?.trigger && motivationMessages[assessment.trigger] && (
          <div className="p-3.5 rounded-2xl bg-white/[0.025] border border-white/6 text-xs text-white/45 leading-relaxed">
            <span className="text-white/60 font-semibold">💡 </span>
            {motivationMessages[assessment.trigger]}
          </div>
        )}

        {/* Current day CTA */}
        {currentDayData && (
          <Link href={`/day/${currentDayData.day}`} className="block">
            <div className={`p-5 rounded-2xl bg-gradient-to-br ${currentDayData.color} relative overflow-hidden shadow-lg`}>
              <div className="absolute inset-0 bg-black/45" />
              <div className="relative">
                <div className="text-xs text-white/55 font-medium mb-1 uppercase tracking-wider">Up next</div>
                <div className="text-xl font-black mb-1 leading-tight">{currentDayData.title}</div>
                <div className="text-sm text-white/65 mb-4">{currentDayData.subtitle}</div>
                <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-black font-bold text-sm rounded-xl">
                  Start Day {currentDayData.day} · {currentDayData.duration} →
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* All days list */}
        <div className="space-y-2">
          {days.map((day) => {
            const isUnlocked = unlocked(day.day);
            const isDone = completed(day.day);
            const isCurrent = day.day === currentDay && !isDone;
            if (isCurrent) return null;

            return (
              <div
                key={day.day}
                className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all ${
                  isDone ? 'border-emerald-500/20 bg-emerald-500/5'
                  : isUnlocked ? 'border-white/8 bg-white/[0.025]'
                  : 'border-white/4 bg-white/[0.01] opacity-40'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${day.color} flex items-center justify-center text-xl flex-shrink-0 ${!isUnlocked ? 'grayscale opacity-40' : ''}`}>
                  {isDone ? '✓' : day.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-white/30 font-medium mb-0.5">Day {day.day} · {day.duration}</div>
                  <div className="font-bold text-sm leading-tight">{day.title}</div>
                </div>
                {isUnlocked ? (
                  <Link
                    href={`/day/${day.day}`}
                    className={`min-w-[68px] py-3 rounded-xl text-xs font-bold text-center flex-shrink-0 ${
                      isDone ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/6 text-white/40'
                    }`}
                  >
                    {isDone ? 'Review' : 'Open'}
                  </Link>
                ) : (
                  <span className="text-white/15 text-lg flex-shrink-0">🔒</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="p-4 rounded-2xl border border-white/6 bg-white/[0.02]">
          <h3 className="font-bold text-sm mb-3 text-white/60">How this works</h3>
          <ul className="space-y-2.5">
            {[
              'Each day: reading + 4× exercise + behavioral practice',
              'Spread the 4 watches: morning, before trading, after, bedtime',
              'Do not rush. One day minimum per calendar day.',
            ].map((tip, i) => (
              <li key={i} className="flex gap-2.5 text-xs text-white/35 leading-relaxed">
                <span className="text-emerald-500/50 flex-shrink-0 mt-0.5">→</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
