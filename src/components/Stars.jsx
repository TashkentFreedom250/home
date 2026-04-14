import { useMemo } from 'react'

export default function Stars() {
  const stars = useMemo(() =>
    Array.from({ length: 90 }, (_, i) => ({
      id: i,
      left:     (Math.random() * 100).toFixed(2),
      top:      (Math.random() * 100).toFixed(2),
      size:     (Math.random() * 1.8 + 0.4).toFixed(2),
      duration: (Math.random() * 4 + 2).toFixed(1),
      delay:    (Math.random() * 6).toFixed(1),
      minO:     (Math.random() * 0.08 + 0.02).toFixed(2),
      maxO:     (Math.random() * 0.35 + 0.1).toFixed(2),
    }))
  , [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left:          `${s.left}%`,
            top:           `${s.top}%`,
            width:         `${s.size}px`,
            height:        `${s.size}px`,
            '--duration':  `${s.duration}s`,
            '--delay':     `${s.delay}s`,
            '--min-o':     s.minO,
            '--max-o':     s.maxO,
          }}
        />
      ))}
    </div>
  )
}
