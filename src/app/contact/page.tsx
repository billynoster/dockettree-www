import type { Metadata } from 'next'

import { ContactForm } from '@/components/marketing/ContactForm'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'

export const metadata: Metadata = {
  title: 'Contact | Docket Tree',
  description:
    'Get in touch with Docket Tree about vendor readiness, demos, or enterprise plans for property operations.',
  alternates: {
    canonical: 'https://dockettree.com/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      <MarketingHeader tone="light" />
      <main className="overflow-x-clip">
        <section
          aria-labelledby="contact-heading"
          className="relative border-b border-stone/70"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_0%,rgba(237,242,234,0.95),transparent_55%),radial-gradient(ellipse_70%_50%_at_90%_20%,rgba(31,92,74,0.08),transparent_50%),linear-gradient(180deg,#faf8f3_0%,#f3f0e8_100%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid w-full max-w-[1280px] gap-10 px-5 pt-[108px] pb-16 sm:px-8 sm:pt-[116px] sm:pb-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 lg:pb-24">
            <div className="min-w-0 max-w-xl">
              <p className="font-display text-[0.72rem] font-semibold tracking-[0.2em] text-evergreen/80 uppercase sm:text-xs">
                Contact
              </p>
              <h1
                id="contact-heading"
                className="mt-3 font-display text-[2.15rem] leading-[1.08] font-semibold tracking-tight text-balance text-charcoal sm:text-5xl"
              >
                Talk with Docket Tree
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-slate sm:text-lg">
                Questions about vendor readiness, onboarding, or enterprise
                plans? Send a note — we read every message.
              </p>
            </div>

            <div className="min-w-0 rounded-[18px] border border-stone/80 bg-white/90 p-5 shadow-[0_18px_40px_rgba(32,38,35,0.06)] sm:p-7">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  )
}
