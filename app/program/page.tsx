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

  return (
    <div className="min-h-[100svh] bg-[#080810] text-white">
      {/* Header */}
      <div className="px-5 pt-10 pb-5 border-b border-white/5">
        <Link href="/" className="text-[11px] text-white/25 mb-3 block">← xQuit</Link>
        <div className="flex items-end justify-between">
          <h1 className="text-xl font-bold">Your Program</h1>
          <div className="text-right">
            <span className="text-2xl font-bold text-emerald-400">{completedDays.length}</span>
            <span className="text-sm text-white/30">/6 days</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-700"
            style={{ width: `${(completedDays.length / 6) * 100}%` }}
          />
        </div>
        {completedDays.length === 6 && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center font-medium">
            Program complete. You are no longer the person who started Day 1.
          </div>
        )}
      </div>

      <div className="px-5 py-5 space-y-4">

        {/* Daily affirmation card */}
        {affirmation && (
          <button
            key={affirmationKey}
            onClick={nextAffirmation}
            className="w-full text-left p-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 relative overflow-hidden group"
          >
            <div className="text-[10px] text-emerald-500/60 font-medium uppercase tracking-wider mb-2">
              Today&apos;s affirmation · tap to refresh
            </div>
            <p className="text-sm text-emerald-100/80 leading-relaxed font-medium italic">
              &ldquo;{affirmation}&rdquo;
            </p>
            <div className="absolute top-3 right-3 text-emerald-500/30 text-xs">↻</div>
          </button>
        )}

        {/* Personalised note */}
        {assessment?.trigger && motivationMessages[assessment.trigger] && (
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/6 text-xs text-white/50 leading-relaxed">
            <span className="text-white/65 font-medium">Note: </span>
            {motivationMessages[assessment.trigger]}
          </div>
        )}

        {/* Current day highlight */}
        {currentDayData && (
          <Link href={`/day/${currentDayData.day}`} className="block">
            <div className={`p-5 rounded-2xl bg-gradient-to-br ${currentDayData.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative">
                <div className="text-xs text-white/60 mb-1">Up next · Day {currentDayData.day}</div>
                <div className="text-lg font-bold mb-1">{currentDayData.title}</div>
                <div className="text-sm text-white/70 mb-3">{currentDayData.subtitle}</div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-bold text-sm rounded-xl">
                  Start Day {currentDayData.day} · {currentDayData.duration} →
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* All days */}
        <div className="space-y-2">
          {days.map((day) => {
            const isUnlocked = unlocked(day.day);
            const isDone = completed(day.day);
            const isCurrent = day.day === currentDay && !isDone;
            if (isCurrent) return null;

            return (
              <div
                key={day.day}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  isDone ? 'border-emerald-500/20 bg-emerald-500/5'
                  : isUnlocked ? 'border-white/8 bg-white/[0.02]'
                  : 'border-white/4 bg-white/[0.01] opacity-40'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${day.color} flex items-center justify-center text-lg flex-shrink-0 ${!isUnlocked ? 'grayscale opacity-50' : ''}`}>
                  {isDone ? '✓' : day.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-white/30">Day {day.day} · {day.duration}</div>
                  <div className="font-semibold text-sm">{day.title}</div>
                </div>
                {isUnlocked ? (
                  <Link
                    href={`/day/${day.day}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0 ${
                      isDone ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/40'
                    }`}
                  >
                    {isDone ? 'Review' : 'Open'}
                  </Link>
                ) : (
                  <span className="text-white/15 text-base flex-shrink-0">🔒</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="p-4 rounded-xl border border-white/6 bg-white/[0.02]">
          <h3 className="font-semibold text-sm mb-3 text-white/70">How this program works</h3>
          <ul className="space-y-2">
            {[
              'Each day: reading + exercise watched 4× + behavioral practice',
              'Spread the 4 watches: morning, before trading, after, before bed',
              'Do not rush. One day minimum per calendar day.',
            ].map((tip, i) => (
              <li key={i} className="flex gap-2 text-xs text-white/35">
                <span className="text-emerald-500/50 flex-shrink-0">→</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
