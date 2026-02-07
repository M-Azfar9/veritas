'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FilterPanelProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  trustScore: string;
  recentActivity: string;
  verificationStatus: string;
}

export function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    trustScore: 'all',
    recentActivity: 'all',
    verificationStatus: 'all',
  });

  const [openDropdown, setOpenDropdown] = useState<keyof FilterState | null>(null);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
    setOpenDropdown(null);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter((v) => v !== 'all').length;
  };

  const getTrustScoreLabel = () => {
    const labels: Record<string, string> = {
      all: 'All Trust Scores',
      high: 'High (70%+)',
      medium: 'Medium (40-70%)',
      low: 'Low (<40%)',
    };
    return labels[filters.trustScore] || labels.all;
  };

  const getActivityLabel = () => {
    const labels: Record<string, string> = {
      all: 'All Activity',
      today: 'Today',
      week: 'This Week',
      month: 'This Month',
    };
    return labels[filters.recentActivity] || labels.all;
  };

  const getStatusLabel = () => {
    const labels: Record<string, string> = {
      all: 'All Status',
      active: 'Active',
      frozen: 'Frozen',
      resolved: 'Resolved',
    };
    return labels[filters.verificationStatus] || labels.all;
  };

  return (
    <div className="space-y-3">
      {/* Filters Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {getActiveFilterCount() > 0 && (
          <button
            onClick={() => setFilters({ trustScore: 'all', recentActivity: 'all', verificationStatus: 'all' })}
            className="text-xs font-medium text-foreground/60 hover:text-foreground transition"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filters List */}
      <div className="space-y-2 pl-4 border-l-2 border-foreground/20">
        {/* Trust Score Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === 'trustScore' ? null : 'trustScore')}
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-800 text-foreground text-sm rounded hover:bg-foreground/5 transition"
          >
            <span>{getTrustScoreLabel()}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'trustScore' ? 'rotate-180' : ''}`} />
          </button>

          {openDropdown === 'trustScore' && (
            <div className="absolute top-full left-0 mt-1 bg-background border border-gray-200 dark:border-gray-800 rounded shadow-lg z-20">
              <button
                onClick={() => handleFilterChange('trustScore', 'all')}
                className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-foreground/5 transition first:rounded-t last:rounded-b"
              >
                All Trust Scores
              </button>
              <button
                onClick={() => handleFilterChange('trustScore', 'high')}
                className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-foreground/5 transition first:rounded-t last:rounded-b"
              >
                High (70%+)
              </button>
              <button
                onClick={() => handleFilterChange('trustScore', 'medium')}
                className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-foreground/5 transition first:rounded-t last:rounded-b"
              >
                Medium (40-70%)
              </button>
              <button
                onClick={() => handleFilterChange('trustScore', 'low')}
                className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-foreground/5 transition first:rounded-t last:rounded-b"
              >
                Low ({'<'}40%)
              </button>
            </div>
          )}
        </div>

        {/* Recent Activity Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === 'recentActivity' ? null : 'recentActivity')}
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-800 text-foreground text-sm rounded hover:bg-foreground/5 transition"
          >
            <span>{getActivityLabel()}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'recentActivity' ? 'rotate-180' : ''}`} />
          </button>

          {openDropdown === 'recentActivity' && (
            <div className="absolute top-full left-0 mt-1 bg-background border border-gray-200 dark:border-gray-800 rounded shadow-lg z-20">
              <button
                onClick={() => handleFilterChange('recentActivity', 'all')}
                className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-foreground/5 transition first:rounded-t last:rounded-b"
              >
                All Activity
              </button>
              <button
                onClick={() => handleFilterChange('recentActivity', 'today')}
                className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-foreground/5 transition first:rounded-t last:rounded-b"
              >
                Today
              </button>
              <button
                onClick={() => handleFilterChange('recentActivity', 'week')}
                className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-foreground/5 transition first:rounded-t last:rounded-b"
              >
                This Week
              </button>
              <button
                onClick={() => handleFilterChange('recentActivity', 'month')}
                className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-foreground/5 transition first:rounded-t last:rounded-b"
              >
                This Month
              </button>
            </div>
          )}
        </div>

        {/* Verification Status Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === 'verificationStatus' ? null : 'verificationStatus')}
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-800 text-foreground text-sm rounded hover:bg-foreground/5 transition"
          >
            <span>{getStatusLabel()}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'verificationStatus' ? 'rotate-180' : ''}`} />
          </button>

          {openDropdown === 'verificationStatus' && (
            <div className="absolute top-full left-0 mt-1 bg-background border border-gray-200 dark:border-gray-800 rounded shadow-lg z-20">
              <button
                onClick={() => handleFilterChange('verificationStatus', 'all')}
                className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-foreground/5 transition first:rounded-t last:rounded-b"
              >
                All Status
              </button>
              <button
                onClick={() => handleFilterChange('verificationStatus', 'active')}
                className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-foreground/5 transition first:rounded-t last:rounded-b"
              >
                Active
              </button>
              <button
                onClick={() => handleFilterChange('verificationStatus', 'frozen')}
                className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-foreground/5 transition first:rounded-t last:rounded-b"
              >
                Frozen
              </button>
              <button
                onClick={() => handleFilterChange('verificationStatus', 'resolved')}
                className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-foreground/5 transition first:rounded-t last:rounded-b"
              >
                Resolved
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
