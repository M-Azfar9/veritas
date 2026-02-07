'use client';

export interface OriginalPosterMultiplierBadgeProps {
  isAuthor?: boolean;
  rumorTitle?: string;
}

export function OriginalPosterMultiplierBadge({
  isAuthor = true,
  rumorTitle = 'Unconfirmed rumor verification',
}: OriginalPosterMultiplierBadgeProps) {
  if (!isAuthor) return null;

  return (
    <div className="glass glow-cyan p-4 mb-4 inline-block w-full">
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center justify-center w-10 h-10 bg-yellow-500/20 border border-yellow-500/50 rounded-full">
          <span className="text-lg font-bold text-yellow-400">3×</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-yellow-400">Author Impact Multiplier</p>
          <p className="text-xs text-gray-400">
            As the original poster of "{rumorTitle}", all your reputation gains are multiplied by 3x if verified.
          </p>
        </div>
      </div>

      <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
        <p className="text-xs text-yellow-300">
          <strong>Your Potential Earnings:</strong>
        </p>
        <div className="text-xs text-yellow-200 mt-2 space-y-1">
          <div className="flex justify-between">
            <span>If verified true (from your initial post):</span>
            <span className="font-bold">+0.6 reputation (0.2 × 3)</span>
          </div>
          <div className="flex justify-between">
            <span>If you submit helpful proof:</span>
            <span className="font-bold">+1.5 reputation (0.5 × 3)</span>
          </div>
          <div className="flex justify-between">
            <span>Total possible bonus:</span>
            <span className="font-bold text-green-300">+2.1 reputation</span>
          </div>
        </div>
      </div>

      <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
        <p className="text-xs text-blue-300">
          <strong>⚠️ Risk Note:</strong> If the rumor is classified as false, penalties are also multiplied by 3×. Ensure you believe in the accuracy of rumors you submit.
        </p>
      </div>
    </div>
  );
}
