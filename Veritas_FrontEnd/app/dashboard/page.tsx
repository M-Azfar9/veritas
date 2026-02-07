'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'; // Simple placeholder if recharts installed, or custom
import api from '@/lib/api';
import { Shield, TrendingUp, Activity, Award } from 'lucide-react';
import { timeAgo } from '@/lib/date-utils';

interface ReputationEvent {
  event_id: string;
  event_type: string;
  delta: string;
  rumor_id?: string;
  created_at: string;
}

interface UserProfile {
  username: string;
  profile_trust_score: number;
  is_probationary: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [events, setEvents] = useState<ReputationEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch Profile
      const profileRes = await api.get('/users/profile/');
      setProfile(profileRes.data);

      // Fetch Reputation History
      const eventsRes = await api.get('/audit/reputation/');
      setEvents(eventsRes.data.results || eventsRes.data); // Handle pagination or list

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // If 401, redirect?
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">Loading dashboard...</div>;

  if (!profile) return <div className="min-h-screen flex items-center justify-center">Failed to load profile.</div>;

  // Mock chart data from events if we had enough
  const chartData = events.slice().reverse().map((e, index) => ({
    name: index,
    score: 50 + parseFloat(e.delta) // This is just delta, not cumulative. We'd need cumulative.
    // Real implementation: Start from current, subtract deltas backwards? Or better: backend returns chart points.
    // For MVP: Simple list is enough.
  }));

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white">Reputation Dashboard</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1">Track your impact and trust score.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
            <div className={`w-3 h-3 rounded-full ${profile.is_probationary ? 'bg-yellow-500' : 'bg-green-500'}`} />
            <span className="text-sm font-medium text-black dark:text-white">{profile.is_probationary ? 'Probationary' : 'Verified Member'}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-medium text-neutral-500">Trust Score</h3>
            </div>
            <p className="text-3xl font-bold text-black dark:text-white">{parseFloat(profile.profile_trust_score as any).toFixed(2)}</p>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <h3 className="text-sm font-medium text-neutral-500">Activity Level</h3>
            </div>
            <p className="text-3xl font-bold text-black dark:text-white">{events.length} <span className="text-sm font-normal text-neutral-400">events</span></p>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="text-sm font-medium text-neutral-500">Accuracy</h3>
            </div>
            <p className="text-3xl font-bold text-black dark:text-white">--%</p>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <h3 className="text-sm font-medium text-neutral-500">Top Rank</h3>
            </div>
            <p className="text-3xl font-bold text-black dark:text-white">#{profile.is_probationary ? '--' : '42'}</p>
          </div>
        </div>

        {/* Recent History */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Reputation History</h2>
          {events.length === 0 ? (
            <p className="text-neutral-500 text-sm">No reputation events recorded yet.</p>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.event_id} className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
                  <div>
                    <p className="font-medium text-sm text-black dark:text-white">{event.event_type.replace('_', ' ')}</p>
                    <p className="text-xs text-neutral-500">{timeAgo(event.created_at)}</p>
                  </div>
                  <span className={`font-mono font-medium ${parseFloat(event.delta) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {parseFloat(event.delta) > 0 ? '+' : ''}{event.delta}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
