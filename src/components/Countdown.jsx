import { useState, useEffect } from 'react'
import { getCountdown } from '../api'

function TimeBox({ value, label }) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className="bg-paper-card border border-paper-mid border-t-[3px] border-t-crimson px-5 py-4 min-w-[76px] text-center"
           style={{ boxShadow: '2px 3px 0 rgba(26,21,16,0.06)' }}>
        <span className="digit font-display text-5xl text-ink leading-none tracking-tight">
          {display}
        </span>
        <div className="font-mono text-[8px] text-ink-muted mt-2 tracking-[0.35em] uppercase">{label}</div>
      </div>
    </div>
  )
}

function Sep() {
  return (
    <span className="font-serif text-3xl text-ink-muted/50 pb-4 select-none italic leading-none">:</span>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(getCountdown)

  useEffect(() => {
    const id = setInterval(() => setTime(getCountdown()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-end justify-center gap-2 flex-wrap">
      <TimeBox value={time.days}    label="Days"    />
      <Sep />
      <TimeBox value={time.hours}   label="Hours"   />
      <Sep />
      <TimeBox value={time.minutes} label="Minutes" />
      <Sep />
      <TimeBox value={time.seconds} label="Seconds" />
    </div>
  )
}
