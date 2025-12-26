
import { MOCK_USERS } from './users';
import { MOCK_ORDERS } from './orders';
import { Settlement, Complaint } from '../types';

export { MOCK_USERS, MOCK_ORDERS };

export const DASHBOARD_METRICS = {
  todayOrders: 142,
  activeCustomers: 1254,
  activeKitchens: 86,
  todayRevenue: 24500,
  trends: {
    orders: "+12%",
    customers: "+3%",
    kitchens: "+1%",
    revenue: "+8%"
  }
};

export const QUICK_STATS = {
  pendingAcceptance: 14,
  complaintsToResolve: 6,
  pendingKitchens: 3
};

export const REVENUE_CHART_DATA = [
  { day: 'Mon', val: 18000 },
  { day: 'Tue', val: 22000 },
  { day: 'Wed', val: 19500 },
  { day: 'Thu', val: 24000 },
  { day: 'Fri', val: 28000 },
  { day: 'Sat', val: 32000 },
  { day: 'Sun', val: 24500 }
];

export const VOLUME_CHART_DATA = [
  { day: 'Mon', val: 95 },
  { day: 'Tue', val: 110 },
  { day: 'Wed', val: 105 },
  { day: 'Thu', val: 130 },
  { day: 'Fri', val: 155 },
  { day: 'Sat', val: 180 },
  { day: 'Sun', val: 142 }
];

export const RECENT_ACTIVITY = [
  { title: 'New Seller Registered', sub: 'Kitchen Spice Route awaiting approval', time: '2m ago', icon: 'restaurant', color: 'orange' },
  { title: 'Subscription Renewed', sub: 'Rahul Sharma renewed Monthly Plan', time: '15m ago', icon: 'subscriptions', color: 'blue' },
  { title: 'Bulk Order Delivered', sub: 'Spice Route delivered 50 tiffins', time: '1h ago', icon: 'local_shipping', color: 'green' },
];

export const MOCK_SETTINGS = {
  profile: {
    name: "Super Admin",
    email: "admin@tiffinpro.com",
    phone: "+91 99887 76655"
  },
  platform: {
    name: "TiffinAdmin Pro",
    supportEmail: "support@tiffinpro.com",
    supportPhone: "+91 800 123 4567",
    defaultCommission: "15",
    defaultDeliveryCharge: "30",
    minOrderValue: "150"
  },
  operations: {
    openingTime: "08:00",
    closingTime: "22:00",
    serviceAreas: ["New Delhi", "Gurgaon", "Noida", "Bengaluru", "Mumbai"],
    taxRate: "12"
  },
  appConfig: {
    enableCOD: true,
    enableOnlinePayment: true,
    enableOrderRating: true,
    enableKitchenRating: true
  },
  deliveryRadius: "5.0",
  maintenanceMode: false,
};

export const MOCK_KITCHENS = [
  {
    id: 'K-001',
    name: "Mom's Kitchen",
    ownerName: 'Sunita Mehra',
    phone: '+91 98123 45678',
    email: 'sunita@momskitchen.com',
    address: 'Sector 45, Gurgaon, Haryana 122003',
    fssai: '23321005000789',
    status: 'Active',
    logo: 'https://picsum.photos/100/100?random=21',
    rating: 4.8,
    totalOrders: 1240,
    revenue: 450000,
    joinedAt: '2023-10-12',
    operatingHours: '08:00 AM - 09:00 PM',
    commissionRate: 15,
    photos: ['https://picsum.photos/800/600?random=101', 'https://picsum.photos/800/600?random=102'],
    menuItems: [
      { id: 'M1', name: 'Classic Veg Thali', price: 120, image: 'https://picsum.photos/200/200?random=51' },
      { id: 'M2', name: 'Special Paneer Thali', price: 180, image: 'https://picsum.photos/200/200?random=52' }
    ]
  }
];

export const MOCK_PLANS = [
  {
    id: '1',
    seller: "Mom's Kitchen",
    sellerAvatar: 'https://picsum.photos/100/100?random=21',
    sentAt: '2 hours ago',
    title: 'Deluxe Veg Thali',
    price: '₹120',
    image: 'https://picsum.photos/400/300?random=31',
    description: 'Includes Paneer Butter Masala, 4 Chapatis, Jeera Rice, Dal Fry, Salad, and Pickle.',
    tags: ['Pure Veg', 'Lunch', '500-600 Cal'],
    status: 'Pending'
  }
];

export const MOCK_SETTLEMENTS: Settlement[] = [
  {
    id: 'STL-9921',
    kitchenId: 'K-001',
    kitchenName: "Mom's Kitchen",
    bankDetails: {
      bankName: 'HDFC Bank',
      accountNo: 'XXXXXX9982',
      ifsc: 'HDFC0001234',
      accountHolder: 'Sunita Mehra'
    },
    totalOrders: 154,
    totalAmount: 24500,
    commissionRate: 15,
    commissionAmount: 3675,
    payoutAmount: 20825,
    dateRange: 'May 14 - May 20, 2024',
    status: 'Pending',
    orders: [
      { id: 'ORD-8821', amount: 340, date: '2024-05-20', commission: 51 },
      { id: 'ORD-7752', amount: 150, date: '2024-05-19', commission: 22.5 }
    ]
  }
];

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: 'TKT-1002',
    customerId: 'C-8832',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    orderId: 'ORD-8821',
    subject: 'Food arrived cold and spilled',
    description: 'The thali delivered today was not properly sealed. Most of the dal spilled into the bag and the food was completely cold.',
    category: 'Food quality',
    priority: 'High',
    status: 'Open',
    createdAt: '2024-05-24 01:15 PM',
    messages: [
      { id: 'msg-1', sender: 'Customer', text: 'The food delivered today was not properly sealed. Most of the dal spilled into the bag.', time: '01:15 PM' }
    ]
  },
  {
    id: 'TKT-1005',
    customerId: 'C-9201',
    customerName: 'Anita Desai',
    customerPhone: '+91 91234 56789',
    orderId: 'ORD-7752',
    subject: 'Refund not credited to wallet',
    description: 'My previous order ORD-7750 was cancelled but the amount has not been credited back to my wallet yet.',
    category: 'Payment issue',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2024-05-23 10:30 AM',
    messages: [
      { id: 'msg-1', sender: 'Customer', text: 'Amount for ORD-7750 not credited back to wallet.', time: '10:30 AM' },
      { id: 'msg-2', sender: 'Admin', text: 'Checking with the finance team. Please hold.', time: '11:00 AM' }
    ]
  },
  {
    id: 'TKT-0992',
    customerId: 'C-8832',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    subject: 'Address change not working in app',
    description: 'Whenever I try to save a new address, the app crashes.',
    category: 'App issue',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2024-05-20 04:45 PM',
    messages: [
      { id: 'msg-1', sender: 'Customer', text: 'App crashes on address save.', time: '04:45 PM' },
      { id: 'msg-2', sender: 'Admin', text: 'We have pushed a fix in version 1.2.4. Please update.', time: '05:30 PM' },
      { id: 'msg-3', sender: 'Customer', text: 'Working now, thanks.', time: '06:00 PM' }
    ]
  }
];
