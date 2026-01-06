import { graphqlClient } from './graphqlClient';
import { Order } from '../types';

export const ordersApi = {
  getOrders: async (filters: { kitchenId?: string, customerId?: string, status?: string } = {}): Promise<{ data: Order[] }> => {
    const query = `
      query GetOrders($kitchenId: ID, $customerId: ID, $status: OrderStatus) {
        orders(kitchenId: $kitchenId, customerId: $customerId, status: $status) {
          _id
          orderNumber
          customerName
          customerPhone
          customerAddress
          kitchenId
          sellerName
          sellerPhone
          status
          itemsSummary
          amount
          paymentMethod
          paymentStatus
          createdAt
        }
      }
    `;
    const data = await graphqlClient(query, {
      ...filters,
      status: filters.status ? filters.status.toUpperCase().replace(/ /g, '_') : undefined
    });
    const mapped = data.orders.map((o: any) => ({
      id: o._id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      customerPhone: o.customerPhone,
      customerAddress: o.customerAddress,
      kitchenName: o.sellerName,
      kitchenPhone: o.sellerPhone,
      status: o.status.charAt(0) + o.status.slice(1).toLowerCase().replace('_', ' '),
      amount: o.amount,
      itemsSummary: o.itemsSummary,
      paymentMethod: o.paymentMethod === 'WALLET' ? 'Wallet' : o.paymentMethod === 'UPI' ? 'UPI' : 'Cash',
      paymentStatus: o.paymentStatus.charAt(0) + o.paymentStatus.slice(1).toLowerCase(),
      date: new Date(o.createdAt).toISOString().split('T')[0],
      time: new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeline: []
    }));
    return { data: mapped };
  },

  getOrderById: async (id: string): Promise<{ data: Order | undefined }> => {
    const query = `
      query GetOrder($id: ID!) {
        order(id: $id) {
          _id
          orderNumber
          customerName
          customerPhone
          customerAddress
          kitchenId
          sellerName
          sellerPhone
          status
          itemsSummary
          amount
          paymentMethod
          paymentStatus
          createdAt
          adminNotes
        }
      }
    `;
    const data = await graphqlClient(query, { id });
    if (!data.order) return { data: undefined };

    const o = data.order;
    const mapped: Order = {
      id: o._id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      customerId: o.customerId || 'C-1001',
      customerPhone: o.customerPhone,
      customerAddress: o.customerAddress,
      sellerName: o.sellerName,
      sellerId: o.kitchenId,
      sellerPhone: o.sellerPhone,
      status: o.status.charAt(0) + o.status.slice(1).toLowerCase().replace('_', ' ') as any,
      amount: o.amount,
      itemsSummary: o.itemsSummary,
      itemsList: [],
      deliveryCharge: 0,
      paymentMethod: o.paymentMethod === 'WALLET' ? 'Wallet' : o.paymentMethod === 'UPI' ? 'UPI' : 'Cash',
      paymentStatus: o.paymentStatus.charAt(0) + o.paymentStatus.slice(1).toLowerCase() as any,
      date: new Date(o.createdAt).toISOString().split('T')[0],
      time: new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      adminNotes: o.adminNotes,
      timeline: []
    };
    return { data: mapped };
  },

  updateOrderStatus: async (id: string, status: string): Promise<{ success: true }> => {
    const mutation = `
      mutation UpdateOrderStatus($id: ID!, $status: OrderStatus!) {
        updateOrderStatus(id: $id, status: $status) {
          _id
          status
        }
      }
    `;
    // Map frontend status to backend enum
    let backendStatus = status.toUpperCase().replace(/ /g, '_');
    if (backendStatus === 'OUT_FOR_DELIVERY') backendStatus = 'OUT_FOR_DELIVERY';

    await graphqlClient(mutation, { id, status: backendStatus });
    return { success: true };
  },

  saveAdminNotes: async (id: string, notes: string): Promise<{ success: true }> => {
    const mutation = `
      mutation UpdateOrderNotes($id: ID!, $notes: String!) {
        updateOrder(updateOrderInput: { id: $id, adminNotes: $notes }) {
          _id
          adminNotes
        }
      }
    `;
    await graphqlClient(mutation, { id, notes });
    return { success: true };
  }
};
