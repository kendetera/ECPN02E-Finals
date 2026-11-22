import { useEffect, useState } from 'react';
import { api } from '../api.js';
import Field from '../components/Field.jsx';
import Modal from '../components/Modal.jsx';

const EMPTY = {};

export default function UserAccount() {
  const [form, setForm] = useState(EMPTY);
  const [loaded, setLoaded] = useState(null); // username of the account loaded by Find
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [popup, setPopup] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState('');
  const f = { form, setForm };

  useEffect(() => {
    api('/users/roles').then(setRoles).catch(() => {});
    api('/employees').then(setEmployees).catch(() => {});
  }, []);

  const run = async (fn) => {
    setError('');
    try {
      await fn();
    } catch (err) {
      setError(err.message);
    }
  };

  const reset = () => {
    setForm(EMPTY);
    setLoaded(null);
    setError('');
  };

  const find = () =>
    run(async () => {
      if (!form.username) throw new Error('Type a username to find');
      const u = await api(`/users/find/${encodeURIComponent(form.username)}`);
      setForm({ username: u.username, role: u.role, employee_id: u.employee_id ?? '' });
      setLoaded(u.username);
    });

  const save = (e) => {
    e.preventDefault();
    run(async () => {
      const res = await api('/users', { method: 'POST', body: form });
      reset();
      setPopup(res.created ? 'Account created successfully.' : 'Account updated successfully.');
    });
  };

  const remove = () =>
    run(async () => {
      setConfirm(false);
      await api(`/users/${encodeURIComponent(loaded)}`, { method: 'DELETE' });
      reset();
      setPopup('Account deleted.');
    });

  return (
    <section>
      <h1>User Account</h1>
      <form className="card form-grid" onSubmit={save}>
        <div className="field-with-button span-all">
          <Field label="Username" name="username" required readOnly={!!loaded} {...f} />
          <button type="button" className="secondary" onClick={find} disabled={!!loaded}>Find</button>
        </div>
        <Field
          label={loaded ? 'New password (leave blank to keep)' : 'Password'}
          name="password"
          type="password"
          autoComplete="new-password"
          required={!loaded}
          {...f}
        />
        <Field label="Role" name="role" required options={roles} {...f} />
        <Field
          label="Linked employee (optional)"
          name="employee_id"
          options={employees.map((e) => [e.id, `${e.employee_code} · ${e.last_name}, ${e.first_name}`])}
          {...f}
        />
        {loaded && <p className="muted span-all">Editing existing account “{loaded}”.</p>}
        {error && <p className="error span-all">{error}</p>}
        <div className="actions span-all">
          <button type="submit">Save</button>
          <button type="button" className="secondary" onClick={reset}>Cancel</button>
          <button type="button" className="danger" disabled={!loaded} onClick={() => setConfirm(true)}>Delete</button>
        </div>
      </form>
      <Modal message={popup} onClose={() => setPopup('')} />
      <Modal
        message={confirm ? `Are you sure you want to delete “${loaded}”? This cannot be undone.` : ''}
        onClose={() => setConfirm(false)}
        onConfirm={remove}
      />
    </section>
  );
}
