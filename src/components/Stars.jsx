// src/components/Stars.jsx
// Animated star field — fixed, behind everything, z-index 0.
import { useMemo } from 'react'

export default function Stars() {
  const stars = useMemo(() =>
    Array.from({ length: 120 }, (_, i) => ({
      id: i,
      left: (Math.random() * 100).toFixed(2),
      top:  (Math.random() * 100).toFixed(2),
      size: (Math.random() * 1.6 + 0.3).toFixed(2),
      dur:  (Math.random() * 5 + 2).toFixed(1),
      del:  (Math.random() * 8).toFixed(1),
      min:  (Math.random() * 0.05 + 0.01).toFixed(2),
      max:  (Math.random() * 0.4 + 0.07).toFixed(2),
    })), [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none', overflow: 'hidden', zIndex: 0,
      }}
    >
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.left}%`, top: `${s.top}%`,
            width: `${s.size}px`, height: `${s.size}px`,
            '--dur': `${s.dur}s`, '--del': `${s.del}s`,
            '--min': s.min, '--max': s.max,
          }}
        />
      ))}
    </div>
  )
}
