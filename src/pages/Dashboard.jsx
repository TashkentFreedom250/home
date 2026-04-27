// src/pages/Dashboard.jsx
import { Link } from 'react-router-dom'
import { getStats, getUpcomingEvents, getEventDetails, getContracts, getActions } from '../api'
import Countdown from '../components/Countdown'
import StatusTag from '../components/StatusTag'

const CONTRACT_STATUS = {
  'awarded':     { kind: 'success', label: 'Awarded',      rule: 'card-rule-success' },
  'in-progress': { kind: 'warn',    label: 'In progress',  rule: 'card-rule-warning' },
  'not-started': { kind: 'error',   label: 'Not started',  rule: 'card-rule-error'   },
}

const STAT_RULES = ['card-rule-primary', 'card-rule-success', 'card-rule-error', 'card-rule-warning']

const EVENT_TYPE_KIND = {
  'Virtual':   'info',
  'In-Person': 'info',
  'Internal':  'subtle',
}

const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export default function Dashboard() {
  const stats     = getStats()
  const events    = getUpcomingEvents().slice(0, 4)
  const event     = getEventDetails()
  const contracts = getContracts()
  const urgentCount = getActions().filter(a => a.priority === 'high').length

  const statCards = [
    { label: 'Expected guests',   value: stats.attendance.value, sub: stats.attendance.change },
    { label: 'Contracts awarded', value: stats.contracts.value,  sub: stats.contracts.change  },
    { label: 'Days to showtime',  value: stats.daysLeft.value,   sub: 'June 10, 2026'         },
    { label: 'Urgent actions',    value: String(urgentCount),    sub: 'Need decisions this week' },
  ]

  return (
    <>
      <Countdown/>

      <div className="px-10 py-8 max-w-[1240px]">

        {/* Page header */}
        <div className="mb-8">
          <p className="eyebrow mb-2">Mission control</p>
          <h1>Freedom 250 Dashboard</h1>
          <p className="text-gov-gray-70 mt-2">{event.host} · {event.location} · {event.city}</p>
        </div>

        {/* KPI stat cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {statCards.map((s, i) => (
            <div key={i} className={`card ${STAT_RULES[i]} p-5`}>
              <div className="text-[12px] font-bold tracking-[0.04em] uppercase text-gov-gray-60 mb-1">
                {s.label}
              </div>
              <div className="text-[32px] font-bold tabular-nums text-gov-gray-90 leading-none">
                {s.value}
              </div>
              <div className="text-[13px] text-gov-gray-60 mt-1.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Procurement status */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2>Procurement status</h2>
            <Link to="/progress" className="text-[13px] text-navy hover:text-navy-dark font-medium">
              View full progress →
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {contracts.map(c => {
              const s = CONTRACT_STATUS[c.status]
              return (
                <div key={c.id} className={`card ${s.rule} p-5`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xl leading-none">{c.icon}</span>
                    <StatusTag kind={s.kind}>{s.label}</StatusTag>
                  </div>
                  <div className="font-bold text-gov-gray-90 text-[15px] mb-1">{c.name}</div>
                  <p className="text-[13px] text-gov-gray-60 leading-snug">{c.nextStep}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom: key dates + quick nav */}
        <div className="grid grid-cols-[1.2fr_1fr] gap-6">

          {/* Upcoming key dates */}
          <div className="card p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gov-gray-10">
              <h3>Upcoming key dates</h3>
              <Link to="/action" className="text-[13px] text-navy hover:text-navy-dark font-medium">
                Timeline →
              </Link>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{width:90}}>Date</th>
                  <th>Event</th>
                  <th style={{width:140}}>Location</th>
                  <th style={{width:100}}>Type</th>
                </tr>
              </thead>
              <tbody>
                {events.map(ev => (
                  <tr key={ev.id} className="row-link">
                    <td className="font-mono font-semibold text-navy-dark">{fmtDate(ev.date)}</td>
                    <td className="font-medium">{ev.name}</td>
                    <td className="meta">{ev.location}</td>
                    <td>
                      <StatusTag kind={EVENT_TYPE_KIND[ev.type] ?? 'subtle'}>{ev.type}</StatusTag>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick nav */}
          <div className="card p-5 bg-gov-gray-cool1">
            <h3 className="mb-4">Quick navigation</h3>
            <div className="flex flex-col gap-3">
              {[
                { to: '/progress',  label: 'Progress & timeline',    sub: 'Workstreams, contracts, 8-week countdown' },
                { to: '/resources', label: 'Slack & resource hub',   sub: 'Channels, docs, vendor briefs'            },
                { to: '/action',    label: "Chair's command center", sub: 'Critical actions, program rundown'         },
              ].map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center justify-between bg-white border border-gov-gray-10 px-4 py-3.5 no-underline hover:bg-navy-lighter transition-colors"
                >
                  <div>
                    <div className="font-bold text-gov-gray-90 text-[15px]">{item.label}</div>
                    <div className="text-[13px] text-gov-gray-60 mt-0.5">{item.sub}</div>
                  </div>
                  <span className="text-navy font-bold ml-4">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
