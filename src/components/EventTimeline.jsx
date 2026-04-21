import { getProgramRundown } from '../api'

const CAT = {
  ceremony:      { color: '#C8293C', label: 'Ceremony'      },
  entertainment: { color: '#1B3A6B', label: 'Entertainment' },
  logistics:     { color: '#7A6B5A', label: 'Logistics'     },
}

const MAJOR = ['OPENING ACT', 'HEADLINER', 'TOAST', 'FREEDOM 250', 'SHOWTIME', 'DJ —']

function fmt12h(t) {
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12  = h > 12 ? h - 12 : h
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
}

function isMajor(text) {
  return MAJOR.some(k => text.toUpperCase().includes(k))
}

// Insert hour-mark separators between blocks
function buildItems(blocks) {
  const HOUR_GATES = [
    { at: '16:00', label: '4 PM' },
    { at: '17:00', label: '5 PM' },
    { at: '18:00', label: '6 PM' },
    { at: '19:00', label: '7 PM' },
    { at: '20:00', label: '8 PM' },
  ]
  const items = []
  let gi = 0
  for (const block of blocks) {
    while (gi < HOUR_GATES.length && HOUR_GATES[gi].at <= block.time) {
      items.push({ type: 'hour', label: HOUR_GATES[gi].label })
      gi++
    }
    items.push({ type: 'block', ...block })
  }
  return items
}

export default function EventTimeline() {
  const { blocks, note } = getProgramRundown()
  const items = buildItems(blocks)

  return (
    <div className="card card-glow-blue overflow-hidden">

      {/* Programme header */}
      <div className="text-center mb-5 pb-4 border-b border-paper-mid">
        <div className="font-mono text-[9px] tracking-[0.5em] text-ink-muted uppercase mb-2">
          June 10, 2026 · Uzexpocentre, Tashkent
        </div>
        <div className="font-display text-3xl text-ink tracking-tight leading-none">
          EVENT PROGRAMME
        </div>
        {/* Legend */}
        <div className="mt-3 flex items-center justify-center gap-5">
          {Object.entries(CAT).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <div className="w-2 h-2 flex-shrink-0" style={{ background: v.color }} />
              <span className="font-mono text-[9px] text-ink-muted uppercase tracking-wider">{v.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Programme list */}
      <div>
        {items.map((item, i) => {

          /* ── Hour separator ── */
          if (item.type === 'hour') {
            return (
              <div key={'h' + i} className="flex items-center gap-3 py-2 -mx-6 px-6 bg-paper-dark border-y border-paper-mid">
                <div className="font-display text-sm text-ink tracking-wider leading-none">{item.label}</div>
                <div className="flex-1 border-t border-dashed border-paper-mid" />
              </div>
            )
          }

          /* ── Event block ── */
          const cat   = CAT[item.category]
          const major = isMajor(item.item)

          return (
            <div
              key={i}
              className="flex items-stretch border-b border-paper-mid/50 group hover:bg-paper-dark/25 transition-colors"
              style={{ minHeight: major ? 56 : 44 }}
            >
              {/* Time */}
              <div className="w-[72px] flex-shrink-0 flex items-center justify-end pr-3">
                <span className="font-mono text-[10px] text-ink-muted whitespace-nowrap">
                  {fmt12h(item.time)}
                </span>
              </div>

              {/* Category bar */}
              <div className="w-[3px] flex-shrink-0 self-stretch my-1" style={{ background: cat.color }} />

              {/* Content */}
              <div className="flex-1 flex items-center justify-between gap-4 px-4 py-2">
                <div className="min-w-0">
                  {major ? (
                    <div className="font-display text-base text-ink leading-tight tracking-wide">
                      {item.item}
                    </div>
                  ) : (
                    <div className="font-body text-sm text-ink leading-snug">
                      {item.item}
                    </div>
                  )}
                </div>

                {/* Duration */}
                {item.duration !== '—' && (
                  <div className="flex-shrink-0 font-mono text-[10px] text-ink-muted whitespace-nowrap">
                    {item.duration}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer note */}
      <div className="mt-4 pt-3 border-t border-paper-mid text-center">
        <span className="font-serif italic text-[11px] text-ink-muted">{note}</span>
      </div>
    </div>
  )
}
