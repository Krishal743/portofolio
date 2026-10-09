import { Fragment, useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion"

const FADED = 0.12

function Word({
  children,
  range,
  progress,
}: {
  children: string
  range: [number, number]
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, range, [FADED, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

/** Words fade from 0.12 → 1 opacity as the paragraph scrolls through
 *  `start 0.85` → `start 0.25`.
 *
 *  Intended for short intro lines only — on long body copy most words would
 *  sit near-invisible while the reader is still reading them. Real spaces sit
 *  between the spans (not margins) so the line still wraps normally. */
export default function ScrollWords({
  text,
  className = "",
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  })

  const words = text.split(" ")

  return (
    <p ref={ref} className={className}>
      {reduce
        ? text
        : words.map((word, i) => (
            <Fragment key={`${word}-${i}`}>
              {i > 0 ? " " : null}
              <Word
                range={[i / words.length, (i + 1) / words.length]}
                progress={scrollYProgress}
              >
                {word}
              </Word>
            </Fragment>
          ))}
    </p>
  )
}
