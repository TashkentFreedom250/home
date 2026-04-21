import { getActions, getUpcomingEvents, getProgramRundown } from '../api'
import EventTimeline from '../components/EventTimeline'

const priorityCfg = {
  high:   { badge: 'badge-red',  label: 'Urgent'    },
  medium: { badge: 'badge-gold', label: 'This Week'  },
  low:    { badge: 'badge-blue', label: 'Soon'       },
}
const priorityAccent = {
  high:   'border-t-brand-red',
  medium: 'border-t-brand-gold',
  low:    'border-t-brand-blue',
}
const typeBadge = {
  'Virtual':   'badge-blue',
  'In-Person': 'badge-red',
  'Internal':  'badge-purple',
}
const categoryCls = {
  ceremony:      'text-brand-gold  bg-[#d4a830]/10 border-[#d4a830]/30',
  entertainment: 'text-brand-blue  bg-[#2563a8]/10 border-[#2563a8]/30',
  logistics:     'text-steel       bg-navy-950/60  border-[#1c3a5e]',
}
const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

function SectionLabel({ children, badge }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="h-px w-4 bg-brand-gold" />
      <h2 className="text-[10px] font-semibold tracking-[0.3em] text-cream uppercase">{children}</h2>
      {badge && <span className="badge-gold">{badge}</span>}
    </div>
  )
}

export default function Action() {
  const actions = getActions()
  const events  = getUpcomingEvents()
  const program = getProgramRundown()

  return (
    <div className="min-h-full p-8">

      {/* Header */}
      <div className="card card-glow-red mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[9px] tracking-[0.45em] text-brand-red uppercase mb-2">Chair's Command Center</div>
            <h1 className="font-display text-4xl font-bold text-cream tracking-widest leading-none">ACTION REQUIRED</h1>
            <p className="mt-2 text-sm text-steel max-w-xl">
              Tasks that need your attention this week. Contracts, CRM, and procurement must close out.
            </p>
          </div>
        </div>
      </div>

      {/* This week's actions */}
      <section className="mb-8">
        <SectionLabel>This Week's Actions</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map(action => {
            const cfg    = priorityCfg[action.priority]
            const accent = priorityAccent[action.priority]
            return (
              <div key={action.id} className={`card border-t-2 ${accent} flex flex-col hover:border-[#2a5a8e] transition-all duration-200`}>
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-sm font-semibold text-cream flex-1 mr-2">{action.title}</h3>
                  <span className={`flex-shrink-0 ${cfg.badge}`}>{cfg.label}</span>
                </div>
                <p className="mb-3 flex-1 text-[11px] leading-relaxed text-steel">{action.description}</p>
                <div className="flex items-center justify-between">
                  <button className="btn-primary text-xs py-1.5 px-3">{action.cta}</button>
                  <span className="text-[11px] text-[#3a5a7a]">Due {action.deadline}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Event timeline */}
      <section className="mb-8">
        <SectionLabel badge="DRAFT">Event Day Timeline</SectionLabel>
        <EventTimeline />
      </section>

      {/* Program rundown */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-px w-4 bg-brand-gold" />
            <h2 className="text-[10px] font-semibold tracking-[0.3em] text-cream uppercase">Program Rundown</h2>
          </div>
          <span className="text-[11px] text-steel">Updated {fmtDate(program.lastUpdated)}</span>
        </div>
        <div className="card p-0 overflow-hidden">
          <div className="border-b border-[#1c3a5e] bg-navy-950/60 px-6 py-3">
            <p className="text-[11px] text-steel italic">{program.note}</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1c3a5e]">
                {['Time', 'Dur.', 'Item', 'Category'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[9px] font-medium tracking-[0.3em] uppercase text-steel">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c3a5e]/60">
              {program.blocks.map((block, i) => (
                <tr key={i} className="hover:bg-navy-950/50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs font-semibold text-brand-gold">{block.time}</td>
                  <td className="px-4 py-3 text-xs text-steel">{block.duration}</td>
                  <td className="px-4 py-3 text-sm text-cream">{block.item}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block border px-2 py-0.5 text-[10px] font-medium capitalize ${categoryCls[block.category]}`}>
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
      <section>
        <SectionLabel>Key Dates</SectionLabel>
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1c3a5e]">
                {['Event', 'Date', 'Location', 'Type', 'People'].map((h, i) => (
                  <th key={h} className={`px-5 py-3 text-[9px] font-medium tracking-[0.3em] uppercase text-steel ${i === 4 ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c3a5e]/60">
              {events.map(ev => (
                <tr key={ev.id} className="hover:bg-navy-950/50 transition-colors group">
                  <td className="px-5 py-3 font-medium text-cream group-hover:text-brand-gold transition-colors">{ev.name}</td>
                  <td className="px-5 py-3 text-steel">{fmtDate(ev.date)}</td>
                  <td className="px-5 py-3 text-steel">{ev.location}</td>
                  <td className="px-5 py-3"><span className={typeBadge[ev.type] || 'badge-gold'}>{ev.type}</span></td>
                  <td className="px-5 py-3 text-right tabular-nums text-cream/80">{ev.attendees.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
