'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { getDemoCounts } from '@/lib/marketing/data'
import { fadeUp } from '@/lib/motion'
import { cn } from '@/lib/utils'

const SOURCES = [
  {
    id: 'sheet',
    label: 'Spreadsheet',
    detail: 'Vendor status tabs',
    offset: 'sm:ml-0',
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
    offset: 'sm:ml-5',
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
    offset: 'sm:ml-1.5',
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
    offset: 'sm:ml-6',
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
    offset: 'sm:ml-2.5',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <rect x="4" y="5" width="16" height="15" rx="2" fill="#FAF8F3" stroke="#606861" />
        <path d="M4 10h16M8 3v4M16 3v4" stroke="#1F5C4A" strokeWidth="1.2" />
        <circle cx="12" cy="15" r="1.5" fill="#D9A441" />
      </svg>
    ),
  },
] as const

/** Path start Y in the overlay viewBox (0–100), tuned to staggered source rows. */
const PATH_START_Y = [11, 30, 49, 68, 87] as const

function ReadinessDestination({ className }: { className?: string }) {
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
      className={cn(
        'overflow-hidden rounded-2xl border border-evergreen/25 bg-white shadow-[0_20px_48px_rgba(31,92,74,0.12)]',
        className,
      )}
    >
      <div className="border-b border-evergreen/10 bg-pale-moss px-5 py-4 sm:px-6 sm:py-5">
        <p className="font-display text-[0.68rem] font-semibold tracking-[0.16em] text-evergreen uppercase">
          Docket Tree
        </p>
        <p className="mt-1 font-display text-lg font-semibold tracking-tight text-charcoal sm:text-xl">
          One connected workspace
        </p>
      </div>
      <ul className="divide-y divide-stone/80 px-2 py-1 sm:px-3">
        {rows.map((row) => (
          <li
            key={row.id}
            className="flex items-center justify-between gap-3 px-3 py-3.5 sm:py-4"
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
                'font-display text-xl font-semibold tabular-nums sm:text-2xl',
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

export function FragmentationSection() {
  const reduce = useReducedMotion()

  return (
    <section className="scroll-mt-24 border-t border-stone/60 bg-white">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-14">
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

        <div className="relative" aria-label="Fragmented sources converging into Docket Tree">
          {/* Connecting paths — desktop/tablet composition */}
          <svg
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {PATH_START_Y.map((y, i) => (
              <motion.path
                key={SOURCES[i].id}
                d={`M 36 ${y} C 39 ${y}, 40.5 50, 41.5 50`}
                fill="none"
                stroke="#78966A"
                strokeWidth="0.45"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                whileInView={
                  reduce
                    ? undefined
                    : { pathLength: 1, opacity: 0.65 }
                }
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, delay: 0.12 + i * 0.05 }}
                style={reduce ? { opacity: 0.55 } : undefined}
              />
            ))}
            <motion.path
              d="M 44 50 L 50 50"
              fill="none"
              stroke="#1F5C4A"
              strokeWidth="0.6"
              strokeLinecap="round"
              markerEnd="url(#frag-arrow)"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1, opacity: 0.9 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: 0.45 }}
              style={reduce ? { opacity: 0.8 } : undefined}
            />
            <defs>
              <marker
                id="frag-arrow"
                markerWidth="4"
                markerHeight="4"
                refX="3"
                refY="2"
                orient="auto"
              >
                <path d="M0 0 L4 2 L0 4 Z" fill="#1F5C4A" />
              </marker>
            </defs>
          </svg>

          {/* Convergence hub — sits in the column gap, not over the destination */}
          <motion.div
            className="pointer-events-none absolute top-1/2 left-[42%] z-[1] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-evergreen text-ivory shadow-[0_8px_20px_rgba(31,92,74,0.28)] ring-4 ring-white md:flex"
            aria-hidden
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
              <path
                d="M3.5 8.2 6.4 11l6.1-6.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <div className="relative z-[2] grid gap-6 md:grid-cols-[minmax(0,0.88fr)_minmax(0,1.22fr)] md:items-center md:gap-12 lg:gap-10">
            <ul className="space-y-2.5">
              {SOURCES.map((source, i) => (
                <motion.li
                  key={source.id}
                  initial={reduce ? false : { opacity: 0, x: -14 }}
                  whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.045 }}
                  className={cn(
                    'flex max-w-[16.5rem] items-center gap-3 rounded-xl border border-stone bg-ivory px-3.5 py-2.5 shadow-[0_6px_18px_rgba(32,38,35,0.04)]',
                    source.offset,
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
                </motion.li>
              ))}
            </ul>

            {/* Mobile-only connector cue */}
            <div
              className="flex items-center gap-3 px-1 md:hidden"
              aria-hidden
            >
              <div className="h-px flex-1 bg-moss/40" />
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-evergreen text-ivory">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                  <path
                    d="M3.5 8.2 6.4 11l6.1-6.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="h-px flex-1 bg-moss/40" />
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: reduce ? 0 : 0.28 }}
            >
              <ReadinessDestination />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
