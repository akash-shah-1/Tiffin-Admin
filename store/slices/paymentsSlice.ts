
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { paymentsApi } from '../../api/paymentsApi';
import { Settlement } from '../../types';

interface PaymentsState {
  settlements: Settlement[];
  currentSettlement: Settlement | null;
  loading: boolean;
  processing: boolean;
  activeFilter: 'All' | 'Pending' | 'Completed';
}

const initialState: PaymentsState = {
  settlements: [],
  currentSettlement: null,
  loading: false,
  processing: false,
  activeFilter: 'All',
};

export const fetchSettlements = createAsyncThunk('payments/fetchAll', async () => {
  const response = await paymentsApi.getSettlements();
  return response.data;
});

export const fetchSettlementById = createAsyncThunk('payments/fetchOne', async (id: string) => {
  const response = await paymentsApi.getSettlementById(id);
  return response.data;
});

export const markAsPaid = createAsyncThunk('payments/markAsPaid', async (id: string) => {
  await paymentsApi.processSettlement(id);
  return id;
});

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setPaymentFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCurrentSettlement: (state) => {
      state.currentSettlement = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettlements.pending, (state) => { state.loading = true; })
      .addCase(fetchSettlements.fulfilled, (state, action) => {
        state.loading = false;
        state.settlements = action.payload;
      })
      .addCase(fetchSettlementById.pending, (state) => {
        state.loading = true;
        state.currentSettlement = null;
      })
      .addCase(fetchSettlementById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSettlement = action.payload || null;
      })
      .addCase(markAsPaid.pending, (state) => { state.processing = true; })
      .addCase(markAsPaid.fulfilled, (state, action) => {
        state.processing = false;
        const index = state.settlements.findIndex(s => s.id === action.payload);
        if (index !== -1) {
          state.settlements[index].status = 'Completed';
        }
        if (state.currentSettlement?.id === action.payload) {
          state.currentSettlement.status = 'Completed';
          state.currentSettlement.processedAt = new Date().toLocaleString();
        }
      });
  },
});

export const { setPaymentFilter, clearCurrentSettlement } = paymentsSlice.actions;
export default paymentsSlice.reducer;
