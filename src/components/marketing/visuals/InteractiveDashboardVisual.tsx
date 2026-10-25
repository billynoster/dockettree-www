'use client'

import Image from 'next/image'
import {
  useCallback,
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
} from 'react'

import {
  DEMO_SHELL,
  DEMO_SHELL_NAV,
  getDashboardActivity,
  getDashboardAttention,
  getDashboardExpirations,
  getDashboardStatusCards,
  getDashboardTodayLabel,
  type DashboardAttentionRow,
} from '@/lib/marketing/data'
import { cn } from '@/lib/utils'

function NavIcon({ id }: { id: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    'aria-hidden': true as const,
  }
  switch (id) {
    case 'dashboard':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
    case 'vendors':
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="3" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a3 3 0 0 1 0 5.74" />
        </svg>
      )
    case 'properties':
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M5 21V8l7-4 7 4v13" />
          <path d="M9 21v-6h6v6" />
        </svg>
      )
    case 'requests':
      return (
        <svg {...common}>
          <path d="M22 12h-6l-2 3h-4l-2-3H2" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      )
    case 'reviews':
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </svg>
      )
    case 'documents':
      return (
        <svg {...common}>
          <path d="M8 6h13" />
          <path d="M8 12h13" />
          <path d="M8 18h13" />
          <path d="M3 6h.01" />
          <path d="M3 12h.01" />
          <path d="M3 18h.01" />
        </svg>
      )
    case 'reports':
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="M7 16v-5" />
          <path d="M12 16V8" />
          <path d="M17 16v-3" />
        </svg>
      )
    case 'notifications':
      return (
        <svg {...common}>
          <path d="M4 4h16v12H5.17L4 17.17V4z" />
        </svg>
      )
    case 'activity':
      return (
        <svg {...common}>
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      )
  }
}

function attentionChipClass(status: DashboardAttentionRow['status']) {
  switch (status) {
    case 'ready':
      return 'status-chip-ready'
    case 'needs-action':
      return 'status-chip-needs'
    case 'expiring':
      return 'status-chip-ready'
    default:
      return 'status-chip-waiting'
  }
}

function StatusCardIcon({ id }: { id: string }) {
  const common = {
    width: 12,
    height: 12,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }
  switch (id) {
    case 'ready':
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )
    case 'needs':
      return (
        <svg {...common}>
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
        </svg>
      )
    case 'review':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
    case 'expiring':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18" />
          <path d="M8 3v4" />
          <path d="M16 3v4" />
          <circle cx="15.5" cy="15.5" r="2.5" />
          <path d="M15.5 14.2v1.5l1 0.7" />
        </svg>
      )
    default:
      return null
  }
}

type Props = {
  className?: string
}

/**
 * High-fidelity interactive dashboard shell for marketing #product.
 * Demo data only — no auth, APIs, or backend CTAs.
 */
export function InteractiveDashboardVisual({ className }: Props) {
  const labelId = useId()
  const cards = useMemo(() => getDashboardStatusCards(), [])
  const attention = useMemo(() => getDashboardAttention(), [])
  const expirations = useMemo(() => getDashboardExpirations(), [])
  const activity = useMemo(() => getDashboardActivity(), [])
  const today = useMemo(() => getDashboardTodayLabel(), [])

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [focusCard, setFocusCard] = useState<string | null>(null)

  const selected = attention.find((r) => r.id === selectedId) ?? null
  const linkedExpirationId = selected?.expirationLinkId

  const onRowKey = useCallback(
    (e: KeyboardEvent, id: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setSelectedId((cur) => (cur === id ? null : id))
      }
    },
    [],
  )

  return (
    <div
      className={cn(
        'w-full min-w-0 max-w-full overflow-hidden rounded-[18px] border border-stone bg-ivory shadow-[0_28px_64px_rgba(32,38,35,0.1)]',
        className,
      )}
      role="region"
      aria-labelledby={labelId}
    >
      <p id={labelId} className="sr-only">
        Interactive Docket Tree dashboard demonstration with fictional demo
        data. Status cards and rows can be focused or selected; nothing is
        saved.
      </p>

      <div className="grid min-h-[28rem] min-w-0 lg:grid-cols-[13.5rem_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="hidden flex-col border-r border-stone bg-ivory p-3 lg:flex">
          <div className="flex items-center gap-2.5 px-1.5 pb-3">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={28}
              height={28}
              className="rounded-md"
            />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold text-charcoal">
                {DEMO_SHELL.brand}
              </p>
              <p className="truncate text-[10px] text-slate">
                {DEMO_SHELL.orgShort}
              </p>
            </div>
          </div>

          <p className="px-2 pt-1 text-[9px] font-bold tracking-[0.14em] text-slate/80 uppercase">
            Workspace
          </p>
          <nav className="mt-1 space-y-0.5" aria-label="Demo workspace">
            {DEMO_SHELL_NAV.workspace.map((item) => {
              const active = 'active' in item && item.active
              return (
              <span
                key={item.id}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12.5px] font-medium',
                  active
                    ? 'bg-pale-moss text-evergreen'
                    : 'text-charcoal',
                )}
                aria-current={active ? 'page' : undefined}
              >
                <span className="text-slate">
                  <NavIcon id={item.id} />
                </span>
                <span className="truncate">{item.label}</span>
                {'badge' in item && item.badge ? (
                  <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-evergreen px-1 text-[10px] font-bold text-ivory">
                    {item.badge}
                  </span>
                ) : null}
              </span>
            )})}
          </nav>

          <p className="mt-3 px-2 text-[9px] font-bold tracking-[0.14em] text-slate/80 uppercase">
            Records
          </p>
          <nav className="mt-1 space-y-0.5" aria-label="Demo records">
            {DEMO_SHELL_NAV.records.map((item) => (
              <span
                key={item.id}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12.5px] font-medium text-charcoal"
              >
                <span className="text-slate">
                  <NavIcon id={item.id} />
                </span>
                {item.label}
              </span>
            ))}
          </nav>

          <div className="mt-auto border-t border-stone pt-2">
            <p className="flex items-center gap-1.5 px-2 py-1.5 text-[12px] text-slate">
              <span aria-hidden>‹</span> Collapse
            </p>
            <div className="mt-1 flex items-center gap-2 px-1.5 py-1">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pale-moss text-[10px] font-bold text-evergreen">
                {DEMO_SHELL.user.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold">
                  {DEMO_SHELL.user.name}
                </p>
                <p className="truncate text-[10px] text-slate">
                  {DEMO_SHELL.user.email}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-col bg-[#fbfaf7]">
          <header className="flex items-center justify-end gap-2.5 border-b border-stone bg-white px-3 py-2.5 sm:gap-3 sm:px-4">
            <div className="flex h-9 w-full max-w-[16.5rem] items-center gap-2 rounded-lg border border-stone bg-white px-3 text-[12.5px] text-slate sm:max-w-xs md:max-w-sm">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <span className="truncate">Search vendors…</span>
            </div>
            <span
              className="hidden h-8 w-8 shrink-0 items-center justify-center text-slate sm:flex"
              aria-hidden
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" />
              </svg>
            </span>
            <div className="flex shrink-0 items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pale-moss text-[11px] font-bold text-evergreen">
                {DEMO_SHELL.user.initials}
              </span>
              <div className="hidden sm:block">
                <p className="text-[12px] font-semibold leading-tight text-charcoal">
                  {DEMO_SHELL.user.name}
                </p>
                <p className="text-[10px] leading-tight text-slate">
                  {DEMO_SHELL.user.role}
                </p>
              </div>
            </div>
          </header>

          <div className="flex-1 space-y-3 p-3 sm:space-y-4 sm:p-4 lg:p-5">
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] text-slate uppercase">
                Today · {today}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-balance sm:text-xl lg:text-[1.35rem]">
                Good afternoon. Here’s what needs attention.
              </h3>
              <p className="mt-1 text-[12px] text-slate sm:text-[13px]">
                Know who can work, what’s missing or expiring, and what to do
                next · {DEMO_SHELL.timezone}
              </p>
            </div>

            <div
              className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-2.5"
              role="list"
              aria-label="Readiness summary"
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  role="listitem"
                  tabIndex={0}
                  onFocus={() => setFocusCard(card.id)}
                  onBlur={() => setFocusCard((c) => (c === card.id ? null : c))}
                  onMouseEnter={() => setFocusCard(card.id)}
                  onMouseLeave={() =>
                    setFocusCard((c) => (c === card.id ? null : c))
                  }
                  className={cn(
                    'rounded-xl border border-stone bg-white p-2.5 transition-shadow sm:p-3.5',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2',
                    focusCard === card.id &&
                      'shadow-[0_8px_20px_rgba(32,38,35,0.08)] ring-1 ring-evergreen/20',
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="flex items-center gap-1.5 text-[11px] font-semibold text-charcoal sm:text-[12px]">
                      <span
                        className={cn('h-1.5 w-1.5 shrink-0 rounded-full', card.dot)}
                        aria-hidden
                      />
                      {card.label}
                    </p>
                    <span
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-md',
                        card.iconBg,
                        card.iconFg,
                      )}
                      aria-hidden
                    >
                      <StatusCardIcon id={card.id} />
                    </span>
                  </div>
                  <p className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                    {card.n}
                  </p>
                  <p className="mt-1 text-[10px] leading-snug text-slate sm:text-[11px]">
                    {card.hint}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-2.5 lg:grid-cols-[1.35fr_0.9fr] lg:gap-3">
              <div className="rounded-xl border border-stone bg-white p-2.5 sm:p-3">
                <div className="flex min-w-0 items-baseline justify-between gap-2">
                  <p className="shrink-0 font-display text-[10px] font-semibold tracking-[0.12em] text-slate uppercase">
                    Needs Attention
                  </p>
                  <p className="hidden min-w-0 truncate text-[10px] text-slate sm:block">
                    Severity order — expired, corrections, missing, expiring
                  </p>
                </div>
                {!selected ? (
                  <p className="mt-1.5 text-[11px] text-slate/90">
                    Select a vendor to highlight related detail
                  </p>
                ) : null}
                <ul className="mt-2 space-y-1" role="listbox" aria-label="Needs attention">
                  {attention.map((row) => {
                    const isSelected = selectedId === row.id
                    return (
                      <li key={row.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() =>
                            setSelectedId((cur) =>
                              cur === row.id ? null : row.id,
                            )
                          }
                          onKeyDown={(e) => onRowKey(e, row.id)}
                          className={cn(
                            'flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-2 text-left transition-colors',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen',
                            isSelected
                              ? 'bg-pale-moss ring-1 ring-evergreen/25'
                              : 'bg-ivory/80 hover:bg-pale-moss/50',
                          )}
                        >
                          <div className="min-w-0">
                            <p className="truncate text-[12.5px] font-semibold text-charcoal sm:text-sm">
                              {row.name}
                            </p>
                            <p className="truncate text-[11px] text-slate">
                              {row.detail}
                            </p>
                          </div>
                          <div className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center">
                            {row.status === 'expiring' ? (
                              <>
                                <span className="status-chip status-chip-ready">
                                  Ready
                                </span>
                                <span className="status-chip status-chip-expiring hidden sm:inline-flex">
                                  Expiring Soon
                                </span>
                              </>
                            ) : (
                              <span
                                className={cn(
                                  'status-chip',
                                  attentionChipClass(row.status),
                                )}
                              >
                                {row.statusLabel}
                              </span>
                            )}
                          </div>
                        </button>
                      </li>
                    )
                  })}
                </ul>
                {selected ? (
                  <p className="mt-2 text-[11px] text-slate" aria-live="polite">
                    Selected · {selected.name}
                    {selected.expirationLinkId
                      ? ' — related expiration highlighted'
                      : ' — outstanding requirement highlighted in the list'}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2.5">
                <div className="rounded-xl border border-stone bg-white p-2.5 sm:p-3">
                  <p className="font-display text-[10px] font-semibold tracking-[0.12em] text-slate uppercase">
                    Upcoming Expirations
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {expirations.map((item) => (
                      <li
                        key={item.id}
                        className={cn(
                          'rounded-lg px-2 py-2 transition-colors',
                          linkedExpirationId === item.id
                            ? 'bg-pale-moss ring-1 ring-evergreen/25'
                            : 'bg-ivory/80',
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-[12.5px] font-semibold sm:text-sm">
                            {item.vendor}
                          </p>
                          <span className="status-chip status-chip-expiring shrink-0">
                            Expiring Soon
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-slate">
                          {item.detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-stone bg-white p-2.5 sm:p-3">
                  <p className="font-display text-[10px] font-semibold tracking-[0.12em] text-slate uppercase">
                    Recent Activity
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {activity.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-start justify-between gap-2 rounded-lg bg-ivory/80 px-2 py-2"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-[12.5px] font-medium text-charcoal">
                            {item.title}
                          </p>
                          <p className="truncate text-[11px] text-slate">
                            {item.detail}
                          </p>
                        </div>
                        <span className="shrink-0 text-[10px] text-slate">
                          {item.when}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
