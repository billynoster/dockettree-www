export type NetworkNode = {
  id: number
  scattered: [number, number, number]
  connected: [number, number, number]
  size: number
  kind: 'evergreen' | 'moss' | 'amber'
}

export type NetworkEdge = {
  from: number
  to: number
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Seeded graph: scattered cloud → connected canopy around a center hub. */
export function buildNetwork(count = 48) {
  const rand = mulberry32(20261005)
  const nodes: NetworkNode[] = []

  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2 + rand() * 0.35
    const ring = 0.55 + (i % 5) * 0.55 + rand() * 0.2
    const connected: [number, number, number] = [
      Math.cos(angle) * ring,
      (rand() - 0.5) * 1.4,
      Math.sin(angle) * ring * 0.72,
    ]

    const scatterR = 3.2 + rand() * 3.8
    const scatterA = rand() * Math.PI * 2
    const scattered: [number, number, number] = [
      Math.cos(scatterA) * scatterR,
      (rand() - 0.5) * 4.2,
      Math.sin(scatterA) * scatterR,
    ]

    const kindRoll = rand()
    const kind: NetworkNode['kind'] =
      kindRoll > 0.86 ? 'amber' : kindRoll > 0.55 ? 'moss' : 'evergreen'

    nodes.push({
      id: i,
      scattered,
      connected,
      size: 0.045 + rand() * 0.05,
      kind,
    })
  }

  // Hub node near origin for the brand center
  nodes[0] = {
    ...nodes[0],
    connected: [0, 0.05, 0],
    size: 0.11,
    kind: 'amber',
  }

  const edges: NetworkEdge[] = []
  for (let i = 1; i < nodes.length; i += 1) {
    // Connect outward nodes toward nearer neighbors + hub for a tree feel
    edges.push({ from: 0, to: i })
    if (i > 1) {
      edges.push({ from: i - 1, to: i })
    }
    if (i > 4 && i % 3 === 0) {
      edges.push({ from: i - 4, to: i })
    }
  }

  return { nodes, edges }
}

export function lerp3(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  const e = t * t * (3 - 2 * t)
  return [
    a[0] + (b[0] - a[0]) * e,
    a[1] + (b[1] - a[1]) * e,
    a[2] + (b[2] - a[2]) * e,
  ]
}

export const NODE_COLORS = {
  evergreen: '#1F5C4A',
  moss: '#78966A',
  amber: '#D9A441',
} as const
