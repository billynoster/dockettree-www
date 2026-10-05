'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

import { NetworkScene } from '@/components/hero/NetworkScene'

type NetworkCanvasProps = {
  progress: number
  reducedMotion: boolean
}

export function NetworkCanvas({ progress, reducedMotion }: NetworkCanvasProps) {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, 7.2], fov: 42, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <NetworkScene progress={progress} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  )
}
