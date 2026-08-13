import { Reveal } from "./Reveal"

export function SectionHeading({
  index,
  label,
  title,
  className = "",
}: {
  index: string
  label: string
  title: string
  className?: string
}) {
  return (
    <div className={className}>
      <Reveal>
        <p className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-accent">
          <span aria-hidden="true">[</span>
          {index}
          <span aria-hidden="true">/</span>
          {label}
          <span aria-hidden="true">]</span>
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-ink text-balance md:text-5xl">{title}</h2>
        <div className="mt-6 h-px w-16 bg-accent/60" aria-hidden="true" />
      </Reveal>
    </div>
  )
}