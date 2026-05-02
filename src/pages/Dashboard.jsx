import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCountdown, getEventDetails, getStats } from '../api'
import { freedomIconGold, freedomLogoGold, freedomLogoWhite } from '../assets/freedom250'
import Sponsors from '../components/Sponsors'

const MOMENTS = [
  ['Music', 'Live stage'],
  ['Food', 'American favorites'],
  ['Fireworks', 'Night finale'],
  ['Community', '2,000+ guests'],
]

function useLiveCountdown() {
  const [time, setTime] = useState(getCountdown)

  useEffect(() => {
    const id = setInterval(() => setTime(getCountdown()), 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

function CountdownPills({ time }) {
  return (
    <div className="event-countdown" aria-label="Countdown to Freedom 250">
      {[
        ['Days', time.days],
        ['Hours', time.hours],
        ['Minutes', time.minutes],
        ['Seconds', time.seconds],
      ].map(([label, value]) => (
        <div className="event-count" key={label}>
          <strong className="mono">{String(value).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const time = useLiveCountdown()
  const event = getEventDetails()
  const stats = getStats()

  return (
    <div className="event-home">
      <section className="event-hero enter d0">
        <img className="event-hero-watermark" src={freedomLogoWhite} alt="" aria-hidden="true" />
        <div className="event-starscape" aria-hidden="true" />

        <div className="event-hero-copy">
          <span className="event-kicker">June 10, 2026 | Tashkent</span>
          <h1 className="event-logo-title">
            <img src={freedomLogoGold} alt="Freedom 250" />
          </h1>
          <p className="event-line">
            Music, food, fireworks, and community at {event.location}.
          </p>
          <CountdownPills time={time} />
          <div className="event-actions">
            <Link className="btn btn-primary btn-md" to="/resources">Explore event</Link>
            <Link className="btn btn-ghost btn-md" to="/action">Open plan</Link>
          </div>
        </div>

        <aside className="event-seal" aria-label="Freedom 250 event summary">
          <img src={freedomIconGold} alt="" aria-hidden="true" />
          <div className="event-seal-ring" />
          <div className="event-seal-meta">
            <span>{stats.daysLeft.value}</span>
            <strong>days</strong>
          </div>
        </aside>
      </section>

      <Sponsors />

      <section className="moment-grid enter d3" aria-label="Event highlights">
        {MOMENTS.map(([title, sub], index) => (
          <article className="moment-card" key={title} style={{ '--moment-alpha': String(0.32 + index * 0.08) }}>
            <span className="moment-num mono">{String(index + 1).padStart(2, '0')}</span>
            <h2>{title}</h2>
            <p>{sub}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
