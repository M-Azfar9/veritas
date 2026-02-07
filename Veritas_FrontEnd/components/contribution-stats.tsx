'use client';

export interface ContributionStatsProps {
  proofsSubmitted?: number;
  votesCast?: number;
  correctVotes?: number;
  rumorsBrowsed?: number;
}

export function ContributionStats({
  proofsSubmitted = 8,
  votesCast = 47,
  correctVotes = 34,
  rumorsBrowsed = 156,
}: ContributionStatsProps) {
  const accuracy = votesCast > 0 ? ((correctVotes / votesCast) * 100).toFixed(0) : '0';

  return (
    <div className="glass glow-cyan p-6 mb-4">
      <h3 className="text-lg font-bold text-white mb-4">Contribution Stats</h3>

      <div className="grid grid-cols-2 gap-3">
        {/* Rumors Browsed */}
        <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-400">Rumors Browsed</p>
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-cyan-400 mb-1">{rumorsBrowsed}</p>
          <p className="text-xs text-gray-500">Total rumors viewed</p>
        </div>

        {/* Votes Cast */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-400">Votes Cast</p>
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-blue-400 mb-1">{votesCast}</p>
          <p className="text-xs text-gray-500">{accuracy}% accuracy</p>
        </div>

        {/* Proofs Submitted */}
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-400">Proofs Submitted</p>
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-purple-400 mb-1">{proofsSubmitted}</p>
          <p className="text-xs text-gray-500">Helpful contributions</p>
        </div>

        {/* Correct Votes */}
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-400">Correct Votes</p>
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-green-400 mb-1">{correctVotes}</p>
          <p className="text-xs text-gray-500">Out of {votesCast} votes</p>
        </div>
      </div>

      {/* Rank Badge */}
      <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
        <p className="text-xs text-yellow-400 font-bold mb-1">YOUR TIER</p>
        <p className="text-2xl font-bold text-yellow-400 mb-1">Contributor</p>
        <p className="text-xs text-gray-400">Based on consistent engagement and voting accuracy</p>
      </div>

      {/* Info */}
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-xs text-blue-300">
          <strong>Tier Progression:</strong> Novice → Contributor → Expert → Master. Unlock higher tiers by improving accuracy and participating consistently.
        </p>
      </div>
    </div>
  );
}
