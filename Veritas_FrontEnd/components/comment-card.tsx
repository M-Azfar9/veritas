'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
  level?: number;
}

export interface CommentCardProps {
  comment: Comment;
  onReply?: (commentId: string) => void;
  onLike?: (commentId: string) => void;
  level?: number;
}

export function CommentCard({
  comment,
  onReply,
  onLike,
  level = 0,
}: CommentCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (onLike) {
      onLike(comment.id);
    }
  };

  return (
    <div className="flex gap-3 py-3 px-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0 mt-0.5" />

      {/* Comment Body */}
      <div className="flex-1 min-w-0">
        {/* Header - Name and Timestamp */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-foreground">Anonymous</span>
          <span className="text-xs text-foreground/50">{comment.timestamp}</span>
        </div>

        {/* Comment Content */}
        <p className="text-sm text-foreground/80 leading-normal mb-2">{comment.content}</p>

        {/* Actions */}
        <div className="flex gap-6 text-xs text-foreground/60">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 hover:text-foreground transition"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-foreground' : ''}`} />
            <span>{comment.likes + (isLiked ? 1 : 0)}</span>
          </button>
          <button
            onClick={() => onReply?.(comment.id)}
            className="hover:text-foreground transition"
          >
            Reply
          </button>
        </div>

        {/* Nested Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="text-xs text-foreground/60 hover:text-foreground transition"
            >
              {showReplies ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
            </button>
            {showReplies && (
              <div className="mt-3 ml-4 border-l border-gray-200 dark:border-gray-800">
                {comment.replies.map((reply) => (
                  <CommentCard
                    key={reply.id}
                    comment={reply}
                    onReply={onReply}
                    onLike={onLike}
                    level={level + 1}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
