// src/pages/Dashboard.jsx
import { Link } from 'react-router-dom'
import { getStats, getUpcomingEvents, getEventDetails, getContracts, getActions } from '../api'
import Countdown from '../components/Countdown'
import ProgressBar from '../components/ProgressBar'
import StatusTag from '../components/StatusTag'

const CONTRACT_CFG = {
  'awarded':     { kind: 'success', label: 'Awarded',     accent: 'accent-green' },
  'in-progress': { kind: 'warn',    label: 'In Progress', accent: 'accent-gold'  },
  'not-started': { kind: 'error',   label: 'Not Started', accent: 'accent-red'   },
}
const STAT_ACCENTS = ['accent-blue', 'accent-green', 'accent-red', 'accent-gold']
const EVENT_TYPE   = { 'Virtual': 'info', 'In-Person': 'info', 'Internal': 'subtle' }
const fmtDate = d => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export default function Dashboard() {
  const stats     = getStats()
  const events    = getUpcomingEvents().slice(0, 4)
  const event     = getEventDetails()
  const contracts = getContracts()
  const urgentCount = getActions().filter(a => a.priority === 'high').length

  const statCards = [
    { label: 'Expected Guests',   value: stats.attendance.value, sub: stats.attendance.change },
    { label: 'Contracts Awarded', value: stats.contracts.value,  sub: stats.contracts.change  },
    { label: 'Days to Showtime',  value: stats.daysLeft.value,   sub: 'June 10, 2026 · 15:00' },
    { label: 'Urgent Actions',    value: String(urgentCount),    sub: 'Need decisions this week' },
  ]

  return (
    <>
      <Countdown/>
      <div style={{ padding: '32px 40px 48px', maxWidth: 1280 }}>

        {/* Page header */}
        <div className="enter d0" style={{ marginBottom: 32 }}>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Mission Control</div>
          <h1 className="page-title">Freedom 250 Dashboard</h1>
          <p className="page-sub">{event.host} · {event.location} · {event.city}</p>
        </div>

        {/* KPI stat cards */}
        <div className="enter d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
          {statCards.map((s, i) => (
            <div key={i} className={`card lift ${STAT_ACCENTS[i]}`} style={{ padding: '20px 22px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg4)', marginBottom: 8 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--fg1)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: 'var(--fg4)', marginTop: 6 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Procurement status */}
        <div className="enter d2" style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span className="section-title">Procurement Status</span>
            <Link to="/progress" className="link-btn">Full details →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {contracts.map(c => {
              const cfg = CONTRACT_CFG[c.status]
              return (
                <div key={c.id} className={`card lift ${cfg.accent}`} style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <span style={{ fontSize: 22, lineHeight: 1 }}>{c.icon}</span>
                    <StatusTag kind={cfg.kind}>{cfg.label}</StatusTag>
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--fg1)', marginBottom: 6 }}>{c.name}</div>
                  <p style={{ fontSize: 12, color: 'var(--fg4)', lineHeight: 1.55 }}>{c.nextStep}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom: key dates + quick nav */}
        <div className="enter d3" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }}>

          {/* Key dates */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span className="section-title">Upcoming Key Dates</span>
              <Link to="/action" className="link-btn">Timeline →</Link>
            </div>
            <div className="table-wrap">
              <table className="dtable">
                <thead>
                  <tr>
                    <th style={{ width: 80 }}>Date</th>
                    <th>Event</th>
                    <th style={{ width: 130 }}>Location</th>
                    <th style={{ width: 90 }}>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(ev => (
                    <tr key={ev.id} className="row-hover">
                      <td className="strong" style={{ fontFamily: "'Source Code Pro',monospace", color: 'var(--blue-soft)', fontVariantNumeric: 'tabular-nums' }}>
                        {fmtDate(ev.date)}
                      </td>
                      <td className="strong">{ev.name}</td>
                      <td className="muted">{ev.location}</td>
                      <td><StatusTag kind={EVENT_TYPE[ev.type] ?? 'subtle'}>{ev.type}</StatusTag></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick nav */}
          <div>
            <div style={{ marginBottom: 14 }}>
              <span className="section-title">Quick Navigate</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { to: '/progress',  label: 'Progress & Timeline',    sub: 'Workstreams, contracts, 8-week countdown' },
                { to: '/resources', label: 'Slack & Resource Hub',   sub: 'Channels, docs, vendor briefs'            },
                { to: '/action',    label: "Chair's Command Center", sub: 'Critical actions, program rundown'         },
              ].map(it => (
                <Link key={it.to} to={it.to}
                  className="card lift"
                  style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none' }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--fg1)', marginBottom: 3 }}>{it.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg4)' }}>{it.sub}</div>
                  </div>
                  <span style={{ color: 'var(--blue-soft)', fontWeight: 700, marginLeft: 12 }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
