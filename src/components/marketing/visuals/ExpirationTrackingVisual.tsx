'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useRef } from 'react'

import {
  getDemoExpirations,
  getDemoVendors,
} from '@/lib/marketing/data'

import { VisualShell, useVisualMotionActive } from './VisualShell'

export function ExpirationTrackingVisual({
  className,
}: {
  className?: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const active = useVisualMotionActive(rootRef)
  const reduce = useReducedMotion()
  const items = useMemo(
    () => getDemoExpirations(getDemoVendors()),
    [],
  )

  return (
    <VisualShell className={className} title="Upcoming expirations">
      <div ref={rootRef} className="p-4 sm:p-5">
        <p className="text-sm text-slate">
          Catch documents approaching expiration before they block work.
        </p>
        <ul className="mt-4 space-y-3">
          {items.map((item, i) => {
            const urgency =
              item.days <= 14 ? 'high' : item.days <= 21 ? 'mid' : 'low'
            const bar =
              urgency === 'high'
                ? 'bg-[#d9a441]'
                : urgency === 'mid'
                  ? 'bg-[#78966a]'
                  : 'bg-stone'
            const width = `${Math.max(14, Math.min(92, 100 - item.days))}%`
            return (
              <motion.li
                key={item.vendor}
                className="rounded-xl border border-stone bg-white p-4"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={
                  active || reduce
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0.9, y: 0 }
                }
                transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.06 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-charcoal">
                      {item.vendor}
                    </p>
                    <p className="mt-0.5 text-xs text-slate">{item.document}</p>
                  </div>
                  <span className="status-chip status-chip-expiring shrink-0">
                    Expiring Soon
                  </span>
                </div>
                <div className="mt-3">
                  <div className="mb-1.5 flex justify-between text-[11px] font-medium text-slate">
                    <span>{item.date}</span>
                    <span className="text-[#865f12]">{item.countdown}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-stone/70">
                    <motion.div
                      className={`h-full rounded-full ${bar}`}
                      initial={reduce ? false : { width: 0 }}
                      animate={
                        active || reduce
                          ? { width }
                          : { width: reduce ? width : 0 }
                      }
                      transition={{
                        duration: 0.65,
                        delay: reduce ? 0 : 0.12 + i * 0.04,
                      }}
                    />
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </VisualShell>
  )
}
