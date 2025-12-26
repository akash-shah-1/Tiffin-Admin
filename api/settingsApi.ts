
import { MOCK_SETTINGS } from '../data/mockData';

export const settingsApi = {
  getSettings: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: MOCK_SETTINGS }), 500);
    });
  },
  updateSettings: async (settings: any) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, data: settings }), 1000);
    });
  }
};
