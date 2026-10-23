'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { fadeUp } from '@/lib/motion'

const FRAGMENTS = [
  'Spreadsheet',
  'Email thread',
  'PDF folder',
  'Shared drive',
  'Calendar reminder',
] as const

export function FragmentationSection() {
  const reduce = useReducedMotion()

  return (
    <section className="border-t border-stone/60 bg-white">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-evergreen uppercase">
            The old way
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Vendor readiness shouldn’t live in five different places.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate sm:text-lg">
            Spreadsheets, shared drives, email threads, and calendar reminders
            make vendor information difficult to track and even harder to act
            on.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {FRAGMENTS.map((label, i) => (
              <motion.div
                key={label}
                initial={reduce ? false : { opacity: 0.55, x: i % 2 ? 12 : -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="rounded-xl border border-dashed border-stone bg-ivory px-4 py-4 text-sm font-medium text-slate"
              >
                {label}
              </motion.div>
            ))}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              className="rounded-xl border border-evergreen/25 bg-pale-moss px-4 py-5 sm:col-span-2"
            >
              <p className="font-display text-sm font-semibold tracking-[0.12em] text-evergreen uppercase">
                One Docket Tree workspace
              </p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal">
                Documents, requests, reviews, and expirations stay linked to
                each vendor — ready when work needs to happen.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
