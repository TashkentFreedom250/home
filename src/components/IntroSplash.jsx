import { useEffect, useState } from 'react'

const STAR_COUNT = 13
const stars = Array.from({ length: STAR_COUNT }, (_, index) => index)

export default function IntroSplash() {
  const [visible, setVisible] = useState(true)
  const [revealing, setRevealing] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setVisible(false)
      return undefined
    }

    const revealTimer = window.setTimeout(() => setRevealing(true), 2550)
    const removeTimer = window.setTimeout(() => setVisible(false), 3400)

    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`intro-splash${revealing ? ' is-revealing' : ''}`} aria-hidden="true">
      <div className="intro-field" />
      <div className="intro-sweep" />
      <div className="intro-emblem" role="img" aria-label="Freedom 250 loading">
        <div className="intro-ring">
          {stars.map(index => (
            <span
              className="intro-star"
              key={index}
              style={{
                '--i': index,
                '--angle': `${(360 / STAR_COUNT) * index}deg`,
              }}
            />
          ))}
        </div>
        <div className="intro-core">
          <span>250</span>
        </div>
      </div>
      <div className="intro-wordmark">Freedom 250</div>
    </div>
  )
}
