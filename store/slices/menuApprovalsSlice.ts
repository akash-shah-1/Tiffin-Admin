
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { menuApprovalsApi } from '../../api/menuApprovalsApi';
import { MenuItemApproval } from '../../types';

interface MenuApprovalsState {
  list: MenuItemApproval[];
  loading: boolean;
  activeFilter: 'All' | 'Today' | 'This Week';
}

const initialState: MenuApprovalsState = {
  list: [],
  loading: false,
  activeFilter: 'All',
};

export const fetchMenuApprovals = createAsyncThunk('menuApprovals/fetchAll', async () => {
  const response = await menuApprovalsApi.getApprovals();
  return response.data;
});

export const processMenuApproval = createAsyncThunk(
  'menuApprovals/process',
  async ({ id, status }: { id: string; status: 'Approved' | 'Rejected' }) => {
    await menuApprovalsApi.updateStatus(id, status);
    return { id, status };
  }
);

const menuApprovalsSlice = createSlice({
  name: 'menuApprovals',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuApprovals.pending, (state) => { state.loading = true; })
      .addCase(fetchMenuApprovals.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(processMenuApproval.fulfilled, (state, action) => {
        const item = state.list.find(i => i.id === action.payload.id);
        if (item) item.status = action.payload.status;
      });
  },
});

export const { setFilter } = menuApprovalsSlice.actions;
export default menuApprovalsSlice.reducer;
