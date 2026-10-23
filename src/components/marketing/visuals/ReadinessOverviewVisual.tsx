'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

import {
  DEMO_COUNTS,
  DEMO_VENDORS,
  STATUS_LABEL,
  statusChipClass,
} from '@/lib/demo-data'
import { cn } from '@/lib/utils'

import { VisualShell, useVisualMotionActive } from './VisualShell'

const CARDS = [
  {
    key: 'ready',
    n: DEMO_COUNTS.ready,
    label: 'Ready',
    hint: 'Everything required is in place.',
    className: 'bg-[#e6f1eb] text-[#245e49]',
  },
  {
    key: 'needs',
    n: DEMO_COUNTS.needsAction,
    label: 'Needs Action',
    hint: 'Something needs attention.',
    className: 'bg-[#fff3d9] text-[#865f12]',
  },
  {
    key: 'review',
    n: DEMO_COUNTS.inReview,
    label: 'In Review',
    hint: 'Documents being reviewed.',
    className: 'bg-[#eceaf4] text-[#655d84]',
  },
  {
    key: 'expiring',
    n: DEMO_COUNTS.expiringSoon,
    label: 'Expiring Soon',
    hint: 'Requirements approaching expiration.',
    className: 'bg-[#fff3d9] text-[#865f12]',
  },
] as const

const ATTENTION = DEMO_VENDORS.filter((v) => v.status !== 'ready').slice(0, 4)

type Props = {
  className?: string
  compact?: boolean
}

/** Hero: interactive readiness overview — single benefit: know who can work. */
export function ReadinessOverviewVisual({ className, compact }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const active = useVisualMotionActive(rootRef)
  const reduce = useReducedMotion()

  return (
    <VisualShell
      className={className}
      title="Readiness overview"
      tone="dark"
      showCaption={!compact}
    >
      <div ref={rootRef} className={cn('p-4 sm:p-5', compact && 'p-3.5 sm:p-4')}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.key}
              className={cn('rounded-xl px-3 py-3', card.className)}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={
                active || reduce
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0.85, y: 4 }
              }
              transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.06 }}
            >
              <p className="font-display text-2xl font-semibold leading-none tracking-tight">
                {card.n}
              </p>
              <p className="mt-1 text-[11px] font-semibold">{card.label}</p>
              {!compact ? (
                <p className="mt-1 text-[10px] leading-snug opacity-80">{card.hint}</p>
              ) : null}
            </motion.div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-xl border border-stone bg-white p-3 sm:p-4">
            <p className="font-display text-[10px] font-semibold tracking-[0.14em] text-slate uppercase">
              Needs attention
            </p>
            <ul className="mt-3 space-y-2">
              {ATTENTION.map((v, i) => (
                <motion.li
                  key={v.id}
                  className="flex items-center justify-between gap-3 rounded-lg bg-ivory px-3 py-2.5"
                  initial={reduce ? false : { opacity: 0, x: -6 }}
                  animate={
                    active || reduce
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0.9, x: 0 }
                  }
                  transition={{ duration: 0.35, delay: reduce ? 0 : 0.15 + i * 0.05 }}
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
                    {STATUS_LABEL[v.status === 'expiring' ? 'expiring' : v.status]}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-stone bg-white p-3 sm:p-4">
            <p className="font-display text-[10px] font-semibold tracking-[0.14em] text-slate uppercase">
              Upcoming expirations
            </p>
            <ul className="mt-3 space-y-2">
              {DEMO_VENDORS.filter((v) => v.days != null && v.days < 60)
                .slice(0, 3)
                .map((v) => (
                  <li
                    key={v.id}
                    className="rounded-lg bg-ivory px-3 py-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-charcoal">
                        {v.name}
                      </p>
                      <span className="status-chip status-chip-expiring">
                        {v.days}d
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate">{v.nextExpiration}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </VisualShell>
  )
}
