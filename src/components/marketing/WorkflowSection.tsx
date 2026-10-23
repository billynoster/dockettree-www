'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

import { cn } from '@/lib/utils'

const STAGES = [
  {
    id: 'identify',
    label: 'Identify gap',
    title: 'Identify missing requirement',
    body: 'Spot which documents or requirements are still open for a vendor before work is scheduled.',
  },
  {
    id: 'request',
    label: 'Request',
    title: 'Request document',
    body: 'A document update has been requested from the vendor — ownership stays visible to your team.',
  },
  {
    id: 'waiting',
    label: 'Waiting',
    title: 'Waiting on Vendor',
    body: 'The request remains visible with clear ownership while the vendor responds.',
  },
  {
    id: 'review',
    label: 'In Review',
    title: 'In Review',
    body: 'The newly submitted document is ready for review against your requirements.',
  },
  {
    id: 'ready',
    label: 'Ready',
    title: 'Ready',
    body: 'Required items have been reviewed and the vendor is ready for the relevant work, subject to your organization’s rules.',
  },
] as const

export function WorkflowSection() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const stage = STAGES[active]

  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-t border-stone/60 bg-white"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-evergreen uppercase">
            How it works
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            From request to ready.
          </h2>
        </div>

        {/* Desktop path */}
        <div className="mt-14 hidden lg:block">
          <ol className="relative flex justify-between gap-2">
            <div
              className="absolute top-[15px] right-[10%] left-[10%] h-px bg-stone"
              aria-hidden
            />
            <div
              className="absolute top-[15px] left-[10%] h-px bg-amber-gold transition-[width] duration-300 ease-out"
              style={{
                width: `${(active / (STAGES.length - 1)) * 80}%`,
              }}
              aria-hidden
            />
            {STAGES.map((s, i) => {
              const selected = i === active
              return (
                <li key={s.id} className="relative z-10 flex-1 text-center">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group mx-auto flex w-full max-w-[9rem] flex-col items-center gap-3"
                    aria-current={selected ? 'step' : undefined}
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors',
                        selected
                          ? 'border-amber-gold bg-amber-gold text-charcoal'
                          : 'border-stone bg-white text-slate group-hover:border-moss',
                      )}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={cn(
                        'text-sm font-medium',
                        selected ? 'text-evergreen' : 'text-slate',
                      )}
                    >
                      {s.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="mt-10 rounded-2xl border border-stone bg-ivory p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-display text-xl font-semibold">
                  {stage.title}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate">
                  {stage.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile vertical stepper */}
        <ol className="mt-10 space-y-3 lg:hidden">
          {STAGES.map((s, i) => {
            const selected = i === active
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    'w-full rounded-xl border px-4 py-4 text-left transition-colors',
                    selected
                      ? 'border-evergreen/30 bg-pale-moss'
                      : 'border-stone bg-ivory',
                  )}
                  aria-expanded={selected}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                        selected
                          ? 'bg-amber-gold text-charcoal'
                          : 'bg-white text-slate',
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="font-display text-sm font-semibold">
                      {s.title}
                    </span>
                  </div>
                  {selected && (
                    <p className="mt-3 pl-10 text-sm leading-relaxed text-slate">
                      {s.body}
                    </p>
                  )}
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
