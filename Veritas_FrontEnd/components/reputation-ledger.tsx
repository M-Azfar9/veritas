'use client';

export interface ReputationEvent {
  id: string;
  type: 'vote_correct' | 'vote_incorrect' | 'proof_helpful' | 'proof_misleading' | 'author_bonus';
  amount: number;
  description: string;
  timestamp: string;
  rumorId?: string;
}

export interface ReputationLedgerProps {
  events: ReputationEvent[];
}

const defaultEvents: ReputationEvent[] = [
  {
    id: '1',
    type: 'vote_correct',
    amount: 0.2,
    description: 'Correct vote on rumor #42',
    timestamp: '2 hours ago',
    rumorId: '42',
  },
  {
    id: '2',
    type: 'proof_helpful',
    amount: 0.5,
    description: 'Helpful proof submitted for rumor #39',
    timestamp: '5 hours ago',
    rumorId: '39',
  },
  {
    id: '3',
    type: 'author_bonus',
    amount: 0.6,
    description: '3x author multiplier on verified rumor #35',
    timestamp: '1 day ago',
    rumorId: '35',
  },
  {
    id: '4',
    type: 'vote_incorrect',
    amount: -0.4,
    description: 'Incorrect vote on rumor #28',
    timestamp: '2 days ago',
    rumorId: '28',
  },
  {
    id: '5',
    type: 'proof_misleading',
    amount: -1.5,
    description: 'Misleading proof removed from rumor #25',
    timestamp: '3 days ago',
    rumorId: '25',
  },
];

function getEventIcon(type: string) {
  switch (type) {
    case 'vote_correct':
      return '✓';
    case 'vote_incorrect':
      return '✗';
    case 'proof_helpful':
      return '📄';
    case 'proof_misleading':
      return '⚠';
    case 'author_bonus':
      return '⭐';
    default:
      return '•';
  }
}

function getEventColor(type: string) {
  switch (type) {
    case 'vote_correct':
      return 'text-green-400';
    case 'vote_incorrect':
      return 'text-red-400';
    case 'proof_helpful':
      return 'text-blue-400';
    case 'proof_misleading':
      return 'text-red-400';
    case 'author_bonus':
      return 'text-yellow-400';
    default:
      return 'text-gray-400';
  }
}

export function ReputationLedger({ events = defaultEvents }: ReputationLedgerProps) {
  return (
    <div className="glass glow-cyan p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Reputation Ledger</h3>
        <span className="text-xs text-gray-400">Last 30 days</span>
      </div>

      <div className="space-y-3">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="p-3 bg-gray-800/30 border border-gray-700/30 rounded-lg flex items-center justify-between hover:bg-gray-800/50 transition"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`text-xl ${getEventColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">{event.description}</p>
                  <p className="text-xs text-gray-500">{event.timestamp}</p>
                </div>
              </div>
              <div className={`text-sm font-bold ${event.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {event.amount > 0 ? '+' : ''}{event.amount.toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center">
            <p className="text-gray-400 text-sm">No reputation events yet</p>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-xs text-blue-300">
          <strong>Ledger Transparency:</strong> All reputation changes are logged and auditable. View the full transaction history on the audit log page.
        </p>
      </div>
    </div>
  );
}
