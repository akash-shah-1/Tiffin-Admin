import { graphqlClient } from './graphqlClient';
import { Settlement } from '../types';

export const paymentsApi = {
  getSettlements: async (): Promise<{ data: Settlement[] }> => {
    const query = `
      query GetSettlements {
        settlements {
          _id
          kitchenId
          kitchenName
          totalOrders
          totalAmount
          commissionAmount
          payoutAmount
          status
          dateRange
          processedAt
          transactionRef
        }
      }
    `;
    const data = await graphqlClient(query);
    const mapped = data.settlements.map((s: any) => ({
      id: s._id,
      kitchenId: s.kitchenId,
      kitchenName: s.kitchenName,
      totalOrders: s.totalOrders,
      totalAmount: s.totalAmount,
      commissionAmount: s.commissionAmount,
      payoutAmount: s.payoutAmount,
      status: s.status === 'PENDING' ? 'Pending' : s.status === 'PAID' ? 'Completed' : 'On Hold',
      dateRange: s.dateRange,
      processedAt: s.processedAt,
      transactionRef: s.transactionRef,
      commissionRate: 15,
      adjustmentAmount: 0,
      orders: []
    }));
    return { data: mapped };
  },

  getSettlementById: async (id: string): Promise<{ data: Settlement | undefined }> => {
    const query = `
      query GetSettlement($id: ID!) {
        settlement(id: $id) {
          _id
          kitchenId
          kitchenName
          totalOrders
          totalAmount
          commissionAmount
          payoutAmount
          status
          dateRange
          processedAt
          transactionRef
          bankDetails { accountNo bankName ifsc accountHolder }
        }
      }
    `;
    const data = await graphqlClient(query, { id });
    if (!data.settlement) return { data: undefined };

    const s = data.settlement;
    const mapped: Settlement = {
      id: s._id,
      kitchenId: s.kitchenId,
      kitchenName: s.kitchenName,
      totalOrders: s.totalOrders,
      totalAmount: s.totalAmount,
      commissionAmount: s.commissionAmount,
      payoutAmount: s.payoutAmount,
      status: s.status === 'PENDING' ? 'Pending' : s.status === 'PAID' ? 'Completed' : 'On Hold',
      dateRange: s.dateRange,
      processedAt: s.processedAt,
      transactionRef: s.transactionRef,
      bankDetails: s.bankDetails,
      commissionRate: 15,
      adjustmentAmount: 0,
      orders: []
    };
    return { data: mapped };
  },

  processSettlement: async (id: string): Promise<{ success: true }> => {
    const mutation = `
      mutation MarkSettlementPaid($id: ID!, $ref: String!) {
        markSettlementAsPaid(id: $id, transactionReference: $ref) {
          _id
          status
          transactionRef
        }
      }
    `;
    const ref = `ADMIN-PAY-${Date.now()}`;
    await graphqlClient(mutation, { id, ref });
    return { success: true };
  }
};
