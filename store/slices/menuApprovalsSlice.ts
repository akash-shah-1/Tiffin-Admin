
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { menuApprovalsApi } from '../../api/menuApprovalsApi';
import { MenuItemApproval } from '../../types';

interface MenuApprovalsState {
  list: MenuItemApproval[];
  currentItem: MenuItemApproval | null;
  loading: boolean;
  activeFilter: 'All' | 'Today' | 'This Week';
}

const initialState: MenuApprovalsState = {
  list: [],
  currentItem: null,
  loading: false,
  activeFilter: 'All',
};

export const fetchMenuApprovals = createAsyncThunk('menuApprovals/fetchAll', async () => {
  const response = await menuApprovalsApi.getApprovals();
  return response.data;
});

export const fetchMenuItemById = createAsyncThunk('menuApprovals/fetchOne', async (id: string) => {
  const response = await menuApprovalsApi.getApprovalById(id);
  return response.data;
});

export const processMenuApproval = createAsyncThunk(
  'menuApprovals/process',
  async ({ id, status, feedback }: { id: string; status: MenuItemApproval['status']; feedback?: any }) => {
    await menuApprovalsApi.updateStatus(id, status, feedback);
    return { id, status, feedback };
  }
);

export const updateMenuItemAdminNotes = createAsyncThunk(
  'menuApprovals/updateNotes',
  async ({ id, notes }: { id: string; notes: string }) => {
    await menuApprovalsApi.saveAdminNotes(id, notes);
    return { id, notes };
  }
);

const menuApprovalsSlice = createSlice({
  name: 'menuApprovals',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCurrentItem: (state) => {
      state.currentItem = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuApprovals.pending, (state) => { state.loading = true; })
      .addCase(fetchMenuApprovals.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMenuItemById.pending, (state) => {
        state.loading = true;
        state.currentItem = null;
      })
      .addCase(fetchMenuItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload || null;
      })
      .addCase(processMenuApproval.fulfilled, (state, action) => {
        const item = state.list.find(i => i.id === action.payload.id);
        if (item) {
            item.status = action.payload.status;
            item.feedback = action.payload.feedback;
        }
        if (state.currentItem?.id === action.payload.id) {
          state.currentItem.status = action.payload.status;
          state.currentItem.feedback = action.payload.feedback;
        }
      })
      .addCase(updateMenuItemAdminNotes.fulfilled, (state, action) => {
        if (state.currentItem?.id === action.payload.id) {
          state.currentItem.adminNotes = action.payload.notes;
        }
      });
  },
});

export const { setFilter, clearCurrentItem } = menuApprovalsSlice.actions;
export default menuApprovalsSlice.reducer;
