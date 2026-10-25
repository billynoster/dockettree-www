export type HeroMotionMode = 'pulse' | 'reveal' | 'paths'

/** Three.js variants only — paths uses SVG. */
export type HeroWebGLMotionMode = 'pulse' | 'reveal'

export const HERO_MOTION_PARAM = 'heroMotion'

export const HERO_MOTION_OPTIONS = [
  {
    id: 'pulse' as const,
    label: 'Pulse along edges',
    short: 'Pulse',
  },
  {
    id: 'reveal' as const,
    label: 'Branch reveal',
    short: 'Reveal',
  },
  {
    id: 'paths' as const,
    label: 'SVG connected paths',
    short: 'Paths',
  },
] as const

/** Default when Billy lands without choosing — safer settle+hold path. */
export const DEFAULT_HERO_MOTION: HeroMotionMode = 'pulse'

export function parseHeroMotion(value: string | null | undefined): HeroMotionMode {
  if (value === 'paths' || value === 'svg' || value === 'c') return 'paths'
  if (value === 'reveal' || value === 'branch' || value === 'b') return 'reveal'
  if (value === 'pulse' || value === 'a') return 'pulse'
  return DEFAULT_HERO_MOTION
}

export function isWebGLHeroMotion(
  mode: HeroMotionMode,
): mode is HeroWebGLMotionMode {
  return mode === 'pulse' || mode === 'reveal'
}

/** Branch reveal order (Activity last). Matches readiness topology labels. */
export const REVEAL_BRANCH_ORDER = [
  'Documents',
  'Properties',
  'Requests',
  'Reviews',
  'Expirations',
  'Activity',
] as const

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / Math.max(edge1 - edge0, 1e-6)))
  return t * t * (3 - 2 * t)
}
