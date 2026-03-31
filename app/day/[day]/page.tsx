'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { days } from '../../data/program';
import { affirmations } from '../../data/affirmations';

function parseContent(text: string) {
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <div key={i} className="h-3" />;
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-[0.95rem] text-white/60 leading-[1.75]">
        {parts.map((p, j) =>
          p.startsWith('**') && p.endsWith('**')
            ? <strong key={j} className="text-white/90 font-bold">{p.slice(2, -2)}</strong>
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
  const dayAffirmation = affirmations[(dayNum * 4) % affirmations.length];

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
          <div className="text-5xl mb-4">🔒</div>
          <p className="text-white/40 text-sm mb-4">This day is not unlocked yet.</p>
          <Link href="/program" className="text-emerald-400 text-sm font-medium">← Back to program</Link>
        </div>
      </div>
    );
  }

  const allDone = completedSteps.length >= dayData.exercise.steps.length;
  const canComplete = watchCount >= 1 && allDone;

  return (
    <div className="min-h-[100svh] bg-[#080810] text-white flex flex-col"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}>

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-[#080810]/95 backdrop-blur-xl sticky top-0 z-20">
        <Link href="/program" className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 text-white/50 text-lg flex-shrink-0">
          ←
        </Link>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] text-white/30 font-medium uppercase tracking-wider">Day {dayData.day} · {dayData.duration}</div>
          <div className="font-black text-sm leading-tight truncate">{dayData.title}</div>
        </div>
        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${dayData.color} flex items-center justify-center text-lg flex-shrink-0`}>
          {dayData.icon}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scroll-momentum" style={{ paddingBottom: 'calc(80px + max(env(safe-area-inset-bottom), 16px))' }}>

        {/* READ */}
        {tab === 'read' && (
          <div className="px-5 py-6">
            <div className="mb-6 p-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/5">
              <div className="text-[10px] text-emerald-500/50 font-semibold uppercase tracking-widest mb-2">Affirmation</div>
              <p className="text-sm text-emerald-100/75 leading-relaxed italic">&ldquo;{dayAffirmation}&rdquo;</p>
            </div>
            <h2 className="text-xl font-black mb-5 leading-tight tracking-tight">{dayData.reading.title}</h2>
            <div className="space-y-1 mb-8">{parseContent(dayData.reading.content)}</div>
            <button
              onClick={() => setTab('watch')}
              className="w-full py-4 rounded-2xl bg-emerald-500 text-black font-bold text-base shadow-lg shadow-emerald-500/20">
              Done reading → Go to Watch
            </button>
          </div>
        )}

        {/* WATCH */}
        {tab === 'watch' && (
          <div className="px-5 py-6">
            <h2 className="text-xl font-black mb-1 tracking-tight">{dayData.videoExercise.title}</h2>
            <p className="text-sm text-white/40 mb-6 leading-relaxed">{dayData.videoExercise.instruction}</p>

            {/* Watch tracker */}
            <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.025] mb-5">
              <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-4">Today&apos;s watches</div>
              <div className="flex gap-3 mb-4">
                {[1,2,3,4].map(n => (
                  <div key={n} className={`flex-1 h-12 rounded-xl flex items-center justify-center text-sm font-black transition-all ${
                    watchCount >= n ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30' : 'bg-white/5 text-white/20'
                  }`}>
                    {watchCount >= n ? '✓' : n}
                  </div>
                ))}
              </div>
              {watchCount < 4 ? (
                <button onClick={addWatch}
                  className="w-full py-3.5 bg-emerald-500 rounded-xl text-black font-bold text-sm shadow-md shadow-emerald-500/20">
                  ✓ Mark as watched ({watchCount}/4)
                </button>
              ) : (
                <div className="w-full py-3.5 text-center text-emerald-400 text-sm font-bold bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  All 4 complete ✓
                </div>
              )}
              <p className="mt-3 text-[11px] text-white/20 text-center">Spread: morning · before trading · after · bedtime</p>
            </div>

            {/* Script */}
            <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/6 mb-5">
              <div className="text-[10px] text-white/30 mb-3 uppercase tracking-widest font-semibold">Exercise Script</div>
              <div className="space-y-3">
                {dayData.videoExercise.script.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm text-white/55 leading-relaxed italic">{para}</p>
                ))}
              </div>
            </div>

            <button onClick={() => setTab('practice')}
              className="w-full py-4 rounded-2xl bg-emerald-500 text-black font-bold text-base shadow-lg shadow-emerald-500/20">
              Go to Practice →
            </button>
          </div>
        )}

        {/* PRACTICE */}
        {tab === 'practice' && (
          <div className="px-5 py-6">
            <h2 className="text-xl font-black mb-1 tracking-tight">{dayData.exercise.title}</h2>
            <p className="text-sm text-white/40 mb-5">Check off each step as you complete it.</p>

            <div className="space-y-2.5 mb-6">
              {dayData.exercise.steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => toggleStep(i)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    completedSteps.includes(i)
                      ? 'border-emerald-500/25 bg-emerald-500/8'
                      : 'border-white/6 bg-white/[0.025]'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                      completedSteps.includes(i) ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'
                    }`}>
                      {completedSteps.includes(i) && (
                        <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 14 14">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm leading-relaxed ${completedSteps.includes(i) ? 'text-white/30 line-through' : 'text-white/70'}`}>
                      {step}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {!dayDone ? (
              <div>
                {!canComplete && (
                  <p className="text-xs text-white/25 text-center mb-3 leading-relaxed">
                    {watchCount < 1 && !allDone ? 'Complete all steps + at least 1 watch' : watchCount < 1 ? 'Mark at least 1 watch first' : 'Complete all practice steps'}
                  </p>
                )}
                <button
                  onClick={completeDay}
                  disabled={!canComplete}
                  className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
                    canComplete ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-white/20'
                  }`}
                >
                  {dayNum === 6 ? '🎉 Complete the program' : `Complete Day ${dayNum} →`}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <div className="text-4xl">✓</div>
                <div className="text-emerald-400 font-black text-xl">Day {dayNum} complete</div>
                <p className="text-sm text-white/45 italic leading-relaxed">&ldquo;{dayAffirmation}&rdquo;</p>
                <Link href="/program"
                  className="mt-1 px-8 py-3.5 bg-emerald-500 text-black font-bold rounded-2xl text-sm shadow-lg shadow-emerald-500/20">
                  Continue →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Tab Bar — native app style */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0d0d1a]/95 backdrop-blur-xl border-t border-white/8 z-20"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}>
        <div className="flex">
          {[
            { id: 'read', icon: '📖', label: 'Read' },
            { id: 'watch', icon: '▶', label: `Watch ${watchCount}/4` },
            { id: 'practice', icon: '✓', label: `Practice ${completedSteps.length}/${dayData.exercise.steps.length}` },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={`flex-1 flex flex-col items-center gap-1 py-3.5 relative transition-all ${
                tab === t.id ? 'text-emerald-400' : 'text-white/30'
              }`}
            >
              {tab === t.id && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-emerald-400 rounded-full" />}
              <span className={`text-lg leading-none ${t.id === 'watch' ? 'text-sm font-bold' : ''}`}>{t.icon}</span>
              <span className="text-[10px] font-semibold">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
