'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useRef } from 'react'

import {
  STATUS_LABEL,
  getDemoVendors,
  statusChipClass,
} from '@/lib/marketing/data'
import { cn } from '@/lib/utils'

import { VisualShell, useVisualMotionActive } from './VisualShell'

export function VendorReadinessVisual({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const active = useVisualMotionActive(rootRef)
  const reduce = useReducedMotion()
  const rows = useMemo(() => getDemoVendors().slice(0, 4), [])

  return (
    <VisualShell className={className} title="Vendor readiness">
      <div ref={rootRef} className="p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-stone bg-white px-2.5 py-1 text-xs text-slate">
            All statuses
          </span>
          <span className="rounded-md border border-stone bg-white px-2.5 py-1 text-xs text-slate">
            All properties
          </span>
        </div>
        <div className="overflow-hidden rounded-xl border border-stone bg-white">
          <div className="grid grid-cols-[1.3fr_0.9fr_1fr] gap-2 border-b border-stone bg-ivory/80 px-3 py-2 text-[10px] font-semibold tracking-[0.08em] text-slate uppercase sm:grid-cols-[1.4fr_0.85fr_1.1fr_0.9fr]">
            <span>Vendor</span>
            <span>Status</span>
            <span className="hidden sm:inline">Property</span>
            <span>Next expiration</span>
          </div>
          <ul>
            {rows.map((v, i) => (
              <motion.li
                key={v.id}
                className="grid grid-cols-[1.3fr_0.9fr_1fr] items-center gap-2 border-b border-stone/70 px-3 py-3 last:border-b-0 sm:grid-cols-[1.4fr_0.85fr_1.1fr_0.9fr]"
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={
                  active || reduce
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0.92, y: 0 }
                }
                transition={{ duration: 0.3, delay: reduce ? 0 : i * 0.05 }}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-charcoal">
                    {v.name}
                  </p>
                  <p className="truncate text-xs text-slate">{v.trade}</p>
                </div>
                <span
                  className={cn('status-chip w-fit', statusChipClass(v.status))}
                >
                  {STATUS_LABEL[v.status]}
                </span>
                <p className="hidden truncate text-xs text-slate sm:block">
                  {v.property}
                </p>
                <p className="text-xs text-slate">
                  {v.nextExpiration ? (
                    <>
                      {v.dateLabel}
                      {v.days != null ? (
                        <span className="mt-0.5 block text-[10px] text-[#865f12]">
                          {v.days}d
                        </span>
                      ) : null}
                    </>
                  ) : (
                    '—'
                  )}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </VisualShell>
  )
}
