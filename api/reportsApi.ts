
import { ReportStats } from '../types';

export const reportsApi = {
  getDailyReport: async (date: string): Promise<{ data: ReportStats }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            totalOrders: 42,
            totalRevenue: 12400,
            totalCommission: 1860,
            avgOrderValue: 295,
            breakdown: [
              { name: "Mom's Kitchen", orders: 20, revenue: 6000, commission: 900 },
              { name: "Tiffin Kings", orders: 12, revenue: 3400, commission: 510 },
              { name: "Spice Route", orders: 10, revenue: 3000, commission: 450 }
            ]
          }
        });
      }, 800);
    });
  },
  getMonthlyReport: async (month: string): Promise<{ data: ReportStats }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            totalOrders: 1240,
            totalRevenue: 345000,
            totalCommission: 51750,
            avgOrderValue: 278,
            topKitchens: [
              { name: "Mom's Kitchen", orders: 450, revenue: 125000 },
              { name: "Spice Route", orders: 380, revenue: 105000 },
              { name: "Tiffin Kings", orders: 410, revenue: 115000 }
            ],
            chartData: [
              { label: 'Week 1', value: 85000 },
              { label: 'Week 2', value: 92000 },
              { label: 'Week 3', value: 78000 },
              { label: 'Week 4', value: 90000 }
            ]
          }
        });
      }, 1000);
    });
  },
  getKitchenReport: async (kitchenId: string, range: string): Promise<{ data: ReportStats }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            totalOrders: 320,
            totalRevenue: 95000,
            totalCommission: 14250,
            avgOrderValue: 296,
            avgRating: 4.8,
            chartData: [
              { label: 'Mon', value: 12000 },
              { label: 'Tue', value: 15000 },
              { label: 'Wed', value: 11000 },
              { label: 'Thu', value: 18000 },
              { label: 'Fri', value: 20000 },
              { label: 'Sat', value: 25000 },
              { label: 'Sun', value: 14000 }
            ]
          }
        });
      }, 700);
    });
  }
};
