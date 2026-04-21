import { getProgress, getContracts, getTimeline } from '../api'
import ProgressBar from '../components/ProgressBar'

const statusCfg = {
  ahead:      { label: 'Ahead',    badge: 'badge-blue',  bar: 'blue'  },
  'on-track': { label: 'On Track', badge: 'badge-green', bar: 'gold'  },
  'at-risk':  { label: 'At Risk',  badge: 'badge-red',   bar: 'red'   },
}
const contractBadge = {
  'awarded':     { cls: 'badge-green', label: 'Settled'     },
  'in-progress': { cls: 'badge-gold',  label: 'In Progress' },
  'not-started': { cls: 'badge-red',   label: 'Not Started' },
}
const contractAccent = {
  'awarded':     'border-t-green-600',
  'in-progress': 'border-t-brand-gold',
  'not-started': 'border-t-brand-red',
}
const taskIcon = { completed: '✓', 'in-progress': '●', 'not-started': '○' }
const fmtDate  = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

function SectionLabel({ children }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="h-px w-4 bg-brand-gold" />
      <h2 className="text-[10px] font-semibold tracking-[0.3em] text-cream uppercase">{children}</h2>
    </div>
  )
}

export default function Progress() {
  const { overall, initiatives, milestones } = getProgress()
  const contracts = getContracts()
  const timeline  = getTimeline()

  return (
    <div className="min-h-full p-8">

      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[#1c3a5e]">
        <h1 className="font-display text-4xl font-bold text-cream tracking-widest leading-none">PROGRESS</h1>
        <p className="mt-2 text-[11px] tracking-[0.25em] text-steel uppercase">Mission readiness across all workstreams</p>
      </div>

      {/* Overall readiness */}
      <div className="card card-glow-gold mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[9px] tracking-[0.35em] text-steel uppercase mb-1">Overall Readiness</div>
            <div className="text-sm font-medium text-cream">Across {initiatives.length} workstreams</div>
          </div>
          <span className="font-bebas text-6xl text-brand-gold leading-none">{overall}%</span>
        </div>
        <ProgressBar value={overall} color="gold" height="lg" />
      </div>

      {/* Contracts */}
      <section className="mb-8">
        <SectionLabel>Contracts</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {contracts.map(c => {
            const badge = contractBadge[c.status]
            const accent = contractAccent[c.status]
            return (
              <div key={c.id} className={`card border-t-2 ${accent}`}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-cream">{c.name}</span>
                  <span className={badge.cls}>{badge.label}</span>
                </div>
                <p className="mb-2 text-[11px] text-steel">{c.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-brand-gold">{c.cost}</span>
                  {c.awardDate && (
                    <span className="text-[11px] text-green-400">
                      Settled {new Date(c.awardDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
                <div className="mt-2 border border-[#1c3a5e] bg-navy-950/60 px-3 py-2 text-[11px] text-brand-gold">
                  {c.nextStep}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Workstreams */}
      <section className="mb-8">
        <SectionLabel>Workstreams</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          {initiatives.map(init => {
            const cfg = statusCfg[init.status]
            return (
              <div key={init.id} className="card hover:border-[#2a5a8e] transition-colors">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-cream">{init.name}</div>
                    <div className="mt-0.5 text-[11px] text-steel">{init.owner} · {init.deadline}</div>
                  </div>
                  <span className={`flex-shrink-0 ${cfg.badge}`}>{cfg.label}</span>
                </div>
                <ProgressBar value={init.progress} color={cfg.bar} />
                <p className="mt-1.5 text-[11px] text-steel">{init.note}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 8-Week Timeline */}
      <section className="mb-8">
        <SectionLabel>8-Week Countdown</SectionLabel>
        <div className="space-y-2">
          {timeline.map(week => (
            <div key={week.week} className={`card ${week.phase === 'current' ? 'card-glow-gold ring-1 ring-brand-gold/20' : ''}`}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {week.phase === 'current' && <span className="badge-gold">THIS WEEK</span>}
                  <h3 className="text-sm font-semibold text-cream">Week {week.week} — {week.label}</h3>
                </div>
                <span className="text-[11px] text-steel">{week.dates}</span>
              </div>
              <div className="space-y-1.5">
                {week.tasks.map((t, i) => (
                  <div key={i} className={`flex items-start gap-2 text-xs ${t.status === 'completed' ? 'text-[#3a5a7a] line-through' : t.critical ? 'text-cream' : 'text-steel'}`}>
                    <span className="mt-px flex-shrink-0 font-mono text-[10px]">{taskIcon[t.status]}</span>
                    <span className={t.critical && t.status !== 'completed' ? 'font-medium' : ''}>
                      {t.task}
                      {t.critical && t.status !== 'completed' && (
                        <span className="ml-2 text-[10px] tracking-wider text-brand-red no-underline">CRITICAL</span>
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
        <SectionLabel>Key Milestones</SectionLabel>
        <div className="card">
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#1c3a5e]" />
            <div className="space-y-4">
              {milestones.map(m => (
                <div key={m.id} className="relative flex items-start gap-5 pl-7">
                  <div className={`absolute left-0 top-1.5 h-3 w-3 border-2 ${
                    m.status === 'completed' ? 'border-green-500 bg-green-500' : 'border-brand-gold bg-navy-950'
                  }`} />
                  <div className="min-w-0 flex-1">
                    <div className={`text-sm font-medium ${m.status === 'completed' ? 'text-steel line-through' : 'text-cream'}`}>
                      {m.name}
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#3a5a7a]">{fmtDate(m.date)}</div>
                  </div>
                  <span className={`flex-shrink-0 ${m.status === 'completed' ? 'badge-green' : 'badge-gold'}`}>
                    {m.status === 'completed' ? 'Done' : 'Upcoming'}
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
