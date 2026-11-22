import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth.jsx';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EmployeeRegistration from './pages/EmployeeRegistration.jsx';
import Payroll from './pages/Payroll.jsx';
import Pos from './pages/Pos.jsx';
import UserAccount from './pages/UserAccount.jsx';
import { EmployeeReport, PayrollReport, SalesReport, UserReport } from './pages/Reports.jsx';

// Renders the page only if the logged-in role may open it.
function Guard({ page, children }) {
  const { can } = useAuth();
  return can(page) ? children : <Navigate to="/" replace />;
}

export default function App() {
  const { user } = useAuth();
  if (user === undefined) return <div className="center">Loading…</div>;
  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="employees/register" element={<Guard page="employee-registration"><EmployeeRegistration /></Guard>} />
        <Route path="payroll" element={<Guard page="payroll"><Payroll /></Guard>} />
        <Route path="pos" element={<Guard page="pos"><Pos /></Guard>} />
        <Route path="reports/employees" element={<Guard page="employee-report"><EmployeeReport /></Guard>} />
        <Route path="reports/payroll" element={<Guard page="payroll-report"><PayrollReport /></Guard>} />
        <Route path="reports/sales" element={<Guard page="sales-report"><SalesReport /></Guard>} />
        <Route path="reports/users" element={<Guard page="user-report"><UserReport /></Guard>} />
        <Route path="users" element={<Guard page="user-account"><UserAccount /></Guard>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
