'use client';

import Link from 'next/link';
import { experts, deceptions, days, stats } from './data/program';

export default function QuitLandingPage() {
  return (
    <div className="min-h-screen bg-[#080810] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#080810]/80 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight">Quit<span className="text-emerald-400">Trade</span></span>
        </div>
        <Link
          href="/assessment"
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold rounded-lg transition-colors"
        >
          Start Free →
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Science-backed · No willpower required · 6 days
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            You don&apos;t have a
            <br />
            <span className="text-emerald-400">discipline problem.</span>
            <br />
            You have a{' '}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              dopamine loop.
            </span>
          </h1>

          <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-2xl mx-auto">
            Compulsive trading is classified as a behavioral addiction. It has nothing to do with willpower,
            discipline, or intelligence. QuitTrade is a 6-day program built on the same psychology used
            to treat gambling disorder — because they are the same condition.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/assessment"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all text-lg"
            >
              Start the free program →
            </Link>
            <a
              href="#science"
              className="w-full sm:w-auto px-8 py-4 border border-white/10 hover:border-white/20 text-white/70 hover:text-white rounded-xl transition-all text-sm"
            >
              See the research
            </a>
          </div>

          <p className="mt-6 text-xs text-white/30">
            Free · No account required · Based on CBT and Relapse Prevention therapy
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/5 bg-white/[0.02] px-6 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-emerald-400 mb-1">{stat.value}</div>
              <div className="text-xs text-white/40 leading-tight">{stat.label}</div>
              <div className="text-[10px] text-white/20 mt-1">{stat.source}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Science section */}
      <section id="science" className="px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">The Science They Don&apos;t Tell You</h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Four world-leading researchers on why compulsive trading is not a choice — and why
            understanding this is the first step to escaping it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experts.map((expert) => (
            <div
              key={expert.name}
              className="rounded-2xl border border-white/6 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${expert.color} flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                  {expert.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{expert.name}</div>
                  <div className="text-xs text-white/40 mt-0.5">{expert.title}</div>
                  <div className="text-xs text-white/30 italic mt-0.5">{expert.book}</div>
                </div>
              </div>
              <blockquote className="text-sm text-white/70 leading-relaxed border-l-2 border-white/10 pl-4">
                &ldquo;{expert.quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      </section>

      {/* The ITCH — Deceptions */}
      <section className="px-6 py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-4">
              The ITCH
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Lies Your Addiction Tells You
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm">
              Every compulsive trader hears these thoughts. They feel like logic.
              They are the addiction speaking. Learn to recognize each one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deceptions.map((d, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/6 bg-white/[0.02] p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-400 text-xs flex-shrink-0 mt-0.5">
                    ✕
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-2 text-red-300/80">{d.title}</div>
                    <div className="text-xs text-white/50 leading-relaxed">{d.reality}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Day Program */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">The 6-Day Program</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm">
            Structured after QuitSure&apos;s clinically-validated approach. Each day: one reading,
            one exercise repeated 4× for subconscious retraining, one behavioral practice.
          </p>
        </div>

        <div className="space-y-3">
          {days.map((day) => (
            <div
              key={day.day}
              className="flex items-center gap-5 p-5 rounded-xl border border-white/6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${day.color} flex items-center justify-center text-xl flex-shrink-0`}>
                {day.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white/30 mb-0.5">Day {day.day} · {day.duration}</div>
                <div className="font-semibold text-sm">{day.title}</div>
                <div className="text-xs text-white/40 mt-0.5">{day.subtitle}</div>
              </div>
              <div className="text-white/20 flex-shrink-0">→</div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/assessment"
            className="inline-block px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all text-lg"
          >
            Begin Day 1 — Free →
          </Link>
          <p className="mt-3 text-xs text-white/30">No signup. No payment. Start immediately.</p>
        </div>
      </section>

      {/* How it works — vs willpower */}
      <section className="px-6 py-16 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Why willpower has never worked</h2>
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                Willpower is a resource that depletes. The dopamine loop is a biological drive
                that regenerates. Every &ldquo;I&apos;ll stop after this trade&rdquo; is willpower fighting a
                survival mechanism. It cannot win long-term.
              </p>
              <p className="text-sm text-white/50 leading-relaxed">
                QuitTrade works differently: it rewires what your subconscious believes about
                trading. When you no longer believe the trade will give you what you need,
                the urge loses its power. No willpower required.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Willpower approach', desc: 'Fight the urge. White-knuckle it. Fail.', bad: true },
                { label: 'QuitTrade approach', desc: 'Understand the urge. Remove its power. Transcend it.', bad: false },
                { label: 'The outcome', desc: '90% CBT success rate in program completers at 6 months.', bad: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`p-4 rounded-xl border ${item.bad ? 'border-red-500/15 bg-red-500/5' : 'border-emerald-500/15 bg-emerald-500/5'}`}
                >
                  <div className={`text-xs font-semibold mb-1 ${item.bad ? 'text-red-400' : 'text-emerald-400'}`}>{item.label}</div>
                  <div className="text-xs text-white/50">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            The urge will pass in{' '}
            <span className="text-emerald-400">20 minutes</span>.
            <br />
            So will this one.
          </h2>
          <p className="text-white/50 mb-8 text-sm leading-relaxed">
            Each urge you don&apos;t act on weakens the addiction&apos;s hold. This program teaches you
            to ride every one. Start with Day 1 — it takes 45 minutes and costs nothing.
          </p>
          <Link
            href="/assessment"
            className="inline-block px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all text-xl"
          >
            I&apos;m ready to stop →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8 text-center text-xs text-white/20">
        <p className="mb-2">
          QuitTrade is not a medical service. It is an educational program based on published research.
          If you are in crisis, please contact the{' '}
          <span className="text-white/40">National Problem Gambling Helpline: 1-800-522-4700</span>
        </p>
        <p>Research sources: Stanford Addiction Medicine, DSM-5, Marlatt &amp; Gordon Relapse Prevention Model, Journal of Finance, PMC</p>
      </footer>
    </div>
  );
}
