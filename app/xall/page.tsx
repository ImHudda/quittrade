'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function XallLanding() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/xall/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
        return;
      }

      localStorage.setItem('xall_access', '1');
      router.push('/xall/deck');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[100svh] bg-[#0A0A0A] text-white flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Top accent */}
      <div className="h-1 bg-emerald-500 w-full" />

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <h1 className="text-6xl md:text-8xl font-black tracking-[0.3em] mb-4">
          XALL
        </h1>
        <p className="text-emerald-400 text-lg md:text-xl italic mb-2">
          Your Personal Financial Agent
        </p>
        <p className="text-gray-500 text-sm tracking-[0.2em] mb-12">
          xQuit &gt; xTree &gt; XALL
        </p>

        {/* Pitch deck teaser */}
        <div className="max-w-md w-full space-y-6">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-6 space-y-3">
            <p className="text-emerald-400 text-xs font-semibold tracking-wider uppercase">
              Investor Pitch Deck
            </p>
            <p className="text-white text-lg font-semibold">
              From addiction recovery to financial autonomy
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              13-slide deck covering the problem, vision, market size, business model, traction, and ask. Backed by SEBI data and clinical research.
            </p>
            <div className="flex gap-4 pt-2 text-xs text-gray-500">
              <span>13 slides</span>
              <span>$500K pre-seed</span>
              <span>220M+ TAM</span>
            </div>
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="email"
                required
                placeholder="Enter your email to view the deck"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#111] border border-[#333] text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              />
            </div>
            {error && (
              <p className="text-red-400 text-xs">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'View Pitch Deck'}
            </button>
            <p className="text-gray-600 text-xs text-center">
              No spam. We just want to know who is interested.
            </p>
          </form>
        </div>

        {/* Founder line */}
        <div className="mt-16 text-center">
          <div className="w-12 h-px bg-emerald-500 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">
            Shubham Hudda &middot; Founder
          </p>
          <p className="text-gray-600 text-xs mt-1">
            TG: @shubhamhudda
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-1 bg-emerald-500 w-full" />
    </div>
  );
}
