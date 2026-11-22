import { Router } from 'express';
import { db } from '../supabase.js';
import { requireAuth, requirePage } from '../auth.js';
import { fail } from './util.js';

const router = Router();
router.use(requireAuth);

const num = (v) => Number(v) || 0;

// Gross = daily rate x days + OT hours x (daily rate / 8) x 1.25. Net = gross - deductions.
// Recomputed here so the saved numbers never depend on the browser.
export function computePay({ daily_rate, days_worked, overtime_hours, sss, philhealth, pagibig, tax }) {
  const rate = num(daily_rate);
  const gross = rate * num(days_worked) + num(overtime_hours) * (rate / 8) * 1.25;
  const deductions = num(sss) + num(philhealth) + num(pagibig) + num(tax);
  const round = (n) => Math.round(n * 100) / 100;
  return { gross_pay: round(gross), total_deductions: round(deductions), net_pay: round(gross - deductions) };
}

router.post('/', requirePage('payroll'), async (req, res) => {
  const b = req.body ?? {};
  if (!b.employee_id || !b.period_start || !b.period_end) return fail(res, 'Employee and pay period are required');

  const { data: emp, error: empErr } = await db.from('employees').select('daily_rate').eq('id', b.employee_id).single();
  if (empErr) return fail(res, 'Employee not found');

  const row = {
    employee_id: b.employee_id,
    period_start: b.period_start,
    period_end: b.period_end,
    days_worked: num(b.days_worked),
    overtime_hours: num(b.overtime_hours),
    daily_rate: num(emp.daily_rate),
    sss: num(b.sss),
    philhealth: num(b.philhealth),
    pagibig: num(b.pagibig),
    tax: num(b.tax),
  };
  Object.assign(row, computePay(row));

  const { error } = await db.from('payroll').insert(row);
  if (error) return fail(res, error);
  res.json({ ok: true, ...computePay(row) });
});

// Payroll Report: search by employee name, optional period dates.
router.get('/', requirePage('payroll-report'), async (req, res) => {
  let query = db
    .from('payroll')
    .select('*, employees!inner(first_name, last_name, employee_code)')
    .order('period_start', { ascending: false });
  const q = String(req.query.q ?? '').replace(/[,()*%\\]/g, ' ').trim();
  if (q) query = query.or(`first_name.ilike.%${q}%,last_name.ilike.%${q}%,employee_code.ilike.%${q}%`, { referencedTable: 'employees' });
  if (req.query.from) query = query.gte('period_start', req.query.from);
  if (req.query.to) query = query.lte('period_end', req.query.to);
  const { data, error } = await query;
  if (error) return fail(res, error);
  res.json(data);
});

export default router;
