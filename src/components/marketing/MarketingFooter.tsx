import Image from 'next/image'

import {
  APP_URL,
  CONTACT_PATH,
  LOGIN_URL,
  NAV_ANCHORS,
  X_URL,
} from '@/lib/site'

/** Official X logo mark (simple path). */
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  )
}

export function MarketingFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-stone/70 bg-ivory">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-sm font-semibold text-evergreen">
              Product
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate">
              {NAV_ANCHORS.filter((n) => n.href !== '/#about').map((item) => (
                <li key={item.href}>
                  <a className="hover:text-evergreen" href={item.href}>
                    {item.label === 'Product' ? 'Overview' : item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold text-evergreen">
              Company
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate">
              <li>
                <a className="hover:text-evergreen" href="/#about">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-evergreen" href={CONTACT_PATH}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold text-evergreen">
              App
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate">
              <li>
                <a className="hover:text-evergreen" href={LOGIN_URL}>
                  Log in
                </a>
              </li>
              <li>
                <a className="hover:text-evergreen" href={APP_URL}>
                  Open app
                </a>
              </li>
            </ul>
          </div>

          <div>
            <Image
              src="/brand/logo-horizontal.png"
              alt="Docket Tree"
              width={160}
              height={47}
              className="h-8 w-auto"
            />
            <p className="mt-4 text-sm text-slate">
              Everything connected. Nothing lost.
            </p>
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Docket Tree on X"
              className="mt-5 inline-flex max-w-full items-center gap-2 rounded-sm text-sm text-slate transition-colors hover:text-evergreen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              <XIcon className="shrink-0" />
              <span>Follow us for product updates.</span>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-stone/70 pt-6 text-sm text-slate">
          <p>© {year} Docket Tree</p>
          <p className="text-xs">Vendor readiness for property operations</p>
        </div>
      </div>
    </footer>
  )
}
