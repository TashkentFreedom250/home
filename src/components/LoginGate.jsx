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
    <div className="relative min-h-screen bg-navy-950 flex flex-col">
      <Stars />

      {/* Top bar */}
      <div className="relative z-10 bg-brand-red flex items-center justify-between px-8 py-2.5">
        <div className="text-[9px] tracking-[0.45em] text-white/70 uppercase font-medium">
          U.S. Embassy · Tashkent · Uzbekistan
        </div>
        <div className="text-[9px] tracking-[0.45em] text-white/70 uppercase font-medium">
          Authorized Access Only
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12">

        {/* Hero title */}
        <div className="text-center mb-10">
          <div className="font-display text-[80px] sm:text-[110px] leading-none font-bold text-cream tracking-[0.08em]">
            FREEDOM
          </div>
          <div className="font-display text-[80px] sm:text-[110px] leading-none font-bold text-brand-gold tracking-[0.08em] -mt-3">
            250
          </div>
          <div className="mt-5 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-[#1c3a5e]" />
            <div className="text-[10px] tracking-[0.5em] text-steel uppercase">
              America's 250th Anniversary · June 10, 2026
            </div>
            <div className="h-px w-16 bg-[#1c3a5e]" />
          </div>
        </div>

        {/* Countdown */}
        <div className="mb-10 w-full max-w-lg">
          <div className="text-[9px] tracking-[0.4em] text-steel uppercase text-center mb-4">
            Time Remaining
          </div>
          <Countdown />
        </div>

        {/* Divider */}
        <div className="w-full max-w-xs mb-8">
          <div className="h-px bg-[#1c3a5e]" />
          <div className="mt-3 text-center text-[10px] tracking-[0.35em] text-[#4a6a88] uppercase">
            Mission Control · Enter Password
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xs space-y-3"
          style={{ animation: shake ? 'shake 0.4s ease' : undefined }}
        >
          <input
            type="password"
            value={input}
            autoFocus
            placeholder="Password"
            onChange={e => { setInput(e.target.value); setError(false) }}
            className={`w-full bg-navy-800 border px-4 py-3 text-cream placeholder-[#3a5a7a] text-sm
              outline-none transition-colors duration-150 text-center tracking-widest
              focus:border-brand-gold ${error ? 'border-brand-red' : 'border-[#1c3a5e]'}`}
          />
          {error && (
            <p className="text-[11px] text-[#e87070] text-center tracking-wider">
              Incorrect password. Try again.
            </p>
          )}
          <button type="submit" className="btn-primary w-full text-center">
            Enter Mission Control
          </button>
        </form>

      </div>

      {/* Bottom stamp */}
      <div className="relative z-10 border-t border-[#1c3a5e] px-8 py-3 flex items-center justify-center">
        <span className="text-[9px] tracking-[0.3em] text-[#3a5a7a] uppercase">
          Uzexpocentre · Tashkent, Uzbekistan
        </span>
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
