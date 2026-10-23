'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

import {
  DocumentRequestVisual,
  ExpirationTrackingVisual,
  VendorReadinessVisual,
  VendorRecordVisual,
} from '@/components/marketing/visuals'
import { fadeUp } from '@/lib/motion'
import { cn } from '@/lib/utils'

const FEATURES: {
  title: string
  body: string
  align: 'left' | 'right'
  bg: string
  visual: ReactNode
}[] = [
  {
    title: 'Know who is ready',
    body: 'See readiness status across your vendor network at a glance.',
    align: 'left',
    bg: 'bg-ivory',
    visual: <VendorReadinessVisual />,
  },
  {
    title: 'Stay ahead of expirations',
    body: 'Identify documents approaching expiration before they become operational surprises.',
    align: 'right',
    bg: 'bg-white',
    visual: <ExpirationTrackingVisual />,
  },
  {
    title: 'Keep requests moving',
    body: 'Track document requests and reviews without relying on fragmented email threads.',
    align: 'left',
    bg: 'bg-pale-moss/40',
    visual: <DocumentRequestVisual />,
  },
  {
    title: 'Keep every record connected',
    body: 'Documents, properties, activity, and requirements stay linked to one vendor record.',
    align: 'right',
    bg: 'bg-ivory',
    visual: <VendorRecordVisual />,
  },
]

export function CapabilitiesSection() {
  const reduce = useReducedMotion()

  return (
    <section className="border-t border-stone/60">
      <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 sm:py-16">
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
          <div
            key={feature.title}
            className={cn(feature.bg, index > 0 && 'border-t border-stone/50')}
          >
            <motion.article
              variants={fadeUp}
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="mx-auto grid max-w-[1280px] items-center gap-8 px-5 py-12 sm:gap-10 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-14 xl:gap-16"
            >
              <div
                className={
                  feature.align === 'right' ? 'lg:order-2' : 'lg:order-1'
                }
              >
                <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
                  {feature.title}
                </h3>
                <p className="mt-2.5 max-w-md text-base leading-relaxed text-slate">
                  {feature.body}
                </p>
              </div>
              <div
                className={cn(
                  'min-w-0',
                  feature.align === 'right' ? 'lg:order-1' : 'lg:order-2',
                )}
              >
                {feature.visual}
              </div>
            </motion.article>
          </div>
        ))}
      </div>
    </section>
  )
}
