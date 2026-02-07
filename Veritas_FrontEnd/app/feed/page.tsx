'use client';

import { Navbar } from '@/components/navbar';
import { RumorCard, RumorCardProps } from '@/components/rumor-card';
import { LeftSidebar } from '@/components/left-sidebar';
import { RightSidebar } from '@/components/right-sidebar';
import { RumorSkeleton } from '@/components/rumor-skeleton';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function FeedPage() {
  const [rumors, setRumors] = useState<RumorCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRumors();
  }, []);

  const fetchRumors = async () => {
    try {
      const response = await api.get('/rumors/rumors/');
      // Map API response to RumorCard props
      const mappedRumors = response.data.results.map((r: any) => ({
        id: r.rumor_id,
        content: r.content,
        author: r.author, // Ensure RumorCard handles this if present
        trustScore: parseFloat(r.trust_score),
        created_at: r.created_at,
        proofCount: r.proof_count,
        voteCount: r.vote_count,
        userVote: r.user_vote,
        isVerified: r.is_verified, // Add if RumorCard supports it
        tags: r.tags || [] // Add tags if supported
      }));
      setRumors(mappedRumors);
    } catch (error) {
      console.error('Failed to fetch rumors:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      <div className="flex pt-16 max-w-6xl mx-auto gap-6 px-4">
        {/* Left Sidebar - Navigation */}
        <div className="hidden md:block w-64 fixed h-full left-0 pl-4 top-16">
          <LeftSidebar />
        </div>

        {/* Spacer for fixed sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0"></div>

        {/* Center Column - Feed */}
        <div className="flex-1 w-full max-w-2xl mx-auto border-l border-r border-neutral-200 dark:border-neutral-800 min-h-screen">
          {/* Rumors List */}
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {loading ? (
              <div className="p-4 space-y-4">
                <RumorSkeleton />
                <RumorSkeleton />
                <RumorSkeleton />
              </div>
            ) : rumors.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <h3 className="text-lg font-medium text-black dark:text-white">No rumors yet</h3>
                <p className="mt-1">Be the first to post a new rumor!</p>
              </div>
            ) : (
              rumors.map((rumor) => (
                <div key={rumor.id} className="p-4">
                  <RumorCard {...rumor} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar - Filters */}
        <div className="hidden lg:block w-80 fixed right-0 pr-4 top-16 h-full">
          <RightSidebar onFilterChange={(f) => console.log(f)} />
        </div>
        {/* Spacer for fixed sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0"></div>

      </div>
    </main>
  );
}
