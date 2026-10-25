'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { type HeroWebGLMotionMode, smoothstep } from '@/lib/heroMotion'
import {
  NODE_COLORS,
  buildNetwork,
  lerp3,
  type NetworkEdge,
  type NetworkNode,
} from '@/lib/network'

type NetworkSceneProps = {
  progress: number
  reducedMotion: boolean
  motionMode: HeroWebGLMotionMode
  /** Mobile / simplified: skip traveling pulses, keep morph only. */
  simplified?: boolean
}

function nodeRevealT(node: NetworkNode, globalProgress: number): number {
  if (node.tier === 'hub') {
    return smoothstep(0.05, 0.28, globalProgress)
  }
  const bi = node.branchIndex ?? 0
  const branchStart = 0.22 + bi * 0.11
  const branchEnd = branchStart + 0.14
  if (node.tier === 'branch') {
    return smoothstep(branchStart, branchEnd, globalProgress)
  }
  // Leaves trail their branch slightly
  return smoothstep(branchStart + 0.05, branchEnd + 0.08, globalProgress)
}

function edgeRevealT(
  edge: NetworkEdge,
  nodes: NetworkNode[],
  globalProgress: number,
): number {
  const a = nodes[edge.from]
  const b = nodes[edge.to]
  return Math.min(nodeRevealT(a, globalProgress), nodeRevealT(b, globalProgress))
}

function NodeMesh({
  node,
  progress,
  motionMode,
  reducedMotion,
}: {
  node: NetworkNode
  progress: number
  motionMode: HeroWebGLMotionMode
  reducedMotion: boolean
}) {
  const ref = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame(() => {
    if (!ref.current) return
    const t =
      motionMode === 'reveal' ? nodeRevealT(node, progress) : progress
    const pos = lerp3(node.scattered, node.connected, t)
    ref.current.position.set(pos[0], pos[1], pos[2])
    // Settle & hold: no continuous scale pulse
    ref.current.scale.setScalar(1)
    if (matRef.current && motionMode === 'reveal' && !reducedMotion) {
      matRef.current.opacity = 0.25 + t * 0.75
      matRef.current.transparent = t < 0.98
    }
  })

  const emissive =
    node.tier === 'hub' ? 0.42 : node.tier === 'branch' ? 0.22 : 0.12

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[node.size, 20, 20]} />
      <meshStandardMaterial
        ref={matRef}
        color={NODE_COLORS[node.kind]}
        emissive={NODE_COLORS[node.kind]}
        emissiveIntensity={emissive}
        roughness={0.55}
        metalness={0.08}
      />
    </mesh>
  )
}

function EdgeLines({
  nodes,
  edges,
  progress,
  motionMode,
}: {
  nodes: NetworkNode[]
  edges: NetworkEdge[]
  progress: number
  motionMode: HeroWebGLMotionMode
}) {
  const lineRef = useRef<THREE.LineSegments>(null)
  const positions = useMemo(
    () => new Float32Array(edges.length * 6),
    [edges.length],
  )
  const colors = useMemo(
    () => new Float32Array(edges.length * 6),
    [edges.length],
  )
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  const moss = useMemo(() => new THREE.Color('#78966A'), [])

  useFrame(() => {
    if (!lineRef.current) return
    edges.forEach((edge, i) => {
      const a = nodes[edge.from]
      const b = nodes[edge.to]
      const ta =
        motionMode === 'reveal' ? nodeRevealT(a, progress) : progress
      const tb =
        motionMode === 'reveal' ? nodeRevealT(b, progress) : progress
      const ap = lerp3(a.scattered, a.connected, ta)
      const bp = lerp3(b.scattered, b.connected, tb)
      const o = i * 6
      positions[o] = ap[0]
      positions[o + 1] = ap[1]
      positions[o + 2] = ap[2]
      positions[o + 3] = bp[0]
      positions[o + 4] = bp[1]
      positions[o + 5] = bp[2]

      const et =
        motionMode === 'reveal'
          ? edgeRevealT(edge, nodes, progress)
          : progress
      const alpha = 0.08 + et * 0.5
      colors[o] = moss.r * alpha
      colors[o + 1] = moss.g * alpha
      colors[o + 2] = moss.b * alpha
      colors[o + 3] = moss.r * alpha
      colors[o + 4] = moss.g * alpha
      colors[o + 5] = moss.b * alpha
    })
    ;(geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate =
      true
    ;(geometry.getAttribute('color') as THREE.BufferAttribute).needsUpdate =
      true
    const material = lineRef.current.material as THREE.LineBasicMaterial
    material.opacity = motionMode === 'reveal' ? 1 : 0.1 + progress * 0.48
  })

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color="#78966A"
        transparent
        opacity={0.12}
        depthWrite={false}
        vertexColors={motionMode === 'reveal'}
      />
    </lineSegments>
  )
}

/** Infrequent amber/moss signals traveling along meaningful hub→branch edges. */
function EdgePulses({
  nodes,
  edges,
  progress,
  reducedMotion,
  simplified,
}: {
  nodes: NetworkNode[]
  edges: NetworkEdge[]
  progress: number
  reducedMotion: boolean
  simplified: boolean
}) {
  const pulseEdges = useMemo(
    () => edges.filter((e) => e.meaningful),
    [edges],
  )
  const meshA = useRef<THREE.Mesh>(null)
  const meshB = useRef<THREE.Mesh>(null)
  const state = useRef({
    cycle: 0,
    edgeA: 0,
    edgeB: 1,
    startedAt: 0,
  })

  useFrame((frame) => {
    if (reducedMotion || simplified || progress < 0.45) {
      if (meshA.current) meshA.current.visible = false
      if (meshB.current) meshB.current.visible = false
      return
    }

    const t = frame.clock.elapsedTime
    // New pair every ~5.2s; travel lasts ~1.35s
    const cycle = Math.floor(t / 5.2)
    if (cycle !== state.current.cycle) {
      state.current.cycle = cycle
      state.current.startedAt = t
      state.current.edgeA = cycle % pulseEdges.length
      state.current.edgeB = (cycle + 2) % pulseEdges.length
    }

    const local = (t - state.current.startedAt) / 1.35
    const show = local >= 0 && local <= 1

    const place = (
      mesh: THREE.Mesh | null,
      edgeIndex: number,
      along: number,
      color: string,
    ) => {
      if (!mesh) return
      if (!show || pulseEdges.length === 0) {
        mesh.visible = false
        return
      }
      const edge = pulseEdges[edgeIndex]
      const a = nodes[edge.from]
      const b = nodes[edge.to]
      const ap = lerp3(a.scattered, a.connected, progress)
      const bp = lerp3(b.scattered, b.connected, progress)
      const ease = along * along * (3 - 2 * along)
      mesh.position.set(
        ap[0] + (bp[0] - ap[0]) * ease,
        ap[1] + (bp[1] - ap[1]) * ease,
        ap[2] + (bp[2] - ap[2]) * ease,
      )
      const fade = Math.sin(Math.min(1, Math.max(0, along)) * Math.PI)
      mesh.scale.setScalar(0.55 + fade * 0.65)
      mesh.visible = fade > 0.02
      const mat = mesh.material as THREE.MeshStandardMaterial
      mat.color.set(color)
      mat.emissive.set(color)
      mat.emissiveIntensity = 0.55 + fade * 0.55
      mat.opacity = 0.35 + fade * 0.55
    }

    place(meshA.current, state.current.edgeA, local, '#D9A441')
    place(meshB.current, state.current.edgeB, local, '#78966A')
  })

  if (reducedMotion || simplified) return null

  return (
    <>
      <mesh ref={meshA} visible={false}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial
          color="#D9A441"
          emissive="#D9A441"
          emissiveIntensity={0.7}
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={meshB} visible={false}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial
          color="#78966A"
          emissive="#78966A"
          emissiveIntensity={0.6}
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}

export function NetworkScene({
  progress,
  reducedMotion,
  motionMode,
  simplified = false,
}: NetworkSceneProps) {
  const { nodes, edges } = useMemo(() => buildNetwork(), [])
  const clamped = reducedMotion ? 1 : Math.min(1, Math.max(0, progress))

  return (
    <>
      <color attach="background" args={['#123D31']} />
      <fog attach="fog" args={['#123D31', 7, 17]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 2]} intensity={1.0} color="#faf8f3" />
      <pointLight position={[-3, -1, 2]} intensity={0.5} color="#78966A" />
      <pointLight position={[2, 2, -2]} intensity={0.35} color="#D9A441" />

      {/* Fixed framing — settle & hold (no idle yaw/pitch). */}
      <group position={[0.35, 0.1, 0]} scale={1.05} rotation={[0.02, -0.18, 0]}>
        <EdgeLines
          nodes={nodes}
          edges={edges}
          progress={clamped}
          motionMode={motionMode}
        />
        {motionMode === 'pulse' ? (
          <EdgePulses
            nodes={nodes}
            edges={edges}
            progress={clamped}
            reducedMotion={reducedMotion}
            simplified={simplified}
          />
        ) : null}
        {nodes.map((node) => (
          <NodeMesh
            key={node.id}
            node={node}
            progress={clamped}
            motionMode={motionMode}
            reducedMotion={reducedMotion}
          />
        ))}
      </group>
    </>
  )
}
