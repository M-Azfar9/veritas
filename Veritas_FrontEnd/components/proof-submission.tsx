'use client';

import { useState } from 'react';
import { X, Upload, Link as LinkIcon, FileText } from 'lucide-react';
import api from '@/lib/api';

interface ProofSubmissionProps {
    rumorId: string;
    onClose: () => void;
    onSuccess: () => void;
}

export function ProofSubmission({ rumorId, onClose, onSuccess }: ProofSubmissionProps) {
    const [proofType, setProofType] = useState<'text' | 'link' | 'photo'>('text');
    const [content, setContent] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await api.post('/rumors/proofs/', {
                rumor: rumorId,
                proof_type: proofType,
                content: content,
                file_url: proofType !== 'text' ? fileUrl : undefined
            });
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Proof submission failed:', err);
            setError(err.response?.data?.detail || 'Failed to submit proof. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-full max-w-md border border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-semibold text-lg text-black dark:text-white">Submit Evidence</h3>
                    <button onClick={onClose} className="text-neutral-500 hover:text-black dark:hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* Proof Type Selection */}
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            type="button"
                            onClick={() => setProofType('text')}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${proofType === 'text'
                                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                                    : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                }`}
                        >
                            <FileText className="w-5 h-5 mb-1" />
                            <span className="text-xs font-medium">Text</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setProofType('link')}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${proofType === 'link'
                                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                                    : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                }`}
                        >
                            <LinkIcon className="w-5 h-5 mb-1" />
                            <span className="text-xs font-medium">Link</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setProofType('photo')}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${proofType === 'photo'
                                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                                    : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                }`}
                        >
                            <Upload className="w-5 h-5 mb-1" />
                            <span className="text-xs font-medium">Photo</span>
                        </button>
                    </div>

                    {/* Content Input */}
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">
                            {proofType === 'text' ? 'Testimony' : 'Description'}
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none h-24 text-sm"
                            placeholder={proofType === 'text' ? "What did you see or hear?" : "Describe this evidence..."}
                            required
                        />
                    </div>

                    {/* URL Input */}
                    {proofType !== 'text' && (
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">
                                {proofType === 'link' ? 'Link URL' : 'Image URL'}
                            </label>
                            <input
                                type="url"
                                value={fileUrl}
                                onChange={(e) => setFileUrl(e.target.value)}
                                className="w-full p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-sm"
                                placeholder={proofType === 'link' ? "https://..." : "https://example.com/image.jpg"}
                                required
                            />
                            {proofType === 'photo' && <p className="text-xs text-neutral-500 mt-1">Hosting generic image uploads is disabled for MVP. Please use a public URL.</p>}
                        </div>
                    )}

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Evidence'}
                    </button>
                </form>
            </div>
        </div>
    );
}
