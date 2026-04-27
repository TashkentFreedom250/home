// src/components/ProgressBar.jsx
// Flat rectangular bar. color: 'blue' | 'green' | 'red' | 'gold' | 'white'

const COLOR_MAP = {
  blue:  'linear-gradient(90deg, var(--blue), var(--cyan))',
  green: 'linear-gradient(90deg, var(--mint), var(--cyan))',
  red:   'linear-gradient(90deg, var(--coral), var(--rose))',
  gold:  'linear-gradient(90deg, var(--amber), var(--coral))',
  white: 'rgba(255,255,255,0.4)',
}

const HEIGHT_MAP = { sm: '6px', md: '8px', lg: '10px', xl: '14px' }

export default function ProgressBar({ value, color = 'blue', height = 'md' }) {
  const pct = Math.min(100, Math.max(0, value))
  const h   = HEIGHT_MAP[height] ?? HEIGHT_MAP.md
  return (
    <div className="pbar-track" style={{ height: h }}>
      <div
        className="pbar-fill"
        style={{ width: `${pct}%`, height: h, background: COLOR_MAP[color] ?? COLOR_MAP.blue }}
      />
    </div>
  )
}
