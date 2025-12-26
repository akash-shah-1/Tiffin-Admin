
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: string[];
  type: 'Customer' | 'Seller';
  status: 'Active' | 'Pending' | 'Deactivated';
  balance?: number;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate?: string;
  joinedAt: string;
  lastActive: string;
  avatar: string;
  adminNotes?: string;
}

export interface Kitchen {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  fssai: string;
  status: 'Active' | 'Pending' | 'Inactive';
  logo: string;
  rating: number;
  totalOrders: number;
  revenue: number;
  joinedAt: string;
  operatingHours: string;
  commissionRate: number;
  photos: string[];
  adminNotes?: string;
  menuItems: { id: string; name: string; price: number; image: string }[];
}

export interface TiffinPlan {
  id: string;
  name: string;
  sellerName: string;
  sellerId: string;
  sellerRating: number;
  price: number;
  tags: string[];
  description: string;
  image: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderTimeline {
  status: string;
  time: string;
  completed: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  customerId: string;
  customerPhone: string;
  customerAddress: string;
  sellerName: string;
  sellerId: string;
  sellerPhone: string;
  status: 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'Delayed' | 'Placed' | 'Accepted';
  itemsList: OrderItem[];
  itemsSummary: string;
  time: string;
  amount: number;
  deliveryCharge: number;
  date: string;
  paymentMethod: 'UPI' | 'Cash' | 'Wallet';
  paymentStatus: 'Paid' | 'Pending';
  timeline: OrderTimeline[];
  adminNotes?: string;
}

export interface Dispute {
  id: string;
  orderId: string;
  title: string;
  description: string;
  priority: 'Critical' | 'Medium' | 'Low';
  status: 'Active' | 'Pending' | 'Resolved';
  elapsedTime: string;
  userAvatar: string;
  sellerAvatar: string;
}
