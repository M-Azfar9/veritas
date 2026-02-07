'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth-card';
import { OTPInput } from '@/components/otp-input';
import { UsernameGeneratorInput } from '@/components/username-generator-input';
import { PasswordInput } from '@/components/password-input';
import api from '@/lib/api';

type SignupStep = 'email' | 'otp' | 'account' | 'device-verification';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<SignupStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationId, setVerificationId] = useState('');

  // Username generation
  const adjectives = [
    'silent', 'swift', 'bold', 'calm', 'keen', 'sharp', 'bright', 'wise',
    'quiet', 'hidden', 'curious', 'clever', 'gentle', 'noble', 'lucky', 'strong'
  ];
  const nouns = [
    'hawk', 'wolf', 'eagle', 'tiger', 'fox', 'owl', 'lion', 'bear',
    'orbit', 'shadow', 'flame', 'river', 'mountain', 'storm', 'thunder', 'crystal'
  ];

  const generateUsername = () => {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 1000);
    setUsername(`${adj}_${noun}_${num}`);
  };

  // Step 1: Email validation
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Updated validation to allow subdomains like name@faculty.nust.edu.pk
    const nustEmailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)*nust\.edu\.pk$/;

    if (!nustEmailRegex.test(email)) {
      setError('Please use a valid NUST email (ending in nust.edu.pk)');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/verify-email/', { email });
      setStep('otp');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: OTP verification
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/verify-otp/', { email, otp });
      setVerificationId(response.data.verification_id);
      generateUsername();
      setStep('account');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/verify-email/', { email });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Account creation
  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username) {
      setError('Please generate a username');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/register/', {
        username,
        password,
        verification_id: verificationId
      });

      // Store tokens
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      // Redirect to feed
      router.push('/feed');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create account.');
      if (err.response?.data?.username) {
        setError(`Username error: ${err.response.data.username[0]}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 py-8">
      <AuthCard>
        {/* Step 1: Email */}
        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-black dark:text-white">Create Anonymous Account</h1>
              <p className="text-black/70 dark:text-white/70 text-sm mt-1">Verification is required to maintain trust</p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black dark:text-white mb-2">
                University Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@nust.edu.pk"
                disabled={loading}
                className="w-full px-4 py-2 border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-black dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-white transition disabled:opacity-50"
                autoFocus
              />
              <p className="text-xs text-black/70 dark:text-white/70 mt-2">Only university emails allowed. Your identity will never be shown publicly.</p>
            </div>

            {error && <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">{error}</div>}

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-black dark:bg-white text-white dark:text-black rounded-full px-4 py-2 font-medium hover:bg-black/90 dark:hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 mt-6"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>

            <div className="text-center text-sm text-black/70 dark:text-white/70">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-black dark:text-white font-medium hover:underline">
                Login
              </Link>
            </div>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-black dark:text-white">Enter verification code</h1>
              <p className="text-black/70 dark:text-white/70 text-sm mt-1">Check your email for a 6-digit code</p>
              <p className="text-xs text-neutral-500 mt-2">Code sent to {email}</p>
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
              onClick={handleResendOtp}
              disabled={loading}
              className="w-full text-black dark:text-white text-sm hover:text-black/70 dark:hover:text-white/70 transition disabled:opacity-50"
            >
              Didn't receive code? Resend
            </button>
          </form>
        )}

        {/* Step 3: Account Creation */}
        {step === 'account' && (
          <form onSubmit={handleAccountSubmit} className="space-y-4">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-black dark:text-white">Set up your anonymous identity</h1>
              <p className="text-black/70 dark:text-white/70 text-sm mt-1">Create your unique anonymous username and password</p>
            </div>

            <UsernameGeneratorInput
              value={username}
              onGenerate={generateUsername}
              disabled={loading}
            />

            <PasswordInput
              value={password}
              onChange={setPassword}
              disabled={loading}
              helperText="This password will only work on verified devices."
            />

            {error && <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">{error}</div>}

            <button
              type="submit"
              disabled={loading || !username || password.length < 8}
              className="w-full bg-black dark:bg-white text-white dark:text-black rounded-full px-4 py-2 font-medium hover:bg-black/90 dark:hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 mt-6"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}
      </AuthCard>
    </main>
  );
}
