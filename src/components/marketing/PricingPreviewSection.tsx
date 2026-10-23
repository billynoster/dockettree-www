'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { fadeUp } from '@/lib/motion'
import {
  CONTACT_SALES_URL,
  PLANS,
  PRICING_URL,
  SIGNUP_URL,
} from '@/lib/site'
import { cn } from '@/lib/utils'

export function PricingPreviewSection() {
  const reduce = useReducedMotion()

  return (
    <section
      id="pricing"
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
            Simple pricing
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Grow your vendor network. Not your software bill per seat.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
            Pricing scales with active vendors and properties, not the number of
            people on your team.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <motion.article
              key={plan.id}
              variants={fadeUp}
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className={cn(
                'flex flex-col rounded-2xl border bg-white p-6',
                plan.featured
                  ? 'border-evergreen/40 shadow-[0_18px_40px_rgba(31,92,74,0.1)] ring-1 ring-evergreen/15'
                  : 'border-stone',
              )}
            >
              {plan.featured && (
                <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-amber-gold uppercase">
                  Most popular
                </p>
              )}
              <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
              <p className="mt-3 font-display text-4xl font-semibold tracking-tight">
                ${plan.price}
                <span className="text-base font-medium text-slate">/mo</span>
              </p>
              <ul className="mt-5 flex-1 space-y-2 text-sm text-slate">
                <li>Up to {plan.vendors.toLocaleString()} active vendors</li>
                <li>Up to {plan.properties} properties</li>
                <li>Unlimited internal team members</li>
              </ul>
              <Button
                asChild
                className="mt-6 w-full"
                variant={plan.featured ? 'accent' : 'default'}
              >
                <a href={plan.href}>{plan.cta}</a>
              </Button>
            </motion.article>
          ))}

          <motion.article
            variants={fadeUp}
            initial={reduce ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col rounded-2xl border border-stone bg-white p-6"
          >
            <h3 className="font-display text-lg font-semibold">Enterprise</h3>
            <p className="mt-3 font-display text-3xl font-semibold tracking-tight">
              Custom
            </p>
            <ul className="mt-5 flex-1 space-y-2 text-sm text-slate">
              <li>Higher vendor &amp; property limits</li>
              <li>Advanced organizational needs</li>
              <li>Tailored support</li>
            </ul>
            <Button asChild className="mt-6 w-full" variant="secondary">
              <a href={CONTACT_SALES_URL}>Contact Sales</a>
            </Button>
          </motion.article>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" variant="accent">
            <a href={SIGNUP_URL}>Start Free Trial</a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href={PRICING_URL}>Compare Plans</a>
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-slate">
          Annual billing and founding rates are available in the app.
        </p>
      </div>
    </section>
  )
}
