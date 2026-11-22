// Which pages each role may open. To add a role, add one line here
// (and pick it in the User Account page). Page keys match client routes.
export const ROLES = {
  admin: [
    'dashboard',
    'employee-registration',
    'payroll',
    'pos',
    'employee-report',
    'payroll-report',
    'sales-report',
    'user-report',
    'user-account',
  ],
  cashier: ['dashboard', 'pos'],
};

export const ROLE_NAMES = Object.keys(ROLES);

export function canAccess(role, page) {
  return (ROLES[role] ?? []).includes(page);
}
