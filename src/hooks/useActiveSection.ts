import { useEffect, useState } from "react"

export const SECTION_IDS = ["hero", "about", "projects", "opensource", "contact"] as const
export type SectionId = (typeof SECTION_IDS)[number]

export function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>("hero")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId)
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    )

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return active
}