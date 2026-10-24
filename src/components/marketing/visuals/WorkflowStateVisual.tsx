'use client'

import { motion, useReducedMotion } from 'framer-motion'

import {
  WORKFLOW_VENDOR,
  getWorkflowStage,
  type RequirementState,
  type WorkflowStageId,
} from '@/lib/marketing/data'
import { cn } from '@/lib/utils'

export type { WorkflowStageId }

function ReqIcon({ state }: { state: RequirementState }) {
  if (state === 'accepted') {
    return (
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-evergreen text-ivory"
        aria-hidden
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
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

  const tone =
    state === 'missing'
      ? 'border-amber-gold/70 bg-amber-gold/15 text-amber-gold'
      : state === 'in-review'
        ? 'border-[#7a6bb5]/50 bg-[#efeaf8] text-[#5a4d8c]'
        : 'border-stone bg-ivory text-slate'

  return (
    <span
      className={cn(
        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold',
        tone,
      )}
      aria-hidden
    >
      {state === 'missing' ? '!' : state === 'in-review' ? '·' : '…'}
    </span>
  )
}

/** Contextual product-state preview for the workflow stepper. */
export function WorkflowStateVisual({ stage }: { stage: WorkflowStageId }) {
  const reduce = useReducedMotion()
  const content = getWorkflowStage(stage)
  const total = content.requirements.length
  const accepted = content.acceptedCount

  return (
    <motion.div
      key={stage}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      className="flex h-full flex-col rounded-xl border border-stone bg-white p-4 sm:p-5"
    >
      <p className="text-[10px] font-semibold tracking-[0.14em] text-slate uppercase">
        Vendor journey
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-display text-base font-semibold text-charcoal sm:text-lg">
            {WORKFLOW_VENDOR.name}
          </p>
          <p className="mt-0.5 text-xs text-slate">
            {WORKFLOW_VENDOR.trade} · {WORKFLOW_VENDOR.property}
          </p>
        </div>
        <span className={cn('status-chip', content.statusClass)}>
          {content.status}
        </span>
      </div>

      <div className="mt-4 rounded-xl border border-stone/80 bg-ivory/80 p-3.5 sm:p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm font-semibold text-charcoal">Requirements</p>
          <p className="text-xs text-slate">
            {accepted} of {total} requirements accepted
          </p>
        </div>

        <div
          className="mt-3 flex gap-1.5"
          role="img"
          aria-label={`${accepted} of ${total} requirements accepted`}
        >
          {content.requirements.map((req) => (
            <span
              key={req.id}
              className={cn(
                'h-1.5 flex-1 rounded-full',
                req.state === 'accepted' ? 'bg-evergreen' : 'bg-stone',
              )}
            />
          ))}
        </div>

        <ul className="mt-3 space-y-2.5">
          {content.requirements.map((req) => (
            <li
              key={req.id}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <ReqIcon state={req.state} />
                <span className="truncate font-medium text-charcoal">
                  {req.name}
                </span>
              </span>
              <span
                className={cn(
                  'shrink-0 text-xs font-semibold',
                  req.state === 'accepted' ? 'text-slate' : 'text-charcoal',
                )}
              >
                {req.stateLabel}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {content.contextNote ? (
        <p className="mt-3 text-xs leading-relaxed text-slate">
          {content.contextNote}
        </p>
      ) : null}
    </motion.div>
  )
}
