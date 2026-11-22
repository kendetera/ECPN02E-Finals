// Labeled input bound to a key of a form state object.
export default function Field({ label, name, form, setForm, type = 'text', options, required, ...rest }) {
  const value = form[name] ?? '';
  const onChange = (e) => setForm((f) => ({ ...f, [name]: e.target.value }));
  return (
    <label className="field">
      <span>{label}{required && ' *'}</span>
      {options ? (
        <select value={value} onChange={onChange} required={required}>
          <option value="">Select…</option>
          {options.map((o) => {
            const [val, text] = Array.isArray(o) ? o : [o, o];
            return <option key={val} value={val}>{text}</option>;
          })}
        </select>
      ) : (
        <input type={type} value={value} onChange={onChange} required={required} {...rest} />
      )}
    </label>
  );
}
