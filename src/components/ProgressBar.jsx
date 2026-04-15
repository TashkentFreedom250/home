const gradientMap = {
  gold:  'from-yellow-700 to-yellow-400',
  red:   'from-red-800   to-red-500',
  blue:  'from-blue-800  to-blue-400',
  green: 'from-green-800 to-green-400',
}
const heightMap = { sm: 'h-1.5', md: 'h-2', lg: 'h-3' }

export default function ProgressBar({ value, color = 'gold', height = 'md' }) {
  const pct = Math.min(100, Math.max(0, value))
  return (
    <div className={`w-full bg-slate-800 rounded-full overflow-hidden ${heightMap[height]}`}>
      <div
        className={`${heightMap[height]} rounded-full bg-gradient-to-r ${gradientMap[color]} transition-all duration-700 ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
