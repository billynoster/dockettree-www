'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  useCallback,
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
    /** Stagger as % of a fixed source-column width — fragmented, not uniform. */
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
    const hx = hb.left + hb.width / 2 - c.left
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
        // Horizontal run, then soft settle into the hub — room for the curve.
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

function HubMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'flex h-11 w-11 items-center justify-center rounded-full bg-evergreen text-ivory shadow-[0_10px_24px_rgba(31,92,74,0.3)] ring-[5px] ring-white',
        className,
      )}
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
        <path
          d="M3.5 8.2 6.4 11l6.1-6.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
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

function DiagramDesktop({ reduce }: { reduce: boolean | null }) {
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
    <div
      ref={containerRef}
      className="relative hidden min-h-[22rem] md:block"
    >
      <div className="grid grid-cols-[minmax(14.5rem,16rem)_minmax(8.5rem,1fr)_minmax(17.5rem,22rem)] items-center gap-0">
        <div className="relative z-[2] flex flex-col gap-3 py-2">
          {SOURCES.map((source, i) => (
            <div key={source.id}>
              <SourceCard
                source={source}
                style={{ marginLeft: source.offsetPx }}
                cardRef={(el) => {
                  sourceRefs.current[i] = el
                }}
              />
            </div>
          ))}
        </div>

        {/* Wide corridor — hub centered in the breathing room */}
        <div className="relative z-[2] flex min-h-[18rem] items-center justify-center px-2">
          <div ref={hubRef}>
            <HubMark />
          </div>
        </div>

        <div className="relative z-[2] justify-self-stretch">
          <ReadinessDestination cardRef={destRef} />
        </div>
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
              id="frag-arrow-v2"
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
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={
                reduce ? undefined : { pathLength: 1, opacity: 0.72 }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.05 }}
              style={reduce ? { opacity: 0.62 } : undefined}
            />
          ))}
          <motion.path
            d={geom.arrow}
            stroke="#1F5C4A"
            strokeWidth="1.75"
            strokeLinecap="round"
            markerEnd="url(#frag-arrow-v2)"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1, opacity: 0.92 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            style={reduce ? { opacity: 0.85 } : undefined}
          />
        </svg>
      ) : null}
    </div>
  )
}

function DiagramMobile({ reduce: _reduce }: { reduce: boolean | null }) {
  return (
    <div className="md:hidden">
      <div className="flex flex-col gap-2.5">
        {SOURCES.map((source) => (
          <div
            key={source.id}
            style={{ marginLeft: Math.min(source.offsetPx, 16) }}
          >
            <SourceCard source={source} />
          </div>
        ))}
      </div>

      <div className="relative my-5 flex flex-col items-center" aria-hidden>
        <div className="h-8 w-px bg-moss/45" />
        <HubMark className="h-10 w-10 ring-4" />
        <div className="flex h-8 flex-col items-center justify-end">
          <div className="h-full w-px bg-evergreen/50" />
          <span className="block h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-evergreen" />
        </div>
      </div>

      <ReadinessDestination />
    </div>
  )
}

export function FragmentationSection() {
  const reduce = useReducedMotion()

  return (
    <section className="scroll-mt-24 border-t border-stone/60 bg-white">
      {/*
        Copy stays left; diagram gets the wider track so the convergence
        corridor can breathe (reference proportions — not a half-width squeeze).
      */}
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
