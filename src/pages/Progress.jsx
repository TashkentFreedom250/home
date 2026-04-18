import { getProgress, getContracts, getTimeline } from '../api'
import ProgressBar from '../components/ProgressBar'

const statusCfg = {
  ahead:      { label: 'Ahead',    badge: 'badge-blue',  bar: 'blue'  },
  'on-track': { label: 'On Track', badge: 'badge-green', bar: 'gold'  },
  'at-risk':  { label: 'At Risk',  badge: 'badge-red',   bar: 'red'   },
}
const contractBadge = {
  'awarded':     { cls: 'badge-green', label: '✓ Settled'   },
  'in-progress': { cls: 'badge-gold',  label: 'In Progress' },
  'not-started': { cls: 'badge-red',   label: 'Not Started' },
}
const taskIcon = { completed: '✅', 'in-progress': '🟡', 'not-started': '⬜' }
const fmtDate  = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default function Progress() {
  const { overall, initiatives, milestones } = getProgress()
  const contracts = getContracts()
  const timeline  = getTimeline()

  return (
    <div className="min-h-full p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-yellow-600">Tracker</p>
        <h1 className="font-display text-3xl font-black text-white">Progress</h1>
        <p className="mt-1 text-sm text-slate-400">Mission readiness across all workstreams</p>
      </div>

      {/* Overall readiness */}
      <div className="card card-glow-gold relative mb-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-yellow-900/10 to-transparent" />
        <div className="relative flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-white">Overall Readiness</h2>
            <p className="mt-0.5 text-xs text-slate-500">Across {initiatives.length} workstreams</p>
          </div>
          <span className="font-display text-4xl font-black text-yellow-400">{overall}%</span>
        </div>
        <ProgressBar value={overall} color="gold" height="lg" />
      </div>

      {/* Contracts */}
      <section className="mb-8">
        <h2 className="mb-4 text-base font-semibold text-white">Contracts</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {contracts.map(c => {
            const badge = contractBadge[c.status]
            return (
              <div key={c.id} className={`card ${c.status === 'awarded' ? 'card-glow-blue' : ''}`}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.icon}</span>
                    <span className="text-sm font-semibold text-white">{c.name}</span>
                  </div>
                  <span className={badge.cls}>{badge.label}</span>
                </div>
                <p className="mb-2 text-xs text-slate-500">{c.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-yellow-500">{c.cost}</span>
                  {c.awardDate && (
                    <span className="text-xs text-green-400">
                      Settled {new Date(c.awardDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
                <div className="mt-2 rounded-md bg-slate-800/60 px-3 py-2 text-xs text-yellow-400">
                  {c.nextStep}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Workstreams */}
      <section className="mb-8">
        <h2 className="mb-4 text-base font-semibold text-white">Workstreams</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {initiatives.map(init => {
            const cfg = statusCfg[init.status]
            return (
              <div key={init.id} className="card hover:border-slate-700 transition-colors">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-white">{init.name}</div>
                    <div className="mt-0.5 text-xs text-slate-600">{init.owner} · {init.deadline}</div>
                  </div>
                  <span className={`flex-shrink-0 ${cfg.badge}`}>{cfg.label}</span>
                </div>
                <ProgressBar value={init.progress} color={cfg.bar} />
                <p className="mt-1.5 text-xs text-slate-500">{init.note}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 8-Week Timeline */}
      <section className="mb-8">
        <h2 className="mb-4 text-base font-semibold text-white">8-Week Countdown</h2>
        <div className="space-y-3">
          {timeline.map(week => (
            <div key={week.week} className={`card ${week.phase === 'current' ? 'card-glow-gold ring-1 ring-yellow-700/40' : ''}`}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {week.phase === 'current' && <span className="badge-gold">THIS WEEK</span>}
                  <h3 className="text-sm font-semibold text-white">Week {week.week} — {week.label}</h3>
                </div>
                <span className="text-xs text-slate-500">{week.dates}</span>
              </div>
              <div className="space-y-1.5">
                {week.tasks.map((t, i) => (
                  <div key={i} className={`flex items-start gap-2 text-xs ${t.status === 'completed' ? 'text-slate-600 line-through' : t.critical ? 'text-white' : 'text-slate-400'}`}>
                    <span className="mt-px flex-shrink-0">{taskIcon[t.status]}</span>
                    <span className={t.critical && t.status !== 'completed' ? 'font-medium' : ''}>
                      {t.task}
                      {t.critical && t.status !== 'completed' && (
                        <span className="ml-1.5 text-red-400 no-underline">CRITICAL</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      <section>
        <h2 className="mb-4 text-base font-semibold text-white">Key Milestones</h2>
        <div className="card">
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-800" />
            <div className="space-y-4">
              {milestones.map(m => (
                <div key={m.id} className="relative flex items-start gap-5 pl-7">
                  <div className={`absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 ${
                    m.status === 'completed' ? 'border-green-500 bg-green-500' : 'border-yellow-600 bg-slate-950'
                  }`} />
                  <div className="min-w-0 flex-1">
                    <div className={`text-sm font-medium ${m.status === 'completed' ? 'text-slate-500 line-through' : 'text-white'}`}>
                      {m.name}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-600">{fmtDate(m.date)}</div>
                  </div>
                  <span className={`flex-shrink-0 ${m.status === 'completed' ? 'badge-green' : 'badge-gold'}`}>
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
