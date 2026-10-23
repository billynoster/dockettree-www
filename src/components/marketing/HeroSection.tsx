'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { NetworkCanvas } from '@/components/hero/NetworkCanvas'
import { NetworkFallback } from '@/components/hero/NetworkFallback'
import { ProductFrame } from '@/components/marketing/ProductFrame'
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
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0.12)

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
      return
    }

    const update = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = clamp01(-rect.top / Math.max(total, 1))
      setProgress(0.12 + clamp01(scrolled / 0.5) * 0.88)
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
      className="relative h-[132vh] bg-evergreen-deep sm:h-[140vh]"
      aria-label="Hero"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <NetworkFallback progress={progress} />
          {mounted && webglOk && (
            <div className="absolute inset-0 opacity-50 lg:opacity-75">
              <NetworkCanvas
                progress={reducedMotion ? 1 : progress}
                reducedMotion={reducedMotion}
              />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(18,61,49,0.95)_0%,rgba(18,61,49,0.82)_36%,rgba(18,61,49,0.45)_62%,rgba(18,61,49,0.28)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-center px-5 pt-[76px] pb-8 sm:px-8 sm:pt-[80px]">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
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
                30-day free trial
              </p>
            </div>

            <div className="hero-rise delay-5 relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-[radial-gradient(circle_at_60%_40%,rgba(120,150,106,0.28),transparent_65%)]" aria-hidden />
              <ProductFrame
                src="/marketing/dashboard.png"
                alt="Docket Tree readiness dashboard showing who is ready, what needs action, and upcoming expirations"
                priority
                tone="dark"
                aspect="aspect-[16/10]"
                sizes="(min-width: 1024px) 620px, 92vw"
                className="shadow-[0_28px_70px_rgba(0,0,0,0.38)]"
              />
              <p className="mt-3 text-center text-xs font-medium tracking-[0.12em] text-amber-gold/90 uppercase lg:text-left">
                Scattered documents → one connected readiness view
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
