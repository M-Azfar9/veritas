'use client';

import React from "react"

import { useState } from 'react';
import { Bell, X, CheckCircle, Snowflake, TrendingUp, Zap } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'vote_result' | 'rumor_frozen' | 'reputation_change' | 'proof_maturity';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  icon?: React.ReactNode;
}

export interface NotificationPanelProps {
  notifications?: Notification[];
}

export function NotificationPanel({ notifications: initialNotifications = [] }: NotificationPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'vote_result':
        return <CheckCircle className="w-5 h-5 text-foreground/70" />;
      case 'rumor_frozen':
        return <Snowflake className="w-5 h-5 text-foreground/70" />;
      case 'reputation_change':
        return <TrendingUp className="w-5 h-5 text-foreground/70" />;
      case 'proof_maturity':
        return <Zap className="w-5 h-5 text-foreground/70" />;
      default:
        return <Bell className="w-5 h-5 text-foreground/70" />;
    }
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-foreground/60 hover:text-foreground transition rounded hover:bg-foreground/5"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 bg-foreground text-background text-xs font-semibold rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 bg-background border border-gray-200 dark:border-gray-800 rounded shadow-lg z-50 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-foreground/60 hover:text-foreground transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 mx-auto mb-2 text-foreground/30" />
                <p className="text-sm text-foreground/60">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-foreground/5 transition cursor-pointer ${!notification.read ? 'bg-foreground/5' : ''}`}
                    onClick={() => handleNotificationRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{notification.title}</p>
                        <p className="text-xs text-foreground/60 mt-1">{notification.description}</p>
                        <p className="text-xs text-foreground/40 mt-2">{notification.timestamp}</p>
                      </div>
                      {!notification.read && (
                        <div className="flex-shrink-0 mt-1 w-2 h-2 bg-foreground rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-800 p-3">
              <button
                onClick={handleClearAll}
                className="w-full text-xs text-foreground/60 hover:text-foreground transition py-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
