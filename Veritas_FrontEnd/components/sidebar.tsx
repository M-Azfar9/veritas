'use client';

import { useState } from 'react';

export function Sidebar() {
  const [expandedSection, setExpandedSection] = useState<string | null>('filters');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <aside className="w-full lg:w-64 glass glow-cyan p-6 h-fit sticky top-24">
      {/* Filter Controls */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('filters')}
          className="w-full flex justify-between items-center text-sm font-semibold text-white hover:text-cyan-400 transition mb-3"
        >
          <span>Filters</span>
          <svg className={`w-4 h-4 transition-transform ${expandedSection === 'filters' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
        {expandedSection === 'filters' && (
          <div className="space-y-3 pl-2 border-l border-cyan-500/30">
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-cyan-400 transition">
              <input type="checkbox" className="w-4 h-4 rounded border-cyan-500/50 bg-gray-900 accent-cyan-500" defaultChecked />
              High Confidence
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-cyan-400 transition">
              <input type="checkbox" className="w-4 h-4 rounded border-cyan-500/50 bg-gray-900 accent-cyan-500" defaultChecked />
              Medium Confidence
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-cyan-400 transition">
              <input type="checkbox" className="w-4 h-4 rounded border-cyan-500/50 bg-gray-900 accent-cyan-500" />
              Low Confidence
            </label>
          </div>
        )}
      </div>

      <div className="border-t border-cyan-500/20 my-4" />

      {/* Trust Score Legend */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('legend')}
          className="w-full flex justify-between items-center text-sm font-semibold text-white hover:text-cyan-400 transition mb-3"
        >
          <span>Trust Legend</span>
          <svg className={`w-4 h-4 transition-transform ${expandedSection === 'legend' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
        {expandedSection === 'legend' && (
          <div className="space-y-2 pl-2">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>High (70%+)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span>Medium (40-70%)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>Low (&lt;40%)</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-cyan-500/20 my-4" />

      {/* Recent Activity */}
      <div>
        <button
          onClick={() => toggleSection('activity')}
          className="w-full flex justify-between items-center text-sm font-semibold text-white hover:text-cyan-400 transition mb-3"
        >
          <span>Recent Activity</span>
          <svg className={`w-4 h-4 transition-transform ${expandedSection === 'activity' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
        {expandedSection === 'activity' && (
          <div className="space-y-2 pl-2 text-xs text-gray-400">
            <div className="py-2 border-l border-cyan-500/30 pl-3">
              <p className="text-gray-300">New rumor verified</p>
              <p>2 min ago</p>
            </div>
            <div className="py-2 border-l border-cyan-500/30 pl-3">
              <p className="text-gray-300">You disputed a claim</p>
              <p>1 hour ago</p>
            </div>
            <div className="py-2 border-l border-cyan-500/30 pl-3">
              <p className="text-gray-300">New proof added</p>
              <p>3 hours ago</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
