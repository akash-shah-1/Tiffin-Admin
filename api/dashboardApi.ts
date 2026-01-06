import { graphqlClient } from './graphqlClient';

export const dashboardApi = {
  getStats: async () => {
    const query = `
      query GetDashboardStats {
        dashboardStats {
          todayOrders
          activeCustomers
          activeKitchens
          todayRevenue
          trends {
            orders { value isPositive label }
            customers { value isPositive label }
            kitchens { value isPositive label }
            revenue { value isPositive label }
          }
          pendingAcceptance
          complaintsToResolve
          pendingKitchens
          activity {
            id
            type
            message
            time
            status
          }
          revenueChartData
          monthlyRevenue { month revenue }
          orderStatusDistribution { name value }
          categoryDistribution { name value }
        }
      }
    `;

    const data = await graphqlClient(query);
    const stats = data.dashboardStats;

    // Map backend response to frontend expected structure
    return {
      data: {
        metrics: {
          todayOrders: stats.todayOrders,
          activeCustomers: stats.activeCustomers,
          activeKitchens: stats.activeKitchens,
          todayRevenue: stats.todayRevenue,
          trends: stats.trends
        },
        quickStats: {
          pendingAcceptance: stats.pendingAcceptance,
          complaintsToResolve: stats.complaintsToResolve,
          pendingKitchens: stats.pendingKitchens
        },
        revenueData: stats.revenueChartData.map((val: number, i: number) => {
          const d = new Date();
          d.setDate(d.getDate() - (6 - i));
          const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()];
          return {
            day: dayName,
            val: val
          };
        }),
        monthlyRevenue: stats.monthlyRevenue,
        orderStatusDistribution: stats.orderStatusDistribution,
        categoryDistribution: stats.categoryDistribution,
        activity: stats.activity
      }
    };
  }
};
