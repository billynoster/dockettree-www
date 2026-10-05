/** Non-WebGL atmosphere so the hero never looks empty. */
export function NetworkFallback({ progress }: { progress: number }) {
  const p = Math.min(1, Math.max(0, progress))
  const nodes = [
    [18, 28],
    [32, 18],
    [48, 34],
    [62, 22],
    [78, 40],
    [26, 52],
    [44, 58],
    [58, 48],
    [72, 62],
    [88, 54],
    [38, 72],
    [54, 78],
    [70, 74],
  ] as const

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="glow" cx="70%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#78966A" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#1F5C4A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#164536" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="#164536" />
      <rect width="100" height="100" fill="url(#glow)" />
      {nodes.map(([x, y], i) => {
        const nx = x + (1 - p) * ((i % 3) - 1) * 14
        const ny = y + (1 - p) * ((i % 4) - 1.5) * 10
        return (
          <g key={i}>
            {i > 0 && (
              <line
                x1={nodes[0][0]}
                y1={nodes[0][1]}
                x2={nx}
                y2={ny}
                stroke="#78966A"
                strokeWidth="0.15"
                opacity={0.1 + p * 0.45}
              />
            )}
            {i > 1 && (
              <line
                x1={nodes[i - 1][0] + (1 - p) * 8}
                y1={nodes[i - 1][1] + (1 - p) * 6}
                x2={nx}
                y2={ny}
                stroke="#78966A"
                strokeWidth="0.12"
                opacity={0.05 + p * 0.35}
              />
            )}
            <circle
              cx={nx}
              cy={ny}
              r={i === 0 ? 1.4 : 0.7}
              fill={i === 0 ? '#D9A441' : i % 3 === 0 ? '#78966A' : '#1F5C4A'}
              opacity={0.75 + p * 0.25}
            />
          </g>
        )
      })}
    </svg>
  )
}
