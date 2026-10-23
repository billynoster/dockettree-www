'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { fadeUp } from '@/lib/motion'
import { cn } from '@/lib/utils'

const SOURCES = [
  {
    id: 'sheet',
    label: 'Spreadsheet',
    detail: 'Vendor status tabs',
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
    detail: 'Threads & attachments',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <rect x="3" y="6" width="18" height="12" rx="2" fill="#FAF8F3" stroke="#606861" />
        <path d="M4 7l8 6 8-6" stroke="#1F5C4A" strokeWidth="1.2" fill="none" />
      </svg>
    ),
  },
  {
    id: 'pdf',
    label: 'PDF / document',
    detail: 'Certificates & forms',
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
    label: 'Shared drive',
    detail: 'Folders by property',
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
    label: 'Calendar reminder',
    detail: 'Expiration pings',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <rect x="4" y="5" width="16" height="15" rx="2" fill="#FAF8F3" stroke="#606861" />
        <path d="M4 10h16M8 3v4M16 3v4" stroke="#1F5C4A" strokeWidth="1.2" />
        <circle cx="12" cy="15" r="1.5" fill="#D9A441" />
      </svg>
    ),
  },
] as const

export function FragmentationSection() {
  const reduce = useReducedMotion()

  return (
    <section className="border-t border-stone/60 bg-white">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-14">
        <motion.div
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-evergreen uppercase">
            The old way
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Vendor readiness shouldn’t live in five different places.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate sm:text-lg">
            Spreadsheets, shared drives, email threads, and calendar reminders
            make vendor information difficult to track and even harder to act
            on.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting SVG paths */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {SOURCES.map((_, i) => {
              const y = 12 + i * 14
              return (
                <motion.path
                  key={i}
                  d={`M 28 ${y} C 48 ${y}, 55 58, 72 68`}
                  fill="none"
                  stroke="#78966A"
                  strokeWidth="0.35"
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.45 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.75, delay: 0.15 + i * 0.06 }}
                />
              )
            })}
          </svg>

          <div className="relative grid gap-6 sm:grid-cols-[1fr_1.05fr] sm:items-center">
            <ul className="space-y-2.5">
              {SOURCES.map((source, i) => (
                <motion.li
                  key={source.id}
                  initial={
                    reduce
                      ? false
                      : { opacity: 0.4, x: -18 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.65, delay: i * 0.05 }}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border border-stone bg-ivory px-3.5 py-3 shadow-[0_6px_18px_rgba(32,38,35,0.04)]',
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

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.75, delay: 0.28 }}
              className="rounded-2xl border border-evergreen/25 bg-pale-moss p-5 shadow-[0_16px_40px_rgba(31,92,74,0.08)] sm:p-6"
            >
              <p className="font-display text-xs font-semibold tracking-[0.14em] text-evergreen uppercase">
                One Docket Tree workspace
              </p>
              <p className="mt-3 font-display text-lg font-semibold text-charcoal">
                Everything connected. Nothing lost.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Documents, requests, reviews, and expirations stay linked to
                each vendor — ready when work needs to happen.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Ready', 'In Review', 'Expiring Soon'].map((chip) => (
                  <span
                    key={chip}
                    className={cn(
                      'status-chip',
                      chip === 'Ready' && 'status-chip-ready',
                      chip === 'In Review' && 'status-chip-review',
                      chip === 'Expiring Soon' && 'status-chip-expiring',
                    )}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
