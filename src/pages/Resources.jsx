import { useState } from 'react'
import { getDocuments, getSlackChannels } from '../api'
import StatusTag from '../components/StatusTag'

const ACTIVITY_KIND = { high: 'success', medium: 'warn', low: 'subtle' }
const ACCENTS = ['accent-cyan', 'accent-mint', 'accent-amber', 'accent-coral', 'accent-violet', 'accent-blue']

export default function Resources() {
  const channels = getSlackChannels()
  const docs = getDocuments()
  const [selectedDoc, setSelectedDoc] = useState(docs[0])

  return (
    <div className="page-shell">
      <section className="section-head enter d0" style={{ marginBottom: 24 }}>
        <div>
          <div className="page-kicker"><span className="eyebrow">Knowledge hub</span></div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(42px, 6vw, 72px)', maxWidth: '12ch', marginBottom: 16 }}>
            Documents with a pulse.
          </h1>
          <p className="hero-lede" style={{ maxWidth: 760 }}>
            Channels, planning briefs, vendor files, and working notes sit together so the event team can move from signal to source without losing context.
          </p>
        </div>
        <button className="btn btn-primary btn-md" type="button">New brief</button>
      </section>

      <section style={{ marginBottom: 34 }}>
        <div className="section-head enter d1">
          <div>
            <h2 className="section-title">Team channels</h2>
            <p className="page-sub">Operational rooms for the people moving each workstream.</p>
          </div>
          <StatusTag kind="info">{channels.length} Channels</StatusTag>
        </div>

        <div className="resource-grid enter d2">
          {channels.map((channel, index) => (
            <article className={`panel resource-card lift accent-border accent-flood ${ACCENTS[index % ACCENTS.length]}`} key={channel.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                <h3 className="mono" style={{ color: 'var(--cyan)', wordBreak: 'break-word' }}>{channel.name}</h3>
                <StatusTag kind={ACTIVITY_KIND[channel.activity]}>{channel.activity}</StatusTag>
              </div>
              <p className="panel-sub" style={{ marginTop: 12 }}>{channel.description}</p>
              <div style={{ marginTop: 'auto', paddingTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="stat-label">{channel.members} Members</span>
                <span className="live-dot" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="doc-editor enter d3">
        <div>
          <div className="section-head" style={{ marginBottom: 14 }}>
            <div>
              <h2 className="section-title">Planning documents</h2>
              <p className="page-sub">A searchable source of truth for show flow, venue, vendors, and protocol.</p>
            </div>
          </div>
          <div className="table-wrap">
            <table className="dtable">
              <thead>
                <tr>
                  <th style={{ width: 70 }}>Type</th>
                  <th>Title</th>
                  <th style={{ width: 135 }}>Category</th>
                  <th style={{ width: 105 }}>Updated</th>
                </tr>
              </thead>
              <tbody>
                {docs.map(doc => (
                  <tr
                    key={doc.id}
                    className="row-hover"
                    onClick={() => setSelectedDoc(doc)}
                    style={{ cursor: 'pointer', background: selectedDoc.id === doc.id ? 'rgba(102, 227, 255, 0.07)' : undefined }}
                  >
                    <td>
                      <StatusTag kind={doc.type === 'doc' ? 'subtle' : 'info'}>
                        {doc.type}
                      </StatusTag>
                    </td>
                    <td>
                      <div style={{ fontWeight: 760, color: '#fff' }}>{doc.title}</div>
                      <div style={{ color: 'var(--quiet)', fontSize: 12, marginTop: 3 }}>{doc.description}</div>
                    </td>
                    <td className="muted">{doc.category}</td>
                    <td className="mono" style={{ color: 'var(--quiet)' }}>
                      {new Date(doc.updated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="panel editor-surface accent-border accent-flood accent-cyan">
          <div className="editor-toolbar" aria-label="Document tools">
            {['B', 'I', 'U', '@', '#', '+'].map(tool => (
              <button className="tool" key={tool} type="button">{tool}</button>
            ))}
          </div>
          <StatusTag kind={selectedDoc.type === 'doc' ? 'subtle' : 'info'}>{selectedDoc.category}</StatusTag>
          <h2 style={{ color: '#fff', margin: '16px 0 8px', fontSize: 26, lineHeight: 1.1 }}>{selectedDoc.title}</h2>
          <p className="panel-sub" style={{ maxWidth: 560 }}>{selectedDoc.description}</p>

          <div style={{ marginTop: 26 }}>
            <div className="doc-line" />
            <div className="doc-line medium" />
            <div className="doc-line short" />
            <div className="panel" style={{ padding: 14, margin: '22px 0', background: 'rgba(102, 227, 255, 0.07)' }}>
              <div className="stat-label">Live context</div>
              <p className="panel-sub" style={{ marginTop: 8 }}>
                Connected to vendor decisions, program timing, and the active production timeline.
              </p>
            </div>
            <div className="doc-line medium" />
            <div className="doc-line" />
            <div className="doc-line short" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 28 }}>
            <div className="avatars" style={{ marginTop: 0 }}>
              <span className="avatar">PR</span>
              <span className="avatar">AV</span>
              <span className="avatar">RS</span>
            </div>
            <span style={{ color: 'var(--quiet)', fontSize: 12 }}>3 collaborators viewing</span>
          </div>
        </aside>
      </section>
    </div>
  )
}
