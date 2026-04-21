import { getSlackChannels, getDocuments, getBudget } from '../api'
import ProgressBar from '../components/ProgressBar'

const activityColor = { high: 'bg-green-400', medium: 'bg-brand-gold', low: 'bg-steel' }
const statusColor   = { awarded: 'text-green-400', pending: 'text-brand-gold', quoted: 'text-brand-blue' }
const statusLabel   = { awarded: 'Settled', pending: 'Pending', quoted: 'Quoted' }

function ActivityPip({ level }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`h-1.5 w-1.5 ${activityColor[level]} ${level === 'high' ? 'animate-pulse' : ''}`} />
      <span className="text-[10px] capitalize text-steel">{level}</span>
    </div>
  )
}

function SectionLabel({ icon, children, count }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="h-px w-4 bg-brand-gold" />
      <h2 className="text-[10px] font-semibold tracking-[0.3em] text-cream uppercase">{children}</h2>
      {count != null && <span className="badge-gold">{count}</span>}
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
    <div className="min-h-full p-8">

      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[#1c3a5e]">
        <h1 className="font-display text-4xl font-bold text-cream tracking-widest leading-none">RESOURCES</h1>
        <p className="mt-2 text-[11px] tracking-[0.25em] text-steel uppercase">Budget, channels, and planning documents</p>
      </div>

      {/* Budget Overview */}
      <section className="mb-8">
        <SectionLabel>Budget Overview</SectionLabel>
        <div className="card card-glow-gold">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-[9px] tracking-[0.3em] text-steel uppercase mb-2">Available</p>
              <p className="font-bebas text-5xl text-brand-gold leading-none">
                ~{budget.available}
                <span className="text-lg font-sans ml-2 text-steel">units</span>
              </p>
              <p className="mt-1.5 text-[11px] text-[#3a5a7a]">{budget.note}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] tracking-[0.3em] text-steel uppercase mb-2">Committed</p>
              <p className="font-bebas text-4xl text-cream leading-none">
                {totalCommitted}
                <span className="text-base font-sans ml-1 text-steel">units</span>
              </p>
            </div>
          </div>
          <div className="mb-4">
            <ProgressBar value={pct} color={pct > 100 ? 'red' : 'gold'} height="md" />
            <p className="mt-1.5 text-[11px] text-steel">{totalCommitted} of {budget.available} units estimated — final amounts subject to negotiation</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {budget.breakdown.map((item, i) => (
              <div key={i} className="border border-[#1c3a5e] bg-navy-950/60 px-4 py-3">
                <p className="text-[9px] tracking-[0.3em] text-steel uppercase mb-1">{item.label}</p>
                <p className="font-bebas text-2xl text-cream leading-none">
                  {item.amount}
                  <span className="text-xs font-sans ml-1 text-steel">units</span>
                </p>
                <p className={`text-[11px] mt-1 ${statusColor[item.status]}`}>{statusLabel[item.status]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slack Channels */}
      <section className="mb-8">
        <SectionLabel count={channels.length}>Slack Channels</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {channels.map(ch => (
            <div key={ch.id} className="card hover:border-[#2a5a8e] transition-all duration-200 group cursor-pointer">
              <div className="mb-2 flex items-start justify-between">
                <span className="font-mono text-sm font-semibold text-brand-blue group-hover:text-[#6ba0e0] transition-colors">
                  {ch.name}
                </span>
                <ActivityPip level={ch.activity} />
              </div>
              <p className="mb-2 text-[11px] leading-relaxed text-steel">{ch.description}</p>
              <p className="text-[11px] text-[#3a5a7a]">{ch.members} members</p>
            </div>
          ))}
        </div>
      </section>

      {/* Documents */}
      <section>
        <SectionLabel>Planning Documents</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {docs.map(doc => (
            <div key={doc.id} className="card hover:border-[#2a5a8e] transition-all duration-200 group cursor-pointer">
              <div className="flex gap-3">
                <div className="mt-0.5 text-steel flex-shrink-0">
                  {doc.type === 'doc' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-cream group-hover:text-brand-gold transition-colors">{doc.title}</div>
                  <p className="mt-1 text-[11px] text-steel line-clamp-2">{doc.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="badge-gold">{doc.category}</span>
                    <span className="text-[11px] text-[#3a5a7a]">
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
