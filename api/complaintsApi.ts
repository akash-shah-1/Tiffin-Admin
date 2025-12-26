
import { MOCK_COMPLAINTS } from '../data/mockData';
import { Complaint, ComplaintMessage } from '../types';

const STORAGE_KEY = 'tiffin_complaints_data';

const getStoredComplaints = (): Complaint[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_COMPLAINTS));
    return MOCK_COMPLAINTS;
  }
  return JSON.parse(stored);
};

export const complaintsApi = {
  getComplaints: async (): Promise<{ data: Complaint[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: getStoredComplaints() }), 600);
    });
  },
  getComplaintById: async (id: string): Promise<{ data: Complaint | undefined }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = getStoredComplaints().find(c => c.id === id);
        resolve({ data: item });
      }, 400);
    });
  },
  updateComplaintStatus: async (id: string, status: Complaint['status']): Promise<{ success: true }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = getStoredComplaints();
        const updated = data.map(c => c.id === id ? { ...c, status } : c);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve({ success: true });
      }, 500);
    });
  },
  addMessage: async (complaintId: string, message: Omit<ComplaintMessage, 'id' | 'time'>): Promise<{ success: true, message: ComplaintMessage }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = getStoredComplaints();
        const newMessage: ComplaintMessage = {
          ...message,
          id: `msg-${Date.now()}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const updated = data.map(c => {
          if (c.id === complaintId) {
            return { ...c, messages: [...c.messages, newMessage] };
          }
          return c;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve({ success: true, message: newMessage });
      }, 600);
    });
  }
};
