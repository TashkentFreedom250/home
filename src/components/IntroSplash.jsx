import { useEffect, useState } from 'react'

export default function IntroSplash() {
  const [visible, setVisible] = useState(true)
  const [revealing, setRevealing] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setVisible(false)
      return undefined
    }

    const revealTimer = window.setTimeout(() => setRevealing(true), 3400)
    const removeTimer = window.setTimeout(() => setVisible(false), 4200)

    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`intro-splash${revealing ? ' is-revealing' : ''}`} aria-hidden="true">
      <div className="intro-field" />
      <div className="intro-collision">
        <span className="intro-ball intro-ball-red"   />
        <span className="intro-ball intro-ball-white" />
        <span className="intro-ball intro-ball-blue"  />
        <span className="intro-flash" />
        <div className="intro-finale">
          <span className="intro-finale-top">AMERICA</span>
          <strong className="intro-finale-num">250</strong>
        </div>
      </div>
    </div>
  )
}
