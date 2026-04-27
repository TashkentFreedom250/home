// src/pages/Action.jsx
import { getActions, getUpcomingEvents, getProgramRundown } from '../api'
import StatusTag from '../components/StatusTag'

const PRIORITY_CFG = {
  high:   { kind: 'error',   label: 'Urgent',    accent: 'accent-red',  btnClass: 'btn btn-secondary btn-sm' },
  medium: { kind: 'warn',    label: 'This Week', accent: 'accent-gold', btnClass: 'btn btn-primary btn-sm'   },
  low:    { kind: 'info',    label: 'Soon',      accent: 'accent-blue', btnClass: 'btn btn-ghost btn-sm'     },
}
const CAT_CFG = {
  ceremony:      { kind: 'info',   label: 'Ceremony'      },
  entertainment: { kind: 'ink',    label: 'Entertainment' },
  logistics:     { kind: 'subtle', label: 'Logistics'     },
}
const fmtDate  = d => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default function Action() {
  const actions  = getActions()
  const events   = getUpcomingEvents()
  const program  = getProgramRundown()

  return (
    <div style={{ padding: '32px 40px 48px', maxWidth: 1280 }}>

      {/* Header */}
      <div className="enter d0" style={{ marginBottom: 24 }}>
        <div className="eyebrow" style={{ color: 'var(--red-soft)', marginBottom: 6 }}>Chair's Command Center</div>
        <h1 className="page-title">Action Required</h1>
        <p className="page-sub">Critical decisions that need your attention right now. 56 days until showtime — every week counts.</p>
      </div>

      {/* Alert */}
      <div className="alert-error enter d1" style={{ marginBottom: 28 }}>
        <span style={{ fontWeight: 700, color: 'var(--red-soft)', flexShrink: 0 }}>Week-1 Blockers.</span>
        <span style={{ fontSize: 13, color: 'var(--fg2)' }}>
          {actions.filter(a => a.priority === 'high').length} decisions holding up downstream workstreams.
          Target: clear all by <strong style={{ color: 'var(--fg1)' }}>Apr 21</strong>.
        </span>
      </div>

      {/* Action cards */}
      <section style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span className="section-title enter d2">This Week's Actions</span>
          <span style={{ fontSize: 12, color: 'var(--fg4)' }}>Week 1 of 8</span>
        </div>
        <div className="enter d3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {actions.map((a, i) => {
            const cfg = PRIORITY_CFG[a.priority]
            return (
              <div key={a.id} className={`card ${cfg.accent} lift`} style={{ padding: 20, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <StatusTag kind={cfg.kind}>{cfg.label}</StatusTag>
                  <span style={{ fontSize: 11, color: 'var(--fg4)' }}>Due {a.deadline}</span>
                </div>
                <div style={{ fontWeight: 600, color: 'var(--fg1)', fontSize: 14, marginBottom: 6 }}>{a.title}</div>
                <p style={{ fontSize: 12, color: 'var(--fg4)', flex: 1, lineHeight: 1.55, marginBottom: 14 }}>{a.description}</p>
                <div><button className={cfg.btnClass}>{a.cta}</button></div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Program rundown */}
      <section style={{ marginBottom: 36 }}>
        <div className="enter d4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="section-title">Draft Program Rundown</span>
            <StatusTag kind="warn">Draft</StatusTag>
          </div>
          <span style={{ fontSize: 12, color: 'var(--fg4)' }}>Updated {fmtDate(program.lastUpdated)}</span>
        </div>
        <div className="alert-warn enter d5" style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--fg3)', fontStyle: 'italic' }}>{program.note}</span>
        </div>
        <div className="table-wrap enter d6">
          <table className="dtable">
            <thead>
              <tr>
                <th style={{ width: 100 }}>Time</th>
                <th style={{ width: 90 }}>Duration</th>
                <th>Program Item</th>
                <th style={{ width: 160 }}>Category</th>
              </tr>
            </thead>
            <tbody>
              {program.blocks.map((b, i) => {
                const cat = CAT_CFG[b.category] ?? { kind: 'subtle', label: b.category }
                return (
                  <tr key={i}>
                    <td style={{ fontFamily: "'Source Code Pro',monospace", fontWeight: 600, color: 'var(--blue-soft)', fontVariantNumeric: 'tabular-nums' }}>{b.time}</td>
                    <td className="muted">{b.duration}</td>
                    <td>{b.item}</td>
                    <td><StatusTag kind={cat.kind}>{cat.label}</StatusTag></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key dates */}
      <section className="enter d7">
        <div style={{ marginBottom: 14 }}><span className="section-title">Key Dates</span></div>
        <div className="table-wrap">
          <table className="dtable">
            <thead>
              <tr>
                <th>Event</th>
                <th style={{ width: 130 }}>Date</th>
                <th style={{ width: 190 }}>Location</th>
                <th style={{ width: 110 }}>Type</th>
                <th style={{ width: 100, textAlign: 'right' }}>Attendees</th>
              </tr>
            </thead>
            <tbody>
              {events.map(ev => (
                <tr key={ev.id} className="row-hover">
                  <td className="strong">{ev.name}</td>
                  <td style={{ fontFamily: "'Source Code Pro',monospace", fontWeight: 600, color: 'var(--blue-soft)', fontVariantNumeric: 'tabular-nums' }}>
                    {fmtDate(ev.date)}
                  </td>
                  <td className="muted">{ev.location}</td>
                  <td><StatusTag kind={ev.type === 'In-Person' ? 'info' : ev.type === 'Internal' ? 'subtle' : 'info'}>{ev.type}</StatusTag></td>
                  <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: 'var(--fg2)' }}>
                    {ev.attendees.toLocaleString('en-US')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
