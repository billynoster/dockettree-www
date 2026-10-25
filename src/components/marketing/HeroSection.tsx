'use client'

import { StaticProductBackground } from '@/components/hero/StaticProductBackground'
import { ReadinessOverviewVisual } from '@/components/marketing/visuals'
import { Button } from '@/components/ui/button'
import { SIGNUP_URL } from '@/lib/site'

/**
 * Production hero — static product-led composition.
 * No Three.js, no motion prototypes, no toggle UI.
 */
export function HeroSection() {
  return (
    <section
      className="relative min-h-[100svh] bg-evergreen-deep"
      aria-label="Hero"
    >
      <div className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <StaticProductBackground />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1280px] flex-col justify-center px-5 pt-[76px] pb-10 sm:px-8 sm:pt-[80px] sm:pb-12">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10 xl:gap-12">
            <div className="max-w-xl text-ivory">
              <p className="hero-rise font-display text-[0.72rem] font-semibold tracking-[0.2em] text-ivory/75 uppercase sm:text-xs">
                Vendor readiness for property operations
              </p>

              <h1 className="hero-rise delay-1 mt-3 font-display text-[2.15rem] leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05] xl:text-[3.55rem]">
                <span className="block lg:whitespace-nowrap">
                  Know who can work.
                </span>
                <span className="block lg:whitespace-nowrap">
                  Know what’s next.
                </span>
              </h1>

              <p className="hero-rise delay-2 mt-4 max-w-md text-base leading-relaxed text-ivory/88 sm:text-lg">
                Docket Tree brings vendor documents, requests, reviews, and
                expiration dates into one connected workspace — so your team
                always knows what needs attention.
              </p>

              <div className="hero-rise delay-3 mt-7 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" variant="accent">
                  <a href={SIGNUP_URL}>Start Free Trial</a>
                </Button>
                <Button asChild size="lg" variant="inverse">
                  <a href="#product">Explore the Product</a>
                </Button>
              </div>

              <p className="hero-rise delay-4 mt-3 text-sm text-ivory/68">
                30-day free trial
              </p>
            </div>

            <div className="hero-rise delay-5 relative mx-auto w-full max-w-xl sm:max-w-2xl lg:max-w-none lg:origin-right lg:scale-[1.06] xl:scale-[1.08]">
              <ReadinessOverviewVisual className="border border-white/14 shadow-[0_18px_48px_rgba(0,0,0,0.28)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
