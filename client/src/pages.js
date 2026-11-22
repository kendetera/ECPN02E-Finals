// Sidebar entries. `key` must match a page key in server/roles.js.
export const PAGES = [
  { key: 'dashboard', path: '/', label: 'Dashboard' },
  { key: 'employee-registration', path: '/employees/register', label: 'Employee Registration', group: 'Forms' },
  { key: 'payroll', path: '/payroll', label: 'Payroll', group: 'Forms' },
  { key: 'pos', path: '/pos', label: 'POS', group: 'Forms' },
  { key: 'employee-report', path: '/reports/employees', label: 'Employee Report', group: 'Reports' },
  { key: 'payroll-report', path: '/reports/payroll', label: 'Payroll Report', group: 'Reports' },
  { key: 'sales-report', path: '/reports/sales', label: 'Sales Report', group: 'Reports' },
  { key: 'user-report', path: '/reports/users', label: 'User Account Report', group: 'Reports' },
  { key: 'user-account', path: '/users', label: 'User Account', group: 'Admin' },
];
