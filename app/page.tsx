'use client';

import Link from 'next/link';
import { experts, deceptions, days, stats } from './data/program';

export default function LandingPage() {
  return (
    <div className="min-h-[100svh] bg-[#080810] text-white overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 bg-[#080810]/85 backdrop-blur-xl border-b border-white/5"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 14px)', paddingBottom: '14px' }}>
        <span className="text-base font-bold tracking-tight">x<span className="text-emerald-400">Quit</span></span>
        <Link href="/assessment"
          className="px-5 py-2.5 bg-emerald-500 text-black text-sm font-bold rounded-xl">
          Start Free →
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[100svh] px-5 text-center"
        style={{ paddingTop: 'calc(max(env(safe-area-inset-top), 0px) + 80px)', paddingBottom: '100px' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/8 blur-[80px]" />
          <div className="absolute bottom-1/4 right-0 w-[200px] h-[200px] rounded-full bg-violet-500/6 blur-[60px]" />
        </div>

        <div className="relative w-full max-w-sm mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Science-backed · No willpower · 6 days
          </div>

          <h1 className="text-[2.6rem] leading-[1.1] font-black mb-5 tracking-tight">
            You don&apos;t have a<br />
            <span className="text-emerald-400">discipline</span><br />
            problem.
          </h1>

          <p className="text-base text-white/50 leading-relaxed mb-2">
            You have a <span className="text-violet-400 font-semibold">dopamine loop.</span>
          </p>
          <p className="text-sm text-white/35 leading-relaxed mb-8 max-w-xs mx-auto">
            Compulsive trading is a behavioral addiction — identical to gambling disorder. A 6-day CBT program to rewire it.
          </p>

          <Link href="/assessment"
            className="block w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl text-base mb-3 shadow-lg shadow-emerald-500/20">
            Start the free program →
          </Link>
          <a href="#science" className="block text-sm text-white/25 py-2">
            See the research ↓
          </a>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-white/6 bg-white/[0.015] py-5">
        <div className="flex gap-5 overflow-x-auto px-5 pb-1 scrollbar-hide">
          {stats.map((stat) => (
            <div key={stat.label} className="flex-shrink-0 text-center min-w-[110px]">
              <div className="text-2xl font-black text-emerald-400 mb-0.5">{stat.value}</div>
              <div className="text-[11px] text-white/40 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Experts */}
      <section id="science" className="px-5 py-14">
        <div className="mb-7">
          <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-2">The research</div>
          <h2 className="text-2xl font-black mb-2 tracking-tight">What science says</h2>
          <p className="text-sm text-white/40 leading-relaxed">
            Four world-leading researchers on why this is not a choice.
          </p>
        </div>
        <div className="space-y-3">
          {experts.map((expert) => (
            <div key={expert.name} className="rounded-2xl border border-white/6 bg-white/[0.025] p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${expert.color} flex items-center justify-center text-sm font-black flex-shrink-0`}>
                  {expert.avatar}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm">{expert.name}</div>
                  <div className="text-[11px] text-white/35 mt-0.5">{expert.title}</div>
                </div>
              </div>
              <blockquote className="text-sm text-white/55 leading-relaxed border-l-2 border-emerald-500/20 pl-3 italic">
                &ldquo;{expert.quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      </section>

      {/* Deceptions */}
      <section className="px-5 py-14 bg-white/[0.02] border-y border-white/5">
        <div className="mb-7">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-3">
            ⚠ The lies
          </div>
          <h2 className="text-2xl font-black mb-2 tracking-tight">Your addiction is talking</h2>
          <p className="text-sm text-white/40">Every compulsive trader hears these. Learn to name them.</p>
        </div>
        <div className="space-y-2.5">
          {deceptions.map((d, i) => (
            <div key={i} className="rounded-2xl border border-white/6 bg-[#0c0c16] p-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-red-500/15 flex items-center justify-center text-red-400 text-xs flex-shrink-0 mt-0.5 font-bold">✕</div>
                <div>
                  <div className="font-bold text-sm text-red-300/80 mb-1">{d.title}</div>
                  <div className="text-xs text-white/45 leading-relaxed">{d.reality}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6-Day Program */}
      <section className="px-5 py-14">
        <div className="mb-7">
          <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-2">The program</div>
          <h2 className="text-2xl font-black mb-2 tracking-tight">6 days. Complete reset.</h2>
          <p className="text-sm text-white/40 leading-relaxed">
            Reading + 4× subconscious exercise + behavioral practice. Every day.
          </p>
        </div>
        <div className="space-y-2">
          {days.map((day) => (
            <div key={day.day} className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${day.color} flex items-center justify-center text-xl flex-shrink-0`}>
                {day.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-white/25 mb-0.5 font-medium">Day {day.day} · {day.duration}</div>
                <div className="font-bold text-sm leading-tight">{day.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why CBT works */}
      <section className="px-5 py-14 bg-white/[0.02] border-y border-white/5">
        <h2 className="text-2xl font-black mb-3 tracking-tight">Why willpower never worked</h2>
        <p className="text-sm text-white/45 leading-relaxed mb-6">
          Willpower depletes. The dopamine loop regenerates. QuitTrade rewires what your subconscious believes — so the urge loses power before it reaches willpower.
        </p>
        <div className="space-y-2.5">
          {[
            { label: 'Willpower approach', desc: 'Fight the urge. White-knuckle it. Fail again.', bad: true },
            { label: 'QuitTrade (CBT)', desc: 'Understand the urge. Remove its power. Transcend it.', bad: false },
            { label: 'The outcome', desc: '90% success rate in program completers at 6 months.', bad: false },
          ].map((item) => (
            <div key={item.label} className={`p-4 rounded-2xl border ${item.bad ? 'border-red-500/15 bg-red-500/5' : 'border-emerald-500/15 bg-emerald-500/5'}`}>
              <div className={`text-xs font-bold mb-1.5 ${item.bad ? 'text-red-400' : 'text-emerald-400'}`}>{item.label}</div>
              <div className="text-sm text-white/50 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-16 text-center">
        <div className="text-5xl mb-5">⏱</div>
        <h2 className="text-2xl font-black mb-3 tracking-tight">
          The urge passes in <span className="text-emerald-400">20 minutes.</span>
        </h2>
        <p className="text-sm text-white/40 mb-8 leading-relaxed max-w-xs mx-auto">
          Each urge you don&apos;t act on weakens its hold. Start Day 1 — 45 minutes, costs nothing.
        </p>
        <Link href="/assessment"
          className="block w-full py-4 bg-emerald-500 text-black font-black rounded-2xl text-base shadow-lg shadow-emerald-500/20">
          I&apos;m ready to stop →
        </Link>
        <p className="mt-3 text-xs text-white/20">Free · No payment required</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-5 py-6 text-center text-[11px] text-white/20 space-y-2"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 28px)' }}>
        <p>Not a medical service. In crisis? <span className="text-white/35">1-800-522-4700</span></p>
        <p>Research: Stanford Addiction Medicine · DSM-5 · Marlatt &amp; Gordon</p>
      </footer>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-4 bg-gradient-to-t from-[#080810] via-[#080810]/90 to-transparent pointer-events-none md:hidden"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 20px)', paddingTop: '24px' }}>
        <Link href="/assessment"
          className="pointer-events-auto block w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl text-base text-center shadow-xl shadow-emerald-500/25">
          Start Free Program →
        </Link>
      </div>
    </div>
  );
}
