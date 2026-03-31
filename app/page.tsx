'use client';

import Link from 'next/link';
import { experts, deceptions, days, stats } from './data/program';

export default function LandingPage() {
  return (
    <div className="min-h-[100svh] bg-[#080810] text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#080810]/90 backdrop-blur-xl border-b border-white/5">
        <span className="text-base font-bold tracking-tight">Quit<span className="text-emerald-400">Trade</span></span>
        <Link href="/assessment" className="px-4 py-2 bg-emerald-500 text-black text-sm font-bold rounded-lg">
          Start Free →
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[100svh] px-5 pt-16 pb-24 text-center">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/6 blur-3xl" />
        </div>

        <div className="relative w-full max-w-md mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Science-backed · No willpower · 6 days
          </div>

          <h1 className="text-[2.2rem] leading-[1.15] font-bold mb-5">
            You don&apos;t have a<br />
            <span className="text-emerald-400">discipline problem.</span><br />
            You have a{' '}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              dopamine loop.
            </span>
          </h1>

          <p className="text-sm text-white/55 leading-relaxed mb-7 max-w-sm mx-auto">
            Compulsive trading is a behavioral addiction. QuitTrade is a 6-day program built on the same psychology used to treat gambling disorder — because they are the same condition.
          </p>

          <Link
            href="/assessment"
            className="block w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl text-base mb-3"
          >
            Start the free program →
          </Link>
          <a href="#science" className="block text-sm text-white/35 py-2">
            See the research ↓
          </a>
        </div>
      </section>

      {/* Stats scroll */}
      <section className="border-y border-white/5 bg-white/[0.02] py-6">
        <div className="flex gap-4 overflow-x-auto px-5 pb-1 scrollbar-hide">
          {stats.map((stat) => (
            <div key={stat.label} className="flex-shrink-0 text-center min-w-[120px]">
              <div className="text-xl font-bold text-emerald-400 mb-1">{stat.value}</div>
              <div className="text-[11px] text-white/40 leading-tight">{stat.label}</div>
              <div className="text-[10px] text-white/20 mt-0.5">{stat.source}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Experts */}
      <section id="science" className="px-5 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">The Science They Don&apos;t Tell You</h2>
          <p className="text-sm text-white/45 leading-relaxed">
            Four world-leading researchers on why compulsive trading is not a choice.
          </p>
        </div>
        <div className="space-y-4">
          {experts.map((expert) => (
            <div key={expert.name} className="rounded-2xl border border-white/6 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${expert.color} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                  {expert.avatar}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">{expert.name}</div>
                  <div className="text-[11px] text-white/35 leading-tight">{expert.title}</div>
                </div>
              </div>
              <blockquote className="text-sm text-white/60 leading-relaxed border-l-2 border-white/10 pl-3 italic">
                &ldquo;{expert.quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      </section>

      {/* Deceptions */}
      <section className="px-5 py-12 bg-white/[0.02] border-y border-white/5">
        <div className="mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-medium mb-3">
            The ITCH
          </div>
          <h2 className="text-2xl font-bold mb-2">Lies Your Addiction Tells You</h2>
          <p className="text-sm text-white/45">Every compulsive trader hears these. Learn to name them.</p>
        </div>
        <div className="space-y-3">
          {deceptions.map((d, i) => (
            <div key={i} className="rounded-xl border border-white/6 bg-white/[0.02] p-4">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-400 text-[10px] flex-shrink-0 mt-0.5">✕</div>
                <div>
                  <div className="font-semibold text-sm text-red-300/80 mb-1.5">{d.title}</div>
                  <div className="text-xs text-white/50 leading-relaxed">{d.reality}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6-Day Program */}
      <section className="px-5 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">The 6-Day Program</h2>
          <p className="text-sm text-white/45 leading-relaxed">
            Each day: one reading, one exercise repeated 4× for subconscious retraining, one behavioral practice.
          </p>
        </div>
        <div className="space-y-2">
          {days.map((day) => (
            <div key={day.day} className="flex items-center gap-3 p-4 rounded-xl border border-white/6 bg-white/[0.02]">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${day.color} flex items-center justify-center text-lg flex-shrink-0`}>
                {day.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-white/30 mb-0.5">Day {day.day} · {day.duration}</div>
                <div className="font-semibold text-sm">{day.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why willpower fails */}
      <section className="px-5 py-12 bg-white/[0.02] border-y border-white/5">
        <h2 className="text-2xl font-bold mb-4">Why willpower has never worked</h2>
        <p className="text-sm text-white/50 leading-relaxed mb-6">
          Willpower depletes. The dopamine loop regenerates. QuitTrade rewires what your subconscious believes about trading — so the urge loses its power before it even reaches willpower.
        </p>
        <div className="space-y-3">
          {[
            { label: 'Willpower approach', desc: 'Fight the urge. White-knuckle it. Fail.', bad: true },
            { label: 'QuitTrade approach', desc: 'Understand the urge. Remove its power. Transcend it.', bad: false },
            { label: 'The outcome', desc: '90% CBT success rate in program completers at 6 months.', bad: false },
          ].map((item) => (
            <div key={item.label} className={`p-4 rounded-xl border ${item.bad ? 'border-red-500/15 bg-red-500/5' : 'border-emerald-500/15 bg-emerald-500/5'}`}>
              <div className={`text-xs font-semibold mb-1 ${item.bad ? 'text-red-400' : 'text-emerald-400'}`}>{item.label}</div>
              <div className="text-xs text-white/50">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-16 text-center">
        <h2 className="text-2xl font-bold mb-3">
          The urge passes in <span className="text-emerald-400">20 minutes</span>.
        </h2>
        <p className="text-sm text-white/45 mb-8 leading-relaxed">
          Each urge you don&apos;t act on weakens the addiction&apos;s hold. Start Day 1 — 45 minutes, costs nothing.
        </p>
        <Link href="/assessment" className="block w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl text-base">
          I&apos;m ready to stop →
        </Link>
        <p className="mt-3 text-xs text-white/25">Free · No payment · Sign in with your phone</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-5 py-8 text-center text-[11px] text-white/20 space-y-2">
        <p>QuitTrade is not a medical service. In crisis? <span className="text-white/35">National Problem Gambling Helpline: 1-800-522-4700</span></p>
        <p>Research: Stanford Addiction Medicine · DSM-5 · Marlatt &amp; Gordon · Journal of Finance</p>
      </footer>

      {/* Sticky bottom CTA (mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#080810] to-transparent pb-safe md:hidden pointer-events-none">
        <Link href="/assessment" className="pointer-events-auto block w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl text-base text-center shadow-xl shadow-emerald-500/20">
          Start Free Program →
        </Link>
      </div>
    </div>
  );
}
