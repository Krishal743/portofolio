import { useCallback, useState } from "react"
import { MotionConfig } from "framer-motion"
import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Projects from "@/components/Projects"
import OpenSource from "@/components/OpenSource"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import Intro from "@/components/Intro"
import ScrollProgress from "@/components/ScrollProgress"
import Marquee from "@/components/Marquee"
import { introShouldSkip } from "@/lib/intro"

export default function App() {
  // Decided once per mount: does this visit get the curtain at all?
  const [skipped] = useState(introShouldSkip)
  const [introPlaying, setIntroPlaying] = useState(!skipped)
  // The hero holds its animations until the curtain starts lifting.
  const [ready, setReady] = useState(skipped)

  const handleReveal = useCallback(() => setReady(true), [])
  const handleComplete = useCallback(() => setIntroPlaying(false), [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-bg text-ink antialiased">
        {introPlaying && <Intro onReveal={handleReveal} onComplete={handleComplete} />}
        <ScrollProgress />
        <Nav />
        <main>
          <Hero ready={ready} />
          <Marquee text="AI · Systems · Research" />
          <About />
          <Marquee text="Selected Work" reverse />
          <Projects />
          <Marquee text="Open Source" />
          <OpenSource />
          <Marquee text="Get in touch" reverse />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
