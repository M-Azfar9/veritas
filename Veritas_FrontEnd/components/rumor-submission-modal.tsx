'use client';

import React from "react"

import { useState } from 'react';

export interface RumorSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rumor: string) => void;
}

export function RumorSubmissionModal({ isOpen, onClose, onSubmit }: RumorSubmissionModalProps) {
  const [rumor, setRumor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!rumor.trim()) {
      setError('Please enter a rumor to submit');
      return;
    }

    if (rumor.length < 20) {
      setError('Rumor must be at least 20 characters');
      return;
    }

    setLoading(true);
    // Mock API call
    setTimeout(() => {
      onSubmit(rumor);
      setRumor('');
      setLoading(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="glass glow-cyan p-8 max-w-md w-full relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Submit a Rumor</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="rumor" className="block text-sm font-medium text-gray-300 mb-2">
              Rumor Description
            </label>
            <textarea
              id="rumor"
              value={rumor}
              onChange={(e) => setRumor(e.target.value)}
              placeholder="Describe the rumor you want to verify..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-cyan-500/50 transition resize-none"
              rows={4}
              disabled={loading}
            />
            <div className="flex justify-between mt-2">
              <p className="text-xs text-gray-500">{rumor.length} characters</p>
              {rumor.length < 20 && (
                <p className="text-xs text-yellow-400">Minimum 20 characters required</p>
              )}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs text-blue-300">
              By submitting, you gain 3x reputation multiplier as the original poster if the rumor is verified.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition font-medium"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || rumor.length < 20}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              {loading ? 'Submitting...' : 'Submit Rumor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
