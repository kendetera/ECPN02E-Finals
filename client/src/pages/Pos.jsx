import { useState } from 'react';
import { api, peso } from '../api.js';
import Modal from '../components/Modal.jsx';

// PLACEHOLDER POS. It works end to end (cart -> checkout -> saved sale shown in the
// Sales Report), but will be replaced by the 5 prelim POS pages once they are found.
const SAMPLE_PRODUCTS = [
  { name: 'Rice 5kg', price: 280 },
  { name: 'Eggs (dozen)', price: 110 },
  { name: 'Cooking oil 1L', price: 95 },
  { name: 'Instant noodles', price: 15 },
  { name: 'Bottled water', price: 20 },
  { name: 'Bread loaf', price: 65 },
];

export default function Pos() {
  const [cart, setCart] = useState([]);
  const [cash, setCash] = useState('');
  const [popup, setPopup] = useState('');
  const [error, setError] = useState('');

  const add = (p) =>
    setCart((c) => {
      const found = c.find((i) => i.name === p.name);
      return found ? c.map((i) => (i === found ? { ...i, quantity: i.quantity + 1 } : i)) : [...c, { ...p, quantity: 1 }];
    });
  const remove = (name) => setCart((c) => c.filter((i) => i.name !== name));
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const change = Number(cash) - total;

  const checkout = async () => {
    setError('');
    try {
      const res = await api('/sales', { method: 'POST', body: { items: cart, cash: Number(cash) } });
      setCart([]);
      setCash('');
      setPopup(`Sale saved. Receipt ${res.receipt_no}. Change: ${peso(change)}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      <h1>POS</h1>
      <p className="muted">Placeholder register: to be replaced with the prelim POS pages.</p>
      <div className="pos">
        <div className="products">
          {SAMPLE_PRODUCTS.map((p) => (
            <button key={p.name} className="product" onClick={() => add(p)}>
              {p.name}
              <strong>{peso(p.price)}</strong>
            </button>
          ))}
        </div>
        <div className="card cart">
          <h2>Cart</h2>
          {cart.length === 0 && <p className="muted">No items yet.</p>}
          {cart.map((i) => (
            <div key={i.name} className="cart-line">
              <span>{i.quantity} × {i.name}</span>
              <span>{peso(i.price * i.quantity)}</span>
              <button className="link" onClick={() => remove(i.name)} aria-label={`Remove ${i.name}`}>✕</button>
            </div>
          ))}
          <div className="cart-total"><span>Total</span><strong>{peso(total)}</strong></div>
          <label className="field">
            <span>Cash received</span>
            <input type="number" min="0" step="0.01" value={cash} onChange={(e) => setCash(e.target.value)} />
          </label>
          {cash !== '' && <div className="cart-total"><span>Change</span><strong>{peso(change)}</strong></div>}
          {error && <p className="error">{error}</p>}
          <div className="actions">
            <button onClick={checkout} disabled={!cart.length || change < 0}>Checkout</button>
            <button className="secondary" onClick={() => { setCart([]); setCash(''); }}>Cancel</button>
          </div>
        </div>
      </div>
      <Modal message={popup} onClose={() => setPopup('')} />
    </section>
  );
}
