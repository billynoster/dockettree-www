'use client'

import { useReducedMotion } from 'framer-motion'
import {
  useEffect,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'

import { DEMO_NOTICE } from '@/lib/marketing/data'
import { cn } from '@/lib/utils'

type VisualShellProps = {
  children: ReactNode
  className?: string
  /** Extra classes on the shell root (e.g. intelligent-reveal staging). */
  shellClassName?: string
  /** Extra classes on the title bar row. */
  headerClassName?: string
  title?: string
  /** When false, omit the small illustrative caption (e.g. dense hero). */
  showCaption?: boolean
  tone?: 'light' | 'dark'
  /** Marks the hero readiness dashboard shell. */
  heroDashboard?: boolean
}

/** Shared chrome for marketing product compositions — not a nested browser. */
export function VisualShell({
  children,
  className,
  shellClassName,
  headerClassName,
  title,
  showCaption = true,
  tone = 'light',
  heroDashboard = false,
}: VisualShellProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[18px] border shadow-[0_20px_50px_rgba(32,38,35,0.09)]',
        tone === 'dark' ? 'border-white/18 bg-white' : 'border-stone bg-white',
        className,
        shellClassName,
      )}
      {...(heroDashboard ? { 'data-hero-dashboard': '' } : {})}
    >
      {title ? (
        <div
          className={cn(
            'flex items-center justify-between border-b border-stone/80 bg-ivory/90 px-4 py-2.5',
            headerClassName,
          )}
        >
          <p className="truncate text-xs font-medium text-slate">{title}</p>
          {showCaption ? (
            <p className="shrink-0 text-[10px] font-medium tracking-wide text-slate/80 uppercase">
              {DEMO_NOTICE}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className="relative bg-ivory">{children}</div>
      {!title && showCaption ? (
        <p className="border-t border-stone/70 bg-white px-4 py-2 text-[10px] font-medium tracking-wide text-slate/75 uppercase">
          {DEMO_NOTICE}
        </p>
      ) : null}
    </div>
  )
}

/** Pause subtle status motion when off-viewport or reduced-motion. */
export function useVisualMotionActive(rootRef: RefObject<HTMLElement | null>) {
  const reduce = useReducedMotion()
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el || reduce) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootRef, reduce])

  return Boolean(!reduce && inView)
}
