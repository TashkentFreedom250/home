import { getSlackChannels, getDocuments, getBudget } from '../api'
import ProgressBar from '../components/ProgressBar'

function ActivityPip({ level }) {
  const color = { high: 'bg-green-400', medium: 'bg-yellow-400', low: 'bg-slate-500' }[level]
  return (
    <div className="flex items-center gap-1.5">
      <div className={`h-2 w-2 rounded-full ${color} ${level === 'high' ? 'animate-pulse' : ''}`} />
      <span className="text-xs capitalize text-slate-500">{level}</span>
    </div>
  )
}

const statusColor = { awarded: 'text-green-400', pending: 'text-yellow-400', quoted: 'text-blue-400' }
const statusLabel = { awarded: 'Settled', pending: 'Pending', quoted: 'Quoted' }

export default function Resources() {
  const channels = getSlackChannels()
  const docs     = getDocuments()
  const budget   = getBudget()

  const totalCommitted = budget.breakdown.reduce((s, i) => s + i.amount, 0)
  const pct = Math.min(100, Math.round((totalCommitted / budget.available) * 100))

  return (
    <div className="min-h-full p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-yellow-600">Hub</p>
        <h1 className="font-display text-3xl font-black text-white">Resources</h1>
        <p className="mt-1 text-sm text-slate-400">Budget, channels, and planning documents</p>
      </div>

      {/* Budget Overview */}
      <section className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-lg">💰</span>
          <h2 className="text-base font-semibold text-white">Budget Overview</h2>
        </div>
        <div className="card card-glow-gold">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Available</p>
              <p className="text-3xl font-black text-yellow-400">~{budget.available} <span className="text-base font-normal text-slate-500">units</span></p>
              <p className="mt-1 text-xs text-slate-600">{budget.note}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 mb-1">Estimated commitments</p>
              <p className="text-2xl font-bold text-white">{totalCommitted} <span className="text-sm font-normal text-slate-500">units</span></p>
            </div>
          </div>
          <div className="mb-4">
            <ProgressBar value={pct} color={pct > 100 ? 'red' : 'gold'} height="md" />
            <p className="mt-1 text-xs text-slate-600">{totalCommitted} of {budget.available} units estimated — final amounts subject to negotiation</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {budget.breakdown.map((item, i) => (
              <div key={i} className="rounded-lg border border-slate-800 bg-slate-800/40 px-4 py-3">
                <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                <p className="text-lg font-bold text-white">{item.amount} <span className="text-xs font-normal text-slate-500">units</span></p>
                <p className={`text-xs mt-0.5 ${statusColor[item.status]}`}>{statusLabel[item.status]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slack Channels */}
      <section className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-lg">💬</span>
          <h2 className="text-base font-semibold text-white">Slack Channels</h2>
          <span className="badge-purple ml-1">{channels.length}</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {channels.map(ch => (
            <div key={ch.id} className="card cursor-pointer hover:border-purple-700/40 transition-all duration-200 group">
              <div className="mb-2 flex items-start justify-between">
                <span className="font-mono text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                  {ch.name}
                </span>
                <ActivityPip level={ch.activity} />
              </div>
              <p className="mb-2 text-xs leading-relaxed text-slate-500">{ch.description}</p>
              <p className="text-xs text-slate-600">{ch.members} members</p>
            </div>
          ))}
        </div>
      </section>

      {/* Documents */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <span className="text-lg">📄</span>
          <h2 className="text-base font-semibold text-white">Planning Documents</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {docs.map(doc => (
            <div key={doc.id} className="card cursor-pointer hover:border-yellow-700/40 transition-all duration-200 group">
              <div className="flex gap-3">
                <span className="mt-0.5 text-xl flex-shrink-0">{doc.type === 'doc' ? '📑' : '🔗'}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-white group-hover:text-yellow-300 transition-colors">{doc.title}</div>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">{doc.description}</p>
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
