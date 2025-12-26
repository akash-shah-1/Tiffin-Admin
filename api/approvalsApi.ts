
import { MOCK_PLANS } from '../data/mockData';

const STORAGE_KEY = 'tiffin_approvals_data';

const getStoredPlans = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PLANS));
    return MOCK_PLANS;
  }
  return JSON.parse(stored);
};

export const approvalsApi = {
  getPlans: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: getStoredPlans() });
      }, 600);
    });
  },
  updatePlanStatus: async (id: string, status: 'Approved' | 'Rejected') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const plans = getStoredPlans();
        const updatedPlans = plans.map((p: any) => 
          p.id === id ? { ...p, status } : p
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlans));
        resolve({ success: true, id, status });
      }, 500);
    });
  }
};
