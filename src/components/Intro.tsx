import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { profile } from "@/data/profile"
import { markIntroPlayed } from "@/lib/intro"

const EASE = [0.16, 1, 0.3, 1] as const

const REVEAL_AT = 1150
const COMPLETE_AT = 1650

/** 0 → 100 counter. Starts after `delay`, ramps over `duration`. */
function Counter({ delay, duration }: { delay: number; duration: number }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let raf = 0
    let t0 = 0
    const tick = (now: number) => {
      if (!t0) t0 = now
      const p = Math.min(1, Math.max(0, (now - t0 - delay) / duration))
      setValue(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [delay, duration])

  return <>{value}</>
}

export default function Intro({
  onReveal,
  onComplete,
}: {
  /** Fired as the curtain starts lifting, so the hero can begin animating
   *  behind it rather than finishing unseen. */
  onReveal: () => void
  /** Fired once the curtain has fully gone; the overlay unmounts. */
  onComplete: () => void
}) {
  const reduce = useReducedMotion()
  const [wiping, setWiping] = useState(false)

  // Lock scrolling for the duration of the curtain.
  useEffect(() => {
    document.body.style.overflow = "hidden"
    markIntroPlayed()
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(() => {
    if (reduce) {
      onReveal()
      onComplete()
      return
    }
    const reveal = window.setTimeout(onReveal, REVEAL_AT)
    const wipe = window.setTimeout(() => setWiping(true), REVEAL_AT)
    const done = window.setTimeout(onComplete, COMPLETE_AT)
    return () => {
      window.clearTimeout(reveal)
      window.clearTimeout(wipe)
      window.clearTimeout(done)
    }
  }, [reduce, onReveal, onComplete])

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-bg px-4"
      initial={{ opacity: 1, scale: 1 }}
      animate={wiping ? { opacity: 0, scale: 1.4 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {/* Masked slide-up: the wrapper clips, the h1 travels from below.
          The padding lives on the h1 (not the wrapper) so `em` resolves
          against its own clamp() size — with leading-[0.9] the glyphs
          overflow the line box top *and* bottom, and "Hriday" has a
          descender that would otherwise be sheared off. */}
      <div className="overflow-hidden">
        <motion.h1
          className="py-[0.25em] text-center font-serif leading-[0.9] text-accent text-[clamp(2.25rem,11vw,8rem)] text-balance"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          {profile.name}
        </motion.h1>
      </div>

      <motion.div
        className="font-serif leading-none text-ink text-[clamp(3.5rem,16vw,13rem)] tabular-nums"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.45 }}
      >
        <Counter delay={450} duration={700} />
      </motion.div>
    </motion.div>
  )
}
