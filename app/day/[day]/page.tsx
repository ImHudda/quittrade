'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { days } from '../../data/program';

function parseContent(text: string) {
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <div key={i} className="h-2" />;
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-sm text-white/60 leading-relaxed">
        {parts.map((p, j) =>
          p.startsWith('**') && p.endsWith('**')
            ? <strong key={j} className="text-white/85 font-semibold">{p.slice(2, -2)}</strong>
            : p
        )}
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
  const [tab, setTab] = useState<'read' | 'watch' | 'practice'>('read');
  const [dayDone, setDayDone] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`qt_day${dayNum}`);
      if (saved) {
        const d = JSON.parse(saved);
        setCompletedSteps(d.steps || []);
        setWatchCount(d.watches || 0);
        setDayDone(d.completed || false);
      }
    }
  }, [dayNum]);

  function save(steps: number[], watches: number, completed: boolean) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`qt_day${dayNum}`, JSON.stringify({ steps, watches, completed }));
    }
  }

  function toggleStep(i: number) {
    const next = completedSteps.includes(i) ? completedSteps.filter(s => s !== i) : [...completedSteps, i];
    setCompletedSteps(next);
    save(next, watchCount, dayDone);
  }

  function addWatch() {
    const next = Math.min(watchCount + 1, 4);
    setWatchCount(next);
    save(completedSteps, next, dayDone);
  }

  function completeDay() {
    save(completedSteps, watchCount, true);
    setDayDone(true);
    if (typeof window !== 'undefined') {
      const cd = JSON.parse(localStorage.getItem('qt_completed_days') || '[]');
      if (!cd.includes(dayNum)) cd.push(dayNum);
      localStorage.setItem('qt_completed_days', JSON.stringify(cd));
      if (dayNum + 1 <= 6) localStorage.setItem('qt_current_day', String(dayNum + 1));
    }
    router.push('/program');
  }

  if (!dayData) {
    return (
      <div className="min-h-[100svh] bg-[#080810] text-white flex items-center justify-center">
        <div className="text-center px-5">
          <div className="text-4xl mb-4">🔒</div>
          <Link href="/program" className="text-emerald-400 text-sm">← Back to program</Link>
        </div>
      </div>
    );
  }

  const allDone = completedSteps.length >= dayData.exercise.steps.length;
  const canComplete = watchCount >= 1 && allDone;

  return (
    <div className="min-h-[100svh] bg-[#080810] text-white flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-[#080810]/95 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/program" className="text-white/35 text-lg leading-none">←</Link>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-white/30">Day {dayData.day} · {dayData.duration}</div>
            <div className="font-semibold text-sm truncate">{dayData.title}</div>
          </div>
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${dayData.color} flex items-center justify-center text-base flex-shrink-0`}>
            {dayData.icon}
          </div>
        </div>

        {/* Tab bar — short labels */}
        <div className="flex border-t border-white/5">
          {[
            { id: 'read', label: 'Read' },
            { id: 'watch', label: `Watch ${watchCount}/4` },
            { id: 'practice', label: `Practice ${completedSteps.length}/${dayData.exercise.steps.length}` },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={`flex-1 py-3 text-xs font-medium border-b-2 transition-all ${
                tab === t.id ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-white/30'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-5 py-6 pb-24">
        {/* READ */}
        {tab === 'read' && (
          <div>
            <h2 className="text-lg font-bold mb-5">{dayData.reading.title}</h2>
            <div className="space-y-1 mb-8">{parseContent(dayData.reading.content)}</div>
            <button
              onClick={() => setTab('watch')}
              className="w-full py-4 rounded-xl bg-emerald-500 text-black font-bold text-sm"
            >
              Done reading → Go to Watch
            </button>
          </div>
        )}

        {/* WATCH */}
        {tab === 'watch' && (
          <div>
            <h2 className="text-lg font-bold mb-1">{dayData.videoExercise.title}</h2>
            <p className="text-xs text-white/40 mb-5 leading-relaxed">{dayData.videoExercise.instruction}</p>

            {/* Watch tracker */}
            <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02] mb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Watches today</span>
                <div className="flex gap-2">
                  {[1,2,3,4].map(n => (
                    <div key={n} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${watchCount >= n ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/20'}`}>
                      {n}
                    </div>
                  ))}
                </div>
              </div>
              {watchCount < 4 ? (
                <button onClick={addWatch} className="w-full py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-medium">
                  ✓ Mark watched ({watchCount}/4)
                </button>
              ) : (
                <div className="w-full py-3 text-center text-emerald-400 text-sm font-medium bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  All 4 complete ✓
                </div>
              )}
              <p className="mt-2 text-[11px] text-white/20 text-center">Spread across: morning · before · after · bedtime</p>
            </div>

            {/* Script */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/6">
              <div className="text-[11px] text-white/30 mb-3 uppercase tracking-wider font-medium">Exercise Script</div>
              <div className="space-y-3">
                {dayData.videoExercise.script.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm text-white/60 leading-relaxed italic">{para}</p>
                ))}
              </div>
            </div>

            <button onClick={() => setTab('practice')} className="mt-5 w-full py-4 rounded-xl bg-emerald-500 text-black font-bold text-sm">
              Go to Practice →
            </button>
          </div>
        )}

        {/* PRACTICE */}
        {tab === 'practice' && (
          <div>
            <h2 className="text-lg font-bold mb-1">{dayData.exercise.title}</h2>
            <p className="text-xs text-white/40 mb-5">Check off each step as you complete it.</p>

            <div className="space-y-2.5 mb-6">
              {dayData.exercise.steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => toggleStep(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    completedSteps.includes(i) ? 'border-emerald-500/25 bg-emerald-500/8' : 'border-white/6 bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center ${completedSteps.includes(i) ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'}`}>
                      {completedSteps.includes(i) && (
                        <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm leading-relaxed ${completedSteps.includes(i) ? 'text-white/35 line-through' : 'text-white/65'}`}>
                      {step}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {!dayDone ? (
              <div>
                {!canComplete && (
                  <p className="text-xs text-white/30 text-center mb-3">Complete all steps + at least 1 watch first</p>
                )}
                <button
                  onClick={completeDay}
                  disabled={!canComplete}
                  className={`w-full py-4 rounded-xl font-bold text-sm ${canComplete ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
                >
                  {dayNum === 6 ? 'Complete the program →' : `Complete Day ${dayNum} →`}
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="inline-flex flex-col items-center gap-3 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-3xl">✓</div>
                  <div className="text-emerald-400 font-semibold">Day {dayNum} complete</div>
                  <Link href="/program" className="text-sm text-emerald-400/70">Back to program →</Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
