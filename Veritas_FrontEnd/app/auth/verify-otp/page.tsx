'use client';

import React from "react"

import { useState } from 'react';
import { AuthCard } from '@/components/auth-card';
import { OTPInput } from '@/components/otp-input';

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/feed';
      }, 1500);
    }, 600);
  };

  const handleResend = () => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 py-8">
      <AuthCard>
        {!success ? (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-black dark:text-white">Verify your device</h1>
              <p className="text-black/70 dark:text-white/70 text-sm mt-1">Check your email for a 6-digit code</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-4">Verification Code</label>
              <OTPInput value={otp} onChange={setOtp} disabled={loading} />
            </div>

            {error && <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">{error}</div>}

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-black dark:bg-white text-white dark:text-black rounded-full px-4 py-2 font-medium hover:bg-black/90 dark:hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 mt-6"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>

            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className="w-full text-black dark:text-white text-sm hover:text-black/70 dark:hover:text-white/70 transition-all duration-150 disabled:opacity-50"
            >
              Didn't receive code? Resend
            </button>
          </form>
        ) : (
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-black/10 dark:bg-white/10 rounded-full">
              <svg className="w-6 h-6 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg text-black dark:text-white">Verification Successful</p>
              <p className="text-sm text-black/70 dark:text-white/70 mt-1">Redirecting to feed...</p>
            </div>
          </div>
        )}
      </AuthCard>
    </main>
  );
}
