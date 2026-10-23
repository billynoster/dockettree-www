'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

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
}

function NodeMesh({
  node,
  progress,
  reducedMotion,
}: {
  node: NetworkNode
  progress: number
  reducedMotion: boolean
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!ref.current) return
    const pos = lerp3(node.scattered, node.connected, progress)
    ref.current.position.set(pos[0], pos[1], pos[2])
    if (reducedMotion || progress < 0.35) {
      ref.current.scale.setScalar(1)
      return
    }
    const pulse =
      1 +
      Math.sin(performance.now() * 0.0018 + node.id) *
        (node.tier === 'hub' ? 0.05 : 0.03) *
        progress
    ref.current.scale.setScalar(pulse)
  })

  const emissive =
    node.tier === 'hub' ? 0.42 : node.tier === 'branch' ? 0.22 : 0.12

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[node.size, 20, 20]} />
      <meshStandardMaterial
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
}: {
  nodes: NetworkNode[]
  edges: NetworkEdge[]
  progress: number
}) {
  const lineRef = useRef<THREE.LineSegments>(null)
  const positions = useMemo(
    () => new Float32Array(edges.length * 6),
    [edges.length],
  )
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  useFrame(() => {
    if (!lineRef.current) return
    edges.forEach((edge, i) => {
      const a = nodes[edge.from]
      const b = nodes[edge.to]
      const ap = lerp3(a.scattered, a.connected, progress)
      const bp = lerp3(b.scattered, b.connected, progress)
      const o = i * 6
      positions[o] = ap[0]
      positions[o + 1] = ap[1]
      positions[o + 2] = ap[2]
      positions[o + 3] = bp[0]
      positions[o + 4] = bp[1]
      positions[o + 5] = bp[2]
    })
    const attr = geometry.getAttribute('position') as THREE.BufferAttribute
    attr.needsUpdate = true
    const material = lineRef.current.material as THREE.LineBasicMaterial
    material.opacity = 0.1 + progress * 0.48
  })

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color="#78966A"
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </lineSegments>
  )
}

export function NetworkScene({ progress, reducedMotion }: NetworkSceneProps) {
  const { nodes, edges } = useMemo(() => buildNetwork(), [])
  const group = useRef<THREE.Group>(null)
  const clamped = reducedMotion ? 1 : Math.min(1, Math.max(0, progress))

  useFrame((state) => {
    if (!group.current || reducedMotion) return
    group.current.rotation.y = state.clock.elapsedTime * 0.028
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.05
  })

  return (
    <>
      <color attach="background" args={['#123D31']} />
      <fog attach="fog" args={['#123D31', 7, 17]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 2]} intensity={1.0} color="#faf8f3" />
      <pointLight position={[-3, -1, 2]} intensity={0.5} color="#78966A" />
      <pointLight position={[2, 2, -2]} intensity={0.35} color="#D9A441" />

      <group ref={group} position={[0.35, 0.1, 0]} scale={1.05}>
        <EdgeLines nodes={nodes} edges={edges} progress={clamped} />
        {nodes.map((node) => (
          <NodeMesh
            key={node.id}
            node={node}
            progress={clamped}
            reducedMotion={reducedMotion}
          />
        ))}
      </group>
    </>
  )
}
