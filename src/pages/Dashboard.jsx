import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getActions,
  getContracts,
  getCountdown,
  getEventDetails,
  getProgress,
  getProgramRundown,
  getStats,
  getUpcomingEvents,
} from '../api'
import ProgressBar from '../components/ProgressBar'
import StatusTag from '../components/StatusTag'

const CONTRACT_CFG = {
  awarded: { kind: 'success', label: 'Awarded', accent: 'accent-mint' },
  'in-progress': { kind: 'warn', label: 'In Progress', accent: 'accent-amber' },
  'not-started': { kind: 'error', label: 'Not Started', accent: 'accent-coral' },
}

const FEATURES = [
  'Run of show',
  'Vendor tracking',
  'Protocol',
  'Security',
  'Comms',
  'Budget',
  'Documents',
  'Guest flow',
]

const fmtDate = d => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

function HeroCountdown() {
  const [time, setTime] = useState(getCountdown)

  useEffect(() => {
    const id = setInterval(() => setTime(getCountdown()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="hero-countdown" aria-label="Countdown to event">
      {[
        ['Days', time.days],
        ['Hours', time.hours],
        ['Minutes', time.minutes],
        ['Seconds', time.seconds],
      ].map(([label, value]) => (
        <div className="count-tile" key={label}>
          <span className="count-value">{String(value).padStart(2, '0')}</span>
          <span className="count-label">{label}</span>
        </div>
      ))}
    </div>
  )
}

function FeatureMarquee() {
  const pills = FEATURES.map((feature, index) => (
    <span className="feature-pill" key={`${feature}-${index}`}>
      <span className="feature-dot" />
      {feature}
    </span>
  ))

  return (
    <div className="feature-marquee" aria-hidden="true">
      <div className="feature-track">{pills}</div>
      <div className="feature-track">{pills}</div>
    </div>
  )
}

function buildWorkspaceTabs({ program, contracts, events, actions }) {
  const urgent = actions.filter(action => action.priority === 'high')
  const nextEvents = events.slice(0, 4)

  return [
    {
      label: 'Program',
      title: 'Run of show is live',
      description: 'Program blocks, ceremony beats, and show flow stay visible while the team works.',
      lanes: [
        {
          title: 'Ceremony',
          cards: program.blocks.filter(block => block.category === 'ceremony').slice(0, 3).map(block => ({
            title: block.item,
            meta: `${block.time} · ${block.duration}`,
          })),
        },
        {
          title: 'Stage',
          cards: program.blocks.filter(block => block.category === 'entertainment').slice(0, 3).map(block => ({
            title: block.item,
            meta: `${block.time} · ${block.duration}`,
          })),
        },
        {
          title: 'Ops',
          cards: program.blocks.filter(block => block.category === 'logistics').slice(0, 3).map(block => ({
            title: block.item,
            meta: `${block.time} · ${block.duration}`,
          })),
        },
      ],
    },
    {
      label: 'Contracts',
      title: 'Procurement without mystery',
      description: 'Every vendor sits in one board with owner context, status, and the next move.',
      lanes: [
        {
          title: 'Signed',
          cards: contracts.filter(item => item.status === 'awarded').map(item => ({
            title: item.name,
            meta: item.nextStep,
          })),
        },
        {
          title: 'Active',
          cards: contracts.filter(item => item.status === 'in-progress').map(item => ({
            title: item.name,
            meta: item.nextStep,
          })),
        },
        {
          title: 'Attention',
          cards: urgent.slice(0, 3).map(item => ({
            title: item.title,
            meta: `Due ${item.deadline}`,
          })),
        },
      ],
    },
    {
      label: 'Calendar',
      title: 'The next critical dates',
      description: 'Meetings, sign-offs, and rehearsals are connected to the same event system.',
      lanes: [
        {
          title: 'Week',
          cards: nextEvents.slice(0, 2).map(item => ({
            title: item.name,
            meta: `${fmtDate(item.date)} · ${item.location}`,
          })),
        },
        {
          title: 'Prod',
          cards: nextEvents.slice(2, 4).map(item => ({
            title: item.name,
            meta: `${fmtDate(item.date)} · ${item.attendees} attendees`,
          })),
        },
        {
          title: 'Showtime',
          cards: events.slice(-2).map(item => ({
            title: item.name,
            meta: `${fmtDate(item.date)} · ${item.location}`,
          })),
        },
      ],
    },
  ]
}

function MissionWorkspace({ tabs, activeTab, onTabChange, readiness, event }) {
  const tab = tabs[activeTab]

  return (
    <div className="visual-stage enter d1">
      <div className="desktop-window">
        <div className="window-bar">
          <div className="traffic"><span /><span /><span /></div>
          <div className="window-title">
            <span className="live-dot" />
            Freedom 250 Workspace
          </div>
        </div>

        <div className="window-body">
          <aside className="window-rail">
            <div className="rail-search" />
            {['Mission Control', 'Program', 'Vendors', 'Protocol', 'Security', 'Inbox'].map((item, index) => (
              <div key={item} className={`rail-item${index === 0 ? ' active' : ''}`}>
                <span className="rail-glyph" style={{ background: ['var(--cyan)', 'var(--amber)', 'var(--mint)', 'var(--coral)', 'var(--violet)', 'var(--blue)'][index] }} />
                {item}
              </div>
            ))}
          </aside>

          <section className="window-main">
            <div className="mock-tabs">
              {tabs.map((item, index) => (
                <button
                  className={`mock-tab${activeTab === index ? ' active' : ''}`}
                  key={item.label}
                  type="button"
                  onClick={() => onTabChange(index)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mock-heading">
              <div>
                <h2>{tab.title}</h2>
                <p>{tab.description}</p>
              </div>
              <StatusTag kind="info">{readiness}% Ready</StatusTag>
            </div>

            <div className="mock-board">
              {tab.lanes.map(lane => (
                <div className="mock-lane" key={lane.title}>
                  <div className="mock-lane-title">
                    <span>{lane.title}</span>
                    <span>{lane.cards.length}</span>
                  </div>
                  {lane.cards.map((card, index) => (
                    <div className="mock-card" key={`${card.title}-${index}`}>
                      <strong>{card.title}</strong>
                      <small>{card.meta}</small>
                      <div className="avatars" aria-hidden="true">
                        <span className="avatar">AV</span>
                        <span className="avatar">PR</span>
                        <span className="avatar">RS</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <aside className="window-inspector">
            <div className="inspector-card">
              <strong>{event.name}</strong>
              <span>{event.location}</span>
            </div>
            <div className="inspector-card">
              <strong>Guest flow</strong>
              <span>{event.attendance} guests across VIP, press, and general arrival lanes.</span>
            </div>
            <div className="inspector-card">
              <strong>Readiness curve</strong>
              <span>Critical path is strongest on AV, power, and artist booking.</span>
              <div style={{ marginTop: 10 }}>
                <ProgressBar value={readiness} color="blue" height="sm" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const stats = getStats()
  const event = getEventDetails()
  const contracts = getContracts()
  const actions = getActions()
  const events = getUpcomingEvents()
  const progress = getProgress()
  const program = getProgramRundown()
  const urgentCount = actions.filter(action => action.priority === 'high').length
  const [activeTab, setActiveTab] = useState(0)

  const workspaceTabs = useMemo(
    () => buildWorkspaceTabs({ program, contracts, events, actions }),
    [program, contracts, events, actions],
  )

  const statCards = [
    { label: 'Expected Guests', value: stats.attendance.value, sub: 'Arrival flow, VIP zones, press lane', accent: 'accent-cyan' },
    { label: 'Contracts', value: stats.contracts.value, sub: stats.contracts.change, accent: 'accent-mint' },
    { label: 'Days Left', value: stats.daysLeft.value, sub: 'June 10, 2026 at Uzexpocentre', accent: 'accent-amber' },
    { label: 'Urgent Actions', value: String(urgentCount), sub: 'Decision queue for leadership', accent: 'accent-coral' },
  ]

  return (
    <div className="page-shell">
      <section className="hero-grid">
        <div className="hero-copy enter d0">
          <div className="page-kicker">
            <span className="eyebrow"><span className="live-dot" /> Everything app for event teams</span>
          </div>
          <h1 className="hero-title">One beautiful place to run <span>Freedom 250.</span></h1>
          <p className="hero-lede">
            A dark, fast, Huly-inspired mission workspace for program flow, contracts,
            vendors, security, documents, and the decisions that keep show week calm.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-md" to="/action">Open action queue</Link>
            <Link className="btn btn-ghost btn-md" to="/progress">View readiness</Link>
          </div>
          <HeroCountdown />
        </div>

        <MissionWorkspace
          tabs={workspaceTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          readiness={progress.overall}
          event={event}
        />
      </section>

      <FeatureMarquee />

      <section style={{ marginTop: 12, marginBottom: 34 }}>
        <div className="section-head enter d2">
          <div>
            <h2 className="section-title">Mission dashboard</h2>
            <p className="page-sub">{event.host} · {event.city} · {event.location}</p>
          </div>
          <StatusTag kind="info">{progress.overall}% overall readiness</StatusTag>
        </div>

        <div className="bento-grid enter d3">
          {statCards.map(card => (
            <div className={`panel stat-card accent-border accent-flood ${card.accent}`} key={card.label}>
              <div className="stat-label">{card.label}</div>
              <div className="stat-value">{card.value}</div>
              <div className="stat-sub">{card.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 34 }}>
        <div className="section-head enter d4">
          <div>
            <h2 className="section-title">Procurement pulse</h2>
            <p className="page-sub">Contracts are grouped by risk, next step, and operational dependency.</p>
          </div>
          <Link to="/progress" className="link-btn">Full tracker</Link>
        </div>

        <div className="bento-grid enter d5">
          {contracts.map(contract => {
            const cfg = CONTRACT_CFG[contract.status]
            return (
              <article
                className={`panel contract-card lift accent-border accent-flood ${cfg.accent}`}
                key={contract.id}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'flex-start' }}>
                  <div>
                    <div className="stat-label">{contract.cost}</div>
                    <h3 style={{ margin: '8px 0 6px', color: '#fff', fontSize: 20, fontWeight: 780 }}>{contract.name}</h3>
                  </div>
                  <StatusTag kind={cfg.kind}>{cfg.label}</StatusTag>
                </div>
                <p style={{ color: 'var(--quiet)', margin: '8px 0 18px', lineHeight: 1.55 }}>{contract.description}</p>
                <div className="inspector-card" style={{ margin: 0 }}>
                  <strong>Next</strong>
                  <span>{contract.nextStep}</span>
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
              <h2 className="section-title">Upcoming key dates</h2>
              <p className="page-sub">The nearest sign-offs and rehearsals on the critical path.</p>
            </div>
            <Link to="/action" className="link-btn">Command center</Link>
          </div>
          <div className="table-wrap">
            <table className="dtable">
              <thead>
                <tr>
                  <th style={{ width: 92 }}>Date</th>
                  <th>Event</th>
                  <th style={{ width: 150 }}>Location</th>
                  <th style={{ width: 110 }}>Type</th>
                </tr>
              </thead>
              <tbody>
                {events.slice(0, 5).map(item => (
                  <tr key={item.id} className="row-hover">
                    <td className="strong mono" style={{ color: 'var(--cyan)' }}>{fmtDate(item.date)}</td>
                    <td className="strong">{item.name}</td>
                    <td className="muted">{item.location}</td>
                    <td><StatusTag kind={item.type === 'Internal' ? 'subtle' : 'info'}>{item.type}</StatusTag></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="panel accent-border accent-flood accent-violet" style={{ padding: 18 }}>
          <div className="stat-label">Fast lanes</div>
          <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
            {[
              { to: '/progress', label: 'Readiness timeline', sub: 'Workstreams, milestones, contracts' },
              { to: '/resources', label: 'Knowledge hub', sub: 'Channels, briefs, vendor files' },
              { to: '/action', label: 'Leadership queue', sub: 'Urgent decisions and program draft' },
            ].map(item => (
              <Link className="inspector-card lift" key={item.to} to={item.to} style={{ margin: 0 }}>
                <strong>{item.label}</strong>
                <span>{item.sub}</span>
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </div>
  )
}
