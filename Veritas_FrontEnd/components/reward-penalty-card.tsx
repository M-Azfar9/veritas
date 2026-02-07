'use client';

export function RewardPenaltyCard() {
  return (
    <div className="glass glow-cyan p-6 mb-4">
      <h3 className="text-lg font-bold text-white mb-4">Reputation Rewards & Penalties</h3>

      <div className="space-y-3">
        {/* Voting Rewards */}
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-sm font-bold text-green-400 mb-2">Voting Rewards</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Correct vote:</span>
              <span className="text-green-400 font-bold">+0.2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Incorrect vote:</span>
              <span className="text-red-400 font-bold">-0.4</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Rewards based on voting accuracy relative to final rumor classification.
          </p>
        </div>

        {/* Proof Rewards */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-sm font-bold text-blue-400 mb-2">Proof Contributions</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Helpful proof:</span>
              <span className="text-blue-400 font-bold">+0.5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Misleading proof:</span>
              <span className="text-red-400 font-bold">-1.5</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Determined by community votes on proof quality and relevance.
          </p>
        </div>

        {/* Author Bonus */}
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-sm font-bold text-yellow-400 mb-2">Author Multiplier</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Original poster bonus:</span>
              <span className="text-yellow-400 font-bold text-lg">3x</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            If you submit the original rumor and it gets verified, all rewards are multiplied by 3.
          </p>
        </div>

        {/* Info */}
        <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <p className="text-xs text-purple-300">
            <strong>Settlement Phase:</strong> Rewards and penalties are calculated and distributed when rumors reach 60 days old or are manually settled by moderators.
          </p>
        </div>
      </div>
    </div>
  );
}
