'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, HelpCircle } from 'lucide-react';

export interface VoteControlProps {
  rumorId: string;
  upvotes: number;
  downvotes: number;
  uncertainVotes: number;
  userVote?: 'up' | 'down' | 'uncertain' | null;
  onVote?: (voteType: 'up' | 'down' | 'uncertain') => void;
}

export function VoteControl({
  rumorId,
  upvotes,
  downvotes,
  uncertainVotes,
  userVote: initialVote = null,
  onVote,
}: VoteControlProps) {
  const [userVote, setUserVote] = useState<'up' | 'down' | 'uncertain' | null>(initialVote);

  const handleVote = (voteType: 'up' | 'down' | 'uncertain') => {
    const newVote = userVote === voteType ? null : voteType;
    setUserVote(newVote);
    if (onVote) {
      onVote(newVote || voteType);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Upvote */}
      <button
        onClick={() => handleVote('up')}
        className={`p-2 rounded transition ${
          userVote === 'up'
            ? 'bg-foreground/10 text-foreground'
            : 'text-foreground/50 hover:bg-foreground/5 hover:text-foreground'
        }`}
        title="Verify - This claim appears true"
      >
        <ThumbsUp className="w-5 h-5" />
      </button>
      <span className="text-xs font-medium text-foreground/70">{upvotes}</span>

      {/* Uncertain */}
      <button
        onClick={() => handleVote('uncertain')}
        className={`p-2 rounded transition ${
          userVote === 'uncertain'
            ? 'bg-foreground/10 text-foreground'
            : 'text-foreground/50 hover:bg-foreground/5 hover:text-foreground'
        }`}
        title="Uncertain - Need more evidence"
      >
        <HelpCircle className="w-5 h-5" />
      </button>
      <span className="text-xs font-medium text-foreground/70">{uncertainVotes}</span>

      {/* Downvote */}
      <button
        onClick={() => handleVote('down')}
        className={`p-2 rounded transition ${
          userVote === 'down'
            ? 'bg-foreground/10 text-foreground'
            : 'text-foreground/50 hover:bg-foreground/5 hover:text-foreground'
        }`}
        title="Dispute - This claim appears false"
      >
        <ThumbsDown className="w-5 h-5" />
      </button>
      <span className="text-xs font-medium text-foreground/70">{downvotes}</span>
    </div>
  );
}
