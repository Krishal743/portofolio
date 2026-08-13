import { ArrowUp } from "lucide-react"
import { profile } from "@/data/profile"
import { scrollToId } from "@/lib/scroll"
import Ambient from "./Ambient"

export default function Footer() {
  return (
    <footer className="relative border-t border-edge/60 bg-bg">
      <Ambient glow="center" grid={false} className="opacity-60" />
      <div className="container-portfolio relative flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.25em] text-faint">
          © {new Date().getFullYear()} {profile.name}
          <span className="mx-2 text-edge">·</span>
          <span className="text-muted">built with React Bits + taste</span>
        </p>

        <div className="flex items-center gap-6">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToId("hero") }} className="font-mono text-[0.68rem] uppercase tracking-[0.25em] text-muted transition-colors duration-200 hover:text-accent">
            back to top
          </a>
          <button
            onClick={() => scrollToId("hero")}
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center border border-edge text-muted transition-colors duration-200 hover:border-accent/60 hover:text-accent"
          >
            <ArrowUp size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}