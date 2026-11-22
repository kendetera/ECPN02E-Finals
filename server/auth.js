import jwt from 'jsonwebtoken';
import { canAccess } from './roles.js';

const COOKIE = 'sw_session';
const secret = () => process.env.JWT_SECRET || 'dev-only-change-me';

export function setSession(res, user) {
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secret(), { expiresIn: '8h' });
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.COOKIE_SECURE === 'true',
    maxAge: 8 * 60 * 60 * 1000,
  });
}

export function clearSession(res) {
  res.clearCookie(COOKIE);
}

export function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE];
  if (!token) return res.status(401).json({ error: 'Not logged in' });
  try {
    req.user = jwt.verify(token, secret());
    next();
  } catch {
    res.status(401).json({ error: 'Session expired' });
  }
}

// Use after requireAuth: blocks users whose role cannot open the page.
export const requirePage = (page) => (req, res, next) =>
  canAccess(req.user.role, page) ? next() : res.status(403).json({ error: 'Not allowed' });
