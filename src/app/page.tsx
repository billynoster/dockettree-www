import { Hero } from '@/components/hero/Hero'
import { Button } from '@/components/ui/button'

const APP_URL = 'https://app.dockettree.com'
const SIGNUP_URL = `${APP_URL}/signup`
const PRICING_URL = `${APP_URL}/pricing`

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="border-t border-stone/70 bg-ivory">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-16">
          <div className="max-w-xl">
            <p className="font-display text-sm font-semibold tracking-[0.16em] text-evergreen uppercase">
              Get started
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Start free. Grow with your vendor network.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate">
              30-day free trial. Plans scale by active vendors and properties —
              no per-seat fees.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="accent">
              <a href={SIGNUP_URL}>Start Free Trial</a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={PRICING_URL}>See plans in the app</a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone/70 bg-ivory">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-8 sm:px-8">
          <p className="font-display text-sm font-semibold text-evergreen">
            Docket Tree
          </p>
          <a
            className="text-sm text-slate hover:text-evergreen"
            href={APP_URL}
          >
            Open app
          </a>
        </div>
      </footer>
    </main>
  )
}
