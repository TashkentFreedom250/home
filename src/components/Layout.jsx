import { Outlet, NavLink } from 'react-router-dom'
import Stars from './Stars'

function IconDashboard() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  )
}
function IconProgress() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  )
}
function IconResources() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  )
}
function IconAction() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <div className="relative flex h-screen overflow-hidden bg-navy-900">
      <Stars />

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className="relative z-10 flex w-52 flex-shrink-0 flex-col bg-navy-950 border-r border-[#1c3a5e]">

        {/* Logo */}
        <div className="px-6 py-6 border-b border-[#1c3a5e]">
          <div className="font-display text-2xl font-bold tracking-[0.12em] text-cream leading-none">FREEDOM</div>
          <div className="font-display text-2xl font-bold tracking-[0.12em] text-brand-gold leading-none">250</div>
          <div className="mt-2.5 h-px bg-[#1c3a5e]" />
          <div className="mt-2 text-[9px] tracking-[0.35em] text-steel uppercase">U.S. Embassy · Tashkent</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3">
          {NAV.map(({ path, label, Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-6 py-3 text-[10px] font-semibold tracking-[0.22em] uppercase transition-all duration-150 border-l-2 ${
                  isActive
                    ? 'border-brand-gold text-cream bg-navy-800'
                    : 'border-transparent text-steel hover:text-cream hover:bg-navy-800/50'
                }`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-[#1c3a5e] px-6 py-4">
          <div className="text-[9px] tracking-[0.3em] text-steel uppercase">June 10, 2026</div>
          <div className="mt-0.5 text-[9px] text-[#3a5a7a]">41.3°N 69.3°E · Tashkent</div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
