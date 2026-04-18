import { useState } from 'react'
import Stars from './Stars'
import Countdown from './Countdown'

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
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4">
      <Stars />

      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl text-center gap-10">

        {/* Branding */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-700/60" />
            <span className="text-[11px] tracking-[0.35em] text-yellow-600 uppercase font-semibold">
              U.S. Embassy Tashkent
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-700/60" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white leading-none">
            FREEDOM <span className="text-yellow-400">250</span>
          </h1>
          <p className="text-slate-400 text-sm tracking-[0.2em] uppercase mt-2">
            June 10, 2026 · Tashkent, Uzbekistan
          </p>
        </div>

        {/* Countdown */}
        <div className="w-full">
          <div className="text-[10px] tracking-[0.3em] text-slate-500 uppercase mb-4">
            Counting down to showtime
          </div>
          <Countdown />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full max-w-sm">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-[11px] tracking-[0.2em] text-slate-600 uppercase">Enter password to access</span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        {/* Password form */}
        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-sm space-y-3 ${shake ? 'animate-shake' : ''}`}
          style={{ animation: shake ? 'shake 0.4s ease' : undefined }}
        >
          <input
            type="password"
            value={input}
            autoFocus
            placeholder="Password"
            onChange={e => { setInput(e.target.value); setError(false) }}
            className={`w-full rounded-lg border px-4 py-3 bg-slate-900 text-white placeholder-slate-600 text-sm outline-none transition-all duration-150 focus:border-yellow-600/60 focus:ring-1 focus:ring-yellow-600/30 text-center tracking-widest ${
              error ? 'border-red-700/60' : 'border-slate-800'
            }`}
          />
          {error && (
            <p className="text-xs text-red-400">Incorrect password. Try again.</p>
          )}
          <button type="submit" className="btn-primary w-full">
            Enter Mission Control
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
