import { useState } from 'react'
import Countdown from './Countdown'

const TOKEN = 'VGFzaGtlbnQyNTAhISE='

export default function LoginGate({ children }) {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem('f250_auth') === TOKEN
  )
  const [input, setInput] = useState('')
  const [error, setError]   = useState(false)
  const [shake, setShake]   = useState(false)

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
    <div className="min-h-screen bg-paper flex flex-col">

      {/* ── Newspaper header ──────────────────────────────── */}
      <header className="border-b-4 border-ink px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="font-mono text-[9px] tracking-[0.4em] text-ink-muted uppercase leading-relaxed">
            Tashkent, Uzbekistan<br />Vol. 250, No. 1
          </div>
          <h1 className="font-display text-[56px] sm:text-[72px] leading-none text-ink tracking-tight text-center">
            FREEDOM 250
          </h1>
          <div className="font-mono text-[9px] tracking-[0.4em] text-ink-muted uppercase text-right leading-relaxed">
            June 10, 2026<br />Mission Control
          </div>
        </div>
        <div className="mt-3 h-[3px] bg-crimson" />
        <div className="mt-0.5 h-[1px] bg-crimson" />
      </header>

      {/* ── Main content ──────────────────────────────────── */}
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg text-center">

          {/* Stars */}
          <div className="font-mono text-crimson text-xs tracking-[1em] mb-6">★ ★ ★ ★ ★</div>

          {/* Headline */}
          <div className="font-display text-[72px] sm:text-[96px] leading-[0.88] text-ink tracking-tight mb-2">
            AMERICA'S
          </div>
          <div className="font-display text-[72px] sm:text-[96px] leading-[0.88] text-crimson tracking-tight">
            250TH
          </div>

          {/* Divider rule */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-ink/20" />
            <div className="font-serif italic text-sm text-ink-muted">
              "Celebrating Two and a Half Centuries of Liberty"
            </div>
            <div className="flex-1 h-px bg-ink/20" />
          </div>

          {/* Countdown */}
          <Countdown />

          {/* Divider */}
          <div className="mt-8 mb-6 border-t border-paper-mid" />
          <div className="font-mono text-[10px] tracking-[0.45em] text-ink-muted uppercase mb-5">
            Authorized Personnel · Enter Password
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-3"
            style={{ animation: shake ? 'shake 0.4s ease' : undefined }}
          >
            <input
              type="password"
              value={input}
              autoFocus
              placeholder="Password"
              onChange={e => { setInput(e.target.value); setError(false) }}
              className={`w-full bg-transparent border-b-2 border-t border-x px-4 py-3
                text-ink placeholder-ink-muted/50 text-sm text-center tracking-[0.3em]
                outline-none transition-colors duration-150 font-mono
                ${error ? 'border-crimson' : 'border-ink/25 focus:border-b-crimson'}`}
            />
            {error && (
              <p className="font-mono text-[11px] text-crimson tracking-wider">
                Incorrect password. Try again.
              </p>
            )}
            <button type="submit" className="btn-primary w-full py-3">
              Enter Mission Control
            </button>
          </form>

        </div>
      </div>

      {/* ── Bottom rule ───────────────────────────────────── */}
      <div className="border-t border-paper-mid px-8 py-3 text-center">
        <span className="font-mono text-[9px] tracking-[0.35em] text-ink-muted/60 uppercase">
          Uzexpocentre · Tashkent, Uzbekistan
        </span>
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-5px); }
          80%      { transform: translateX(5px); }
        }
      `}</style>
    </div>
  )
}
