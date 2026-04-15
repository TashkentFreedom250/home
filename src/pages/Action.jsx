import { getActions, getUpcomingEvents, getProgramRundown, getTimeline } from '../api'

const priorityCfg = {
  high:   { badge: 'badge-red',  label: 'Urgent'   },
  medium: { badge: 'badge-gold', label: 'This Week' },
  low:    { badge: 'badge-blue', label: 'Soon'      },
}
const typeBadge = {
  'Virtual':   'badge-blue',
  'In-Person': 'badge-red',
  'Internal':  'badge-purple',
}
const categoryCls = {
  ceremony:      'text-yellow-400 bg-yellow-950/40 border-yellow-800/30',
  entertainment: 'text-blue-400   bg-blue-950/40   border-blue-800/30',
  logistics:     'text-slate-400  bg-slate-800/40   border-slate-700/30',
}
const fmt     = (n) => n.toLocaleString('en-US')
const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default function Action() {
  const actions  = getActions()
  const events   = getUpcomingEvents()
  const program  = getProgramRundown()
  const timeline = getTimeline()
  const thisWeek = timeline.find(w => w.phase === 'current')

  return (
    <div className="min-h-full p-8">

      {/* Hero */}
      <div className="card card-glow-red relative mb-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-700 via-red-600 to-transparent" />
        <div className="relative">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-red-400">Chair's Command Center</p>
          <h1 className="mb-2 font-display text-3xl font-black text-white">Action Required</h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-400">
            Critical decisions and tasks that need your attention right now.
            56 days until showtime — every week counts.
          </p>
        </div>
      </div>

      {/* This Week's Critical Actions */}
      <section className="mb-8">
        <h2 className="mb-4 text-base font-semibold text-white">
          This Week's Actions
          <span className="ml-2 badge-red">Week {thisWeek?.week}</span>
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map(action => {
            const cfg = priorityCfg[action.priority]
            return (
              <div key={action.id} className="card flex flex-col hover:border-slate-600 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
                <div className="mb-2 flex items-start justify-between">
                  <span className="text-2xl leading-none">{action.icon}</span>
                  <span className={cfg.badge}>{cfg.label}</span>
                </div>
                <h3 className="mb-1 text-sm font-semibold text-white group-hover:text-yellow-300 transition-colors">
                  {action.title}
                </h3>
                <p className="mb-3 flex-1 text-xs leading-relaxed text-slate-500">{action.description}</p>
                <div className="flex items-center justify-between">
                  <button className="btn-primary text-xs py-2 px-3">{action.cta}</button>
                  <span className="text-xs text-slate-600">Due {action.deadline}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Program Rundown */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">
            Draft Program Rundown
            <span className="ml-2 badge-gold">DRAFT</span>
          </h2>
          <span className="text-xs text-slate-600">Updated {fmtDate(program.lastUpdated)}</span>
        </div>
        <div className="card p-0 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-800/30 px-6 py-3">
            <p className="text-xs text-slate-400 italic">{program.note}</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 w-20">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 w-20">Dur.</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Program Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 w-28">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {program.blocks.map((block, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-yellow-400">{block.time}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{block.duration}</td>
                  <td className="px-4 py-3 text-sm text-white group-hover:text-yellow-200 transition-colors">{block.item}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-block rounded-md border px-2 py-0.5 text-xs font-medium capitalize ${categoryCls[block.category]}`}>
                      {block.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Upcoming Key Dates */}
      <section>
        <h2 className="mb-4 text-base font-semibold text-white">Key Dates</h2>
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">People</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {events.map(ev => (
                <tr key={ev.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-3 font-medium text-white group-hover:text-yellow-300 transition-colors">{ev.name}</td>
                  <td className="px-6 py-3 text-slate-400">{fmtDate(ev.date)}</td>
                  <td className="px-6 py-3 text-slate-400">{ev.location}</td>
                  <td className="px-6 py-3"><span className={typeBadge[ev.type] || 'badge-gold'}>{ev.type}</span></td>
                  <td className="px-6 py-3 text-right tabular-nums text-slate-300">{fmt(ev.attendees)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
