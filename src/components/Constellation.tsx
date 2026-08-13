import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  accent: boolean
}

const LINK_DIST = 150
const MOUSE_RADIUS = 260
const MOUSE_FORCE = 1.6

export default function Constellation({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let nodes: Node[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const pointer = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 }

    const makeNodes = () => {
      const area = width * height
      const count = Math.max(40, Math.min(90, Math.round(area / 16000) + 55))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 0.8 + Math.random() * 1.7,
        accent: Math.random() < 0.14,
      }))
    }

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      makeNodes()
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect()
      pointer.targetX = e.clientX - rect.left
      pointer.targetY = e.clientY - rect.top
    }
    const onPointerLeave = () => {
      pointer.targetX = -9999
      pointer.targetY = -9999
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const step = (dt: number) => {
      pointer.x = lerp(pointer.x, pointer.targetX, Math.min(1, dt * 7))
      pointer.y = lerp(pointer.y, pointer.targetY, Math.min(1, dt * 7))

      for (const n of nodes) {
        n.x += n.vx * dt * 60
        n.y += n.vy * dt * 60
        if (n.x < -20) n.x = width + 20
        if (n.x > width + 20) n.x = -20
        if (n.y < -20) n.y = height + 20
        if (n.y > height + 20) n.y = -20
      }
    }

    const edgeShift = (n: Node, axis: "x" | "y") => {
      const dx = n.x - pointer.x
      const dy = n.y - pointer.y
      const dist = Math.hypot(dx, dy)
      if (dist > MOUSE_RADIUS || dist < 1) return 0
      const falloff = 1 - dist / MOUSE_RADIUS
      const push = falloff * falloff * (axis === "x" ? -Math.sign(dx) : -Math.sign(dy)) * MOUSE_FORCE * 6
      return push
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      const shiftX = new Float32Array(nodes.length)
      const shiftY = new Float32Array(nodes.length)
      for (let i = 0; i < nodes.length; i++) {
        shiftX[i] = edgeShift(nodes[i], "x")
        shiftY[i] = edgeShift(nodes[i], "y")
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        const ax = a.x + shiftX[i]
        const ay = a.y + shiftY[i]

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const bx = b.x + shiftX[j]
          const by = b.y + shiftY[j]
          const dx = ax - bx
          const dy = ay - by
          const dist = Math.hypot(dx, dy)
          if (dist > LINK_DIST) continue

          const near = dist < MOUSE_RADIUS
          const alpha = (1 - dist / LINK_DIST) * (near ? 0.34 : 0.16)
          const hue = near ? "207, 164, 65" : "138, 133, 122"
          ctx.strokeStyle = `rgba(${hue}, ${alpha.toFixed(3)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(ax, ay)
          ctx.lineTo(bx, by)
          ctx.stroke()
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const x = n.x + shiftX[i]
        const y = n.y + shiftY[i]
        ctx.fillStyle = n.accent ? "rgba(233, 192, 125, 0.9)" : "rgba(240, 237, 230, 0.55)"
        ctx.beginPath()
        ctx.arc(x, y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let raf = 0
    let last = performance.now()
    let running = false

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!running) return
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      step(dt)
      draw()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && !document.hidden
        if (reduce) return
        if (visible && !running) {
          running = true
          last = performance.now()
          raf = requestAnimationFrame(loop)
        } else if (!visible && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0.02 },
    )

    const onVisibility = () => {
      if (document.hidden && running) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!document.hidden && !running && !reduce) {
        running = true
        last = performance.now()
        raf = requestAnimationFrame(loop)
      }
    }

    resize()
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    wrap.addEventListener("pointerleave", onPointerLeave)
    document.addEventListener("visibilitychange", onVisibility)
    io.observe(wrap)
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    if (reduce) {
      draw()
    } else {
      running = true
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      running = false
      window.removeEventListener("pointermove", onPointerMove)
      wrap.removeEventListener("pointerleave", onPointerLeave)
      document.removeEventListener("visibilitychange", onVisibility)
      io.disconnect()
      ro.disconnect()
    }
  }, [reduce])

  return (
    <div ref={wrapRef} className={`constellation relative h-full w-full overflow-hidden ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="block" />
    </div>
  )
}