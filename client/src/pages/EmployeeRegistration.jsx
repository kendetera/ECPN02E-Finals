import { useState } from 'react';
import { api } from '../api.js';
import Field from '../components/Field.jsx';
import Modal from '../components/Modal.jsx';
import PageHead from '../components/PageHead.jsx';

const EMPTY = { status: 'Active' };

export default function EmployeeRegistration() {
  const [form, setForm] = useState(EMPTY);
  const [popup, setPopup] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const f = { form, setForm };

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api('/employees', { method: 'POST', body: form });
      setForm(EMPTY); // clear the form after saving
      setPopup('Employee saved successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const cancel = () => {
    setForm(EMPTY);
    setError('');
  };

  return (
    <section>
      <PageHead title="Employee Registration">Add a new employee. Save stores the record; Cancel clears the form.</PageHead>
      <form className="card form-grid patterned" onSubmit={save}>
        <Field label="First name" name="first_name" required {...f} />
        <Field label="Last name" name="last_name" required {...f} />
        <Field label="Birthdate" name="birthdate" type="date" {...f} />
        <Field label="Gender" name="gender" options={['Male', 'Female', 'Other']} {...f} />
        <Field label="Address" name="address" {...f} />
        <Field label="Contact number" name="contact_number" type="tel" {...f} />
        <Field label="Email" name="email" type="email" {...f} />
        <Field label="Position" name="position" {...f} />
        <Field label="Department" name="department" {...f} />
        <Field label="Date hired" name="date_hired" type="date" {...f} />
        <Field label="Daily rate (₱)" name="daily_rate" type="number" min="0" step="0.01" {...f} />
        <Field label="Status" name="status" options={['Active', 'Inactive']} {...f} />
        {error && <p className="error span-all">{error}</p>}
        <div className="actions span-all">
          <button type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
          <button type="button" className="secondary" onClick={cancel}>Cancel</button>
        </div>
      </form>
      <Modal message={popup} onClose={() => setPopup('')} />
    </section>
  );
}
