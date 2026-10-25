/** Marketing site → app routes (do not invent destinations). */
export const APP_URL = 'https://app.dockettree.com'
export const SIGNUP_URL = `${APP_URL}/signup`
export const LOGIN_URL = `${APP_URL}/login`
export const PRICING_URL = `${APP_URL}/pricing`
/**
 * Marketing contact form + sales CTA destination.
 * Inbox delivery uses env-only `POSTMARK_TO` in the Pages Function — never
 * hardcode a personal address in client code, README, or UI mailto links.
 */
export const CONTACT_PATH = '/contact'
/** Pricing “Contact Sales” → same form (no personal mailto in the bundle). */
export const CONTACT_SALES_URL = CONTACT_PATH

/** In-page anchors use `/#…` so they resolve from `/contact` and other routes. */
export const NAV_ANCHORS = [
  { href: '/#product', label: 'Product' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#about', label: 'About' },
] as const

/** Verified from product pricing docs — monthly list prices. */
export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 99,
    vendors: 50,
    properties: 5,
    cta: 'Start Free Trial' as const,
    href: SIGNUP_URL,
    featured: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 249,
    vendors: 250,
    properties: 25,
    cta: 'Start Free Trial' as const,
    href: SIGNUP_URL,
    featured: true,
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    price: 599,
    vendors: 1000,
    properties: 100,
    cta: 'Start Free Trial' as const,
    href: SIGNUP_URL,
    featured: false,
  },
] as const
