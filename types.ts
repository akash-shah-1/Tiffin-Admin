
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
  orderNumber?: string;
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
  adjustmentAmount: number; // For penalties/refunds
  adjustmentReason?: string;
  payoutAmount: number;
  dateRange: string;
  status: 'Pending' | 'On Hold' | 'Completed';
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

export interface KitchenApprovalRequest {
  id: string;
  kitchenName: string;
  ownerName: string;
  phone: string;
  email: string;
  fssaiNumber: string;
  fssaiDoc: string;
  address: string;
  identityDoc: string;
  kitchenPhotos: string[];
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Changes Requested';
  adminNotes?: string;
  feedback?: {
    reasons: string[];
    comments: string;
  };
}

// FIX: Added missing DeliveryStatus and VehicleType exported members
export type DeliveryStatus = 'Online' | 'Offline' | 'Busy' | 'Suspended' | 'Pending Verification';
export type VehicleType = 'Bike' | 'Scooter' | 'Cycle';

// FIX: Added missing DeliveryPartner interface
export interface DeliveryPartner {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar: string;
  status: DeliveryStatus;
  vehicleType: VehicleType;
  vehicleNumber: string;
  rating: number;
  totalDeliveries: number;
  todayDeliveries: number;
  joinedAt: string;
  zones: string[];
  serviceRadius: number;
  commission: {
    type: 'Flat' | 'Percentage';
    value: number;
  };
  documents: {
    aadhaar: { status: string; number: string };
    license: { status: string; number: string; expiry: string };
    rc: { status: string; number: string };
    bank: { status: string; holder: string; bankName: string; accountNo: string; ifsc: string };
  };
  dob?: string;
  address?: string;
}

// FIX: Added missing MenuItemApproval interface
export interface MenuItemApproval {
  id: string;
  itemName: string;
  kitchenId: string;
  kitchenName: string;
  category: string;
  price: number;
  tags: string[];
  image: string;
  gallery: string[];
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Changes Requested';
  description: string;
  cuisine: string;
  prepTime: string;
  spiceLevel: string;
  allergens: string[];
  ingredients: string[];
  availability: string[];
  stock?: number;
  qualityCheck: {
    imageQuality: boolean;
    descriptionComplete: boolean;
    priceReasonable: boolean;
    detailsFilled: boolean;
  };
  adminNotes?: string;
  feedback?: {
    reasons: string[];
    comments: string;
  };
}
