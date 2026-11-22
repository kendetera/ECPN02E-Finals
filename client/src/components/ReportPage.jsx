import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { api, qs } from '../api.js';
import PageHead from './PageHead.jsx';

// Generic report: search box (+ optional date range) and a table of saved records.
// columns: [{ label, render: (row) => value, num?: true, code?: true }]
export default function ReportPage({ title, description, endpoint, columns, placeholder, dateRange, footer }) {
  const [q, setQ] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');
    try {
      setRows(await api(endpoint + qs({ q, from, to })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { search(); }, []); // show all saved records on open

  return (
    <section>
      <PageHead title={title}>{description ?? 'Search records saved in the database.'}</PageHead>
      <form className="search" onSubmit={search} role="search">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder ?? 'Search…'} aria-label={placeholder ?? 'Search'} />
        {dateRange && (
          <>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From" />
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="To" />
          </>
        )}
        <button type="submit" disabled={loading}><Search size={18} aria-hidden="true" />{loading ? 'Searching…' : 'Search'}</button>
      </form>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="report-tile patterned">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>{columns.map((c) => <th key={c.label} className={c.num ? 'num' : undefined}>{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length} className="empty">
                {loading ? 'Loading…' : q || from || to ? 'No saved records match this search.' : 'No records saved yet.'}
              </td></tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id}>
                  {columns.map((c) => (
                    <td key={c.label} className={c.num ? 'num' : c.code ? 'code' : undefined}>{c.render(r)}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>
      {footer && rows.length > 0 && <div className="report-footer">{footer(rows)}</div>}
    </section>
  );
}
