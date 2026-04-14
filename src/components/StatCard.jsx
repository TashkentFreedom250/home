const glowMap = {
  gold:  'border-yellow-700/40 shadow-[0_0_20px_rgba(161,110,3,0.12)]',
  red:   'border-red-800/40   shadow-[0_0_20px_rgba(127,20,20,0.12)]',
  blue:  'border-blue-800/40  shadow-[0_0_20px_rgba(20,40,127,0.12)]',
  green: 'border-green-800/40 shadow-[0_0_20px_rgba(20,90,20,0.12)]',
}

export default function StatCard({ title, value, change, glow = 'gold', icon }) {
  return (
    <div className={`card ${glowMap[glow]} hover:-translate-y-0.5 transition-all duration-200 group`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl leading-none">{icon}</span>
        <span className="badge-green">{change}</span>
      </div>
      <div className="text-2xl font-bold text-white mb-1 tabular-nums">{value}</div>
      <div className="text-xs text-slate-500 uppercase tracking-widest">{title}</div>
    </div>
  )
}
