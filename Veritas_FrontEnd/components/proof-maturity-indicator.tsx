'use client';

export interface ProofMaturityIndicatorProps {
  voteCount: number;
  proofCount: number;
}

export function ProofMaturityIndicator({ voteCount = 5, proofCount = 2 }: ProofMaturityIndicatorProps) {
  const requiredVotes = 10;
  const isMatured = voteCount >= requiredVotes;
  const progress = Math.min((voteCount / requiredVotes) * 100, 100);

  return (
    <div className="glass glow-cyan p-6 mb-4">
      <h3 className="text-lg font-bold text-white mb-4">Proof Maturity Status</h3>

      <div className="space-y-4">
        {/* Main Status */}
        <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-3 h-3 rounded-full ${isMatured ? 'bg-green-500' : 'bg-yellow-500'}`}
            />
            <span className={`font-medium ${isMatured ? 'text-green-400' : 'text-yellow-400'}`}>
              {isMatured ? 'Proofs Mature' : 'Proofs Developing'}
            </span>
          </div>
          <p className="text-sm text-gray-300">
            {proofCount} proof items submitted
            {!isMatured && ` • Needs ${requiredVotes - voteCount} more votes to mature`}
          </p>
        </div>

        {/* Progress to Maturity */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-400">Maturity Progress</p>
            <p className="text-sm font-bold text-cyan-400">
              {voteCount}/{requiredVotes} votes
            </p>
          </div>
          <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden border border-gray-700/50">
            <div
              className={`h-full transition-all duration-500 ${
                isMatured
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Threshold Info */}
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-xs text-blue-300">
            <strong>Maturity Threshold:</strong> Proofs require {requiredVotes} community votes to be considered mature and included in final trust calculation.
          </p>
        </div>

        {/* Impact Note */}
        {isMatured && (
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-xs text-green-300">
              <strong>Impact Activated:</strong> Mature proofs now contribute to the final trust score calculation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
