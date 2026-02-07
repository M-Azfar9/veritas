'use client';

export interface VotingAccuracyPanelProps {
  correctVotes: number;
  totalVotes: number;
}

export function VotingAccuracyPanel({
  correctVotes = 34,
  totalVotes = 47,
}: VotingAccuracyPanelProps) {
  const accuracy = totalVotes > 0 ? (correctVotes / totalVotes) * 100 : 0;
  const accuracyLevel =
    accuracy >= 80 ? 'Excellent' : accuracy >= 60 ? 'Good' : accuracy >= 40 ? 'Fair' : 'Poor';
  const accuracyColor =
    accuracy >= 80
      ? 'text-green-400'
      : accuracy >= 60
        ? 'text-blue-400'
        : accuracy >= 40
          ? 'text-yellow-400'
          : 'text-red-400';

  return (
    <div className="glass glow-cyan p-6 mb-4">
      <h3 className="text-lg font-bold text-white mb-4">Voting Accuracy</h3>

      <div className="space-y-4">
        {/* Main Accuracy Display */}
        <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 text-center">
          <p className={`text-4xl font-bold ${accuracyColor} mb-2`}>{accuracy.toFixed(1)}%</p>
          <p className={`text-sm font-bold ${accuracyColor}`}>{accuracyLevel} Accuracy</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-400 mb-1">{correctVotes}</p>
            <p className="text-xs text-gray-400">Correct Votes</p>
          </div>
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
            <p className="text-2xl font-bold text-red-400 mb-1">{totalVotes - correctVotes}</p>
            <p className="text-xs text-gray-400">Incorrect Votes</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-300 font-medium">Overall Track Record</p>
            <p className="text-sm text-gray-400">{totalVotes} total votes cast</p>
          </div>
          <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden border border-gray-700/50">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>

        {/* Accuracy Breakdown */}
        <div className="space-y-2">
          <p className="text-sm text-gray-300 font-medium">Performance Categories</p>
          <div className="space-y-2">
            {accuracy >= 80 && (
              <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-300">Excellent judgment - High trust in your votes</span>
              </div>
            )}
            {accuracy >= 60 && accuracy < 80 && (
              <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-300">Good judgment - Reliable voter</span>
              </div>
            )}
            {accuracy >= 40 && accuracy < 60 && (
              <div className="flex items-center gap-2 p-2 bg-yellow-500/10 rounded">
                <span className="text-sm text-yellow-300">Fair judgment - Room for improvement</span>
              </div>
            )}
            {accuracy < 40 && (
              <div className="flex items-center gap-2 p-2 bg-red-500/10 rounded">
                <span className="text-sm text-red-300">Needs calibration - Consider updating your voting strategy</span>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-xs text-blue-300">
            <strong>Metric Details:</strong> Accuracy is calculated after rumor settlement when final classifications are determined.
          </p>
        </div>
      </div>
    </div>
  );
}
