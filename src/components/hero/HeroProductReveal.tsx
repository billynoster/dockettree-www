import { type ReactNode } from 'react'

import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
}

/**
 * Concept B — Layered Product Reveal.
 * Two abstract translucent planes converge into the readiness dashboard.
 * Pure CSS animation (once); final frame matches the static hero.
 * Decorative layers are aria-hidden and non-interactive.
 */
export function HeroProductReveal({ children, className }: Props) {
  return (
    <div className={cn('hero-product-reveal relative w-full', className)}>
      <div className="hero-layer hero-layer-a" aria-hidden="true" />
      <div className="hero-layer hero-layer-b" aria-hidden="true" />
      <div className="hero-product-stage relative z-[1]">{children}</div>
    </div>
  )
}
