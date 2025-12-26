
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ordersApi } from '../../api/ordersApi';
import { Order } from '../../types';

interface OrdersState {
  list: Order[];
  currentOrder: Order | null;
  loading: boolean;
  activeTab: 'All' | 'Active' | 'Completed' | 'Cancelled';
  error: string | null;
}

const initialState: OrdersState = {
  list: [],
  currentOrder: null,
  loading: false,
  activeTab: 'All',
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchAll', async () => {
  const response = await ordersApi.getOrders();
  return response.data;
});

export const fetchOrderById = createAsyncThunk('orders/fetchOne', async (id: string) => {
  const response = await ordersApi.getOrderById(id);
  return response.data;
});

export const updateOrderState = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status }: { id: string; status: Order['status'] }) => {
    await ordersApi.updateOrderStatus(id, status);
    return { id, status };
  }
);

export const syncAdminNotes = createAsyncThunk(
  'orders/syncNotes',
  async ({ id, notes }: { id: string; notes: string }) => {
    await ordersApi.saveAdminNotes(id, notes);
    return { id, notes };
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderTab: (state, action) => {
      state.activeTab = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload || null;
      })
      .addCase(updateOrderState.fulfilled, (state, action) => {
        const order = state.list.find(o => o.id === action.payload.id);
        if (order) order.status = action.payload.status;
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder.status = action.payload.status;
        }
      })
      .addCase(syncAdminNotes.fulfilled, (state, action) => {
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder.adminNotes = action.payload.notes;
        }
      });
  },
});

export const { setOrderTab, clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
