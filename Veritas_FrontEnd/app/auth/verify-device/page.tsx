'use client';

import React from "react"

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Smartphone } from 'lucide-react';

export default function DeviceVerificationPage() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-md mx-auto">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-foreground/5 border border-foreground/20 rounded-full">
              <Smartphone className="w-12 h-12 text-foreground/70" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Device Verification Required</h1>
            <p className="text-foreground/60">
              We detected a login from a new device. Please verify your identity.
            </p>
          </div>

          {!verified ? (
            /* Verification Form */
            <div className="border border-gray-200 dark:border-gray-800 p-8 rounded">
              <form onSubmit={handleVerify} className="space-y-6">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-foreground mb-2">
                    Verification Code
                  </label>
                  <p className="text-xs text-foreground/60 mb-4">
                    Enter the verification code sent to your registered email.
                  </p>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full px-4 py-2 bg-background border border-gray-200 dark:border-gray-800 text-foreground placeholder-foreground/40 rounded text-center text-2xl focus:outline-none focus:ring-1 focus:ring-foreground/20 transition"
                    disabled={loading}
                    autoFocus
                  />
                </div>

                {error && (
                  <div className="p-3 bg-foreground/5 border border-foreground/20 rounded">
                    <p className="text-sm text-foreground/70">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full px-4 py-2 bg-foreground text-background rounded font-medium hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? 'Verifying Device...' : 'Verify Device'}
                </button>
              </form>

              <div className="mt-6 p-4 bg-foreground/5 border border-foreground/20 rounded">
                <p className="text-xs text-foreground/70 leading-relaxed">
                  <strong>Device Info:</strong> This verification helps protect your account from unauthorized access.
                </p>
              </div>
            </div>
          ) : (
            /* Success Message */
            <div className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-8 rounded text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Device Verified</h2>
              <p className="text-sm text-foreground/70">Your device has been successfully verified.</p>
              <p className="text-xs text-foreground/60 mt-4">Redirecting to dashboard...</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
