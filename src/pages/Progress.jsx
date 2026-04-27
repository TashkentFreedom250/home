import { getContracts, getProgress, getTimeline } from '../api'
import ProgressBar from '../components/ProgressBar'
import StatusTag from '../components/StatusTag'

const WS_CFG = {
  ahead: { kind: 'info', label: 'Ahead', bar: 'blue', accent: 'accent-cyan' },
  'on-track': { kind: 'success', label: 'On Track', bar: 'green', accent: 'accent-mint' },
  'at-risk': { kind: 'error', label: 'At Risk', bar: 'red', accent: 'accent-coral' },
}

const CONTRACT_CFG = {
  awarded: { kind: 'success', label: 'Awarded', accent: 'accent-mint' },
  'in-progress': { kind: 'warn', label: 'In Progress', accent: 'accent-amber' },
  'not-started': { kind: 'error', label: 'Not Started', accent: 'accent-coral' },
}

const fmtShort = date => date
  ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  : null

export default function Progress() {
  const { overall, initiatives, milestones } = getProgress()
  const contracts = getContracts()
  const timeline = getTimeline()
  const riskCount = initiatives.filter(item => item.status === 'at-risk').length
  const doneMilestones = milestones.filter(item => item.status === 'completed').length

  return (
    <div className="page-shell">
      <section className="section-head enter d0" style={{ marginBottom: 24 }}>
        <div>
          <div className="page-kicker"><span className="eyebrow">Readiness tracker</span></div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(42px, 6vw, 72px)', maxWidth: '12ch', marginBottom: 16 }}>
            Progress that feels alive.
          </h1>
          <p className="hero-lede" style={{ maxWidth: 780 }}>
            The event plan is split into workstreams, weeks, contracts, and milestones so each dependency has a visible owner and next move.
          </p>
        </div>
        <StatusTag kind={riskCount ? 'error' : 'success'}>{riskCount} At Risk</StatusTag>
      </section>

      <section className="panel readiness-panel accent-border accent-flood accent-cyan enter d1" style={{ '--pct': overall }}>
        <div className="readiness-ring">
          <div>
            <strong>{overall}%</strong>
            <span>Mission ready</span>
          </div>
        </div>
        <div>
          <div className="section-head" style={{ marginBottom: 16 }}>
            <div>
              <h2 className="panel-title">Overall readiness</h2>
              <p className="panel-sub">Across {initiatives.length} active workstreams and {milestones.length} major milestones.</p>
            </div>
            <StatusTag kind="success">{doneMilestones} Milestones Done</StatusTag>
          </div>
          <ProgressBar value={overall} color="blue" height="xl" />
          <div className="bento-grid" style={{ marginTop: 16 }}>
            {[
              ['Contracts', `${contracts.filter(item => item.status === 'awarded').length}/${contracts.length}`, 'Awarded'],
              ['Workstreams', `${initiatives.length - riskCount}/${initiatives.length}`, 'Healthy'],
              ['Milestones', `${doneMilestones}/${milestones.length}`, 'Complete'],
            ].map(([label, value, sub], index) => (
              <div className="inspector-card" key={label} style={{ gridColumn: 'span 4', margin: 0 }}>
                <strong>{value} {sub}</strong>
                <span>{label}</span>
                <div style={{ marginTop: 10 }}>
                  <ProgressBar value={[40, 70, 33][index]} color={['gold', 'green', 'blue'][index]} height="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <div className="section-head enter d2">
          <div>
            <h2 className="section-title">Workstreams</h2>
            <p className="page-sub">A compact command board for the people and deadlines behind each lane.</p>
          </div>
        </div>
        <div className="workstream-grid enter d3">
          {initiatives.map(item => {
            const cfg = WS_CFG[item.status]
            return (
              <article className={`panel workstream-card lift accent-border accent-flood ${cfg.accent}`} key={item.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div>
                    <h3>{item.name}</h3>
                    <p className="panel-sub">{item.note}</p>
                  </div>
                  <StatusTag kind={cfg.kind}>{cfg.label}</StatusTag>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '18px 0 8px', color: 'var(--quiet)', fontSize: 12 }}>
                  <span>{item.owner}</span>
                  <span className="mono">{item.deadline}</span>
                </div>
                <ProgressBar value={item.progress} color={cfg.bar} height="md" />
                <div className="mono" style={{ marginTop: 8, color: 'var(--muted)', fontWeight: 800 }}>{item.progress}% complete</div>
              </article>
            )
          })}
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <div className="section-head enter d4">
          <div>
            <h2 className="section-title">Contract room</h2>
            <p className="page-sub">Procurement status as production cards, with target dates and current blockers.</p>
          </div>
        </div>
        <div className="bento-grid enter d5">
          {contracts.map(contract => {
            const cfg = CONTRACT_CFG[contract.status]
            return (
              <article className={`panel contract-card accent-border accent-flood ${cfg.accent}`} key={contract.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div className="stat-label">{contract.cost}</div>
                    <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 780, margin: '8px 0 6px' }}>{contract.name}</h3>
                  </div>
                  <StatusTag kind={cfg.kind}>{cfg.label}</StatusTag>
                </div>
                <p className="panel-sub">{contract.description}</p>
                <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
                  {contract.awardDate ? <span className="tag tag-success">Awarded {fmtShort(contract.awardDate)}</span> : null}
                  {contract.targetAward ? <span className="tag tag-warn">Target {fmtShort(contract.targetAward)}</span> : null}
                  <div className="inspector-card" style={{ margin: 0 }}>
                    <strong>Next</strong>
                    <span>{contract.nextStep}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="program-layout enter d6">
        <div>
          <div className="section-head" style={{ marginBottom: 14 }}>
            <div>
              <h2 className="section-title">Milestones</h2>
              <p className="page-sub">The critical path from signed contracts to technical rehearsal.</p>
            </div>
          </div>
          <div className="timeline-grid">
            {milestones.map(milestone => (
              <article
                className={`panel milestone-card accent-border accent-flood ${milestone.status === 'completed' ? 'accent-mint' : 'accent-blue'}`}
                key={milestone.id}
              >
                <StatusTag kind={milestone.status === 'completed' ? 'success' : 'subtle'}>
                  {milestone.status === 'completed' ? 'Done' : 'Upcoming'}
                </StatusTag>
                <h3 style={{ margin: '14px 0 10px', color: '#fff', fontSize: 14, lineHeight: 1.35 }}>{milestone.name}</h3>
                <p className="panel-sub">{new Date(milestone.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="panel accent-border accent-flood accent-amber" style={{ padding: 18 }}>
          <div className="stat-label">Eight-week sprint</div>
          <div className="schedule-stack" style={{ marginTop: 14 }}>
            {timeline.slice(0, 5).map(week => (
              <div className="schedule-row" key={week.week} style={{ gridTemplateColumns: '54px minmax(0, 1fr) auto' }}>
                <span className="mono" style={{ color: 'var(--amber)', fontWeight: 850 }}>W{week.week}</span>
                <div>
                  <strong style={{ display: 'block', color: '#fff', fontSize: 13 }}>{week.label}</strong>
                  <span style={{ color: 'var(--quiet)', fontSize: 12 }}>{week.dates}</span>
                </div>
                <StatusTag kind={week.phase === 'current' ? 'warn' : 'subtle'}>{week.phase}</StatusTag>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  )
}
