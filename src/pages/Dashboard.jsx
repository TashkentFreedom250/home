import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getActions,
  getContracts,
  getCountdown,
  getEventDetails,
  getProgress,
  getStats,
  getTimeline,
  getUpcomingEvents,
} from '../api'
import StatusTag from '../components/StatusTag'

const WS_CFG = {
  ahead: { dot: 'var(--mint)', label: 'Ahead' },
  'on-track': { dot: 'var(--cyan)', label: 'On Track' },
  'at-risk': { dot: 'var(--coral)', label: 'At Risk' },
}

const fmtDate = d => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0)
  const startRef = useRef(null)
  const targetRef = useRef(target)

  useEffect(() => {
    targetRef.current = target
    startRef.current = null
    let raf = 0
    const tick = ts => {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * targetRef.current))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}

function FlipDigit({ value }) {
  const str = String(value).padStart(2, '0')
  return (
    <span className="flip-digit" key={str}>
      <span className="flip-inner">{str}</span>
    </span>
  )
}

function HeroCountdown({ time }) {
  return (
    <div className="brief-clock" aria-label="Countdown to event">
      {[
        ['Days', time.days],
        ['Hours', time.hours],
        ['Minutes', time.minutes],
        ['Seconds', time.seconds],
      ].map(([label, value], index) => (
        <div className="clock-cell" key={label}>
          <FlipDigit value={value} />
          <span className="clock-label">{label}</span>
          {index < 3 ? <span className="clock-sep" aria-hidden="true">:</span> : null}
        </div>
      ))}
    </div>
  )
}

function LocalClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tashkent',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now)

  return (
    <div className="local-clock">
      <span className="clock-label">Tashkent · UTC+5</span>
      <span className="clock-time mono">{time}</span>
    </div>
  )
}

function ReadinessRing({ value, size = 200 }) {
  const animated = useCountUp(value, 1600)
  const stroke = 12
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animated / 100) * circumference

  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--cyan)" />
            <stop offset="60%" stopColor="var(--blue)" />
            <stop offset="100%" stopColor="var(--violet)" />
          </linearGradient>
          <filter id="ringGlow">
            <feGaussianBlur stdDeviation="2.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter="url(#ringGlow)"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="ring-label">
        <strong className="mono">{animated}<span className="ring-pct">%</span></strong>
        <span>Mission ready</span>
      </div>
    </div>
  )
}

function ProcurementBar({ contracts }) {
  const totalUnits = contracts.reduce((sum, c) => {
    const n = parseInt(c.cost, 10)
    return sum + (Number.isFinite(n) ? n : 0)
  }, 0)
  const segments = contracts.map(c => {
    const n = parseInt(c.cost, 10)
    const units = Number.isFinite(n) ? n : 0
    return {
      ...c,
      units,
      pct: totalUnits ? (units / totalUnits) * 100 : 100 / contracts.length,
    }
  })
  const colorFor = status =>
    status === 'awarded' ? 'var(--mint)' :
    status === 'in-progress' ? 'var(--amber)' : 'var(--coral)'
  const awardedUnits = segments
    .filter(s => s.status === 'awarded')
    .reduce((sum, s) => sum + s.units, 0)
  const awardedAnim = useCountUp(awardedUnits, 1400)
  const inMotionAnim = useCountUp(totalUnits - awardedUnits, 1400)

  return (
    <div className="budget-block">
      <div className="budget-meta">
        <div className="budget-summary">
          <span className="mono budget-num" style={{ color: 'var(--mint)' }}>{awardedAnim}</span>
          <span className="budget-divider">awarded</span>
          <span className="mono budget-num" style={{ color: 'var(--amber)' }}>{inMotionAnim}</span>
          <span className="budget-divider">in motion · of {totalUnits} units</span>
        </div>
        <div className="budget-legend">
          <span><i style={{ background: 'var(--mint)' }} /> Awarded</span>
          <span><i style={{ background: 'var(--amber)' }} /> In Progress</span>
        </div>
      </div>

      <div className="budget-bar" role="img" aria-label="Procurement allocation">
        {segments.map((seg, i) => (
          <div
            className="budget-seg"
            key={seg.id}
            style={{
              width: `${seg.pct}%`,
              background: colorFor(seg.status),
              animationDelay: `${300 + i * 90}ms`,
            }}
            title={`${seg.name} · ${seg.cost}`}
          >
            <span className="budget-seg-name">{seg.name}</span>
            <span className="budget-seg-units mono">{seg.cost}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MissionRibbon({ timeline }) {
  return (
    <div className="ribbon-wrap" role="list">
      {timeline.map((week, i) => {
        const total = week.tasks.length
        const done = week.tasks.filter(t => t.status === 'completed').length
        const pct = total ? (done / total) * 100 : 0
        const isCurrent = week.phase === 'current'

        return (
          <article
            className={`ribbon-tile${isCurrent ? ' is-current' : ''}`}
            key={week.week}
            role="listitem"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {isCurrent ? <span className="ribbon-aurora" aria-hidden="true" /> : null}
            <header className="ribbon-head">
              <span className="ribbon-week mono">W{week.week}</span>
              {isCurrent ? <span className="ribbon-live"><span className="live-dot" /> Now</span> : null}
            </header>
            <h4 className="ribbon-label">{week.label}</h4>
            <p className="ribbon-dates">{week.dates}</p>

            <div className="ribbon-track" aria-hidden="true">
              <div className="ribbon-fill" style={{ width: `${pct}%` }} />
            </div>

            <div className="ribbon-stats">
              <span className="mono">{done}/{total}</span>
              <span>tasks done</span>
            </div>
          </article>
        )
      })}
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
  const timeline = getTimeline()

  const [time, setTime] = useState(getCountdown)
  useEffect(() => {
    const id = setInterval(() => setTime(getCountdown()), 1000)
    return () => clearInterval(id)
  }, [])

  const urgent = useMemo(
    () => actions.filter(a => a.priority === 'high').slice(0, 3),
    [actions],
  )
  const topInitiatives = useMemo(
    () => [...progress.initiatives].sort((a, b) => {
      const order = { 'at-risk': 0, 'on-track': 1, 'ahead': 2 }
      return order[a.status] - order[b.status] || a.progress - b.progress
    }).slice(0, 4),
    [progress.initiatives],
  )
  const nextEvents = events.slice(0, 3)
  const atRisk = progress.initiatives.filter(i => i.status === 'at-risk').length

  return (
    <div className="page-shell">
      <section className="brief-hero enter d0">
        <div className="brief-meta-row">
          <span className="eyebrow">
            <span className="live-dot" />
            Mission Brief · T-{stats.daysLeft.value} days
          </span>
          <LocalClock />
        </div>

        <h1 className="brief-title">
          Freedom <span className="brief-title-num">250</span>
        </h1>
        <p className="brief-tagline">
          {event.location} · June 10, 2026 · {event.attendance} guests
        </p>

        <div className="brief-stage">
          <HeroCountdown time={time} />
        </div>

        <div className="brief-actions">
          <Link className="btn btn-primary btn-md" to="/action">
            Open action queue
            <span className="btn-badge">{urgent.length}</span>
          </Link>
          <Link className="btn btn-ghost btn-md" to="/progress">View readiness</Link>
        </div>

        <span className="aurora aurora-a" aria-hidden="true" />
        <span className="aurora aurora-b" aria-hidden="true" />
      </section>

      <section className="command-grid">
        <article className="panel command-card accent-border accent-flood accent-cyan ring-card enter d1">
          <header className="command-head">
            <div>
              <div className="stat-label">Mission readiness</div>
              <h2 className="command-title">Top streams</h2>
            </div>
            <StatusTag kind={atRisk ? 'error' : 'success'}>
              {atRisk ? `${atRisk} at risk` : 'On path'}
            </StatusTag>
          </header>

          <div className="ring-layout">
            <ReadinessRing value={progress.overall} />

            <ul className="ws-spark">
              {topInitiatives.map((item, i) => {
                const cfg = WS_CFG[item.status]
                return (
                  <li className="ws-row" key={item.id} style={{ animationDelay: `${300 + i * 90}ms` }}>
                    <span className="ws-dot" style={{ background: cfg.dot }} />
                    <strong className="ws-name">{item.name}</strong>
                    <div className="ws-bar">
                      <div
                        className="ws-bar-fill"
                        style={{
                          width: `${item.progress}%`,
                          background: `linear-gradient(90deg, ${cfg.dot}, var(--cyan))`,
                        }}
                      />
                    </div>
                    <span className="mono ws-pct">{item.progress}%</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </article>

        <article className="panel command-card accent-border accent-flood accent-coral enter d2">
          <header className="command-head">
            <div>
              <div className="stat-label">Decision queue</div>
              <h2 className="command-title">Critical for chair</h2>
            </div>
            <Link to="/action" className="link-btn">All →</Link>
          </header>

          <ol className="action-rank">
            {urgent.map((action, i) => (
              <li key={action.id} style={{ animationDelay: `${260 + i * 80}ms` }}>
                <span className="action-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="action-body">
                  <strong>{action.title}</strong>
                  <span className="action-meta mono">Due {action.deadline}</span>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article className="panel command-card accent-border accent-flood accent-violet enter d3">
          <header className="command-head">
            <div>
              <div className="stat-label">What's next</div>
              <h2 className="command-title">Upcoming</h2>
            </div>
            <span className="mono command-meta">{nextEvents.length}</span>
          </header>

          <ul className="event-list">
            {nextEvents.map((item, i) => {
              const date = new Date(item.date)
              return (
                <li className="event-row" key={item.id} style={{ animationDelay: `${260 + i * 80}ms` }}>
                  <div className="event-date">
                    <span className="event-day mono">{date.getDate()}</span>
                    <span className="event-month">{date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span>
                  </div>
                  <div className="event-info">
                    <strong>{item.name}</strong>
                    <span>{item.location}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </article>
      </section>

      <section className="enter d4" style={{ marginTop: 26 }}>
        <div className="section-head">
          <div>
            <h2 className="section-title">Procurement pulse</h2>
            <p className="page-sub">Budget split across vendors, scaled by units.</p>
          </div>
          <Link to="/progress" className="link-btn">Tracker →</Link>
        </div>
        <div className="panel accent-border accent-flood accent-amber" style={{ padding: 22, marginTop: 14 }}>
          <ProcurementBar contracts={contracts} />
        </div>
      </section>

      <section className="enter d5" style={{ marginTop: 26 }}>
        <div className="section-head">
          <div>
            <h2 className="section-title">8-week mission ribbon</h2>
            <p className="page-sub">From contract awards to showtime.</p>
          </div>
          <span className="mono command-meta" style={{ color: 'var(--cyan)' }}>T-{stats.daysLeft.value}</span>
        </div>
        <MissionRibbon timeline={timeline} />
      </section>
    </div>
  )
}
