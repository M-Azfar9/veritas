'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CheckCircle, Snowflake, TrendingUp, Zap } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'vote_result' | 'rumor_frozen' | 'reputation_change' | 'proof_maturity';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'vote_result',
      title: 'Vote Result',
      description: 'A rumor you voted on has been verified as True',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      type: 'rumor_frozen',
      title: 'Rumor Frozen',
      description: 'The rumor "Tech breakthrough" has entered frozen status after 60 days',
      timestamp: '5 hours ago',
      read: false,
    },
    {
      id: '3',
      type: 'reputation_change',
      title: 'Reputation Updated',
      description: 'Your reputation increased by +0.3 from accurate votes',
      timestamp: '1 day ago',
      read: true,
    },
    {
      id: '4',
      type: 'proof_maturity',
      title: 'Proof Maturity Reached',
      description: 'Your proof submission has reached maturity status (10+ votes)',
      timestamp: '2 days ago',
      read: true,
    },
    {
      id: '5',
      type: 'vote_result',
      title: 'Vote Result',
      description: 'A rumor you disputed has been verified as False',
      timestamp: '3 days ago',
      read: true,
    },
  ]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'vote_result':
        return <CheckCircle className="w-6 h-6 text-foreground/70" />;
      case 'rumor_frozen':
        return <Snowflake className="w-6 h-6 text-foreground/70" />;
      case 'reputation_change':
        return <TrendingUp className="w-6 h-6 text-foreground/70" />;
      case 'proof_maturity':
        return <Zap className="w-6 h-6 text-foreground/70" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'vote_result':
        return 'border-l-4 border-l-foreground/30';
      case 'rumor_frozen':
        return 'border-l-4 border-l-foreground/50';
      case 'reputation_change':
        return 'border-l-4 border-l-foreground/70';
      case 'proof_maturity':
        return 'border-l-4 border-l-foreground';
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Notifications</h1>
          <p className="text-foreground/60">Stay updated on your account activity</p>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`border border-gray-200 dark:border-gray-800 p-6 ${getNotificationColor(notification.type)} hover:bg-foreground/5 transition cursor-pointer ${!notification.read ? 'bg-foreground/5' : ''}`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-foreground">{notification.title}</h3>
                      <p className="text-sm text-foreground/70 mt-1">{notification.description}</p>
                    </div>
                    {!notification.read && (
                      <div className="flex-shrink-0 w-3 h-3 bg-foreground rounded-full mt-1" />
                    )}
                  </div>
                  <p className="text-xs text-foreground/50 mt-3">{notification.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/60">No notifications yet</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
