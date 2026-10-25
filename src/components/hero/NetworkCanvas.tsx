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
import type { HeroMotionMode } from '@/lib/heroMotion'

type NetworkCanvasProps = {
  progress: number
  reducedMotion: boolean
  motionMode: HeroMotionMode
  simplified?: boolean
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

export function NetworkCanvas({
  progress,
  reducedMotion,
  motionMode,
  simplified = false,
}: NetworkCanvasProps) {
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

  // Pulse needs a live loop for infrequent edge signals; reveal can demand
  // after settle. Keep always while visible unless reduced-motion / offscreen.
  const needsPulseLoop = motionMode === 'pulse' && !reducedMotion && !simplified
  const frameloop =
    visible && !reducedMotion && (needsPulseLoop || progress < 0.99)
      ? 'always'
      : 'demand'

  return (
    <div ref={wrapRef} className="h-full w-full">
      <WebGLErrorBoundary onError={() => setFailed(true)}>
        <Canvas
          className="h-full w-full"
          dpr={simplified ? [1, 1] : visible ? [1, 1.35] : [1, 1]}
          frameloop={frameloop}
          camera={{ position: [0, 0.2, 7.2], fov: 42, near: 0.1, far: 40 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
        >
          <Suspense fallback={null}>
            <NetworkScene
              progress={progress}
              reducedMotion={reducedMotion}
              motionMode={motionMode}
              simplified={simplified}
            />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  )
}
