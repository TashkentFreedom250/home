import { getStats, getUpcomingEvents, getEventDetails, getContracts } from '../api'
import Countdown from '../components/Countdown'
import EventTimeline from '../components/EventTimeline'
import { Link } from 'react-router-dom'

const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

const contractBadge = {
  'awarded':     { cls: 'badge-green', label: 'Settled'     },
  'in-progress': { cls: 'badge-gold',  label: 'In Progress' },
  'not-started': { cls: 'badge-red',   label: 'Not Started' },
}
const contractAccent = {
  'awarded':     'border-t-green-700',
  'in-progress': 'border-t-gold',
  'not-started': 'border-t-crimson',
}

function Rule() {
  return <div className="h-px bg-ink/12 my-6" />
}

export default function Dashboard() {
  const stats     = getStats()
  const events    = getUpcomingEvents().slice(0, 4)
  const event     = getEventDetails()
  const contracts = getContracts()

  return (
    <div className="min-h-full p-8 max-w-6xl mx-auto">

      {/* ── Newspaper header ─────────────────────────────────── */}
      <div className="anim anim-1 mb-6 text-center border-b-4 border-ink pb-5">
        <div className="font-mono text-[9px] tracking-[0.55em] text-ink-muted uppercase mb-3">
          {event.host} ★ {event.city} ★ Est. 1776
        </div>
        <h1 className="font-display text-[64px] sm:text-[80px] leading-none text-ink tracking-tight">
          FREEDOM 250
        </h1>
        <div className="mt-2 flex items-center justify-center gap-4">
          <div className="flex-1 h-px bg-ink/15" />
          <div className="font-serif italic text-sm text-ink-light">{event.location} · {event.city}</div>
          <div className="flex-1 h-px bg-ink/15" />
        </div>
        <div className="mt-2 h-[2px] bg-crimson" />
        <div className="mt-0.5 h-[1px] bg-crimson" />
      </div>

      {/* ── Countdown ────────────────────────────────────────── */}
      <div className="anim anim-2 mb-6">
        <div className="font-mono text-[9px] tracking-[0.45em] text-crimson uppercase text-center mb-4">
          Counting Down to June 10, 2026
        </div>
        <Countdown />
        <div className="mt-3 text-center font-mono text-[10px] text-ink-muted tracking-wider">
          America's 250th Anniversary · Uzexpocentre, Tashkent
        </div>
      </div>

      <Rule />

      {/* ── Stats strip ──────────────────────────────────────── */}
      <div className="anim anim-3 border border-paper-mid bg-paper-card divide-x divide-paper-mid mb-6"
           style={{ boxShadow: '2px 3px 0 rgba(26,21,16,0.05)' }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-paper-mid">
          {[
            { label: 'Attendance',  ...stats.attendance },
            { label: 'Contracts',   ...stats.contracts  },
            { label: 'Days Left',   ...stats.daysLeft   },
            { label: 'Budget',      ...stats.budget     },
          ].map((s, i) => (
            <div key={i} className="px-6 py-5">
              <div className="font-mono text-[9px] tracking-[0.3em] text-ink-muted uppercase mb-1">{s.label}</div>
              <div className="font-display text-4xl text-ink leading-none tracking-tight">{s.value}</div>
              <div className="mt-1 font-mono text-[10px] text-ink-muted">{s.change}</div>
            </div>
          ))}
        </div>
      </div>

      <Rule />

      {/* ── Procurement ──────────────────────────────────────── */}
      <div className="anim anim-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="section-label">
            <span className="section-label-text">Procurement Status</span>
          </div>
          <Link to="/progress" className="font-mono text-[10px] tracking-[0.2em] text-ink-muted hover:text-crimson transition-colors uppercase">
            Full Details →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {contracts.map(c => {
            const badge  = contractBadge[c.status]
            const accent = contractAccent[c.status]
            return (
              <div key={c.id} className={`card border-t-[3px] ${accent}`}>
                <div className="mb-2">
                  <span className={badge.cls}>{badge.label}</span>
                </div>
                <div className="font-serif text-sm font-semibold text-ink leading-snug">{c.name}</div>
                <div className="mt-0.5 font-mono text-[11px] text-gold">{c.cost}</div>
                <p className="mt-2 font-mono text-[10px] leading-relaxed text-ink-muted line-clamp-2">{c.nextStep}</p>
              </div>
            )
          })}
        </div>
      </div>

      <Rule />

      {/* ── Bottom grid ──────────────────────────────────────── */}
      <div className="anim anim-5 mb-6 grid gap-5 lg:grid-cols-2">

        {/* Key dates */}
        <div className="card card-glow-gold">
          <div className="flex items-center justify-between mb-4">
            <div className="section-label mb-0">
              <span className="section-label-text">Key Dates</span>
            </div>
            <Link to="/action" className="font-mono text-[10px] text-ink-muted hover:text-crimson transition-colors uppercase tracking-wider">
              All →
            </Link>
          </div>
          <div className="divide-y divide-paper-mid">
            {events.map(ev => (
              <div key={ev.id} className="flex items-center justify-between py-3 hover:bg-paper-dark/40 -mx-2 px-2 transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="truncate font-serif text-sm font-medium text-ink">{ev.name}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-ink-muted">{ev.location}</div>
                </div>
                <div className="ml-4 flex-shrink-0 text-right">
                  <div className="font-mono text-xs font-medium text-crimson">{fmtDate(ev.date)}</div>
                  <div className="mt-0.5 font-mono text-[9px] text-ink-muted/60">{ev.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div className="card card-glow-blue">
          <div className="section-label mb-4">
            <span className="section-label-text">Navigate</span>
          </div>
          <div className="divide-y divide-paper-mid">
            {[
              { to: '/progress',  label: 'Progress & Contracts', sub: 'Workstreams, milestones, timeline'  },
              { to: '/resources', label: 'Budget & Resources',   sub: 'Budget overview, channels, docs'    },
              { to: '/action',    label: "This Week's Actions",  sub: 'Critical tasks, program rundown'    },
            ].map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="group flex items-center justify-between py-4 -mx-2 px-2 hover:bg-paper-dark/40 transition-colors"
              >
                <div>
                  <div className="font-serif text-sm font-semibold text-ink group-hover:text-crimson transition-colors">{item.label}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-ink-muted">{item.sub}</div>
                </div>
                <span className="font-mono text-ink-muted group-hover:text-crimson transition-colors ml-4">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <div className="anim anim-6">
        <div className="section-label mb-4">
          <span className="section-label-text">Event Day Timeline</span>
        </div>
        <EventTimeline />
      </div>

    </div>
  )
}
