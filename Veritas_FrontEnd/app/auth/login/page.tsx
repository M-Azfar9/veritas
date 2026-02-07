'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth-card';
import { DeviceVerification } from '@/components/device-verification';
import { getDeviceFingerprint } from '@/lib/fingerprint';
import api from '@/lib/api';

type LoginStep = 'username' | 'password' | 'device_email' | 'device_otp';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>('username');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fingerprint, setFingerprint] = useState('');

  useEffect(() => {
    getDeviceFingerprint().then(setFingerprint).catch(console.error);
  }, []);

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }

    setLoading(true);
    // Simulate check
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
        password,
        device_fingerprint: fingerprint
      });

      // Store tokens
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      window.dispatchEvent(new Event('auth-change'));
      router.push('/feed');

    } catch (err: any) {
      const detail = err.response?.data?.detail || 'Invalid credentials';
      const code = err.response?.data?.code;

      if (code === 'device_verification_required') {
        setStep('device_email');
        setError('New device detected. Please verify your identity.');
      } else {
        setError(detail);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeviceEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/device/request-otp/', {
        username,
        email
      });
      setStep('device_otp');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleDeviceVerify = async () => {
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/device/verify/', {
        username,
        email,
        otp,
        device_fingerprint: fingerprint
      });
      // Verification success. Auto-login.
      const response = await api.post('/auth/login/', {
        username,
        password,
        device_fingerprint: fingerprint
      });
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      window.dispatchEvent(new Event('auth-change'));
      router.push('/feed');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await api.post('/auth/device/request-otp/', {
        username,
        email
      });
      alert("OTP Resent");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 py-8">
      <AuthCard>

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

        {step === 'device_email' && (
          <form onSubmit={handleDeviceEmailSubmit} className="space-y-4">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-black dark:text-white">New Device Detected</h1>
              <p className="text-black/70 dark:text-white/70 text-sm mt-1">Please enter your email to verify ownership.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-black dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-white transition disabled:opacity-50"
                placeholder="user@nust.edu.pk"
                required
              />
            </div>
            {error && <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black dark:bg-white text-white dark:text-black rounded-full px-4 py-2 font-medium"
            >
              {loading ? 'Sending OTP...' : 'Send Verification Code'}
            </button>
          </form>
        )}

        {step === 'device_otp' && (
          <>
            {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">{error}</div>}
            <DeviceVerification
              otp={otp}
              onOtpChange={setOtp}
              onVerify={handleDeviceVerify}
              onResend={handleResendOtp}
              loading={loading}
            />
          </>
        )}

      </AuthCard>

      <p className="text-center text-xs text-gray-500 mt-6">
        By logging in, you agree to our privacy policy. Your email is only used for verification.
      </p>
    </main>
  );
}
