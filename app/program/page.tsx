'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { days } from '../data/program';

export default function ProgramDashboard() {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [assessment, setAssessment] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cd = localStorage.getItem('qt_completed_days');
      const curD = localStorage.getItem('qt_current_day');
      const ass = localStorage.getItem('qt_assessment');
      if (cd) setCompletedDays(JSON.parse(cd));
      if (curD) setCurrentDay(parseInt(curD));
      if (ass) setAssessment(JSON.parse(ass));
    }
  }, []);

  const unlocked = (day: number) => day <= currentDay;
  const completed = (day: number) => completedDays.includes(day);

  const motivationMessages: Record<string, string> = {
    boredom: 'Your trigger is boredom. Day 3 will be critical — it directly addresses emotional drivers.',
    stress: 'Your trigger is stress. The escape loop is real. Day 3 explains exactly why — and what to use instead.',
    loss: 'Your trigger is chasing losses. Day 2 is especially important — it names the exact deception at work.',
    win: "Your trigger is winning momentum. Day 1's P&L audit will be illuminating.",
    habit: "Automatic behavior means the pattern is deep. Day 1 brings it back to conscious awareness.",
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white">
      {/* Header */}
      <div className="border-b border-white/5 px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors mb-1 block">
              ← QuitTrade
            </Link>
            <h1 className="text-lg font-bold">Your 6-Day Program</h1>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-400">{completedDays.length}/6</div>
            <div className="text-xs text-white/30">days complete</div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${(completedDays.length / 6) * 100}%` }}
            />
          </div>
          {completedDays.length === 6 && (
            <div className="mt-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center font-medium">
              Program complete. You are no longer the person who started Day 1.
            </div>
          )}
        </div>

        {/* Personalised message */}
        {assessment?.trigger && motivationMessages[assessment.trigger] && (
          <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/6 text-sm text-white/50">
            <span className="text-white/70 font-medium">Personalised note: </span>
            {motivationMessages[assessment.trigger]}
          </div>
        )}

        {/* Day cards */}
        <div className="space-y-3">
          {days.map((day) => {
            const isUnlocked = unlocked(day.day);
            const isDone = completed(day.day);
            const isCurrent = day.day === currentDay && !isDone;

            return (
              <div
                key={day.day}
                className={`rounded-2xl border transition-all ${
                  isDone
                    ? 'border-emerald-500/20 bg-emerald-500/5'
                    : isCurrent
                    ? 'border-white/15 bg-white/[0.04]'
                    : isUnlocked
                    ? 'border-white/8 bg-white/[0.02]'
                    : 'border-white/4 bg-white/[0.01] opacity-40'
                }`}
              >
                <div className="flex items-center gap-4 p-5">
                  {/* Icon / status */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${day.color} flex items-center justify-center text-2xl ${!isUnlocked ? 'grayscale opacity-50' : ''}`}>
                      {isDone ? '✓' : day.icon}
                    </div>
                    {isCurrent && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs text-white/30">Day {day.day}</span>
                      <span className="text-xs text-white/20">·</span>
                      <span className="text-xs text-white/30">{day.duration}</span>
                      {isDone && <span className="text-xs text-emerald-400 font-medium ml-1">Complete</span>}
                    </div>
                    <div className="font-semibold text-sm">{day.title}</div>
                    <div className="text-xs text-white/40 mt-0.5">{day.subtitle}</div>
                  </div>

                  {/* CTA */}
                  {isUnlocked ? (
                    <Link
                      href={`/day/${day.day}`}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isDone
                          ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                          : isCurrent
                          ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                          : 'bg-white/5 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      {isDone ? 'Review' : isCurrent ? 'Start →' : 'Open'}
                    </Link>
                  ) : (
                    <div className="flex-shrink-0 text-white/20 text-xl">🔒</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* How to use the program */}
        <div className="mt-10 p-5 rounded-xl border border-white/6 bg-white/[0.02]">
          <h3 className="font-semibold text-sm mb-3">How to use this program</h3>
          <ul className="space-y-2">
            {[
              'Each day: read the lesson, then watch the exercise 4× across the day (not all at once)',
              'Morning / before trading / after a session / before bed — spread the 4 watches',
              'Complete the behavioral exercise. Write your answers somewhere private.',
              'Mark the day complete only after doing all three parts.',
              "Don't rush. One day per day minimum. Let the material work.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-white/40">
                <span className="text-emerald-500/60 flex-shrink-0 mt-0.5">→</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
