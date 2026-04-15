import { useState, useEffect } from 'react'
import { getCountdown } from '../api'

function TimeBox({ value, label }) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-slate-900 border border-yellow-700/30 rounded-xl px-6 py-5 min-w-[88px] text-center shadow-[0_0_25px_rgba(161,110,3,0.2)] overflow-hidden">
        {/* subtle shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-600/40 to-transparent" />
        <span className="digit font-display text-5xl font-black text-yellow-400 leading-none tracking-tight">
          {display}
        </span>
        <div className="text-[9px] text-slate-500 mt-2 tracking-[0.25em] uppercase">{label}</div>
      </div>
    </div>
  )
}

function Sep() {
  return (
    <span className="text-yellow-600/50 text-3xl font-bold pb-5 select-none leading-none">:</span>
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
