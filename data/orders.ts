
import { Order } from '../types';

export const MOCK_ORDERS: Order[] = [
  { 
    id: 'ORD-5001', 
    customerName: 'Rahul Sharma', 
    customerId: 'C-8832',
    customerPhone: '+91 98765 43210',
    customerAddress: '123, Green Park, Block B, New Delhi',
    sellerName: "Mom's Kitchen", 
    sellerId: 'K-001',
    sellerPhone: '+91 98123 45678',
    status: 'Delivered', 
    itemsSummary: '2x Deluxe Veg Thali', 
    itemsList: [
      { name: 'Deluxe Veg Thali', quantity: 2, price: 150 }
    ],
    time: '12:45 PM', 
    amount: 320, 
    deliveryCharge: 20,
    date: '2024-05-20',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    timeline: [
      { status: 'Order Placed', time: '12:10 PM', completed: true },
      { status: 'Accepted by Kitchen', time: '12:12 PM', completed: true },
      { status: 'Preparing', time: '12:15 PM', completed: true },
      { status: 'Out for Delivery', time: '12:35 PM', completed: true },
      { status: 'Delivered', time: '12:45 PM', completed: true }
    ],
    adminNotes: 'Delivered on time. Happy customer.'
  },
  { 
    id: 'ORD-4992', 
    customerName: 'Rahul Sharma', 
    customerId: 'C-8832',
    customerPhone: '+91 98765 43210',
    customerAddress: 'Office 402, Cyber Hub, Gurgaon',
    sellerName: "Tiffin Kings", 
    sellerId: 'K-002',
    sellerPhone: '+91 95544 33221',
    status: 'Delivered', 
    itemsSummary: '1x Kadhi Chawal Combo', 
    itemsList: [
      { name: 'Kadhi Chawal Combo', quantity: 1, price: 100 }
    ],
    time: '01:10 PM', 
    amount: 120, 
    deliveryCharge: 20,
    date: '2024-05-19',
    paymentMethod: 'Wallet',
    paymentStatus: 'Paid',
    timeline: [
      { status: 'Order Placed', time: '12:40 PM', completed: true },
      { status: 'Delivered', time: '01:10 PM', completed: true }
    ]
  },
  { 
    id: 'ORD-5100', 
    customerName: 'Anita Desai', 
    customerId: 'C-9201',
    customerPhone: '+91 91234 56789',
    customerAddress: 'A-45, HSR Layout, Bengaluru',
    sellerName: "Mom's Kitchen", 
    sellerId: 'K-001',
    sellerPhone: '+91 98123 45678',
    status: 'Preparing', 
    itemsSummary: '1x Special Paneer Thali', 
    itemsList: [
      { name: 'Special Paneer Thali', quantity: 1, price: 180 }
    ],
    time: '02:30 PM', 
    amount: 205, 
    deliveryCharge: 25,
    date: '2024-05-21',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    timeline: [
      { status: 'Order Placed', time: '02:05 PM', completed: true },
      { status: 'Accepted by Kitchen', time: '02:08 PM', completed: true },
      { status: 'Preparing', time: '02:10 PM', completed: true },
      { status: 'Out for Delivery', time: '', completed: false },
      { status: 'Delivered', time: '', completed: false }
    ]
  },
  { 
    id: 'ORD-5101', 
    customerName: 'Vikram Singh', 
    customerId: 'C-7721',
    customerPhone: '+91 99887 76655',
    customerAddress: 'Sector 12, Noida',
    sellerName: "Spice Route", 
    sellerId: 'K-003',
    sellerPhone: '+91 98112 23344',
    status: 'Out for Delivery', 
    itemsSummary: '3x Mini Thali', 
    itemsList: [
      { name: 'Mini Thali', quantity: 3, price: 120 }
    ],
    time: '01:50 PM', 
    amount: 380, 
    deliveryCharge: 20,
    date: '2024-05-21',
    paymentMethod: 'Cash',
    paymentStatus: 'Pending',
    timeline: [
      { status: 'Order Placed', time: '01:10 PM', completed: true },
      { status: 'Out for Delivery', time: '01:35 PM', completed: true },
      { status: 'Delivered', time: '', completed: false }
    ]
  },
  { 
    id: 'ORD-5055', 
    customerName: 'Rahul Sharma', 
    customerId: 'C-8832',
    customerPhone: '+91 98765 43210',
    customerAddress: '123, Green Park, Block B, New Delhi',
    sellerName: "Mom's Kitchen", 
    sellerId: 'K-001',
    sellerPhone: '+91 98123 45678',
    status: 'Cancelled', 
    itemsSummary: '1x Paneer Tikka', 
    itemsList: [
      { name: 'Paneer Tikka', quantity: 1, price: 180 }
    ],
    time: '08:30 PM', 
    amount: 180, 
    deliveryCharge: 0,
    date: '2024-05-16',
    paymentMethod: 'UPI',
    paymentStatus: 'Pending',
    timeline: [
      { status: 'Order Placed', time: '08:10 PM', completed: true },
      { status: 'Cancelled', time: '08:15 PM', completed: true }
    ],
    adminNotes: 'Customer cancelled due to wrong item selection.'
  }
];
