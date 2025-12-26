
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { approvalsApi } from '../../api/approvalsApi';

interface ApprovalsState {
  list: any[];
  loading: boolean;
  activeTab: 'Pending' | 'Approved' | 'Rejected';
}

const initialState: ApprovalsState = {
  list: [],
  loading: false,
  activeTab: 'Pending',
};

export const fetchPlans = createAsyncThunk('approvals/fetch', async () => {
  const response = await approvalsApi.getPlans();
  return (response as any).data;
});

export const processPlan = createAsyncThunk(
  'approvals/process',
  async ({ id, status }: { id: string, status: 'Approved' | 'Rejected' }) => {
    await approvalsApi.updatePlanStatus(id, status);
    return { id, status };
  }
);

const approvalsSlice = createSlice({
  name: 'approvals',
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.activeTab = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => { state.loading = true; })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(processPlan.fulfilled, (state, action) => {
        const plan = state.list.find(p => p.id === action.payload.id);
        if (plan) plan.status = action.payload.status;
      });
  },
});

export const { setTab } = approvalsSlice.actions;
export default approvalsSlice.reducer;
