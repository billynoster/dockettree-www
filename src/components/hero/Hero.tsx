'use client'

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { NetworkCanvas } from '@/components/hero/NetworkCanvas'
import { NetworkFallback } from '@/components/hero/NetworkFallback'
import { Button } from '@/components/ui/button'

const APP_URL = 'https://app.dockettree.com'
const LOGIN_URL = `${APP_URL}/login`

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const reducedMotion = Boolean(reduce)
  const progressRef = useRef(reducedMotion ? 1 : 0.12)
  const [mounted, setMounted] = useState(false)
  const [webglOk, setWebglOk] = useState(true)
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0.12)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const rawProgress = useTransform(scrollYProgress, [0, 0.55], [0.12, 1])
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  })
  const beatOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1])

  useMotionValueEvent(smoothProgress, 'change', (v) => {
    if (reducedMotion) return
    progressRef.current = v
    setProgress(v)
  })

  useEffect(() => {
    setMounted(true)
    progressRef.current = reducedMotion ? 1 : 0.12
    setProgress(reducedMotion ? 1 : 0.12)
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setWebglOk(Boolean(gl))
    } catch {
      setWebglOk(false)
    }
  }, [reducedMotion])

  return (
    <section ref={sectionRef} className="relative h-[180vh] bg-evergreen-deep">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <NetworkFallback progress={progress} />
          {mounted && webglOk && !reducedMotion && (
            <div className="absolute inset-0">
              <NetworkCanvas
                progress={progress}
                reducedMotion={reducedMotion}
              />
            </div>
          )}
          {mounted && webglOk && reducedMotion && (
            <div className="absolute inset-0">
              <NetworkCanvas progress={1} reducedMotion />
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(22,69,54,0.88)_0%,rgba(31,92,74,0.72)_42%,rgba(31,92,74,0.28)_70%,rgba(22,69,54,0.15)_100%)]"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col px-5 pt-6 sm:px-8">
          <header className="flex items-center justify-between">
            <a href="/" aria-label="Docket Tree home" className="inline-flex">
              <Image
                src="/brand/logo-horizontal.png"
                alt="Docket Tree"
                width={180}
                height={53}
                className="h-9 w-auto brightness-0 invert sm:h-10"
                priority
              />
            </a>
            <Button asChild variant="inverse" size="sm">
              <a href={LOGIN_URL}>Log in</a>
            </Button>
          </header>

          <div className="flex flex-1 flex-col justify-center pb-16 pt-10">
            <div className="max-w-xl text-ivory">
              <div className="hero-rise mb-7">
                <Image
                  src="/brand/logo-mark.png"
                  alt="Docket Tree"
                  width={88}
                  height={86}
                  className="h-16 w-16 drop-shadow-[0_8px_24px_rgba(0,0,0,0.28)] sm:h-20 sm:w-20"
                  priority
                />
              </div>

              <p className="hero-rise delay-1 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Docket Tree
              </p>

              <h1 className="hero-rise delay-2 mt-5 font-display text-[2.1rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-[2.6rem] lg:text-[3rem]">
                Know who can work. Know what’s next.
              </h1>

              <p className="hero-rise delay-3 mt-5 max-w-md text-base leading-relaxed text-ivory/88 sm:text-lg">
                Vendor readiness for property ops — everything connected, nothing
                lost.
              </p>

              <div className="hero-rise delay-4 mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" variant="accent">
                  <a href={APP_URL}>Start Free Trial</a>
                </Button>
                <Button asChild size="lg" variant="inverse">
                  <a href={LOGIN_URL}>Log in</a>
                </Button>
              </div>

              <ScrollBeat opacity={beatOpacity} reducedMotion={reducedMotion} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScrollBeat({
  opacity,
  reducedMotion,
}: {
  opacity: MotionValue<number>
  reducedMotion: boolean
}) {
  return (
    <motion.p
      style={{ opacity: reducedMotion ? 1 : opacity }}
      className="mt-10 max-w-sm text-sm font-medium tracking-[0.14em] text-amber-gold uppercase"
    >
      Scattered documents → one connected readiness view
    </motion.p>
  )
}
