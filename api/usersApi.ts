
import { MOCK_USERS } from '../data/mockData';
import { User } from '../types';

const STORAGE_KEY = 'tiffin_users_data';

const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_USERS));
    return MOCK_USERS as User[];
  }
  return JSON.parse(stored);
};

export const usersApi = {
  getUsers: async (type: string = 'All'): Promise<{ data: User[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStoredUsers();
        const filtered = users.filter(u => u.type === type || type === 'All');
        resolve({ data: filtered });
      }, 700);
    });
  },
  getUserById: async (id: string): Promise<{ data: User | undefined }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = getStoredUsers().find(u => u.id === id);
        resolve({ data: user });
      }, 500);
    });
  },
  toggleUserStatus: async (id: string, status: User['status']): Promise<{ success: true }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStoredUsers();
        const updated = users.map(u => u.id === id ? { ...u, status } : u);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve({ success: true });
      }, 500);
    });
  },
  saveUser: async (userData: Partial<User>): Promise<{ success: true, data: User }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStoredUsers();
        let finalUser: User;
        
        if (userData.id) {
          // Update existing
          finalUser = users.map(u => u.id === userData.id ? { ...u, ...userData } : u).find(u => u.id === userData.id) as User;
          const updatedUsers = users.map(u => u.id === userData.id ? finalUser : u);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
        } else {
          // Create new
          finalUser = {
            ...userData,
            id: `C-${Math.floor(1000 + Math.random() * 9000)}`,
            type: userData.type || 'Customer',
            status: userData.status || 'Active',
            ordersCount: 0,
            totalSpent: 0,
            balance: userData.balance || 0,
            joinedAt: new Date().toISOString().split('T')[0],
            lastActive: 'Just now',
            avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'User')}&background=16a34a&color=fff`,
            addresses: userData.addresses || [],
          } as User;
          users.push(finalUser);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
        }
        resolve({ success: true, data: finalUser });
      }, 800);
    });
  }
};
