const glowPositions: Record<string, string> = {
  topLeft: "bg-[radial-gradient(60%_50%_at_15%_0%,rgba(217,164,65,0.07),transparent_70%)]",
  topRight: "bg-[radial-gradient(60%_50%_at_85%_0%,rgba(217,164,65,0.07),transparent_70%)]",
  center: "bg-[radial-gradient(55%_45%_at_50%_45%,rgba(217,164,65,0.06),transparent_70%)]",
  bottomLeft: "bg-[radial-gradient(60%_50%_at_10%_100%,rgba(217,164,65,0.07),transparent_70%)]",
  bottomRight: "bg-[radial-gradient(60%_50%_at_90%_100%,rgba(217,164,65,0.07),transparent_70%)]",
}

/** Static, GPU-cheap ambient: faint technical grid + soft amber glow.
 * Pure gradients, so it's safe under prefers-reduced-motion. */
export default function Ambient({
  glow = "topLeft",
  grid = true,
  className = "",
}: {
  glow?: keyof typeof glowPositions | "none"
  grid?: boolean
  className?: string
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {grid && (
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #f0ede6 1px, transparent 1px), linear-gradient(to bottom, #f0ede6 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(80% 60% at 50% 40%, black, transparent 90%)",
            WebkitMaskImage: "radial-gradient(80% 60% at 50% 40%, black, transparent 90%)",
          }}
        />
      )}
      {glow !== "none" && <div className={`absolute inset-0 ${glowPositions[glow]}`} />}
    </div>
  )
}
