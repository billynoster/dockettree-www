export const DEMO_ORG = 'Cedar Grove Property Operations'

export const DEMO_PROPERTY = {
  name: 'Maple Business Park',
  address: '88 Maple Park Dr, Cedar Grove, IL',
  description: 'Multi-building campus; grounds vendors common.',
  linked: [
    'Cedar Line Landscaping',
    'Granite Peak Roofing',
    'Harborview Plumbing',
    'Summit Fire Protection',
  ],
} as const

export function getDemoExpirations(
  vendors: {
    name: string
    trade: string
    nextExpiration: string | null
    days: number | null
    dateLabel: string | null
    countdown: string | null
    expirationState: 'expired' | 'expiring' | 'ok' | null
  }[],
) {
  return vendors
    .filter(
      (v) =>
        v.nextExpiration &&
        v.days != null &&
        v.days >= 0 &&
        v.days <= 60,
    )
    .sort((a, b) => (a.days ?? 999) - (b.days ?? 999))
    .slice(0, 4)
    .map((v) => ({
      vendor: v.name,
      document:
        v.name.includes('Fire')
          ? 'Certificate of insurance'
          : v.name.includes('Roofing')
            ? 'Safety acknowledgment'
            : 'Insurance certificate',
      days: v.days as number,
      date: v.dateLabel as string,
      countdown: v.countdown as string,
      state: v.expirationState as 'expiring' | 'ok',
    }))
}
