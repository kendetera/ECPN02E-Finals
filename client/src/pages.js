import {
  LayoutGrid, UserPlus, Wallet, ShoppingCart, Users, ReceiptText, ChartColumn, IdCard, UserCog,
} from 'lucide-react';

// Sidebar entries. `key` must match a page key in server/roles.js.
export const PAGES = [
  { key: 'dashboard', path: '/', label: 'Dashboard', icon: LayoutGrid },
  { key: 'employee-registration', path: '/employees/register', label: 'Employee Registration', group: 'Forms', icon: UserPlus },
  { key: 'payroll', path: '/payroll', label: 'Payroll', group: 'Forms', icon: Wallet },
  { key: 'pos', path: '/pos', label: 'POS', group: 'Forms', icon: ShoppingCart },
  { key: 'employee-report', path: '/reports/employees', label: 'Employee Report', group: 'Reports', icon: Users },
  { key: 'payroll-report', path: '/reports/payroll', label: 'Payroll Report', group: 'Reports', icon: ReceiptText },
  { key: 'sales-report', path: '/reports/sales', label: 'Sales Report', group: 'Reports', icon: ChartColumn },
  { key: 'user-report', path: '/reports/users', label: 'User Account Report', group: 'Reports', icon: IdCard },
  { key: 'user-account', path: '/users', label: 'User Account', group: 'Admin', icon: UserCog },
];
