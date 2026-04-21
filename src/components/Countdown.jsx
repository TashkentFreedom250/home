import { useState, useEffect } from 'react'
import { getCountdown } from '../api'

function TimeBox({ value, label }) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className="bg-navy-950 border border-[#1c3a5e] border-t-2 border-t-brand-gold px-5 py-4 min-w-[80px] text-center">
        <span className="digit font-bebas text-5xl text-cream leading-none tracking-wide">
          {display}
        </span>
        <div className="text-[8px] text-steel mt-1.5 tracking-[0.3em] uppercase">{label}</div>
      </div>
    </div>
  )
}

function Sep() {
  return (
    <span className="font-bebas text-3xl text-[#2a5a8e] pb-5 select-none leading-none">:</span>
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
