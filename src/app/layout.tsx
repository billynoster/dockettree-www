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
  title: 'Docket Tree — Vendor readiness for property ops',
  description:
    'Docket Tree — vendor readiness for property ops. Everything connected, nothing lost. Know who can work and what’s next.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'Docket Tree',
    description:
      'Vendor readiness for property ops — everything connected, nothing lost.',
    images: ['/brand/logo-stacked.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory font-sans text-charcoal">
        {children}
      </body>
    </html>
  )
}
