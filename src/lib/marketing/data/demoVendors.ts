import { expirationLabel, isoFromToday } from './dates'

/**
 * Fictional demo vendors for marketing compositions only.
 * Not real customers. Status vocabulary matches the product.
 */
export type DemoStatus =
  | 'ready'
  | 'needs-action'
  | 'in-review'
  | 'waiting'
  | 'expiring'
  | 'not-started'

export const STATUS_LABEL: Record<DemoStatus, string> = {
  ready: 'Ready',
  'needs-action': 'Needs Action',
  'in-review': 'In Review',
  waiting: 'Waiting on Vendor',
  expiring: 'Expiring Soon',
  'not-started': 'Not Started',
}

export function statusChipClass(
  status: DemoStatus | 'missing' | 'accepted' | 'requested' | 'expired',
) {
  switch (status) {
    case 'ready':
    case 'accepted':
      return 'status-chip-ready'
    case 'needs-action':
    case 'expiring':
    case 'missing':
    case 'expired':
    case 'not-started':
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

/** Relative offsets keep date labels and day counts in sync. */
const VENDOR_DEFS = [
  {
    id: 'v1',
    name: 'Bluewater Janitorial',
    trade: 'Cleaning',
    status: 'ready' as const,
    property: 'Maple Business Park',
    expirationOffset: 165,
    blocker: null as string | null,
  },
  {
    id: 'v2',
    name: 'Cedar Line Landscaping',
    trade: 'Grounds',
    status: 'expiring' as const,
    property: 'Riverfront Offices',
    expirationOffset: 13,
    blocker: null as string | null,
  },
  {
    id: 'v3',
    name: 'Harborview Plumbing',
    trade: 'Plumbing',
    status: 'needs-action' as const,
    property: 'Westfield Plaza',
    expirationOffset: null as number | null,
    blocker: 'Safety acknowledgment missing',
  },
  {
    id: 'v4',
    name: 'Granite Peak Roofing',
    trade: 'Roofing',
    status: 'in-review' as const,
    property: 'Maple Business Park',
    expirationOffset: 59,
    blocker: 'Insurance certificate awaiting review',
  },
  {
    id: 'v5',
    name: 'Summit Fire Protection',
    trade: 'Fire safety',
    status: 'needs-action' as const,
    property: 'Riverfront Offices',
    expirationOffset: 18,
    blocker: 'Insurance certificate expired',
  },
] as const

export function getDemoVendors() {
  return VENDOR_DEFS.map((v) => {
    const iso =
      v.expirationOffset == null ? null : isoFromToday(v.expirationOffset)
    const exp = iso ? expirationLabel(iso) : null
    return {
      id: v.id,
      name: v.name,
      trade: v.trade,
      status: v.status,
      property: v.property,
      nextExpiration: iso,
      days: exp?.days ?? null,
      dateLabel: exp?.dateLabel ?? null,
      countdown: exp?.countdown ?? null,
      expirationState: exp?.state ?? null,
      blocker: v.blocker,
    }
  })
}

export type DemoVendor = ReturnType<typeof getDemoVendors>[number]

/**
 * Portfolio summary metrics for the readiness overview (illustrative totals).
 * Intentionally not a literal count of the sample rows below — mirrors how
 * the app summary cards reflect the full org, not the visible list slice.
 */
export function getDemoCounts() {
  return {
    ready: 4,
    needsAction: 4,
    inReview: 7,
    expiringSoon: 2,
  } as const
}
