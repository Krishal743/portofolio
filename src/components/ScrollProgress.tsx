import { motion, useScroll, useSpring } from "framer-motion"

/** Thin accent bar across the top that fills with spring physics as you
 *  scroll. Sits above the fixed h-14 header (z-50). */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.2,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-[2px] origin-left bg-accent"
    />
  )
}
