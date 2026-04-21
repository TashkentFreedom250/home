import { Outlet, NavLink } from 'react-router-dom'

const NAV = [
  { path: '/',          label: 'Dashboard', end: true  },
  { path: '/progress',  label: 'Progress',  end: false },
  { path: '/resources', label: 'Resources', end: false },
  { path: '/action',    label: 'Action',    end: false },
]

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-paper">

      {/* ── Sidebar / Masthead ──────────────────────────────── */}
      <aside className="flex w-48 flex-shrink-0 flex-col bg-paper-dark border-r-2 border-ink">

        {/* Masthead */}
        <div className="px-5 pt-6 pb-5 border-b-2 border-ink">
          <div className="font-mono text-[9px] tracking-[0.5em] text-ink-muted uppercase mb-3">
            U.S. Embassy
          </div>
          <div className="font-display text-[42px] leading-none text-ink tracking-tight">FREEDOM</div>
          <div className="font-display text-[42px] leading-none text-crimson tracking-tight">250</div>
          <div className="mt-3 text-crimson text-[11px] tracking-[0.4em]">★ ★ ★ ★ ★</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2">
          {NAV.map(({ path, label, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `block px-5 py-3 font-mono text-[10px] tracking-[0.25em] uppercase border-l-[3px] transition-all duration-150 ${
                  isActive
                    ? 'border-crimson text-crimson bg-crimson/8'
                    : 'border-transparent text-ink-muted hover:text-ink hover:bg-ink/5'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-paper-mid px-5 py-4">
          <div className="font-mono text-[9px] tracking-[0.3em] text-ink-muted uppercase">June 10, 2026</div>
          <div className="font-mono text-[9px] text-ink-muted/60 mt-0.5">Tashkent, Uzbekistan</div>
          <div className="mt-2 font-mono text-[8px] text-ink-muted/40 tracking-wider">41.3°N 69.3°E</div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
