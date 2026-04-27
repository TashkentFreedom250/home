// src/components/Countdown.jsx
import { useState, useEffect } from 'react'
import { getCountdown } from '../api'

// Big dramatic countdown with planning progress bar.
// Replaces the original digit-box design.

function CountBox({ value, label, large = false }) {
  return (
    <div style={{
      position: 'relative',
      background: 'rgba(0,0,0,0.45)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 10,
      padding: large ? '18px 28px 14px' : '14px 22px 12px',
      minWidth: large ? 130 : 100,
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Shimmer top line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)',
      }}/>
      <div style={{
        fontFamily: "'Source Code Pro', monospace",
        fontSize: large ? 72 : 48,
        fontWeight: 700,
        color: '#fff',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
        textShadow: '0 0 40px rgba(36,145,255,0.45)',
      }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{
        fontSize: 9, fontWeight: 700, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
        marginTop: 8,
      }}>
        {label}
      </div>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(getCountdown)

  useEffect(() => {
    const id = setInterval(() => setTime(getCountdown()), 1000)
    return () => clearInterval(id)
  }, [])

  // Planning progress: approx 160-day window (Jan 1 → Jun 10 2026)
  const totalDays = 160
  const elapsed   = Math.max(0, totalDays - time.days)
  const pct       = Math.min(100, Math.round((elapsed / totalDays) * 100))

  return (
    <div className="countdown-hero">
      <div style={{ position: 'relative' }}>
        {/* Eyebrow */}
        <div className="eyebrow" style={{ marginBottom: 10 }}>Counting down to</div>

        {/* Date headline */}
        <h1 style={{
          fontFamily: "'Merriweather', serif",
          fontSize: 40, fontWeight: 900, color: '#fff',
          margin: '0 0 26px', letterSpacing: '0.02em', lineHeight: 1,
        }}>
          JUNE 10 · <span style={{ color: '#f87171' }}>2026</span>
        </h1>

        {/* Digit row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <CountBox value={time.days}    label="Days"    large />
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 40, fontWeight: 300, paddingBottom: 28, lineHeight: 1 }}>:</span>
          <CountBox value={time.hours}   label="Hours" />
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 40, fontWeight: 300, paddingBottom: 22, lineHeight: 1 }}>:</span>
          <CountBox value={time.minutes} label="Minutes" />
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 40, fontWeight: 300, paddingBottom: 22, lineHeight: 1 }}>:</span>
          <CountBox value={time.seconds} label="Seconds" />
        </div>

        {/* Planning progress strip */}
        <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              width: `${pct}%`, height: '100%',
              background: 'linear-gradient(90deg, #2491ff, #d83933)',
              transition: 'width 600ms ease',
            }}/>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
            {pct}% of planning window elapsed · {time.days} days remaining
          </span>
        </div>
      </div>
    </div>
  )
}
