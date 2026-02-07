'use client';

import React from 'react';

export interface AuthCardProps {
  children: React.ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-black text-black dark:text-white rounded-2xl p-8 border-2 border-neutral-200 dark:border-neutral-800">
      {children}
    </div>
  );
}
