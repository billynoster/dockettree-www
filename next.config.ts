import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static HTML export for Cloudflare Pages (no Node/edge runtime needed).
  // R3F hero + Framer Motion run client-side; brand images are local in /public.
  output: 'export',
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
}

export default nextConfig
