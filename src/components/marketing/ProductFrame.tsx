import Image from 'next/image'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ProductFrameProps = {
  src?: string
  alt?: string
  priority?: boolean
  className?: string
  /** Aspect ratio class, e.g. aspect-[16/10] */
  aspect?: string
  sizes?: string
  children?: ReactNode
  tone?: 'light' | 'dark'
}

/** Single refined product frame — no nested browser chrome or localhost URLs. */
export function ProductFrame({
  src,
  alt = '',
  priority,
  className,
  aspect = 'aspect-[16/10]',
  sizes = '(min-width: 1024px) 640px, 100vw',
  children,
  tone = 'light',
}: ProductFrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[18px] border shadow-[0_20px_50px_rgba(32,38,35,0.09)]',
        tone === 'dark'
          ? 'border-white/18 bg-white'
          : 'border-stone bg-white',
        className,
      )}
    >
      <div className={cn('relative w-full bg-ivory', aspect)}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover object-top"
            sizes={sizes}
          />
        ) : (
          children
        )}
      </div>
    </div>
  )
}
