'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ContributionStats } from '@/components/contribution-stats';
import { VotingAccuracyPanel } from '@/components/voting-accuracy-panel';
import { ReputationLedger } from '@/components/reputation-ledger';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'voting' | 'proofs' | 'ledger'>('voting');

  const votingHistory = [
    {
      id: '1',
      rumor: 'Large data breach at tech company',
      vote: 'Verify',
      status: 'Correct',
      timestamp: '2 hours ago',
      reward: '+0.2',
    },
    {
      id: '2',
      rumor: 'New climate report findings',
      vote: 'Verify',
      status: 'Correct',
      timestamp: '5 hours ago',
      reward: '+0.2',
    },
    {
      id: '3',
      rumor: 'Celebrity relationship rumors',
      vote: 'Dispute',
      status: 'Incorrect',
      timestamp: '1 day ago',
      reward: '-0.4',
    },
    {
      id: '4',
      rumor: 'Economic forecast analysis',
      vote: 'Uncertain',
      status: 'Pending',
      timestamp: '3 days ago',
      reward: 'Pending',
    },
  ];

  const proofHistory = [
    {
      id: '1',
      rumor: 'Data source analysis for climate report',
      votes: 12,
      status: 'Helpful',
      timestamp: '5 hours ago',
      reward: '+0.5',
    },
    {
      id: '2',
      rumor: 'Academic paper on economic trends',
      votes: 8,
      status: 'Helpful',
      timestamp: '1 day ago',
      reward: '+0.5',
    },
    {
      id: '3',
      rumor: 'Outdated source citation removed',
      votes: 3,
      status: 'Misleading',
      timestamp: '3 days ago',
      reward: '-1.5',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="glass glow-cyan p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1>
                <p className="text-gray-400">Anonymous User #47382</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Total Reputation</p>
                <p className="text-4xl font-bold text-cyan-400">4.87</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-800/30 rounded">
                <p className="text-xs text-gray-400 mb-1">Member Since</p>
                <p className="text-sm text-white font-bold">45 days</p>
              </div>
              <div className="p-3 bg-gray-800/30 rounded">
                <p className="text-xs text-gray-400 mb-1">Tier</p>
                <p className="text-sm text-yellow-400 font-bold">Contributor</p>
              </div>
              <div className="p-3 bg-gray-800/30 rounded">
                <p className="text-xs text-gray-400 mb-1">Anonymous Token</p>
                <p className="text-xs text-cyan-400 font-mono">token_xyz...</p>
              </div>
              <div className="p-3 bg-gray-800/30 rounded">
                <p className="text-xs text-gray-400 mb-1">Verification</p>
                <p className="text-sm text-green-400 font-bold">Verified</p>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <ContributionStats proofsSubmitted={8} votesCast={47} correctVotes={34} rumorsBrowsed={156} />
          <VotingAccuracyPanel correctVotes={34} totalVotes={47} />

          {/* Tabs */}
          <div className="mb-6 flex gap-4 border-b border-gray-700/50">
            <button
              onClick={() => setActiveTab('voting')}
              className={`px-4 py-3 font-medium border-b-2 transition ${
                activeTab === 'voting'
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Voting History ({votingHistory.length})
            </button>
            <button
              onClick={() => setActiveTab('proofs')}
              className={`px-4 py-3 font-medium border-b-2 transition ${
                activeTab === 'proofs'
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Proof Contributions ({proofHistory.length})
            </button>
            <button
              onClick={() => setActiveTab('ledger')}
              className={`px-4 py-3 font-medium border-b-2 transition ${
                activeTab === 'ledger'
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Reputation Ledger
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'voting' && (
            <div className="space-y-3">
              {votingHistory.map((vote) => (
                <div key={vote.id} className="glass glow-cyan p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">{vote.rumor}</p>
                      <div className="flex gap-2 text-xs">
                        <span className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded">Vote: {vote.vote}</span>
                        <span
                          className={`px-2 py-1 rounded ${
                            vote.status === 'Correct'
                              ? 'bg-green-500/20 text-green-400'
                              : vote.status === 'Incorrect'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {vote.status}
                        </span>
                        <span className="text-gray-500">{vote.timestamp}</span>
                      </div>
                    </div>
                    <p className={`text-sm font-bold ${vote.reward.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {vote.reward}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'proofs' && (
            <div className="space-y-3">
              {proofHistory.map((proof) => (
                <div key={proof.id} className="glass glow-cyan p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">{proof.rumor}</p>
                      <div className="flex gap-2 text-xs">
                        <span className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded">{proof.votes} votes</span>
                        <span
                          className={`px-2 py-1 rounded ${
                            proof.status === 'Helpful'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {proof.status}
                        </span>
                        <span className="text-gray-500">{proof.timestamp}</span>
                      </div>
                    </div>
                    <p className={`text-sm font-bold ${proof.reward.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {proof.reward}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ledger' && <ReputationLedger events={[]} />}
        </div>
      </div>

      <Footer />
    </main>
  );
}
