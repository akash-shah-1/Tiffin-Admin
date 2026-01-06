import { graphqlClient } from './graphqlClient';
import { MenuItemApproval } from '../types';

export const menuApprovalsApi = {
  getApprovals: async (): Promise<{ data: MenuItemApproval[] }> => {
    const query = `
      query GetPendingMenuItems {
        menuItems(status: PENDING) {
          _id
          itemName
          kitchenId
          kitchenName
          category
          price
          tags
          image
          gallery
          description
          createdAt
          status
        }
      }
    `;
    const data = await graphqlClient(query);
    const mapped = data.menuItems.map((item: any) => ({
      id: item._id,
      itemName: item.itemName,
      kitchenId: item.kitchenId,
      kitchenName: item.kitchenName,
      category: item.category,
      price: item.price,
      tags: item.tags,
      image: item.image,
      gallery: item.gallery,
      description: item.description,
      submittedAt: new Date(item.createdAt).toLocaleString(),
      status: item.status.charAt(0) + item.status.slice(1).toLowerCase().replace('_', ' ')
    }));
    return { data: mapped };
  },

  getApprovalById: async (id: string): Promise<{ data: MenuItemApproval | undefined }> => {
    const query = `
      query GetMenuItem($id: ID!) {
        menuItem(id: $id) {
          _id
          itemName
          kitchenId
          kitchenName
          category
          price
          tags
          image
          gallery
          description
          createdAt
          status
          adminNotes
        }
      }
    `;
    const data = await graphqlClient(query, { id });
    if (!data.menuItem) return { data: undefined };

    const item = data.menuItem;
    const mapped: MenuItemApproval = {
      id: item._id,
      itemName: item.itemName,
      kitchenId: item.kitchenId,
      kitchenName: item.kitchenName,
      category: item.category,
      price: item.price,
      tags: item.tags,
      image: item.image,
      gallery: item.gallery,
      description: item.description,
      submittedAt: new Date(item.createdAt).toLocaleString(),
      status: item.status.charAt(0) + item.status.slice(1).toLowerCase().replace('_', ' '),
      adminNotes: item.adminNotes
    };
    return { data: mapped };
  },

  updateStatus: async (id: string, status: string, feedback?: any): Promise<{ success: true }> => {
    let mutation = '';
    let variables: any = { id };

    if (status === 'Approved') {
      mutation = `
        mutation ApproveMenuItem($id: ID!) {
          approveMenuItem(id: $id) { _id status }
        }
      `;
    } else if (status === 'Rejected') {
      mutation = `
        mutation RejectMenuItem($id: ID!, $reason: String!) {
          rejectMenuItem(id: $id, reason: $reason) { _id status }
        }
      `;
      variables.reason = feedback?.comments || 'Does not meet standards';
    } else if (status === 'Changes Requested') {
      mutation = `
        mutation RequestMenuItemChanges($id: ID!, $feedback: MenuItemFeedbackInput!) {
          requestMenuItemChanges(id: $id, feedback: $feedback) { _id status }
        }
      `;
      variables.feedback = {
        reasons: feedback?.reasons || ['Incomplete details'],
        comments: feedback?.comments || 'Please revise'
      };
    }

    if (mutation) {
      await graphqlClient(mutation, variables);
    }

    return { success: true };
  },

  saveAdminNotes: async (id: string, adminNotes: string): Promise<{ success: true }> => {
    const mutation = `
      mutation UpdateMenuItemNotes($id: ID!, $notes: String!) {
        updateMenuItem(updateMenuItemInput: { id: $id, adminNotes: $notes }) {
          _id
          adminNotes
        }
      }
    `;
    await graphqlClient(mutation, { id, notes: adminNotes });
    return { success: true };
  }
};
