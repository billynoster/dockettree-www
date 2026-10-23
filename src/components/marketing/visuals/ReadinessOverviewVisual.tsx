'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useRef } from 'react'

import {
  DEMO_NOTICE,
  STATUS_LABEL,
  getDemoCounts,
  getDemoExpirations,
  getDemoVendors,
  statusChipClass,
} from '@/lib/marketing/data'
import { cn } from '@/lib/utils'

import { VisualShell, useVisualMotionActive } from './VisualShell'

type Props = {
  className?: string
  compact?: boolean
}

/** Hero: interactive readiness overview — single benefit: know who can work. */
export function ReadinessOverviewVisual({ className, compact }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const active = useVisualMotionActive(rootRef)
  const reduce = useReducedMotion()
  const vendors = useMemo(() => getDemoVendors(), [])
  const counts = useMemo(() => getDemoCounts(), [])
  const attention = useMemo(
    () => vendors.filter((v) => v.status !== 'ready').slice(0, 4),
    [vendors],
  )
  const expirations = useMemo(() => getDemoExpirations(vendors), [vendors])

  const cards = [
    {
      key: 'ready',
      n: counts.ready,
      label: 'Ready',
      hint: 'Everything required is in place.',
      className: 'bg-[#e6f1eb] text-[#245e49]',
    },
    {
      key: 'needs',
      n: counts.needsAction,
      label: 'Needs Action',
      hint: 'Something needs attention.',
      className: 'bg-[#fff3d9] text-[#865f12]',
    },
    {
      key: 'review',
      n: counts.inReview,
      label: 'In Review',
      hint: 'Documents being reviewed.',
      className: 'bg-[#eceaf4] text-[#655d84]',
    },
    {
      key: 'expiring',
      n: counts.expiringSoon,
      label: 'Expiring Soon',
      hint: 'Requirements approaching expiration.',
      className: 'bg-[#fff3d9] text-[#865f12]',
    },
  ] as const

  return (
    <VisualShell
      className={className}
      title="Readiness overview"
      tone="dark"
      showCaption={!compact}
    >
      <div
        ref={rootRef}
        className={cn('p-3.5 sm:p-5', compact && 'p-3 sm:p-3.5')}
      >
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
          {cards.map((card, i) => (
            <motion.div
              key={card.key}
              className={cn(
                'flex min-h-[4.75rem] flex-col justify-between rounded-xl px-3 py-2.5 sm:min-h-[5.25rem]',
                card.className,
              )}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={
                active || reduce
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0.9, y: 0 }
              }
              transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.05 }}
            >
              <p className="font-display text-2xl font-semibold leading-none tracking-tight sm:text-[1.65rem]">
                {card.n}
              </p>
              <div>
                <p className="text-[11px] font-semibold leading-tight">
                  {card.label}
                </p>
                {!compact ? (
                  <p className="mt-0.5 hidden text-[10px] leading-snug opacity-80 sm:block">
                    {card.hint}
                  </p>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-3.5 grid gap-3 lg:grid-cols-[1.2fr_0.8fr] lg:gap-3.5">
          <div className="rounded-xl border border-stone/80 bg-white p-3 sm:p-3.5">
            <p className="font-display text-[10px] font-semibold tracking-[0.14em] text-slate uppercase">
              Needs attention
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {attention.map((v, i) => (
                <motion.li
                  key={v.id}
                  className="flex items-center justify-between gap-2 rounded-lg bg-ivory px-2.5 py-2"
                  initial={reduce ? false : { opacity: 0, x: -6 }}
                  animate={
                    active || reduce
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0.92, x: 0 }
                  }
                  transition={{
                    duration: 0.3,
                    delay: reduce ? 0 : 0.12 + i * 0.04,
                  }}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-charcoal">
                      {v.name}
                    </p>
                    <p className="truncate text-xs text-slate">
                      {v.blocker ?? v.trade}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'status-chip shrink-0',
                      statusChipClass(v.status),
                    )}
                  >
                    {STATUS_LABEL[v.status]}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-pale-moss/60 p-3 sm:p-3.5">
            <p className="font-display text-[10px] font-semibold tracking-[0.14em] text-slate uppercase">
              Upcoming expirations
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {expirations.map((item) => (
                <li
                  key={item.vendor}
                  className="rounded-lg bg-white/80 px-2.5 py-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-charcoal">
                      {item.vendor}
                    </p>
                    <span className="status-chip status-chip-expiring shrink-0">
                      {item.days}d
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate">
                    {item.document} · {item.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {compact ? (
          <p className="mt-2 text-[10px] font-medium tracking-wide text-slate/70 uppercase">
            {DEMO_NOTICE}
          </p>
        ) : null}
      </div>
    </VisualShell>
  )
}
