'use client'

import { Button } from '@/components/ui/button'
import { PRICING_URL, SIGNUP_URL } from '@/lib/site'

export function FinalCTASection() {
  return (
    <section className="relative overflow-hidden border-t border-evergreen-deep bg-evergreen-deep">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 1200 480"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="#78966A" strokeWidth="1.2" fill="none" opacity="0.55">
          <path d="M200 240 C320 120, 480 120, 600 240 C720 360, 880 360, 1000 240" />
          <path d="M160 280 C300 200, 420 180, 560 260" />
          <path d="M640 220 C780 140, 900 160, 1040 260" />
          <path d="M280 320 C400 260, 520 300, 680 340" />
        </g>
        <g fill="#D9A441">
          <circle cx="600" cy="240" r="7" />
          <circle cx="320" cy="160" r="4" opacity="0.85" />
          <circle cx="880" cy="160" r="4" opacity="0.85" />
          <circle cx="240" cy="300" r="3.5" fill="#78966A" />
          <circle cx="960" cy="300" r="3.5" fill="#78966A" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-[1280px] px-5 py-24 text-center sm:px-8 sm:py-32">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ivory text-balance sm:text-4xl lg:text-5xl">
          Everything connected. Nothing lost.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg">
          Bring vendor readiness, documents, requests, reviews, and expirations
          together in one clear workspace.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" variant="accent">
            <a href={SIGNUP_URL}>Start Free Trial</a>
          </Button>
          <Button asChild size="lg" variant="inverse">
            <a href={PRICING_URL}>Explore Pricing</a>
          </Button>
        </div>
        <p className="mt-4 text-sm text-ivory/65">30-day free trial</p>
      </div>
    </section>
  )
}
