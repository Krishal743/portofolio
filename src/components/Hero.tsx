import { lazy, Suspense, useRef, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import GradualBlur from "./GradualBlur"
import Constellation from "./Constellation"
import SpecularButton from "./SpecularButton"
import BlurText from "./BlurText"
import DecryptedText from "./DecryptedText"
import { profile } from "@/data/profile"

const LiquidEther = lazy(() => import("./LiquidEther"))

const EASE = [0.16, 1, 0.3, 1] as const

function FadeUp({
  children,
  delay = 0,
  className,
  ready = true,
}: {
  children: ReactNode
  delay?: number
  className?: string
  /** Held false while the intro curtain is up, so nothing in the hero
   *  finishes animating behind an opaque overlay. */
  ready?: boolean
}) {
  const reduce = useReducedMotion()
  const hidden = { opacity: 0, y: reduce ? 0 : 24 }
  return (
    <motion.div
      className={className}
      initial={hidden}
      animate={ready ? { opacity: 1, y: 0 } : hidden}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Hero({ ready = true }: { ready?: boolean }) {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Landing fades out as it travels toward the about section:
  // progress 0 = hero pinned to the top of the viewport,
  // progress 1 = hero's bottom edge has reached the top (fully gone).
  // Faded by 70% so the last stretch isn't a half-visible ghost.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      style={{ opacity }}
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* ambient liquid ether (desktop + motion-favouring users only) */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 hidden opacity-75 lg:block" aria-hidden="true">
          <Suspense fallback={null}>
            <LiquidEther
              colors={["#3a2506", "#6b4a10", "#4a300a", "#1c1205"]}
              resolution={0.32}
              mouseForce={8}
              cursorSize={90}
              autoDemo
              autoSpeed={0.35}
              autoIntensity={1.1}
            />
          </Suspense>
        </div>
      )}

      <div className="container-portfolio relative flex min-h-[100svh] flex-col justify-center py-32 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FadeUp ready={ready} delay={0.05}>
              <p className="mb-6 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-muted">
                <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                {profile.role} · {profile.location}
              </p>
            </FadeUp>

            <FadeUp ready={ready} delay={0.15}>
              <h1 className="font-serif text-5xl leading-[1.02] text-ink text-balance md:text-7xl">
                {reduce || !ready ? (
                  profile.name
                ) : (
                  <DecryptedText
                    text={profile.name}
                    animateOn="view"
                    sequential
                    revealDirection="start"
                    speed={45}
                    maxIterations={3}
                    useOriginalCharsOnly
                  />
                )}
              </h1>
            </FadeUp>

            <FadeUp ready={ready} delay={0.25}>
              {reduce || !ready ? (
                <p className="mt-6 max-w-xl font-serif text-xl leading-snug text-muted text-balance md:text-2xl">
                  {profile.tagline}
                </p>
              ) : (
                <BlurText
                  text={profile.tagline}
                  animateBy="words"
                  direction="bottom"
                  delay={90}
                  stepDuration={0.32}
                  className="mt-6 max-w-xl font-serif text-xl leading-snug text-muted text-balance md:text-2xl"
                />
              )}
            </FadeUp>

            <FadeUp ready={ready} delay={0.38}>
              <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted">
                Research-backed ML and distributed systems — from IEEE-published work on LLM reliability to streaming
                pipelines and privacy-preserving federated learning.
              </p>
            </FadeUp>

            <FadeUp ready={ready} delay={0.5}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <SpecularButton
                  href={profile.resume}
                  size="md"
                  tint="#d9a441"
                  tintOpacity={0.12}
                  lineColor="#e8c07d"
                  baseColor="#7a6326"
                  textColor="#f0ede6"
                  className="font-mono uppercase tracking-[0.15em] text-[0.78rem]"
                  rel="noreferrer"
                >
                  Résumé
                </SpecularButton>
                <SpecularButton
                  href={profile.github}
                  size="md"
                  tint="#ffffff"
                  tintOpacity={0.03}
                  lineColor="#f0ede6"
                  baseColor="#4a4a4a"
                  textColor="#c9c4b8"
                  className="font-mono uppercase tracking-[0.15em] text-[0.78rem]"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </SpecularButton>
              </div>
            </FadeUp>

            <FadeUp ready={ready} delay={0.62}>
              <dl className="mt-14 grid max-w-xl grid-cols-1 gap-px overflow-hidden border border-edge bg-edge sm:grid-cols-2">
                {[
                  { label: "University", value: `${profile.education.school} · ${profile.education.years}` },
                  { label: "Degree", value: profile.education.degree },
                  { label: "Focus", value: "LLMs · Federated Learning · Systems" },
                  { label: "Status", value: "Final year · open to roles" },
                ].map((row) => (
                  <div key={row.label} className="bg-bg p-4">
                    <dt className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-faint">{row.label}</dt>
                    <dd className="mt-1 text-sm text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </FadeUp>
          </div>

          <div className="lg:col-span-5">
            <FadeUp ready={ready} delay={0.35}>
              <figure className="overflow-hidden border border-edge bg-surface/60">
                <div className="flex items-center justify-between border-b border-edge px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-faint">
                  <span>[ system . neural-constellation ]</span>
                  <span className="text-accent">{profile.education.years}</span>
                </div>

                <div className="p-3">
                  <div className="pointer-events-none relative h-64 overflow-hidden border border-edge bg-bg/40 md:h-80">
                    <div className="absolute inset-0">
                      <Constellation />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.25em]">
                  <span className="text-muted">node.graph — active</span>
                  <span className="text-faint">drift·cursor — on</span>
                </div>
              </figure>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* cinematic fade into the next section */}
      <GradualBlur preset="smooth" position="bottom" className="pointer-events-none !bottom-0 h-[9rem] z-10" />

      {/* scroll cue */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }}
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-faint">scroll</span>
        <motion.span
          className="block h-8 w-px bg-accent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        />
      </motion.a>
    </motion.section>
  )
}