'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { NetworkCanvas } from '@/components/hero/NetworkCanvas'
import { NetworkFallback } from '@/components/hero/NetworkFallback'
import { ReadinessOverviewVisual } from '@/components/marketing/visuals'
import { Button } from '@/components/ui/button'
import {
  DEFAULT_HERO_MOTION,
  HERO_MOTION_OPTIONS,
  HERO_MOTION_PARAM,
  type HeroMotionMode,
  parseHeroMotion,
} from '@/lib/heroMotion'
import { SIGNUP_URL } from '@/lib/site'
import { cn } from '@/lib/utils'

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

function readMotionFromLocation(): HeroMotionMode {
  if (typeof window === 'undefined') return DEFAULT_HERO_MOTION
  const params = new URLSearchParams(window.location.search)
  return parseHeroMotion(params.get(HERO_MOTION_PARAM))
}

function writeMotionToLocation(mode: HeroMotionMode) {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.searchParams.set(HERO_MOTION_PARAM, mode)
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const reducedMotion = Boolean(reduce)
  const [mounted, setMounted] = useState(false)
  const [webglOk, setWebglOk] = useState(true)
  const [simplified, setSimplified] = useState(false)
  const [motionMode, setMotionMode] =
    useState<HeroMotionMode>(DEFAULT_HERO_MOTION)
  const [scrollProgress, setScrollProgress] = useState(0.12)
  const [autoProgress, setAutoProgress] = useState(0.12)
  const progress = reducedMotion
    ? 1
    : Math.max(scrollProgress, autoProgress)

  useEffect(() => {
    setMounted(true)
    setMotionMode(readMotionFromLocation())
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setWebglOk(Boolean(gl))
    } catch {
      setWebglOk(false)
    }

    const mq = window.matchMedia('(max-width: 768px)')
    const apply = () => setSimplified(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setScrollProgress(1)
      setAutoProgress(1)
      return
    }

    const update = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = clamp01(-rect.top / Math.max(total, 1))
      setScrollProgress(0.12 + clamp01(scrolled / 0.5) * 0.88)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [reducedMotion])

  // One-shot assemble so A/B chips replay settle→hold without scroll-jacking.
  useEffect(() => {
    if (reducedMotion) return
    setAutoProgress(0.12)
    const duration = motionMode === 'reveal' ? 4200 : 2800
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = clamp01((now - start) / duration)
      const eased = t * t * (3 - 2 * t)
      setAutoProgress(0.12 + eased * 0.88)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [motionMode, reducedMotion])

  const selectMotion = (mode: HeroMotionMode) => {
    setMotionMode(mode)
    writeMotionToLocation(mode)
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[132vh] bg-evergreen-deep sm:h-[140vh]"
      aria-label="Hero"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <NetworkFallback progress={progress} motionMode={motionMode} />
          {mounted && webglOk && !simplified && (
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                opacity: reducedMotion
                  ? 0.55
                  : 0.42 + Math.min(1, progress) * 0.28,
              }}
            >
              <NetworkCanvas
                progress={reducedMotion ? 1 : progress}
                reducedMotion={reducedMotion}
                motionMode={motionMode}
                simplified={simplified}
              />
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(18,61,49,0.95)_0%,rgba(18,61,49,0.82)_36%,rgba(18,61,49,0.45)_62%,rgba(18,61,49,0.28)_100%)] transition-opacity duration-500"
            style={{
              opacity: reducedMotion
                ? 1
                : 1 - Math.max(0, progress - 0.75) * 0.35,
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-center px-5 pt-[76px] pb-8 sm:px-8 sm:pt-[80px]">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
            <div className="max-w-xl text-ivory">
              <p className="hero-rise font-display text-[0.72rem] font-semibold tracking-[0.2em] text-ivory/75 uppercase sm:text-xs">
                Vendor readiness for property operations
              </p>

              <h1 className="hero-rise delay-1 mt-3 font-display text-[2.15rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.55rem] lg:leading-[1.05]">
                Know who can work.
                <br className="hidden sm:block" /> Know what’s next.
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
                30-day free trial · Start in the app
              </p>
            </div>

            <div className="hero-rise delay-5 relative mx-auto w-full max-w-xl lg:max-w-none">
              <div
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-[radial-gradient(circle_at_60%_40%,rgba(120,150,106,0.28),transparent_65%)]"
                aria-hidden
              />
              <ReadinessOverviewVisual className="shadow-[0_28px_70px_rgba(0,0,0,0.38)]" />
              <p className="mt-3 text-center text-xs font-medium tracking-[0.12em] text-amber-gold/90 uppercase lg:text-left">
                Scattered documents → one connected readiness view
              </p>
            </div>
          </div>
        </div>

        {/* Prototype A/B switch — compare motion only */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center px-4 sm:bottom-6 sm:justify-start sm:px-8">
          <div
            className="pointer-events-auto flex max-w-full flex-wrap items-center gap-2 rounded-lg border border-ivory/20 bg-evergreen-deep/75 px-2 py-1.5 backdrop-blur-sm"
            role="group"
            aria-label="Hero network motion prototype"
          >
            <span className="hidden px-1.5 text-[10px] font-semibold tracking-[0.14em] text-ivory/55 uppercase sm:inline">
              Motion
            </span>
            {HERO_MOTION_OPTIONS.map((opt) => {
              const active = motionMode === opt.id
              const href = `?${HERO_MOTION_PARAM}=${opt.id}`
              return (
                <a
                  key={opt.id}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault()
                    selectMotion(opt.id)
                  }}
                  className={cn(
                    'rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-colors sm:text-xs',
                    active
                      ? 'bg-amber-gold text-charcoal'
                      : 'bg-ivory/10 text-ivory/85 hover:bg-ivory/18',
                  )}
                  aria-current={active ? 'true' : undefined}
                >
                  {opt.short}
                  <span className="sr-only"> — {opt.label}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
