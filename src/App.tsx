import { MotionConfig } from "framer-motion"
import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-bg text-ink antialiased">
        <Nav />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}