'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface RightSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  trustScore: string;
  activity: string;
  status: string;
}

export function RightSidebar({ onFilterChange }: RightSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    trustScore: 'all',
    activity: 'all',
    status: 'all',
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="sticky top-20 hidden lg:block w-80 h-fit">
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-4 bg-white dark:bg-black">
        <h3 className="text-base font-medium text-black dark:text-white">Filters</h3>

        {/* Trust Score Dropdown */}
        <div>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'trust' ? null : 'trust')}
            className="w-full flex items-center justify-between px-4 py-2 border-2 border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-150 text-sm font-medium text-black dark:text-white"
          >
            <span>Trust Score: {filters.trustScore === 'all' ? 'All' : filters.trustScore}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'trust' ? 'rotate-180' : ''}`} />
          </button>
          {openDropdown === 'trust' && (
            <div className="mt-2 border-2 border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black p-2 space-y-1">
              {['all', 'high', 'medium', 'low'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    handleFilterChange('trustScore', option);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-all duration-150 ${
                    filters.trustScore === option
                      ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white font-medium'
                      : 'text-black/60 dark:text-white/60 hover:bg-neutral-50 dark:hover:bg-neutral-900'
                  }`}
                >
                  {option === 'all' ? 'All Scores' : `${option.charAt(0).toUpperCase() + option.slice(1)} Confidence`}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Activity Dropdown */}
        <div>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'activity' ? null : 'activity')}
            className="w-full flex items-center justify-between px-4 py-2 border-2 border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-150 text-sm font-medium text-black dark:text-white"
          >
            <span>Activity: {filters.activity === 'all' ? 'Any' : filters.activity}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'activity' ? 'rotate-180' : ''}`} />
          </button>
          {openDropdown === 'activity' && (
            <div className="mt-2 border-2 border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black p-2 space-y-1">
              {['all', 'recent', 'trending', 'old'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    handleFilterChange('activity', option);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-all duration-150 ${
                    filters.activity === option
                      ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white font-medium'
                      : 'text-black/60 dark:text-white/60 hover:bg-neutral-50 dark:hover:bg-neutral-900'
                  }`}
                >
                  {option === 'all' ? 'Any Time' : option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status Dropdown */}
        <div>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
            className="w-full flex items-center justify-between px-4 py-2 border-2 border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-150 text-sm font-medium text-black dark:text-white"
          >
            <span>Status: {filters.status === 'all' ? 'All' : filters.status}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'status' ? 'rotate-180' : ''}`} />
          </button>
          {openDropdown === 'status' && (
            <div className="mt-2 border-2 border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black p-2 space-y-1">
              {['all', 'active', 'frozen', 'settled'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    handleFilterChange('status', option);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-all duration-150 ${
                    filters.status === option
                      ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white font-medium'
                      : 'text-black/60 dark:text-white/60 hover:bg-neutral-50 dark:hover:bg-neutral-900'
                  }`}
                >
                  {option === 'all' ? 'All Status' : option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
