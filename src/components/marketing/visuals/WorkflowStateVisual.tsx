'use client'

import { motion, useReducedMotion } from 'framer-motion'

import {
  DEMO_NOTICE,
  getWorkflowStage,
  type WorkflowStageId,
} from '@/lib/marketing/data'
import { cn } from '@/lib/utils'

export type { WorkflowStageId }

/** Contextual product-state preview for the workflow stepper. */
export function WorkflowStateVisual({ stage }: { stage: WorkflowStageId }) {
  const reduce = useReducedMotion()
  const content = getWorkflowStage(stage).panel

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
        <span className={cn('status-chip', content.chipClass)}>
          {content.chip}
        </span>
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
        {DEMO_NOTICE}
      </p>
    </motion.div>
  )
}
