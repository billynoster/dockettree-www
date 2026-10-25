/**
 * Production hero atmosphere — deep Evergreen with subtle Moss radial
 * behind the product column. No network SVG/paths (nothing may peek
 * past the readiness dashboard).
 */
export function StaticProductBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-evergreen-deep">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 70% at 72% 48%, rgba(120,150,106,0.22) 0%, rgba(31,92,74,0.12) 38%, rgba(18,61,49,0) 72%)',
        }}
      />
      {/* Soft left wash for headline contrast — pure gradient, no strokes */}
      <div
        className="absolute inset-y-0 left-0 w-[52%] max-w-[640px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(18,61,49,0.92) 0%, rgba(18,61,49,0.55) 55%, rgba(18,61,49,0) 100%)',
        }}
      />
    </div>
  )
}
