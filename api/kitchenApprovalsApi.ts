import { graphqlClient } from './graphqlClient';
import { KitchenApprovalRequest } from '../types';

export const kitchenApprovalsApi = {
  getRequests: async (): Promise<{ data: KitchenApprovalRequest[] }> => {
    // In our backend, PENDING kitchens are the requests
    const query = `
      query GetPendingKitchens {
        kitchens(status: PENDING) {
          _id
          name
          ownerName
          phone
          email
          address
          fssai
          fssaiDoc
          identityDoc
          photos
          createdAt
          status
        }
      }
    `;
    const data = await graphqlClient(query);
    const mapped = data.kitchens.map((k: any) => ({
      id: k._id,
      kitchenName: k.name,
      ownerName: k.ownerName,
      phone: k.phone,
      email: k.email,
      address: k.address,
      fssaiNumber: k.fssai,
      fssaiDoc: k.fssaiDoc,
      identityDoc: k.identityDoc,
      kitchenPhotos: k.photos,
      submittedAt: new Date(k.createdAt).toLocaleString(),
      status: k.status === 'PENDING' ? 'Pending' : k.status === 'REJECTED' ? 'Rejected' : k.status === 'CHANGES_REQUESTED' ? 'Changes Requested' : 'Approved'
    }));
    return { data: mapped };
  },

  getRequestById: async (id: string): Promise<{ data: KitchenApprovalRequest | undefined }> => {
    const query = `
      query GetKitchenRequest($id: ID!) {
        kitchen(id: $id) {
          _id
          name
          ownerName
          phone
          email
          address
          fssai
          fssaiDoc
          identityDoc
          photos
          createdAt
          status
        }
      }
    `;
    const data = await graphqlClient(query, { id });
    if (!data.kitchen) return { data: undefined };

    const k = data.kitchen;
    const mapped: KitchenApprovalRequest = {
      id: k._id,
      kitchenName: k.name,
      ownerName: k.ownerName,
      phone: k.phone,
      email: k.email,
      address: k.address,
      fssaiNumber: k.fssai,
      fssaiDoc: k.fssaiDoc,
      identityDoc: k.identityDoc,
      kitchenPhotos: k.photos,
      submittedAt: new Date(k.createdAt).toLocaleString(),
      status: k.status === 'PENDING' ? 'Pending' : k.status === 'REJECTED' ? 'Rejected' : k.status === 'CHANGES_REQUESTED' ? 'Changes Requested' : 'Approved'
    };
    return { data: mapped };
  },

  updateStatus: async (id: string, status: string, feedback?: any): Promise<{ success: true }> => {
    let mutation = '';
    let variables: any = { id };

    if (status === 'Approved') {
      mutation = `
        mutation ApproveKitchen($id: ID!) {
          approveKitchen(id: $id) { _id status }
        }
      `;
    } else if (status === 'Rejected') {
      mutation = `
        mutation RejectKitchen($id: ID!, $reason: String!) {
          rejectKitchen(id: $id, reason: $reason) { _id status }
        }
      `;
      variables.reason = feedback?.comments || 'Does not meet platform requirements';
    } else if (status === 'Changes Requested') {
      mutation = `
        mutation RequestChanges($id: ID!, $feedback: KitchenFeedbackInput!) {
          requestChanges(id: $id, feedback: $feedback) { _id status }
        }
      `;
      variables.feedback = {
        reasons: feedback?.reasons || ['Incomplete documentation'],
        comments: feedback?.comments || 'Please update documents'
      };
    }

    if (mutation) {
      await graphqlClient(mutation, variables);
    }

    return { success: true };
  }
};
