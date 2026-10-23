/** Shared date helpers for illustrative marketing demo data. */

const DAY_MS = 86_400_000

/** Calendar day in local TZ as YYYY-MM-DD. */
export function isoDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Start-of-local-day for stable countdown math. */
export function startOfDay(d = new Date()): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/** Days from today (local) to an ISO date. Negative = past. */
export function daysUntil(iso: string, from = startOfDay()): number {
  const [y, m, d] = iso.split('-').map(Number)
  const target = new Date(y, m - 1, d)
  return Math.round((target.getTime() - from.getTime()) / DAY_MS)
}

/** ISO date N days from today. */
export function isoFromToday(offsetDays: number, from = startOfDay()): string {
  const t = new Date(from)
  t.setDate(t.getDate() + offsetDays)
  return isoDate(t)
}

export function formatShortDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/** Human countdown that never disagrees with `daysUntil`. */
export function expirationLabel(iso: string, from = startOfDay()): {
  days: number
  dateLabel: string
  state: 'expired' | 'expiring' | 'ok'
  countdown: string
} {
  const days = daysUntil(iso, from)
  const dateLabel = formatShortDate(iso)
  if (days < 0) {
    return {
      days,
      dateLabel,
      state: 'expired',
      countdown: `Expired ${Math.abs(days)}d ago`,
    }
  }
  if (days === 0) {
    return { days, dateLabel, state: 'expiring', countdown: 'Expires today' }
  }
  if (days <= 45) {
    return {
      days,
      dateLabel,
      state: 'expiring',
      countdown: `Expires in ${days} days`,
    }
  }
  return {
    days,
    dateLabel,
    state: 'ok',
    countdown: `in ${days} days`,
  }
}
