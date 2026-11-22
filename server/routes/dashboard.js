import { Router } from 'express';
import { db } from '../supabase.js';
import { requireAuth } from '../auth.js';
import { canAccess } from '../roles.js';
import { fail } from './util.js';

const router = Router();
router.use(requireAuth);

// The store runs on Philippine time (UTC+8, no daylight saving).
const PH_OFFSET_MS = 8 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const phDayKey = (date) => new Date(new Date(date).getTime() + PH_OFFSET_MS).toISOString().slice(0, 10);
const round2 = (n) => Math.round(n * 100) / 100;

// GET /api/dashboard: today's figures, last 7 days of sales, latest receipts,
// plus staff and payroll figures for roles that can see them.
router.get('/', async (req, res) => {
  const now = Date.now();
  const todayKey = phDayKey(now);
  // Midnight Philippine time, six days ago, as a UTC instant.
  const startOfToday = Date.parse(`${todayKey}T00:00:00Z`) - PH_OFFSET_MS;
  const weekStart = new Date(startOfToday - 6 * DAY_MS).toISOString();

  const { data: sales, error } = await db
    .from('sales')
    .select('receipt_no, total, cashier, created_at')
    .gte('created_at', weekStart)
    .order('created_at', { ascending: false });
  if (error) return fail(res, error);

  const week = Array.from({ length: 7 }, (_, i) => {
    const key = phDayKey(startOfToday - (6 - i) * DAY_MS);
    return { date: key, total: 0, count: 0 };
  });
  const byKey = Object.fromEntries(week.map((d) => [d.date, d]));
  for (const s of sales) {
    const d = byKey[phDayKey(s.created_at)];
    if (d) {
      d.total += Number(s.total);
      d.count += 1;
    }
  }
  week.forEach((d) => (d.total = round2(d.total)));
  const today = week[6];

  const result = {
    today: { date: todayKey, sales: today.total, receipts: today.count },
    week,
    weekTotal: round2(week.reduce((s, d) => s + d.total, 0)),
    vsYesterday: week[5].count > 0 ? round2(today.total - week[5].total) : null,
    latest: sales.slice(0, 6),
  };

  if (canAccess(req.user.role, 'employee-report')) {
    const { count } = await db.from('employees').select('id', { count: 'exact', head: true }).eq('status', 'Active');
    result.activeEmployees = count ?? 0;
  }
  if (canAccess(req.user.role, 'payroll-report')) {
    const monthStart = `${todayKey.slice(0, 7)}-01`;
    const { data: pay } = await db.from('payroll').select('net_pay').gte('period_start', monthStart);
    result.payrollThisMonth = round2((pay ?? []).reduce((s, p) => s + Number(p.net_pay), 0));
  }

  res.json(result);
});

export default router;
