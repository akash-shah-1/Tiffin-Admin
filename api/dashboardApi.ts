
import { DASHBOARD_METRICS, QUICK_STATS, REVENUE_CHART_DATA, VOLUME_CHART_DATA, RECENT_ACTIVITY } from '../data/mockData';

export const dashboardApi = {
  getStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ 
        data: {
          metrics: DASHBOARD_METRICS,
          quickStats: QUICK_STATS,
          revenueData: REVENUE_CHART_DATA,
          volumeData: VOLUME_CHART_DATA,
          activity: RECENT_ACTIVITY
        }
      }), 800);
    });
  }
};
