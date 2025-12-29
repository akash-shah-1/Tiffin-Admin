
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CustomerManagement from './pages/CustomerManagement';
import CustomerDetails from './pages/CustomerDetails';
import CustomerForm from './pages/CustomerForm';
import KitchenManagement from './pages/KitchenManagement';
import KitchenDetails from './pages/KitchenDetails';
import KitchenForm from './pages/KitchenForm';
import SystemSettings from './pages/SystemSettings';
import PaymentsDashboard from './pages/PaymentsDashboard';
import SettlementDetails from './pages/SettlementDetails';
import ComplaintsCenter from './pages/ComplaintsCenter';
import ComplaintDetail from './pages/ComplaintDetail';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import KitchenApprovals from './pages/KitchenApprovals';
import KitchenApprovalDetail from './pages/KitchenApprovalDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/customers/add" element={<CustomerForm />} />
          <Route path="/customer/edit/:id" element={<CustomerForm />} />
          <Route path="/customer/:id" element={<CustomerDetails />} />
          <Route path="/kitchens" element={<KitchenManagement />} />
          <Route path="/kitchen/:id" element={<KitchenDetails />} />
          <Route path="/kitchen/edit/:id" element={<KitchenForm />} />
          {/* Note: Kitchen onboarding route removed, handled via external app */}
          <Route path="/payments" element={<PaymentsDashboard />} />
          <Route path="/settlement/:id" element={<SettlementDetails />} />
          <Route path="/complaints" element={<ComplaintsCenter />} />
          <Route path="/complaint/:id" element={<ComplaintDetail />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/approvals" element={<KitchenApprovals />} />
          <Route path="/approvals/:id" element={<KitchenApprovalDetail />} />
          <Route path="/settings" element={<SystemSettings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
