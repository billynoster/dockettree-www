'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useId, useState } from 'react'

import { Button } from '@/components/ui/button'
import { LOGIN_URL, NAV_ANCHORS, SIGNUP_URL } from '@/lib/site'
import { cn } from '@/lib/utils'

export function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [overLight, setOverLight] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduce = useReducedMotion()
  const menuId = useId()

  useEffect(() => {
    const update = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      const product = document.getElementById('product')
      if (product) {
        setOverLight(product.getBoundingClientRect().top < 80)
      } else {
        setOverLight(y > window.innerHeight * 0.85)
      }
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const light = overLight || menuOpen
  const solid = scrolled || overLight

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200',
        solid
          ? light
            ? 'border-b border-stone/80 bg-ivory/92 backdrop-blur-md'
            : 'border-b border-white/10 bg-evergreen-deep/88 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-5 sm:h-[76px] sm:px-8">
        <a href="/" aria-label="Docket Tree home" className="inline-flex shrink-0">
          <Image
            src="/brand/logo-horizontal.png"
            alt="Docket Tree"
            width={180}
            height={53}
            className={cn(
              'h-8 w-auto sm:h-9',
              light ? '' : 'brightness-0 invert',
            )}
            priority
          />
        </a>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary"
        >
          {NAV_ANCHORS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium tracking-wide transition-colors',
                light
                  ? 'text-slate hover:text-evergreen'
                  : 'text-ivory/88 hover:text-ivory',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Button
            asChild
            variant={light ? 'ghost' : 'inverse'}
            size="sm"
          >
            <a href={LOGIN_URL}>Log in</a>
          </Button>
          <Button asChild variant="accent" size="sm">
            <a href={SIGNUP_URL}>Start Free Trial</a>
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-lg lg:hidden',
            light ? 'text-charcoal' : 'text-ivory',
          )}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">{menuOpen ? 'Close' : 'Menu'}</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            {menuOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id={menuId}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-stone/70 bg-ivory lg:hidden"
          >
            <nav
              className="mx-auto flex max-w-[1280px] flex-col gap-1 px-5 py-4 sm:px-8"
              aria-label="Mobile"
            >
              {NAV_ANCHORS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-charcoal hover:bg-pale-moss"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-stone/70 pt-4">
                <Button asChild variant="secondary" size="lg">
                  <a href={LOGIN_URL}>Log in</a>
                </Button>
                <Button asChild variant="accent" size="lg">
                  <a href={SIGNUP_URL}>Start Free Trial</a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
