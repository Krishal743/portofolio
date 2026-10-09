const SESSION_KEY = "kh-intro-played"

/** Decided once, at mount: whether this visit should skip the opening curtain.
 *
 *  `?nointro` skips it, `?intro` forces a replay (useful while iterating on
 *  it), otherwise it plays once per session. Reduced motion and hidden tabs
 *  always skip, unconditionally.
 *
 *  Lives outside Intro.tsx so the component file exports only components. */
export function introShouldSkip(): boolean {
  if (typeof window === "undefined") return true
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true
  if (document.visibilityState === "hidden") return true

  const params = new URLSearchParams(window.location.search)
  if (params.has("nointro")) return true
  if (params.has("intro")) return false

  try {
    if (sessionStorage.getItem(SESSION_KEY)) return true
  } catch {
    // Storage can be blocked by policy — fall through and just play it.
  }
  return false
}

/** Marks the curtain as seen for the rest of this session. */
export function markIntroPlayed(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, "1")
  } catch {
    /* ignore */
  }
}
