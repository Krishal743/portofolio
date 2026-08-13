import LineSidebar from "./LineSidebar"
import { useActiveSection } from "@/hooks/useActiveSection"
import { profile } from "@/data/profile"
import { scrollToId } from "@/lib/scroll"
import SpecularButton from "./SpecularButton"

const NAV_ITEMS = ["About", "Projects", "Contact"] as const
const NAV_TARGETS = ["about", "projects", "contact"] as const

export default function Nav() {
  const active = useActiveSection()
  const activeIndex = NAV_TARGETS.findIndex((id) => id === active)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="border-b border-edge/60 bg-bg/70 backdrop-blur-md">
          <div className="container-portfolio flex h-14 items-center justify-between gap-3">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToId("hero")
              }}
              className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-ink whitespace-nowrap"
            >
              <span className="text-accent">KH</span>.Hriday
            </a>

            <nav className="flex items-center gap-4 lg:hidden md:gap-7" aria-label="Primary">
              {NAV_ITEMS.map((label, i) => (
                <a
                  key={label}
                  href={`#${NAV_TARGETS[i]}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(NAV_TARGETS[i])
                  }}
                  className={`font-mono text-[0.7rem] uppercase tracking-[0.2em] transition-colors duration-200 ${
                    active === NAV_TARGETS[i] ? "text-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>

            <SpecularButton
              href={profile.resume}
              size="sm"
              tint="#d9a441"
              tintOpacity={0.06}
              lineColor="#e8c07d"
              baseColor="#8a857a"
              textColor="#f0ede6"
              className="font-mono uppercase tracking-[0.15em] text-[0.68rem]"
              rel="noreferrer"
            >
              Resume
            </SpecularButton>
          </div>
        </div>
      </header>

      <aside className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 lg:block" aria-label="Section">
        <LineSidebar
          items={[...NAV_ITEMS]}
          accentColor="#d9a441"
          textColor="#5c574f"
          markerColor="#232323"
          maxShift={14}
          itemGap={18}
          fontSize={0.85}
          markerLength={48}
          tickScale={0.4}
          activeIndex={activeIndex === -1 ? null : activeIndex}
          onItemClick={(_, label) => {
            const idx = NAV_ITEMS.findIndex((l) => l === label)
            if (idx >= 0) scrollToId(NAV_TARGETS[idx])
          }}
        />
      </aside>
    </>
  )
}