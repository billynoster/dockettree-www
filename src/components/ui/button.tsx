'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-evergreen text-ivory hover:bg-evergreen-deep',
        secondary:
          'border border-stone/80 bg-transparent text-charcoal hover:border-evergreen/35 hover:bg-white/80',
        ghost: 'text-charcoal hover:bg-pale-moss/80',
        inverse:
          'border border-ivory/40 bg-transparent text-ivory hover:border-ivory/70 hover:bg-ivory/12',
        accent:
          'bg-amber-gold text-charcoal hover:bg-[#c89430] focus-visible:ring-amber-gold',
      },
      size: {
        default: 'h-11 px-5',
        lg: 'h-12 px-6 text-base',
        sm: 'h-9 px-3.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
