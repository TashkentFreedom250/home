import { getProgress } from '../api'
import ProgressBar from '../components/ProgressBar'
import StatusTag from '../components/StatusTag'

const WS_CFG = {
  ahead: { kind: 'info', label: 'Ahead', bar: 'blue' },
  'on-track': { kind: 'success', label: 'On Track', bar: 'green' },
  'at-risk': { kind: 'error', label: 'At Risk', bar: 'red' },
}

export default function Progress() {
  const { overall, initiatives, milestones } = getProgress()
  const riskCount = initiatives.filter(item => item.status === 'at-risk').length
  const doneMilestones = milestones.filter(item => item.status === 'completed').length
  const topLanes = initiatives.slice(0, 5)

  return (
    <div className="page-shell page-fit">
      <header className="page-head enter d0">
        <div>
          <span className="page-eyebrow">Readiness tracker</span>
          <h1 className="page-title">Progress that feels alive.</h1>
          <p className="page-lede">A live view of every workstream, owner, and deadline driving the build.</p>
        </div>
        <StatusTag kind={riskCount ? 'error' : 'success'}>{riskCount} At Risk</StatusTag>
      </header>

      <section className="page-body enter d1">
        <article className="page-panel readiness-card">
          <div className="readiness-ring" style={{ '--pct': overall }}>
            <div>
              <strong>{overall}%</strong>
              <span>Mission ready</span>
            </div>
          </div>
          <div className="readiness-meta">
            <ProgressBar value={overall} color="blue" height="xl" />
            <div className="readiness-bento">
              {[
                ['Workstreams', `${initiatives.length - riskCount}/${initiatives.length}`, 'Healthy', 'green'],
                ['Milestones',  `${doneMilestones}/${milestones.length}`, 'Complete', 'gold'],
                ['Risks',       String(riskCount), 'Open', 'red'],
              ].map(([label, value, sub, color]) => (
                <div className="readiness-tile" key={label}>
                  <span className="readiness-tile-label">{label}</span>
                  <strong className="readiness-tile-value">{value}</strong>
                  <span className="readiness-tile-sub">{sub}</span>
                  <ProgressBar value={Math.min(100, parseInt(value, 10) ? 70 : 30)} color={color} height="sm" />
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="page-panel lanes-card">
          <header className="lanes-head">
            <h2>Workstreams</h2>
            <span className="page-sub">Owners and pace per lane</span>
          </header>
          <ul className="lane-list">
            {topLanes.map(item => {
              const cfg = WS_CFG[item.status]
              return (
                <li className="lane-row" key={item.id}>
                  <div className="lane-meta">
                    <strong>{item.name}</strong>
                    <span>{item.owner} · {item.deadline}</span>
                  </div>
                  <div className="lane-bar">
                    <ProgressBar value={item.progress} color={cfg.bar} height="sm" />
                  </div>
                  <StatusTag kind={cfg.kind}>{cfg.label}</StatusTag>
                </li>
              )
            })}
          </ul>
        </article>
      </section>
    </div>
  )
}
