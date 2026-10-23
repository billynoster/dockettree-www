/** Shared motion tokens — keep purposeful, not decorative. */
export const MOTION = {
  hover: { duration: 0.18, ease: 'easeOut' as const },
  button: { duration: 0.18, ease: 'easeOut' as const },
  enter: { duration: 0.48, ease: 'easeOut' as const },
  section: { duration: 0.65, ease: 'easeInOut' as const },
  networkIntro: { duration: 2.4 },
  pulse: { duration: 2.1, ease: 'easeInOut' as const },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: MOTION.enter,
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: MOTION.enter,
  },
}
