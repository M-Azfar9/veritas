'use client';

export interface TrustMeterProps {
  score: number;
  label?: string;
}

export function TrustMeter({ score, label = 'Trust Score' }: TrustMeterProps) {
  const percentage = Math.min(Math.max(score * 100, 0), 100);
  const angle = (percentage / 100) * 180 - 90;

  const getColor = (val: number) => {
    if (val > 70) return '#000000'; // black for high
    if (val > 40) return '#666666'; // gray for medium
    return '#999999'; // light gray for low
  };

  return (
    <div className="border border-gray-200 dark:border-gray-800 p-8 flex flex-col items-center justify-center">
      <h3 className="text-sm text-foreground/60 font-medium mb-6">{label}</h3>

      {/* Circular Meter */}
      <div className="relative w-48 h-48 mb-6">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full border-8 border-gray-200 dark:border-gray-800" />

        {/* Progress circle with SVG */}
        <svg className="absolute inset-0 transform -rotate-90 w-48 h-48">
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${(percentage / 100) * (2 * Math.PI * 88)} ${2 * Math.PI * 88}`}
            strokeLinecap="round"
            className="text-foreground dark:text-gray-400"
          />
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-foreground">{percentage.toFixed(0)}</div>
          <div className="text-sm text-foreground/60">%</div>
        </div>
      </div>

      {/* Status text */}
      <div className="text-center">
        <p className="text-lg font-semibold text-foreground">
          {percentage > 70 ? 'High Confidence' : percentage > 40 ? 'Moderate Confidence' : 'Low Confidence'}
        </p>
        <p className="text-sm text-foreground/60 mt-2">Based on community verification</p>
      </div>
    </div>
  );
}
