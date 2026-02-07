'use client';

import { useState } from 'react';
import Link from 'next/link';

export interface UserSessionIndicatorProps {
  isAuthenticated?: boolean;
  reputationScore?: number;
  anonymousToken?: string;
}

export function UserSessionIndicator({
  isAuthenticated = false,
  reputationScore = 0.2,
  anonymousToken = 'token_xyz...',
}: UserSessionIndicatorProps) {
  const [showDetails, setShowDetails] = useState(false);

  if (!isAuthenticated) {
    return (
      <Link
        href="/auth/login"
        className="px-4 py-2 bg-foreground text-background rounded hover:bg-foreground/90 transition font-medium text-sm"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-800 text-foreground rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition"
      >
        <div className="w-2 h-2 bg-foreground rounded-full" />
        <span className="text-sm font-medium">Rep: {reputationScore.toFixed(2)}</span>
        <svg
          className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {showDetails && (
        <div className="absolute right-0 mt-2 w-64 border border-gray-200 dark:border-gray-800 bg-background p-4 text-sm space-y-3 z-40 rounded">
          <div>
            <p className="text-gray-400 mb-1">Anonymous Token</p>
            <p className="text-cyan-400 font-mono text-xs break-all">{anonymousToken}</p>
          </div>
          <div className="border-t border-gray-700/50 pt-3">
            <p className="text-gray-400 mb-1">Reputation Score</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-800/50 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  style={{ width: `${(reputationScore / 10) * 100}%` }}
                />
              </div>
              <span className="text-white font-bold">{reputationScore.toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-xs mt-2">Based on voting accuracy and proof quality</p>
          </div>
          <div className="border-t border-gray-700/50 pt-3 space-y-2">
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-gray-300 hover:text-cyan-400 transition text-center bg-gray-800/30 rounded hover:bg-gray-800/60"
            >
              View Profile
            </Link>
            <button
              className="w-full px-3 py-2 text-gray-300 hover:text-red-400 transition bg-gray-800/30 rounded hover:bg-gray-800/60"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
