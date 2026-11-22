import { Router } from 'express';
import { db } from '../supabase.js';
import { requireAuth, requirePage } from '../auth.js';
import { fail } from './util.js';

const router = Router();
router.use(requireAuth);

// POS checkout. Placeholder shape until the prelim POS pages are ported:
// body = { items: [{ name, price, quantity }], cash }
router.post('/', requirePage('pos'), async (req, res) => {
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (!items.length) return fail(res, 'Cart is empty');

  const lines = items.map((i) => ({
    name: String(i.name ?? ''),
    price: Number(i.price) || 0,
    quantity: Math.max(1, Math.floor(Number(i.quantity) || 1)),
  }));
  const total = Math.round(lines.reduce((s, l) => s + l.price * l.quantity, 0) * 100) / 100;
  const cash = Number(req.body?.cash) || 0;
  if (cash < total) return fail(res, 'Cash is less than the total');

  const { data: sale, error } = await db
    .from('sales')
    .insert({ total, cash, change: Math.round((cash - total) * 100) / 100, cashier: req.user.username })
    .select('id, receipt_no')
    .single();
  if (error) return fail(res, error);

  const { error: itemErr } = await db.from('sale_items').insert(lines.map((l) => ({ ...l, sale_id: sale.id })));
  if (itemErr) return fail(res, itemErr);
  res.json({ ok: true, receipt_no: sale.receipt_no, total });
});

// Sales Report: search by receipt number or cashier, optional date range.
router.get('/', requirePage('sales-report'), async (req, res) => {
  let query = db.from('sales').select('*, sale_items(name, price, quantity)').order('created_at', { ascending: false });
  const q = String(req.query.q ?? '').replace(/[,()*%\\]/g, ' ').trim();
  if (q) query = query.or(`receipt_no.ilike.%${q}%,cashier.ilike.%${q}%`);
  if (req.query.from) query = query.gte('created_at', req.query.from);
  if (req.query.to) query = query.lte('created_at', `${req.query.to}T23:59:59`);
  const { data, error } = await query;
  if (error) return fail(res, error);
  res.json(data);
});

export default router;
