'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react'

import { getDemoCounts } from '@/lib/marketing/data'
import { fadeUp } from '@/lib/motion'
import { cn } from '@/lib/utils'

const SOURCES = [
  {
    id: 'sheet',
    label: 'Spreadsheet',
    detail: 'Vendor status tabs',
    offsetPx: 0,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="2" fill="#EDF2EA" stroke="#78966A" />
        <path d="M3 9h18M9 4v16" stroke="#1F5C4A" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    detail: 'Follow-up threads',
    offsetPx: 22,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <rect x="3" y="6" width="18" height="12" rx="2" fill="#FAF8F3" stroke="#606861" />
        <path d="M4 7l8 6 8-6" stroke="#1F5C4A" strokeWidth="1.2" fill="none" />
      </svg>
    ),
  },
  {
    id: 'pdf',
    label: 'PDF / Documents',
    detail: 'Certificates & forms',
    offsetPx: 8,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
          fill="#FFF3D9"
          stroke="#D9A441"
        />
        <path d="M14 3v5h5" stroke="#D9A441" fill="none" />
      </svg>
    ),
  },
  {
    id: 'drive',
    label: 'Shared Drive',
    detail: 'Folders by property',
    offsetPx: 28,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          d="M3 9l3-4h5l2 2h8v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z"
          fill="#E9F0F3"
          stroke="#526B75"
        />
      </svg>
    ),
  },
  {
    id: 'cal',
    label: 'Calendar Reminders',
    detail: 'Expiration pings',
    offsetPx: 12,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <rect x="4" y="5" width="16" height="15" rx="2" fill="#FAF8F3" stroke="#606861" />
        <path d="M4 10h16M8 3v4M16 3v4" stroke="#1F5C4A" strokeWidth="1.2" />
        <circle cx="12" cy="15" r="1.5" fill="#D9A441" />
      </svg>
    ),
  },
] as const

/** Calm enterprise easing — no bounce. */
const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Choreography (ms from sequence start):
 * 0–400 cards · 400–1300 paths · 1300–1700 hub · 1700–2300 arrow+workspace
 */
const T = {
  cardDuration: 0.32,
  cardStagger: 0.07,
  pathDelay: 0.4,
  pathDuration: 0.9,
  hubDelay: 1.3,
  hubDuration: 0.4,
  finaleDelay: 1.7,
  finaleDuration: 0.55,
} as const

type PathGeom = {
  curves: string[]
  arrow: string
  width: number
  height: number
}

function useConvergenceGeometry(
  containerRef: RefObject<HTMLElement | null>,
  sourceRefs: RefObject<(HTMLElement | null)[]>,
  hubRef: RefObject<HTMLElement | null>,
  destRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const [geom, setGeom] = useState<PathGeom | null>(null)

  const measure = useCallback(() => {
    const container = containerRef.current
    const hub = hubRef.current
    const dest = destRef.current
    const sources = sourceRefs.current
    if (!container || !hub || !dest || !sources?.length) return

    const c = container.getBoundingClientRect()
    if (c.width < 8 || c.height < 8) return

    const hb = hub.getBoundingClientRect()
    const db = dest.getBoundingClientRect()
    const hy = hb.top + hb.height / 2 - c.top
    const hubLeft = hb.left - c.left
    const destLeft = db.left - c.left

    const curves = sources
      .map((el) => {
        if (!el) return null
        const r = el.getBoundingClientRect()
        const x1 = r.right - c.left
        const y1 = r.top + r.height / 2 - c.top
        const targetX = hubLeft - 1
        const dx = Math.max(targetX - x1, 24)
        const c1x = x1 + dx * 0.55
        const c1y = y1
        const c2x = targetX - Math.min(36, dx * 0.28)
        const c2y = hy
        return `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${targetX.toFixed(1)} ${hy.toFixed(1)}`
      })
      .filter((d): d is string => Boolean(d))

    const arrowStart = hb.right - c.left + 2
    const arrowEnd = Math.max(arrowStart + 18, destLeft - 6)
    const arrow = `M ${arrowStart.toFixed(1)} ${hy.toFixed(1)} L ${arrowEnd.toFixed(1)} ${hy.toFixed(1)}`

    setGeom({
      curves,
      arrow,
      width: c.width,
      height: c.height,
    })
  }, [containerRef, destRef, hubRef, sourceRefs])

  useLayoutEffect(() => {
    if (!enabled) {
      setGeom(null)
      return
    }
    let raf = 0
    const run = () => {
      measure()
      raf = window.requestAnimationFrame(measure)
    }
    run()
    const container = containerRef.current
    if (!container || typeof ResizeObserver === 'undefined') {
      return () => window.cancelAnimationFrame(raf)
    }
    const ro = new ResizeObserver(() => measure())
    ro.observe(container)
    window.addEventListener('resize', measure)
    return () => {
      window.cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [containerRef, enabled, measure])

  return geom
}

/**
 * One-time entrance when the diagram enters view.
 * Content stays readable before/during the sequence (relationships reveal;
 * nothing waits on animation to become usable).
 */
function useDiagramEntrance(reduce: boolean | null) {
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { once: true, amount: 0.32 })
  const [go, setGo] = useState(false)

  useEffect(() => {
    if (reduce) setGo(true)
  }, [reduce])

  useEffect(() => {
    if (inView) setGo(true)
  }, [inView])

  return { rootRef, go, reduce: Boolean(reduce) }
}

function ReadinessDestination({
  className,
  cardRef,
}: {
  className?: string
  cardRef?: RefObject<HTMLDivElement | null>
}) {
  const counts = getDemoCounts()
  const rows = [
    {
      id: 'ready',
      label: 'Ready',
      n: counts.ready,
      dot: 'bg-[#2f7d5c]',
      value: 'text-[#245e49]',
    },
    {
      id: 'needs',
      label: 'Needs Action',
      n: counts.needsAction,
      dot: 'bg-[#c9842f]',
      value: 'text-[#865f12]',
    },
    {
      id: 'review',
      label: 'In Review',
      n: counts.inReview,
      dot: 'bg-[#7a6bb5]',
      value: 'text-[#655d84]',
    },
  ] as const

  return (
    <div
      ref={cardRef}
      className={cn(
        'overflow-hidden rounded-2xl border border-evergreen/25 bg-white shadow-[0_22px_52px_rgba(31,92,74,0.14)]',
        className,
      )}
    >
      <div className="border-b border-evergreen/10 bg-pale-moss px-5 py-5 sm:px-6 sm:py-6">
        <p className="font-display text-[0.68rem] font-semibold tracking-[0.16em] text-evergreen uppercase">
          Docket Tree
        </p>
        <p className="mt-1.5 font-display text-xl font-semibold tracking-tight text-charcoal sm:text-[1.35rem]">
          One connected workspace
        </p>
      </div>
      <ul className="space-y-2 px-4 py-4 sm:space-y-2.5 sm:px-5 sm:py-5">
        {rows.map((row) => (
          <li
            key={row.id}
            className="flex items-center justify-between gap-3 rounded-xl bg-ivory/90 px-3.5 py-3 sm:px-4 sm:py-3.5"
          >
            <span className="flex items-center gap-2.5 text-sm font-medium text-charcoal sm:text-[0.95rem]">
              <span
                className={cn('h-2.5 w-2.5 shrink-0 rounded-full', row.dot)}
                aria-hidden
              />
              {row.label}
            </span>
            <span
              className={cn(
                'font-display text-2xl font-semibold tabular-nums leading-none sm:text-[1.75rem]',
                row.value,
              )}
            >
              {row.n}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function HubMark({
  className,
  go,
  reduce,
}: {
  className?: string
  go: boolean
  reduce: boolean
}) {
  return (
    <motion.span
      className={cn(
        'flex h-11 w-11 items-center justify-center rounded-full bg-evergreen text-ivory shadow-[0_10px_24px_rgba(31,92,74,0.3)] ring-[5px] ring-white',
        className,
      )}
      initial={false}
      animate={
        reduce || go
          ? { opacity: 1, scale: 1 }
          : { opacity: 0.42, scale: 0.94 }
      }
      transition={
        reduce
          ? { duration: 0 }
          : { duration: T.hubDuration, delay: T.hubDelay, ease: EASE }
      }
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
        <motion.path
          d="M3.5 8.2 6.4 11l6.1-6.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={
            reduce || go
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0.35 }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  pathLength: {
                    duration: T.hubDuration * 0.85,
                    delay: T.hubDelay + 0.06,
                    ease: EASE,
                  },
                  opacity: {
                    duration: 0.2,
                    delay: T.hubDelay,
                  },
                }
          }
        />
      </svg>
    </motion.span>
  )
}

function SourceCard({
  source,
  className,
  style,
  cardRef,
}: {
  source: (typeof SOURCES)[number]
  className?: string
  style?: React.CSSProperties
  cardRef?: (el: HTMLDivElement | null) => void
}) {
  return (
    <div
      ref={cardRef}
      style={style}
      className={cn(
        'flex w-full max-w-[15.75rem] items-center gap-3 rounded-xl border border-stone bg-ivory px-3.5 py-2.5 shadow-[0_6px_18px_rgba(32,38,35,0.04)]',
        className,
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-stone bg-white">
        {source.icon}
      </span>
      <span>
        <span className="block text-sm font-semibold text-charcoal">
          {source.label}
        </span>
        <span className="block text-xs text-slate">{source.detail}</span>
      </span>
    </div>
  )
}

function DiagramDesktop({ reduce }: { reduce: boolean }) {
  const { rootRef, go } = useDiagramEntrance(reduce)
  const containerRef = useRef<HTMLDivElement>(null)
  const hubRef = useRef<HTMLDivElement>(null)
  const destRef = useRef<HTMLDivElement>(null)
  const sourceRefs = useRef<(HTMLElement | null)[]>([])
  const geom = useConvergenceGeometry(
    containerRef,
    sourceRefs,
    hubRef,
    destRef,
    true,
  )

  return (
    <div ref={rootRef} className="relative hidden min-h-[22rem] md:block">
      <div
        ref={containerRef}
        className="relative min-h-[22rem]"
      >
        <div className="grid grid-cols-[minmax(14.5rem,16rem)_minmax(8.5rem,1fr)_minmax(17.5rem,22rem)] items-center gap-0">
          <div className="relative z-[2] flex flex-col gap-3 py-2">
            {SOURCES.map((source, i) => (
              <motion.div
                key={source.id}
                initial={false}
                animate={
                  reduce || go
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0.62, y: 8 }
                }
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        duration: T.cardDuration,
                        delay: i * T.cardStagger,
                        ease: EASE,
                      }
                }
              >
                <SourceCard
                  source={source}
                  style={{ marginLeft: source.offsetPx }}
                  cardRef={(el) => {
                    sourceRefs.current[i] = el
                  }}
                />
              </motion.div>
            ))}
          </div>

          <div className="relative z-[2] flex min-h-[18rem] items-center justify-center px-2">
            <div ref={hubRef}>
              <HubMark go={go} reduce={reduce} />
            </div>
          </div>

          <motion.div
            className="relative z-[2] justify-self-stretch"
            initial={false}
            animate={
              reduce || go
                ? { opacity: 1, y: 0 }
                : { opacity: 0.58, y: 10 }
            }
            transition={
              reduce
                ? { duration: 0 }
                : {
                    duration: T.finaleDuration,
                    delay: T.finaleDelay,
                    ease: EASE,
                  }
            }
          >
            <ReadinessDestination cardRef={destRef} />
          </motion.div>
        </div>

        {geom ? (
          <svg
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible"
            viewBox={`0 0 ${geom.width} ${geom.height}`}
            fill="none"
            aria-hidden
          >
            <defs>
              <marker
                id="frag-arrow-motion"
                markerWidth="7"
                markerHeight="7"
                refX="6"
                refY="3.5"
                orient="auto"
              >
                <path d="M0 0 L7 3.5 L0 7 Z" fill="#1F5C4A" />
              </marker>
            </defs>
            {geom.curves.map((d, i) => (
              <motion.path
                key={SOURCES[i].id}
                d={d}
                stroke="#78966A"
                strokeWidth="1.35"
                strokeLinecap="round"
                initial={false}
                animate={
                  reduce || go
                    ? { pathLength: 1, opacity: 0.72 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        pathLength: {
                          duration: T.pathDuration,
                          delay: T.pathDelay + i * 0.03,
                          ease: EASE,
                        },
                        opacity: {
                          duration: 0.2,
                          delay: T.pathDelay + i * 0.03,
                        },
                      }
                }
              />
            ))}
            <motion.path
              d={geom.arrow}
              stroke="#1F5C4A"
              strokeWidth="1.75"
              strokeLinecap="round"
              markerEnd="url(#frag-arrow-motion)"
              initial={false}
              animate={
                reduce || go
                  ? { pathLength: 1, opacity: 0.92 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      duration: T.finaleDuration * 0.85,
                      delay: T.finaleDelay,
                      ease: EASE,
                    }
              }
            />
          </svg>
        ) : null}
      </div>
    </div>
  )
}

function DiagramMobile({ reduce }: { reduce: boolean }) {
  const { rootRef, go } = useDiagramEntrance(reduce)

  return (
    <div ref={rootRef} className="md:hidden">
      <div className="flex flex-col gap-2.5">
        {SOURCES.map((source, i) => (
          <motion.div
            key={source.id}
            style={{ marginLeft: Math.min(source.offsetPx, 16) }}
            initial={false}
            animate={
              reduce || go
                ? { opacity: 1, y: 0 }
                : { opacity: 0.62, y: 8 }
            }
            transition={
              reduce
                ? { duration: 0 }
                : {
                    duration: T.cardDuration,
                    delay: i * T.cardStagger,
                    ease: EASE,
                  }
            }
          >
            <SourceCard source={source} />
          </motion.div>
        ))}
      </div>

      <div className="relative my-5 flex flex-col items-center" aria-hidden>
        <svg width="4" height="32" className="overflow-visible" aria-hidden>
          <motion.path
            d="M2 0 V32"
            stroke="#78966A"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={false}
            animate={
              reduce || go
                ? { pathLength: 1, opacity: 0.7 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={
              reduce
                ? { duration: 0 }
                : {
                    duration: T.pathDuration * 0.55,
                    delay: T.pathDelay,
                    ease: EASE,
                  }
            }
          />
        </svg>

        <HubMark go={go} reduce={reduce} className="h-10 w-10 ring-4" />

        <div className="flex h-8 flex-col items-center justify-end">
          <svg width="4" height="24" className="overflow-visible" aria-hidden>
            <motion.path
              d="M2 0 V18"
              stroke="#1F5C4A"
              strokeWidth="1.75"
              strokeLinecap="round"
              initial={false}
              animate={
                reduce || go
                  ? { pathLength: 1, opacity: 0.9 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      duration: T.finaleDuration * 0.7,
                      delay: T.finaleDelay,
                      ease: EASE,
                    }
              }
            />
          </svg>
          <motion.span
            className="block h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-evergreen"
            initial={false}
            animate={reduce || go ? { opacity: 1 } : { opacity: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.25, delay: T.finaleDelay + 0.25, ease: EASE }
            }
          />
        </div>
      </div>

      <motion.div
        initial={false}
        animate={
          reduce || go ? { opacity: 1, y: 0 } : { opacity: 0.58, y: 10 }
        }
        transition={
          reduce
            ? { duration: 0 }
            : {
                duration: T.finaleDuration,
                delay: T.finaleDelay,
                ease: EASE,
              }
        }
      >
        <ReadinessDestination />
      </motion.div>
    </div>
  )
}

export function FragmentationSection() {
  const reduceMotion = useReducedMotion()
  const reduce = Boolean(reduceMotion)

  return (
    <section className="scroll-mt-24 border-t border-stone/60 bg-white">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] xl:gap-16">
        <motion.div
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-evergreen uppercase">
            From fragmented to focused
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Five places to check. One place to know.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate sm:text-lg">
            Spreadsheets, email threads, PDFs, shared drives, and calendar
            reminders scatter the same vendor facts. Docket Tree brings them
            into one readiness view you can act on.
          </p>
        </motion.div>

        <div aria-label="Fragmented sources converging into Docket Tree">
          <DiagramDesktop reduce={reduce} />
          <DiagramMobile reduce={reduce} />
        </div>
      </div>
    </section>
  )
}
