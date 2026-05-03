import { getBudget } from '../api'
import StatusTag from '../components/StatusTag'

const STATUS_LABEL = {
  signed:   { label: 'Signed',   kind: 'success' },
  planning: { label: 'Planning', kind: 'warn'    },
}

function fmt(amount) {
  return `$${amount}k`
}

export default function Resources() {
  const budget = getBudget()
  const { sources, breakdown, total, committed, planned, remaining } = budget

  const committedPct = (committed / total) * 100
  const plannedPct   = (planned   / total) * 100
  const remainingPct = (remaining / total) * 100

  const sourceMax = Math.max(...sources.map(s => s.amount))

  return (
    <div className="page-shell page-fit">
      <header className="page-head enter d0">
        <div>
          <span className="page-eyebrow">Mission funding</span>
          <h1 className="page-title">Where the money sits.</h1>
          <p className="page-lede">A simple snapshot leadership can read in five seconds — what we have, what is committed, what is left.</p>
        </div>
        <StatusTag kind="success">{fmt(total)} available</StatusTag>
      </header>

      <section className="page-body funding-body enter d1">
        <article className="page-panel funding-card">
          <header className="lanes-head">
            <div>
              <h2>Total mission funding</h2>
              <span className="page-sub">Combined raise + embassy carryover</span>
            </div>
            <span className="funding-total mono">{fmt(total)}</span>
          </header>

          <div className="funding-stack" role="img" aria-label={`Committed ${fmt(committed)}, planned ${fmt(planned)}, remaining ${fmt(remaining)}`}>
            <div className="funding-seg seg-committed" style={{ width: `${committedPct}%` }}>
              <span>Committed · {fmt(committed)}</span>
            </div>
            <div className="funding-seg seg-planned" style={{ width: `${plannedPct}%` }}>
              <span>Planned · {fmt(planned)}</span>
            </div>
            <div className="funding-seg seg-remaining" style={{ width: `${remainingPct}%` }}>
              <span>Remaining · {fmt(remaining)}</span>
            </div>
          </div>

          <div className="funding-legend">
            <span className="legend-item"><i className="dot dot-committed" /> Signed contracts</span>
            <span className="legend-item"><i className="dot dot-planned" /> Planned spend</span>
            <span className="legend-item"><i className="dot dot-remaining" /> Unallocated</span>
          </div>
        </article>

        <article className="page-panel funding-card">
          <header className="lanes-head">
            <div>
              <h2>Funding sources</h2>
              <span className="page-sub">Where the money came from</span>
            </div>
          </header>
          <div className="source-list">
            {sources.map(src => {
              const pct = (src.amount / sourceMax) * 100
              return (
                <div className="source-row" key={src.label}>
                  <div className="source-row-head">
                    <strong>{src.label}</strong>
                    <span className="mono source-amount">{fmt(src.amount)}</span>
                  </div>
                  <div className="source-bar">
                    <div className={`source-fill src-${src.type}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="source-note">{src.note}</span>
                </div>
              )
            })}
            <div className="source-total">
              <span>Total raised</span>
              <span className="mono">{fmt(total)}</span>
            </div>
          </div>
        </article>

        <article className="page-panel funding-card funding-card-wide">
          <header className="lanes-head">
            <div>
              <h2>Allocation breakdown</h2>
              <span className="page-sub">Each line as a share of the {fmt(total)} pool</span>
            </div>
          </header>
          <div className="line-list">
            {breakdown.map(line => {
              const pct = (line.amount / total) * 100
              const status = STATUS_LABEL[line.status]
              return (
                <div className="line-row" key={line.label}>
                  <div className="line-row-head">
                    <strong>{line.label}</strong>
                    <StatusTag kind={status.kind}>{status.label}</StatusTag>
                    <span className="mono line-amount">{fmt(line.amount)}</span>
                  </div>
                  <div className="line-bar">
                    <div className={`line-fill ${line.status === 'signed' ? 'fill-signed' : 'fill-planned'}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </article>
      </section>
    </div>
  )
}
