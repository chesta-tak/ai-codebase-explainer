export default function LandingBackground({
  meshOpacity = 0.45,
  noiseOpacity = 0.015,
  orbOpacity = 1,
}) {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-dark-950" />

      <div
        className="absolute top-20 left-[10%] h-96 w-96 rounded-full bg-gradient-to-br from-warm-500/12 to-warm-600/5 blur-3xl"
        style={{ opacity: orbOpacity }}
      />
      <div
        className="absolute bottom-20 right-[15%] h-80 w-80 rounded-full bg-gradient-to-br from-sage-500/10 to-warm-400/5 blur-3xl"
        style={{ opacity: orbOpacity }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-72 w-72 rounded-full bg-gradient-to-br from-amber-500/6 to-warm-500/8 blur-3xl"
        style={{ opacity: orbOpacity }}
      />

      <div className="absolute inset-0 gradient-mesh" style={{ opacity: meshOpacity }} />
      <div className="absolute inset-0 bg-noise mix-blend-soft-light" style={{ opacity: noiseOpacity }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_28%,rgba(255,227,128,0.08),transparent_18%),radial-gradient(circle_at_72%_30%,rgba(240,137,96,0.08),transparent_20%)]" />
    </div>
  )
}
