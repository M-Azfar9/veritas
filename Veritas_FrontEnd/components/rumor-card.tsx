'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, HelpCircle, ChevronDown, MessageCircle, AlertTriangle } from 'lucide-react';
import { timeAgo } from '@/lib/date-utils';
import { CommentSection } from './comment-section';
import { ProofList } from './proof-list';
import { ProofSubmission } from './proof-submission';
import api from '@/lib/api';

export interface RumorCardProps {
  id: string; // rumor_id
  content: string;
  trustScore?: number;
  created_at: string; // ISO timestamp
  proofCount?: number;
  voteCount?: number;
  userVote?: 'VERIFY' | 'UNCERTAIN' | 'DISPUTE' | null;
}

export function RumorCard({
  id,
  content,
  trustScore: initialTrustScore = 0.5,
  created_at,
  proofCount = 0,
  voteCount: initialVoteCount = 0,
  userVote: initialVote = null,
}: RumorCardProps) {
  const [showProof, setShowProof] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  // Local state for optimistic updates
  const [userVote, setUserVote] = useState<'VERIFY' | 'UNCERTAIN' | 'DISPUTE' | null>(initialVote);
  const [trustScore, setTrustScore] = useState(initialTrustScore);

  const trustPercentage = trustScore * 100;
  const trustColor = trustScore > 0.7 ? 'bg-black dark:bg-white' : trustScore > 0.4 ? 'bg-black/60 dark:bg-white/60' : 'bg-black/40 dark:bg-white/40';

  const handleVote = async (voteType: 'VERIFY' | 'UNCERTAIN' | 'DISPUTE') => {
    const previousVote = userVote;
    setErrorDetails(null);

    // Optimistic Update
    if (userVote === voteType) {
      setUserVote(null);
    } else {
      setUserVote(voteType);
    }

    try {
      const response = await api.post(`/rumors/rumors/${id}/vote/`, {
        vote_type: voteType
      });

      // Update from server response
      if (response.data.new_trust_score !== undefined) {
        setTrustScore(response.data.new_trust_score);
      }
    } catch (error: any) {
      // Revert on error
      setUserVote(previousVote);
      console.error('Vote failed:', error);

      // Handle Max Vote Changes Error
      if (error.response?.data?.error) {
        setErrorDetails(error.response.data.error);
      } else {
        setErrorDetails('Failed to cast vote. Please try again.');
      }

      // Auto-clear error after 3 seconds
      setTimeout(() => setErrorDetails(null), 3000);
    }
  };

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 py-4 px-6 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-150 relative">
      {/* Header - Name and Timestamp */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-black dark:text-white">Anonymous Member</span>
        <span className="text-xs text-black/50 dark:text-white/50">{timeAgo(created_at)}</span>
      </div>

      {/* Rumor Content */}
      <p className="text-base text-black dark:text-white leading-normal mb-4">{content}</p>

      {/* Trust Score Bar - Compact */}
      <div className="mt-3">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-medium text-black/60 dark:text-white/60">Trust</span>
          <span className="text-xs font-semibold text-black dark:text-white">{trustPercentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full ${trustColor} transition-all duration-500`}
            style={{ width: `${trustPercentage}%` }}
          />
        </div>
      </div>

      {/* Error Message Toast/Banner */}
      {errorDetails && (
        <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-sm text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertTriangle className="w-4 h-4" />
          <span>{errorDetails}</span>
        </div>
      )}

      {/* Actions Section */}
      <div className="mt-4">
        {/* Row 1 - Voting Actions */}
        <div className="flex items-center gap-8 mb-3">
          {/* Upvote Button */}
          <button
            onClick={() => handleVote('VERIFY')}
            className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-all duration-150"
            title="Verify - This claim is true"
          >
            <ThumbsUp
              className={`w-4 h-4 transition ${userVote === 'VERIFY' ? 'fill-black dark:fill-white text-black dark:text-white' : ''
                }`}
            />
            <span className="font-medium">Verify</span>
          </button>

          {/* Uncertain Button */}
          <button
            onClick={() => handleVote('UNCERTAIN')}
            className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-all duration-150"
            title="Uncertain - Need more information"
          >
            <HelpCircle
              className={`w-4 h-4 transition ${userVote === 'UNCERTAIN' ? 'fill-black dark:fill-white text-black dark:text-white' : ''
                }`}
            />
            <span className="font-medium">Uncertain</span>
          </button>

          {/* Downvote Button */}
          <button
            onClick={() => handleVote('DISPUTE')}
            className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-all duration-150"
            title="Dispute - This claim is false"
          >
            <ThumbsDown
              className={`w-4 h-4 transition ${userVote === 'DISPUTE' ? 'fill-black dark:fill-white text-black dark:text-white' : ''
                }`}
            />
            <span className="font-medium">Dispute</span>
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 mt-2"></div>

        {/* Row 2 - Metadata Actions */}
        <div className="flex items-center gap-6 text-sm text-black/60 dark:text-white/60">
          {/* Proof Items Button */}
          <button
            onClick={() => setShowProof(!showProof)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-150"
          >
            <span>{proofCount} proof items</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showProof ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Comments Button */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 hover:text-black dark:hover:text-white transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="font-medium">Comments</span>
          </button>
        </div>
      </div>

      {showProof && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-sm font-semibold text-black dark:text-white">Community Evidence</h4>
            <button
              onClick={() => setIsSubmissionOpen(true)}
              className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              + Submit Evidence
            </button>
          </div>

          <ProofList rumorId={id} />
        </div>
      )}

      {isSubmissionOpen && (
        <ProofSubmission
          rumorId={id}
          onClose={() => setIsSubmissionOpen(false)}
          onSuccess={() => {
            setShowProof(true);
          }}
        />
      )}

      {/* Comment Section (Placeholder) */}
      {showComments && (
        <div className="mt-6">
          <CommentSection rumorId={id} initialComments={[]} />
        </div>
      )}
    </div>
  );
}
