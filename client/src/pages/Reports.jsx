import ReportPage from '../components/ReportPage.jsx';
import { peso } from '../api.js';

const date = (d) => (d ? new Date(d).toLocaleDateString('en-PH') : '');
const dateTime = (d) => (d ? new Date(d).toLocaleString('en-PH') : '');
const name = (e) => (e ? `${e.last_name}, ${e.first_name}` : '');

export const EmployeeReport = () => (
  <ReportPage
    title="Employee Report"
    endpoint="/employees"
    placeholder="Search name, ID, department or position"
    columns={[
      { label: 'ID', render: (r) => r.employee_code },
      { label: 'Name', render: name },
      { label: 'Position', render: (r) => r.position },
      { label: 'Department', render: (r) => r.department },
      { label: 'Contact', render: (r) => r.contact_number },
      { label: 'Date hired', render: (r) => date(r.date_hired) },
      { label: 'Daily rate', render: (r) => peso(r.daily_rate) },
      { label: 'Status', render: (r) => r.status },
    ]}
  />
);

export const PayrollReport = () => (
  <ReportPage
    title="Payroll Report"
    endpoint="/payroll"
    placeholder="Search employee name or ID"
    dateRange
    columns={[
      { label: 'Employee', render: (r) => `${r.employees.employee_code} · ${name(r.employees)}` },
      { label: 'Period', render: (r) => `${date(r.period_start)} – ${date(r.period_end)}` },
      { label: 'Days', render: (r) => r.days_worked },
      { label: 'OT hrs', render: (r) => r.overtime_hours },
      { label: 'Gross', render: (r) => peso(r.gross_pay) },
      { label: 'Deductions', render: (r) => peso(r.total_deductions) },
      { label: 'Net', render: (r) => peso(r.net_pay) },
    ]}
    footer={(rows) => <>Total net pay: <strong>{peso(rows.reduce((s, r) => s + Number(r.net_pay), 0))}</strong></>}
  />
);

export const SalesReport = () => (
  <ReportPage
    title="Sales Report"
    endpoint="/sales"
    placeholder="Search receipt no. or cashier"
    dateRange
    columns={[
      { label: 'Receipt', render: (r) => r.receipt_no },
      { label: 'Date', render: (r) => dateTime(r.created_at) },
      { label: 'Cashier', render: (r) => r.cashier },
      { label: 'Items', render: (r) => r.sale_items.map((i) => `${i.quantity}× ${i.name}`).join(', ') },
      { label: 'Total', render: (r) => peso(r.total) },
    ]}
    footer={(rows) => (
      <>{rows.length} sales · Total: <strong>{peso(rows.reduce((s, r) => s + Number(r.total), 0))}</strong></>
    )}
  />
);

export const UserReport = () => (
  <ReportPage
    title="User Account Report"
    endpoint="/users"
    placeholder="Search username or role"
    columns={[
      { label: 'Username', render: (r) => r.username },
      { label: 'Role', render: (r) => r.role },
      { label: 'Created', render: (r) => date(r.created_at) },
    ]}
  />
);
