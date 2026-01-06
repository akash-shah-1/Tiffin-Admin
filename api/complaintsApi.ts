import { graphqlClient } from './graphqlClient';
import { Complaint, ComplaintMessage } from '../types';

export const complaintsApi = {
  getComplaints: async (): Promise<{ data: Complaint[] }> => {
    const query = `
      query GetComplaints {
        complaints {
          _id
          customerName
          customerPhone
          kitchenName
          subject
          category
          priority
          status
          createdAt
        }
      }
    `;
    const data = await graphqlClient(query);
    const mapped = data.complaints.map((c: any) => ({
      id: c._id,
      customerName: c.customerName,
      customerPhone: c.customerPhone,
      kitchenName: c.kitchenName,
      subject: c.subject,
      category: c.category.replace('_', ' '),
      priority: c.priority.charAt(0) + c.priority.slice(1).toLowerCase(),
      status: c.status.charAt(0) + c.status.slice(1).toLowerCase(),
      time: new Date(c.createdAt).toLocaleString(),
      messages: []
    }));
    return { data: mapped };
  },

  getComplaintById: async (id: string): Promise<{ data: Complaint | undefined }> => {
    const query = `
      query GetComplaint($id: ID!) {
        complaint(id: $id) {
          _id
          customerName
          customerPhone
          kitchenName
          subject
          description
          category
          priority
          status
          createdAt
          messages {
            id
            sender
            text
            time
            isInternal
          }
        }
      }
    `;
    const data = await graphqlClient(query, { id });
    if (!data.complaint) return { data: undefined };

    const c = data.complaint;
    const mapped: Complaint = {
      id: c._id,
      customerName: c.customerName,
      customerPhone: c.customerPhone,
      kitchenName: c.kitchenName,
      subject: c.subject,
      description: c.description,
      category: c.category.replace('_', ' '),
      priority: c.priority.charAt(0) + c.priority.slice(1).toLowerCase(),
      status: c.status.charAt(0) + c.status.slice(1).toLowerCase(),
      time: new Date(c.createdAt).toLocaleString(),
      messages: c.messages.map((m: any) => ({
        ...m,
        time: new Date(m.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }))
    };
    return { data: mapped };
  },

  updateComplaintStatus: async (id: string, status: string): Promise<{ success: true }> => {
    const mutation = `
      mutation UpdateComplaintStatus($id: ID!, $status: ComplaintStatus!) {
        updateComplaintStatus(id: $id, status: $status) {
          _id
          status
        }
      }
    `;
    await graphqlClient(mutation, { id, status: status.toUpperCase() });
    return { success: true };
  },

  addMessage: async (complaintId: string, message: Omit<ComplaintMessage, 'id' | 'time'>): Promise<{ success: true, message: ComplaintMessage }> => {
    const mutation = `
      mutation AddComplaintMessage($id: ID!, $text: String!, $internal: Boolean!) {
        addComplaintMessage(id: $id, text: $text, isInternal: $internal) {
          id
          sender
          text
          time
          isInternal
        }
      }
    `;
    const data = await graphqlClient(mutation, {
      id: complaintId,
      text: message.text,
      internal: !!message.isInternal
    });

    const newMessage = {
      ...data.addComplaintMessage,
      time: new Date(data.addComplaintMessage.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    return { success: true, message: newMessage };
  }
};
