
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CustomerManagement from './pages/CustomerManagement';
import CustomerDetails from './pages/CustomerDetails';
import CustomerForm from './pages/CustomerForm';
import PlanApprovals from './pages/PlanApprovals';
import PlanReview from './pages/PlanReview';
import OrderMonitor from './pages/OrderMonitor';
import OrderDetail from './pages/OrderDetail';
import DisputeCenter from './pages/DisputeCenter';
import DisputeDetail from './pages/DisputeDetail';
import KitchenManagement from './pages/KitchenManagement';
import KitchenDetails from './pages/KitchenDetails';
import KitchenForm from './pages/KitchenForm';
import SystemSettings from './pages/SystemSettings';

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
          <Route path="/kitchens/add" element={<KitchenForm />} />
          <Route path="/approvals" element={<PlanApprovals />} />
          <Route path="/review/:id" element={<PlanReview />} />
          <Route path="/monitor" element={<OrderMonitor />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          <Route path="/disputes" element={<DisputeCenter />} />
          <Route path="/dispute/:id" element={<DisputeDetail />} />
          <Route path="/settings" element={<SystemSettings />} />
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
