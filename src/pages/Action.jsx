import { getActions, getUpcomingEvents } from '../api'

const priorityConfig = {
  high:   { badge: 'badge-red',  label: 'High Priority' },
  medium: { badge: 'badge-gold', label: 'Medium'        },
  low:    { badge: 'badge-blue', label: 'Low Priority'  },
}
const typeConfig = {
  'Virtual':   'badge-blue',
  'In-Person': 'badge-red',
  'Hybrid':    'badge-gold',
}
const fmt     = (n) => n.toLocaleString('en-US')
const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default function Action() {
  const actions = getActions()
  const events  = getUpcomingEvents()

  return (
    <div className="min-h-full p-8">

      {/* Hero banner */}
      <div className="card card-glow-red relative mb-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-700 via-red-600 to-transparent" />
        <div className="relative">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-red-400">
            Your Country Needs You
          </p>
          <h1 className="mb-3 font-display text-4xl font-black text-white">Take Action</h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-300">
            America's 250th birthday is a once-in-a-lifetime event — and it takes every American
            to make it extraordinary. Find your role in this historic celebration.
          </p>
        </div>
      </div>

      {/* Action cards */}
      <section className="mb-8">
        <h2 className="mb-4 text-base font-semibold text-white">Ways to Contribute</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map(action => {
            const cfg = priorityConfig[action.priority]
            return (
              <div
                key={action.id}
                className="card flex flex-col hover:border-slate-600 hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
              >
                <div className="mb-3 text-3xl leading-none">{action.icon}</div>
                <h3 className="mb-1.5 text-sm font-semibold text-white group-hover:text-yellow-300 transition-colors">
                  {action.title}
                </h3>
                <p className="mb-4 flex-1 text-xs leading-relaxed text-slate-500">{action.description}</p>
                <div className="flex items-center justify-between">
                  <button className="btn-primary">{action.cta}</button>
                  <span className={cfg.badge}>{cfg.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Events table */}
      <section>
        <h2 className="mb-4 text-base font-semibold text-white">Upcoming Events</h2>
        <div className="card overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Event</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Location</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Type</th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-500">Expected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {events.map(ev => (
                <tr key={ev.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-white group-hover:text-yellow-300 transition-colors">
                    {ev.name}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{fmtDate(ev.date)}</td>
                  <td className="px-6 py-4 text-slate-400">{ev.location}</td>
                  <td className="px-6 py-4">
                    <span className={typeConfig[ev.type]}>{ev.type}</span>
                  </td>
                  <td className="px-6 py-4 text-right tabular-nums text-slate-300">{fmt(ev.attendees)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
