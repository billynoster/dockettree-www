'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { fadeUp } from '@/lib/motion'

const STATUSES = [
  { label: 'Ready', className: 'status-chip-ready' },
  { label: 'Needs Action', className: 'status-chip-needs' },
  { label: 'In Review', className: 'status-chip-review' },
  { label: 'Waiting on Vendor', className: 'status-chip-waiting' },
  { label: 'Expiring Soon', className: 'status-chip-expiring' },
] as const

export function ReadinessSection() {
  const reduce = useReducedMotion()

  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-stone/60 bg-pale-moss"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <motion.div
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-evergreen uppercase">
            A different way to think about vendors
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Clear status. Clear ownership. Clear next steps.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
            Docket Tree helps teams understand operational readiness without
            reducing every vendor to a simple compliant or non-compliant label.
          </p>
        </motion.div>

        <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
          {STATUSES.map((s) => (
            <li key={s.label}>
              <span className={`status-chip ${s.className}`}>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
