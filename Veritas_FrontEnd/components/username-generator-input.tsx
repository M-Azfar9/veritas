'use client';

import React from 'react';
import { Shuffle } from 'lucide-react';

export interface UsernameGeneratorInputProps {
  value: string;
  onGenerate: () => void;
  disabled?: boolean;
}

export function UsernameGeneratorInput({ value, onGenerate, disabled }: UsernameGeneratorInputProps) {
  return (
    <div className="relative">
      <label htmlFor="username" className="block text-sm font-medium text-black dark:text-white mb-2">
        Anonymous Username
      </label>
      <div className="relative">
        <input
          id="username"
          type="text"
          value={value}
          readOnly
          placeholder="Click shuffle to generate"
          className="w-full px-4 py-2 pr-12 border-2 border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:border-black dark:focus:border-white transition bg-neutral-50 dark:bg-neutral-900 text-black dark:text-white cursor-not-allowed"
        />
        <button
          onClick={onGenerate}
          disabled={disabled}
          type="button"
          title="Randomize username"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Shuffle className="w-5 h-5" />
        </button>
      </div>
      <p className="text-xs text-black/70 dark:text-white/70 mt-2">Username is auto-generated and unique to maintain anonymity</p>
    </div>
  );
}
