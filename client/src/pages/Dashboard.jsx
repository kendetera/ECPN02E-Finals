import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, UserPlus } from 'lucide-react';
import { useAuth } from '../auth.jsx';
import { api, peso } from '../api.js';
import PageHead from '../components/PageHead.jsx';

const dayName = (iso) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-PH', { weekday: 'short' });
const wholePeso = (n) => Number(n).toLocaleString('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 });
const timeOf = (iso) => new Date(iso).toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit' });

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Magandang umaga';
  if (h < 18) return 'Magandang hapon';
  return 'Magandang gabi';
}

export default function Dashboard() {
  const { user, can } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/dashboard').then(setData).catch((e) => setError(e.message));
  }, []);

  const today = new Date().toLocaleDateString('en-PH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const max = data ? Math.max(...data.week.map((d) => d.total), 1) : 1;

  return (
    <section>
      <PageHead
        title={`${greeting()}, ${user.username}`}
        actions={
          <>
            {can('employee-registration') && (
              <Link to="/employees/register" className="btn"><UserPlus size={18} aria-hidden="true" /> Register employee</Link>
            )}
            {can('pos') && (
              <Link to="/pos" className="btn primary"><ShoppingCart size={18} aria-hidden="true" /> Open POS</Link>
            )}
          </>
        }
      >
        {today}
      </PageHead>

      {error && <p className="error" role="alert">Could not load today's figures: {error}</p>}

      <div className="tiles">
        <div className="tile tile-full">
          <div>
            <span className="tile-label">Today's sales</span>
            <strong className="figure-xl">{data ? peso(data.today.sales) : '—'}</strong>
            <span className="tile-note">
              {data == null ? 'Loading…'
                : data.vsYesterday == null ? 'No sales recorded yesterday'
                : `${data.vsYesterday >= 0 ? '+' : '−'}${peso(Math.abs(data.vsYesterday))} vs yesterday`}
            </span>
          </div>
          <div className="tile-field" aria-hidden="true" />
        </div>
        <Stat label="Receipts today" value={data?.today.receipts} />
        {can('employee-report') && <Stat label="Active employees" value={data?.activeEmployees} />}
        {can('payroll-report') && <Stat label="Payroll this month" value={data && peso(data.payrollThisMonth)} />}
      </div>

      <div className="dash-row">
        <div className="panel">
          <div className="panel-head">
            <h2>This week's sales</h2>
            {data && <span className="muted">{peso(data.weekTotal)}</span>}
          </div>
          {data && data.weekTotal === 0 ? (
            <Empty text="No sales yet this week." />
          ) : (
            <div className="week" role="img" aria-label="Sales for the last seven days">
              {(data?.week ?? Array.from({ length: 7 }, () => null)).map((d, i) => (
                <div key={d?.date ?? i} className={`day${i === 6 ? ' today' : ''}`}>
                  <span className="day-amount">{d ? wholePeso(d.total) : ''}</span>
                  <div className="day-bar">
                    {d && <i style={{ height: `${(d.total / max) * 100}%`, '--i': i }} />}
                  </div>
                  <span className="day-name">{d ? (i === 6 ? 'Today' : dayName(d.date)) : ''}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="panel">
          <div className="panel-head">
            <h2>Latest receipts</h2>
            {can('sales-report') && <Link to="/reports/sales" className="link">Sales Report</Link>}
          </div>
          {data && data.latest.length === 0 ? (
            <Empty text="No receipts yet." />
          ) : (
            <table className="compact">
              <thead>
                <tr><th>Receipt</th><th>Time</th><th>Cashier</th><th className="num">Total</th></tr>
              </thead>
              <tbody>
                {(data?.latest ?? []).map((s) => (
                  <tr key={s.receipt_no}>
                    <td className="code">{s.receipt_no}</td>
                    <td>{timeOf(s.created_at)}</td>
                    <td>{s.cashier}</td>
                    <td className="num">{peso(s.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="tile">
      <span className="tile-label">{label}</span>
      <strong className="figure-l">{value ?? '—'}</strong>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="empty">
      <p>{text}</p>
      <Link to="/pos" className="link">Ring up a sale in POS</Link>
    </div>
  );
}
