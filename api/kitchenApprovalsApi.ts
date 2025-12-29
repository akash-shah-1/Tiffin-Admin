
import { KitchenApprovalRequest } from '../types';

const STORAGE_KEY = 'tiffin_kitchen_approvals';

const MOCK_REQUESTS: KitchenApprovalRequest[] = [
  {
    id: 'REQ-5501',
    kitchenName: 'Desi Tadka Junction',
    ownerName: 'Amit Saxena',
    phone: '+91 98888 11111',
    email: 'amit@desi-tadka.com',
    fssaiNumber: '23321005000789',
    fssaiDoc: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=400',
    address: 'Plot 42, Sector 18, Gurgaon',
    identityDoc: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=400',
    kitchenPhotos: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
      'https://images.unsplash.com/photo-1556910111-a035252ff990?w=800'
    ],
    submittedAt: '2024-05-25 11:30 AM',
    status: 'Pending'
  },
  {
    id: 'REQ-5502',
    kitchenName: 'Healthy Bites Catering',
    ownerName: 'Priya Mehra',
    phone: '+91 91111 22222',
    email: 'priya@hbites.in',
    fssaiNumber: '10014011001923',
    fssaiDoc: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=400',
    address: 'Flat 102, Green Apartments, Noida',
    identityDoc: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=400',
    kitchenPhotos: [
      'https://images.unsplash.com/photo-1556910602-3884ee022588?w=800'
    ],
    submittedAt: '2024-05-24 04:15 PM',
    status: 'Pending'
  }
];

const getStored = (): KitchenApprovalRequest[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_REQUESTS));
    return MOCK_REQUESTS;
  }
  return JSON.parse(stored);
};

export const kitchenApprovalsApi = {
  getRequests: async (): Promise<{ data: KitchenApprovalRequest[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: getStored() }), 800);
    });
  },
  getRequestById: async (id: string): Promise<{ data: KitchenApprovalRequest | undefined }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = getStored().find(r => r.id === id);
        resolve({ data: item });
      }, 500);
    });
  },
  updateStatus: async (id: string, status: KitchenApprovalRequest['status'], feedback?: any): Promise<{ success: true }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = getStored();
        const updated = items.map(item => item.id === id ? { ...item, status, feedback } : item);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve({ success: true });
      }, 600);
    });
  }
};
