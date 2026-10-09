import SpecularButton from "./SpecularButton"
import { Reveal } from "./Reveal"
import { SectionHeading } from "./SectionHeading"
import Ambient from "./Ambient"
import ScrollWords from "./ScrollWords"
import { projects, type Project } from "@/data/projects"
import type { ReactNode } from "react"

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="border border-edge bg-surface-2 px-3 py-1.5 font-mono text-[0.72rem] text-muted transition-colors duration-200 hover:border-accent/50 hover:text-ink">
      {children}
    </span>
  )
}

function ProjectCase({ project, index }: { project: Project; index: number }) {
  return (
    <article className="border-t border-edge/60 py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-3 lg:self-start">
          <Reveal>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-faint">
              case <span className="text-accent">{String(index).padStart(2, "0")}</span>
            </p>
            <p className="mt-6 font-mono text-sm text-muted">[{project.year}]</p>
          </Reveal>
        </div>

        <div className="lg:col-span-9">
          <Reveal>
            <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-accent">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {project.kicker}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h3 className="mt-4 font-serif text-3xl leading-tight text-ink text-balance md:text-4xl">
              {project.title}
            </h3>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-4 max-w-2xl font-serif text-lg leading-snug text-muted text-balance">
              {project.summary}
            </p>
          </Reveal>

          <div className="mt-6 max-w-2xl space-y-4">
            {project.body.map((paragraph, i) => (
              <Reveal key={i} delay={0.16 + i * 0.06}>
                <p className="text-[0.95rem] leading-relaxed text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-10 grid gap-px overflow-hidden border border-edge bg-edge sm:grid-cols-2">
              {project.metrics.map((metric, i) => (
                <Reveal key={i} delay={0.1 + i * 0.05} className="bg-surface">
                  <div className="p-5">
                    <p className="font-serif text-4xl text-accent">{metric.value}</p>
                    <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-faint">
                      {metric.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={0.2}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Chip>{tag}</Chip>
                </li>
              ))}
            </ul>
          </Reveal>

          {project.links.length > 0 && (
            <Reveal delay={0.26}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {project.links.map((link) => (
                  <SpecularButton
                    key={link.label}
                    href={link.href}
                    size="sm"
                    tint="#ffffff"
                    tintOpacity={0.04}
                    lineColor="#f0ede6"
                    baseColor="#3f3f3f"
                    textColor="#c9c4b8"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono uppercase tracking-[0.15em] text-[0.68rem]"
                  >
                    {link.label}
                  </SpecularButton>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative border-t border-edge/50 bg-bg">
      <Ambient glow="bottomLeft" />
      <div className="container-portfolio relative section-pad">
        <SectionHeading index="02" label="work" title="Selected projects" />

        <Reveal delay={0.1}>
          <ScrollWords
            text="A selection of research and systems work. Each project shows how I approach a problem end-to-end — from defining the question to shipping and measuring the result."
            className="mt-8 max-w-2xl text-[0.98rem] leading-relaxed text-muted"
          />
        </Reveal>

        <div className="mt-4">
          {projects.map((project, i) => (
            <ProjectCase key={project.id} project={project} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}