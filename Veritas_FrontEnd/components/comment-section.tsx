'use client';

import { useState } from 'react';
import { CommentCard, type Comment } from './comment-card';
import { CommentInput } from './comment-input';

export interface CommentSectionProps {
  rumorId: string;
  initialComments?: Comment[];
}

export function CommentSection({
  rumorId,
  initialComments = [],
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: 'Anonymous User',
      content,
      timestamp: 'now',
      likes: 0,
      replies: [],
    };

    if (replyingTo) {
      // Add as a reply to existing comment
      setComments((prev) =>
        prev.map((comment) => {
          if (comment.id === replyingTo) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newComment],
            };
          }
          return comment;
        })
      );
      setReplyingTo(null);
    } else {
      // Add as top-level comment
      setComments((prev) => [newComment, ...prev]);
    }
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const handleLike = (commentId: string) => {
    // Mock like functionality
    console.log(`[v0] Liked comment ${commentId}`);
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Comments ({comments.length})
      </h3>

      {/* Comment Input */}
      <div className="mb-6">
        <CommentInput
          placeholder="Share your thoughts on this claim..."
          onSubmit={handleAddComment}
          isReplying={replyingTo !== null}
          replyingTo={replyingTo || undefined}
        />
      </div>

      {/* Comments List */}
      <div className="space-y-0">
        {comments.length === 0 ? (
          <p className="text-sm text-foreground/60 py-6">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onLike={handleLike}
            />
          ))
        )}
      </div>
    </div>
  );
}
