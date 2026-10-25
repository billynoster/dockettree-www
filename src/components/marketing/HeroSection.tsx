'use client'

import { useLayoutEffect, useState } from 'react'

import { HeroProductReveal } from '@/components/hero/HeroProductReveal'
import { StaticProductBackground } from '@/components/hero/StaticProductBackground'
import { ReadinessOverviewVisual } from '@/components/marketing/visuals'
import { Button } from '@/components/ui/button'
import {
  type HeroVariant,
  parseHeroVariant,
} from '@/lib/heroVariant'
import { SIGNUP_URL } from '@/lib/site'

/**
 * Production hero — static product-led composition.
 * Try Live variations via `?hero=static|layered|intelligent` (default static).
 */
export function HeroSection() {
  const [variant, setVariant] = useState<HeroVariant>('static')

  // Layout effect so Try Live `?hero=` applies before first paint when possible.
  useLayoutEffect(() => {
    setVariant(
      parseHeroVariant(new URLSearchParams(window.location.search).get('hero')),
    )
  }, [])

  const dashboard = (
    <ReadinessOverviewVisual
      className="w-full border border-white/14 shadow-[0_18px_48px_rgba(0,0,0,0.28)]"
      reveal={variant === 'intelligent' ? 'intelligent' : 'none'}
      heroDashboard
    />
  )

  return (
    <section
      className="relative overflow-x-clip bg-evergreen-deep"
      aria-label="Hero"
      data-hero-variant={variant}
    >
      <div className="relative overflow-x-clip">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <StaticProductBackground />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col justify-center px-5 pt-[88px] pb-11 sm:px-8 sm:pt-[92px] sm:pb-12 xl:min-h-[700px] xl:pb-14 2xl:min-h-[740px]">
          <div className="grid w-full grid-cols-1 items-center gap-7 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] xl:gap-10">
            <div className="min-w-0 max-w-xl text-ivory xl:max-w-none">
              <p className="hero-rise font-display text-[0.72rem] font-semibold tracking-[0.2em] text-ivory/75 uppercase sm:text-xs">
                Vendor readiness for property operations
              </p>

              <h1 className="hero-rise delay-1 mt-3 font-display text-[2.15rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl xl:text-[3.4rem] xl:leading-[1.05]">
                <span className="block xl:whitespace-nowrap">
                  Know who can work.
                </span>
                <span className="block xl:whitespace-nowrap">
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

            <div className="min-w-0 w-full justify-self-stretch">
              {variant === 'layered' ? (
                <HeroProductReveal>{dashboard}</HeroProductReveal>
              ) : (
                dashboard
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
