'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

import { fadeUp } from '@/lib/motion'

const FEATURES = [
  {
    title: 'Know who is ready',
    body: 'See readiness status across your vendor network at a glance.',
    image: '/marketing/product-overview.png',
    alt: 'Readiness overview dashboard',
    align: 'left' as const,
  },
  {
    title: 'Stay ahead of expirations',
    body: 'Identify documents approaching expiration before they become operational surprises.',
    image: '/marketing/product-properties.png',
    alt: 'Properties and related records in Docket Tree',
    align: 'right' as const,
  },
  {
    title: 'Keep requests moving',
    body: 'Track document requests and reviews without relying on fragmented email threads.',
    image: '/marketing/product-overview.png',
    alt: 'Request and review workflow surface',
    align: 'left' as const,
  },
  {
    title: 'Keep every record connected',
    body: 'Documents, properties, activity, and requirements stay linked to one vendor record.',
    image: '/marketing/product-properties.png',
    alt: 'Connected property and vendor records',
    align: 'right' as const,
  },
] as const

export function CapabilitiesSection() {
  const reduce = useReducedMotion()

  return (
    <section className="border-t border-stone/60 bg-ivory">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
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
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            A clearer way to manage vendor readiness.
          </h2>
        </motion.div>

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
          {FEATURES.map((feature) => (
            <motion.article
              key={feature.title}
              variants={fadeUp}
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                feature.align === 'right' ? '' : ''
              }`}
            >
              <div
                className={
                  feature.align === 'right' ? 'lg:order-2' : 'lg:order-1'
                }
              >
                <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-slate">
                  {feature.body}
                </p>
              </div>
              <div
                className={`overflow-hidden rounded-2xl border border-stone bg-white shadow-[0_16px_40px_rgba(32,38,35,0.06)] ${
                  feature.align === 'right' ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 560px, 100vw"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
