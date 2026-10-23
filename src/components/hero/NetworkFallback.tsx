/** Non-WebGL atmosphere so the hero never looks empty. Intentional hub + branches. */
export function NetworkFallback({ progress }: { progress: number }) {
  const p = Math.min(1, Math.max(0, progress))

  const hub = [68, 42] as const
  const branches = [
    { tip: [48, 22], leaf: [36, 14], color: '#1F5C4A' },
    { tip: [82, 18], leaf: [90, 10], color: '#78966A' },
    { tip: [90, 48], leaf: [96, 58], color: '#1F5C4A' },
    { tip: [78, 72], leaf: [86, 84], color: '#78966A' },
    { tip: [52, 70], leaf: [40, 82], color: '#D9A441' },
    { tip: [42, 48], leaf: [28, 52], color: '#1F5C4A' },
  ]

  const scatter = (x: number, y: number, i: number) => {
    const nx = x + (1 - p) * ((i % 3) - 1) * 12
    const ny = y + (1 - p) * ((i % 4) - 1.5) * 9
    return [nx, ny] as const
  }

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="glow" cx="68%" cy="42%" r="50%">
          <stop offset="0%" stopColor="#78966A" stopOpacity="0.32" />
          <stop offset="55%" stopColor="#1F5C4A" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#123D31" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="#123D31" />
      <rect width="100" height="100" fill="url(#glow)" />
      {branches.map((b, i) => {
        const [tx, ty] = scatter(b.tip[0], b.tip[1], i)
        const [lx, ly] = scatter(b.leaf[0], b.leaf[1], i + 3)
        return (
          <g key={i}>
            <line
              x1={hub[0]}
              y1={hub[1]}
              x2={tx}
              y2={ty}
              stroke="#78966A"
              strokeWidth="0.18"
              opacity={0.12 + p * 0.5}
            />
            <line
              x1={tx}
              y1={ty}
              x2={lx}
              y2={ly}
              stroke="#78966A"
              strokeWidth="0.12"
              opacity={0.08 + p * 0.4}
            />
            <circle
              cx={tx}
              cy={ty}
              r={0.85}
              fill={b.color}
              opacity={0.7 + p * 0.3}
            />
            <circle
              cx={lx}
              cy={ly}
              r={0.45}
              fill={b.color}
              opacity={0.55 + p * 0.35}
            />
          </g>
        )
      })}
      <circle
        cx={hub[0]}
        cy={hub[1]}
        r={1.6}
        fill="#D9A441"
        opacity={0.85 + p * 0.15}
      />
    </svg>
  )
}
