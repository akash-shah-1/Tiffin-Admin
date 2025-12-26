
import { DASHBOARD_STATS, RECENT_ACTIVITY, MOCK_REVENUE_CHART } from '../data/mockData';

// Simulated API calls that return local mock data
export const dashboardApi = {
  getStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: DASHBOARD_STATS }), 800);
    });
  },
  getActivity: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: RECENT_ACTIVITY }), 1000);
    });
  },
  getRevenueData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: MOCK_REVENUE_CHART }), 600);
    });
  }
};
