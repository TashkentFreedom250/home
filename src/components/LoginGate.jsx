import { useState } from 'react'
import Stars from './Stars'

// Stored as base64 to avoid plain-text in source
const TOKEN = 'VGFzaGtlbnQyNTAhISE='

export default function LoginGate({ children }) {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem('f250_auth') === TOKEN
  )
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  if (authed) return children

  function handleSubmit(e) {
    e.preventDefault()
    if (btoa(input) === TOKEN) {
      sessionStorage.setItem('f250_auth', TOKEN)
      setAuthed(true)
    } else {
      setError(true)
      setShake(true)
      setInput('')
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950">
      <Stars />

      <div
        className={`card card-glow-gold relative z-10 w-full max-w-sm mx-4 text-center ${shake ? 'animate-shake' : ''}`}
        style={{ animation: shake ? 'shake 0.4s ease' : undefined }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-600 to-red-700 text-2xl font-black text-white shadow-lg">
            F
          </div>
          <div>
            <div className="text-[13px] font-semibold tracking-[0.22em] text-white uppercase">Freedom</div>
            <div className="text-[11px] tracking-[0.28em] text-yellow-500 uppercase">Two Fifty</div>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-lg font-semibold text-white mb-1">Mission Control</h1>
          <p className="text-sm text-slate-400">Restricted access — authorized personnel only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={input}
              autoFocus
              placeholder="Enter password"
              onChange={e => { setInput(e.target.value); setError(false) }}
              className={`w-full rounded-lg border px-4 py-3 bg-slate-800 text-white placeholder-slate-500 text-sm outline-none transition-all duration-150 focus:border-yellow-600/60 focus:ring-1 focus:ring-yellow-600/30 ${
                error ? 'border-red-600/60' : 'border-slate-700'
              }`}
            />
            {error && (
              <p className="mt-2 text-xs text-red-400 text-left">Incorrect password. Try again.</p>
            )}
          </div>
          <button type="submit" className="btn-primary w-full">
            Enter
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px); }
        }
      `}</style>
    </div>
  )
}
