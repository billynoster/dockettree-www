import { expirationLabel, isoFromToday } from './dates'
import { getDemoCounts } from './demoVendors'

/** Shared fictional shell identity for Mode 1 interactive dashboard. */
export const DEMO_SHELL = {
  brand: 'Docket Tree',
  org: 'Northshore Property Ops',
  orgShort: 'Northshore Property Ops',
  user: {
    name: 'Jordan Hale',
    email: 'jordan.hale@example.com',
    initials: 'JH',
    role: 'Admin',
  },
  timezone: 'America/Chicago',
} as const

export const DEMO_SHELL_NAV = {
  workspace: [
    { id: 'dashboard', label: 'Dashboard', active: true },
    { id: 'vendors', label: 'Vendors' },
    { id: 'properties', label: 'Properties' },
    { id: 'requests', label: 'Requests' },
    { id: 'reviews', label: 'Reviews', badge: 7 },
    { id: 'documents', label: 'Documents' },
    { id: 'reports', label: 'Reports' },
  ],
  records: [
    { id: 'notifications', label: 'Notifications' },
    { id: 'activity', label: 'Activity' },
    { id: 'settings', label: 'Settings' },
  ],
} as const

export type DashboardAttentionRow = {
  id: string
  name: string
  detail: string
  status: 'needs-action' | 'not-started' | 'ready' | 'expiring'
  statusLabel: string
  /** When set, selecting this row also highlights matching expiration. */
  expirationLinkId?: string
}

export type DashboardExpirationRow = {
  id: string
  vendor: string
  detail: string
  days: number
  dateLabel: string
}

export type DashboardActivityRow = {
  id: string
  title: string
  detail: string
  when: string
}

/** Needs Attention list — severity order, fictional vendors only. */
export function getDashboardAttention(): DashboardAttentionRow[] {
  const cedar = expirationLabel(isoFromToday(13))
  const river = expirationLabel(isoFromToday(18))
  return [
    {
      id: 'summit',
      name: 'Summit Fire Protection',
      detail: 'Insurance certificate expired (renewal awaiting review)',
      status: 'needs-action',
      statusLabel: 'Needs Action',
    },
    {
      id: 'harborview',
      name: 'Harborview Plumbing',
      detail: 'Safety acknowledgment corrections requested',
      status: 'needs-action',
      statusLabel: 'Needs Action',
    },
    {
      id: 'ironwood',
      name: 'Ironwood Pest Control',
      detail: 'Safety acknowledgment missing',
      status: 'needs-action',
      statusLabel: 'Needs Action',
    },
    {
      id: 'willow',
      name: 'Willow Creek Signage',
      detail: 'No required items assigned yet',
      status: 'not-started',
      statusLabel: 'Not Started',
    },
    {
      id: 'cedar',
      name: 'Cedar Line Landscaping',
      detail: `Required document expires in ${cedar.days} days`,
      status: 'expiring',
      statusLabel: 'Ready',
      expirationLinkId: 'exp-cedar',
    },
    {
      id: 'riverstone',
      name: 'Riverstone Mechanical Services',
      detail: `Required document expires in ${river.days} days`,
      status: 'expiring',
      statusLabel: 'Ready',
      expirationLinkId: 'exp-river',
    },
  ]
}

export function getDashboardExpirations(): DashboardExpirationRow[] {
  const cedar = expirationLabel(isoFromToday(13))
  const river = expirationLabel(isoFromToday(18))
  return [
    {
      id: 'exp-cedar',
      vendor: 'Cedar Line Landscaping',
      detail: `Expires in ${cedar.days} days · ${cedar.dateLabel}`,
      days: cedar.days,
      dateLabel: cedar.dateLabel,
    },
    {
      id: 'exp-river',
      vendor: 'Riverstone Mechanical Services',
      detail: `Expires in ${river.days} days · ${river.dateLabel}`,
      days: river.days,
      dateLabel: river.dateLabel,
    },
  ]
}

export function getDashboardActivity(): DashboardActivityRow[] {
  return [
    {
      id: 'a1',
      title: 'Alan Prewitt submitted Insurance certificate v2',
      detail: 'Summit Fire Protection',
      when: '2 hours ago',
    },
    {
      id: 'a2',
      title: 'Safety acknowledgment requested',
      detail: 'Harborview Plumbing',
      when: 'Yesterday',
    },
    {
      id: 'a3',
      title: 'Insurance certificate accepted',
      detail: 'Bluewater Janitorial',
      when: '2 days ago',
    },
  ]
}

export function getDashboardStatusCards() {
  const c = getDemoCounts()
  return [
    {
      id: 'ready' as const,
      label: 'Ready',
      n: c.ready,
      hint: 'Everything currently required is in place.',
      dot: 'bg-[#2f7d5c]',
      iconBg: 'bg-[#e6f1eb]',
      iconFg: 'text-[#2f7d5c]',
    },
    {
      id: 'needs' as const,
      label: 'Needs Action',
      n: c.needsAction,
      hint: 'Something needs attention before work can move forward.',
      dot: 'bg-[#c9842f]',
      iconBg: 'bg-[#fff3d9]',
      iconFg: 'text-[#c9842f]',
    },
    {
      id: 'review' as const,
      label: 'In Review',
      n: c.inReview,
      hint: 'Documents or information currently being reviewed.',
      dot: 'bg-[#7a6bb5]',
      iconBg: 'bg-[#eceaf4]',
      iconFg: 'text-[#7a6bb5]',
    },
    {
      id: 'expiring' as const,
      label: 'Expiring Soon',
      n: c.expiringSoon,
      hint: 'An active requirement is approaching its expiration date.',
      dot: 'bg-[#b7791f]',
      iconBg: 'bg-[#f3f1ec]',
      iconFg: 'text-[#8a7a5c]',
    },
  ]
}

/** Greeting date label — relative “today” for marketing demos. */
export function getDashboardTodayLabel() {
  const d = new Date()
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
