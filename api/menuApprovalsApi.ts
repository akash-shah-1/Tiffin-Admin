
import { MenuItemApproval } from '../types';

const STORAGE_KEY = 'tiffin_menu_approvals';

const MOCK_MENU_APPROVALS: MenuItemApproval[] = [
  {
    id: 'ITEM-101',
    itemName: 'Authentic Sarson ka Saag',
    kitchenId: 'K-001',
    kitchenName: "Mom's Kitchen",
    category: 'Lunch',
    price: 180,
    tags: ['Veg'],
    image: 'https://picsum.photos/400/300?random=201',
    submittedAt: '2024-05-25 10:15 AM',
    status: 'Pending',
    description: 'Traditional Punjabi saag prepared with mustard leaves and hand-churned butter.'
  },
  {
    id: 'ITEM-102',
    itemName: 'Oats Idli Platter',
    kitchenId: 'K-002',
    kitchenName: "Tiffin Kings",
    category: 'Breakfast',
    price: 120,
    tags: ['Veg', 'Vegan'],
    image: 'https://picsum.photos/400/300?random=202',
    submittedAt: '2024-05-25 09:30 AM',
    status: 'Pending',
    description: 'Healthy oats idli served with coconut chutney and tomato sambar.'
  },
  {
    id: 'ITEM-103',
    itemName: 'Butter Chicken Thali',
    kitchenId: 'K-003',
    kitchenName: "Spice Route",
    category: 'Dinner',
    price: 240,
    tags: ['Non-Veg'],
    image: 'https://picsum.photos/400/300?random=203',
    submittedAt: '2024-05-24 08:45 PM',
    status: 'Pending',
    description: 'Creamy butter chicken served with 2 lachha parathas and jeera rice.'
  },
  {
    id: 'ITEM-104',
    itemName: 'Jain Paneer Lababdar',
    kitchenId: 'K-001',
    kitchenName: "Mom's Kitchen",
    category: 'Lunch',
    price: 210,
    tags: ['Veg', 'Jain'],
    image: 'https://picsum.photos/400/300?random=204',
    submittedAt: '2024-05-24 11:30 AM',
    status: 'Pending',
    description: 'No onion, no garlic paneer dish specially curated for Jain preferences.'
  }
];

const getStoredApprovals = (): MenuItemApproval[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_MENU_APPROVALS));
    return MOCK_MENU_APPROVALS;
  }
  return JSON.parse(stored);
};

export const menuApprovalsApi = {
  getApprovals: async (): Promise<{ data: MenuItemApproval[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: getStoredApprovals() }), 800);
    });
  },
  updateStatus: async (id: string, status: 'Approved' | 'Rejected'): Promise<{ success: true }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = getStoredApprovals();
        const updated = items.map(item => item.id === id ? { ...item, status } : item);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve({ success: true });
      }, 500);
    });
  }
};
