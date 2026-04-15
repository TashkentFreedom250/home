import { Outlet, NavLink } from 'react-router-dom'
import Stars from './Stars'

// ── Icons (inline SVG, no extra deps) ────────────────────────────────────────

function IconDashboard() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  )
}
function IconProgress() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  )
}
function IconResources() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  )
}
function IconAction() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  )
}

const NAV = [
  { path: '/',          label: 'Dashboard', Icon: IconDashboard, end: true  },
  { path: '/progress',  label: 'Progress',  Icon: IconProgress,  end: false },
  { path: '/resources', label: 'Resources', Icon: IconResources, end: false },
  { path: '/action',    label: 'Action',    Icon: IconAction,    end: false },
]

export default function Layout() {
  return (
    <div className="relative flex h-screen overflow-hidden">
      <Stars />

      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <aside className="relative z-10 flex w-56 flex-shrink-0 flex-col border-r border-slate-800 bg-slate-950/90 backdrop-blur-sm">

        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-600 to-red-700 font-display text-sm font-black text-white shadow-lg">
            F
          </div>
          <div className="leading-tight">
            <div className="font-display text-[11px] font-semibold tracking-[0.18em] text-white">FREEDOM</div>
            <div className="font-display text-[10px] tracking-[0.22em] text-yellow-500">TWO FIFTY</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 p-3">
          {NAV.map(({ path, label, Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-yellow-600/15 text-yellow-400 ring-1 ring-yellow-600/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer stamp */}
        <div className="border-t border-slate-800 px-5 py-4">
          <div className="text-center">
            <div className="text-[11px] font-medium text-slate-400">🇺🇸 June 10, 2026</div>
            <div className="mt-0.5 text-[10px] text-slate-600">250 Years of Liberty</div>
          </div>
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
