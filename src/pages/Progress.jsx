// src/pages/Progress.jsx
import { getProgress, getContracts } from '../api'
import ProgressBar from '../components/ProgressBar'
import StatusTag from '../components/StatusTag'

const WS_STATUS = {
  ahead:      { kind: 'info',    label: 'Ahead',    bar: 'primary' },
  'on-track': { kind: 'success', label: 'On track', bar: 'success' },
  'at-risk':  { kind: 'error',   label: 'At risk',  bar: 'error'   },
}

const CONTRACT_STATUS = {
  'awarded':     { kind: 'success', label: 'Awarded'     },
  'in-progress': { kind: 'warn',    label: 'In progress' },
  'not-started': { kind: 'error',   label: 'Not started' },
}

const fmtShort = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export default function Progress() {
  const { overall, initiatives, milestones } = getProgress()
  const contracts = getContracts()

  return (
    <div className="px-10 py-8 max-w-[1240px]">

      {/* Page header */}
      <div className="mb-8">
        <p className="eyebrow mb-2">Tracker</p>
        <h1>Progress</h1>
        <p className="text-gov-gray-70 mt-2">
          56-day countdown — mission readiness across all workstreams.
        </p>
      </div>

      {/* Overall readiness */}
      <div className="card card-rule-primary p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[12px] font-bold tracking-[0.04em] uppercase text-gov-gray-60 mb-1">
              Overall mission readiness
            </div>
            <div className="text-sm text-gov-gray-60">Across {initiatives.length} workstreams</div>
          </div>
          <div className="text-[40px] font-bold tabular-nums text-navy leading-none">{overall}%</div>
        </div>
        <ProgressBar value={overall} color="primary" height="lg"/>
      </div>

      {/* Procurement contracts */}
      <section className="mb-8">
        <h2 className="mb-4">Procurement / contracts</h2>
        <div className="grid grid-cols-2 gap-4">
          {contracts.map(c => {
            const s = CONTRACT_STATUS[c.status]
            return (
              <div key={c.id} className="card p-0 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-gov-gray-10 bg-gov-gray-cool1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg leading-none">{c.icon}</span>
                    <span className="font-bold text-gov-gray-90">{c.name}</span>
                  </div>
                  <StatusTag kind={s.kind}>{s.label}</StatusTag>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm text-gov-gray-70 leading-snug mb-4">{c.description}</p>
                  <dl className="text-sm">
                    {c.awardDate && (
                      <div className="flex justify-between py-2 border-t border-gov-gray-10">
                        <dt className="text-gov-gray-60">Awarded</dt>
                        <dd className="font-semibold text-gov-green">{fmtShort(c.awardDate)}</dd>
                      </div>
                    )}
                    {c.targetAward && (
                      <div className="flex justify-between py-2 border-t border-gov-gray-10">
                        <dt className="text-gov-gray-60">Target award</dt>
                        <dd className="font-semibold text-gov-gold-dark">{fmtShort(c.targetAward)}</dd>
                      </div>
                    )}
                  </dl>
                  <div className="mt-3 px-3 py-2.5 bg-gov-gray-cool1 border-l-4 border-navy text-[13px] text-gov-gray-70">
                    <strong className="text-gov-gray-90">Next: </strong>{c.nextStep}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Workstreams table */}
      <section className="mb-8">
        <h2 className="mb-4">Workstreams</h2>
        <div className="card p-0 overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Workstream</th>
                <th style={{width:160}}>Owner</th>
                <th style={{width:100}}>Due</th>
                <th style={{width:110}}>Status</th>
                <th style={{width:220}}>Progress</th>
                <th style={{width:56, textAlign:'right'}}>%</th>
              </tr>
            </thead>
            <tbody>
              {initiatives.map(init => {
                const s = WS_STATUS[init.status]
                return (
                  <tr key={init.id}>
                    <td>
                      <div className="font-semibold text-gov-gray-90">{init.name}</div>
                      <div className="text-[13px] text-gov-gray-60 mt-0.5">{init.note}</div>
                    </td>
                    <td className="meta">{init.owner}</td>
                    <td className="font-mono font-semibold">{init.deadline}</td>
                    <td><StatusTag kind={s.kind}>{s.label}</StatusTag></td>
                    <td><ProgressBar value={init.progress} color={s.bar} height="md"/></td>
                    <td className="text-right font-bold tabular-nums">{init.progress}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Milestones */}
      <section>
        <h2 className="mb-4">Key milestones</h2>
        <div className="card p-6">
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gov-gray-10"/>
            <div className="flex flex-col gap-5">
              {milestones.map(m => (
                <div key={m.id} className="relative flex items-start gap-5 pl-8">
                  <div className={`absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-2 ${
                    m.status === 'completed'
                      ? 'border-gov-green bg-gov-green'
                      : 'border-navy bg-white'
                  }`}/>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${
                      m.status === 'completed' ? 'text-gov-gray-60 line-through' : 'text-gov-gray-90'
                    }`}>{m.name}</div>
                    <div className="text-[13px] text-gov-gray-60 mt-0.5">
                      {new Date(m.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <StatusTag kind={m.status === 'completed' ? 'success' : 'subtle'}>
                    {m.status === 'completed' ? '✓ Done' : 'Upcoming'}
                  </StatusTag>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
