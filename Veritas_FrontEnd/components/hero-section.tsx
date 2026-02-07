'use client';

import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
      {/* 2-Column Hero Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        {/* Left Column - Content */}
        <div>
          <span className="inline-block mb-6 px-3 py-1 text-xs font-medium text-black/70 dark:text-white/70 border border-neutral-200 dark:border-neutral-800 rounded">
            PROTOCOL ACTIVE
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold text-black dark:text-white mb-6 text-balance">
            Veritas
          </h1>

          <p className="text-lg text-black/70 dark:text-white/70 mb-8 text-balance leading-relaxed">
            Anonymous Truth Protocol — Verify rumors through collective intelligence and transparent evidence aggregation
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/feed"
              className="px-8 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-all duration-150 text-center"
            >
              Explore Rumors
            </Link>
            <button className="px-8 py-2.5 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white rounded hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-150 font-medium">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Column - Logo */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-sm aspect-square">
            <Image
              src="/logo.svg"
              alt="Veritas Logo"
              fill
              className="object-contain filter hover:drop-shadow-lg dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 transition-all duration-300"
              priority
            />
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-20 border-t border-neutral-200 dark:border-neutral-800 pt-12">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { num: '01', title: 'Submit', desc: 'Anonymous community members submit claims' },
            { num: '02', title: 'Verify', desc: 'Users vote on validity with evidence' },
            { num: '03', title: 'Score', desc: 'Trust score calculated via algorithm' },
            { num: '04', title: 'Learn', desc: 'Collective truth emerges transparently' },
          ].map((step) => (
            <div key={step.num} className="border border-neutral-200 dark:border-neutral-800 p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-150">
              <div className="text-3xl font-bold text-black dark:text-white mb-3">
                {step.num}
              </div>
              <h3 className="font-semibold text-black dark:text-white mb-2">{step.title}</h3>
              <p className="text-sm text-black/60 dark:text-white/60">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Score Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 border-t border-neutral-200 dark:border-neutral-800 pt-12">
        <div className="border border-neutral-200 dark:border-neutral-800 p-8">
          <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Trust Score Mechanism</h3>
          <p className="text-black/70 dark:text-white/70 text-sm leading-relaxed mb-4">
            Our algorithm aggregates community verification, proof quality, and temporal consistency to generate objective truth scores.
          </p>
          <ul className="space-y-3">
            {[
              'Weighted voting system',
              'Evidence validation',
              'Temporal confidence decay',
              'Community consensus',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-black/70 dark:text-white/70">
                <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-neutral-200 dark:border-neutral-800 p-8">
          <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Reputation Economy</h3>
          <p className="text-black/70 dark:text-white/70 text-sm leading-relaxed mb-4">
            Participants earn reputation through accurate verifications and quality evidence contributions.
          </p>
          <ul className="space-y-3">
            {[
              'Verification rewards',
              'Evidence bounties',
              'Accuracy badges',
              'Community recognition',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-black/70 dark:text-white/70">
                <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Final CTA */}
      <div className="border border-neutral-200 dark:border-neutral-800 p-12 text-center">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Join the Truth</h2>
        <p className="text-black/70 dark:text-white/70 mb-8 max-w-2xl mx-auto text-balance">
          Be part of the verifiable truth ecosystem. Contribute, verify, and build reputation in Veritas.
        </p>
        <Link
          href="/feed"
          className="inline-block px-8 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded hover:bg-black/90 dark:hover:bg-white/90 transition-all duration-150 font-medium"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
