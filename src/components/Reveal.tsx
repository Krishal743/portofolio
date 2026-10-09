import { motion, useReducedMotion, type Variants } from "framer-motion"
import type { PropsWithChildren } from "react"

const DURATION = 0.9
const EASE = [0.16, 1, 0.3, 1] as const

export function Reveal({
  children,
  delay = 0,
  y = 40,
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
    hidden: {
      opacity: 0,
      y: reduce ? 0 : y,
      filter: reduce ? "blur(0px)" : "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: DURATION, ease: EASE, delay },
    },
  }

  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </Comp>
  )
}
