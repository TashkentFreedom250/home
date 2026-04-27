// src/pages/Resources.jsx
import { getSlackChannels, getDocuments } from '../api'
import StatusTag from '../components/StatusTag'

const ACTIVITY_KIND = { high: 'success', medium: 'warn', low: 'subtle' }

export default function Resources() {
  const channels = getSlackChannels()
  const docs     = getDocuments()

  return (
    <div style={{ padding: '32px 40px 48px', maxWidth: 1280 }}>

      {/* Header */}
      <div className="enter d0" style={{ marginBottom: 32 }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>Hub</div>
        <h1 className="page-title">Resources</h1>
        <p className="page-sub">Communication channels, planning documents, and vendor files.</p>
      </div>

      {/* Slack channels */}
      <section style={{ marginBottom: 32 }}>
        <div className="enter d1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span className="section-title">Slack Channels</span>
          <span style={{ fontSize: 12, color: 'var(--fg4)' }}>{channels.length} channels</span>
        </div>
        <div className="enter d2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {channels.map(ch => (
            <div key={ch.id} className="card lift" style={{ padding: 16, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <span style={{
                  fontFamily: "'Source Code Pro',monospace",
                  fontWeight: 700, color: 'var(--blue-soft)',
                  fontSize: 12, wordBreak: 'break-all', lineHeight: 1.3,
                }}>
                  {ch.name}
                </span>
                <StatusTag kind={ACTIVITY_KIND[ch.activity]} className="ml-2">{ch.activity}</StatusTag>
              </div>
              <p style={{ fontSize: 12, color: 'var(--fg4)', lineHeight: 1.5, marginBottom: 10 }}>{ch.description}</p>
              <div style={{ fontSize: 11, color: 'var(--fg4)' }}>{ch.members} members</div>
            </div>
          ))}
        </div>
      </section>

      {/* Documents */}
      <section className="enter d3">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span className="section-title">Planning Documents</span>
          <button className="btn btn-ghost btn-sm">Upload document</button>
        </div>
        <div className="table-wrap">
          <table className="dtable">
            <thead>
              <tr>
                <th style={{ width: 65 }}>Type</th>
                <th>Title</th>
                <th style={{ width: 130 }}>Category</th>
                <th style={{ width: 100 }}>Updated</th>
                <th style={{ width: 80 }}></th>
              </tr>
            </thead>
            <tbody>
              {docs.map(doc => (
                <tr key={doc.id} className="row-hover">
                  <td>
                    <StatusTag kind={doc.type === 'doc' ? 'subtle' : 'info'}>
                      {doc.type === 'doc' ? 'Doc' : 'Link'}
                    </StatusTag>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--fg1)' }}>{doc.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg4)', marginTop: 2 }}>{doc.description}</div>
                  </td>
                  <td className="muted">{doc.category}</td>
                  <td style={{ fontFamily: "'Source Code Pro',monospace", fontSize: 12, color: 'var(--fg4)', fontVariantNumeric: 'tabular-nums' }}>
                    {new Date(doc.updated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td>
                    <button className="link-btn" style={{ fontSize: 12 }}>Open →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
