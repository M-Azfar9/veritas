'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { TrustMeter } from '@/components/trust-meter';
import { StatsCard } from '@/components/stats-card';

export default function TrustPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Trust Visualization</h1>
          <p className="text-foreground/60">Deep dive into claim verification metrics and community consensus</p>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Trust Meter */}
          <div className="lg:col-span-1">
            <TrustMeter score={0.72} label="Overall Trust Index" />
          </div>

          {/* Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-6">
            <StatsCard title="Total Claims Verified" value="2,847" change={12} />
            <StatsCard title="Average Trust Score" value="68%" change={5} />
            <StatsCard title="Active Verifiers" value="3,421" change={-2} />
            <StatsCard title="Proof Contributions" value="12,504" change={23} />
          </div>
        </div>

        {/* Vote Distribution */}
        <div className="border border-gray-200 dark:border-gray-800 p-8 mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Vote Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Verify Column */}
            <div>
              <div className="relative mb-4">
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-foreground dark:bg-gray-400" style={{ width: '62%' }} />
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">62%</div>
                <p className="text-sm text-foreground/60">Verify (1,746 votes)</p>
              </div>
            </div>

            {/* Uncertain Column */}
            <div>
              <div className="relative mb-4">
                <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden border border-gray-700/50">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-500" style={{ width: '28%' }} />
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">28%</div>
                <p className="text-sm text-gray-400">Uncertain (784 votes)</p>
              </div>
            </div>

            {/* Dispute Column */}
            <div>
              <div className="relative mb-4">
                <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden border border-gray-700/50">
                  <div className="h-full bg-gradient-to-r from-red-500 to-rose-500" style={{ width: '10%' }} />
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">10%</div>
                <p className="text-sm text-gray-400">Dispute (280 votes)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Proof Maturity & Momentum */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Proof Maturity */}
          <div className="glass glow-purple p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Proof Maturity Indicator</h3>
            <div className="space-y-4">
              {[
                { stage: 'Initial Submissions', percent: 100 },
                { stage: 'Peer Review', percent: 75 },
                { stage: 'Verification', percent: 55 },
                { stage: 'Consensus', percent: 32 },
              ].map((item) => (
                <div key={item.stage}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-300">{item.stage}</span>
                    <span className="text-sm text-purple-400 font-semibold">{item.percent}%</span>
                  </div>
                  <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden border border-gray-700/50">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Momentum Score */}
          <div className="glass glow-blue p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Momentum Score Panel</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Trending Up</span>
                  <span className="text-sm text-blue-400 font-semibold">↑ +18%</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden border border-gray-700/50">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '85%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Stable</span>
                  <span className="text-sm text-blue-400 font-semibold">→ +2%</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden border border-gray-700/50">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '40%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Declining</span>
                  <span className="text-sm text-blue-400 font-semibold">↓ -5%</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden border border-gray-700/50">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '20%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Algorithm Explanation */}
        <div className="glass glow-cyan p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Algorithm Explanation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-4">Calculation Method</h4>
              <div className="space-y-3 text-sm text-gray-300">
                <p>
                  Our trust scoring algorithm weighs multiple factors in real-time to generate objective veracity metrics.
                </p>
                <ul className="space-y-2 pl-4 border-l border-cyan-500/30">
                  <li>• Community vote ratio (weighted)</li>
                  <li>• Evidence quality assessment</li>
                  <li>• Temporal consistency analysis</li>
                  <li>• Voter reputation scoring</li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-4">Update Frequency</h4>
              <div className="space-y-3 text-sm text-gray-300">
                <p>
                  Scores update continuously as new evidence and votes are submitted to the protocol.
                </p>
                <ul className="space-y-2 pl-4 border-l border-cyan-500/30">
                  <li>• Real-time vote aggregation</li>
                  <li>• 24-hour confidence decay</li>
                  <li>• Threshold-based triggers</li>
                  <li>• Consensus validation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
