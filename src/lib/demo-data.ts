/**
 * Deterministic fictional demo data for marketing UI compositions.
 * Illustrative only — not real customers or live analytics.
 */

export const DEMO_NOTICE = 'Illustrative demo data'

export const DEMO_ORG = 'Cedar Grove Property Operations'

export const DEMO_COUNTS = {
  ready: 4,
  needsAction: 4,
  inReview: 7,
  expiringSoon: 2,
} as const

export const DEMO_VENDORS = [
  {
    id: 'v1',
    name: 'Bluewater Janitorial',
    trade: 'Cleaning',
    status: 'ready' as const,
    property: 'Maple Business Park',
    nextExpiration: '2027-03-18',
    days: 165,
    blocker: null,
  },
  {
    id: 'v2',
    name: 'Cedar Line Landscaping',
    trade: 'Grounds',
    status: 'expiring' as const,
    property: 'Riverfront Offices',
    nextExpiration: '2026-10-17',
    days: 13,
    blocker: null,
  },
  {
    id: 'v3',
    name: 'Harborview Plumbing',
    trade: 'Plumbing',
    status: 'needs-action' as const,
    property: 'Westfield Plaza',
    nextExpiration: null,
    days: null,
    blocker: 'Safety acknowledgment missing',
  },
  {
    id: 'v4',
    name: 'Granite Peak Roofing',
    trade: 'Roofing',
    status: 'in-review' as const,
    property: 'Maple Business Park',
    nextExpiration: '2026-12-02',
    days: 59,
    blocker: 'Insurance certificate awaiting review',
  },
  {
    id: 'v5',
    name: 'Summit Fire Protection',
    trade: 'Fire safety',
    status: 'needs-action' as const,
    property: 'Riverfront Offices',
    nextExpiration: '2026-10-22',
    days: 18,
    blocker: 'Insurance certificate expired',
  },
] as const

export const DEMO_EXPIRATIONS = [
  {
    vendor: 'Cedar Line Landscaping',
    document: 'Insurance certificate',
    days: 13,
    date: 'Oct 17, 2026',
  },
  {
    vendor: 'Summit Fire Protection',
    document: 'Certificate of insurance',
    days: 18,
    date: 'Oct 22, 2026',
  },
  {
    vendor: 'Granite Peak Roofing',
    document: 'Safety acknowledgment',
    days: 42,
    date: 'Nov 15, 2026',
  },
] as const

export const DEMO_DOCUMENTS = [
  {
    id: 'd1',
    title: 'Safety acknowledgment',
    state: 'missing' as const,
    note: 'Nothing currently accepted for this requirement.',
  },
  {
    id: 'd2',
    title: 'Insurance certificate',
    state: 'accepted' as const,
    note: 'Expires May 2, 2027 · in 210 days',
  },
  {
    id: 'd3',
    title: 'Service agreement',
    state: 'accepted' as const,
    note: 'Current · no expiration',
  },
] as const

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

export const STATUS_LABEL = {
  ready: 'Ready',
  'needs-action': 'Needs Action',
  'in-review': 'In Review',
  waiting: 'Waiting on Vendor',
  expiring: 'Expiring Soon',
} as const

export function statusChipClass(
  status: keyof typeof STATUS_LABEL | 'missing' | 'accepted' | 'requested',
) {
  switch (status) {
    case 'ready':
    case 'accepted':
      return 'status-chip-ready'
    case 'needs-action':
    case 'expiring':
    case 'missing':
      return 'status-chip-needs'
    case 'in-review':
      return 'status-chip-review'
    case 'waiting':
    case 'requested':
      return 'status-chip-waiting'
    default:
      return 'status-chip-needs'
  }
}
