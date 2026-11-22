import { useEffect, useMemo, useState } from 'react';
import { api, peso } from '../api.js';
import Field from '../components/Field.jsx';
import Modal from '../components/Modal.jsx';

const EMPTY = {};
const n = (v) => Number(v) || 0;

export default function Payroll() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [popup, setPopup] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const f = { form, setForm };

  useEffect(() => {
    api('/employees').then(setEmployees).catch((e) => setError(e.message));
  }, []);

  const emp = employees.find((e) => e.id === form.employee_id);
  // Same formula as server/routes/payroll.js (the server's result is what gets saved).
  const pay = useMemo(() => {
    const rate = n(emp?.daily_rate);
    const gross = rate * n(form.days_worked) + n(form.overtime_hours) * (rate / 8) * 1.25;
    const deductions = n(form.sss) + n(form.philhealth) + n(form.pagibig) + n(form.tax);
    return { rate, gross, deductions, net: gross - deductions };
  }, [emp, form]);

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api('/payroll', { method: 'POST', body: form });
      setForm(EMPTY);
      setPopup('Payroll saved successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section>
      <h1>Payroll</h1>
      <form className="card form-grid" onSubmit={save}>
        <Field
          label="Employee"
          name="employee_id"
          required
          options={employees.map((e) => [e.id, `${e.employee_code} · ${e.last_name}, ${e.first_name}`])}
          {...f}
        />
        <Field label="Period start" name="period_start" type="date" required {...f} />
        <Field label="Period end" name="period_end" type="date" required {...f} />
        <Field label="Days worked" name="days_worked" type="number" min="0" step="0.5" {...f} />
        <Field label="Overtime hours" name="overtime_hours" type="number" min="0" step="0.5" {...f} />
        <Field label="SSS (₱)" name="sss" type="number" min="0" step="0.01" {...f} />
        <Field label="PhilHealth (₱)" name="philhealth" type="number" min="0" step="0.01" {...f} />
        <Field label="Pag-IBIG (₱)" name="pagibig" type="number" min="0" step="0.01" {...f} />
        <Field label="Withholding tax (₱)" name="tax" type="number" min="0" step="0.01" {...f} />

        <div className="summary span-all">
          <div><span>Daily rate</span><strong>{peso(pay.rate)}</strong></div>
          <div><span>Gross pay</span><strong>{peso(pay.gross)}</strong></div>
          <div><span>Deductions</span><strong>{peso(pay.deductions)}</strong></div>
          <div><span>Net pay</span><strong>{peso(pay.net)}</strong></div>
        </div>

        {error && <p className="error span-all">{error}</p>}
        <div className="actions span-all">
          <button type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
          <button type="button" className="secondary" onClick={() => { setForm(EMPTY); setError(''); }}>Cancel</button>
        </div>
      </form>
      <Modal message={popup} onClose={() => setPopup('')} />
    </section>
  );
}
