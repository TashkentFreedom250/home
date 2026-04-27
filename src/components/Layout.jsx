// src/components/Layout.jsx
// Federal three-tier chrome: gov banner → navy masthead → breadcrumb + sidebar + main.
// Replaces the original dark sidebar-only layout.

import { Outlet, NavLink, useLocation } from 'react-router-dom'

// ── Nav icons ──────────────────────────────────────────────────────────────
function IconDashboard() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  )
}
function IconProgress() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6"  y1="20" x2="6"  y2="14"/>
      <line x1="2"  y1="20" x2="22" y2="20"/>
    </svg>
  )
}
function IconResources() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
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
  { path: '/',          label: 'Dashboard', Icon: IconDashboard, end: true,  actionCount: 0 },
  { path: '/progress',  label: 'Progress',  Icon: IconProgress,  end: false, actionCount: 0 },
  { path: '/resources', label: 'Resources', Icon: IconResources, end: false, actionCount: 0 },
  { path: '/action',    label: 'Action',    Icon: IconAction,    end: false, actionCount: 4 },
]

const PAGE_LABELS = {
  '/':          'Dashboard',
  '/progress':  'Progress',
  '/resources': 'Resources',
  '/action':    'Action',
}

export default function Layout() {
  const location = useLocation()
  const currentLabel = PAGE_LABELS[location.pathname] ?? ''

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Masthead ──────────────────────────────────────────────── */}
      <header className="bg-navy-darker border-b-[6px] border-gov-red px-6 py-4 flex items-center gap-4">
        {/* Seal */}
        <div className="w-12 h-12 bg-navy-darkest border-t-4 border-b-4 border-gov-red flex items-center justify-content-center shrink-0">
          <span className="font-serif font-black text-white text-sm w-full text-center">250</span>
        </div>
        {/* Title */}
        <div className="leading-tight">
          <div className="font-sans font-bold text-xl text-white">Freedom 250</div>
          <div className="font-sans text-[12.5px] text-[#9bb4d4]">
            U.S. Embassy Tashkent · America's 250th Anniversary
          </div>
        </div>
        {/* Top nav */}
        <nav className="ml-auto flex items-center gap-6 text-[15px]">
          {NAV.map(({ path, label, end, actionCount }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `text-white no-underline pb-1 border-b-[3px] transition-colors ${
                  isActive ? 'border-gov-red font-bold' : 'border-transparent font-medium hover:border-white/40'
                }`
              }
            >
              {label}
              {actionCount > 0 && (
                <span className="ml-1.5 bg-gov-red text-white text-[11px] font-bold px-1.5 rounded-full">
                  {actionCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* ── Tier 3: Breadcrumb ────────────────────────────────────── */}
      <div className="bg-white border-b border-gov-gray-10 px-10 py-3 text-[13px] text-gov-gray-60">
        <span>Mission Control</span>
        <span className="mx-1.5 text-gov-gray-30">›</span>
        <span className="font-semibold text-gov-gray-90">{currentLabel}</span>
      </div>

      {/* ── Body layout ───────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="w-60 flex-shrink-0 bg-white border-r border-gov-gray-10 flex flex-col">
          <div className="px-4 py-3 text-[11px] font-bold tracking-[0.06em] uppercase text-gov-gray-60 border-b border-gov-gray-10">
            Event operations
          </div>
          <nav className="flex flex-col py-1">
            {NAV.map(({ path, label, Icon, end, actionCount }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'nav-item-active' : ''}`
                }
              >
                <Icon/>
                <span>{label}</span>
                {actionCount > 0 && (
                  <span className="ml-auto bg-gov-red text-white text-[11px] font-bold px-1.5 rounded-full">
                    {actionCount}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto px-4 py-3 border-t border-gov-gray-10 text-[12px] text-gov-gray-60">
            Signed in as
            <strong className="block text-sm font-semibold text-gov-gray-90">Chair · You</strong>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-white">
          <Outlet/>
        </main>

      </div>
    </div>
  )
}
