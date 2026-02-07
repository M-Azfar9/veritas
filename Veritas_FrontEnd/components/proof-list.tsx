'use client';

import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '@/lib/api';
import { timeAgo } from '@/lib/date-utils';

interface Proof {
    proof_id: string;
    proof_type: 'text' | 'link' | 'photo';
    content: string;
    file_url?: string;
    trust_score: number;
    vote_count: number;
    is_mature: boolean;
    created_at: string;
    poster: string; // ID or username? API sends ID probably. Frontend doesn't show username for anon.
}

interface ProofListProps {
    rumorId: string;
}

export function ProofList({ rumorId }: ProofListProps) {
    const [proofs, setProofs] = useState<Proof[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProofs();
    }, [rumorId]);

    const fetchProofs = async () => {
        try {
            const response = await api.get(`/rumors/proofs/?rumor=${rumorId}`);
            // API returns paginated response? ModelViewSet default is paginated.
            // Assuming standard pagination: { count, next, previous, results: [] }
            setProofs(response.data.results || []);
        } catch (error) {
            console.error('Failed to fetch proofs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async (proofId: string, voteType: 'SUPPORTS' | 'REFUTES' | 'UNCERTAIN') => {
        try {
            await api.post(`/rumors/proofs/${proofId}/vote/`, {
                vote_type: voteType
            });
            // Refresh proofs to show updated scores/counts
            fetchProofs();
        } catch (error) {
            console.error('Proof vote failed:', error);
        }
    };

    if (loading) return <div className="text-center py-4 text-sm text-neutral-500">Loading evidence...</div>;

    if (proofs.length === 0) {
        return (
            <div className="text-center py-8 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg">
                <p className="text-sm text-neutral-500">No evidence submitted yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {proofs.map((proof) => (
                <div key={proof.proof_id} className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded font-medium border ${proof.is_mature
                                    ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
                                    : 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800'
                                }`}>
                                {proof.is_mature ? 'Verified Source' : 'Under Review'}
                            </span>
                            <span className="text-xs text-neutral-400">{timeAgo(proof.created_at)}</span>
                        </div>
                        {/* Trust Score Mini-Badge */}
                        {proof.is_mature && (
                            <div className="flex items-center gap-1 text-xs font-semibold">
                                <span className={parseFloat(proof.trust_score as any) > 0.7 ? "text-green-600" : "text-neutral-600"}>
                                    {Math.round(parseFloat(proof.trust_score as any) * 100)}% Trust
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <p className="text-sm text-neutral-800 dark:text-neutral-200 mb-3">{proof.content}</p>

                    {/* Media/Link */}
                    {proof.file_url && (
                        <div className="mb-3">
                            {proof.proof_type === 'photo' ? (
                                <img src={proof.file_url} alt="Proof" className="rounded-lg max-h-48 object-cover w-full border border-neutral-200 dark:border-neutral-800" />
                            ) : (
                                <a href={proof.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all block">
                                    {proof.file_url}
                                </a>
                            )}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                            <span>{proof.vote_count} votes</span>
                            {!proof.is_mature && <span>• Need {10 - proof.vote_count} more to verify</span>}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleVote(proof.proof_id, 'SUPPORTS')}
                                className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-green-600 transition"
                                title="Supports"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleVote(proof.proof_id, 'UNCERTAIN')}
                                className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-yellow-600 transition"
                                title="Uncertain"
                            >
                                <HelpCircle className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleVote(proof.proof_id, 'REFUTES')}
                                className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-red-600 transition"
                                title="Refutes"
                            >
                                <AlertCircle className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
