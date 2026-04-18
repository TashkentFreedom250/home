import { useRef, useCallback } from 'react'
import { getProgramRundown } from '../api'

const START = 15 * 60        // 15:00 in minutes
const END   = 20 * 60 + 30   // 20:30 in minutes
const PPM   = 4.8             // pixels per minute

const CAT = {
  ceremony:      { bg: 'rgba(113,63,18,0.45)',   border: 'rgba(202,138,4,0.45)',  label: '#fbbf24', name: 'Ceremony'      },
  entertainment: { bg: 'rgba(23,37,84,0.5)',      border: 'rgba(59,130,246,0.4)', label: '#93c5fd', name: 'Entertainment' },
  logistics:     { bg: 'rgba(15,23,42,0.65)',     border: 'rgba(71,85,105,0.4)',  label: '#94a3b8', name: 'Logistics'     },
}

function toMin(t) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function parseDur(d) {
  if (d === '—') return 25
  return parseInt(d) || 15
}

const HOURS = ['3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM']

export default function EventTimeline() {
  const { blocks } = getProgramRundown()
  const scrollRef  = useRef(null)
  const drag       = useRef({ active: false, startX: 0, sl: 0 })
  const touch      = useRef({ startX: 0, sl: 0 })

  const onMouseDown = useCallback(e => {
    drag.current = { active: true, startX: e.pageX, sl: scrollRef.current.scrollLeft }
    scrollRef.current.style.cursor = 'grabbing'
  }, [])

  const onMouseMove = useCallback(e => {
    if (!drag.current.active) return
    e.preventDefault()
    scrollRef.current.scrollLeft = drag.current.sl - (e.pageX - drag.current.startX)
  }, [])

  const onMouseUp = useCallback(() => {
    drag.current.active = false
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
  }, [])

  const onTouchStart = useCallback(e => {
    touch.current = { startX: e.touches[0].pageX, sl: scrollRef.current.scrollLeft }
  }, [])

  const onTouchMove = useCallback(e => {
    scrollRef.current.scrollLeft = touch.current.sl - (e.touches[0].pageX - touch.current.startX)
  }, [])

  const totalW = (END - START) * PPM + 120

  return (
    <div className="card">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">Event Day Timeline</h3>
          <p className="mt-0.5 text-xs text-slate-500">Drag left or right to explore the full program · June 10, 2026</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {Object.values(CAT).map(c => (
            <span key={c.name} className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="h-2 w-2 rounded-full" style={{ background: c.label }} />
              {c.name}
            </span>
          ))}
        </div>
      </div>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="relative overflow-x-scroll overflow-y-hidden rounded-lg"
        style={{ cursor: 'grab', userSelect: 'none', WebkitOverflowScrolling: 'touch' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        <div style={{ position: 'relative', width: totalW, height: 168 }}>

          {/* Hour gridlines */}
          {HOURS.map((label, i) => {
            const x = i * 60 * PPM
            return (
              <div key={label} style={{ position: 'absolute', left: x, top: 0, height: '100%', pointerEvents: 'none' }}>
                <span style={{ position: 'absolute', top: 4, left: 4, fontSize: 10, color: '#475569', whiteSpace: 'nowrap' }}>
                  {label}
                </span>
                <div style={{ position: 'absolute', top: 22, bottom: 8, left: 0, width: 1, background: 'rgba(51,65,85,0.5)' }} />
              </div>
            )
          })}

          {/* Event blocks */}
          {blocks.map((block, i) => {
            const left  = (toMin(block.time) - START) * PPM
            const width = Math.max(parseDur(block.duration) * PPM - 4, 70)
            const c     = CAT[block.category]
            return (
              <div
                key={i}
                title={block.item}
                style={{
                  position:     'absolute',
                  left,
                  top:          26,
                  width,
                  height:       130,
                  background:   c.bg,
                  border:       `1px solid ${c.border}`,
                  borderRadius: 8,
                  padding:      '8px 10px',
                  overflow:     'hidden',
                  boxSizing:    'border-box',
                  transition:   'border-color 0.15s',
                  pointerEvents: 'none',
                }}
              >
                <div style={{ fontSize: 10, color: c.label, fontWeight: 700, marginBottom: 4, fontFamily: 'monospace' }}>
                  {block.time}
                </div>
                <div style={{ fontSize: 11, color: '#f1f5f9', lineHeight: 1.35, fontWeight: 500 }}>
                  {block.item}
                </div>
                {block.duration !== '—' && (
                  <div style={{ marginTop: 5, fontSize: 10, color: c.label, opacity: 0.6 }}>
                    {block.duration}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <p className="mt-2 text-center text-[11px] text-slate-700 select-none pointer-events-none">
        ← drag to scroll →
      </p>
    </div>
  )
}
