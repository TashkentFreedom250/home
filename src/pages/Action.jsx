import { getActions } from '../api'
import StatusTag from '../components/StatusTag'

const PRIORITY_CFG = {
  high:   { kind: 'error', label: 'Urgent',    accent: 'accent-coral' },
  medium: { kind: 'warn',  label: 'This Week', accent: 'accent-amber' },
  low:    { kind: 'info',  label: 'Soon',      accent: 'accent-cyan'  },
}

export default function Action() {
  const actions = getActions()
  const blockerCount = actions.filter(action => action.priority === 'high').length

  return (
    <div className="page-shell page-fit">
      <header className="page-head enter d0">
        <div>
          <span className="page-eyebrow">Command center</span>
          <h1 className="page-title">Decisions in motion.</h1>
          <p className="page-lede">A leadership queue surfacing every blocker, owner, and next move on the path to showtime.</p>
        </div>
        <StatusTag kind="error">{blockerCount} Blockers</StatusTag>
      </header>

      <section className="page-body enter d1">
        <article className="page-panel actions-card">
          <header className="lanes-head">
            <h2>Leadership queue</h2>
            <span className="page-sub">Priority, deadline, and owner — at a glance</span>
          </header>
          <div className="action-board">
            {actions.map(action => {
              const cfg = PRIORITY_CFG[action.priority]
              return (
                <div className={`action-tile accent-flood ${cfg.accent}`} key={action.id}>
                  <div className="action-tile-head">
                    <StatusTag kind={cfg.kind}>{cfg.label}</StatusTag>
                    <span className="mono action-tile-due">Due {action.deadline}</span>
                  </div>
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                  <button className="action-tile-cta" type="button">{action.cta}</button>
                </div>
              )
            })}
          </div>
        </article>
      </section>
    </div>
  )
}
