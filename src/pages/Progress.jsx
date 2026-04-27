// src/pages/Progress.jsx
import { getProgress, getContracts } from '../api'
import ProgressBar from '../components/ProgressBar'
import StatusTag from '../components/StatusTag'

const WS_CFG = {
  ahead:      { kind: 'info',    label: 'Ahead',    bar: 'blue'  },
  'on-track': { kind: 'success', label: 'On Track', bar: 'green' },
  'at-risk':  { kind: 'error',   label: 'At Risk',  bar: 'red'   },
}
const CONTRACT_CFG = {
  'awarded':     { kind: 'success', label: 'Awarded'     },
  'in-progress': { kind: 'warn',    label: 'In Progress' },
  'not-started': { kind: 'error',   label: 'Not Started' },
}
const fmtShort = d => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null

export default function Progress() {
  const { overall, initiatives, milestones } = getProgress()
  const contracts = getContracts()

  return (
    <div style={{ padding: '32px 40px 48px', maxWidth: 1280 }}>

      {/* Header */}
      <div className="enter d0" style={{ marginBottom: 32 }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>Tracker</div>
        <h1 className="page-title">Progress</h1>
        <p className="page-sub">56-day countdown — mission readiness across all workstreams.</p>
      </div>

      {/* Overall readiness */}
      <div className="card accent-blue enter d1" style={{ padding: '22px 28px', marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg4)' }}>
              Overall Mission Readiness
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg4)', marginTop: 4 }}>Across {initiatives.length} workstreams</div>
          </div>
          <div style={{ fontFamily: "'Merriweather',serif", fontSize: 48, fontWeight: 900, color: 'var(--blue-soft)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
            {overall}%
          </div>
        </div>
        <ProgressBar value={overall} color="blue" height="xl"/>
      </div>

      {/* Contracts */}
      <section style={{ marginBottom: 28 }}>
        <h2 className="section-title enter d2" style={{ marginBottom: 14 }}>Procurement / Contracts</h2>
        <div className="enter d3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {contracts.map(c => {
            const cfg = CONTRACT_CFG[c.status]
            return (
              <div key={c.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(0,0,0,0.2)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18, lineHeight: 1 }}>{c.icon}</span>
                    <span style={{ fontWeight: 600, color: 'var(--fg1)' }}>{c.name}</span>
                  </div>
                  <StatusTag kind={cfg.kind}>{cfg.label}</StatusTag>
                </div>
                <div style={{ padding: '14px 18px' }}>
                  <p style={{ fontSize: 12, color: 'var(--fg4)', lineHeight: 1.55, marginBottom: 12 }}>{c.description}</p>
                  {c.awardDate   && <div style={{ fontSize: 12, color: 'var(--fg4)', marginBottom: 6 }}>Awarded: <span style={{ color: 'var(--green-soft)', fontWeight: 600 }}>{fmtShort(c.awardDate)}</span></div>}
                  {c.targetAward && <div style={{ fontSize: 12, color: 'var(--fg4)', marginBottom: 6 }}>Target award: <span style={{ color: 'var(--gold-soft)', fontWeight: 600 }}>{fmtShort(c.targetAward)}</span></div>}
                  <div style={{
                    marginTop: 10, padding: '8px 12px', borderRadius: 6,
                    background: 'var(--blue-dim)', border: '1px solid rgba(36,145,255,0.18)',
                    fontSize: 12, color: 'var(--blue-soft)',
                  }}>
                    Next: {c.nextStep}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Workstreams table */}
      <section className="enter d4" style={{ marginBottom: 28 }}>
        <h2 className="section-title" style={{ marginBottom: 14 }}>Workstreams</h2>
        <div className="table-wrap">
          <table className="dtable">
            <thead>
              <tr>
                <th>Workstream</th>
                <th style={{ width: 150 }}>Owner</th>
                <th style={{ width: 90 }}>Due</th>
                <th style={{ width: 110 }}>Status</th>
                <th style={{ width: 210 }}>Progress</th>
                <th style={{ width: 52, textAlign: 'right' }}>%</th>
              </tr>
            </thead>
            <tbody>
              {initiatives.map(init => {
                const cfg = WS_CFG[init.status]
                return (
                  <tr key={init.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--fg1)' }}>{init.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--fg4)', marginTop: 2 }}>{init.note}</div>
                    </td>
                    <td className="muted">{init.owner}</td>
                    <td style={{ fontFamily: "'Source Code Pro',monospace", fontWeight: 600, color: 'var(--fg2)', fontVariantNumeric: 'tabular-nums' }}>{init.deadline}</td>
                    <td><StatusTag kind={cfg.kind}>{cfg.label}</StatusTag></td>
                    <td style={{ verticalAlign: 'middle' }}><ProgressBar value={init.progress} color={cfg.bar} height="md"/></td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--fg1)', fontVariantNumeric: 'tabular-nums' }}>{init.progress}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Milestones */}
      <section className="enter d5">
        <h2 className="section-title" style={{ marginBottom: 14 }}>Key Milestones</h2>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 7, top: 4, bottom: 4, width: 1, background: 'rgba(255,255,255,0.07)' }}/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {milestones.map(m => (
                <div key={m.id} style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 20, paddingLeft: 28 }}>
                  <div style={{
                    position: 'absolute', left: 0, top: 3,
                    width: 14, height: 14, borderRadius: '50%',
                    border: `2px solid ${m.status === 'completed' ? 'var(--green)' : 'rgba(36,145,255,0.4)'}`,
                    background: m.status === 'completed' ? 'var(--green)' : 'var(--bg)',
                  }}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: m.status === 'completed' ? 'var(--fg4)' : 'var(--fg1)', textDecoration: m.status === 'completed' ? 'line-through' : 'none' }}>
                      {m.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--fg4)', marginTop: 2 }}>
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
