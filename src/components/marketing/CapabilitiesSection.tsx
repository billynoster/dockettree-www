'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

import { ProductFrame } from '@/components/marketing/ProductFrame'
import { ReadinessPanel } from '@/components/marketing/UiPanels'
import { fadeUp } from '@/lib/motion'
import { cn } from '@/lib/utils'

const FEATURES: {
  title: string
  body: string
  align: 'left' | 'right'
  bg: string
  image?: string
  alt?: string
  panel?: ReactNode
}[] = [
  {
    title: 'Know who is ready',
    body: 'See readiness status across your vendor network at a glance.',
    align: 'left',
    bg: 'bg-ivory',
    image: '/marketing/dashboard.png',
    alt: 'Readiness dashboard with Ready, Needs Action, In Review, and Expiring Soon counts',
  },
  {
    title: 'Stay ahead of expirations',
    body: 'Identify documents approaching expiration before they become operational surprises.',
    align: 'right',
    bg: 'bg-white',
    image: '/marketing/expirations-closeup.png',
    alt: 'Vendor readiness table highlighting upcoming document expirations',
  },
  {
    title: 'Keep requests moving',
    body: 'Track document requests and reviews without relying on fragmented email threads.',
    align: 'left',
    bg: 'bg-pale-moss/50',
    image: '/marketing/portal.png',
    alt: 'Vendor portal document requests with submit and acceptance status',
  },
  {
    title: 'Keep every record connected',
    body: 'Documents, properties, activity, and requirements stay linked to one vendor record.',
    align: 'right',
    bg: 'bg-ivory',
    image: '/marketing/properties.png',
    alt: 'Property detail with linked vendors in Docket Tree',
  },
]

export function CapabilitiesSection() {
  const reduce = useReducedMotion()

  return (
    <section className="border-t border-stone/60">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20">
        <motion.div
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl"
        >
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-evergreen uppercase">
            Built for clarity
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            A clearer way to manage vendor readiness.
          </h2>
        </motion.div>
      </div>

      <div>
        {FEATURES.map((feature, index) => (
          <div key={feature.title} className={cn(feature.bg, index > 0 && 'border-t border-stone/50')}>
            <motion.article
              variants={fadeUp}
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="mx-auto grid max-w-[1280px] items-center gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-12"
            >
              <div
                className={
                  feature.align === 'right' ? 'lg:order-2' : 'lg:order-1'
                }
              >
                <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-slate">
                  {feature.body}
                </p>
              </div>
              <div
                className={
                  feature.align === 'right' ? 'lg:order-1' : 'lg:order-2'
                }
              >
                {feature.image ? (
                  <ProductFrame
                    src={feature.image}
                    alt={feature.alt ?? ''}
                    aspect="aspect-[16/10]"
                    sizes="(min-width: 1024px) 560px, 100vw"
                  />
                ) : (
                  <ProductFrame aspect="aspect-[16/10]">
                    {feature.panel ?? <ReadinessPanel />}
                  </ProductFrame>
                )}
              </div>
            </motion.article>
          </div>
        ))}
      </div>
    </section>
  )
}
