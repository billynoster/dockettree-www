'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { fadeUp } from '@/lib/motion'

const ROLES = [
  'Property Manager',
  'Regional Manager',
  'Operations',
  'Facilities',
  'Accounting',
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

        <motion.ul
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-3 sm:grid-cols-2"
        >
          {ROLES.map((role) => (
            <li
              key={role}
              className="rounded-xl border border-stone bg-ivory px-5 py-4 font-display text-sm font-semibold text-charcoal"
            >
              {role}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
