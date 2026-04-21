import { getStats, getUpcomingEvents, getEventDetails, getContracts } from '../api'
import Countdown from '../components/Countdown'
import EventTimeline from '../components/EventTimeline'
import { Link } from 'react-router-dom'

const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

const contractBadge = {
  'awarded':     { cls: 'badge-green', label: 'Settled'      },
  'in-progress': { cls: 'badge-gold',  label: 'In Progress'  },
  'not-started': { cls: 'badge-red',   label: 'Not Started'  },
}

const contractAccent = {
  'awarded':     'border-t-green-600',
  'in-progress': 'border-t-brand-gold',
  'not-started': 'border-t-brand-red',
}

export default function Dashboard() {
  const stats     = getStats()
  const events    = getUpcomingEvents().slice(0, 4)
  const event     = getEventDetails()
  const contracts = getContracts()

  return (
    <div className="min-h-full p-8">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="mb-8 pb-6 border-b border-[#1c3a5e] flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold text-cream tracking-widest leading-none">
            MISSION CONTROL
          </h1>
          <p className="mt-2 text-[11px] tracking-[0.25em] text-steel uppercase">
            {event.host} · {event.location} · {event.city}
          </p>
        </div>
        <div className="text-right">
          <div className="text-[9px] tracking-[0.35em] text-steel uppercase mb-1">Target Date</div>
          <div className="font-display text-lg font-bold text-brand-gold tracking-wider">JUNE 10, 2026</div>
        </div>
      </div>

      {/* ── Countdown ────────────────────────────────────────────── */}
      <div className="card card-glow-red mb-6 py-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <div className="flex-1 min-w-0">
            <div className="text-[9px] tracking-[0.45em] text-brand-red uppercase mb-2">Counting Down To</div>
            <div className="font-display text-3xl font-bold text-cream tracking-wider leading-none">JUNE 10, 2026</div>
            <div className="mt-2 text-xs text-steel">America's 250th Anniversary · Uzexpocentre, Tashkent</div>
          </div>
          <div className="flex-shrink-0">
            <Countdown />
          </div>
        </div>
      </div>

      {/* ── Quick stats ──────────────────────────────────────────── */}
      <div className="card mb-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#1c3a5e]">
          {[
            { label: 'Attendance',  ...stats.attendance },
            { label: 'Contracts',   ...stats.contracts  },
            { label: 'Days Left',   ...stats.daysLeft   },
            { label: 'Budget',      ...stats.budget     },
          ].map((s, i) => (
            <div key={i} className="px-6 py-4 first:pl-0 last:pr-0">
              <div className="text-[9px] tracking-[0.3em] text-steel uppercase mb-2">{s.label}</div>
              <div className="font-bebas text-4xl text-cream leading-none">{s.value}</div>
              <div className="mt-1 text-[10px] text-steel">{s.change}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Procurement ──────────────────────────────────────────── */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-px w-4 bg-brand-gold" />
            <h3 className="text-[10px] font-semibold tracking-[0.3em] text-cream uppercase">Procurement Status</h3>
          </div>
          <Link to="/progress" className="text-[10px] tracking-[0.2em] text-steel hover:text-brand-gold transition-colors uppercase">
            Full Details →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {contracts.map(c => {
            const badge = contractBadge[c.status]
            const accent = contractAccent[c.status]
            return (
              <div key={c.id} className={`card border-t-2 ${accent}`}>
                <div className="mb-3 flex items-start justify-between gap-1">
                  <span className={badge.cls}>{badge.label}</span>
                </div>
                <div className="text-sm font-semibold text-cream">{c.name}</div>
                <div className="mt-0.5 text-xs text-brand-gold/80">{c.cost}</div>
                <p className="mt-2 text-[11px] leading-relaxed text-steel line-clamp-2">{c.nextStep}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Bottom grid ──────────────────────────────────────────── */}
      <div className="mb-6 grid gap-4 lg:grid-cols-2">

        {/* Upcoming dates */}
        <div className="card card-glow-gold">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-px w-4 bg-brand-gold" />
              <h3 className="text-[10px] font-semibold tracking-[0.3em] text-cream uppercase">Key Dates</h3>
            </div>
            <Link to="/action" className="text-[10px] tracking-[0.2em] text-steel hover:text-brand-gold transition-colors uppercase">
              All →
            </Link>
          </div>
          <div className="space-y-1.5">
            {events.map(ev => (
              <div
                key={ev.id}
                className="flex items-center justify-between border border-[#1c3a5e] bg-navy-950/60 px-4 py-3 hover:border-[#2a5a8e] transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-cream">{ev.name}</div>
                  <div className="mt-0.5 text-[11px] text-steel">{ev.location}</div>
                </div>
                <div className="ml-3 flex-shrink-0 text-right">
                  <div className="text-xs font-medium text-brand-gold">{fmtDate(ev.date)}</div>
                  <div className="mt-0.5 text-[10px] text-[#3a5a7a]">{ev.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div className="card card-glow-blue">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-4 bg-brand-blue" />
            <h3 className="text-[10px] font-semibold tracking-[0.3em] text-cream uppercase">Navigate</h3>
          </div>
          <div className="space-y-1.5">
            {[
              { to: '/progress',  label: 'Progress & Contracts', sub: 'Workstreams, milestones, timeline'  },
              { to: '/resources', label: 'Budget & Resources',   sub: 'Budget overview, channels, docs'    },
              { to: '/action',    label: "This Week's Actions",  sub: 'Critical tasks, program rundown'    },
            ].map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="group flex items-center justify-between border border-[#1c3a5e] px-4 py-3 hover:border-brand-gold/40 hover:bg-navy-700/30 transition-all duration-150"
              >
                <div>
                  <div className="text-sm font-medium text-cream/90 group-hover:text-cream transition-colors">{item.label}</div>
                  <div className="mt-0.5 text-[11px] text-steel">{item.sub}</div>
                </div>
                <span className="text-steel group-hover:text-brand-gold transition-colors">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Event timeline ───────────────────────────────────────── */}
      <EventTimeline />

    </div>
  )
}
