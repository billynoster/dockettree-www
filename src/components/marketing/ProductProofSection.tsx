'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { ProductFrame } from '@/components/marketing/ProductFrame'
import { InteractiveDashboardVisual } from '@/components/marketing/visuals'

import { fadeUp } from '@/lib/motion'

const CALLOUTS = [
  'See readiness instantly',
  'Catch upcoming expirations',
  'Know the next action',
] as const

/** Hi-DPI static capture — reduced-motion / noscript-style fallback. */
const DASHBOARD_FALLBACK = {
  src: '/marketing/dashboard.png',
  width: 1440,
  height: 900,
} as const

export function ProductProofSection() {
  const reduce = useReducedMotion()

  return (
    <section
      id="product"
      className="scroll-mt-24 border-t border-stone/60 bg-ivory"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-24">
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
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.65rem]">
            Everything you need to know, in one view.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
            One view of readiness and next actions — so your team can decide
            who can work today.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mx-auto mt-10 max-w-[1180px] sm:mt-12"
        >
          {reduce ? (
            <ProductFrame
              src={DASHBOARD_FALLBACK.src}
              alt="Docket Tree dashboard demonstration — sidebar, readiness overview, needs attention, expirations, and recent activity (demo environment)"
              fit="contain"
              width={DASHBOARD_FALLBACK.width}
              height={DASHBOARD_FALLBACK.height}
              sizes="(min-width: 1280px) 1180px, 100vw"
              className="shadow-[0_28px_64px_rgba(32,38,35,0.1)]"
            />
          ) : (
            <InteractiveDashboardVisual />
          )}

          <p className="mt-3 text-center text-[11px] font-medium tracking-wide text-slate/80 uppercase">
            {reduce
              ? 'Authentic product screenshot · demo environment'
              : 'Interactive product demo · fictional demo data'}
          </p>

          <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
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
