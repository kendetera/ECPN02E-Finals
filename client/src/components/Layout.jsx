import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth.jsx';
import { PAGES } from '../pages.js';

export default function Layout() {
  const { user, logout, can } = useAuth();
  const visible = PAGES.filter((p) => can(p.key));
  const groups = [...new Set(visible.map((p) => p.group ?? ''))];

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">ElectiveFinals</div>
        <nav>
          {groups.map((g) => (
            <div key={g || 'main'}>
              {g && <div className="nav-group">{g}</div>}
              {visible.filter((p) => (p.group ?? '') === g).map((p) => (
                <NavLink key={p.key} to={p.path} end={p.path === '/'}>
                  {p.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div>{user.username} <span className="role">{user.role}</span></div>
          <button className="link" onClick={logout}>Log out</button>
        </div>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
