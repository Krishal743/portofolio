import { useReducedMotion } from "framer-motion"

const COPIES = 8

/** Infinite scrolling text band used as a divider between sections.
 *  Static (single copy) under prefers-reduced-motion. */
export default function Marquee({
  text,
  reverse = false,
  className = "",
}: {
  text: string
  reverse?: boolean
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <div className={`relative overflow-hidden py-3 sm:py-4 ${className}`} aria-hidden="true">
      <div
        className="flex w-max items-center whitespace-nowrap font-serif leading-[0.9] text-accent"
        style={{
          fontSize: "clamp(3rem, 11vw, 9rem)",
          animation: reduce
            ? undefined
            : `${reverse ? "marquee-reverse" : "marquee"} ${reverse ? 26 : 32}s linear infinite`,
        }}
      >
        {Array.from({ length: COPIES }, (_, i) => (
          <span key={i} className="mr-[0.14em] flex shrink-0 items-center gap-[0.14em]">
            <span className="text-ink">{text}</span>
            <span className="text-[0.5em] text-accent/70">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
