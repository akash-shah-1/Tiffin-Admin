
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
  status: 'Placed' | 'Accepted' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
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
  cancelReason?: string;
}

export interface Settlement {
  id: string;
  kitchenId: string;
  kitchenName: string;
  bankDetails: {
    bankName: string;
    accountNo: string;
    ifsc: string;
    accountHolder: string;
  };
  totalOrders: number;
  totalAmount: number;
  commissionRate: number;
  commissionAmount: number;
  payoutAmount: number;
  dateRange: string;
  status: 'Pending' | 'Completed';
  processedAt?: string;
  transactionRef?: string;
  orders: {
    id: string;
    amount: number;
    date: string;
    commission: number;
  }[];
}

export interface ComplaintMessage {
  id: string;
  sender: 'Customer' | 'Admin' | 'Kitchen';
  text: string;
  time: string;
  isInternal?: boolean;
}

export type ComplaintCategory = 'Order issue' | 'Payment issue' | 'Food quality' | 'Delivery problem' | 'App issue' | 'Other';

export interface Complaint {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  orderId?: string;
  subject: string;
  description: string;
  category: ComplaintCategory;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  messages: ComplaintMessage[];
}

export interface ReportStats {
  totalOrders: number;
  totalRevenue: number;
  totalCommission: number;
  avgOrderValue: number;
  avgRating?: number;
  topKitchens?: { name: string; orders: number; revenue: number }[];
  breakdown?: { name: string; orders: number; revenue: number; commission: number }[];
  chartData?: { label: string; value: number }[];
}

export type MenuCategory = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
export type DietaryTag = 'Veg' | 'Non-Veg' | 'Vegan' | 'Jain';

export interface MenuItemApproval {
  id: string;
  itemName: string;
  kitchenId: string;
  kitchenName: string;
  category: MenuCategory;
  price: number;
  tags: DietaryTag[];
  image: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  description?: string;
}
