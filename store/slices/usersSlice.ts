
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersApi } from '../../api/usersApi';
import { User } from '../../types';

interface UsersState {
  list: User[];
  currentUser: User | null;
  loading: boolean;
  saving: boolean;
  currentType: 'Customer' | 'Seller';
}

const initialState: UsersState = {
  list: [],
  currentUser: null,
  loading: false,
  saving: false,
  currentType: 'Customer',
};

export const fetchUsers = createAsyncThunk('users/fetchAll', async (type: string) => {
  const response = await usersApi.getUsers(type);
  return response.data;
});

export const fetchUserById = createAsyncThunk('users/fetchOne', async (id: string) => {
  const response = await usersApi.getUserById(id);
  return response.data;
});

export const saveUser = createAsyncThunk('users/save', async (user: Partial<User>) => {
  const response = await usersApi.saveUser(user);
  return response.data;
});

export const toggleStatus = createAsyncThunk('users/toggleStatus', async ({ id, status }: { id: string, status: User['status'] }) => {
  await usersApi.toggleUserStatus(id, status);
  return { id, status };
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSegment: (state, action) => {
      state.currentType = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.currentUser = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload || null;
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.loading = false;
        state.currentUser = null;
      })
      .addCase(saveUser.pending, (state) => { state.saving = true; })
      .addCase(saveUser.fulfilled, (state, action) => {
        state.saving = false;
        state.currentUser = action.payload;
        const index = state.list.findIndex(u => u.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        const user = state.list.find(u => u.id === action.payload.id);
        if (user) user.status = action.payload.status;
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser.status = action.payload.status;
        }
      });
  },
});

export const { setSegment, clearCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
