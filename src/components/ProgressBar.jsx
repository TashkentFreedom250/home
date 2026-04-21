const fillMap = {
  gold:  'bg-gold',
  red:   'bg-crimson',
  blue:  'bg-navy',
  green: 'bg-green-700',
}
const heightMap = { sm: 'h-1', md: 'h-1.5', lg: 'h-2' }

export default function ProgressBar({ value, color = 'gold', height = 'md' }) {
  const pct = Math.min(100, Math.max(0, value))
  return (
    <div className={`w-full bg-ink/10 overflow-hidden ${heightMap[height]}`}>
      <div
        className={`${heightMap[height]} ${fillMap[color]} transition-all duration-700 ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
