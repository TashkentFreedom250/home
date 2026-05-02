import { freedomIconGold } from '../assets/freedom250'

const realLogos = import.meta.glob('../assets/sponsors/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

function findRealLogo(key) {
  const match = Object.entries(realLogos).find(([path]) => {
    const file = path.split('/').pop().toLowerCase()
    return file.startsWith(`${key}.`)
  })
  return match ? match[1] : null
}

const SPONSORS = [
  {
    key: 'coca-cola',
    name: 'Coca-Cola',
    bg: '#e21836',
    accent: 'rgba(255, 255, 255, 0.92)',
    Mark: () => (
      <svg viewBox="0 0 260 64" role="img" aria-label="Coca-Cola">
        <path
          d="M10 44 C 22 18, 44 18, 58 34 C 70 48, 84 22, 100 32 C 114 40, 128 24, 142 34"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.95"
        />
        <text
          x="148"
          y="44"
          fill="#ffffff"
          fontFamily="'Brush Script MT', 'Lucida Handwriting', cursive"
          fontStyle="italic"
          fontSize="34"
          fontWeight="700"
        >
          Coca-Cola
        </text>
      </svg>
    ),
  },
  {
    key: 'pepsi',
    name: 'Pepsi',
    bg: '#004B93',
    accent: '#ee2737',
    Mark: () => (
      <svg viewBox="0 0 260 64" role="img" aria-label="Pepsi">
        <g transform="translate(34 32)">
          <circle r="24" fill="#ffffff" />
          <path d="M -24 -3 A 24 24 0 0 1 24 -3 Z" fill="#ee2737" />
          <path d="M -24 3 A 24 24 0 0 0 24 3 Z" fill="#004B93" />
        </g>
        <text
          x="74"
          y="42"
          fill="#ffffff"
          fontFamily="'Inter', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="30"
          letterSpacing="-0.6"
          fontStyle="italic"
        >
          PEPSI
        </text>
      </svg>
    ),
  },
  {
    key: 'papa-johns',
    name: "Papa Johns",
    bg: '#0f6e3a',
    accent: '#cf2027',
    Mark: () => (
      <svg viewBox="0 0 260 64" role="img" aria-label="Papa Johns">
        <g transform="translate(30 32)">
          <circle r="18" fill="#cf2027" />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="'Inter', sans-serif"
            fontWeight="900"
            fontSize="18"
          >
            PJ
          </text>
        </g>
        <text
          x="58"
          y="28"
          fill="#ffffff"
          fontFamily="'Inter', sans-serif"
          fontWeight="900"
          fontSize="16"
          letterSpacing="2"
        >
          PAPA JOHN'S
        </text>
        <text
          x="58"
          y="48"
          fill="rgba(255,255,255,0.78)"
          fontFamily="'Inter', sans-serif"
          fontWeight="600"
          fontSize="10"
          letterSpacing="3.5"
        >
          BETTER PIZZA
        </text>
      </svg>
    ),
  },
  {
    key: 'dominos',
    name: "Domino's",
    bg: '#0a59a4',
    accent: '#e31837',
    Mark: () => (
      <svg viewBox="0 0 260 64" role="img" aria-label="Domino's">
        <g transform="translate(16 16)">
          <rect x="0" y="0" width="16" height="16" rx="2" fill="#e31837" />
          <rect x="16" y="16" width="16" height="16" rx="2" fill="#0a59a4" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="8" cy="8" r="2.6" fill="#ffffff" />
          <circle cx="24" cy="24" r="2.6" fill="#ffffff" />
        </g>
        <text
          x="68"
          y="42"
          fill="#ffffff"
          fontFamily="'Inter', sans-serif"
          fontWeight="900"
          fontSize="26"
          letterSpacing="-0.5"
        >
          Domino's
        </text>
      </svg>
    ),
  },
  {
    key: 'wendys',
    name: "Wendy's",
    bg: '#e2231a',
    accent: '#ffd900',
    Mark: () => (
      <svg viewBox="0 0 260 64" role="img" aria-label="Wendy's">
        <g transform="translate(34 32)">
          <circle r="20" fill="#ffe4c4" />
          <circle cx="-6" cy="-4" r="2.6" fill="#1a1a1a" />
          <circle cx="6" cy="-4" r="2.6" fill="#1a1a1a" />
          <path d="M -6 6 Q 0 11 6 6" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M -20 -8 Q -28 -20 -18 -22 Q -12 -28 -10 -20" fill="#c8102e" />
          <path d="M 20 -8 Q 28 -20 18 -22 Q 12 -28 10 -20" fill="#c8102e" />
        </g>
        <text
          x="72"
          y="44"
          fill="#ffffff"
          fontFamily="'Brush Script MT', 'Lucida Handwriting', cursive"
          fontStyle="italic"
          fontWeight="700"
          fontSize="34"
          letterSpacing="-0.5"
        >
          Wendy's
        </text>
      </svg>
    ),
  },
  {
    key: 'burger-king',
    name: 'Burger King',
    bg: '#502314',
    accent: '#f5b50a',
    Mark: () => (
      <svg viewBox="0 0 260 64" role="img" aria-label="Burger King">
        <g transform="translate(36 32)">
          <ellipse cx="0" cy="-12" rx="26" ry="11" fill="#f5b50a" />
          <ellipse cx="0" cy="12" rx="26" ry="11" fill="#f5b50a" />
          <rect x="-26" y="-3" width="52" height="6" fill="#d62300" />
        </g>
        <text
          x="72"
          y="34"
          fill="#ffffff"
          fontFamily="'Inter', sans-serif"
          fontWeight="900"
          fontSize="18"
          letterSpacing="0.5"
        >
          BURGER
        </text>
        <text
          x="72"
          y="54"
          fill="#f5b50a"
          fontFamily="'Inter', sans-serif"
          fontWeight="900"
          fontSize="18"
          letterSpacing="0.5"
        >
          KING
        </text>
      </svg>
    ),
  },
]

function SponsorTile({ sponsor }) {
  const realSrc = findRealLogo(sponsor.key)
  return (
    <div
      className="sponsor-chip"
      style={{ '--sp-bg': sponsor.bg, '--sp-accent': sponsor.accent }}
      aria-label={sponsor.name}
    >
      {realSrc ? (
        <img src={realSrc} alt={sponsor.name} className="sponsor-chip-img" loading="lazy" />
      ) : (
        <sponsor.Mark />
      )}
    </div>
  )
}

export default function Sponsors() {
  const loop = [...SPONSORS, ...SPONSORS]

  return (
    <section className="sponsors enter d2" aria-labelledby="sponsors-heading">
      <header className="sponsors-head">
        <span className="sponsors-eyebrow">
          <img src={freedomIconGold} alt="" aria-hidden="true" />
          Powered by our partners
        </span>
        <h2 id="sponsors-heading" className="sponsors-title">
          Official sponsors of <em>Freedom 250</em>
        </h2>
        <p className="sponsors-sub">
          A coalition of confirmed partners helping bring America's 250th to Tashkent.
        </p>
      </header>

      <div className="sponsor-rail" role="region" aria-label="Sponsor logos">
        <div className="sponsor-rail-track">
          {loop.map((sponsor, index) => (
            <SponsorTile sponsor={sponsor} key={`${sponsor.key}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
