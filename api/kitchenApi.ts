import { graphqlClient } from './graphqlClient';
import { Kitchen } from '../types';

export const kitchenApi = {
  getKitchens: async (): Promise<{ data: Kitchen[] }> => {
    const query = `
      query GetKitchens {
        kitchens {
          _id
          name
          ownerName
          ownerId
          phone
          email
          address
          fssai
          status
          rating
          totalOrders
          revenue
          commissionRate
          logo
          photos
          createdAt
        }
      }
    `;
    const data = await graphqlClient(query);
    const mapped = data.kitchens.map((k: any) => ({
      ...k,
      id: k._id,
      joinedAt: new Date(k.createdAt).toISOString().split('T')[0],
      menuItems: [] // We might need a separate query for menu items if used
    }));
    return { data: mapped };
  },

  getKitchenById: async (id: string): Promise<{ data: Kitchen | undefined }> => {
    const query = `
      query GetKitchen($id: ID!) {
        kitchen(id: $id) {
          _id
          name
          ownerName
          ownerId
          phone
          email
          address
          fssai
          status
          rating
          totalOrders
          revenue
          commissionRate
          logo
          photos
          createdAt
        }
      }
    `;
    const data = await graphqlClient(query, { id });
    if (!data.kitchen) return { data: undefined };

    const mapped = {
      ...data.kitchen,
      id: data.kitchen._id,
      joinedAt: new Date(data.kitchen.createdAt).toISOString().split('T')[0],
      menuItems: []
    };
    return { data: mapped };
  },

  updateKitchenStatus: async (id: string, status: string): Promise<{ success: true }> => {
    const mutation = `
      mutation UpdateKitchenStatus($id: ID!, $status: KitchenStatus!) {
        updateKitchen(updateKitchenInput: { id: $id, status: $status }) {
          _id
          status
        }
      }
    `;
    await graphqlClient(mutation, { id, status: status.toUpperCase() });
    return { success: true };
  },

  saveKitchen: async (kitchen: Partial<Kitchen>): Promise<{ success: true, data: Kitchen }> => {
    const mutation = `
      mutation UpdateKitchen($input: UpdateKitchenInput!) {
        updateKitchen(updateKitchenInput: $input) {
          _id
          name
          ownerName
          phone
          email
          address
          status
          commissionRate
        }
      }
    `;

    const input: any = { id: kitchen.id };
    if (kitchen.name) input.name = kitchen.name;
    if (kitchen.ownerName) input.ownerName = kitchen.ownerName;
    if (kitchen.phone) input.phone = kitchen.phone;
    if (kitchen.email) input.email = kitchen.email;
    if (kitchen.address) input.address = kitchen.address;
    if (kitchen.commissionRate) input.commissionRate = kitchen.commissionRate;
    if (kitchen.status) input.status = kitchen.status.toUpperCase();

    const data = await graphqlClient(mutation, { input });
    const mapped = {
      ...data.updateKitchen,
      id: data.updateKitchen._id,
    } as Kitchen;

    return { success: true, data: mapped };
  }
};