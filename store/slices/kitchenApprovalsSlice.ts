
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { kitchenApprovalsApi } from '../../api/kitchenApprovalsApi';
import { KitchenApprovalRequest } from '../../types';

interface KitchenApprovalsState {
  list: KitchenApprovalRequest[];
  currentRequest: KitchenApprovalRequest | null;
  loading: boolean;
  activeFilter: 'All' | 'Today' | 'This Week';
}

const initialState: KitchenApprovalsState = {
  list: [],
  currentRequest: null,
  loading: false,
  activeFilter: 'All',
};

export const fetchRequests = createAsyncThunk('kitchenApprovals/fetchAll', async () => {
  const response = await kitchenApprovalsApi.getRequests();
  return response.data;
});

export const fetchRequestById = createAsyncThunk('kitchenApprovals/fetchOne', async (id: string) => {
  const response = await kitchenApprovalsApi.getRequestById(id);
  return response.data;
});

export const processRequest = createAsyncThunk(
  'kitchenApprovals/process',
  async ({ id, status, feedback }: { id: string; status: KitchenApprovalRequest['status']; feedback?: any }) => {
    await kitchenApprovalsApi.updateStatus(id, status, feedback);
    return { id, status, feedback };
  }
);

const kitchenApprovalsSlice = createSlice({
  name: 'kitchenApprovals',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCurrentRequest: (state) => {
      state.currentRequest = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => { state.loading = true; })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRequestById.pending, (state) => {
        state.loading = true;
        state.currentRequest = null;
      })
      .addCase(fetchRequestById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRequest = action.payload || null;
      })
      .addCase(processRequest.fulfilled, (state, action) => {
        const item = state.list.find(i => i.id === action.payload.id);
        if (item) {
            item.status = action.payload.status;
            item.feedback = action.payload.feedback;
        }
        if (state.currentRequest?.id === action.payload.id) {
          state.currentRequest.status = action.payload.status;
          state.currentRequest.feedback = action.payload.feedback;
        }
      });
  },
});

export const { setFilter, clearCurrentRequest } = kitchenApprovalsSlice.actions;
export default kitchenApprovalsSlice.reducer;
