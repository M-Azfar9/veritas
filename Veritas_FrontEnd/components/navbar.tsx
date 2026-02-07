'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { UserSessionIndicator } from './user-session-indicator';
import { NotificationPanel } from './notification-panel';
import { HowItWorksModal } from './how-it-works-modal';
import api from '@/lib/api';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reputationScore, setReputationScore] = useState(0.2); // Default

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setIsAuthenticated(true);
        // Fetch profile
        try {
          const response = await api.get('/users/profile/');
          if (response.data && response.data.profile_trust_score) {
            setReputationScore(parseFloat(response.data.profile_trust_score));
          }
        } catch (error) {
          console.error('Failed to fetch profile:', error);
          // If 401, maybe token invalid?
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    // Listen for storage events (login/logout in other tabs or components)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-tab login updates
    window.addEventListener('auth-change', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleStorageChange);
    };
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-150">
            <Image
              src="/logo.svg"
              alt="Veritas Logo"
              width={48}
              height={48}
              priority
              className="filter hover:drop-shadow-lg dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-150"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/feed" className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-all duration-150 font-medium text-sm">
              Feed
            </Link>
            <Link href="/trust" className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-all duration-150 font-medium text-sm">
              Trust
            </Link>
            <Link href="/dashboard" className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-all duration-150 font-medium text-sm">
              Dashboard
            </Link>
          </div>

          {/* Notifications & Auth */}
          <div className="hidden sm:flex items-center gap-2">
            <HowItWorksModal />
            <NotificationPanel notifications={[
              {
                id: '1',
                type: 'vote_result',
                title: 'Vote Result',
                description: 'A rumor you voted on has been verified.',
                timestamp: '2 hours ago',
                read: false,
              },
            ]} />
            <UserSessionIndicator isAuthenticated={isAuthenticated} reputationScore={reputationScore} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-black dark:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-neutral-200 dark:border-neutral-800">
            <Link href="/feed" className="block px-4 py-2 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-all duration-150 font-medium text-sm">
              Feed
            </Link>
            <Link href="/trust" className="block px-4 py-2 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-all duration-150 font-medium text-sm">
              Trust
            </Link>
            <Link href="/dashboard" className="block px-4 py-2 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-all duration-150 font-medium text-sm">
              Dashboard
            </Link>
            <div className="mt-2">
              <UserSessionIndicator isAuthenticated={isAuthenticated} reputationScore={reputationScore} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
