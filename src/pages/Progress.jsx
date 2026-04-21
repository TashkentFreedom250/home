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
  'awarded':     'border-t-green-700',
  'in-progress': 'border-t-gold',
  'not-started': 'border-t-crimson',
}
const taskIcon = { completed: '✓', 'in-progress': '●', 'not-started': '○' }
const fmtDate  = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

function SectionLabel({ children }) {
  return (
    <div className="section-label mb-4">
      <span className="section-label-text">{children}</span>
    </div>
  )
}

export default function Progress() {
  const { overall, initiatives, milestones } = getProgress()
  const contracts = getContracts()
  const timeline  = getTimeline()

  return (
    <div className="min-h-full p-8 max-w-6xl mx-auto">

      {/* Header */}
      <div className="anim anim-1 mb-8 border-b-4 border-ink pb-5">
        <div className="font-mono text-[9px] tracking-[0.5em] text-ink-muted uppercase mb-1">Tracker</div>
        <h1 className="font-display text-[56px] leading-none text-ink tracking-tight">PROGRESS</h1>
        <p className="mt-1 font-mono text-[11px] text-ink-muted tracking-wider">Mission readiness across all workstreams</p>
        <div className="mt-3 h-[2px] bg-crimson" />
      </div>

      {/* Overall readiness */}
      <div className="anim anim-2 card card-glow-gold mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-mono text-[9px] tracking-[0.35em] text-ink-muted uppercase mb-1">Overall Readiness</div>
            <div className="font-serif text-base font-semibold text-ink">Across {initiatives.length} workstreams</div>
          </div>
          <span className="font-display text-6xl text-gold leading-none tracking-tight">{overall}%</span>
        </div>
        <ProgressBar value={overall} color="gold" height="lg" />
      </div>

      {/* Contracts */}
      <section className="anim anim-3 mb-8">
        <SectionLabel>Contracts</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {contracts.map(c => {
            const badge  = contractBadge[c.status]
            const accent = contractAccent[c.status]
            return (
              <div key={c.id} className={`card border-t-[3px] ${accent}`}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="font-serif text-sm font-semibold text-ink">{c.name}</span>
                  <span className={badge.cls}>{badge.label}</span>
                </div>
                <p className="mb-2 font-mono text-[10px] text-ink-muted leading-relaxed">{c.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-medium text-gold">{c.cost}</span>
                  {c.awardDate && (
                    <span className="font-mono text-[10px] text-green-700">
                      Settled {new Date(c.awardDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
                <div className="mt-2 border border-paper-mid bg-paper-dark px-3 py-2 font-mono text-[10px] text-gold">
                  {c.nextStep}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Workstreams */}
      <section className="anim anim-4 mb-8">
        <SectionLabel>Workstreams</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          {initiatives.map(init => {
            const cfg = statusCfg[init.status]
            return (
              <div key={init.id} className="card hover:border-paper-mid transition-colors">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate font-serif text-sm font-medium text-ink">{init.name}</div>
                    <div className="mt-0.5 font-mono text-[10px] text-ink-muted">{init.owner} · {init.deadline}</div>
                  </div>
                  <span className={`flex-shrink-0 ${cfg.badge}`}>{cfg.label}</span>
                </div>
                <ProgressBar value={init.progress} color={cfg.bar} />
                <p className="mt-1.5 font-mono text-[10px] text-ink-muted">{init.note}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 8-Week Timeline */}
      <section className="anim anim-5 mb-8">
        <SectionLabel>8-Week Countdown</SectionLabel>
        <div className="space-y-2">
          {timeline.map(week => (
            <div key={week.week} className={`card ${week.phase === 'current' ? 'card-glow-red ring-1 ring-crimson/20' : 'card-glow-blue'}`}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {week.phase === 'current' && <span className="badge-red">This Week</span>}
                  <h3 className="font-serif text-sm font-semibold text-ink">Week {week.week} — {week.label}</h3>
                </div>
                <span className="font-mono text-[10px] text-ink-muted">{week.dates}</span>
              </div>
              <div className="space-y-1.5">
                {week.tasks.map((t, i) => (
                  <div key={i} className={`flex items-start gap-2 font-mono text-[11px] ${
                    t.status === 'completed' ? 'text-ink-muted/50 line-through' : t.critical ? 'text-ink' : 'text-ink-muted'
                  }`}>
                    <span className="mt-px flex-shrink-0">{taskIcon[t.status]}</span>
                    <span className={t.critical && t.status !== 'completed' ? 'font-medium' : ''}>
                      {t.task}
                      {t.critical && t.status !== 'completed' && (
                        <span className="ml-2 text-crimson tracking-wider">CRITICAL</span>
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
      <section className="anim anim-6">
        <SectionLabel>Key Milestones</SectionLabel>
        <div className="card">
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-paper-mid" />
            <div className="space-y-4">
              {milestones.map(m => (
                <div key={m.id} className="relative flex items-start gap-5 pl-7">
                  <div className={`absolute left-0 top-1.5 h-3 w-3 border-2 ${
                    m.status === 'completed' ? 'border-green-700 bg-green-700' : 'border-crimson bg-paper'
                  }`} />
                  <div className="min-w-0 flex-1">
                    <div className={`font-serif text-sm font-medium ${m.status === 'completed' ? 'text-ink-muted line-through' : 'text-ink'}`}>
                      {m.name}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] text-ink-muted/70">{fmtDate(m.date)}</div>
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
