import { getActions, getUpcomingEvents, getProgramRundown } from '../api'
import EventTimeline from '../components/EventTimeline'

const priorityCfg = {
  high:   { badge: 'badge-red',  label: 'Urgent',    accent: 'border-t-crimson' },
  medium: { badge: 'badge-gold', label: 'This Week',  accent: 'border-t-gold'   },
  low:    { badge: 'badge-blue', label: 'Soon',       accent: 'border-t-navy'   },
}
const typeBadge = {
  'Virtual':   'badge-blue',
  'In-Person': 'badge-red',
  'Internal':  'badge-purple',
}
const categoryCls = {
  ceremony:      'text-crimson bg-crimson/8 border-crimson/25',
  entertainment: 'text-navy   bg-navy/8    border-navy/25',
  logistics:     'text-ink-muted bg-paper-dark border-paper-mid',
}
const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

function SectionLabel({ children, badge }) {
  return (
    <div className="section-label mb-4">
      <span className="section-label-text">{children}</span>
      {badge && <span className="badge-gold ml-1">{badge}</span>}
    </div>
  )
}

export default function Action() {
  const actions = getActions()
  const events  = getUpcomingEvents()
  const program = getProgramRundown()

  return (
    <div className="min-h-full p-8 max-w-6xl mx-auto">

      {/* Header */}
      <div className="anim anim-1 card card-glow-red mb-6">
        <div className="font-mono text-[9px] tracking-[0.45em] text-crimson uppercase mb-2">Chair's Command Center</div>
        <h1 className="font-display text-[52px] leading-none text-ink tracking-tight">ACTION REQUIRED</h1>
        <p className="mt-2 font-mono text-[11px] text-ink-muted leading-relaxed max-w-xl">
          Tasks that need your attention this week. Contracts, CRM, and procurement must close out.
        </p>
      </div>

      {/* Actions */}
      <section className="anim anim-2 mb-8">
        <SectionLabel>This Week's Actions</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map(action => {
            const cfg = priorityCfg[action.priority]
            return (
              <div key={action.id} className={`card border-t-[3px] ${cfg.accent} flex flex-col hover:border-paper-mid transition-all duration-200`}>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="font-serif text-sm font-semibold text-ink flex-1 mr-2 leading-snug">{action.title}</h3>
                  <span className={`flex-shrink-0 ${cfg.badge}`}>{cfg.label}</span>
                </div>
                <p className="mb-3 flex-1 font-mono text-[10px] leading-relaxed text-ink-muted">{action.description}</p>
                <div className="flex items-center justify-between">
                  <button className="btn-primary text-[10px] py-1.5 px-3">{action.cta}</button>
                  <span className="font-mono text-[10px] text-ink-muted/70">Due {action.deadline}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="anim anim-3 mb-8">
        <SectionLabel badge="DRAFT">Event Day Timeline</SectionLabel>
        <EventTimeline />
      </section>

      {/* Program rundown */}
      <section className="anim anim-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <SectionLabel>Program Rundown</SectionLabel>
          <span className="font-mono text-[10px] text-ink-muted">Updated {fmtDate(program.lastUpdated)}</span>
        </div>
        <div className="card p-0 overflow-hidden">
          <div className="border-b border-paper-mid bg-paper-dark px-6 py-3">
            <p className="font-serif italic text-[11px] text-ink-muted">{program.note}</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-paper-mid">
                {['Time', 'Dur.', 'Item', 'Category'].map(h => (
                  <th key={h} className="px-5 py-3 text-left font-mono text-[9px] tracking-[0.3em] uppercase text-ink-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-paper-mid">
              {program.blocks.map((block, i) => (
                <tr key={i} className="hover:bg-paper-dark/50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs font-medium text-crimson">{block.time}</td>
                  <td className="px-4 py-3 font-mono text-[10px] text-ink-muted">{block.duration}</td>
                  <td className="px-4 py-3 font-serif text-sm text-ink">{block.item}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block border px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase ${categoryCls[block.category]}`}>
                      {block.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key dates */}
      <section className="anim anim-5">
        <SectionLabel>Key Dates</SectionLabel>
        <div className="card p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-paper-mid">
                {['Event', 'Date', 'Location', 'Type', 'People'].map((h, i) => (
                  <th key={h} className={`px-5 py-3 font-mono text-[9px] tracking-[0.3em] uppercase text-ink-muted ${i === 4 ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-paper-mid">
              {events.map(ev => (
                <tr key={ev.id} className="hover:bg-paper-dark/50 transition-colors group">
                  <td className="px-5 py-3 font-serif text-sm font-medium text-ink group-hover:text-crimson transition-colors">{ev.name}</td>
                  <td className="px-5 py-3 font-mono text-[11px] text-ink-muted">{fmtDate(ev.date)}</td>
                  <td className="px-5 py-3 font-mono text-[11px] text-ink-muted">{ev.location}</td>
                  <td className="px-5 py-3"><span className={typeBadge[ev.type] || 'badge-gold'}>{ev.type}</span></td>
                  <td className="px-5 py-3 text-right font-mono text-[11px] tabular-nums text-ink">{ev.attendees.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
