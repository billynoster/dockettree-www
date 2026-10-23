'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useRef } from 'react'

import { getDemoDocuments, statusChipClass } from '@/lib/marketing/data'
import { cn } from '@/lib/utils'

import { VisualShell, useVisualMotionActive } from './VisualShell'

export function DocumentRequestVisual({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const active = useVisualMotionActive(rootRef)
  const reduce = useReducedMotion()
  const docs = useMemo(() => getDemoDocuments(), [])
  const missing = docs.filter((d) => d.state === 'missing').length
  const accepted = docs.filter((d) => d.state === 'accepted').length

  return (
    <VisualShell className={className} title="Required documents">
      <div ref={rootRef} className="p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-display text-sm font-semibold text-charcoal">
              Ironwood Pest Control
            </p>
            <p className="text-xs text-slate">
              {accepted} of {docs.length} required accepted and current
            </p>
          </div>
          <span className="status-chip status-chip-needs">Needs Action</span>
        </div>

        <div className="mb-4 overflow-hidden rounded-full bg-stone/60" aria-hidden>
          <motion.div
            className="h-1.5 rounded-full bg-evergreen"
            initial={reduce ? false : { width: 0 }}
            animate={
              active || reduce
                ? { width: `${(accepted / docs.length) * 100}%` }
                : {
                    width: reduce
                      ? `${(accepted / docs.length) * 100}%`
                      : 0,
                  }
            }
            transition={{ duration: 0.6 }}
          />
        </div>

        {missing > 0 ? (
          <div className="mb-4 rounded-xl border border-[#d9a441]/40 bg-[#fff3d9]/60 px-3 py-2.5 text-xs font-medium text-[#865f12]">
            What is still needed · Safety acknowledgment missing
          </div>
        ) : null}

        <ul className="space-y-3">
          {docs.map((doc, i) => (
            <motion.li
              key={doc.id}
              className={cn(
                'rounded-xl border bg-white p-3.5',
                doc.state === 'missing'
                  ? 'border-[#9b4339]/35'
                  : 'border-stone',
              )}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={
                active || reduce
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0.92, y: 0 }
              }
              transition={{ duration: 0.3, delay: reduce ? 0 : i * 0.05 }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-charcoal">
                  {doc.title}
                </p>
                {doc.state === 'missing' ? (
                  <span className="rounded-md bg-evergreen px-2.5 py-1 text-[11px] font-semibold text-ivory">
                    Submit document
                  </span>
                ) : (
                  <span
                    className={cn('status-chip', statusChipClass('accepted'))}
                  >
                    Accepted
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-slate">{doc.note}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </VisualShell>
  )
}
