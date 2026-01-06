import { graphqlClient } from './graphqlClient';

export const approvalsApi = {
  getPlans: async () => {
    // In our backend, we can filter plans by status PENDING
    const query = `
      query GetPendingPlans {
        plans(status: PENDING) {
          _id
          name
          description
          kitchenId
          price
          duration
          mealType
          status
          image
        }
      }
    `;
    const data = await graphqlClient(query);
    const mapped = data.plans.map((p: any) => ({
      ...p,
      id: p._id,
      status: 'Pending' // Standardizing for frontend
    }));
    return { data: mapped };
  },

  updatePlanStatus: async (id: string, status: 'Approved' | 'Rejected', feedback?: string) => {
    let mutation = '';
    if (status === 'Approved') {
      mutation = `
        mutation ApprovePlan($id: ID!) {
          approvePlan(id: $id) { _id status }
        }
      `;
    } else {
      mutation = `
        mutation RejectPlan($id: ID!, $reason: String!) {
          rejectPlan(id: $id, reason: $reason) { _id status }
        }
      `;
    }

    await graphqlClient(mutation, { id, reason: feedback || 'Does not meet standards' });
    return { success: true, id, status };
  }
};
