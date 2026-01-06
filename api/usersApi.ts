import { graphqlClient } from './graphqlClient';
import { User } from '../types';

export const usersApi = {
  getUsers: async (type: string = 'All'): Promise<{ data: User[] }> => {
    const query = `
      query GetUsers($type: UserType) {
        users(type: $type) {
          _id
          name
          email
          phone
          type
          status
          addresses
          totalSpent
          ordersCount
          joinedAt: createdAt
          adminNotes
        }
      }
    `;

    // Convert 'Customer' to 'CUSTOMER', etc. or handle 'All'
    let userType: string | null = null;
    if (type === 'Customer') userType = 'CUSTOMER';
    else if (type === 'Seller') userType = 'SELLER';

    const data = await graphqlClient(query, { type: userType });

    // Map _id to id for frontend compatibility
    const mappedUsers = data.users.map((u: any) => ({
      ...u,
      id: u._id,
      joinedAt: new Date(u.joinedAt).toISOString().split('T')[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=16a34a&color=fff`,
    }));

    return { data: mappedUsers };
  },

  getUserById: async (id: string): Promise<{ data: User | undefined }> => {
    const query = `
      query GetUser($id: ID!) {
        user(id: $id) {
          _id
          name
          email
          phone
          type
          status
          addresses
          totalSpent
          ordersCount
          joinedAt: createdAt
          adminNotes
        }
      }
    `;
    const data = await graphqlClient(query, { id });
    if (!data.user) return { data: undefined };

    const user = {
      ...data.user,
      id: data.user._id,
      joinedAt: new Date(data.user.joinedAt).toISOString().split('T')[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.name)}&background=16a34a&color=fff`,
    };

    return { data: user };
  },

  toggleUserStatus: async (id: string, status: string): Promise<{ success: true }> => {
    const mutation = `
      mutation UpdateUserStatus($input: UpdateUserInput!) {
        updateUser(updateUserInput: $input) {
          _id
          status
        }
      }
    `;
    // Map 'Active'/'Suspended' to backend enums if needed
    // Assuming backend uses UserStatus enum ACTIVE, SUSPENDED
    const backendStatus = status.toUpperCase();

    await graphqlClient(mutation, { input: { id, status: backendStatus } });
    return { success: true };
  },

  saveUser: async (userData: Partial<User>): Promise<{ success: true, data: User }> => {
    const mutation = `
      mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(updateUserInput: $input) {
          _id
          name
          email
          phone
          status
          adminNotes
        }
      }
    `;

    // Clean up data for UpdateUserInput
    const input: any = { id: userData.id };
    if (userData.name) input.name = userData.name;
    if (userData.email) input.email = userData.email;
    if (userData.phone) input.phone = userData.phone;
    if (userData.status) input.status = userData.status.toUpperCase();
    if (userData.adminNotes) input.adminNotes = userData.adminNotes;

    const data = await graphqlClient(mutation, { input });
    const user = {
      ...data.updateUser,
      id: data.updateUser._id,
    } as User;

    return { success: true, data: user };
  }
};
