import { getProgress } from '../api'
import ProgressBar from '../components/ProgressBar'

const statusConfig = {
  ahead:     { label: 'Ahead',    badge: 'badge-blue',  bar: 'blue'  },
  'on-track':{ label: 'On Track', badge: 'badge-green', bar: 'gold'  },
  'at-risk': { label: 'At Risk',  badge: 'badge-red',   bar: 'red'   },
}

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

export default function Progress() {
  const { overall, initiatives, milestones } = getProgress()

  return (
    <div className="min-h-full p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-yellow-600">Tracker</p>
        <h1 className="font-display text-3xl font-black text-white">Progress</h1>
        <p className="mt-1 text-sm text-slate-400">Mission readiness across all workstreams</p>
      </div>

      {/* Overall */}
      <div className="card card-glow-gold relative mb-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-yellow-900/10 to-transparent" />
        <div className="relative flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-white">Overall Mission Readiness</h2>
            <p className="mt-0.5 text-xs text-slate-500">Across all {initiatives.length} initiatives</p>
          </div>
          <span className="font-display text-4xl font-black text-yellow-400">{overall}%</span>
        </div>
        <ProgressBar value={overall} color="gold" height="lg" />
      </div>

      {/* Initiatives */}
      <section className="mb-8">
        <h2 className="mb-4 text-base font-semibold text-white">Initiatives</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {initiatives.map(init => {
            const cfg = statusConfig[init.status]
            return (
              <div key={init.id} className="card hover:border-slate-700 transition-colors">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-white">{init.name}</div>
                    <div className="mt-0.5 text-xs text-slate-600">{init.owner} · Due {init.deadline}</div>
                  </div>
                  <span className={`flex-shrink-0 ${cfg.badge}`}>{cfg.label}</span>
                </div>
                <ProgressBar value={init.progress} color={cfg.bar} />
                <div className="mt-1.5 text-right text-xs text-slate-600">{init.progress}%</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Milestones */}
      <section>
        <h2 className="mb-6 text-base font-semibold text-white">Key Milestones</h2>
        <div className="card">
          <div className="relative">
            {/* Timeline spine */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-800" />
            <div className="space-y-5">
              {milestones.map(m => (
                <div key={m.id} className="relative flex items-start gap-5 pl-7">
                  {/* Dot */}
                  <div className={`absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 ${
                    m.status === 'completed'
                      ? 'border-green-500 bg-green-500'
                      : 'border-yellow-600 bg-slate-950'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${
                      m.status === 'completed' ? 'text-slate-500 line-through' : 'text-white'
                    }`}>
                      {m.name}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-600">{fmtDate(m.date)}</div>
                  </div>
                  <span className={m.status === 'completed' ? 'badge-green flex-shrink-0' : 'badge-gold flex-shrink-0'}>
                    {m.status === 'completed' ? '✓ Done' : 'Upcoming'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
