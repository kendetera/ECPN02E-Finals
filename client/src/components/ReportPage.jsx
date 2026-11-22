import { useEffect, useState } from 'react';
import { api, qs } from '../api.js';

// Generic report: search box (+ optional date range) and a table of saved records.
// columns: [{ label, render: (row) => value }]
export default function ReportPage({ title, endpoint, columns, placeholder, dateRange, footer }) {
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
      <h1>{title}</h1>
      <form className="search" onSubmit={search}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder ?? 'Search…'} />
        {dateRange && (
          <>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From" />
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="To" />
          </>
        )}
        <button type="submit" disabled={loading}>{loading ? 'Searching…' : 'Search'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>{columns.map((c) => <th key={c.label}>{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length} className="empty">No records found.</td></tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id}>{columns.map((c) => <td key={c.label}>{c.render(r)}</td>)}</tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {footer && rows.length > 0 && <div className="report-footer">{footer(rows)}</div>}
    </section>
  );
}
