
import { User } from '../types';

export const MOCK_USERS: User[] = [
  { 
    id: 'C-8832', 
    name: 'Rahul Sharma', 
    email: 'rahul.s@example.com',
    phone: '+91 98765 43210',
    addresses: ['123, Green Park, Block B, New Delhi', 'Office 402, Cyber Hub, Gurgaon'],
    type: 'Customer', 
    status: 'Active', 
    avatar: 'https://picsum.photos/100/100?random=11',
    ordersCount: 42,
    totalSpent: 12500,
    lastOrderDate: '2024-05-18',
    joinedAt: '2023-01-15',
    lastActive: '2h ago',
    adminNotes: 'Frequent vegetarian thali subscriber. Prefers delivery before 1 PM.'
  },
  { 
    id: 'C-9201', 
    name: 'Anita Desai', 
    email: 'anita.d@gmail.com',
    phone: '+91 91234 56789',
    addresses: ['A-45, HSR Layout, Bengaluru'],
    type: 'Customer', 
    status: 'Active', 
    avatar: 'https://picsum.photos/100/100?random=12',
    ordersCount: 15,
    totalSpent: 4500,
    lastOrderDate: '2024-05-15',
    joinedAt: '2023-06-20',
    lastActive: '1d ago'
  },
  { 
    id: 'C-7721', 
    name: 'Vikram Singh', 
    email: 'vikram@yahoo.co.in',
    phone: '+91 99887 76655',
    addresses: ['Sector 12, Noida'],
    type: 'Customer', 
    status: 'Deactivated', 
    avatar: 'https://picsum.photos/100/100?random=13',
    ordersCount: 0,
    totalSpent: 0,
    joinedAt: '2024-02-10',
    lastActive: '1mo ago',
    adminNotes: 'Deactivated due to duplicate account detection.'
  },
  { 
    id: 'S-8100', 
    name: 'Priya Patel', 
    email: 'priya@kitchen.in', 
    phone: '+91 98112 23344', 
    addresses: ['Surat, Gujarat'], 
    type: 'Seller', 
    status: 'Pending', 
    avatar: 'https://picsum.photos/100/100?random=14', 
    ordersCount: 0, 
    totalSpent: 0, 
    joinedAt: '2024-03-05', 
    lastActive: '5m ago' 
  },
  { 
    id: 'S-4402', 
    name: 'Arjun Kapoor', 
    email: 'arjun@tiffinkings.com', 
    phone: '+91 95544 33221', 
    addresses: ['Mumbai, MS'], 
    type: 'Seller', 
    status: 'Active', 
    avatar: 'https://picsum.photos/100/100?random=15', 
    ordersCount: 850, 
    totalSpent: 0, 
    joinedAt: '2022-11-12', 
    lastActive: '1h ago' 
  },
];
