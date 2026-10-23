'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

export type WorkflowStageId =
  | 'identify'
  | 'request'
  | 'waiting'
  | 'review'
  | 'ready'

const CONTENT: Record<
  WorkflowStageId,
  {
    title: string
    chip: string
    chipClass: string
    detail: string
    rows: string[]
  }
> = {
  identify: {
    title: 'Missing requirement',
    chip: 'Needs Action',
    chipClass: 'status-chip-needs',
    detail: 'Safety acknowledgment missing for Ironwood Pest Control.',
    rows: ['Insurance certificate · Accepted', 'Service agreement · Accepted'],
  },
  request: {
    title: 'Request sent',
    chip: 'Requested',
    chipClass: 'status-chip-waiting',
    detail: 'Document update requested from the vendor. Ownership stays visible.',
    rows: ['Requested by Sep 3, 2026', 'Assigned · Vendor portal'],
  },
  waiting: {
    title: 'Waiting on Vendor',
    chip: 'Waiting',
    chipClass: 'status-chip-waiting',
    detail: 'Request remains open until the vendor submits a document.',
    rows: ['No submission yet', 'Reminder available'],
  },
  review: {
    title: 'In Review',
    chip: 'In Review',
    chipClass: 'status-chip-review',
    detail: 'New submission ready for review against your requirements.',
    rows: ['Insurance certificate v2 submitted', 'Reviewer · Operations'],
  },
  ready: {
    title: 'Ready for work',
    chip: 'Ready',
    chipClass: 'status-chip-ready',
    detail: 'Required items reviewed. Vendor is ready subject to your rules.',
    rows: ['All required current', 'Next expiration · 210 days'],
  },
}

/** Contextual product-state preview for the workflow stepper. */
export function WorkflowStateVisual({ stage }: { stage: WorkflowStageId }) {
  const reduce = useReducedMotion()
  const content = CONTENT[stage]

  return (
    <motion.div
      key={stage}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      className="h-full rounded-xl border border-stone bg-white p-4 sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-base font-semibold">{content.title}</p>
        <span className={cn('status-chip', content.chipClass)}>{content.chip}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate">{content.detail}</p>
      <ul className="mt-4 space-y-2">
        {content.rows.map((row) => (
          <li
            key={row}
            className="rounded-lg bg-ivory px-3 py-2 text-xs font-medium text-charcoal"
          >
            {row}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[10px] font-medium tracking-wide text-slate/70 uppercase">
        Illustrative demo data
      </p>
    </motion.div>
  )
}
