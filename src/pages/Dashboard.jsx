import { getStats, getUpcomingEvents } from '../api'
import Countdown from '../components/Countdown'
import StatCard from '../components/StatCard'
import { Link } from 'react-router-dom'

const fmt = (n) => n.toLocaleString('en-US')
const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export default function Dashboard() {
  const stats  = getStats()
  const events = getUpcomingEvents().slice(0, 3)

  return (
    <div className="min-h-full p-8">

      {/* Page header */}
      <div className="mb-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-yellow-600">Mission Control</p>
        <h1 className="font-display text-3xl font-black text-white">Freedom 250 Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">America's 250th anniversary — June 10, 2026</p>
      </div>

      {/* Countdown hero */}
      <div className="card card-glow-gold relative mb-8 overflow-hidden py-10 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-transparent to-red-900/10" />
        <div className="relative">
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.3em] text-yellow-600">
            Counting Down To
          </p>
          <h2 className="mb-6 font-display text-4xl font-black text-white tracking-wide">
            JUNE 10, 2026
          </h2>
          <Countdown />
          <p className="mt-6 text-xs text-slate-600">
            Two and a half centuries of liberty, courage, and the American promise.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Volunteers"    value={fmt(stats.volunteers.value)} change={stats.volunteers.change} glow="gold"  icon="🙋" />
        <StatCard title="Events Planned" value={stats.events.value}          change={stats.events.change}     glow="blue"  icon="🎉" />
        <StatCard title="States Active"  value={`${stats.states.value}/50`}  change={stats.states.change}     glow="red"   icon="🗺️" />
        <StatCard title="Cities Reached" value={fmt(stats.cities.value)}     change={stats.cities.change}     glow="green" icon="🏙️" />
      </div>

      {/* Bottom grid */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Upcoming events */}
        <div className="card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">Upcoming Events</h3>
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
                <div className="text-right">
                  <div className="text-xs font-medium text-yellow-400">{fmtDate(ev.date)}</div>
                  <div className="mt-0.5 text-xs text-slate-600">{fmt(ev.attendees)} expected</div>
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
              { to: '/progress',  label: 'Mission Progress Tracker',  sub: 'See all initiatives & milestones' },
              { to: '/resources', label: 'Slack & Resource Hub',       sub: 'Channels, docs, and brand assets' },
              { to: '/action',    label: 'Take Action',                sub: 'Volunteer, host, donate, share'   },
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
