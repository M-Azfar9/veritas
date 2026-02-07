'use client';

import React from "react"

import { useState } from 'react';
import { Send } from 'lucide-react';

export interface CommentInputProps {
  placeholder?: string;
  onSubmit?: (content: string) => void;
  isReplying?: boolean;
  replyingTo?: string;
}

export function CommentInput({
  placeholder = 'Reply anonymously...',
  onSubmit,
  isReplying = false,
  replyingTo,
}: CommentInputProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsSubmitting(true);
    if (onSubmit) {
      onSubmit(content);
    }
    setContent('');
    setIsSubmitting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="flex items-start gap-3 py-4 border-b border-gray-200 dark:border-gray-800">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0" />

      {/* Input Group */}
      <div className="flex-1 flex items-center gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground/50 border border-gray-200 dark:border-gray-800 rounded-full px-4 py-2 focus:outline-none focus:border-foreground/30 transition"
        />
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
          className="text-foreground/60 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition flex-shrink-0"
          title="Post reply"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
