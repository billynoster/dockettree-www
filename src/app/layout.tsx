import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'

import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dockettree.com'),
  title: 'Docket Tree | Vendor Readiness Software for Property Operations',
  description:
    'Docket Tree helps property operations teams manage vendor readiness, documents, requests, reviews, and expirations in one connected workspace.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'Docket Tree | Vendor Readiness for Property Operations',
    description:
      'Manage vendor readiness, documents, requests, reviews, and expirations in one connected workspace.',
    url: 'https://dockettree.com',
    siteName: 'Docket Tree',
    images: ['/brand/logo-stacked.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Docket Tree | Vendor Readiness for Property Operations',
    description:
      'Manage vendor readiness, documents, requests, reviews, and expirations in one connected workspace.',
    images: ['/brand/logo-stacked.png'],
  },
  alternates: {
    canonical: 'https://dockettree.com',
  },
}

/** Pre-paint: stamp `?hero=` on <html> so CSS can suppress FOUC before hydration. */
const HERO_VARIANT_BOOT = `(function(){try{var h=new URLSearchParams(location.search).get("hero");if(h==="layered"||h==="intelligent"||h==="static")document.documentElement.dataset.hero=h}catch(e){}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full overflow-x-clip antialiased`}
    >
      {/* Synchronous head script — must run during HTML parse (before paint).
          next/script beforeInteractive queues via __next_s and is too late for FOUC. */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: HERO_VARIANT_BOOT }} />
      </head>
      <body className="min-h-full overflow-x-clip bg-ivory font-sans text-charcoal">
        {children}
      </body>
    </html>
  )
}
