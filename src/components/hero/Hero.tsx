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
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useRef, useState, type MutableRefObject } from 'react'

import { Button } from '@/components/ui/button'

const NetworkCanvas = dynamic(
  () =>
    import('@/components/hero/NetworkCanvas').then((m) => m.NetworkCanvas),
  { ssr: false, loading: () => <div className="h-full w-full bg-evergreen-deep" /> },
)

const APP_URL = 'https://app.dockettree.com'
const LOGIN_URL = `${APP_URL}/login`

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const reducedMotion = Boolean(reduce)
  const progressRef = useRef(reducedMotion ? 1 : 0.08)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const rawProgress = useTransform(scrollYProgress, [0, 0.55], [0.08, 1])
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  })
  const beatOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1])

  useMotionValueEvent(smoothProgress, 'change', (v) => {
    if (!reducedMotion) progressRef.current = v
  })

  useEffect(() => {
    progressRef.current = reducedMotion ? 1 : 0.08
  }, [reducedMotion])

  return (
    <section ref={sectionRef} className="relative h-[180vh] bg-evergreen-deep">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <NetworkBridge
            progressRef={progressRef}
            reducedMotion={reducedMotion}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(22,69,54,0.92)_0%,rgba(31,92,74,0.78)_42%,rgba(31,92,74,0.35)_70%,rgba(22,69,54,0.2)_100%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(120,150,106,0.22),transparent_42%),radial-gradient(ellipse_at_80%_85%,rgba(217,164,65,0.12),transparent_40%)]"
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
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, scale: 0.86, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mb-7"
              >
                <Image
                  src="/brand/logo-mark.png"
                  alt="Docket Tree"
                  width={88}
                  height={86}
                  className="h-16 w-16 drop-shadow-[0_8px_24px_rgba(0,0,0,0.28)] sm:h-20 sm:w-20"
                  priority
                />
              </motion.div>

              <motion.p
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                Docket Tree
              </motion.p>

              <motion.h1
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 font-display text-[2.1rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-[2.6rem] lg:text-[3rem]"
              >
                Know who can work. Know what’s next.
              </motion.h1>

              <motion.p
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 max-w-md text-base leading-relaxed text-ivory/88 sm:text-lg"
              >
                Vendor readiness for property ops — everything connected, nothing
                lost.
              </motion.p>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Button asChild size="lg" variant="accent">
                  <a href={APP_URL}>Start Free Trial</a>
                </Button>
                <Button asChild size="lg" variant="inverse">
                  <a href={LOGIN_URL}>Log in</a>
                </Button>
              </motion.div>

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
      className="mt-10 max-w-sm text-sm tracking-wide text-moss uppercase"
    >
      Scattered documents → one connected readiness view
    </motion.p>
  )
}

function NetworkBridge({
  progressRef,
  reducedMotion,
}: {
  progressRef: MutableRefObject<number>
  reducedMotion: boolean
}) {
  const frameProgress = useRafProgress(progressRef, reducedMotion)
  return (
    <NetworkCanvas progress={frameProgress} reducedMotion={reducedMotion} />
  )
}

function useRafProgress(
  progressRef: MutableRefObject<number>,
  reducedMotion: boolean,
) {
  const [value, setValue] = useState(reducedMotion ? 1 : 0.08)

  useEffect(() => {
    if (reducedMotion) {
      setValue(1)
      return
    }
    let id = 0
    const tick = () => {
      setValue(progressRef.current)
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [progressRef, reducedMotion])

  return value
}
