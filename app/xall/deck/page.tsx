'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Slide({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full aspect-video bg-[#0A0A0A] relative overflow-hidden border border-[#222]">
      <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
      <div className="w-full h-full p-[5%]">
        {children}
      </div>
    </div>
  );
}

function StatCard({ text }: { text: string }) {
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-2">
      <span className="text-gray-300 text-[10px] md:text-xs">{text}</span>
    </div>
  );
}

export default function DeckViewer() {
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('xall_access') !== '1') {
      router.replace('/xall');
    } else {
      setHasAccess(true);
    }
  }, [router]);

  if (!hasAccess) return null;

  return (
    <div className="min-h-[100svh] bg-[#060606] text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur border-b border-[#222] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-black tracking-[0.15em]">XALL</span>
          <span className="text-gray-500 text-xs hidden sm:inline">Pitch Deck</span>
        </div>
        <a
          href="/XALL-Pitch-Deck.pptx"
          download
          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wide transition-colors"
        >
          Download PPTX
        </a>
      </div>

      {/* Slides */}
      <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">

        {/* SLIDE 1: Title */}
        <Slide>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-4xl md:text-7xl font-black tracking-[0.3em] text-white">XALL</h1>
            <p className="text-emerald-400 text-sm md:text-xl italic mt-3">Your Personal Financial Agent</p>
            <p className="text-gray-500 text-[10px] md:text-sm tracking-[0.15em] mt-4">xQuit &gt; xTree &gt; XALL</p>
            <div className="w-16 h-px bg-emerald-500 my-4" />
            <p className="text-gray-300 text-xs md:text-sm">Shubham Hudda | Founder</p>
            <p className="text-gray-500 text-[10px] md:text-xs mt-1">April 2026</p>
          </div>
        </Slide>

        {/* SLIDE 2: The Problem */}
        <Slide>
          <div className="h-full flex flex-col">
            <div className="mb-3">
              <span className="text-3xl md:text-5xl font-black text-red-500">93%</span>
              <p className="text-white text-sm md:text-lg mt-1">of retail traders lose money</p>
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1">
              <StatCard text="220M+ demat accounts in India" />
              <StatCard text="10M+ active F&O traders" />
              <StatCard text="Rs 2.88 TRILLION lost (FY22-25)" />
              <StatCard text="9.5% show addictive trading patterns" />
              <StatCard text="Gaming apps blocked by government" />
              <StatCard text="Digital addiction flagged as public health risk" />
            </div>
            <p className="text-emerald-300 text-[10px] md:text-sm italic text-center mt-3">
              &ldquo;You don&apos;t have a discipline problem. You have a dopamine loop.&rdquo;
            </p>
          </div>
        </Slide>

        {/* SLIDE 3: Why Now */}
        <Slide>
          <div className="h-full flex flex-col">
            <h2 className="text-xl md:text-3xl font-black text-white mb-4">A Perfect Storm</h2>
            <div className="space-y-2 flex-1">
              {[
                ['Retail derivatives share', '2% (2018) → 41% (2024)'],
                ['India\'s global options share', '84% of all equity options'],
                ['Demat growth', '39M → 220M+ in 5 years (4x)'],
                ['Clinical recognition', 'DSM-5 trading disorder parallels'],
                ['Research', 'Trading Disorder Scale published (2025)'],
                ['Financial literacy', 'Only 27% of Indian adults'],
                ['Regulation', 'Online Gaming Regulation Act 2025'],
              ].map(([label, value], i) => (
                <div key={i} className="flex items-center gap-3 border-b border-[#1A1A1A] pb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-gray-400 text-[10px] md:text-xs font-semibold w-32 md:w-40 shrink-0">{label}</span>
                  <span className="text-white text-[10px] md:text-xs">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* SLIDE 4: Vision */}
        <Slide>
          <div className="h-full flex flex-col">
            <h2 className="text-lg md:text-2xl font-black text-white mb-3">A Personal Financial Agent for Every Individual</h2>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { phase: 'Phase 1', name: 'xQuit', desc: 'Break the addiction', status: 'LIVE', active: true },
                { phase: 'Phase 2', name: 'xTree', desc: 'Learn to grow wealth wisely', status: '2026', active: false },
                { phase: 'Phase 3', name: 'XALL', desc: 'Full personal finance agent', status: '2027', active: false },
              ].map((p, i) => (
                <div key={i} className={`bg-[#1A1A1A] p-3 border ${p.active ? 'border-emerald-500' : 'border-[#2A2A2A]'}`}>
                  <p className="text-gray-500 text-[8px] md:text-[10px]">{p.phase}</p>
                  <p className="text-emerald-300 text-sm md:text-lg font-black">{p.name}</p>
                  <p className="text-gray-400 text-[8px] md:text-[10px] mt-1">{p.desc}</p>
                  <p className={`text-[8px] md:text-[10px] font-bold mt-1 ${p.active ? 'text-emerald-500' : 'text-gray-500'}`}>{p.status}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#1A1A1A] p-3 flex-1">
              <p className="text-white text-xs font-semibold">The XALL Agent</p>
              <p className="text-gray-400 text-[10px] md:text-xs mt-1">Ingests all transactions (bank, UPI, crypto, securities). Learns spending patterns. Provides tax optimization, budgeting, and financial planning.</p>
              <p className="text-emerald-300 text-[10px] md:text-xs font-semibold mt-1">Runs 100% locally - not even the government sees your data.</p>
            </div>
            <p className="text-emerald-500 text-[10px] md:text-xs italic text-center mt-2">Losing money → Quitting bad habits → Growing wealth → Financial autonomy</p>
          </div>
        </Slide>

        {/* SLIDE 5: xQuit MVP */}
        <Slide>
          <div className="h-full flex flex-col">
            <h2 className="text-lg md:text-2xl font-black mb-3">
              <span className="text-emerald-300">xQuit.in</span>
              <span className="text-white"> - Break Free from Compulsive Trading</span>
            </h2>
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="space-y-2">
                {['Free 6-day CBT-based recovery program', 'Science-backed: dopamine loop rewiring, urge surfing', 'Personalized assessment → tailored daily content', '36+ personalized affirmations', 'Mobile-first, dark mode, privacy-first'].map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span className="text-gray-300 text-[10px] md:text-xs">{f}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white text-xs font-semibold mb-2">The 6-Day Journey</p>
                {[['Day 1', 'The Dopamine Loop'], ['Day 2', 'The Deceptions'], ['Day 3', 'The Real Reasons'], ['Day 4', 'The Withdrawal Myth'], ['Day 5', 'Your Quit Day'], ['Day 6', 'Building Your New Life']].map(([day, topic], i) => (
                  <div key={i} className="bg-[#1A1A1A] px-2 py-1.5 mb-1 flex gap-2">
                    <span className="text-emerald-500 text-[10px] font-bold w-10 shrink-0">{day}</span>
                    <span className="text-gray-300 text-[10px]">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1A1A1A] py-2 text-center mt-2">
              <span className="text-gray-500 text-[8px] md:text-[10px] italic">Referenced by: Stanford Addiction Medicine | DSM-5 | Kahneman&apos;s Behavioral Economics</span>
            </div>
          </div>
        </Slide>

        {/* SLIDE 6: Funnel Strategy */}
        <Slide>
          <div className="h-full flex flex-col">
            <h2 className="text-xl md:text-3xl font-black text-white mb-4">The Funnel Strategy</h2>
            <div className="flex flex-col items-center gap-3 flex-1 justify-center">
              {[
                { title: 'CAPTURE', sub: 'xQuit (Free)', desc: 'Meet users at their most painful moment - trading losses. Free, science-backed recovery.', w: '100%', border: 'border-emerald-700' },
                { title: 'EDUCATE', sub: 'xTree (Freemium)', desc: 'Graduate recovered users to financial education. Build real skills with gold, oil basics.', w: '80%', border: 'border-emerald-500' },
                { title: 'CONVERT', sub: 'XALL (Premium)', desc: 'Premium personal finance agent. High willingness to pay - these users already lost big.', w: '60%', border: 'border-emerald-300' },
              ].map((f, i) => (
                <div key={i} className={`bg-[#1A1A1A] border ${f.border} p-3 flex gap-4`} style={{ width: f.w }}>
                  <span className="text-emerald-400 text-[10px] md:text-xs font-black w-16 shrink-0">{f.title}</span>
                  <div>
                    <span className="text-white text-[10px] md:text-xs font-semibold">{f.sub}</span>
                    <p className="text-gray-400 text-[8px] md:text-[10px] mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-emerald-500 text-[10px] md:text-xs text-center font-semibold mt-2">Massive TAM: 93% of 10M+ traders = 9.3M potential xQuit users in India alone</p>
          </div>
        </Slide>

        {/* SLIDE 7: Market Size */}
        <Slide>
          <div className="h-full flex flex-col">
            <h2 className="text-xl md:text-3xl font-black text-white mb-4">Market Size</h2>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[
                { label: 'TAM', value: '220M+', desc: 'Demat account holders in India\n$31.7B global personal finance app market', color: 'border-emerald-700' },
                { label: 'SAM', value: '10M+', desc: 'Active F&O traders who\'ve lost money\n$1.08B Asia-Pacific financial literacy market', color: 'border-emerald-500' },
                { label: 'SOM', value: '500K', desc: 'Problem traders in Year 1 (free)\n5% conversion = 25K paying users', color: 'border-emerald-300' },
              ].map((m, i) => (
                <div key={i} className={`bg-[#1A1A1A] border ${m.color} p-3 text-center`}>
                  <p className="text-emerald-400 text-xs font-black">{m.label}</p>
                  <p className="text-white text-2xl md:text-3xl font-black my-1">{m.value}</p>
                  <p className="text-gray-400 text-[8px] md:text-[10px] whitespace-pre-line">{m.desc}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className="bg-[#1A1A1A] p-3">
                <p className="text-gray-500 text-[8px]">Financial Literacy Market</p>
                <p className="text-white text-[10px] md:text-xs font-semibold">$4.37B (2024) → $12.75B (2033) | 12.8% CAGR</p>
              </div>
              <div className="bg-[#1A1A1A] p-3">
                <p className="text-gray-500 text-[8px]">Personal Finance Apps</p>
                <p className="text-white text-[10px] md:text-xs font-semibold">$31.7B (2025) → $173.6B (2035) | 20.8% CAGR</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* SLIDE 8: Business Model */}
        <Slide>
          <div className="h-full flex flex-col">
            <h2 className="text-xl md:text-3xl font-black text-white mb-4">How We Make Money</h2>
            <div className="grid grid-cols-3 gap-3 flex-1">
              {[
                { tag: 'Acquisition', name: 'xQuit', price: 'FREE', desc: 'User acquisition & trust building\nScience-backed recovery program', tagBg: 'bg-gray-500' },
                { tag: 'Monetization', name: 'xTree', price: '$5-15/mo', desc: 'Premium courses & simulations\nFinancial education modules', tagBg: 'bg-emerald-500' },
                { tag: 'Premium', name: 'XALL Agent', price: '$20-50/mo', desc: 'Transaction analysis, tax optimization\nPortfolio insights, budget automation', tagBg: 'bg-emerald-300' },
              ].map((m, i) => (
                <div key={i} className="bg-[#1A1A1A] border border-[#2A2A2A] p-3">
                  <span className={`${m.tagBg} text-[#0A0A0A] text-[7px] md:text-[8px] font-bold px-2 py-0.5`}>{m.tag}</span>
                  <p className="text-white text-sm md:text-lg font-black mt-2">{m.name}</p>
                  <p className="text-emerald-500 text-lg md:text-xl font-black">{m.price}</p>
                  <p className="text-gray-400 text-[8px] md:text-[10px] mt-2 whitespace-pre-line">{m.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#1A1A1A] p-3 mt-3">
              <span className="text-emerald-500 text-[10px] md:text-xs font-semibold">Future: </span>
              <span className="text-gray-300 text-[10px] md:text-xs">B2B partnerships with brokerages, banks, and fintechs for responsible trading programs</span>
            </div>
          </div>
        </Slide>

        {/* SLIDE 9: Competitive Landscape */}
        <Slide>
          <div className="h-full flex flex-col">
            <h2 className="text-lg md:text-2xl font-black text-white mb-4">Why Not Just Another Finance App?</h2>
            <div className="flex-1">
              <div className="bg-emerald-700 flex text-[10px] md:text-xs font-semibold">
                <span className="w-1/3 p-2">Competitor</span>
                <span className="w-2/3 p-2">What&apos;s Missing</span>
              </div>
              {[
                ['Zerodha Varsity', 'Education only, no behavioral intervention'],
                ['Cred', 'Rewards-based, no financial planning agent'],
                ['ET Money / Groww', 'Investment-first, ignore the addiction problem'],
                ['Gambling Recovery Apps', 'Not finance-specific, Western-focused'],
              ].map(([name, gap], i) => (
                <div key={i} className={`flex text-[10px] md:text-xs ${i % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#151515]'}`}>
                  <span className="w-1/3 p-2 font-semibold">{name}</span>
                  <span className="w-2/3 p-2 text-gray-400">{gap}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#1A1A1A] border border-emerald-500 p-3 mt-3">
              <span className="text-emerald-500 text-[10px] md:text-xs font-semibold">XALL&apos;s Moat: </span>
              <span className="text-white text-[10px] md:text-xs">The only platform that starts with addiction recovery, then education, then autonomous agent</span>
            </div>
            <p className="text-emerald-300 text-[10px] md:text-xs italic text-center mt-2">&ldquo;We meet users where they are: in pain. Then we guide them to wealth.&rdquo;</p>
          </div>
        </Slide>

        {/* SLIDE 10: Founder */}
        <Slide>
          <div className="h-full flex flex-col">
            <p className="text-gray-500 text-xs">Founder</p>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Shubham Hudda</h2>
            <div className="flex-1 space-y-1">
              {[
                { role: 'AVP, Crypto Growth & BD', company: 'Ajaib', detail: 'SoftBank/YC-backed fintech unicorn, Indonesia' },
                { role: 'Crypto Ecosystem Lead', company: 'CoinSwitch', detail: 'India\'s largest crypto exchange' },
                { role: 'Cohort Member', company: 'Entrepreneur First', detail: 'Talent investor backed by Reid Hoffman' },
                { role: 'Early Team', company: 'NoBroker, BYJU\'S', detail: 'High-growth Indian startups' },
                { role: 'Trader', company: 'Futures First', detail: 'Proprietary trading firm' },
              ].map((e, i) => (
                <div key={i} className={`flex items-center text-[10px] md:text-xs ${i % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#151515]'} p-2`}>
                  <span className="w-[35%] font-semibold text-white">{e.role}</span>
                  <span className="w-[20%] text-emerald-500 font-semibold">{e.company}</span>
                  <span className="w-[45%] text-gray-500">{e.detail}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {['9+ years in crypto & fintech', 'MNIT Jaipur alumnus', 'Lived the trading world', 'Solo founder, building lean'].map((b, i) => (
                <div key={i} className="bg-[#1A1A1A] border border-emerald-700 py-2 text-center">
                  <span className="text-gray-300 text-[8px] md:text-[10px]">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* SLIDE 11: Roadmap */}
        <Slide>
          <div className="h-full flex flex-col">
            <h2 className="text-lg md:text-2xl font-black text-white mb-4">Where We Are & Where We&apos;re Going</h2>
            <div className="flex-1 flex flex-col justify-center space-y-2 pl-8 relative">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-[#333]" />
              {[
                { time: 'NOW', title: 'xQuit MVP Live', desc: '6-day CBT program at xquit.in', active: true },
                { time: 'Q2 2026', title: 'Launch Marketing', desc: 'Target 10K signups', active: false },
                { time: 'Q3 2026', title: 'xTree Beta', desc: 'Financial education: gold, oil trading basics', active: false },
                { time: 'Q4 2026', title: 'XALL Agent Alpha', desc: 'Transaction ingestion, basic insights', active: false },
                { time: '2027', title: 'Full XALL Launch', desc: 'Local-first AI agent, tax optimization', active: false },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-3 relative">
                  <div className={`absolute -left-[22px] w-3 h-3 rounded-full border-2 ${m.active ? 'bg-emerald-500 border-emerald-500' : 'bg-[#1A1A1A] border-[#444]'}`} />
                  <span className={`text-[10px] font-bold w-14 shrink-0 ${m.active ? 'text-emerald-500' : 'text-gray-500'}`}>{m.time}</span>
                  <div className={`flex-1 px-3 py-2 ${m.active ? 'bg-[#0D3B2E] border border-emerald-500' : 'bg-[#1A1A1A] border border-[#2A2A2A]'}`}>
                    <span className="text-white text-[10px] md:text-xs font-semibold">{m.title}</span>
                    <span className="text-gray-400 text-[10px] md:text-xs ml-3">{m.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-emerald-500 text-[10px] md:text-xs text-center font-semibold mt-3">Seeking $500K pre-seed to hire, scale xQuit marketing, and build xTree</p>
          </div>
        </Slide>

        {/* SLIDE 12: The Ask */}
        <Slide>
          <div className="h-full flex flex-col">
            <h2 className="text-xl md:text-3xl font-black text-white mb-4">Raising $500K Pre-Seed</h2>
            <div className="grid grid-cols-2 gap-6 flex-1">
              {/* Visual breakdown */}
              <div className="flex flex-col justify-center space-y-1">
                {[
                  { pct: 40, label: 'Engineering', color: 'bg-emerald-700' },
                  { pct: 30, label: 'Marketing & UA', color: 'bg-emerald-500' },
                  { pct: 20, label: 'Content', color: 'bg-emerald-300' },
                  { pct: 10, label: 'Operations', color: 'bg-emerald-600' },
                ].map((f, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-gray-300">{f.label}</span>
                      <span className="text-emerald-400 font-bold">{f.pct}%</span>
                    </div>
                    <div className="h-3 bg-[#1A1A1A]">
                      <div className={`h-full ${f.color}`} style={{ width: `${f.pct * 2.5}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              {/* Details */}
              <div className="space-y-3 flex flex-col justify-center">
                {[
                  { pct: '40%', label: 'Engineering', desc: 'Build xTree + XALL agent foundation' },
                  { pct: '30%', label: 'Marketing & UA', desc: 'Scale xQuit virally' },
                  { pct: '20%', label: 'Content', desc: 'Financial education modules' },
                  { pct: '10%', label: 'Operations', desc: 'Infrastructure & admin' },
                ].map((f, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-emerald-500 text-sm md:text-lg font-black w-10 shrink-0">{f.pct}</span>
                    <div>
                      <p className="text-white text-[10px] md:text-xs font-semibold">{f.label}</p>
                      <p className="text-gray-400 text-[8px] md:text-[10px]">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1A1A1A] border border-emerald-500 p-2 text-center mt-2">
              <span className="text-emerald-500 text-[10px] md:text-xs font-semibold">Goal: </span>
              <span className="text-gray-300 text-[10px] md:text-xs">50K xQuit users + 2.5K xTree beta users by EOY 2026</span>
            </div>
            <p className="text-emerald-300 text-[10px] md:text-xs italic text-center mt-2">&ldquo;Help us turn India&apos;s biggest financial addiction into its biggest financial literacy movement.&rdquo;</p>
          </div>
        </Slide>

        {/* SLIDE 13: Closing */}
        <Slide>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-4xl md:text-7xl font-black tracking-[0.3em] text-white">XALL</h1>
            <p className="text-emerald-400 text-sm md:text-lg italic mt-3">From addiction → education → autonomy</p>
            <div className="w-16 h-px bg-emerald-500 my-6" />
            <p className="text-gray-300 text-xs md:text-sm">TG: @shubhamhudda | xquit.in | linkedin.com/in/imhudda</p>
            <p className="text-white text-lg md:text-xl font-semibold mt-4">Let&apos;s talk.</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500" />
        </Slide>

        {/* Bottom download CTA */}
        <div className="text-center py-8">
          <a
            href="/XALL-Pitch-Deck.pptx"
            download
            className="inline-block px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm tracking-wide transition-colors"
          >
            Download Full PPTX
          </a>
          <p className="text-gray-600 text-xs mt-3">TG: @shubhamhudda</p>
        </div>
      </div>
    </div>
  );
}
