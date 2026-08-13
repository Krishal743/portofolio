import { Reveal } from "./Reveal"
import { SectionHeading } from "./SectionHeading"
import Ambient from "./Ambient"
import { profile, skillGroups } from "@/data/profile"

export default function About() {
  return (
    <section id="about" className="relative border-t border-edge/50 bg-bg">
      <Ambient glow="topRight" />
      <div className="container-portfolio relative section-pad">
        <SectionHeading index="01" label="profile" title="About / The work I do" />

        <div className="mt-14 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {profile.bio.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08} className="text-[1.02rem] leading-relaxed text-muted">
                <p className={i > 0 ? "mt-5" : ""}>{paragraph}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="mt-10 border border-edge bg-surface">
                <div className="flex items-center justify-between border-b border-edge px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-faint">
                  <span>how I work</span>
                  <span className="text-accent">principles</span>
                </div>
                <ul className="space-y-3 px-5 py-5">
                  {[
                    "Evaluation first — measure before you ship.",
                    "Clean, reviewable code over clever one-liners.",
                    "Design for scale and for the people who maintain it.",
                    "Own the outcome, from research to production.",
                  ].map((principle) => (
                    <li key={principle} className="flex items-start gap-3 text-[0.92rem] leading-relaxed text-muted">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {principle}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="border border-edge bg-surface">
                <div className="flex items-center justify-between border-b border-edge px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-faint">
                  <span>education</span>
                  <span className="text-accent">{profile.education.years}</span>
                </div>
                <div className="px-5 py-5">
                  <p className="font-serif text-xl text-ink">{profile.education.degree}</p>
                  <p className="mt-1 text-sm text-muted">{profile.education.school}</p>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 space-y-8">
              {skillGroups.map((group, i) => (
                <Reveal key={group.name} delay={0.15 + i * 0.08}>
                  <div>
                    <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-faint">{group.name}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="border border-edge bg-surface-2 px-3 py-1.5 font-mono text-[0.72rem] text-muted transition-colors duration-200 hover:border-accent/50 hover:text-ink"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}