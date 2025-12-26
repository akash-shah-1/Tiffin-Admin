
import { MOCK_USERS } from './users';
import { MOCK_ORDERS } from './orders';

export { MOCK_USERS, MOCK_ORDERS };

export const DASHBOARD_STATS = [
  { label: 'Total Users', value: '2,543', trend: '+5%', color: 'blue', icon: 'group' },
  { label: 'Active Subs', value: '840', trend: '+12%', color: 'primary', icon: 'card_membership' },
  { label: 'Total Kitchens', value: '125', trend: '+2%', color: 'orange', icon: 'storefront' },
  { label: 'Revenue', value: '₹1.24L', trend: '+8%', color: 'green', icon: 'payments' },
];

export const RECENT_ACTIVITY = [
  { title: 'New Seller Registered', sub: 'Kitchen Spice Route awaiting approval', time: '2m ago', icon: 'restaurant', color: 'orange' },
  { title: 'Subscription Renewed', sub: 'Rahul Sharma renewed Monthly Plan', time: '15m ago', icon: 'subscriptions', color: 'blue' },
  { title: 'Bulk Order Delivered', sub: 'Spice Route delivered 50 tiffins', time: '1h ago', icon: 'local_shipping', color: 'green' },
];

export const MOCK_REVENUE_CHART = {
  total: "₹1,24,500",
  growth: "12.5%",
  points: "M0,35 Q10,30 20,38 T40,20 T60,25 T80,10 T100,15"
};

export const MOCK_SETTINGS = {
  deliveryRadius: "5.0",
  taxRate: "12",
  maintenanceMode: false,
  lunchCutoff: "10:30 AM",
  dinnerCutoff: "05:00 PM",
  autoAssignPartners: true,
  stripeKey: "pk_test_51Mz...xY2q",
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
