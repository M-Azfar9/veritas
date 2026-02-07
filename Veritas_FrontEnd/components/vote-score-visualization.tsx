'use client';

export interface VoteScoreVisualizationProps {
  verifyVotes: number;
  uncertainVotes: number;
  disputeVotes: number;
  scoreValue: number;
}

export function VoteScoreVisualization({
  verifyVotes = 45,
  uncertainVotes = 12,
  disputeVotes = 8,
  scoreValue = 0.72,
}: VoteScoreVisualizationProps) {
  const totalVotes = verifyVotes + uncertainVotes + disputeVotes;
  const verifyPercent = (verifyVotes / totalVotes) * 100;
  const uncertainPercent = (uncertainVotes / totalVotes) * 100;
  const disputePercent = (disputeVotes / totalVotes) * 100;

  return (
    <div className="glass glow-cyan p-6 mb-4">
      <h3 className="text-lg font-bold text-white mb-4">Vote Score Analysis</h3>

      <div className="space-y-4">
        {/* Vote Distribution Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-300 font-medium">Community Votes</p>
            <p className="text-sm text-gray-400">{totalVotes} total votes</p>
          </div>
          <div className="flex h-8 rounded-full overflow-hidden border border-gray-700/50">
            <div
              className="bg-green-500 hover:opacity-80 transition"
              style={{ width: `${verifyPercent}%` }}
              title={`Verify: ${verifyVotes} votes (${verifyPercent.toFixed(0)}%)`}
            />
            <div
              className="bg-yellow-500 hover:opacity-80 transition"
              style={{ width: `${uncertainPercent}%` }}
              title={`Uncertain: ${uncertainVotes} votes (${uncertainPercent.toFixed(0)}%)`}
            />
            <div
              className="bg-red-500 hover:opacity-80 transition"
              style={{ width: `${disputePercent}%` }}
              title={`Dispute: ${disputeVotes} votes (${disputePercent.toFixed(0)}%)`}
            />
          </div>
        </div>

        {/* Vote Legend */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-2 bg-green-500/10 border border-green-500/30 rounded">
            <p className="text-xs text-green-400 font-medium mb-1">Verify</p>
            <p className="text-sm text-white font-bold">{verifyVotes}</p>
            <p className="text-xs text-gray-400">{verifyPercent.toFixed(0)}%</p>
          </div>
          <div className="p-2 bg-yellow-500/10 border border-yellow-500/30 rounded">
            <p className="text-xs text-yellow-400 font-medium mb-1">Uncertain</p>
            <p className="text-sm text-white font-bold">{uncertainVotes}</p>
            <p className="text-xs text-gray-400">{uncertainPercent.toFixed(0)}%</p>
          </div>
          <div className="p-2 bg-red-500/10 border border-red-500/30 rounded">
            <p className="text-xs text-red-400 font-medium mb-1">Dispute</p>
            <p className="text-sm text-white font-bold">{disputeVotes}</p>
            <p className="text-xs text-gray-400">{disputePercent.toFixed(0)}%</p>
          </div>
        </div>

        {/* Vote Score Progress */}
        <div className="p-3 bg-gray-800/30 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-300 font-medium">Weighted Vote Score</p>
            <p className="text-lg font-bold text-cyan-400">{(scoreValue * 100).toFixed(0)}%</p>
          </div>
          <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden border border-gray-700/50">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
              style={{ width: `${scoreValue * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Based on reputation-weighted votes. Higher weight = better voter reputation.
          </p>
        </div>
      </div>
    </div>
  );
}
