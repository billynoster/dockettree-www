'use client'

import { useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { NetworkCanvas } from '@/components/hero/NetworkCanvas'
import { NetworkFallback } from '@/components/hero/NetworkFallback'
import { Button } from '@/components/ui/button'
import { SIGNUP_URL } from '@/lib/site'

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const reducedMotion = Boolean(reduce)
  const [mounted, setMounted] = useState(false)
  const [webglOk, setWebglOk] = useState(true)
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0.08)
  const [overlayOpacity, setOverlayOpacity] = useState(reducedMotion ? 1 : 0)

  useEffect(() => {
    setMounted(true)
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setWebglOk(Boolean(gl))
    } catch {
      setWebglOk(false)
    }
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1)
      setOverlayOpacity(1)
      return
    }

    const update = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = clamp01(-rect.top / Math.max(total, 1))
      const network = 0.08 + clamp01(scrolled / 0.55) * 0.92
      const overlay = clamp01((scrolled - 0.22) / 0.35)
      setProgress(network)
      setOverlayOpacity(overlay)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      className="relative h-[165vh] bg-evergreen-deep sm:h-[175vh]"
      aria-label="Hero"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <NetworkFallback progress={progress} />
          {mounted && webglOk && (
            <div className="absolute inset-0 max-lg:opacity-55 lg:opacity-100">
              <NetworkCanvas
                progress={reducedMotion ? 1 : progress}
                reducedMotion={reducedMotion}
              />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(18,61,49,0.94)_0%,rgba(18,61,49,0.78)_38%,rgba(31,92,74,0.35)_68%,rgba(18,61,49,0.2)_100%)] lg:bg-[linear-gradient(105deg,rgba(18,61,49,0.92)_0%,rgba(18,61,49,0.72)_40%,rgba(31,92,74,0.28)_72%,rgba(18,61,49,0.12)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col px-5 pb-10 pt-[88px] sm:px-8 sm:pt-[96px]">
          <div className="grid flex-1 items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10 xl:gap-14">
            <div className="max-w-xl text-ivory">
              <p className="hero-rise font-display text-[0.7rem] font-semibold tracking-[0.2em] text-moss uppercase sm:text-xs">
                Vendor readiness for property operations
              </p>

              <h1 className="hero-rise delay-1 mt-4 font-display text-[2.15rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.9rem] lg:leading-[1.05]">
                Know who can work.
                <br className="hidden sm:block" /> Know what’s next.
              </h1>

              <p className="hero-rise delay-2 mt-5 max-w-md text-base leading-relaxed text-ivory/88 sm:text-lg">
                Docket Tree brings vendor documents, requests, reviews, and
                expiration dates into one connected workspace — so your team
                always knows what needs attention.
              </p>

              <div className="hero-rise delay-3 mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" variant="accent">
                  <a href={SIGNUP_URL}>Start Free Trial</a>
                </Button>
                <Button asChild size="lg" variant="inverse">
                  <a href="#product">Explore the Product</a>
                </Button>
              </div>

              <p className="hero-rise delay-4 mt-4 text-sm text-ivory/70">
                30-day free trial
              </p>
            </div>

            <div
              className="hero-rise delay-5 pointer-events-none relative mx-auto hidden w-full max-w-xl lg:block xl:max-w-none"
              style={{ opacity: 0.35 + overlayOpacity * 0.65 }}
              aria-hidden={overlayOpacity < 0.15}
            >
              <HeroProductOverlay />
            </div>
          </div>

          <p
            style={{ opacity: overlayOpacity }}
            className="mt-auto max-w-sm pb-2 text-sm font-medium tracking-[0.14em] text-amber-gold uppercase transition-opacity duration-300 lg:hidden"
          >
            Scattered documents → one connected readiness view
          </p>
        </div>
      </div>
    </section>
  )
}

function HeroProductOverlay() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2 border-b border-stone/80 bg-ivory px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-stone" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone" />
          <span className="ml-3 truncate font-sans text-xs text-slate">
            app.dockettree.com — Readiness overview
          </span>
        </div>
        <div className="relative aspect-[16/10] bg-ivory">
          <Image
            src="/marketing/product-overview.png"
            alt=""
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 560px, 90vw"
            priority
          />
        </div>
      </div>
      <div className="absolute -bottom-3 left-6 rounded-full border border-stone/70 bg-white px-3 py-1.5 text-xs font-semibold text-evergreen shadow-sm">
        See readiness instantly
      </div>
    </div>
  )
}
