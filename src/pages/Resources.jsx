import { getSlackChannels, getDocuments, getBudget } from '../api'
import ProgressBar from '../components/ProgressBar'

const activityColor = { high: 'bg-green-600', medium: 'bg-gold', low: 'bg-ink-muted' }
const statusColor   = { awarded: 'text-green-700', pending: 'text-gold', quoted: 'text-navy' }
const statusLabel   = { awarded: 'Settled', pending: 'Pending', quoted: 'Quoted' }

function ActivityPip({ level }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`h-1.5 w-1.5 ${activityColor[level]} ${level === 'high' ? 'animate-pulse' : ''}`} />
      <span className="font-mono text-[9px] capitalize text-ink-muted">{level}</span>
    </div>
  )
}

function SectionLabel({ children, count }) {
  return (
    <div className="section-label mb-4">
      <span className="section-label-text">{children}</span>
      {count != null && <span className="badge-gold ml-1">{count}</span>}
    </div>
  )
}

export default function Resources() {
  const channels = getSlackChannels()
  const docs     = getDocuments()
  const budget   = getBudget()

  const totalCommitted = budget.breakdown.reduce((s, i) => s + i.amount, 0)
  const pct = Math.min(100, Math.round((totalCommitted / budget.available) * 100))

  return (
    <div className="min-h-full p-8 max-w-6xl mx-auto">

      {/* Header */}
      <div className="anim anim-1 mb-8 border-b-4 border-ink pb-5">
        <div className="font-mono text-[9px] tracking-[0.5em] text-ink-muted uppercase mb-1">Hub</div>
        <h1 className="font-display text-[56px] leading-none text-ink tracking-tight">RESOURCES</h1>
        <p className="mt-1 font-mono text-[11px] text-ink-muted tracking-wider">Budget, channels, and planning documents</p>
        <div className="mt-3 h-[2px] bg-crimson" />
      </div>

      {/* Budget */}
      <section className="anim anim-2 mb-8">
        <SectionLabel>Budget Overview</SectionLabel>
        <div className="card card-glow-gold">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-[9px] tracking-[0.35em] text-ink-muted uppercase mb-2">Available</div>
              <div className="font-display text-5xl text-gold leading-none tracking-tight">
                ~{budget.available}
                <span className="text-lg font-sans ml-2 text-ink-muted">units</span>
              </div>
              <p className="mt-1.5 font-mono text-[10px] text-ink-muted/70">{budget.note}</p>
            </div>
            <div className="text-right">
              <div className="font-mono text-[9px] tracking-[0.35em] text-ink-muted uppercase mb-2">Committed</div>
              <div className="font-display text-4xl text-ink leading-none tracking-tight">
                {totalCommitted}
                <span className="text-base font-sans ml-1 text-ink-muted">units</span>
              </div>
            </div>
          </div>
          <ProgressBar value={pct} color={pct > 100 ? 'red' : 'gold'} height="md" />
          <p className="mt-1.5 font-mono text-[10px] text-ink-muted">{totalCommitted} of {budget.available} units estimated — subject to negotiation</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {budget.breakdown.map((item, i) => (
              <div key={i} className="border border-paper-mid bg-paper-dark px-4 py-3">
                <p className="font-mono text-[9px] tracking-[0.25em] text-ink-muted uppercase mb-1">{item.label}</p>
                <p className="font-display text-2xl text-ink leading-none tracking-tight">
                  {item.amount}
                  <span className="text-xs font-sans ml-1 text-ink-muted">units</span>
                </p>
                <p className={`font-mono text-[10px] mt-1 ${statusColor[item.status]}`}>{statusLabel[item.status]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slack Channels */}
      <section className="anim anim-3 mb-8">
        <SectionLabel count={channels.length}>Slack Channels</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {channels.map(ch => (
            <div key={ch.id} className="card card-glow-blue hover:border-navy/30 transition-all duration-200 group cursor-pointer">
              <div className="mb-2 flex items-start justify-between">
                <span className="font-mono text-sm font-medium text-navy group-hover:text-ink transition-colors">
                  {ch.name}
                </span>
                <ActivityPip level={ch.activity} />
              </div>
              <p className="mb-2 font-mono text-[10px] leading-relaxed text-ink-muted">{ch.description}</p>
              <p className="font-mono text-[10px] text-ink-muted/60">{ch.members} members</p>
            </div>
          ))}
        </div>
      </section>

      {/* Documents */}
      <section className="anim anim-4">
        <SectionLabel>Planning Documents</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {docs.map(doc => (
            <div key={doc.id} className="card hover:border-paper-mid transition-all duration-200 group cursor-pointer">
              <div className="flex gap-3">
                <div className="mt-0.5 text-ink-muted flex-shrink-0">
                  {doc.type === 'doc' ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-sm font-semibold text-ink group-hover:text-crimson transition-colors">{doc.title}</div>
                  <p className="mt-1 font-mono text-[10px] text-ink-muted line-clamp-2">{doc.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="badge-gold">{doc.category}</span>
                    <span className="font-mono text-[10px] text-ink-muted/60">
                      {new Date(doc.updated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
