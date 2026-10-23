'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { fadeUp } from '@/lib/motion'
import { cn } from '@/lib/utils'

const ROLES = [
  { id: 'pm', label: 'Property Manager', x: 18, y: 22 },
  { id: 'rm', label: 'Regional Manager', x: 82, y: 22 },
  { id: 'ops', label: 'Operations', x: 12, y: 58 },
  { id: 'fac', label: 'Facilities', x: 88, y: 58 },
  { id: 'acct', label: 'Accounting', x: 50, y: 78 },
] as const

export function TeamSection() {
  const reduce = useReducedMotion()

  return (
    <section className="border-t border-stone/60 bg-white">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-14">
        <motion.div
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-evergreen uppercase">
            Teamwork without seat limits
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Bring everyone into the picture.
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-slate sm:text-lg">
            Give your operations team shared visibility across vendors,
            properties, documents, and requests without per-seat pricing.
          </p>
          <p className="mt-6 inline-flex rounded-full border border-evergreen/20 bg-pale-moss px-4 py-2 text-sm font-semibold text-evergreen">
            Unlimited internal team members on every plan
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-2xl border border-stone bg-ivory p-5 sm:p-6"
        >
          <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden
          >
            {ROLES.map((role, i) => (
              <motion.line
                key={role.id}
                x1={role.x}
                y1={role.y}
                x2={50}
                y2={48}
                stroke="#78966A"
                strokeWidth="0.45"
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 0.55 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: reduce ? 0 : 0.1 + i * 0.05 }}
              />
            ))}
            <circle cx="50" cy="48" r="3.2" fill="#D9A441" opacity="0.95" />
          </svg>

          <div className="relative mx-auto mb-8 flex max-w-[14rem] flex-col items-center rounded-xl border border-evergreen/25 bg-pale-moss px-4 py-3 text-center shadow-sm">
            <p className="font-display text-[10px] font-semibold tracking-[0.14em] text-evergreen uppercase">
              Shared workspace
            </p>
            <p className="mt-1 text-sm font-semibold text-charcoal">
              Docket Tree
            </p>
          </div>

          <ul className="relative grid gap-2.5 sm:grid-cols-2">
            {ROLES.map((role, i) => (
              <motion.li
                key={role.id}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: reduce ? 0 : 0.12 + i * 0.05 }}
                className={cn(
                  'rounded-xl border border-stone bg-white px-4 py-3 font-display text-sm font-semibold text-charcoal shadow-[0_6px_16px_rgba(32,38,35,0.04)]',
                  role.id === 'acct' && 'sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.35rem)]',
                )}
              >
                {role.label}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
