'use client'

import { Canvas } from '@react-three/fiber'
import {
  Component,
  Suspense,
  useState,
  type ErrorInfo,
  type ReactNode,
} from 'react'

import { NetworkScene } from '@/components/hero/NetworkScene'

type NetworkCanvasProps = {
  progress: number
  reducedMotion: boolean
}

class WebGLErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onError()
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

export function NetworkCanvas({ progress, reducedMotion }: NetworkCanvasProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  return (
    <WebGLErrorBoundary onError={() => setFailed(true)}>
      <Canvas
        className="h-full w-full"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 7.2], fov: 42, near: 0.1, far: 40 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <NetworkScene progress={progress} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  )
}
