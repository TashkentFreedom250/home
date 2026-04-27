// src/pages/Action.jsx
import { getActions, getUpcomingEvents, getProgramRundown } from '../api'
import StatusTag from '../components/StatusTag'

const PRIORITY_CFG = {
  high:   { kind: 'error',   label: 'Urgent',    rule: 'card-rule-error',   btnCls: 'btn btn-md btn-secondary' },
  medium: { kind: 'warn',    label: 'This week', rule: 'card-rule-warning', btnCls: 'btn btn-md btn-primary'   },
  low:    { kind: 'info',    label: 'Soon',      rule: 'card-rule-primary', btnCls: 'btn btn-md btn-outline'   },
}

const CAT_CFG = {
  ceremony:      { kind: 'ink',    label: 'Ceremony'      },
  entertainment: { kind: 'info',   label: 'Entertainment' },
  logistics:     { kind: 'subtle', label: 'Logistics'     },
}

const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default function Action() {
  const actions  = getActions()
  const program  = getProgramRundown()
  const events   = getUpcomingEvents()

  const urgentCount = actions.filter(a => a.priority === 'high').length

  return (
    <div className="px-10 py-8 max-w-[1240px]">

      {/* Page header */}
      <div className="mb-6">
        <p className="eyebrow mb-2" style={{color:'#b50909'}}>Chair's command center</p>
        <h1>Action Required</h1>
        <p className="text-gov-gray-70 mt-2 max-w-2xl">
          Critical decisions and tasks that need your attention right now.
          56 days until showtime — every week counts.
        </p>
      </div>

      {/* Critical alert banner */}
      <div className="alert-error mb-8">
        <strong className="text-gov-red-dark shrink-0">Week-1 blockers.</strong>
        <span className="text-[14px] text-gov-gray-70">
          {urgentCount} decisions are holding up downstream workstreams.
          Target is to clear all {urgentCount} by <strong>Apr 21</strong>.
        </span>
      </div>

      {/* Action cards */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2>This week's actions</h2>
          <span className="text-[13px] text-gov-gray-60">Week 1 of 8</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {actions.map(a => {
            const cfg = PRIORITY_CFG[a.priority]
            return (
              <div key={a.id} className={`card ${cfg.rule} flex flex-col p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <StatusTag kind={cfg.kind}>{cfg.label}</StatusTag>
                  <span className="text-[13px] text-gov-gray-60">Due {a.deadline}</span>
                </div>
                <h3 className="mb-2">{a.title}</h3>
                <p className="text-sm text-gov-gray-70 flex-1 mb-4 leading-snug">{a.description}</p>
                <div>
                  <button className={`${cfg.btnCls} btn-sm`}>{a.cta}</button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Program rundown */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2>Draft program rundown</h2>
            <StatusTag kind="warn">Draft</StatusTag>
          </div>
          <span className="text-[13px] text-gov-gray-60">Updated {fmtDate(program.lastUpdated)}</span>
        </div>
        <div className="card p-0 overflow-hidden">
          <div className="px-4 py-2.5 bg-gov-gray-cool1 border-b border-gov-gray-10">
            <p className="text-sm text-gov-gray-70 italic">{program.note}</p>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{width:110}}>Time</th>
                <th style={{width:90}}>Duration</th>
                <th>Program item</th>
                <th style={{width:160}}>Category</th>
              </tr>
            </thead>
            <tbody>
              {program.blocks.map((b, i) => {
                const cat = CAT_CFG[b.category]
                return (
                  <tr key={i}>
                    <td className="font-mono font-semibold text-navy-dark">{b.time}</td>
                    <td className="meta">{b.duration}</td>
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
      <section>
        <h2 className="mb-4">Key dates</h2>
        <div className="card p-0 overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Event</th>
                <th style={{width:130}}>Date</th>
                <th style={{width:200}}>Location</th>
                <th style={{width:110}}>Type</th>
                <th style={{width:90, textAlign:'right'}}>Attendees</th>
              </tr>
            </thead>
            <tbody>
              {events.map(ev => (
                <tr key={ev.id} className="row-link">
                  <td className="font-medium">{ev.name}</td>
                  <td className="font-mono font-semibold text-navy-dark">{fmtDate(ev.date)}</td>
                  <td className="meta">{ev.location}</td>
                  <td>
                    <StatusTag kind={ev.type === 'In-Person' ? 'info' : ev.type === 'Internal' ? 'subtle' : 'info'}>
                      {ev.type}
                    </StatusTag>
                  </td>
                  <td className="text-right tabular-nums text-gov-gray-70">
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
