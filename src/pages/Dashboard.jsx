import { getStats, getUpcomingEvents, getEventDetails } from '../api'
import Countdown from '../components/Countdown'
import StatCard from '../components/StatCard'
import { Link } from 'react-router-dom'

const fmt     = (n) => typeof n === 'number' ? n.toLocaleString('en-US') : n
const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export default function Dashboard() {
  const stats  = getStats()
  const events = getUpcomingEvents().slice(0, 3)
  const event  = getEventDetails()

  return (
    <div className="min-h-full p-8">

      {/* Page header */}
      <div className="mb-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-yellow-600">Mission Control</p>
        <h1 className="font-display text-3xl font-black text-white">Freedom 250 Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">{event.host} · {event.location} · {event.city}</p>
      </div>

      {/* Countdown hero */}
      <div className="card card-glow-gold relative mb-6 overflow-hidden py-10 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-transparent to-red-900/10" />
        <div className="relative">
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.3em] text-yellow-600">
            Counting Down To
          </p>
          <h2 className="mb-6 font-display text-4xl font-black text-white tracking-wide">
            JUNE 10, 2026
          </h2>
          <Countdown />
          <p className="mt-5 text-xs text-slate-600">
            America's 250th Anniversary · Tashkent, Uzbekistan
          </p>
        </div>
      </div>

      {/* Event spotlight */}
      <div className="card card-glow-red relative mb-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-900/15 via-transparent to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-red-700/60 via-red-800/30 to-transparent" />
        <div className="relative">

          {/* Header row */}
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">🇺🇸</span>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-red-400">{event.host}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white">{event.name}</h3>
              <p className="mt-1 text-xs text-slate-400">
                {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                &nbsp;·&nbsp;{event.location}&nbsp;·&nbsp;{event.city}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-display text-2xl font-black text-yellow-400">{event.attendance}</div>
              <div className="text-xs text-slate-500 mt-0.5">Expected Guests</div>
            </div>
          </div>

          <p className="mb-5 text-sm leading-relaxed text-slate-400">{event.description}</p>

          {/* Highlight cards */}
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {event.highlights.map((h, i) => (
              <div key={i} className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="text-xl leading-none">{h.icon}</span>
                  <span className="text-xs font-semibold text-white">{h.title}</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-500">{h.detail}</p>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {event.technology.map(t => (
              <span key={t} className="badge-blue">{t}</span>
            ))}
          </div>

        </div>
      </div>

      {/* Stats row */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Expected Guests"  value={stats.attendance.value}  change={stats.attendance.change}  glow="gold"  icon="👥" />
        <StatCard title="Performers"        value={stats.performers.value}  change={stats.performers.change}  glow="blue"  icon="🎤" />
        <StatCard title="Food & Drinks"     value={stats.vendors.value}     change={stats.vendors.change}     glow="red"   icon="🍔" />
        <StatCard title="VIP Zones"         value={stats.vipZones.value}    change={stats.vipZones.change}    glow="gold"  icon="⭐" />
      </div>

      {/* Bottom grid */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Upcoming milestones */}
        <div className="card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">Upcoming Schedule</h3>
            <Link to="/action" className="text-xs text-yellow-500 hover:text-yellow-400 transition-colors">
              View all →
            </Link>
          </div>
          <div className="space-y-2">
            {events.map(ev => (
              <div key={ev.id} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/40 px-4 py-3 hover:border-slate-700 transition-colors">
                <div>
                  <div className="text-sm font-medium text-white">{ev.name}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{ev.location}</div>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <div className="text-xs font-medium text-yellow-400">{fmtDate(ev.date)}</div>
                  <div className="mt-0.5 text-xs text-slate-600">
                    {ev.attendees >= 1000 ? `${fmt(ev.attendees)}+ guests` : `${ev.attendees} ppl`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick nav */}
        <div className="card">
          <h3 className="mb-4 font-semibold text-white">Quick Navigate</h3>
          <div className="space-y-2">
            {[
              { to: '/progress',  label: 'Event Planning Progress',     sub: 'Track all workstreams & milestones'   },
              { to: '/resources', label: 'Slack & Resource Hub',         sub: 'Channels, docs, and vendor briefs'    },
              { to: '/action',    label: 'Take Action',                  sub: 'RSVP, volunteer, or request VIP access'},
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
    </div>
  )
}
