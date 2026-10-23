'use client'

import { Canvas } from '@react-three/fiber'
import {
  Component,
  Suspense,
  useEffect,
  useRef,
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
  const wrapRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (failed) return null

  return (
    <div ref={wrapRef} className="h-full w-full">
      <WebGLErrorBoundary onError={() => setFailed(true)}>
        <Canvas
          className="h-full w-full"
          dpr={visible ? [1, 1.35] : [1, 1]}
          frameloop={visible && !reducedMotion ? 'always' : 'demand'}
          camera={{ position: [0, 0.2, 7.2], fov: 42, near: 0.1, far: 40 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
        >
          <Suspense fallback={null}>
            <NetworkScene progress={progress} reducedMotion={reducedMotion} />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  )
}
