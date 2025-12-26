
import { MOCK_SETTLEMENTS } from '../data/mockData';
import { Settlement } from '../types';

const STORAGE_KEY = 'tiffin_payments_data';

const getStoredSettlements = (): Settlement[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_SETTLEMENTS));
    return MOCK_SETTLEMENTS;
  }
  return JSON.parse(stored);
};

export const paymentsApi = {
  getSettlements: async (): Promise<{ data: Settlement[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: getStoredSettlements() });
      }, 700);
    });
  },
  getSettlementById: async (id: string): Promise<{ data: Settlement | undefined }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = getStoredSettlements().find(s => s.id === id);
        resolve({ data: item });
      }, 400);
    });
  },
  processSettlement: async (id: string): Promise<{ success: true }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = getStoredSettlements();
        const updated = data.map(s => {
          if (s.id === id) {
            return {
              ...s,
              status: 'Completed' as const,
              processedAt: new Date().toLocaleString(),
              transactionRef: `TXN-${Math.floor(Math.random() * 10000000)}`
            };
          }
          return s;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve({ success: true });
      }, 1000);
    });
  }
};
