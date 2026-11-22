import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../supabase.js';
import { requireAuth, requirePage } from '../auth.js';
import { ROLE_NAMES } from '../roles.js';
import { searchFilter, fail } from './util.js';

const router = Router();
router.use(requireAuth);

const PUBLIC_COLS = 'id, username, role, employee_id, created_at';

router.get('/roles', (_req, res) => res.json(ROLE_NAMES));

// User Account Report: search by username or role.
router.get('/', requirePage('user-report'), async (req, res) => {
  let query = db.from('users').select(PUBLIC_COLS).order('username');
  const filter = searchFilter(req.query.q, ['username', 'role']);
  if (filter) query = query.or(filter);
  const { data, error } = await query;
  if (error) return fail(res, error);
  res.json(data);
});

// User Account page: Find by exact username.
router.get('/find/:username', requirePage('user-account'), async (req, res) => {
  const { data, error } = await db.from('users').select(PUBLIC_COLS).eq('username', req.params.username).maybeSingle();
  if (error) return fail(res, error);
  if (!data) return res.status(404).json({ error: 'No account with that username' });
  res.json(data);
});

// Save: create if new, update if the username exists. Password optional on update.
router.post('/', requirePage('user-account'), async (req, res) => {
  const { username, password, role, employee_id } = req.body ?? {};
  if (!username) return fail(res, 'Username is required');
  if (!ROLE_NAMES.includes(role)) return fail(res, 'Pick a valid role');

  const { data: existing } = await db.from('users').select('id').eq('username', username).maybeSingle();
  if (!existing && !password) return fail(res, 'Password is required for a new account');

  const row = { username, role, employee_id: employee_id || null };
  if (password) row.password_hash = await bcrypt.hash(password, 10);

  const { error } = existing
    ? await db.from('users').update(row).eq('id', existing.id)
    : await db.from('users').insert(row);
  if (error) return fail(res, error);
  res.json({ ok: true, created: !existing });
});

router.delete('/:username', requirePage('user-account'), async (req, res) => {
  if (req.params.username === req.user.username) return fail(res, 'You cannot delete your own account');
  const { data, error } = await db.from('users').delete().eq('username', req.params.username).select('id');
  if (error) return fail(res, error);
  if (!data.length) return res.status(404).json({ error: 'No account with that username' });
  res.json({ ok: true });
});

export default router;
