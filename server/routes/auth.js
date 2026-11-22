import { Router } from 'express';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { db } from '../supabase.js';
import { setSession, clearSession, requireAuth } from '../auth.js';
import { ROLES } from '../roles.js';

const router = Router();
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20 });

router.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) return res.status(400).json({ error: 'Enter username and password' });

  const { data: user } = await db
    .from('users')
    .select('id, username, password_hash, role')
    .eq('username', username)
    .maybeSingle();

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: 'Wrong username or password' });
  }
  setSession(res, user);
  res.json({ username: user.username, role: user.role, pages: ROLES[user.role] ?? [] });
});

router.post('/logout', (_req, res) => {
  clearSession(res);
  res.json({ ok: true });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ username: req.user.username, role: req.user.role, pages: ROLES[req.user.role] ?? [] });
});

export default router;
