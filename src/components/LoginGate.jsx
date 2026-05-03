import { useEffect, useState } from 'react'
import { getCountdown } from '../api'
import { freedomLogoGold } from '../assets/freedom250'
import Stars from './Stars'

const TOKEN = 'VGFzaGtlbnQyNTAhISE='

export default function LoginGate({ children }) {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem('f250_auth') === TOKEN,
  )
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const [time, setTime] = useState(getCountdown)

  useEffect(() => {
    if (authed) return undefined
    const id = setInterval(() => setTime(getCountdown()), 1000)
    return () => clearInterval(id)
  }, [authed])

  if (authed) return children

  function handleSubmit(event) {
    event.preventDefault()
    if (btoa(input) === TOKEN) {
      sessionStorage.setItem('f250_auth', TOKEN)
      setAuthed(true)
      return
    }

    setError(true)
    setShake(true)
    setInput('')
    setTimeout(() => setShake(false), 420)
  }

  return (
    <div className="app-frame">
      <Stars />
      <div className="login-shell">
        <section className="login-preview panel accent-border accent-flood accent-cyan enter d0">
          <span className="eyebrow"><span className="live-dot" /> Freedom 250</span>
          <img className="login-hero-logo" src={freedomLogoGold} alt="Freedom 250" />
          <p className="hero-lede" style={{ maxWidth: 560 }}>
            June 10, 2026 | Uzexpocentre, Tashkent
          </p>

          <div className="hero-countdown" style={{ maxWidth: 560 }}>
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

          <div className="mock-board" style={{ marginTop: 30 }}>
            {[
              ['Music',  'Headliner set',        '45-min main performance + opener'],
              ['Food',   'KFC + Coca-Cola',      'Confirmed sponsor partners'],
              ['Finale', 'Freedom 250 Toast',    'Anniversary moment + DJ open floor'],
            ].map(([title, meta, detail]) => (
              <div className="mock-lane" key={title}>
                <div className="mock-lane-title">{title}</div>
                <div className="mock-card" style={{ marginBottom: 0 }}>
                  <strong>{meta}</strong>
                  <small>{detail}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="login-card panel accent-border accent-flood accent-violet"
          style={{ animation: shake ? 'shake 420ms ease' : undefined }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="brand-mark">250</span>
            <span>
              <span className="brand-title">Freedom 250</span>
              <span className="brand-sub">Event workspace</span>
            </span>
          </div>

          <h2 style={{ margin: '28px 0 8px', color: '#fff', fontSize: 28, fontWeight: 820, lineHeight: 1.08 }}>
            Unlock the build
          </h2>
          <p className="panel-sub">One password. No clutter.</p>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginTop: 24 }}>
            <input
              autoFocus
              className="login-input"
              onChange={event => {
                setInput(event.target.value)
                setError(false)
              }}
              placeholder="Password"
              type="password"
              value={input}
              style={{
                borderColor: error ? 'rgba(255, 111, 125, 0.55)' : undefined,
                boxShadow: error ? '0 0 0 4px rgba(255, 111, 125, 0.1)' : undefined,
              }}
            />
            {error ? <p style={{ color: 'var(--coral)', fontSize: 12, margin: 0 }}>Incorrect password. Try again.</p> : null}
            <button className="btn btn-primary btn-md" type="submit">Unlock mission control</button>
          </form>

          <div className="inspector-card" style={{ margin: '24px 0 0' }}>
            <strong>Uzexpocentre · Tashkent</strong>
            <span>Countdown synced to June 10, 2026.</span>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  )
}
