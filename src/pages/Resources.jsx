import { getDocuments, getSlackChannels } from '../api'
import StatusTag from '../components/StatusTag'

const ACTIVITY_KIND = { high: 'success', medium: 'warn', low: 'subtle' }
const ACCENTS = ['accent-cyan', 'accent-mint', 'accent-amber', 'accent-coral', 'accent-violet', 'accent-blue']

export default function Resources() {
  const channels = getSlackChannels()
  const docs = getDocuments().slice(0, 5)

  return (
    <div className="page-shell page-fit">
      <header className="page-head enter d0">
        <div>
          <span className="page-eyebrow">Knowledge hub</span>
          <h1 className="page-title">Documents with a pulse.</h1>
          <p className="page-lede">Channels, briefs, and vendor files in one place — go from signal to source without losing context.</p>
        </div>
        <StatusTag kind="info">{channels.length} Channels</StatusTag>
      </header>

      <section className="page-body resources-body enter d1">
        <article className="page-panel channels-card">
          <header className="lanes-head">
            <h2>Team channels</h2>
            <span className="page-sub">Operational rooms per workstream</span>
          </header>
          <div className="channel-grid">
            {channels.map((channel, index) => (
              <div className={`channel-tile accent-flood ${ACCENTS[index % ACCENTS.length]}`} key={channel.id}>
                <div className="channel-tile-head">
                  <span className="channel-name mono">{channel.name}</span>
                  <StatusTag kind={ACTIVITY_KIND[channel.activity]}>{channel.activity}</StatusTag>
                </div>
                <p className="channel-desc">{channel.description}</p>
                <span className="channel-members">{channel.members} members</span>
              </div>
            ))}
          </div>
        </article>

        <article className="page-panel docs-card">
          <header className="lanes-head">
            <h2>Planning documents</h2>
            <span className="page-sub">Source of truth, recently updated</span>
          </header>
          <ul className="doc-list">
            {docs.map(doc => (
              <li className="doc-row" key={doc.id}>
                <div className="doc-row-meta">
                  <strong>{doc.title}</strong>
                  <span>{doc.category}</span>
                </div>
                <span className="mono doc-row-date">
                  {new Date(doc.updated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  )
}
