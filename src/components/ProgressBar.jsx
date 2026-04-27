// src/components/ProgressBar.jsx
// Flat rectangular progress bar. color: 'primary' | 'success' | 'warning' | 'error'

const COLOR_MAP = {
  primary: 'bg-navy',
  success: 'bg-gov-green',
  warning: 'bg-gov-gold',
  error:   'bg-gov-red',
}

const HEIGHT_MAP = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
}

export default function ProgressBar({ value, color = 'primary', height = 'md' }) {
  const pct = Math.min(100, Math.max(0, value))
  return (
    <div className={`pbar-track ${HEIGHT_MAP[height]}`}>
      <div
        className={`pbar-fill ${HEIGHT_MAP[height]} ${COLOR_MAP[color]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
