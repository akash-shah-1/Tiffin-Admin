
import { MenuItemApproval } from '../types';

const STORAGE_KEY = 'tiffin_menu_approvals_v2';

const MOCK_MENU_APPROVALS: MenuItemApproval[] = [
  {
    id: 'ITEM-101',
    itemName: 'Authentic Sarson ka Saag',
    kitchenId: 'K-001',
    kitchenName: "Mom's Kitchen",
    category: 'Lunch',
    price: 180,
    tags: ['Veg', 'Jain'],
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1601050638911-c323960ff861?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800'
    ],
    submittedAt: '2024-05-25 10:15 AM',
    status: 'Pending',
    description: 'Traditional Punjabi saag prepared with mustard leaves and hand-churned butter. Slow cooked for 4 hours to achieve the perfect consistency.',
    cuisine: 'North Indian',
    prepTime: '25 mins',
    spiceLevel: 'Medium',
    allergens: ['Dairy'],
    ingredients: ['Mustard Leaves', 'Spinach', 'Corn Meal', 'Ghee', 'Ginger', 'Green Chilies', 'Hand-churned Butter'],
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    qualityCheck: {
      imageQuality: true,
      descriptionComplete: true,
      priceReasonable: true,
      detailsFilled: true
    }
  },
  {
    id: 'ITEM-102',
    itemName: 'Oats Idli Platter',
    kitchenId: 'K-002',
    kitchenName: "Tiffin Kings",
    category: 'Breakfast',
    price: 120,
    tags: ['Veg', 'Vegan', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1626074284572-975990264024?auto=format&fit=crop&q=80&w=800'
    ],
    submittedAt: '2024-05-25 09:30 AM',
    status: 'Pending',
    description: 'Healthy oats idli served with coconut chutney and tomato sambar. High protein and fiber content, perfect for a light start.',
    cuisine: 'South Indian',
    prepTime: '15 mins',
    spiceLevel: 'Mild',
    allergens: [],
    ingredients: ['Oats', 'Semolina', 'Curd', 'Carrots', 'Curry Leaves', 'Mustard Seeds'],
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    qualityCheck: {
      imageQuality: true,
      descriptionComplete: false,
      priceReasonable: true,
      detailsFilled: true
    }
  },
  {
    id: 'ITEM-103',
    itemName: 'Butter Chicken Thali',
    kitchenId: 'K-003',
    kitchenName: "Spice Route",
    category: 'Dinner',
    price: 240,
    tags: ['Non-Veg'],
    image: 'https://images.unsplash.com/photo-1603894584115-f73f2ec851ad?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1603894584115-f73f2ec851ad?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800'
    ],
    submittedAt: '2024-05-24 08:45 PM',
    status: 'Pending',
    description: 'Creamy butter chicken served with 2 lachha parathas, jeera rice, and cucumber raita.',
    cuisine: 'North Indian',
    prepTime: '30 mins',
    spiceLevel: 'Spicy',
    allergens: ['Dairy', 'Nuts'],
    ingredients: ['Chicken', 'Tomato Gravy', 'Cream', 'Cashews', 'Butter', 'Whole Spices'],
    availability: ['Fri', 'Sat', 'Sun'],
    stock: 20,
    qualityCheck: {
      imageQuality: true,
      descriptionComplete: true,
      priceReasonable: true,
      detailsFilled: true
    }
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
  getApprovalById: async (id: string): Promise<{ data: MenuItemApproval | undefined }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = getStoredApprovals().find(i => i.id === id);
        resolve({ data: item });
      }, 500);
    });
  },
  updateStatus: async (id: string, status: MenuItemApproval['status'], feedback?: any): Promise<{ success: true }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = getStoredApprovals();
        const updated = items.map(item => item.id === id ? { ...item, status, feedback } : item);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve({ success: true });
      }, 500);
    });
  },
  saveAdminNotes: async (id: string, adminNotes: string): Promise<{ success: true }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = getStoredApprovals();
        const updated = items.map(item => item.id === id ? { ...item, adminNotes } : item);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve({ success: true });
      }, 300);
    });
  }
};
