'use client';

import React from "react"

export interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  glowColor?: 'cyan' | 'purple' | 'blue';
}

export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm text-foreground/60 font-medium">{title}</h3>
        {icon && <div className="text-foreground/40">{icon}</div>}
      </div>

      <div className="mb-2">
        <div className="text-3xl font-bold text-foreground">{value}</div>
      </div>

      {change !== undefined && (
        <div className={`text-sm font-medium ${change >= 0 ? 'text-foreground/70' : 'text-foreground/50'}`}>
          {change >= 0 ? '+' : ''}
          {change}% from last period
        </div>
      )}
    </div>
  );
}
