import { Router } from 'express';
import { db } from '../supabase.js';
import { requireAuth, requirePage } from '../auth.js';
import { canAccess } from '../roles.js';
import { searchFilter, fail } from './util.js';

const router = Router();
router.use(requireAuth);

// Fields accepted from the registration form. Add new fields here and in db/schema.sql.
const FIELDS = [
  'first_name', 'last_name', 'birthdate', 'gender', 'address', 'contact_number',
  'email', 'position', 'department', 'date_hired', 'daily_rate', 'status',
];

router.post('/', requirePage('employee-registration'), async (req, res) => {
  const row = Object.fromEntries(FIELDS.map((f) => [f, req.body?.[f] === '' ? null : req.body?.[f]]));
  if (!row.first_name || !row.last_name) return fail(res, 'First and last name are required');
  const { data, error } = await db.from('employees').insert(row).select('id').single();
  if (error) return fail(res, error);
  res.json({ ok: true, id: data.id });
});

// Employee Report (also used to fill the employee picker on Payroll / User Account).
const canListEmployees = (req, res, next) =>
  ['employee-report', 'payroll', 'user-account'].some((p) => canAccess(req.user.role, p))
    ? next()
    : res.status(403).json({ error: 'Not allowed' });

router.get('/', canListEmployees, async (req, res) => {
  let query = db.from('employees').select('*').order('last_name');
  const filter = searchFilter(req.query.q, ['first_name', 'last_name', 'department', 'position', 'employee_code']);
  if (filter) query = query.or(filter);
  const { data, error } = await query;
  if (error) return fail(res, error);
  res.json(data);
});

export default router;
