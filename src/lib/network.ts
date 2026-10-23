export type NetworkNode = {
  id: number
  label?: string
  scattered: [number, number, number]
  connected: [number, number, number]
  size: number
  kind: 'evergreen' | 'moss' | 'amber'
  tier: 'hub' | 'branch' | 'leaf'
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

/**
 * Intentional readiness topology (Living Readiness Network):
 * Vendor Record hub → Documents / Properties / Requests / Reviews /
 * Expirations / Activity branches with leaf satellites.
 */
export function buildNetwork() {
  const rand = mulberry32(20261022)
  const nodes: NetworkNode[] = []
  const edges: NetworkEdge[] = []

  const push = (
    connected: [number, number, number],
    size: number,
    kind: NetworkNode['kind'],
    tier: NetworkNode['tier'],
    label?: string,
  ) => {
    const id = nodes.length
    const scatterR = 3.4 + rand() * 3.6
    const scatterA = rand() * Math.PI * 2
    nodes.push({
      id,
      label,
      connected,
      scattered: [
        Math.cos(scatterA) * scatterR,
        (rand() - 0.5) * 4,
        Math.sin(scatterA) * scatterR,
      ],
      size,
      kind,
      tier,
    })
    return id
  }

  const hub = push([0, 0.08, 0], 0.14, 'amber', 'hub', 'Vendor Record')

  const branches: {
    label: string
    angle: number
    kind: NetworkNode['kind']
    leaves: number
  }[] = [
    { label: 'Documents', angle: -0.35, kind: 'evergreen', leaves: 4 },
    { label: 'Properties', angle: 0.55, kind: 'moss', leaves: 3 },
    { label: 'Requests', angle: 1.45, kind: 'evergreen', leaves: 4 },
    { label: 'Reviews', angle: 2.25, kind: 'moss', leaves: 3 },
    { label: 'Expirations', angle: 3.35, kind: 'amber', leaves: 3 },
    { label: 'Activity', angle: 4.55, kind: 'evergreen', leaves: 3 },
  ]

  for (const branch of branches) {
    const ring = 1.55 + rand() * 0.18
    const bx = Math.cos(branch.angle) * ring
    const by = (rand() - 0.5) * 0.55
    const bz = Math.sin(branch.angle) * ring * 0.78
    const branchId = push(
      [bx, by, bz],
      0.085,
      branch.kind,
      'branch',
      branch.label,
    )
    edges.push({ from: hub, to: branchId })

    for (let i = 0; i < branch.leaves; i += 1) {
      const leafA = branch.angle + (i - (branch.leaves - 1) / 2) * 0.28
      const leafR = ring + 0.85 + rand() * 0.35
      const leafId = push(
        [
          Math.cos(leafA) * leafR,
          by + (rand() - 0.5) * 0.7,
          Math.sin(leafA) * leafR * 0.78,
        ],
        0.038 + rand() * 0.02,
        i === 0 && branch.kind === 'amber' ? 'amber' : branch.kind,
        'leaf',
      )
      edges.push({ from: branchId, to: leafId })
      if (i > 0 && i % 2 === 0) {
        edges.push({ from: leafId - 1, to: leafId })
      }
    }
  }

  // Soft cross-links between adjacent branches for a connected canopy feel
  const branchIds = nodes.filter((n) => n.tier === 'branch').map((n) => n.id)
  for (let i = 0; i < branchIds.length; i += 1) {
    const next = branchIds[(i + 1) % branchIds.length]
    if (i % 2 === 0) edges.push({ from: branchIds[i], to: next })
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
