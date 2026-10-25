export type HeroVariant = 'static' | 'layered' | 'intelligent'

/** Try Live comparison: `/?hero=static|layered|intelligent` (default static). */
export function parseHeroVariant(raw: string | null | undefined): HeroVariant {
  if (raw === 'layered' || raw === 'intelligent' || raw === 'static') return raw
  return 'static'
}

export const HERO_VARIANT_HELP = {
  static: 'Approved static hero (baseline)',
  layered: 'Concept B — translucent layered product reveal',
  intelligent: 'Intelligent dashboard piece-by-piece reveal',
} as const
