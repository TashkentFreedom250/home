import { useRef, useEffect } from 'react'
import { getProgramRundown } from '../api'

const START = 15 * 60
const END   = 20 * 60 + 30
const PPM   = 5

const CAT = {
  ceremony:      { bg: 'rgba(200,41,60,0.08)',   border: 'rgba(200,41,60,0.35)',  label: '#C8293C', name: 'Ceremony'      },
  entertainment: { bg: 'rgba(27,58,107,0.08)',   border: 'rgba(27,58,107,0.35)', label: '#1B3A6B', name: 'Entertainment' },
  logistics:     { bg: 'rgba(26,21,16,0.04)',    border: 'rgba(26,21,16,0.15)',  label: '#7A6B5A', name: 'Logistics'     },
}

const HOURS = [
  { label: '3 PM', min: 15 * 60 },
  { label: '4 PM', min: 16 * 60 },
  { label: '5 PM', min: 17 * 60 },
  { label: '6 PM', min: 18 * 60 },
  { label: '7 PM', min: 19 * 60 },
  { label: '8 PM', min: 20 * 60 },
]

function toMin(t) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}
function parseDur(d) {
  if (d === '—') return 25
  return parseInt(d) || 15
}

export default function EventTimeline() {
  const { blocks } = getProgramRundown()
  const trackRef   = useRef(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let active = false, startX = 0, startSL = 0

    function onMouseDown(e) { active = true; startX = e.clientX; startSL = el.scrollLeft; el.style.cursor = 'grabbing' }
    function onMouseMove(e) { if (!active) return; e.preventDefault(); el.scrollLeft = startSL - (e.clientX - startX) }
    function onMouseUp()    { active = false; el.style.cursor = 'grab' }

    let touchStartX = 0, touchStartSL = 0
    function onTouchStart(e) { touchStartX = e.touches[0].clientX; touchStartSL = el.scrollLeft }
    function onTouchMove(e)  { e.preventDefault(); el.scrollLeft = touchStartSL - (e.touches[0].clientX - touchStartX) }

    el.addEventListener('mousedown',  onMouseDown)
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove',  onTouchMove,  { passive: false })
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onMouseUp)

    return () => {
      el.removeEventListener('mousedown',  onMouseDown)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onMouseUp)
    }
  }, [])

  const totalW = (END - START) * PPM + 80

  return (
    <div className="card card-glow-blue">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-base font-semibold text-ink italic">Event Day Timeline</h3>
          <p className="mt-0.5 font-mono text-[10px] text-ink-muted">Drag to explore the full program · June 10, 2026</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {Object.values(CAT).map(c => (
            <span key={c.name} className="flex items-center gap-1.5 font-mono text-[10px] text-ink-muted">
              <span className="h-2 w-2 flex-shrink-0 border" style={{ background: c.label, borderColor: c.border }} />
              {c.name}
            </span>
          ))}
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        style={{
          overflowX:  'scroll',
          overflowY:  'hidden',
          cursor:     'grab',
          userSelect: 'none',
          background: 'rgba(232,226,210,0.6)',
          border:     '1px solid rgba(26,21,16,0.12)',
        }}
      >
        <div style={{ position: 'relative', width: totalW, height: 170 }}>

          {HOURS.map(({ label, min }) => {
            const x = (min - START) * PPM
            return (
              <div key={label} style={{ position: 'absolute', left: x, top: 0, bottom: 0, pointerEvents: 'none' }}>
                <span style={{ position: 'absolute', top: 6, left: 5, fontSize: 9, color: '#7A6B5A', fontFamily: 'DM Mono, monospace', whiteSpace: 'nowrap', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {label}
                </span>
                <div style={{ position: 'absolute', top: 24, bottom: 6, left: 0, width: 1, background: 'rgba(26,21,16,0.12)' }} />
              </div>
            )
          })}

          {blocks.map((block, i) => {
            const left  = (toMin(block.time) - START) * PPM
            const width = Math.max(parseDur(block.duration) * PPM - 3, 72)
            const c     = CAT[block.category]
            return (
              <div
                key={i}
                style={{
                  position:      'absolute',
                  left,
                  top:           28,
                  width,
                  height:        128,
                  background:    c.bg,
                  border:        `1px solid ${c.border}`,
                  borderTop:     `2px solid ${c.label}`,
                  padding:       '7px 9px',
                  overflow:      'hidden',
                  boxSizing:     'border-box',
                  pointerEvents: 'none',
                }}
              >
                <div style={{ fontSize: 9, color: c.label, fontFamily: 'DM Mono, monospace', marginBottom: 3, letterSpacing: '0.15em' }}>
                  {block.time}
                </div>
                <div style={{ fontSize: 11, color: '#1A1510', lineHeight: 1.4, fontFamily: 'Libre Baskerville, serif' }}>
                  {block.item}
                </div>
                {block.duration !== '—' && (
                  <div style={{ position: 'absolute', bottom: 7, left: 9, fontSize: 9, color: c.label, opacity: 0.6, fontFamily: 'DM Mono, monospace' }}>
                    {block.duration}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <p className="mt-2 text-center font-mono text-[10px] text-ink-muted select-none">← drag to scroll →</p>
    </div>
  )
}
