import { graphqlClient } from './graphqlClient';

export const settingsApi = {
  getSettings: async () => {
    const query = `
      query GetSettings {
        settings {
          profile { name email phone }
          platform { name supportEmail minOrderValue defaultCommission }
          operations { openingTime closingTime serviceAreas taxRate }
          appConfig { enableCOD enableOnlinePayment enableOrderRating enableKitchenRating }
          maintenanceMode
        }
      }
    `;
    const data = await graphqlClient(query);
    return { data: data.settings };
  },
  updateSettings: async (settings: any) => {
    const mutation = `
      mutation UpdateSettings($input: UpdateSettingsInput!) {
        updateSettings(updateSettingsInput: $input) {
          profile { name email phone }
          platform { name supportEmail minOrderValue defaultCommission }
          operations { openingTime closingTime serviceAreas taxRate }
          appConfig { enableCOD enableOnlinePayment enableOrderRating enableKitchenRating }
          maintenanceMode
        }
      }
    `;

    // The backend expect UpdateSettingsInput which has the same structure
    const data = await graphqlClient(mutation, { input: settings });
    return { data: data.updateSettings };
  }
};
