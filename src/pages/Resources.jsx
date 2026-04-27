// src/pages/Resources.jsx
import { getSlackChannels, getDocuments } from '../api'
import StatusTag from '../components/StatusTag'

const ACTIVITY_KIND = {
  high:   'success',
  medium: 'warn',
  low:    'subtle',
}

export default function Resources() {
  const channels = getSlackChannels()
  const docs     = getDocuments()

  return (
    <div className="px-10 py-8 max-w-[1240px]">

      {/* Page header */}
      <div className="mb-8">
        <p className="eyebrow mb-2">Hub</p>
        <h1>Resources</h1>
        <p className="text-gov-gray-70 mt-2">
          Communication channels, planning documents, and vendor files.
        </p>
      </div>

      {/* Slack channels */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2>Slack channels</h2>
          <span className="text-[13px] text-gov-gray-60">{channels.length} channels</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {channels.map(ch => (
            <div
              key={ch.id}
              className="card p-4 cursor-pointer hover:bg-navy-lighter transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-mono font-bold text-navy text-[13px] break-all leading-snug">
                  {ch.name}
                </span>
                <StatusTag kind={ACTIVITY_KIND[ch.activity]} className="ml-2 shrink-0">
                  {ch.activity}
                </StatusTag>
              </div>
              <p className="text-[13px] text-gov-gray-70 leading-snug mb-3">{ch.description}</p>
              <div className="text-[13px] text-gov-gray-60">{ch.members} members</div>
            </div>
          ))}
        </div>
      </section>

      {/* Planning documents */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2>Planning documents</h2>
          <button className="btn btn-outline btn-sm">Upload document</button>
        </div>
        <div className="card p-0 overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{width:72}}>Type</th>
                <th>Title</th>
                <th style={{width:140}}>Category</th>
                <th style={{width:110}}>Updated</th>
                <th style={{width:90}}></th>
              </tr>
            </thead>
            <tbody>
              {docs.map(doc => (
                <tr key={doc.id} className="row-link">
                  <td>
                    <StatusTag kind={doc.type === 'doc' ? 'subtle' : 'info'}>
                      {doc.type === 'doc' ? 'Doc' : 'Link'}
                    </StatusTag>
                  </td>
                  <td>
                    <div className="font-semibold text-gov-gray-90">{doc.title}</div>
                    <div className="text-[13px] text-gov-gray-60 mt-0.5">{doc.description}</div>
                  </td>
                  <td className="meta">{doc.category}</td>
                  <td className="font-mono text-[13px] text-gov-gray-60">
                    {new Date(doc.updated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-sm">Open →</button>
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
