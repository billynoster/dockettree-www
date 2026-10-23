'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

import { DEMO_PROPERTY } from '@/lib/marketing/data'

import { VisualShell, useVisualMotionActive } from './VisualShell'

export function VendorRecordVisual({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const active = useVisualMotionActive(rootRef)
  const reduce = useReducedMotion()

  return (
    <VisualShell className={className} title="Property · linked vendors">
      <div ref={rootRef} className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-base font-semibold text-charcoal">
                {DEMO_PROPERTY.name}
              </h3>
              <span className="status-chip status-chip-ready">Active</span>
            </div>
            <p className="mt-1 text-xs text-slate">{DEMO_PROPERTY.address}</p>
            <p className="mt-1 text-xs text-slate">{DEMO_PROPERTY.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Edit', 'Link vendors'].map((label) => (
              <span
                key={label}
                className="rounded-md border border-stone bg-white px-2.5 py-1 text-[11px] font-semibold text-charcoal"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-stone bg-white">
          <p className="border-b border-stone bg-ivory/80 px-3 py-2 font-display text-[10px] font-semibold tracking-[0.12em] text-slate uppercase">
            Linked vendors · {DEMO_PROPERTY.linked.length}
          </p>
          <ul>
            {DEMO_PROPERTY.linked.map((name, i) => (
              <motion.li
                key={name}
                className="flex items-center justify-between border-b border-stone/70 px-3 py-2.5 last:border-b-0"
                initial={reduce ? false : { opacity: 0, x: -6 }}
                animate={
                  active || reduce
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0.92, x: 0 }
                }
                transition={{ duration: 0.28, delay: reduce ? 0 : i * 0.04 }}
              >
                <span className="text-sm font-medium text-charcoal">{name}</span>
                <span className="text-[10px] font-semibold tracking-wide text-moss uppercase">
                  Connected
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </VisualShell>
  )
}
