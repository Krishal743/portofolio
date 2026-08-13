import { motion, useReducedMotion, type Variants } from "framer-motion"
import type { PropsWithChildren } from "react"

const DURATION = 0.7
const EASE = [0.16, 1, 0.3, 1] as const

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: PropsWithChildren<{
  delay?: number
  y?: number
  className?: string
  as?: "div" | "section" | "span" | "li" | "article"
}>) {
  const reduce = useReducedMotion()
  const Comp = motion[as]

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION, ease: EASE, delay },
    },
  }

  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-60px" }}
    >
      {children}
    </Comp>
  )
}