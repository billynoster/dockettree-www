'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  useCallback,
  useId,
  useState,
  type KeyboardEvent,
} from 'react'

import { WorkflowStateVisual } from '@/components/marketing/visuals'
import { Button } from '@/components/ui/button'
import { DEMO_WORKFLOW } from '@/lib/marketing/data'
import { cn } from '@/lib/utils'

const STAGES = DEMO_WORKFLOW

function StageDot({
  index,
  selected,
  complete,
}: {
  index: number
  selected: boolean
  complete: boolean
}) {
  if (selected) {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-evergreen text-xs font-semibold text-ivory shadow-[0_0_0_4px_rgba(31,92,74,0.12)]">
        {index + 1}
      </span>
    )
  }
  if (complete) {
    return (
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full bg-pale-moss text-evergreen"
        aria-hidden
      >
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6.2 4.8 8.5 9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    )
  }
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-stone bg-white text-xs font-semibold text-slate group-hover:border-moss">
      {index + 1}
    </span>
  )
}

export function WorkflowSection() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const stage = STAGES[active]
  const tablistId = useId()
  const isLast = active === STAGES.length - 1

  const goTo = useCallback((i: number) => {
    setActive(Math.max(0, Math.min(STAGES.length - 1, i)))
  }, [])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        goTo(active + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goTo(active - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(STAGES.length - 1)
      }
    },
    [active, goTo],
  )

  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-t border-stone/60 bg-white"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-evergreen uppercase">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            From request to ready.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
            Explore how a vendor moves from missing information to ready for
            work.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-stone bg-ivory/40 p-4 sm:mt-12 sm:p-6 lg:p-8">
          {/* Desktop stepper */}
          <div className="hidden lg:block">
            <div
              role="tablist"
              aria-label="Vendor readiness stages"
              id={tablistId}
              className="relative flex justify-between gap-2"
              onKeyDown={onKeyDown}
            >
              <div
                className="absolute top-[15px] right-[6%] left-[6%] h-px bg-stone"
                aria-hidden
              />
              <motion.div
                className="absolute top-[15px] left-[6%] h-px origin-left bg-evergreen"
                animate={{
                  width: `${(active / (STAGES.length - 1)) * 88}%`,
                }}
                transition={{ duration: reduce ? 0 : 0.35, ease: 'easeOut' }}
                aria-hidden
              />
              {STAGES.map((s, i) => {
                const selected = i === active
                const complete = i < active
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    id={`${tablistId}-${s.id}`}
                    aria-selected={selected}
                    aria-controls={`${tablistId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => goTo(i)}
                    className="group relative z-10 flex-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                  >
                    <span className="mx-auto flex max-w-[10rem] flex-col items-center gap-3">
                      <StageDot
                        index={i}
                        selected={selected}
                        complete={complete}
                      />
                      <span
                        className={cn(
                          'text-sm font-medium',
                          selected
                            ? 'font-semibold text-evergreen'
                            : complete
                              ? 'text-evergreen/80'
                              : 'text-slate',
                        )}
                      >
                        {s.label}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mobile compact selector */}
          <div className="lg:hidden">
            <label className="sr-only" htmlFor={`${tablistId}-mobile`}>
              Select workflow stage
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {STAGES.map((s, i) => {
                const selected = i === active
                const complete = i < active
                return (
                  <button
                    key={s.id}
                    type="button"
                    id={selected ? `${tablistId}-mobile` : undefined}
                    aria-current={selected ? 'step' : undefined}
                    onClick={() => goTo(i)}
                    className={cn(
                      'flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen',
                      selected
                        ? 'border-evergreen bg-pale-moss font-semibold text-evergreen'
                        : complete
                          ? 'border-evergreen/25 bg-white text-evergreen'
                          : 'border-stone bg-white text-slate',
                    )}
                  >
                    <StageDot
                      index={i}
                      selected={selected}
                      complete={complete}
                    />
                    <span className="pr-1 whitespace-nowrap">{s.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div
            role="tabpanel"
            id={`${tablistId}-panel`}
            aria-labelledby={`${tablistId}-${stage.id}`}
            aria-live="polite"
            className="mt-8 rounded-2xl border border-stone bg-white p-5 sm:p-6 lg:p-8"
          >
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.id + '-copy'}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: reduce ? 0 : 0.25 }}
                >
                  <p className="text-[10px] font-semibold tracking-[0.14em] text-slate uppercase lg:hidden">
                    Stage {active + 1} of {STAGES.length}
                  </p>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                    {stage.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate">
                    {stage.body}
                  </p>
                  <p className="mt-4 border-l-2 border-evergreen/30 pl-3 text-sm leading-relaxed text-charcoal">
                    {stage.outcome}
                  </p>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.id + '-ui'}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: reduce ? 0 : 0.28 }}
                >
                  <WorkflowStateVisual stage={stage.id} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-stone/70 pt-5">
              <p className="text-sm text-slate" aria-hidden="true">
                {active + 1} of {STAGES.length} stages
              </p>
              <div className="flex flex-wrap gap-2">
                {isLast ? (
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    className="rounded-full"
                    onClick={() => goTo(0)}
                  >
                    Restart journey
                    <span aria-hidden>→</span>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    className="rounded-full"
                    onClick={() => goTo(active + 1)}
                  >
                    Next stage
                    <span aria-hidden>→</span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-slate/80">
            Interactive concept using fictional demo data. Reflects Docket Tree’s
            real request → review → ready workflow — not a live backend action.
          </p>
        </div>
      </div>
    </section>
  )
}
