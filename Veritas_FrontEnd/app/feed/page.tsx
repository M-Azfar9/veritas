'use client';

import { Sidebar } from "@/components/ui/sidebar"
import { Navbar } from '@/components/navbar';
import { RumorCard, RumorCardProps } from '@/components/rumor-card';
import { LeftSidebar } from '@/components/left-sidebar';
import { RightSidebar } from '@/components/right-sidebar';
import { useState, useEffect } from 'react';
import { Footer } from '@/components/footer';
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
        trustScore: parseFloat(r.trust_score),
        created_at: r.created_at,
        proofCount: r.proof_count,
        voteCount: r.vote_count,
        userVote: r.user_vote, // API should return 'VERIFY', 'UNCERTAIN', etc.
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

      <div className="flex pt-16 max-w-6xl mx-auto gap-6">
        {/* Left Sidebar - Navigation */}
        <LeftSidebar />

        {/* Center Column - Feed */}
        <div className="flex-1 border-l border-r border-neutral-200 dark:border-neutral-800 max-w-2xl">
          {/* Rumors List */}
          <div>
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading rumors...</div>
            ) : rumors.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No rumors yet. Be the first to post!</div>
            ) : (
              rumors.map((rumor) => (
                <RumorCard key={rumor.id} {...rumor} />
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar - Filters */}
        <RightSidebar onFilterChange={(f) => console.log(f)} />
      </div>
    </main>
  );
}
