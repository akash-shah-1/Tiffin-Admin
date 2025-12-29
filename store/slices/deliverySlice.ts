
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deliveryApi } from '../../api/deliveryApi';
import { DeliveryPartner } from '../../types';

interface DeliveryState {
  list: DeliveryPartner[];
  loading: boolean;
  saving: boolean;
}

const initialState: DeliveryState = {
  list: [],
  loading: false,
  saving: false,
};

export const fetchDeliveryPartners = createAsyncThunk('delivery/fetchAll', async () => {
  const response = await deliveryApi.getPartners();
  return response.data;
});

export const saveDeliveryPartner = createAsyncThunk('delivery/save', async (partner: Partial<DeliveryPartner>) => {
  const response = await deliveryApi.savePartner(partner);
  return response.data;
});

export const updatePartnerStatus = createAsyncThunk(
  'delivery/updateStatus',
  async ({ id, status }: { id: string; status: DeliveryPartner['status'] }) => {
    await deliveryApi.updateStatus(id, status);
    return { id, status };
  }
);

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryPartners.pending, (state) => { state.loading = true; })
      .addCase(fetchDeliveryPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(saveDeliveryPartner.pending, (state) => { state.saving = true; })
      .addCase(saveDeliveryPartner.fulfilled, (state, action) => {
        state.saving = false;
        const idx = state.list.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        else state.list.unshift(action.payload);
      })
      .addCase(updatePartnerStatus.fulfilled, (state, action) => {
        const partner = state.list.find(p => p.id === action.payload.id);
        if (partner) partner.status = action.payload.status;
      });
  },
});

export default deliverySlice.reducer;
