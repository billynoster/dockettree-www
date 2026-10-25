'use client'

/**
 * Prototype C — intentional SVG branching paths that converge toward
 * the readiness dashboard (right). No particles, no rotation.
 * Resting state is designed to read when completely static.
 */
export function ConnectedPathsBackground({
  reducedMotion,
}: {
  reducedMotion: boolean
}) {
  const drawClass = reducedMotion ? undefined : 'hero-path-draw'

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1280 720"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="paths-glow" cx="72%" cy="48%" r="48%">
          <stop offset="0%" stopColor="#78966A" stopOpacity="0.34" />
          <stop offset="45%" stopColor="#1F5C4A" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#123D31" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="paths-fade-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#123D31" stopOpacity="1" />
          <stop offset="38%" stopColor="#123D31" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#123D31" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1280" height="720" fill="#123D31" />
      <rect width="1280" height="720" fill="url(#paths-glow)" />

      {/* Trunk + branches converge toward dashboard (~x 820–1100, y 280–480) */}
      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={drawClass}
      >
        {/* Primary trunk toward dashboard */}
        <path
          d="M 420 390 C 520 370, 640 340, 780 355 C 880 366, 980 390, 1085 410"
          stroke="#78966A"
          strokeWidth="1.85"
          opacity="0.88"
          pathLength={1}
        />
        {/* Documents branch */}
        <path
          d="M 480 250 C 560 270, 650 300, 780 355"
          stroke="#1F5C4A"
          strokeWidth="1.5"
          opacity="0.9"
          pathLength={1}
          style={{ animationDelay: '120ms' }}
        />
        {/* Properties branch */}
        <path
          d="M 455 520 C 545 490, 650 430, 780 355"
          stroke="#78966A"
          strokeWidth="1.5"
          opacity="0.85"
          pathLength={1}
          style={{ animationDelay: '220ms' }}
        />
        {/* Requests branch */}
        <path
          d="M 560 180 C 640 220, 720 300, 820 360"
          stroke="#1F5C4A"
          strokeWidth="1.35"
          opacity="0.82"
          pathLength={1}
          style={{ animationDelay: '320ms' }}
        />
        {/* Reviews branch */}
        <path
          d="M 590 600 C 670 540, 740 440, 860 385"
          stroke="#78966A"
          strokeWidth="1.35"
          opacity="0.8"
          pathLength={1}
          style={{ animationDelay: '400ms' }}
        />
        {/* Expirations (amber accent path) */}
        <path
          id="hero-signal-path"
          d="M 700 140 C 760 220, 820 300, 920 375 C 980 400, 1040 415, 1100 422"
          stroke="#D9A441"
          strokeWidth="1.55"
          opacity="0.78"
          pathLength={1}
          style={{ animationDelay: '500ms' }}
        />
        {/* Soft canopy cross-link */}
        <path
          d="M 640 280 C 700 320, 740 400, 700 480"
          stroke="#78966A"
          strokeWidth="1.15"
          opacity="0.55"
          pathLength={1}
          style={{ animationDelay: '580ms' }}
        />
        {/* Final fan into dashboard frame */}
        <path
          d="M 920 375 C 980 360, 1040 340, 1110 325"
          stroke="#78966A"
          strokeWidth="1.3"
          opacity="0.72"
          pathLength={1}
          style={{ animationDelay: '640ms' }}
        />
        <path
          d="M 920 375 C 990 400, 1050 450, 1120 490"
          stroke="#1F5C4A"
          strokeWidth="1.3"
          opacity="0.68"
          pathLength={1}
          style={{ animationDelay: '700ms' }}
        />
      </g>

      {/* Minimal nodes at meaningful intersections */}
      <g>
        <circle cx="780" cy="355" r="4.2" fill="#D9A441" opacity="0.9" />
        <circle cx="640" cy="280" r="3" fill="#1F5C4A" opacity="0.85" />
        <circle cx="700" cy="480" r="2.8" fill="#78966A" opacity="0.8" />
        <circle cx="920" cy="375" r="3.4" fill="#78966A" opacity="0.88" />
        <circle cx="560" cy="180" r="2.4" fill="#1F5C4A" opacity="0.7" />
        <circle cx="590" cy="600" r="2.4" fill="#78966A" opacity="0.7" />
        <circle cx="1085" cy="410" r="3.2" fill="#D9A441" opacity="0.75" />
      </g>

      {/* Occasional amber signal along expirations → dashboard path */}
      {!reducedMotion ? (
        <circle r="3.6" fill="#D9A441" opacity="0">
          <animateMotion
            dur="1.5s"
            begin="1.1s;heroSignal.end+5.2s"
            fill="remove"
            path="M 700 140 C 760 220, 820 300, 920 375 C 980 400, 1040 415, 1100 422"
          />
          <animate
            id="heroSignal"
            attributeName="opacity"
            values="0;0.95;0.95;0"
            keyTimes="0;0.12;0.85;1"
            dur="1.5s"
            begin="1.1s;heroSignal.end+5.2s"
            fill="remove"
          />
        </circle>
      ) : null}

      {/* Keep left column quiet for headline readability */}
      <rect width="560" height="720" fill="url(#paths-fade-left)" />
    </svg>
  )
}
