import { Link } from 'react-router-dom';
import { useAuth } from '../auth.jsx';
import { PAGES } from '../pages.js';

export default function Dashboard() {
  const { user, can } = useAuth();
  const tiles = PAGES.filter((p) => p.key !== 'dashboard' && can(p.key));
  return (
    <section>
      <h1>Welcome, {user.username}</h1>
      <p className="muted">Choose what you want to do.</p>
      <div className="tiles">
        {tiles.map((p) => (
          <Link key={p.key} to={p.path} className="tile">
            <span className="tile-group">{p.group}</span>
            {p.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
