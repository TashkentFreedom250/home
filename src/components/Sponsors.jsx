import { freedomIconGold } from '../assets/freedom250'

const SPONSORS = [
  {
    key: 'coca-cola',
    name: 'Coca-Cola',
    tier: 'Presenting',
    bg: '#e21836',
    fg: '#ffffff',
    accent: 'rgba(255, 255, 255, 0.92)',
    Mark: () => (
      <svg viewBox="0 0 220 60" role="img" aria-label="Coca-Cola">
        <defs>
          <linearGradient id="cc-shine" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.78" />
          </linearGradient>
        </defs>
        <path
          d="M14 38 C 22 18, 38 18, 50 30 C 60 40, 70 24, 80 30 C 92 38, 104 22, 116 32"
          fill="none"
          stroke="url(#cc-shine)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <text
          x="124"
          y="40"
          fill="#ffffff"
          fontFamily="'Brush Script MT', 'Lucida Handwriting', cursive"
          fontStyle="italic"
          fontSize="30"
          fontWeight="700"
          letterSpacing="-0.5"
        >
          Coca-Cola
        </text>
      </svg>
    ),
  },
  {
    key: 'pepsi',
    name: 'Pepsi',
    tier: 'Beverage',
    bg: '#004B93',
    fg: '#ffffff',
    accent: '#ee2737',
    Mark: () => (
      <svg viewBox="0 0 220 60" role="img" aria-label="Pepsi">
        <g transform="translate(28 30)">
          <circle r="20" fill="#ffffff" />
          <path d="M -20 -2 A 20 20 0 0 1 20 -2 Z" fill="#ee2737" />
          <path d="M -20 2 A 20 20 0 0 0 20 2 Z" fill="#004B93" />
        </g>
        <text
          x="62"
          y="38"
          fill="#ffffff"
          fontFamily="'Inter', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="26"
          letterSpacing="-0.5"
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
    tier: 'Pizza',
    bg: '#0f6e3a',
    fg: '#ffffff',
    accent: '#cf2027',
    Mark: () => (
      <svg viewBox="0 0 220 60" role="img" aria-label="Papa Johns">
        <g transform="translate(24 30)">
          <circle r="14" fill="#cf2027" />
          <text x="0" y="5" textAnchor="middle" fill="#ffffff" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="14">PJ</text>
        </g>
        <text
          x="48"
          y="26"
          fill="#ffffff"
          fontFamily="'Inter', sans-serif"
          fontWeight="900"
          fontSize="13"
          letterSpacing="2"
        >
          PAPA JOHN'S
        </text>
        <text
          x="48"
          y="44"
          fill="rgba(255,255,255,0.78)"
          fontFamily="'Inter', sans-serif"
          fontWeight="600"
          fontSize="9"
          letterSpacing="3"
        >
          BETTER PIZZA
        </text>
      </svg>
    ),
  },
  {
    key: 'dominos',
    name: "Domino's",
    tier: 'Pizza',
    bg: '#0a59a4',
    fg: '#ffffff',
    accent: '#e31837',
    Mark: () => (
      <svg viewBox="0 0 220 60" role="img" aria-label="Domino's">
        <g transform="translate(14 14)" fontFamily="'Inter', sans-serif">
          <rect x="0" y="0" width="14" height="14" rx="2" fill="#e31837" />
          <rect x="14" y="14" width="14" height="14" rx="2" fill="#0a59a4" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="7" cy="7" r="2.4" fill="#ffffff" />
          <circle cx="21" cy="21" r="2.4" fill="#ffffff" />
        </g>
        <text
          x="58"
          y="38"
          fill="#ffffff"
          fontFamily="'Inter', sans-serif"
          fontWeight="900"
          fontSize="22"
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
    tier: 'Quick Service',
    bg: '#e2231a',
    fg: '#ffffff',
    accent: '#ffd900',
    Mark: () => (
      <svg viewBox="0 0 220 60" role="img" aria-label="Wendy's">
        <g transform="translate(28 30)">
          <circle r="16" fill="#ffe4c4" />
          <circle cx="-5" cy="-3" r="2.2" fill="#1a1a1a" />
          <circle cx="5" cy="-3" r="2.2" fill="#1a1a1a" />
          <path d="M -5 5 Q 0 9 5 5" stroke="#1a1a1a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M -16 -6 Q -22 -16 -14 -18 Q -10 -22 -8 -16" fill="#c8102e" />
          <path d="M 16 -6 Q 22 -16 14 -18 Q 10 -22 8 -16" fill="#c8102e" />
        </g>
        <text
          x="58"
          y="38"
          fill="#ffffff"
          fontFamily="'Brush Script MT', 'Lucida Handwriting', cursive"
          fontStyle="italic"
          fontWeight="700"
          fontSize="28"
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
    tier: 'Quick Service',
    bg: '#502314',
    fg: '#ffffff',
    accent: '#f5b50a',
    Mark: () => (
      <svg viewBox="0 0 220 60" role="img" aria-label="Burger King">
        <g transform="translate(30 30)">
          <ellipse cx="0" cy="-10" rx="22" ry="9" fill="#f5b50a" />
          <ellipse cx="0" cy="10" rx="22" ry="9" fill="#f5b50a" />
          <rect x="-22" y="-3" width="44" height="6" fill="#d62300" />
        </g>
        <text
          x="58"
          y="34"
          fill="#ffffff"
          fontFamily="'Inter', sans-serif"
          fontWeight="900"
          fontSize="14"
          letterSpacing="0.5"
        >
          BURGER
        </text>
        <text
          x="58"
          y="48"
          fill="#f5b50a"
          fontFamily="'Inter', sans-serif"
          fontWeight="900"
          fontSize="14"
          letterSpacing="0.5"
        >
          KING
        </text>
      </svg>
    ),
  },
]

export default function Sponsors() {
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

      <div className="sponsor-grid">
        {SPONSORS.map(({ key, name, tier, bg, fg, accent, Mark }) => (
          <article
            className="sponsor-tile"
            key={key}
            style={{ '--sp-bg': bg, '--sp-fg': fg, '--sp-accent': accent }}
          >
            <div className="sponsor-tile-mark" aria-hidden="true">
              <Mark />
            </div>
            <div className="sponsor-tile-meta">
              <span className="sponsor-tile-tier">{tier}</span>
              <span className="sponsor-tile-name">{name}</span>
            </div>
            <span className="sponsor-tile-corner" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  )
}
