
import { MOCK_KITCHENS } from '../data/mockData';
import { Kitchen } from '../types';

const STORAGE_KEY = 'tiffin_kitchens_data';

const getStoredKitchens = (): Kitchen[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_KITCHENS));
    return MOCK_KITCHENS as Kitchen[];
  }
  return JSON.parse(stored);
};

export const kitchenApi = {
  getKitchens: async (): Promise<{ data: Kitchen[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: getStoredKitchens() });
      }, 700);
    });
  },
  getKitchenById: async (id: string): Promise<{ data: Kitchen | undefined }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const kitchen = getStoredKitchens().find(k => k.id === id);
        resolve({ data: kitchen });
      }, 500);
    });
  },
  updateKitchenStatus: async (id: string, status: Kitchen['status']): Promise<{ success: true }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const kitchens = getStoredKitchens();
        const updated = kitchens.map(k => k.id === id ? { ...k, status } : k);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve({ success: true });
      }, 500);
    });
  },
  saveKitchen: async (kitchen: Partial<Kitchen>): Promise<{ success: true, data: Kitchen }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const kitchens = getStoredKitchens();
        let finalKitchen: Kitchen;
        if (kitchen.id) {
          finalKitchen = kitchens.map(k => k.id === kitchen.id ? { ...k, ...kitchen } : k).find(k => k.id === kitchen.id) as Kitchen;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(kitchens.map(k => k.id === kitchen.id ? finalKitchen : k)));
        } else {
          finalKitchen = {
            ...kitchen,
            id: `K-${Math.floor(Math.random() * 1000)}`,
            totalOrders: 0,
            revenue: 0,
            rating: 0,
            joinedAt: new Date().toISOString().split('T')[0],
            status: 'Pending',
            logo: 'https://ui-avatars.com/api/?name=' + kitchen.name + '&background=16a34a&color=fff',
            photos: [],
            menuItems: []
          } as Kitchen;
          kitchens.push(finalKitchen);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(kitchens));
        }
        resolve({ success: true, data: finalKitchen });
      }, 1000);
    });
  }
};