import { useEffect, useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { getCountdown } from '../api'
import { freedomLogoWide } from '../assets/freedom250'
import Stars from './Stars'

function IconDashboard() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 5h7v7H4z" />
      <path d="M13 5h7v4h-7z" />
      <path d="M13 11h7v8h-7z" />
      <path d="M4 14h7v5H4z" />
    </svg>
  )
}

function IconProgress() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="m7 15 4-4 3 3 5-7" />
    </svg>
  )
}

function IconResources() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h10a4 4 0 0 1 4 4v12H7a2 2 0 0 1-2-2z" />
      <path d="M9 8h6" />
      <path d="M9 12h7" />
    </svg>
  )
}

function IconAction() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h7l-1 8 10-13h-7z" />
    </svg>
  )
}

const NAV = [
  { path: '/', label: 'Home', Icon: IconDashboard, end: true },
  { path: '/progress', label: 'Progress', Icon: IconProgress },
  { path: '/resources', label: 'Resources', Icon: IconResources },
  { path: '/action', label: 'Plan', Icon: IconAction },
]

export default function Layout() {
  const [countdown, setCountdown] = useState(getCountdown)
  const [pointer, setPointer] = useState({ x: '50%', y: '18%' })

  useEffect(() => {
    const id = setInterval(() => setCountdown(getCountdown()), 1000)
    return () => clearInterval(id)
  }, [])

  function handlePointerMove(event) {
    const x = `${Math.round((event.clientX / window.innerWidth) * 100)}%`
    const y = `${Math.round((event.clientY / window.innerHeight) * 100)}%`
    setPointer({ x, y })
  }

  return (
    <div
      className="app-frame"
      style={{ '--mx': pointer.x, '--my': pointer.y }}
      onPointerMove={handlePointerMove}
    >
      <Stars />

      <header className="topbar">
        <NavLink to="/" end className="brand brand-event" aria-label="Freedom 250 home">
          <img className="brand-logo-img" src={freedomLogoWide} alt="" aria-hidden="true" />
          <span>
            <span className="brand-title">Freedom 250</span>
            <span className="brand-sub">June 10 | Tashkent</span>
          </span>
        </NavLink>

        <nav className="nav-list" aria-label="Primary navigation">
          {NAV.map(({ path, label, Icon, end, badge }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            >
              <Icon />
              <span>{label}</span>
              {badge ? <span className="nav-badge">{badge}</span> : null}
            </NavLink>
          ))}
        </nav>

        <div className="topbar-meta">
          <span className="metric-pill mono">{countdown.days}d {String(countdown.hours).padStart(2, '0')}h</span>
          <span className="live-pill"><span className="live-dot" /> Showtime</span>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
