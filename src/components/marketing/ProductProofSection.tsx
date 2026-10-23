'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

import { fadeUp } from '@/lib/motion'

const CALLOUTS = [
  'See readiness instantly',
  'Catch upcoming expirations',
  'Know the next action',
] as const

export function ProductProofSection() {
  const reduce = useReducedMotion()

  return (
    <section
      id="product"
      className="scroll-mt-24 border-t border-stone/60 bg-ivory"
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
            One connected workspace
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
            Everything you need to know, in one view.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
            See which vendors are ready, what documents are missing, what’s
            expiring, and who owns the next action.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mx-auto mt-12 max-w-5xl sm:mt-16"
        >
          <div className="overflow-hidden rounded-[18px] border border-stone bg-white shadow-[0_24px_60px_rgba(32,38,35,0.08)]">
            <div className="flex items-center gap-2 border-b border-stone/80 bg-ivory/80 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-stone" />
              <span className="h-2.5 w-2.5 rounded-full bg-stone" />
              <span className="h-2.5 w-2.5 rounded-full bg-stone" />
              <span className="ml-3 text-xs text-slate">
                Docket Tree — vendor readiness
              </span>
            </div>
            <div className="relative aspect-[16/10] bg-pale-moss/40">
              <Image
                src="/marketing/product-overview.png"
                alt="Docket Tree readiness overview showing vendor status, expirations, and next actions"
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 1024px, 100vw"
              />
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {CALLOUTS.map((label) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-charcoal"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-amber-gold"
                  aria-hidden
                />
                {label}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
