'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, hasSupabase } from '../../lib/supabase';

type Step = 'phone' | 'otp' | 'done';

export default function AuthPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function formatPhone(raw: string) {
    // Add +91 if no country code provided
    const cleaned = raw.replace(/\D/g, '');
    if (cleaned.startsWith('91') && cleaned.length === 12) return `+${cleaned}`;
    if (cleaned.length === 10) return `+91${cleaned}`;
    return `+${cleaned}`;
  }

  async function sendOtp() {
    setError('');
    const formatted = formatPhone(phone);
    if (formatted.length < 10) {
      setError('Please enter a valid phone number.');
      return;
    }

    setLoading(true);

    if (!hasSupabase) {
      // Demo mode — skip real OTP, go straight to program
      if (typeof window !== 'undefined') {
        localStorage.setItem('qt_user_phone', formatted);
      }
      router.push('/program');
      return;
    }

    const { error: err } = await supabase.auth.signInWithOtp({ phone: formatted });
    setLoading(false);

    if (err) {
      setError(err.message);
    } else {
      setStep('otp');
    }
  }

  async function verifyOtp() {
    setError('');
    const formatted = formatPhone(phone);
    setLoading(true);

    if (!hasSupabase) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('qt_user_phone', formatted);
      }
      router.push('/program');
      return;
    }

    const { error: err } = await supabase.auth.verifyOtp({
      phone: formatted,
      token: otp,
      type: 'sms',
    });
    setLoading(false);

    if (err) {
      setError('Invalid code. Please try again.');
    } else {
      router.push('/program');
    }
  }

  return (
    <div className="min-h-[100svh] bg-[#080810] text-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <button onClick={() => router.back()} className="text-white/30 text-sm mb-6 block">← Back</button>
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-2xl mb-5">
          📱
        </div>
        {step === 'phone' ? (
          <>
            <h1 className="text-2xl font-bold mb-2">Enter your phone number</h1>
            <p className="text-sm text-white/45 leading-relaxed">
              We&apos;ll send you a one-time code. No spam. Your number is never shared.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2">Enter the code</h1>
            <p className="text-sm text-white/45">
              Sent to <span className="text-white/70">{formatPhone(phone)}</span>
            </p>
          </>
        )}
      </div>

      <div className="flex-1 px-5 pt-4">
        {step === 'phone' ? (
          <div>
            <div className="flex rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden mb-4">
              <div className="px-4 py-4 text-sm text-white/50 border-r border-white/8 flex items-center bg-white/[0.02] flex-shrink-0">
                🇮🇳 +91
              </div>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 bg-transparent px-4 py-4 text-base text-white placeholder-white/20 outline-none"
                autoFocus
              />
            </div>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <button
              onClick={sendOtp}
              disabled={loading || phone.length < 8}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
                loading || phone.length < 8
                  ? 'bg-white/5 text-white/20 cursor-not-allowed'
                  : 'bg-emerald-500 text-black'
              }`}
            >
              {loading ? 'Sending...' : 'Send code →'}
            </button>

            <p className="mt-6 text-xs text-white/25 text-center leading-relaxed">
              By continuing you agree that we may send you an SMS. Standard rates may apply.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <input
                type="text"
                inputMode="numeric"
                placeholder="- - - - - -"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 text-2xl font-bold text-center text-white tracking-[0.5em] placeholder-white/15 outline-none focus:border-emerald-500/40"
                autoFocus
              />
            </div>

            {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

            <button
              onClick={verifyOtp}
              disabled={loading || otp.length !== 6}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
                loading || otp.length !== 6
                  ? 'bg-white/5 text-white/20 cursor-not-allowed'
                  : 'bg-emerald-500 text-black'
              }`}
            >
              {loading ? 'Verifying...' : 'Verify →'}
            </button>

            <button
              onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
              className="w-full py-3 text-sm text-white/30 mt-2"
            >
              Change number
            </button>

            <p className="mt-2 text-xs text-white/20 text-center">Didn&apos;t get a code? Wait 60 seconds then try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}
