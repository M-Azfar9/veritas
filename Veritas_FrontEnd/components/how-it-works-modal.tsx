'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info, Shield, Users, Activity } from 'lucide-react';

export function HowItWorksModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white">
                    <Info className="w-5 h-5" />
                    <span className="sr-only">How it works</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-black dark:text-white mb-2">The Veritas Trust Score</DialogTitle>
                    <DialogDescription className="text-neutral-500 dark:text-neutral-400">
                        Our algorithm (0.5V + 0.3P + 0.2M) ensures truth rises to the top.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                        <div className="mb-3">
                            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">50% Weighted Votes</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                            Votes aren't equal. Users with higher reputation have more impact.
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
                        <div className="mb-3">
                            <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-1">30% Mature Proofs</h3>
                        <p className="text-sm text-purple-700 dark:text-purple-400">
                            Verified evidence (photos, links) that has survived community vetting.
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800">
                        <div className="mb-3">
                            <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <h3 className="font-semibold text-orange-900 dark:text-orange-300 mb-1">20% Momentum</h3>
                        <p className="text-sm text-orange-700 dark:text-orange-400">
                            Organic consensus building over time, penalizing coordinated bots.
                        </p>
                    </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-600 dark:text-neutral-300">
                    <strong>High Stakes:</strong> After 60 days, rumors are "Settled".
                    If you voted correctly, you gain reputation. If you were wrong, you lose it.
                </div>
            </DialogContent>
        </Dialog>
    );
}
