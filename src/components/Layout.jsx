// src/components/Layout.jsx
// Dark glass sidebar layout. Stars behind everything.
// No .gov top chrome — sidebar-only like the original structure.

import { Outlet, NavLink } from 'react-router-dom'
import Stars from './Stars'

function IconDashboard() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> }
function IconProgress()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg> }
function IconResources() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> }
function IconAction()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> }

const NAV = [
  { path: '/',          label: 'Dashboard', Icon: IconDashboard, end: true  },
  { path: '/progress',  label: 'Progress',  Icon: IconProgress,  end: false },
  { path: '/resources', label: 'Resources', Icon: IconResources, end: false },
  { path: '/action',    label: 'Action',    Icon: IconAction,    end: false, badge: 4 },
]

export default function Layout() {
  return (
    <div style={{ position: 'relative', display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Stars/>

      {/* Sidebar */}
      <aside style={{
        width: 240, flexShrink: 0,
        background: 'rgba(5,15,40,0.92)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', flexDirection: 'column',
        position: 'relative', zIndex: 10,
      }}>
        {/* Brand */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '20px 18px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{
            width: 40, height: 40, flexShrink: 0,
            background: '#0b1e3f',
            borderTop: '3px solid #d83933',
            borderBottom: '3px solid #d83933',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontFamily: "'Merriweather', serif",
            fontWeight: 900, fontSize: 12,
          }}>250</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>Freedom 250</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>
              U.S. Embassy Tashkent
            </div>
          </div>
        </div>

        {/* Section label */}
        <div style={{
          padding: '14px 18px 6px',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          Event Operations
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map(({ path, label, Icon, end, badge }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            >
              <Icon/>
              <span>{label}</span>
              {badge && (
                <span style={{
                  marginLeft: 'auto',
                  background: '#d83933', color: '#fff',
                  fontSize: 10, fontWeight: 700,
                  padding: '2px 6px', borderRadius: 99,
                }}>
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '14px 18px',
          fontSize: 12, color: 'rgba(255,255,255,0.3)',
        }}>
          Signed in as
          <strong style={{
            display: 'block', color: 'rgba(255,255,255,0.6)',
            fontSize: 13, fontWeight: 600, marginTop: 1,
          }}>
            Chair · You
          </strong>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <span className="live-dot"/>
            <span style={{ fontSize: 11 }}>Mission active · Jun 10, 2026</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 1 }}>
        <Outlet/>
      </main>
    </div>
  )
}
