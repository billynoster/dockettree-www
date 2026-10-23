import Image from 'next/image'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ProductFrameProps = {
  src?: string
  alt?: string
  priority?: boolean
  className?: string
  /** Aspect ratio class; omit with fit=contain + natural width/height when possible. */
  aspect?: string
  sizes?: string
  children?: ReactNode
  tone?: 'light' | 'dark'
  /** cover crops; contain shows full image without cutting UI. */
  fit?: 'cover' | 'contain'
  width?: number
  height?: number
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
  fit = 'cover',
  width,
  height,
}: ProductFrameProps) {
  const useNatural = fit === 'contain' && width && height

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
      {useNatural ? (
        <div className="bg-ivory">
          <Image
            src={src!}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="h-auto w-full"
            sizes={sizes}
          />
        </div>
      ) : (
        <div className={cn('relative w-full bg-ivory', aspect)}>
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              className={
                fit === 'contain'
                  ? 'object-contain object-top'
                  : 'object-cover object-top'
              }
              sizes={sizes}
            />
          ) : (
            children
          )}
        </div>
      )}
    </div>
  )
}
