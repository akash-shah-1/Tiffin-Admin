import { graphqlClient } from './graphqlClient';
import { ReportStats } from '../types';

export const reportsApi = {
  getDailyReport: async (date: string): Promise<{ data: ReportStats }> => {
    const query = `
      query GetDailyReport($date: String!) {
        platformSummarySnapshot(range: "DAILY") {
          totalOrders
          totalGMV
          platformEarnings
          activeKitchensCount
        }
      }
    `;
    const data = await graphqlClient(query, { date });
    const s = data.platformSummarySnapshot;

    return {
      data: {
        totalOrders: s.totalOrders,
        totalRevenue: s.totalGMV,
        totalCommission: s.platformEarnings,
        avgOrderValue: s.totalOrders > 0 ? Math.round(s.totalGMV / s.totalOrders) : 0,
        breakdown: [] // Backend summary doesn't have breakdown yet
      }
    };
  },

  getMonthlyReport: async (month: string): Promise<{ data: ReportStats }> => {
    const query = `
      query GetMonthlyReport {
        platformSummarySnapshot(range: "MONTHLY") {
          totalOrders
          totalGMV
          platformEarnings
        }
      }
    `;
    const data = await graphqlClient(query);
    const s = data.platformSummarySnapshot;

    return {
      data: {
        totalOrders: s.totalOrders,
        totalRevenue: s.totalGMV,
        totalCommission: s.platformEarnings,
        avgOrderValue: s.totalOrders > 0 ? Math.round(s.totalGMV / s.totalOrders) : 0,
        topKitchens: [],
        chartData: []
      }
    };
  },

  getKitchenReport: async (kitchenId: string, range: string): Promise<{ data: ReportStats }> => {
    const query = `
      query GetKitchenReport($id: ID!) {
        kitchenPerformance(id: $id) {
          kitchenId
          kitchenName
          totalOrders
          totalRevenue
          averageRating
          cancellationRate
        }
      }
    `;
    const data = await graphqlClient(query, { id: kitchenId });
    const p = data.kitchenPerformance;

    return {
      data: {
        totalOrders: p.totalOrders,
        totalRevenue: p.totalRevenue,
        totalCommission: Math.round(p.totalRevenue * 0.15), // Assuming 15%
        avgOrderValue: p.totalOrders > 0 ? Math.round(p.totalRevenue / p.totalOrders) : 0,
        avgRating: p.averageRating,
        chartData: []
      }
    };
  }
};
