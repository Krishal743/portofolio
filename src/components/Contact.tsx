import { useReducedMotion } from "framer-motion"
import type { ComponentType } from "react"
import { Mail, FileText, ArrowUpRight } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "./BrandIcons"
import LineWaves from "./LineWaves"
import { Reveal } from "./Reveal"
import { SectionHeading } from "./SectionHeading"
import { profile } from "@/data/profile"

export default function Contact() {
  const reduce = useReducedMotion()
  const channels: {
    label: string
    note: string
    href: string
    icon: ComponentType<{ size?: number; className?: string }>
  }[] = [
    { icon: Mail, label: "Email", note: profile.email, href: `mailto:${profile.email}` },
    { icon: GithubIcon, label: "GitHub", note: "@Krishal743", href: profile.github },
    { icon: LinkedinIcon, label: "LinkedIn", note: "krishal-hriday", href: profile.linkedin },
    { icon: FileText, label: "Résumé", note: "download PDF", href: profile.resume },
  ]

  return (
    <section id="contact" className="relative border-t border-edge/50 overflow-hidden bg-bg">
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 opacity-65" aria-hidden="true">
          <LineWaves
            speed={0.2}
            innerLineCount={26}
            outerLineCount={30}
            warpIntensity={1.1}
            rotation={-45}
            edgeFadeWidth={0.28}
            colorCycleSpeed={0.6}
            brightness={0.5}
            color1="#d9a441"
            color2="#6b5426"
            color3="#2c2412"
            enableMouseInteraction={false}
          />
        </div>
      )}

      {/* legibility wash over the waves */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-bg/85 to-bg" aria-hidden="true" />

      <div className="container-portfolio section-pad relative">
        <SectionHeading index="03" label="contact" title="Let's build something rigorous" />

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-[0.98rem] leading-relaxed text-muted">
            Open to AI/ML and software engineering roles, research collaborations, and hard problems worth solving.
            I usually reply within a day.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={0.12 + i * 0.06}>
              <a
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center justify-between gap-6 border border-edge bg-surface/80 p-6 transition-all duration-300 hover:border-accent/60 hover:bg-surface"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center border border-edge bg-surface-2 text-accent transition-colors duration-300 group-hover:border-accent/60">
                    <channel.icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-faint">{channel.label}</p>
                    <p className="mt-1 text-sm text-ink">{channel.note}</p>
                  </div>
                </div>
                {channel.label === "Email" ? (
                  <span className="font-serif text-2xl text-muted transition-colors duration-300 group-hover:text-accent">
                    →
                  </span>
                ) : (
                  <ArrowUpRight
                    size={16}
                    className="text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                )}
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <a
            href={`mailto:${profile.email}`}
            className="mt-16 block font-serif text-2xl leading-tight text-ink underline decoration-accent/50 decoration-1 underline-offset-8 transition-colors duration-300 hover:text-accent md:text-4xl text-balance"
          >
            {profile.email}
          </a>
        </Reveal>
      </div>
    </section>
  )
}