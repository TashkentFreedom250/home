import { useEffect, useState } from 'react'
import { freedomLogoWide } from '../assets/freedom250'

const STAR_COUNT = 13
const SPARK_COUNT = 12
const CROWD_COUNT = 28
const stars = Array.from({ length: STAR_COUNT }, (_, index) => index)
const sparks = Array.from({ length: SPARK_COUNT }, (_, index) => index)
const crowd = Array.from({ length: CROWD_COUNT }, (_, index) => ({
  x: `${2 + index * (96 / (CROWD_COUNT - 1))}%`,
  h: `${16 + (index % 5) * 5}px`,
  delay: `${(index % 7) * 90}ms`,
}))
const fireworks = [
  { x: '18%', y: '30%', color: '#d52b3f', delay: 0 },
  { x: '76%', y: '27%', color: '#ffffff', delay: 180 },
  { x: '28%', y: '68%', color: '#3d7dff', delay: 360 },
  { x: '69%', y: '66%', color: '#d52b3f', delay: 520 },
  { x: '50%', y: '42%', color: '#ffffff', delay: 720 },
]
const stageLights = [
  { x: '11%', color: '#d52b3f', angle: '-28deg', alt: '-12deg', delay: '0ms' },
  { x: '24%', color: '#ffffff', angle: '-17deg', alt: '7deg', delay: '120ms' },
  { x: '37%', color: '#3d7dff', angle: '-8deg', alt: '18deg', delay: '260ms' },
  { x: '50%', color: '#f6d57a', angle: '0deg', alt: '0deg', delay: '80ms' },
  { x: '63%', color: '#3d7dff', angle: '8deg', alt: '-18deg', delay: '260ms' },
  { x: '76%', color: '#ffffff', angle: '17deg', alt: '-7deg', delay: '120ms' },
  { x: '89%', color: '#d52b3f', angle: '28deg', alt: '12deg', delay: '0ms' },
]

export default function IntroSplash() {
  const [visible, setVisible] = useState(true)
  const [revealing, setRevealing] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setVisible(false)
      return undefined
    }

    const revealTimer = window.setTimeout(() => setRevealing(true), 4200)
    const removeTimer = window.setTimeout(() => setVisible(false), 5000)

    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`intro-splash${revealing ? ' is-revealing' : ''}`} aria-hidden="true">
      <div className="intro-field" />
      <div className="intro-concert">
        <div className="intro-haze" />
        <div className="intro-stage-glow" />
        <div className="intro-light-rig">
          {stageLights.map(light => (
            <span
              className="intro-stage-light"
              key={`${light.x}-${light.color}`}
              style={{
                '--light-x': light.x,
                '--light-color': light.color,
                '--beam-angle': light.angle,
                '--beam-alt': light.alt,
                '--light-delay': light.delay,
              }}
            >
              <i />
            </span>
          ))}
        </div>
        <div className="intro-crowd">
          {crowd.map((person, index) => (
            <span
              key={index}
              style={{
                '--crowd-x': person.x,
                '--crowd-height': person.h,
                '--crowd-delay': person.delay,
              }}
            />
          ))}
        </div>
      </div>
      <div className="intro-fireworks">
        {fireworks.map((firework, burstIndex) => (
          <span
            className="intro-burst"
            key={`${firework.x}-${firework.y}`}
            style={{
              '--burst-color': firework.color,
              '--burst-delay': `${firework.delay}ms`,
              '--burst-x': firework.x,
              '--burst-y': firework.y,
              '--burst-scale': burstIndex === fireworks.length - 1 ? '1.18' : '1',
            }}
          >
            {sparks.map(index => (
              <i
                key={index}
                style={{
                  '--spark-angle': `${(360 / SPARK_COUNT) * index}deg`,
                }}
              />
            ))}
          </span>
        ))}
      </div>
      <div className="intro-sweep" />
      <img className="intro-official-mark" src={freedomLogoWide} alt="" />
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
