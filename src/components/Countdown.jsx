// src/components/Countdown.jsx
import { useState, useEffect } from 'react'
import { getCountdown } from '../api'

// Navy panel with flag-red bottom rule + live ticking countdown.
// Replaces the original dark digit-box design.

function TimeBlock({ value, label, large = false }) {
  return (
    <div>
      <div
        className={`font-serif font-black text-white leading-none tabular-nums ${
          large ? 'text-[64px]' : 'text-[40px]'
        }`}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className="mt-1 text-[11px] font-semibold tracking-[0.08em] uppercase text-[#9bb4d4]">
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

  return (
    <div className="bg-navy-darker text-white px-10 py-7 border-b-[6px] border-gov-red">
      <div className="text-[13px] font-bold tracking-[0.08em] uppercase text-[#9bb4d4] mb-4">
        Counting down to June 10, 2026
      </div>
      <div className="flex items-end gap-8">
        <TimeBlock value={time.days}    label="Days"    large />
        <TimeBlock value={time.hours}   label="Hours" />
        <TimeBlock value={time.minutes} label="Minutes" />
        <TimeBlock value={time.seconds} label="Seconds" />
      </div>
    </div>
  )
}
