'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    voteActivity: true,
    proofFeedback: true,
    rumorUpdates: false,
    reputationChanges: true,
    settledRumors: true,
  });

  const [display, setDisplay] = useState({
    theme: 'dark',
    compactView: false,
    showReputation: true,
  });

  const [privacy, setPrivacy] = useState({
    hideVotingHistory: false,
    hideProofHistory: false,
    hideReputation: false,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDisplayChange = (key: keyof typeof display) => {
    setDisplay((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-400">Manage your preferences and account settings</p>
          </div>

          {/* Notification Settings */}
          <div className="glass glow-cyan p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 17H5v-2h10v2zm4-5H5v-2h14v2zm0-5H5V5h14v2z" />
              </svg>
              Notification Preferences
            </h2>

            <div className="space-y-4">
              {[
                { key: 'voteActivity', label: 'Vote Activity', description: 'Get notified when others vote on rumors you care about' },
                { key: 'proofFeedback', label: 'Proof Feedback', description: 'Notifications when proofs you submitted receive votes' },
                { key: 'rumorUpdates', label: 'Rumor Updates', description: 'Regular updates on rumors in your watch list' },
                { key: 'reputationChanges', label: 'Reputation Changes', description: 'Notify when your reputation score changes' },
                { key: 'settledRumors', label: 'Settled Rumors', description: 'Alert when rumors you participated in reach settlement' },
              ].map(({ key, label, description }) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{label}</p>
                    <p className="text-sm text-gray-400">{description}</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key as keyof typeof notifications)}
                    className={`w-12 h-6 rounded-full transition flex items-center ${
                      notifications[key as keyof typeof notifications]
                        ? 'bg-cyan-500'
                        : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications[key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Display Settings */}
          <div className="glass glow-cyan p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              Display Preferences
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Dark Theme (Default)</p>
                  <p className="text-sm text-gray-400">Currently using dark theme for all pages</p>
                </div>
                <span className="text-cyan-400 font-medium text-sm">Active</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Compact View</p>
                  <p className="text-sm text-gray-400">Show more rumors per page with less spacing</p>
                </div>
                <button
                  onClick={() => handleDisplayChange('compactView')}
                  className={`w-12 h-6 rounded-full transition flex items-center ${display.compactView ? 'bg-cyan-500' : 'bg-gray-600'}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      display.compactView ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Show Reputation Scores</p>
                  <p className="text-sm text-gray-400">Display reputation badges next to usernames</p>
                </div>
                <button
                  onClick={() => handleDisplayChange('showReputation')}
                  className={`w-12 h-6 rounded-full transition flex items-center ${display.showReputation ? 'bg-cyan-500' : 'bg-gray-600'}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      display.showReputation ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="glass glow-cyan p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              Privacy Settings
            </h2>

            <div className="space-y-4">
              {[
                { key: 'hideVotingHistory', label: 'Hide Voting History', description: 'Make your voting history private (others won\'t see how you voted)' },
                { key: 'hideProofHistory', label: 'Hide Proof History', description: 'Make your proof contributions private' },
                { key: 'hideReputation', label: 'Hide Reputation Score', description: 'Don\'t display your reputation number publicly' },
              ].map(({ key, label, description }) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{label}</p>
                    <p className="text-sm text-gray-400">{description}</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyChange(key as keyof typeof privacy)}
                    className={`w-12 h-6 rounded-full transition flex items-center ${privacy[key as keyof typeof privacy] ? 'bg-cyan-500' : 'bg-gray-600'}`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        privacy[key as keyof typeof privacy] ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}

              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-xs text-blue-300">
                  <strong>Note:</strong> Your anonymous token is always protected and never shared publicly.
                </p>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="glass glow-cyan p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
              Account Management
            </h2>

            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition font-medium">
                Download Your Data
              </button>
              <button className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition font-medium">
                Clear History
              </button>
              <button className="w-full px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition font-medium">
                Logout
              </button>
            </div>

            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-xs text-yellow-300">
                <strong>⚠️ Warning:</strong> Logging out will disconnect your anonymous token. You'll need to re-verify your email to access your account again.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
