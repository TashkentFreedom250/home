import { useRef, useEffect } from 'react'
import { getProgramRundown } from '../api'

const START = 15 * 60       // 15:00 in minutes
const END   = 20 * 60 + 30  // 20:30 in minutes
const PPM   = 5             // pixels per minute

const CAT = {
  ceremony:      { bg: 'rgba(113,63,18,0.5)',  border: 'rgba(202,138,4,0.5)',  label: '#fbbf24', name: 'Ceremony'      },
  entertainment: { bg: 'rgba(23,37,84,0.55)',  border: 'rgba(59,130,246,0.5)', label: '#93c5fd', name: 'Entertainment' },
  logistics:     { bg: 'rgba(15,23,42,0.7)',   border: 'rgba(71,85,105,0.45)', label: '#94a3b8', name: 'Logistics'     },
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

    function onMouseDown(e) {
      active  = true
      startX  = e.clientX
      startSL = el.scrollLeft
      el.style.cursor = 'grabbing'
    }

    function onMouseMove(e) {
      if (!active) return
      e.preventDefault()
      el.scrollLeft = startSL - (e.clientX - startX)
    }

    function onMouseUp() {
      active = false
      el.style.cursor = 'grab'
    }

    // Touch drag
    let touchStartX = 0, touchStartSL = 0

    function onTouchStart(e) {
      touchStartX  = e.touches[0].clientX
      touchStartSL = el.scrollLeft
    }

    function onTouchMove(e) {
      e.preventDefault()
      el.scrollLeft = touchStartSL - (e.touches[0].clientX - touchStartX)
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove',  onTouchMove,  { passive: false })

    // Attach move/up to window so fast drags don't break
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
    <div className="card">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">Event Day Timeline</h3>
          <p className="mt-0.5 text-xs text-slate-500">Drag to explore the full program · June 10, 2026</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {Object.values(CAT).map(c => (
            <span key={c.name} className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: c.label }} />
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
          borderRadius: 8,
          background: 'rgba(2,6,23,0.5)',
          border: '1px solid rgba(51,65,85,0.4)',
        }}
      >
        {/* Inner canvas */}
        <div style={{ position: 'relative', width: totalW, height: 170 }}>

          {/* Hour gridlines + labels */}
          {HOURS.map(({ label, min }) => {
            const x = (min - START) * PPM
            return (
              <div key={label} style={{ position: 'absolute', left: x, top: 0, bottom: 0, pointerEvents: 'none' }}>
                <span style={{ position: 'absolute', top: 6, left: 5, fontSize: 10, color: '#64748b', whiteSpace: 'nowrap', fontWeight: 600 }}>
                  {label}
                </span>
                <div style={{ position: 'absolute', top: 24, bottom: 6, left: 0, width: 1, background: 'rgba(51,65,85,0.6)' }} />
              </div>
            )
          })}

          {/* Event blocks */}
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
                  borderRadius:  6,
                  padding:       '7px 9px',
                  overflow:      'hidden',
                  boxSizing:     'border-box',
                  pointerEvents: 'none',
                }}
              >
                <div style={{ fontSize: 10, color: c.label, fontWeight: 700, fontFamily: 'monospace', marginBottom: 3 }}>
                  {block.time}
                </div>
                <div style={{ fontSize: 11, color: '#e2e8f0', lineHeight: 1.35, fontWeight: 500 }}>
                  {block.item}
                </div>
                {block.duration !== '—' && (
                  <div style={{ position: 'absolute', bottom: 7, left: 9, fontSize: 10, color: c.label, opacity: 0.55 }}>
                    {block.duration}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <p className="mt-2 text-center text-[11px] text-slate-700 select-none">← drag to scroll →</p>
    </div>
  )
}
