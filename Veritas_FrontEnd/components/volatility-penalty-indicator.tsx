'use client';

export interface VolatilityPenaltyIndicatorProps {
  volatilityLevel: 'low' | 'medium' | 'high';
  penaltyAmount?: number;
  isApplied?: boolean;
}

export function VolatilityPenaltyIndicator({
  volatilityLevel = 'low',
  penaltyAmount = 0,
  isApplied = false,
}: VolatilityPenaltyIndicatorProps) {
  const levelColors = {
    low: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
    medium: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
    high: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
  };

  const levelLabels = {
    low: 'Low volatility - No penalty applied',
    medium: 'Medium volatility - Minor adjustments may apply',
    high: 'High volatility - Significant penalty applied',
  };

  const colors = levelColors[volatilityLevel];

  return (
    <div className={`glass p-6 mb-4 border ${colors.border}`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Volatility Assessment</h3>
        {isApplied && (
          <span className={`text-xs font-bold px-2 py-1 rounded ${colors.bg} ${colors.text}`}>
            Penalty Active
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* Volatility Level */}
        <div className={`p-4 rounded-lg ${colors.bg} border ${colors.border}`}>
          <div className="flex items-center gap-3 mb-2">
            {volatilityLevel === 'low' && (
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {volatilityLevel === 'medium' && (
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {volatilityLevel === 'high' && (
              <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m9-2l2 2m0 0l2 2m-2-2l-2 2m2-2l2-2" />
              </svg>
            )}
            <div>
              <p className={`font-bold text-sm ${colors.text}`}>
                {volatilityLevel.charAt(0).toUpperCase() + volatilityLevel.slice(1)} Volatility
              </p>
              <p className="text-xs text-gray-400">{levelLabels[volatilityLevel]}</p>
            </div>
          </div>
        </div>

        {/* Volatility Indicators */}
        <div className="space-y-2">
          <p className="text-sm text-gray-300 font-medium">Detected Patterns:</p>

          {volatilityLevel === 'high' && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-gray-300">Rapid vote direction changes detected</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-gray-300">Suspicious voting clusters identified</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-gray-300">Consensus contradicts earlier patterns</span>
              </div>
            </>
          )}

          {volatilityLevel === 'medium' && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Moderate voting inconsistencies observed</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Some vote weight misalignment detected</span>
              </div>
            </>
          )}

          {volatilityLevel === 'low' && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Voting patterns stable and consistent</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Healthy consensus emerging naturally</span>
              </div>
            </>
          )}
        </div>

        {/* Penalty Amount */}
        {isApplied && penaltyAmount > 0 && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-300">
              <strong>Penalty Applied:</strong> -{penaltyAmount.toFixed(3)} to trust score due to volatility detection
            </p>
          </div>
        )}

        {/* Info */}
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-xs text-blue-300">
            <strong>How it Works:</strong> Volatility assessment detects suspicious voting behavior. Penalties protect against manipulation and ensure trust scores reflect genuine consensus.
          </p>
        </div>
      </div>
    </div>
  );
}
