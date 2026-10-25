/**
 * Production hero atmosphere — deep Evergreen with subtle Moss radial
 * behind the product column and faint static paths on the right.
 */
export function StaticProductBackground() {
  return (
    <div className="absolute inset-0 bg-evergreen-deep">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 70% at 72% 48%, rgba(120,150,106,0.22) 0%, rgba(31,92,74,0.12) 38%, rgba(18,61,49,0) 72%)',
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g
          fill="none"
          stroke="#78966A"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.2"
        >
          <path
            d="M 720 360 C 820 350, 940 365, 1120 400"
            strokeWidth="1.2"
          />
          <path
            d="M 760 260 C 860 300, 960 340, 1080 370"
            strokeWidth="1"
          />
          <path
            d="M 740 480 C 850 450, 960 420, 1100 430"
            strokeWidth="1"
          />
          <path
            d="M 880 300 C 960 320, 1040 355, 1140 390"
            strokeWidth="0.9"
          />
        </g>
      </svg>
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
