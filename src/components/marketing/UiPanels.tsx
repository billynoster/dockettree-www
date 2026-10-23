import { cn } from '@/lib/utils'

/** Faithful illustrative UI compositions from real Docket Tree status language. */

export function ReadinessPanel({ className }: { className?: string }) {
  const rows = [
    { name: 'Bluewater Janitorial', status: 'Ready', tone: 'ready' },
    { name: 'Cedar Line Landscaping', status: 'Expiring Soon', tone: 'expiring' },
    { name: 'Harborview Plumbing', status: 'Needs Action', tone: 'needs' },
  ] as const
  return (
    <div className={cn('h-full bg-ivory p-4 sm:p-5', className)}>
      <div className="mb-4 flex gap-2">
        {[
          { n: '4', l: 'Ready', c: 'text-[#245e49] bg-[#e6f1eb]' },
          { n: '4', l: 'Needs Action', c: 'text-[#865f12] bg-[#fff3d9]' },
          { n: '7', l: 'In Review', c: 'text-[#655d84] bg-[#eceaf4]' },
          { n: '2', l: 'Expiring', c: 'text-[#865f12] bg-[#fff3d9]' },
        ].map((c) => (
          <div
            key={c.l}
            className={cn('min-w-0 flex-1 rounded-lg px-2 py-2', c.c)}
          >
            <p className="font-display text-lg font-semibold leading-none">{c.n}</p>
            <p className="mt-1 truncate text-[10px] font-medium opacity-80">{c.l}</p>
          </div>
        ))}
      </div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li
            key={r.name}
            className="flex items-center justify-between rounded-lg border border-stone bg-white px-3 py-2.5"
          >
            <span className="text-sm font-medium text-charcoal">{r.name}</span>
            <span
              className={cn(
                'status-chip',
                r.tone === 'ready' && 'status-chip-ready',
                r.tone === 'expiring' && 'status-chip-expiring',
                r.tone === 'needs' && 'status-chip-needs',
              )}
            >
              {r.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ExpirationPanel({ className }: { className?: string }) {
  const items = [
    { name: 'Cedar Line Landscaping', when: 'Expires in 13 days', doc: 'Insurance certificate' },
    { name: 'Summit Fire Protection', when: 'Expires in 18 days', doc: 'COI' },
    { name: 'Granite Peak Roofing', when: 'Expires in 42 days', doc: 'Safety acknowledgment' },
  ]
  return (
    <div className={cn('h-full bg-ivory p-4 sm:p-5', className)}>
      <p className="font-display text-xs font-semibold tracking-[0.14em] text-evergreen uppercase">
        Upcoming expirations
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item.name}
            className="rounded-xl border border-stone bg-white px-4 py-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-charcoal">{item.name}</p>
                <p className="mt-0.5 text-xs text-slate">{item.doc}</p>
              </div>
              <span className="status-chip status-chip-expiring shrink-0">
                Expiring Soon
              </span>
            </div>
            <p className="mt-2 text-xs font-medium text-[#865f12]">{item.when}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function RequestPanel({ className }: { className?: string }) {
  return (
    <div className={cn('h-full bg-ivory p-4 sm:p-5', className)}>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-display text-sm font-semibold">Required documents</p>
        <span className="status-chip status-chip-needs">Needs Action</span>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border border-[#9b4339]/30 bg-white p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">Safety acknowledgment</p>
            <span className="rounded-md bg-evergreen px-2.5 py-1 text-[11px] font-semibold text-ivory">
              Submit document
            </span>
          </div>
          <p className="mt-2 text-xs text-slate">Nothing currently accepted for this requirement.</p>
        </div>
        <div className="rounded-xl border border-stone bg-white p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">Insurance certificate</p>
            <span className="status-chip status-chip-ready">Accepted</span>
          </div>
          <p className="mt-2 text-xs text-slate">Expires May 2, 2027 · in 210 days</p>
        </div>
      </div>
    </div>
  )
}

export function ConnectedRecordsPanel({ className }: { className?: string }) {
  const vendors = [
    'Cedar Line Landscaping',
    'Granite Peak Roofing',
    'Harborview Plumbing',
    'Summit Fire Protection',
  ]
  return (
    <div className={cn('h-full bg-ivory p-4 sm:p-5', className)}>
      <div className="mb-3 flex items-center gap-2">
        <p className="font-display text-sm font-semibold">Maple Business Park</p>
        <span className="status-chip status-chip-ready">Active</span>
      </div>
      <p className="text-xs text-slate">88 Maple Park Dr · 5 linked vendors</p>
      <p className="mt-4 font-display text-[10px] font-semibold tracking-[0.14em] text-slate uppercase">
        Linked vendors
      </p>
      <ul className="mt-2 divide-y divide-stone overflow-hidden rounded-xl border border-stone bg-white">
        {vendors.map((v) => (
          <li key={v} className="px-3 py-2.5 text-sm text-charcoal">
            {v}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function WorkflowStagePanel({
  stage,
}: {
  stage: 'identify' | 'request' | 'waiting' | 'review' | 'ready'
}) {
  const content = {
    identify: {
      title: 'Missing requirement',
      chip: 'Needs Action',
      chipClass: 'status-chip-needs',
      detail: 'Safety acknowledgment missing for Ironwood Pest Control.',
      rows: ['Insurance certificate · Accepted', 'Service agreement · Accepted'],
    },
    request: {
      title: 'Request sent',
      chip: 'Requested',
      chipClass: 'status-chip-waiting',
      detail: 'Document update requested from the vendor. Ownership stays visible.',
      rows: ['Requested by Sep 3, 2026', 'Assigned · Vendor portal'],
    },
    waiting: {
      title: 'Waiting on Vendor',
      chip: 'Waiting',
      chipClass: 'status-chip-waiting',
      detail: 'Request remains open until the vendor submits a document.',
      rows: ['No submission yet', 'Reminder available'],
    },
    review: {
      title: 'In Review',
      chip: 'In Review',
      chipClass: 'status-chip-review',
      detail: 'New submission ready for review against your requirements.',
      rows: ['Insurance certificate v2 submitted', 'Reviewer · Operations'],
    },
    ready: {
      title: 'Ready for work',
      chip: 'Ready',
      chipClass: 'status-chip-ready',
      detail: 'Required items reviewed. Vendor is ready subject to your rules.',
      rows: ['All required current', 'Next expiration · 210 days'],
    },
  }[stage]

  return (
    <div className="h-full rounded-xl border border-stone bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-base font-semibold">{content.title}</p>
        <span className={cn('status-chip', content.chipClass)}>{content.chip}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate">{content.detail}</p>
      <ul className="mt-4 space-y-2">
        {content.rows.map((row) => (
          <li
            key={row}
            className="rounded-lg bg-ivory px-3 py-2 text-xs font-medium text-charcoal"
          >
            {row}
          </li>
        ))}
      </ul>
    </div>
  )
}
