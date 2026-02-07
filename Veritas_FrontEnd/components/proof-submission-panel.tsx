'use client';

import React from "react"

import { useState } from 'react';

export interface ProofSubmissionPanelProps {
  rumorId: string;
  onSubmit: (proof: { text?: string; link?: string; hasImage: boolean }) => void;
}

export function ProofSubmissionPanel({ rumorId, onSubmit }: ProofSubmissionPanelProps) {
  const [proofText, setProofText] = useState('');
  const [proofLink, setProofLink] = useState('');
  const [hasImage, setHasImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!proofText.trim() && !proofLink.trim() && !hasImage) {
      setError('Please add at least one type of evidence');
      return;
    }

    setLoading(true);
    // Mock API call
    setTimeout(() => {
      onSubmit({
        text: proofText || undefined,
        link: proofLink || undefined,
        hasImage,
      });
      setProofText('');
      setProofLink('');
      setHasImage(false);
      setSubmitted(true);
      setLoading(false);

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <div className="glass glow-cyan p-6 mb-4">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-1">Add Evidence</h3>
        <p className="text-sm text-gray-400">Help verify this rumor by adding proofs. Helpful proofs earn +0.5 reputation.</p>
      </div>

      {submitted ? (
        <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-center">
          <svg className="w-8 h-8 text-green-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-green-400 font-medium">Proof submitted successfully!</p>
          <p className="text-sm text-green-300 mt-1">Your contribution will be voted on by the community.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="proof-text" className="block text-sm font-medium text-gray-300 mb-2">
              Evidence Description
            </label>
            <textarea
              id="proof-text"
              value={proofText}
              onChange={(e) => setProofText(e.target.value)}
              placeholder="Describe your evidence or explanation..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-cyan-500/50 transition resize-none"
              rows={3}
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">{proofText.length} characters</p>
          </div>

          <div>
            <label htmlFor="proof-link" className="block text-sm font-medium text-gray-300 mb-2">
              Reference Link (Optional)
            </label>
            <input
              id="proof-link"
              type="url"
              value={proofLink}
              onChange={(e) => setProofLink(e.target.value)}
              placeholder="https://example.com/article"
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-cyan-500/50 transition"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Attach Image or Document (Optional)
            </label>
            <button
              type="button"
              onClick={() => setHasImage(!hasImage)}
              className={`w-full p-4 border-2 border-dashed rounded-lg transition ${
                hasImage
                  ? 'border-cyan-500/70 bg-cyan-500/10'
                  : 'border-gray-600/50 bg-gray-800/30 hover:border-cyan-500/50'
              }`}
              disabled={loading}
            >
              <div className="flex flex-col items-center gap-2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm text-gray-300">
                  {hasImage ? 'Image attached' : 'Click to attach image'}
                </span>
              </div>
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs text-blue-300">
              Quality proofs have higher impact. Misleading proofs will reduce your reputation by -1.5 points.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setProofText('');
                setProofLink('');
                setHasImage(false);
              }}
              className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition font-medium"
              disabled={loading}
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={loading || (!proofText.trim() && !proofLink.trim() && !hasImage)}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              {loading ? 'Submitting...' : 'Submit Proof'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
