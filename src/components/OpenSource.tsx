import { ArrowUpRight } from "lucide-react"
import { Reveal } from "./Reveal"
import { SectionHeading } from "./SectionHeading"
import Ambient from "./Ambient"
import { ossProjects, type Contribution, type OssProject } from "@/data/contributions"

function Pill({ children, href, filled }: { children: string; href: string; filled?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`font-mono text-[0.7rem] uppercase tracking-[0.12em] transition-colors duration-300 ${
        filled
          ? "bg-accent text-bg hover:bg-accent-bright"
          : "border border-accent text-accent hover:bg-accent hover:text-bg"
      } px-3 py-1.5`}
    >
      {children}
    </a>
  )
}

function ContributionCard({ item }: { item: Contribution }) {
  return (
    <article className="border border-edge bg-surface/60 p-6 transition-colors duration-500 hover:border-accent/50 sm:p-9">
      <div className="flex flex-wrap items-center gap-3">
        <Pill href={item.prUrl} filled>{`PR #${item.pr}`}</Pill>
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-faint">fixes</span>
        <Pill href={item.issueUrl}>{`Issue #${item.issue}`}</Pill>
        <span className="ml-auto font-mono text-[0.68rem] tracking-[0.08em] text-faint">{item.meta}</span>
      </div>

      <p className="mt-5 font-mono text-[0.7rem] leading-relaxed text-faint">{item.issueTitle}</p>

      <h4 className="mt-4 font-serif text-2xl leading-tight text-ink text-balance sm:text-3xl">{item.headline}</h4>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-faint">The problem</p>
          <p className="mt-3 text-[0.93rem] leading-relaxed text-muted">{item.problem}</p>
        </div>
        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-accent">What I built</p>
          <p className="mt-3 text-[0.93rem] leading-relaxed text-ink">{item.solution}</p>
        </div>
      </div>
    </article>
  )
}

function OssBlock({ project }: { project: OssProject }) {
  return (
    <div className="mt-16 first:mt-12">
      <Reveal>
        <div className="flex flex-wrap items-center gap-4">
          <span className="bg-accent px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-bg">
            Open Source
          </span>
          <span className="font-mono text-[0.72rem] text-faint">
            {project.stars} ★ · {project.contributions.length} pull request
            {project.contributions.length === 1 ? "" : "s"}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="group mt-6 inline-flex items-center gap-5"
        >
          <h3 className="font-serif text-5xl leading-[0.95] text-ink text-balance md:text-6xl lg:text-7xl">
            {project.name}
          </h3>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-edge bg-surface-2 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-accent/60 group-hover:text-accent">
            <ArrowUpRight size={20} aria-hidden="true" />
          </span>
        </a>
        <p className="mt-3 font-mono text-[0.85rem] text-accent sm:text-base">{project.tagline}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-faint">What it is</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{project.about}</p>
          </div>
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-accent">My part</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink">{project.myPart}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="mt-10 grid grid-cols-2 gap-6 border-y border-edge py-7 sm:grid-cols-4">
          {project.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl text-accent tabular-nums md:text-4xl">{stat.value}</p>
              <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-faint">{stat.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 space-y-6">
        {project.contributions.map((item, i) => (
          <Reveal key={item.pr} delay={0.06 + i * 0.08}>
            <ContributionCard item={item} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="group mt-8 inline-flex items-center gap-3 border border-accent px-6 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-accent transition-colors duration-300 hover:bg-accent hover:text-bg"
        >
          View the repository
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </a>
      </Reveal>
    </div>
  )
}

export default function OpenSource() {
  return (
    <section id="opensource" className="relative overflow-hidden border-t border-edge/50 bg-bg">
      <Ambient glow="topRight" />
      <div className="container-portfolio relative section-pad">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 right-0 select-none font-serif leading-none text-accent/[0.07]"
          style={{ fontSize: "clamp(7rem, 20vw, 20rem)" }}
        >
          OSS
        </span>

        <div className="relative">
          <SectionHeading index="03" label="open source" title="Contributing upstream" />

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-[0.98rem] leading-relaxed text-muted">
              Bug fixes and features landed in projects I use — with the issue that prompted them, the root cause, and
              what it took to fix.
            </p>
          </Reveal>

          {ossProjects.map((project) => (
            <OssBlock key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
