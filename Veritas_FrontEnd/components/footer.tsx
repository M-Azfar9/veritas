'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-foreground">V</span>
              <span className="font-bold text-foreground">Veritas</span>
            </div>
            <p className="text-xs text-foreground/60">Anonymous Truth Protocol</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Product</h4>
            <ul className="space-y-2 text-xs text-foreground/60">
              <li>
                <Link href="/feed" className="hover:text-foreground transition">
                  Rumor Feed
                </Link>
              </li>
              <li>
                <Link href="/trust" className="hover:text-foreground transition">
                  Trust Visualization
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Legal</h4>
            <ul className="space-y-2 text-xs text-foreground/60">
              <li>
                <button className="hover:text-foreground transition">Privacy</button>
              </li>
              <li>
                <button className="hover:text-cyan-400 transition">Terms</button>
              </li>
              <li>
                <button className="hover:text-cyan-400 transition">Conduct</button>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Connect</h4>
            <div className="flex gap-3">
              <button className="w-8 h-8 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition flex items-center justify-center">
                <span className="text-xs">𝕏</span>
              </button>
              <button className="w-8 h-8 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition flex items-center justify-center text-xs">
                f
              </button>
              <button className="w-8 h-8 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition flex items-center justify-center text-xs">
                in
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cyan-500/20 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">© 2025 Veritas Protocol. All rights reserved.</p>
          <p className="text-xs text-gray-500 mt-4 sm:mt-0">Built for transparent truth verification</p>
        </div>
      </div>
    </footer>
  );
}
