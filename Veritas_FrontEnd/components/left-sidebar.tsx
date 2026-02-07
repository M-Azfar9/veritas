'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LeftSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname?.startsWith(path);

  return (
    <div className="sticky top-16 h-[calc(100vh-64px)] border-r border-neutral-200 dark:border-neutral-800 w-60 overflow-y-auto hidden lg:block">
      <div className="p-6 space-y-8">
        {/* Branding */}
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">Veritas</h1>
          <p className="text-xs text-black/50 dark:text-white/50 mt-1">Anonymous Truth Protocol</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          <Link
            href="/feed"
            className={`block px-4 py-3 rounded-lg font-medium text-base transition-all duration-150 ${
              isActive('/feed')
                ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white'
                : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
            }`}
          >
            Feed
          </Link>
          <Link
            href="/trust"
            className={`block px-4 py-3 rounded-lg font-medium text-base transition-all duration-150 ${
              isActive('/trust')
                ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white'
                : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
            }`}
          >
            Trust
          </Link>
          <Link
            href="/dashboard"
            className={`block px-4 py-3 rounded-lg font-medium text-base transition-all duration-150 ${
              isActive('/dashboard')
                ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white'
                : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
            }`}
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </div>
  );
}
