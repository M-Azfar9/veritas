'use client';

export interface MomentumScorePanelProps {
  recentVotes: number;
  previousVotes: number;
  momentumScore: number;
}

export function MomentumScorePanel({
  recentVotes = 18,
  previousVotes = 12,
  momentumScore = 0.68,
}: MomentumScorePanelProps) {
  const trend = recentVotes > previousVotes ? 'up' : recentVotes < previousVotes ? 'down' : 'stable';
  const trendPercent = previousVotes > 0 ? ((recentVotes - previousVotes) / previousVotes) * 100 : 0;

  return (
    <div className="glass glow-cyan p-6 mb-4">
      <h3 className="text-lg font-bold text-white mb-4">Momentum Score</h3>

      <div className="space-y-4">
        {/* Trend Indicator */}
        <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-300 font-medium">6-Hour Trend</p>
            <div
              className={`flex items-center gap-1 ${
                trend === 'up'
                  ? 'text-green-400'
                  : trend === 'down'
                    ? 'text-red-400'
                    : 'text-yellow-400'
              }`}
            >
              {trend === 'up' && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14l5-5 5 5z" />
                </svg>
              )}
              {trend === 'down' && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              )}
              {trend === 'stable' && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 12h14" strokeWidth="2" />
                </svg>
              )}
              <span className="text-sm font-bold">
                {trend === 'up' ? '+' : trend === 'down' ? '' : ''}{trendPercent.toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-400 mb-1">Last 6 Hours</p>
              <p className="text-2xl font-bold text-cyan-400">{recentVotes}</p>
              <p className="text-xs text-gray-500">votes</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Previous 6 Hours</p>
              <p className="text-2xl font-bold text-gray-300">{previousVotes}</p>
              <p className="text-xs text-gray-500">votes</p>
            </div>
          </div>
        </div>

        {/* Momentum Score */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-300 font-medium">Momentum Score</p>
            <p className="text-lg font-bold text-blue-400">{(momentumScore * 100).toFixed(0)}%</p>
          </div>
          <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden border border-gray-700/50">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${momentumScore * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Represents recent activity velocity. Higher = more active consensus building.
          </p>
        </div>

        {/* Activity Chart (Mock) */}
        <div className="p-3 bg-gray-800/30 rounded-lg">
          <p className="text-xs text-gray-400 mb-2 font-medium">Activity Pattern (Last 6 Hours)</p>
          <div className="flex items-end gap-1 h-12">
            {[3, 2, 4, 3, 5, 1].map((value, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t hover:opacity-80 transition"
                style={{ height: `${(value / 5) * 100}%` }}
                title={`Hour ${i + 1}: ${value} votes`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">Hourly vote distribution</p>
        </div>

        {/* Info */}
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-xs text-blue-300">
            <strong>Momentum Formula:</strong> Calculates voting velocity to identify emerging consensus or volatility patterns.
          </p>
        </div>
      </div>
    </div>
  );
}
