import { useEffect, useState } from 'react'
import { getCountdown } from '../api'

export default function Countdown() {
  const [time, setTime] = useState(getCountdown)

  useEffect(() => {
    const id = setInterval(() => setTime(getCountdown()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="hero-countdown" aria-label="Countdown to Freedom 250">
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
  )
}
