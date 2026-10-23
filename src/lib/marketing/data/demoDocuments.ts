import { expirationLabel, isoFromToday } from './dates'

export function getDemoDocuments() {
  const insuranceIso = isoFromToday(210)
  const insurance = expirationLabel(insuranceIso)
  return [
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
      note: `Expires ${insurance.dateLabel} · ${insurance.countdown}`,
      expirationIso: insuranceIso,
      days: insurance.days,
    },
    {
      id: 'd3',
      title: 'Service agreement',
      state: 'accepted' as const,
      note: 'Current · no expiration',
    },
  ] as const
}

export type DemoDocument = ReturnType<typeof getDemoDocuments>[number]
