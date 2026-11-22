import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../auth.jsx';
import { PAGES } from '../pages.js';
import TileMotif from './TileMotif.jsx';

export default function Layout() {
  const { user, logout, can } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const visible = PAGES.filter((p) => can(p.key));
  const groups = [...new Set(visible.map((p) => p.group ?? ''))];

  useEffect(() => setOpen(false), [location.pathname]); // close the phone menu after navigating

  return (
    <div className="shell">
      <header className="topbar">
        <Brand />
        <button className="icon-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="sidebar">
          {open ? <X size={22} /> : <Menu size={22} />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </header>

      <aside id="sidebar" className={`sidebar${open ? ' open' : ''}`}>
        <div className="sidebar-brand"><Brand /></div>
        <nav aria-label="Main">
          {groups.map((g) => (
            <div key={g || 'main'} className="nav-section">
              {g && <div className="nav-group">{g}</div>}
              {visible.filter((p) => (p.group ?? '') === g).map(({ key, path, label, icon: Icon }) => (
                <NavLink key={key} to={path} end={path === '/'}>
                  <Icon size={18} strokeWidth={2} aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div className="who">
            <span className="who-name">{user.username}</span>
            <span className="role">{user.role}</span>
          </div>
          <button className="logout" onClick={logout}>
            <LogOut size={16} aria-hidden="true" /> Log out
          </button>
        </div>
      </aside>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}

      <main className="content">
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function Brand() {
  return (
    <div className="brand">
      <TileMotif variant="corner" size={28} />
      <span>Suki<b>Mart</b></span>
    </div>
  );
}
