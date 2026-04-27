import { useMemo, useState } from 'react'
import { getActions, getProgramRundown, getUpcomingEvents } from '../api'
import StatusTag from '../components/StatusTag'

const PRIORITY_CFG = {
  high: { kind: 'error', label: 'Urgent', accent: 'accent-coral', button: 'btn btn-secondary btn-sm' },
  medium: { kind: 'warn', label: 'This Week', accent: 'accent-amber', button: 'btn btn-primary btn-sm' },
  low: { kind: 'info', label: 'Soon', accent: 'accent-cyan', button: 'btn btn-ghost btn-sm' },
}

const CAT_CFG = {
  ceremony: { kind: 'info', label: 'Ceremony', accent: 'accent-cyan' },
  entertainment: { kind: 'ink', label: 'Entertainment', accent: 'accent-violet' },
  logistics: { kind: 'subtle', label: 'Logistics', accent: 'accent-amber' },
}

const fmtDate = date => new Date(date).toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export default function Action() {
  const actions = getActions()
  const events = getUpcomingEvents()
  const program = getProgramRundown()
  const [category, setCategory] = useState('all')
  const highPriority = actions.filter(action => action.priority === 'high')

  const filteredBlocks = useMemo(() => (
    category === 'all'
      ? program.blocks
      : program.blocks.filter(block => block.category === category)
  ), [category, program.blocks])

  return (
    <div className="page-shell">
      <section className="section-head enter d0" style={{ marginBottom: 24 }}>
        <div>
          <div className="page-kicker"><span className="eyebrow">Command center</span></div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(42px, 6vw, 72px)', maxWidth: '12ch', marginBottom: 16 }}>
            Decisions in motion.
          </h1>
          <p className="hero-lede" style={{ maxWidth: 770 }}>
            A leadership queue for blocked contracts, replacement artists, security planning, and the minute-by-minute program draft.
          </p>
        </div>
        <StatusTag kind="error">{highPriority.length} Blockers</StatusTag>
      </section>

      <div className="alert-error enter d1" style={{ marginBottom: 28 }}>
        <strong style={{ color: 'var(--coral)', flexShrink: 0 }}>Critical path</strong>
        <span>{highPriority.length} high-priority decisions are currently holding downstream planning lanes.</span>
      </div>

      <section style={{ marginBottom: 34 }}>
        <div className="section-head enter d2">
          <div>
            <h2 className="section-title">Leadership queue</h2>
            <p className="page-sub">Action cards use priority, deadline, and ownership cues so the next move is obvious.</p>
          </div>
          <span className="metric-pill">{actions.length} Open actions</span>
        </div>

        <div className="action-grid enter d3">
          {actions.map(action => {
            const cfg = PRIORITY_CFG[action.priority]
            return (
              <article className={`panel action-card lift accent-border accent-flood ${cfg.accent}`} key={action.id}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <StatusTag kind={cfg.kind}>{cfg.label}</StatusTag>
                  <span className="mono" style={{ color: 'var(--quiet)', fontSize: 12 }}>Due {action.deadline}</span>
                </div>
                <h3 style={{ marginTop: 18 }}>{action.title}</h3>
                <p className="panel-sub" style={{ marginTop: 8, flex: 1 }}>{action.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }}>
                  <button className={cfg.button} type="button">{action.cta}</button>
                  <span className="live-dot" />
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="program-layout enter d4" style={{ marginBottom: 34 }}>
        <div>
          <div className="section-head" style={{ marginBottom: 14 }}>
            <div>
              <h2 className="section-title">Draft program rundown</h2>
              <p className="page-sub">{program.note}</p>
            </div>
            <StatusTag kind="warn">Updated {fmtDate(program.lastUpdated)}</StatusTag>
          </div>

          <div className="mock-tabs" style={{ marginBottom: 14 }}>
            {['all', 'ceremony', 'entertainment', 'logistics'].map(item => (
              <button
                className={`mock-tab${category === item ? ' active' : ''}`}
                key={item}
                type="button"
                onClick={() => setCategory(item)}
              >
                {item === 'all' ? 'All blocks' : item}
              </button>
            ))}
          </div>

          <div className="schedule-stack">
            {filteredBlocks.map((block, index) => {
              const cfg = CAT_CFG[block.category] ?? { kind: 'subtle', label: block.category, accent: 'accent-blue' }
              return (
                <div className={`panel schedule-row accent-border accent-flood ${cfg.accent}`} key={`${block.time}-${index}`}>
                  <span className="mono" style={{ color: 'var(--cyan)', fontWeight: 850 }}>{block.time}</span>
                  <div>
                    <strong style={{ display: 'block', color: '#fff', fontSize: 14 }}>{block.item}</strong>
                    <span style={{ color: 'var(--quiet)', fontSize: 12 }}>{block.duration}</span>
                  </div>
                  <StatusTag kind={cfg.kind}>{cfg.label}</StatusTag>
                </div>
              )
            })}
          </div>
        </div>

        <aside className="panel accent-border accent-flood accent-cyan" style={{ padding: 18 }}>
          <div className="stat-label">Date stack</div>
          <div className="schedule-stack" style={{ marginTop: 14 }}>
            {events.map(event => (
              <div className="inspector-card lift" key={event.id} style={{ margin: 0 }}>
                <strong>{event.name}</strong>
                <span>{fmtDate(event.date)} · {event.location}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, alignItems: 'center' }}>
                  <StatusTag kind={event.type === 'Internal' ? 'subtle' : 'info'}>{event.type}</StatusTag>
                  <span className="mono" style={{ color: 'var(--quiet)', fontSize: 12 }}>{event.attendees.toLocaleString('en-US')}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  )
}
