
import { MOCK_ORDERS } from '../data/orders';
import { Order } from '../types';

const STORAGE_KEY = 'tiffin_orders_data';

const getStoredOrders = (): Order[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ORDERS));
    return MOCK_ORDERS;
  }
  return JSON.parse(stored);
};

export const ordersApi = {
  getOrders: async (): Promise<{ data: Order[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: getStoredOrders() });
      }, 600);
    });
  },
  getOrderById: async (id: string): Promise<{ data: Order | undefined }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = getStoredOrders().find(o => o.id === id);
        resolve({ data: order });
      }, 400);
    });
  },
  updateOrderStatus: async (id: string, status: Order['status']): Promise<{ success: true }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = getStoredOrders();
        const updated = orders.map(o => {
          if (o.id === id) {
            const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const newTimeline = [...o.timeline, { status, time: now, completed: true }];
            return { ...o, status, timeline: newTimeline };
          }
          return o;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve({ success: true });
      }, 500);
    });
  },
  saveAdminNotes: async (id: string, notes: string): Promise<{ success: true }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = getStoredOrders();
        const updated = orders.map(o => o.id === id ? { ...o, adminNotes: notes } : o);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve({ success: true });
      }, 400);
    });
  }
};
