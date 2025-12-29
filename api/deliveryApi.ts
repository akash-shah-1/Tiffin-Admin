
import { DeliveryPartner } from '../types';

const STORAGE_KEY = 'tiffin_delivery_partners';

const MOCK_PARTNERS: DeliveryPartner[] = [
  {
    id: 'DP-7721',
    name: 'Amit Kumar',
    phone: '+91 98888 77777',
    email: 'amit.k@delivery.com',
    avatar: 'https://ui-avatars.com/api/?name=Amit+Kumar&background=16a34a&color=fff',
    status: 'Online',
    vehicleType: 'Bike',
    vehicleNumber: 'DL-8C-AB-1234',
    rating: 4.9,
    totalDeliveries: 1240,
    todayDeliveries: 12,
    joinedAt: '2023-01-15',
    zones: ['New Delhi', 'Gurgaon'],
    serviceRadius: 5,
    commission: { type: 'Flat', value: 40 },
    documents: {
      aadhaar: { status: 'Verified', number: 'XXXX-XXXX-1234' },
      license: { status: 'Verified', number: 'DL-1234567890', expiry: '2028-12-31' },
      rc: { status: 'Verified', number: 'DL-8C-AB-1234' },
      bank: { status: 'Verified', holder: 'Amit Kumar', bankName: 'SBI', accountNo: 'XXXXXX9876', ifsc: 'SBIN0001234' }
    }
  },
  {
    id: 'DP-8832',
    name: 'Rajesh Singh',
    phone: '+91 91111 22222',
    avatar: 'https://ui-avatars.com/api/?name=Rajesh+Singh&background=16a34a&color=fff',
    status: 'Busy',
    vehicleType: 'Scooter',
    vehicleNumber: 'HR-26-CD-5678',
    rating: 4.7,
    totalDeliveries: 850,
    todayDeliveries: 8,
    joinedAt: '2023-05-20',
    zones: ['Gurgaon'],
    serviceRadius: 3,
    commission: { type: 'Flat', value: 35 },
    documents: {
      aadhaar: { status: 'Verified', number: 'XXXX-XXXX-5678' },
      license: { status: 'Verified', number: 'HR-1234567890', expiry: '2030-01-15' },
      rc: { status: 'Verified', number: 'HR-26-CD-5678' },
      bank: { status: 'Verified', holder: 'Rajesh Singh', bankName: 'HDFC', accountNo: 'XXXXXX4321', ifsc: 'HDFC0001122' }
    }
  },
  {
    id: 'DP-9901',
    name: 'Suresh Raina',
    phone: '+91 93333 44444',
    avatar: 'https://ui-avatars.com/api/?name=Suresh+Raina&background=16a34a&color=fff',
    status: 'Offline',
    vehicleType: 'Cycle',
    vehicleNumber: 'N/A',
    rating: 4.5,
    totalDeliveries: 320,
    todayDeliveries: 0,
    joinedAt: '2024-02-10',
    zones: ['Noida'],
    serviceRadius: 2,
    commission: { type: 'Flat', value: 25 },
    documents: {
      aadhaar: { status: 'Pending', number: 'XXXX-XXXX-9901' },
      license: { status: 'Rejected', number: 'PENDING', expiry: 'N/A' },
      rc: { status: 'Pending', number: 'N/A' },
      bank: { status: 'Verified', holder: 'Suresh Raina', bankName: 'ICICI', accountNo: 'XXXXXX1111', ifsc: 'ICIC0003333' }
    }
  }
];

const getStored = (): DeliveryPartner[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PARTNERS));
    return MOCK_PARTNERS;
  }
  return JSON.parse(stored);
};

export const deliveryApi = {
  getPartners: async (): Promise<{ data: DeliveryPartner[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: getStored() }), 700);
    });
  },
  savePartner: async (data: Partial<DeliveryPartner>): Promise<{ success: true, data: DeliveryPartner }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const partners = getStored();
        let final: DeliveryPartner;
        if (data.id) {
          final = partners.map(p => p.id === data.id ? { ...p, ...data } : p).find(p => p.id === data.id) as DeliveryPartner;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(partners.map(p => p.id === data.id ? final : p)));
        } else {
          final = {
            ...data,
            id: `DP-${Math.floor(1000 + Math.random() * 9000)}`,
            status: data.status || 'Pending Verification',
            totalDeliveries: 0,
            todayDeliveries: 0,
            rating: 0,
            joinedAt: new Date().toISOString().split('T')[0],
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'P')}&background=16a34a&color=fff`,
          } as DeliveryPartner;
          partners.unshift(final);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(partners));
        }
        resolve({ success: true, data: final });
      }, 800);
    });
  },
  updateStatus: async (id: string, status: DeliveryPartner['status']): Promise<{ success: true }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const partners = getStored();
        const updated = partners.map(p => p.id === id ? { ...p, status } : p);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve({ success: true });
      }, 500);
    });
  }
};
