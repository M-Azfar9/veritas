'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth-card';
import { OTPInput } from '@/components/otp-input';
import { DeviceVerification } from '@/components/device-verification';
import { Footer } from '@/components/footer';
import api from '@/lib/api';

type LoginStep = 'username' | 'password' | 'device-verification';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>('username');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deviceVerificationNeeded, setDeviceVerificationNeeded] = useState(false);

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }

    setLoading(true);
    // Prepare for password step
    setTimeout(() => {
      setLoading(false);
      setStep('password');
    }, 500);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/login/', {
        username,
        password
      });

      // Store tokens
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      // Notify other components (Navbar)
      window.dispatchEvent(new Event('auth-change'));

      // Check for device verification requirement?
      // For MVP, assume success and redirect
      router.push('/feed');

    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  // Device verification handled by backend logic in future
  const handleDeviceVerify = async () => {
    // Placeholder
  };

  const handleResendOtp = () => {
    // Placeholder
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 py-8">
      <AuthCard>
        {!deviceVerificationNeeded ? (
          <>
            {step === 'username' && (
              <form onSubmit={handleUsernameSubmit} className="space-y-4">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-black dark:text-white">Login to Veritas</h1>
                  <p className="text-black/70 dark:text-white/70 text-sm mt-1">Enter your anonymous username</p>
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-black dark:text-white mb-2">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g., silent_orbit_392"
                    disabled={loading}
                    className="w-full px-4 py-2 border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-black dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-white transition disabled:opacity-50"
                    autoComplete="username"
                    autoFocus
                  />
                </div>

                {error && <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">{error}</div>}

                <button
                  type="submit"
                  disabled={loading || !username.trim()}
                  className="w-full bg-black dark:bg-white text-white dark:text-black rounded-full px-4 py-2 font-medium hover:bg-black/90 dark:hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 mt-6"
                >
                  {loading ? 'Continue...' : 'Continue'}
                </button>

                <div className="text-center text-sm text-black/70 dark:text-white/70">
                  Don't have an account?{' '}
                  <Link href="/auth/signup" className="text-black dark:text-white font-medium hover:underline">
                    Create one
                  </Link>
                </div>
              </form>
            )}

            {step === 'password' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-black dark:text-white">Enter your password</h1>
                  <p className="text-black/70 dark:text-white/70 text-sm mt-1">Verified for {username}</p>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-black dark:text-white mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={loading}
                    className="w-full px-4 py-2 border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-black dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-white transition disabled:opacity-50"
                    autoComplete="current-password"
                    autoFocus
                  />
                </div>

                {error && <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">{error}</div>}

                <button
                  type="submit"
                  disabled={loading || password.length < 8}
                  className="w-full bg-black dark:bg-white text-white dark:text-black rounded-full px-4 py-2 font-medium hover:bg-black/90 dark:hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 mt-6"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            )}
          </>
        ) : (
          <DeviceVerification
            otp={otp}
            onOtpChange={setOtp}
            onVerify={handleDeviceVerify}
            onResend={handleResendOtp}
            loading={loading}
          />
        )}
      </AuthCard>

      {/* Help Text */}
      <p className="text-center text-xs text-gray-500 mt-6">
        By logging in, you agree to our privacy policy. Your email is only used for verification.
      </p>
    </main>
  );
}
