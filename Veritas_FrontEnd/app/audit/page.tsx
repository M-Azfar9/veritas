'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

interface AuditEntry {
  id: string;
  timestamp: string;
  rumorId: string;
  rumorTitle: string;
  eventType: 'vote_recorded' | 'proof_submitted' | 'score_calculated' | 'settlement_distributed' | 'penalty_applied';
  userToken: string;
  details: string;
}

const mockAuditLog: AuditEntry[] = [
  {
    id: 'audit_1',
    timestamp: '2024-01-15 14:32:45',
    rumorId: '#42',
    rumorTitle: 'Data breach at tech company',
    eventType: 'vote_recorded',
    userToken: 'token_xyz...',
    details: 'User voted VERIFY with vote weight 0.20. Score impact: +0.010',
  },
  {
    id: 'audit_2',
    timestamp: '2024-01-15 14:15:22',
    rumorId: '#42',
    rumorTitle: 'Data breach at tech company',
    eventType: 'score_calculated',
    userToken: 'system',
    details: 'Trust Score updated: V=0.72, P=0.58, M=0.65 → TrustScore=0.68 (-0.05 volatility penalty)',
  },
  {
    id: 'audit_3',
    timestamp: '2024-01-15 13:45:10',
    rumorId: '#39',
    rumorTitle: 'Climate report findings',
    eventType: 'proof_submitted',
    userToken: 'token_abc...',
    details: 'Proof submitted with 2 supporting links. Initial rating: pending community votes.',
  },
  {
    id: 'audit_4',
    timestamp: '2024-01-15 10:22:33',
    rumorId: '#35',
    rumorTitle: 'Economic forecast analysis',
    eventType: 'settlement_distributed',
    userToken: 'system',
    details: 'Reputation rewards distributed. Verified TRUE. Author bonus applied (3x multiplier).',
  },
  {
    id: 'audit_5',
    timestamp: '2024-01-14 16:54:18',
    rumorId: '#28',
    rumorTitle: 'Celebrity relationship rumors',
    eventType: 'penalty_applied',
    userToken: 'token_def...',
    details: 'Vote penalty applied: incorrect vote on verified FALSE rumor. Reputation: -0.4',
  },
  {
    id: 'audit_6',
    timestamp: '2024-01-14 15:12:05',
    rumorId: '#25',
    rumorTitle: 'Sports event prediction',
    eventType: 'score_calculated',
    userToken: 'system',
    details: 'Trust Score recalculated: Proof maturity reached 10 votes. New score: 0.71 (was 0.58)',
  },
];

function getEventIcon(eventType: string) {
  switch (eventType) {
    case 'vote_recorded':
      return '✓';
    case 'proof_submitted':
      return '📄';
    case 'score_calculated':
      return '⚙';
    case 'settlement_distributed':
      return '💰';
    case 'penalty_applied':
      return '⚠';
    default:
      return '•';
  }
}

function getEventColor(eventType: string) {
  switch (eventType) {
    case 'vote_recorded':
      return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
    case 'proof_submitted':
      return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
    case 'score_calculated':
      return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
    case 'settlement_distributed':
      return 'bg-green-500/10 border-green-500/30 text-green-400';
    case 'penalty_applied':
      return 'bg-red-500/10 border-red-500/30 text-red-400';
    default:
      return 'bg-gray-500/10 border-gray-500/30 text-gray-400';
  }
}

function getEventLabel(eventType: string) {
  switch (eventType) {
    case 'vote_recorded':
      return 'Vote Recorded';
    case 'proof_submitted':
      return 'Proof Submitted';
    case 'score_calculated':
      return 'Score Calculated';
    case 'settlement_distributed':
      return 'Settlement Distributed';
    case 'penalty_applied':
      return 'Penalty Applied';
    default:
      return 'Event';
  }
}

export default function AuditLogPage() {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchRumor, setSearchRumor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredLogs = mockAuditLog.filter(
    (entry) =>
      (filterType === 'all' || entry.eventType === filterType) &&
      (searchRumor === '' || entry.rumorTitle.toLowerCase().includes(searchRumor.toLowerCase()) || entry.rumorId === searchRumor)
  );

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Audit Log</h1>
            <p className="text-gray-400">Transparent ledger of all system operations and score calculations</p>
          </div>

          {/* Filters */}
          <div className="glass glow-cyan p-6 mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                  Search by Rumor ID or Title
                </label>
                <input
                  id="search"
                  type="text"
                  value={searchRumor}
                  onChange={(e) => {
                    setSearchRumor(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="e.g., #42 or data breach"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-cyan-500/50 transition"
                />
              </div>

              <div>
                <label htmlFor="filter" className="block text-sm font-medium text-gray-300 mb-2">
                  Event Type
                </label>
                <select
                  id="filter"
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 text-white rounded-lg focus:outline-none focus:border-cyan-500/50 transition"
                >
                  <option value="all">All Events</option>
                  <option value="vote_recorded">Vote Recorded</option>
                  <option value="proof_submitted">Proof Submitted</option>
                  <option value="score_calculated">Score Calculated</option>
                  <option value="settlement_distributed">Settlement Distributed</option>
                  <option value="penalty_applied">Penalty Applied</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <p className="text-gray-400">Showing {paginatedLogs.length} of {filteredLogs.length} entries</p>
              <button
                onClick={() => {
                  setFilterType('all');
                  setSearchRumor('');
                  setCurrentPage(1);
                }}
                className="text-cyan-400 hover:text-cyan-300 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Log Table */}
          <div className="glass glow-cyan p-6 mb-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Timestamp</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Event Type</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Rumor</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">User</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLogs.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-700/30 hover:bg-gray-800/30 transition">
                    <td className="px-4 py-3 text-gray-300 font-mono text-xs">{entry.timestamp}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded border ${getEventColor(entry.eventType)}`}>
                        <span>{getEventIcon(entry.eventType)}</span>
                        <span>{getEventLabel(entry.eventType)}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-white font-medium">{entry.rumorId}</p>
                        <p className="text-gray-500 text-xs">{entry.rumorTitle}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs">{entry.userToken}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs max-w-xs truncate" title={entry.details}>
                      {entry.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paginatedLogs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">No entries match your filters</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="glass glow-cyan p-4 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded border transition ${
                        currentPage === page
                          ? 'bg-cyan-500 border-cyan-500 text-white'
                          : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-700/50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-300">
              <strong>Transparency Note:</strong> All operations affecting trust scores, reputation, and settlements are logged here. This ensures full auditability and prevents manipulation.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
