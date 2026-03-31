'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { days } from '../../data/program';

function markdownToJsx(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (!line.trim()) return <div key={i} className="h-3" />;
    // Bold text **...**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-sm text-white/60 leading-relaxed">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="text-white/85 font-semibold">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
}

export default function DayPage({ params }: { params: Promise<{ day: string }> }) {
  const { day: dayParam } = use(params);
  const router = useRouter();
  const dayNum = parseInt(dayParam);
  const dayData = days.find(d => d.day === dayNum);

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [watchCount, setWatchCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'reading' | 'exercise' | 'practice'>('reading');
  const [dayCompleted, setDayCompleted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const key = `qt_day${dayNum}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const data = JSON.parse(saved);
        setCompletedSteps(data.steps || []);
        setWatchCount(data.watches || 0);
        setDayCompleted(data.completed || false);
      }
    }
  }, [dayNum]);

  function saveProgress(steps: number[], watches: number, completed: boolean) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`qt_day${dayNum}`, JSON.stringify({ steps, watches, completed }));
    }
  }

  function toggleStep(i: number) {
    const next = completedSteps.includes(i)
      ? completedSteps.filter(s => s !== i)
      : [...completedSteps, i];
    setCompletedSteps(next);
    saveProgress(next, watchCount, dayCompleted);
  }

  function addWatch() {
    const next = Math.min(watchCount + 1, 4);
    setWatchCount(next);
    saveProgress(completedSteps, next, dayCompleted);
  }

  function completeDay() {
    saveProgress(completedSteps, watchCount, true);
    setDayCompleted(true);
    // Update program progress
    if (typeof window !== 'undefined') {
      const cd = JSON.parse(localStorage.getItem('qt_completed_days') || '[]');
      if (!cd.includes(dayNum)) cd.push(dayNum);
      localStorage.setItem('qt_completed_days', JSON.stringify(cd));
      const nextDay = dayNum + 1;
      if (nextDay <= 6) {
        localStorage.setItem('qt_current_day', String(nextDay));
      }
    }
    router.push('/program');
  }

  if (!dayData) {
    return (
      <div className="min-h-screen bg-[#080810] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-white/50">Day not found.</p>
          <Link href="/program" className="mt-4 block text-emerald-400 text-sm">
            ← Back to program
          </Link>
        </div>
      </div>
    );
  }

  const allStepsComplete = completedSteps.length >= dayData.exercise.steps.length;
  const canComplete = watchCount >= 1 && allStepsComplete;

  return (
    <div className="min-h-screen bg-[#080810] text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-white/5 bg-[#080810]/90 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/program" className="text-white/30 hover:text-white/70 transition-colors">
            ←
          </Link>
          <div className="flex-1">
            <div className="text-xs text-white/30">Day {dayData.day} · {dayData.duration}</div>
            <div className="font-semibold text-sm">{dayData.title}</div>
          </div>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${dayData.color} flex items-center justify-center text-lg`}>
            {dayData.icon}
          </div>
        </div>

        {/* Tab bar */}
        <div className="max-w-2xl mx-auto px-6 pb-0 flex gap-0 border-t border-white/5">
          {[
            { id: 'reading', label: 'Reading' },
            { id: 'exercise', label: `Exercise (${watchCount}/4)` },
            { id: 'practice', label: `Practice (${completedSteps.length}/${dayData.exercise.steps.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-3 text-xs font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-white/30 hover:text-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* READING TAB */}
        {activeTab === 'reading' && (
          <div>
            <h2 className="text-xl font-bold mb-6">{dayData.reading.title}</h2>
            <div className="space-y-1">
              {markdownToJsx(dayData.reading.content)}
            </div>
            <button
              onClick={() => setActiveTab('exercise')}
              className="mt-8 w-full py-3 bg-white/5 hover:bg-white/8 border border-white/8 rounded-xl text-sm text-white/60 hover:text-white/80 transition-all"
            >
              Done reading → Go to Exercise
            </button>
          </div>
        )}

        {/* EXERCISE TAB */}
        {activeTab === 'exercise' && (
          <div>
            <h2 className="text-xl font-bold mb-2">{dayData.videoExercise.title}</h2>
            <p className="text-xs text-white/40 mb-6 leading-relaxed">{dayData.videoExercise.instruction}</p>

            {/* Watch counter */}
            <div className="mb-6 p-5 rounded-xl border border-white/8 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium">Watch count</div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                        watchCount >= n
                          ? 'bg-emerald-500 text-black'
                          : 'bg-white/5 text-white/20'
                      }`}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              </div>

              {watchCount < 4 ? (
                <button
                  onClick={addWatch}
                  className="w-full py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-medium transition-all"
                >
                  ✓ Mark as watched ({watchCount}/4)
                </button>
              ) : (
                <div className="w-full py-3 text-center text-emerald-400 text-sm font-medium bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  All 4 watches complete ✓
                </div>
              )}

              <p className="mt-3 text-xs text-white/25 text-center">
                Spread 4 watches across the day — morning, before, after, and before bed
              </p>
            </div>

            {/* Script */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/6">
              <div className="text-xs text-white/30 mb-3 uppercase tracking-wider font-medium">Exercise Script</div>
              <div className="space-y-3">
                {dayData.videoExercise.script.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm text-white/65 leading-relaxed italic">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('practice')}
              className="mt-6 w-full py-3 bg-white/5 hover:bg-white/8 border border-white/8 rounded-xl text-sm text-white/60 hover:text-white/80 transition-all"
            >
              Done → Go to Practice Exercise
            </button>
          </div>
        )}

        {/* PRACTICE TAB */}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-xl font-bold mb-2">{dayData.exercise.title}</h2>
            <p className="text-xs text-white/40 mb-6">
              Check off each step as you complete it. Be honest — this is for you, not performance.
            </p>

            <div className="space-y-3 mb-8">
              {dayData.exercise.steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => toggleStep(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    completedSteps.includes(i)
                      ? 'border-emerald-500/25 bg-emerald-500/8'
                      : 'border-white/6 bg-white/[0.02] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded flex-shrink-0 mt-0.5 flex items-center justify-center border transition-all ${
                      completedSteps.includes(i)
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-white/20'
                    }`}>
                      {completedSteps.includes(i) && (
                        <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm leading-relaxed ${
                      completedSteps.includes(i) ? 'text-white/40 line-through' : 'text-white/65'
                    }`}>
                      {step}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Complete Day */}
            {!dayCompleted ? (
              <div>
                {!canComplete && (
                  <div className="mb-4 p-3 rounded-lg bg-white/3 border border-white/6 text-xs text-white/35 text-center">
                    Complete all steps and at least 1 watch to mark the day done
                  </div>
                )}
                <button
                  onClick={completeDay}
                  disabled={!canComplete}
                  className={`w-full py-4 rounded-xl font-semibold text-sm transition-all ${
                    canComplete
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-black'
                      : 'bg-white/5 text-white/20 cursor-not-allowed'
                  }`}
                >
                  {dayNum === 6 ? 'Complete the program →' : `Complete Day ${dayNum} →`}
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="inline-flex flex-col items-center gap-3 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-3xl">✓</div>
                  <div className="text-emerald-400 font-semibold">Day {dayNum} complete</div>
                  <Link
                    href="/program"
                    className="text-sm text-emerald-400/70 hover:text-emerald-400 transition-colors"
                  >
                    Back to program →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
