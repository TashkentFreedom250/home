import { useState } from 'react'
import { getActions } from '../api'
import StatusTag from '../components/StatusTag'

const CUSTOM_KEY = 'f250-custom-actions'
const DONE_KEY   = 'f250-done-actions'
const NOTES_KEY  = 'f250-meeting-notes'

const PRIORITY_CFG = {
  high:   { kind: 'error', label: 'Urgent',    accent: 'accent-coral' },
  medium: { kind: 'warn',  label: 'This Week', accent: 'accent-amber' },
  low:    { kind: 'info',  label: 'Soon',      accent: 'accent-cyan'  },
}

const BLANK_ACTION = { title: '', description: '', deadline: '', priority: 'high' }
const BLANK_NOTE   = { title: '', body: '', meetingDate: '' }

function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)) } catch { return fallback }
}
function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
function todayISO() {
  return new Date().toISOString().slice(0, 10)
}
function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function Action() {
  const [tab, setTab] = useState('actions')

  // Action state
  const [custom, setCustom]   = useState(() => loadJSON(CUSTOM_KEY, []))
  const [doneIds, setDoneIds] = useState(() => new Set(loadJSON(DONE_KEY, [])))
  const [adding, setAdding]   = useState(false)
  const [form, setForm]       = useState(BLANK_ACTION)

  // Notes state
  const [notes, setNotes]         = useState(() => loadJSON(NOTES_KEY, []))
  const [addingNote, setAddingNote] = useState(false)
  const [noteForm, setNoteForm]   = useState({ ...BLANK_NOTE, meetingDate: todayISO() })
  const [editingId, setEditingId] = useState(null)

  const allActions = [...getActions(), ...custom]
  const active     = allActions.filter(a => !doneIds.has(a.id))
  const done       = allActions.filter(a =>  doneIds.has(a.id))
  const blockers   = active.filter(a => a.priority === 'high').length

  function toggleDone(id) {
    setDoneIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      saveJSON(DONE_KEY, [...next])
      return next
    })
  }

  function handleAdd(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    const item = { id: `c-${Date.now()}`, icon: '📌', done: false, ...form }
    const next = [...custom, item]
    setCustom(next)
    saveJSON(CUSTOM_KEY, next)
    setForm(BLANK_ACTION)
    setAdding(false)
  }

  function handleNoteSubmit(e) {
    e.preventDefault()
    if (!noteForm.body.trim()) return
    const stamp = new Date().toISOString()
    let next
    if (editingId) {
      next = notes.map(n => n.id === editingId ? { ...n, ...noteForm, updatedAt: stamp } : n)
    } else {
      const item = {
        id: `n-${Date.now()}`,
        ...noteForm,
        meetingDate: noteForm.meetingDate || todayISO(),
        createdAt: stamp,
        updatedAt: stamp,
      }
      next = [item, ...notes]
    }
    setNotes(next)
    saveJSON(NOTES_KEY, next)
    setNoteForm({ ...BLANK_NOTE, meetingDate: todayISO() })
    setAddingNote(false)
    setEditingId(null)
  }

  function startEditNote(note) {
    setEditingId(note.id)
    setNoteForm({ title: note.title || '', body: note.body, meetingDate: note.meetingDate })
    setAddingNote(true)
  }

  function deleteNote(id) {
    if (!confirm('Delete this note?')) return
    const next = notes.filter(n => n.id !== id)
    setNotes(next)
    saveJSON(NOTES_KEY, next)
  }

  const sortedNotes = [...notes].sort((a, b) =>
    (b.meetingDate || '').localeCompare(a.meetingDate || '')
  )

  return (
    <div className="page-shell page-fit">
      <header className="page-head enter d0">
        <div>
          <span className="page-eyebrow">Command center</span>
          <h1 className="page-title">Decisions in motion.</h1>
          <p className="page-lede">Track action items and capture meeting notes — everything saved locally so nothing slips between Mondays.</p>
        </div>
        <StatusTag kind="error">{blockers} Blockers</StatusTag>
      </header>

      <div className="action-tabs enter d1">
        <button
          className={`action-tab ${tab === 'actions' ? 'is-active' : ''}`}
          type="button"
          onClick={() => setTab('actions')}
        >
          Action items <span className="tab-count">{active.length}</span>
        </button>
        <button
          className={`action-tab ${tab === 'notes' ? 'is-active' : ''}`}
          type="button"
          onClick={() => setTab('notes')}
        >
          Meeting notes <span className="tab-count">{notes.length}</span>
        </button>
      </div>

      <section className="page-body enter d1">
        {tab === 'actions' && (
          <article className="page-panel actions-card">
            <header className="lanes-head">
              <div>
                <h2>Action items</h2>
                <span className="page-sub">Click a card to mark complete — click again to reopen</span>
              </div>
              <button
                className="action-tile-cta"
                type="button"
                onClick={() => setAdding(v => !v)}
              >
                {adding ? '✕ Cancel' : '+ Add item'}
              </button>
            </header>

            {adding && (
              <form className="action-add-form" onSubmit={handleAdd}>
                <input
                  className="action-add-input"
                  placeholder="Title *"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  required
                  autoFocus
                />
                <input
                  className="action-add-input"
                  placeholder="Description (optional)"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
                <div className="action-add-row">
                  <input
                    className="action-add-input"
                    placeholder="Due date (e.g. May 6)"
                    value={form.deadline}
                    onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                  />
                  <select
                    className="action-add-input action-add-select"
                    value={form.priority}
                    onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
                  >
                    <option value="high">Urgent</option>
                    <option value="medium">This Week</option>
                    <option value="low">Soon</option>
                  </select>
                  <button className="action-tile-cta" type="submit">Add</button>
                </div>
              </form>
            )}

            <div className="action-board">
              {active.map(action => {
                const cfg = PRIORITY_CFG[action.priority] ?? PRIORITY_CFG.low
                return (
                  <button
                    className={`action-tile accent-flood ${cfg.accent}`}
                    key={action.id}
                    type="button"
                    onClick={() => toggleDone(action.id)}
                  >
                    <div className="action-tile-head">
                      <StatusTag kind={cfg.kind}>{cfg.label}</StatusTag>
                      {action.deadline && (
                        <span className="mono action-tile-due">Due {action.deadline}</span>
                      )}
                    </div>
                    <h3>{action.title}</h3>
                    {action.description && <p>{action.description}</p>}
                    <span className="action-tile-cta">Mark complete</span>
                  </button>
                )
              })}
            </div>

            {done.length > 0 && (
              <>
                <header className="lanes-head action-done-head">
                  <h2>Completed</h2>
                  <span className="page-sub">Click to reopen</span>
                </header>
                <div className="action-board">
                  {done.map(action => (
                    <button
                      className="action-tile action-tile-done"
                      key={action.id}
                      type="button"
                      onClick={() => toggleDone(action.id)}
                    >
                      <div className="action-tile-head">
                        <StatusTag kind="info">Done ✓</StatusTag>
                        {action.deadline && (
                          <span className="mono action-tile-due">Due {action.deadline}</span>
                        )}
                      </div>
                      <h3>{action.title}</h3>
                      {action.description && <p>{action.description}</p>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </article>
        )}

        {tab === 'notes' && (
          <article className="page-panel actions-card">
            <header className="lanes-head">
              <div>
                <h2>Meeting notes</h2>
                <span className="page-sub">Capture Monday meeting items — convert to action items later</span>
              </div>
              <button
                className="action-tile-cta"
                type="button"
                onClick={() => {
                  if (addingNote) {
                    setAddingNote(false)
                    setEditingId(null)
                    setNoteForm({ ...BLANK_NOTE, meetingDate: todayISO() })
                  } else {
                    setAddingNote(true)
                  }
                }}
              >
                {addingNote ? '✕ Cancel' : '+ New note'}
              </button>
            </header>

            {addingNote && (
              <form className="action-add-form" onSubmit={handleNoteSubmit}>
                <div className="action-add-row">
                  <input
                    className="action-add-input"
                    placeholder="Note title (e.g. Monday standup)"
                    value={noteForm.title}
                    onChange={e => setNoteForm(f => ({ ...f, title: e.target.value }))}
                  />
                  <input
                    className="action-add-input note-date-input"
                    type="date"
                    value={noteForm.meetingDate}
                    onChange={e => setNoteForm(f => ({ ...f, meetingDate: e.target.value }))}
                  />
                </div>
                <textarea
                  className="action-add-input note-textarea"
                  placeholder="What came up? Decisions, follow-ups, blockers, who-owes-what…"
                  value={noteForm.body}
                  onChange={e => setNoteForm(f => ({ ...f, body: e.target.value }))}
                  rows={6}
                  required
                  autoFocus
                />
                <div className="action-add-row" style={{ justifyContent: 'flex-end' }}>
                  <button className="action-tile-cta" type="submit">
                    {editingId ? 'Save changes' : 'Save note'}
                  </button>
                </div>
              </form>
            )}

            <div className="note-list">
              {sortedNotes.length === 0 && !addingNote && (
                <div className="note-empty">
                  No notes yet. Click <strong>+ New note</strong> to capture your first Monday meeting.
                </div>
              )}
              {sortedNotes.map(note => (
                <div className="note-card" key={note.id}>
                  <div className="note-card-head">
                    <div>
                      {note.title && <strong className="note-title">{note.title}</strong>}
                      <span className="note-date mono">{formatDate(note.meetingDate)}</span>
                    </div>
                    <div className="note-actions">
                      <button className="note-btn" type="button" onClick={() => startEditNote(note)}>Edit</button>
                      <button className="note-btn note-btn-danger" type="button" onClick={() => deleteNote(note.id)}>Delete</button>
                    </div>
                  </div>
                  <p className="note-body">{note.body}</p>
                </div>
              ))}
            </div>
          </article>
        )}
      </section>
    </div>
  )
}
