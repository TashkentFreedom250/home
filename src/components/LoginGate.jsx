import { useState, useEffect } from 'react'
import { getCountdown } from '../api'
import Stars from './Stars'

const TOKEN = 'VGFzaGtlbnQyNTAhISE='

export default function LoginGate({ children }) {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem('f250_auth') === TOKEN
  )
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const [time, setTime]   = useState(getCountdown)

  useEffect(() => {
    if (authed) return
    const id = setInterval(() => setTime(getCountdown()), 1000)
    return () => clearInterval(id)
  }, [authed])

  if (authed) return children

  function handleSubmit(e) {
    e.preventDefault()
    if (btoa(input) === TOKEN) {
      sessionStorage.setItem('f250_auth', TOKEN)
      setAuthed(true)
    } else {
      setError(true)
      setShake(true)
      setInput('')
      setTimeout(() => setShake(false), 500)
    }
  }

  const pad = v => String(v).padStart(2, '0')

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 20px',
      overflow: 'hidden',
    }}>
      <Stars />

      <div className="card enter d0" style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: 440,
        padding: '36px 32px 30px',
        animation: shake ? 'shake 0.4s ease' : undefined,
      }}>
        {/* Brand */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          marginBottom: 24,
        }}>
          <div style={{
            width: 44, height: 44, flexShrink: 0,
            background: '#0b1e3f',
            borderTop: '3px solid #d83933',
            borderBottom: '3px solid #d83933',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontFamily: "'Merriweather', serif",
            fontWeight: 900, fontSize: 13,
          }}>250</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--fg1)', letterSpacing: '0.01em' }}>
              Freedom 250
            </div>
            <div style={{ fontSize: 11, color: 'var(--fg4)', marginTop: 2 }}>
              U.S. Embassy Tashkent · Mission Control
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Merriweather', serif",
          fontSize: 28, fontWeight: 900,
          color: 'var(--fg1)', lineHeight: 1.15,
          margin: '0 0 6px',
        }}>
          America's <span style={{ color: 'var(--red-soft)' }}>250th</span>
        </h1>
        <p style={{ fontSize: 13, color: 'var(--fg3)', margin: '0 0 22px', lineHeight: 1.5 }}>
          Celebrating two and a half centuries of liberty.
        </p>

        {/* Mini countdown */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6,
          padding: '14px 12px',
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 8,
          marginBottom: 24,
        }}>
          {[
            { v: time.days,    l: 'Days'    },
            { v: time.hours,   l: 'Hours'   },
            { v: time.minutes, l: 'Min'     },
            { v: time.seconds, l: 'Sec'     },
          ].map(b => (
            <div key={b.l} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Source Code Pro', monospace",
                fontSize: 22, fontWeight: 700,
                color: 'var(--fg1)',
                fontVariantNumeric: 'tabular-nums',
                lineHeight: 1,
              }}>
                {pad(b.v)}
              </div>
              <div style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--fg4)',
                marginTop: 6,
              }}>
                {b.l}
              </div>
            </div>
          ))}
        </div>

        {/* Eyebrow */}
        <div className="eyebrow" style={{ marginBottom: 10, fontSize: 10 }}>
          Authorized Personnel · Enter Password
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            type="password"
            value={input}
            autoFocus
            placeholder="Password"
            onChange={e => { setInput(e.target.value); setError(false) }}
            style={{
              width: '100%',
              padding: '11px 14px',
              background: 'rgba(0,0,0,0.3)',
              border: `1px solid ${error ? 'rgba(216,57,51,0.55)' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: 6,
              color: 'var(--fg1)',
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              letterSpacing: '0.08em',
              outline: 'none',
              transition: 'border-color 150ms ease, box-shadow 150ms ease',
            }}
            onFocus={e => {
              if (!error) {
                e.target.style.borderColor = 'rgba(36,145,255,0.5)'
                e.target.style.boxShadow = '0 0 0 3px rgba(36,145,255,0.15)'
              }
            }}
            onBlur={e => {
              e.target.style.borderColor = error ? 'rgba(216,57,51,0.55)' : 'rgba(255,255,255,0.12)'
              e.target.style.boxShadow = 'none'
            }}
          />
          {error && (
            <p style={{ fontSize: 12, color: 'var(--red-soft)', margin: 0 }}>
              Incorrect password. Try again.
            </p>
          )}
          <button type="submit" className="btn btn-primary btn-md" style={{ width: '100%', justifyContent: 'center', padding: '12px 16px' }}>
            Enter Mission Control
          </button>
        </form>

        <div style={{
          marginTop: 20, paddingTop: 16,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: 10, fontWeight: 600, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--fg4)',
          textAlign: 'center',
        }}>
          Uzexpocentre · Tashkent
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-8px); }
          40%     { transform: translateX(8px); }
          60%     { transform: translateX(-5px); }
          80%     { transform: translateX(5px); }
        }
      `}</style>
    </div>
  )
}
