
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { kitchenApi } from '../../api/kitchenApi';
import { Kitchen } from '../../types';

interface KitchenState {
  list: Kitchen[];
  currentKitchen: Kitchen | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
}

const initialState: KitchenState = {
  list: [],
  currentKitchen: null,
  loading: false,
  saving: false,
  error: null,
};

export const fetchKitchens = createAsyncThunk('kitchens/fetchAll', async () => {
  const response = await kitchenApi.getKitchens();
  return response.data;
});

export const fetchKitchenById = createAsyncThunk('kitchens/fetchOne', async (id: string) => {
  const response = await kitchenApi.getKitchenById(id);
  return response.data;
});

export const updateStatus = createAsyncThunk(
  'kitchens/updateStatus',
  async ({ id, status }: { id: string; status: Kitchen['status'] }) => {
    await kitchenApi.updateKitchenStatus(id, status);
    return { id, status };
  }
);

export const saveKitchen = createAsyncThunk(
  'kitchens/save',
  async (kitchen: Partial<Kitchen>) => {
    const response = await kitchenApi.saveKitchen(kitchen);
    return response.data;
  }
);

const kitchenSlice = createSlice({
  name: 'kitchens',
  initialState,
  reducers: {
    clearCurrentKitchen: (state) => {
      state.currentKitchen = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKitchens.pending, (state) => { state.loading = true; })
      .addCase(fetchKitchens.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchKitchenById.fulfilled, (state, action) => {
        state.currentKitchen = action.payload || null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        const kitchen = state.list.find(k => k.id === action.payload.id);
        if (kitchen) kitchen.status = action.payload.status;
        if (state.currentKitchen?.id === action.payload.id) {
          state.currentKitchen.status = action.payload.status;
        }
      })
      .addCase(saveKitchen.pending, (state) => { state.saving = true; })
      .addCase(saveKitchen.fulfilled, (state, action) => {
        state.saving = false;
        const index = state.list.findIndex(k => k.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.unshift(action.payload);
        }
      });
  },
});

export const { clearCurrentKitchen } = kitchenSlice.actions;
export default kitchenSlice.reducer;