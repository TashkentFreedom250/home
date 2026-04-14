import { getSlackChannels, getDocuments } from '../api'

function ActivityPip({ level }) {
  const color = { high: 'bg-green-400', medium: 'bg-yellow-400', low: 'bg-slate-500' }[level]
  return (
    <div className="flex items-center gap-1.5">
      <div className={`h-2 w-2 rounded-full ${color} ${level === 'high' ? 'animate-pulse' : ''}`} />
      <span className="text-xs capitalize text-slate-500">{level}</span>
    </div>
  )
}

export default function Resources() {
  const channels = getSlackChannels()
  const docs     = getDocuments()

  return (
    <div className="min-h-full p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-yellow-600">Hub</p>
        <h1 className="font-display text-3xl font-black text-white">Resources</h1>
        <p className="mt-1 text-sm text-slate-400">Communication channels, documents, and brand assets</p>
      </div>

      {/* Slack channels */}
      <section className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-lg">💬</span>
          <h2 className="text-base font-semibold text-white">Slack Channels</h2>
          <span className="badge-purple ml-1">{channels.length} channels</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {channels.map(ch => (
            <div
              key={ch.id}
              className="card cursor-pointer hover:border-purple-700/40 hover:shadow-[0_0_20px_rgba(100,50,180,0.12)] transition-all duration-200 group"
            >
              <div className="mb-2 flex items-start justify-between">
                <span className="font-mono text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                  {ch.name}
                </span>
                <ActivityPip level={ch.activity} />
              </div>
              <p className="mb-3 text-xs leading-relaxed text-slate-500">{ch.description}</p>
              <div className="text-xs text-slate-600">{ch.members.toLocaleString()} members</div>
            </div>
          ))}
        </div>
      </section>

      {/* Documents */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <span className="text-lg">📄</span>
          <h2 className="text-base font-semibold text-white">Documents & Links</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map(doc => (
            <div
              key={doc.id}
              className="card cursor-pointer hover:border-yellow-700/40 hover:shadow-[0_0_20px_rgba(161,110,3,0.12)] transition-all duration-200 group"
            >
              <div className="flex gap-3">
                <span className="mt-0.5 text-xl">{doc.type === 'doc' ? '📑' : '🔗'}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-white group-hover:text-yellow-300 transition-colors">
                    {doc.title}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">{doc.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="badge-gold">{doc.category}</span>
                    <span className="text-xs text-slate-600">
                      {new Date(doc.updated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
