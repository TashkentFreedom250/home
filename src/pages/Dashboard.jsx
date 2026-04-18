import { getStats, getUpcomingEvents, getEventDetails, getContracts } from '../api'
import Countdown from '../components/Countdown'
import EventTimeline from '../components/EventTimeline'
import { Link } from 'react-router-dom'

const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

const contractBadge = {
  'awarded':     { cls: 'badge-green', label: '✓ Settled'     },
  'in-progress': { cls: 'badge-gold',  label: 'In Progress'   },
  'not-started': { cls: 'badge-red',   label: 'Not Started'   },
}

export default function Dashboard() {
  const stats     = getStats()
  const events    = getUpcomingEvents().slice(0, 4)
  const event     = getEventDetails()
  const contracts = getContracts()

  return (
    <div className="min-h-full p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-yellow-600">Mission Control</p>
        <h1 className="font-display text-3xl font-black text-white">Freedom 250 Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">{event.host} · {event.location} · {event.city}</p>
      </div>

      {/* Countdown */}
      <div className="card card-glow-gold relative mb-6 overflow-hidden py-10 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-transparent to-red-900/10" />
        <div className="relative">
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.3em] text-yellow-600">Counting Down To</p>
          <h2 className="mb-6 font-display text-4xl font-black tracking-wide text-white">JUNE 10, 2026</h2>
          <Countdown />
          <p className="mt-5 text-xs text-slate-600">America's 250th Anniversary · Uzexpocentre, Tashkent</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { icon: '👥', ...stats.attendance },
          { icon: '📋', ...stats.contracts  },
          { icon: '⏱️', ...stats.daysLeft   },
          { icon: '💰', ...stats.budget     },
        ].map((s, i) => (
          <div key={i} className="card flex items-center gap-4">
            <span className="text-2xl leading-none">{s.icon}</span>
            <div>
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-slate-500">{s.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Contracts */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Procurement Status</h3>
          <Link to="/progress" className="text-xs text-yellow-500 hover:text-yellow-400 transition-colors">Full details →</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {contracts.map(c => {
            const badge = contractBadge[c.status]
            return (
              <div key={c.id} className={`card ${c.status === 'awarded' ? 'card-glow-blue' : ''}`}>
                <div className="mb-2 flex items-start justify-between gap-1">
                  <span className="text-xl leading-none">{c.icon}</span>
                  <span className={`${badge.cls} text-[10px]`}>{badge.label}</span>
                </div>
                <div className="text-sm font-semibold text-white">{c.name}</div>
                <div className="mt-0.5 text-xs text-yellow-600/80">{c.cost}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500 line-clamp-2">{c.nextStep}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom grid — upcoming dates + quick nav */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Upcoming Key Dates</h3>
            <Link to="/action" className="text-xs text-yellow-500 hover:text-yellow-400 transition-colors">All dates →</Link>
          </div>
          <div className="space-y-2">
            {events.map(ev => (
              <div key={ev.id} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/40 px-4 py-3 hover:border-slate-700 transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-white">{ev.name}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{ev.location}</div>
                </div>
                <div className="ml-3 flex-shrink-0 text-right">
                  <div className="text-xs font-medium text-yellow-400">{fmtDate(ev.date)}</div>
                  <div className="mt-0.5 text-xs text-slate-600">{ev.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="mb-4 text-sm font-semibold text-white">Navigate</h3>
          <div className="space-y-2">
            {[
              { to: '/progress',  label: 'Progress & Contracts', sub: 'Workstreams, milestones, timeline' },
              { to: '/resources', label: 'Budget & Resources',   sub: 'Budget overview, channels, docs'   },
              { to: '/action',    label: "This Week's Actions",  sub: 'Critical tasks, program rundown'   },
            ].map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="group flex items-center justify-between rounded-lg border border-slate-800 px-4 py-3 hover:border-yellow-700/40 hover:bg-yellow-900/10 transition-all duration-150"
              >
                <div>
                  <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{item.label}</div>
                  <div className="mt-0.5 text-xs text-slate-600">{item.sub}</div>
                </div>
                <span className="text-slate-600 group-hover:text-yellow-500 transition-colors">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive event timeline */}
      <EventTimeline />

    </div>
  )
}
