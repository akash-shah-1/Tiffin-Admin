
import { Order } from '../types';

export const MOCK_ORDERS: Order[] = [
  { 
    id: 'ORD-8821', 
    customerName: 'Rahul Sharma', 
    customerId: 'C-8832',
    customerPhone: '+91 98765 43210',
    customerAddress: '123, Green Park, Block B, New Delhi',
    sellerName: "Mom's Kitchen", 
    sellerId: 'K-001',
    sellerPhone: '+91 98123 45678',
    status: 'Preparing', 
    itemsSummary: '2x Deluxe Veg Thali, 1x Extra Roti', 
    itemsList: [
      { name: 'Deluxe Veg Thali', quantity: 2, price: 150 },
      { name: 'Extra Roti', quantity: 1, price: 10 }
    ],
    time: '12:45 PM', 
    amount: 340, 
    deliveryCharge: 30,
    date: '2024-05-24',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    timeline: [
      { status: 'Order Placed', time: '12:10 PM', completed: true },
      { status: 'Kitchen Accepted', time: '12:15 PM', completed: true },
      { status: 'Preparing', time: '12:20 PM', completed: true },
      { status: 'Out for delivery', time: '', completed: false },
      { status: 'Delivered', time: '', completed: false }
    ]
  },
  { 
    id: 'ORD-7752', 
    customerName: 'Anita Desai', 
    customerId: 'C-9201',
    customerPhone: '+91 91234 56789',
    customerAddress: 'A-45, HSR Layout, Bengaluru',
    sellerName: "Tiffin Kings", 
    sellerId: 'K-002',
    sellerPhone: '+91 95544 33221',
    status: 'Out for Delivery', 
    itemsSummary: '1x Kadhi Chawal Combo', 
    itemsList: [
      { name: 'Kadhi Chawal Combo', quantity: 1, price: 120 }
    ],
    time: '01:10 PM', 
    amount: 145, 
    deliveryCharge: 25,
    date: '2024-05-24',
    paymentMethod: 'Wallet',
    paymentStatus: 'Paid',
    timeline: [
      { status: 'Order Placed', time: '12:30 PM', completed: true },
      { status: 'Kitchen Accepted', time: '12:35 PM', completed: true },
      { status: 'Preparing', time: '12:40 PM', completed: true },
      { status: 'Out for delivery', time: '01:05 PM', completed: true },
      { status: 'Delivered', time: '', completed: false }
    ]
  },
  { 
    id: 'ORD-6621', 
    customerName: 'Vikram Singh', 
    customerId: 'C-7721',
    customerPhone: '+91 99887 76655',
    customerAddress: 'Sector 12, Noida',
    sellerName: "Spice Route", 
    sellerId: 'K-003',
    sellerPhone: '+91 98112 23344',
    status: 'Delivered', 
    itemsSummary: '1x North Indian Thali', 
    itemsList: [
      { name: 'North Indian Thali', quantity: 1, price: 180 }
    ],
    time: '08:15 PM', 
    amount: 200, 
    deliveryCharge: 20,
    date: '2024-05-23',
    paymentMethod: 'Cash',
    paymentStatus: 'Paid',
    timeline: [
      { status: 'Order Placed', time: '07:30 PM', completed: true },
      { status: 'Kitchen Accepted', time: '07:35 PM', completed: true },
      { status: 'Preparing', time: '07:45 PM', completed: true },
      { status: 'Out for delivery', time: '08:00 PM', completed: true },
      { status: 'Delivered', time: '08:15 PM', completed: true }
    ]
  },
  { 
    id: 'ORD-5501', 
    customerName: 'Sanya Malhotra', 
    customerId: 'C-5500',
    customerPhone: '+91 98989 89898',
    customerAddress: 'B-Block, Powai, Mumbai',
    sellerName: "Mom's Kitchen", 
    sellerId: 'K-001',
    sellerPhone: '+91 98123 45678',
    status: 'Cancelled', 
    itemsSummary: '1x Jain Thali', 
    itemsList: [
      { name: 'Jain Thali', quantity: 1, price: 160 }
    ],
    time: '12:50 PM', 
    amount: 180, 
    deliveryCharge: 20,
    date: '2024-05-23',
    paymentMethod: 'UPI',
    paymentStatus: 'Pending',
    cancelReason: 'Address outside delivery radius',
    timeline: [
      { status: 'Order Placed', time: '12:40 PM', completed: true },
      { status: 'Cancelled', time: '12:45 PM', completed: true }
    ]
  }
];
