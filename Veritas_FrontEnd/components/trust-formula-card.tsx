'use client';

export function TrustFormulaCard() {
  return (
    <div className="glass glow-cyan p-6 mb-4">
      <h3 className="text-lg font-bold text-white mb-4">Trust Score Formula</h3>

      <div className="space-y-4">
        {/* Main Formula */}
        <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <p className="text-gray-300 text-sm mb-2">Master Formula:</p>
          <div className="font-mono text-white text-lg flex items-center gap-2">
            <span className="text-cyan-400">TrustScore</span>
            <span className="text-gray-400">=</span>
            <span className="text-green-400">0.50(V)</span>
            <span className="text-gray-400">+</span>
            <span className="text-yellow-400">0.30(P)</span>
            <span className="text-gray-400">+</span>
            <span className="text-blue-400">0.20(M)</span>
          </div>
        </div>

        {/* Component Breakdown */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-white font-medium">Vote Score (V) - 50%</p>
              <p className="text-xs text-gray-400">Weighted votes adjusted by voter reputation</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-white font-medium">Proof Score (P) - 30%</p>
              <p className="text-xs text-gray-400">Average quality of supporting evidence (&gt;10 votes = mature)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-white font-medium">Momentum Score (M) - 20%</p>
              <p className="text-xs text-gray-400">Recent voting activity in 6-hour window</p>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-xs text-blue-300">
            Volatility penalty reduces score if voting patterns are unstable or contradictory.
          </p>
        </div>
      </div>
    </div>
  );
}
