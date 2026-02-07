'use client';

export type RumorStatus = 'active' | 'frozen' | 'settled' | 'verified_true' | 'verified_false';

export interface RumorLifecycleIndicatorsProps {
  status: RumorStatus;
  daysOld?: number;
  createdDate?: string;
}

function getStatusConfig(status: RumorStatus) {
  switch (status) {
    case 'active':
      return {
        label: 'Active',
        color: 'bg-cyan-500/10 border-cyan-500/30',
        textColor: 'text-cyan-400',
        icon: '●',
        description: 'Community is actively voting and discussing',
      };
    case 'frozen':
      return {
        label: 'Frozen',
        color: 'bg-blue-500/10 border-blue-500/30',
        textColor: 'text-blue-400',
        icon: '❄',
        description: '60 days old - Voting phase ending',
      };
    case 'settled':
      return {
        label: 'Settled',
        color: 'bg-purple-500/10 border-purple-500/30',
        textColor: 'text-purple-400',
        icon: '⏱',
        description: 'Awaiting final classification',
      };
    case 'verified_true':
      return {
        label: 'Verified True',
        color: 'bg-green-500/10 border-green-500/30',
        textColor: 'text-green-400',
        icon: '✓',
        description: 'Community consensus: TRUE',
      };
    case 'verified_false':
      return {
        label: 'Verified False',
        color: 'bg-red-500/10 border-red-500/30',
        textColor: 'text-red-400',
        icon: '✗',
        description: 'Community consensus: FALSE',
      };
  }
}

export function FrozenRumorBadge({ status = 'frozen', daysOld = 60 }: RumorLifecycleIndicatorsProps) {
  if (status !== 'frozen') return null;

  const config = getStatusConfig(status);

  return (
    <div className={`glass p-4 mb-4 border ${config.color}`}>
      <div className="flex items-center gap-3">
        <span className={`text-2xl ${config.textColor}`}>{config.icon}</span>
        <div className="flex-1">
          <p className={`font-bold text-sm ${config.textColor}`}>{config.label}</p>
          <p className="text-xs text-gray-400">{config.description}</p>
          <p className="text-xs text-gray-500 mt-1">Voting will conclude in 60 days from creation.</p>
        </div>
      </div>
    </div>
  );
}

export function FinalClassificationLabel({ status = 'verified_true' }: RumorLifecycleIndicatorsProps) {
  if (!['verified_true', 'verified_false'].includes(status)) return null;

  const config = getStatusConfig(status as 'verified_true' | 'verified_false');
  const isTrue = status === 'verified_true';

  return (
    <div className={`glass p-6 mb-4 border ${config.color}`}>
      <div className="text-center space-y-3">
        <div className={`text-5xl ${config.textColor}`}>{config.icon}</div>
        <div>
          <p className={`text-2xl font-bold ${config.textColor}`}>{config.label}</p>
          <p className="text-sm text-gray-400 mt-1">
            {isTrue
              ? 'The community has verified this claim as TRUE based on overwhelming evidence.'
              : 'The community has verified this claim as FALSE based on contradicting evidence.'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 pt-4">
          <div className="p-2 bg-gray-800/30 rounded text-center">
            <p className="text-xs text-gray-400 mb-1">Final Score</p>
            <p className={`text-lg font-bold ${config.textColor}`}>{isTrue ? '0.87' : '0.12'}</p>
          </div>
          <div className="p-2 bg-gray-800/30 rounded text-center">
            <p className="text-xs text-gray-400 mb-1">Community Vote</p>
            <p className={`text-lg font-bold ${config.textColor}`}>{isTrue ? '78%' : '22%'}</p>
          </div>
          <div className="p-2 bg-gray-800/30 rounded text-center">
            <p className="text-xs text-gray-400 mb-1">Votes</p>
            <p className={`text-lg font-bold ${config.textColor}`}>{isTrue ? '156' : '65'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SettlementNotification() {
  return (
    <div className="glass glow-cyan p-4 mb-4 border border-purple-500/30 bg-purple-500/10">
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-500/20 border border-purple-500/50 rounded-full">
          <span className="text-lg font-bold text-purple-400">⏱</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-purple-400">Settlement Phase</p>
          <p className="text-xs text-gray-400">Reputation rewards and penalties are being distributed to participants.</p>
        </div>
      </div>

      <div className="mt-3 p-3 bg-gray-800/30 rounded">
        <p className="text-xs text-gray-300 mb-2">
          <strong>Your Distribution Status:</strong>
        </p>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Voting rewards</span>
            <span className="text-green-400 font-bold">+0.2 (Processed)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Proof contribution</span>
            <span className="text-blue-400 font-bold">+0.5 (Pending)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Author bonus</span>
            <span className="text-yellow-400 font-bold">+1.8 (Pending)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProofMaturityStatus({ proofCount = 12 }: { proofCount?: number }) {
  const isMatured = proofCount >= 10;

  return (
    <div className={`glass p-4 mb-4 border ${isMatured ? 'border-green-500/30 bg-green-500/10' : 'border-yellow-500/30 bg-yellow-500/10'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`font-bold text-sm ${isMatured ? 'text-green-400' : 'text-yellow-400'}`}>
            Proof Maturity: {proofCount}/10
          </p>
          <p className="text-xs text-gray-400">
            {isMatured ? 'Proofs are mature and contributing to trust score' : `${10 - proofCount} more votes needed to mature`}
          </p>
        </div>
        <div className={`text-2xl ${isMatured ? 'text-green-400' : 'text-yellow-400'}`}>
          {isMatured ? '✓' : '⏳'}
        </div>
      </div>
    </div>
  );
}
