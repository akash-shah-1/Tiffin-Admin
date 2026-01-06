
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardApi } from '../../api/dashboardApi';

interface DashboardState {
  metrics: any | null;
  quickStats: any | null;
  revenueData: any[];
  monthlyRevenue: any[];
  orderStatusDistribution: any[];
  categoryDistribution: any[];
  activity: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  metrics: null,
  quickStats: null,
  revenueData: [],
  monthlyRevenue: [],
  orderStatusDistribution: [],
  categoryDistribution: [],
  activity: [],
  loading: false,
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchAll',
  async () => {
    const response = await dashboardApi.getStats();
    return (response as any).data;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload.metrics;
        state.quickStats = action.payload.quickStats;
        state.revenueData = action.payload.revenueData;
        state.monthlyRevenue = action.payload.monthlyRevenue;
        state.orderStatusDistribution = action.payload.orderStatusDistribution;
        state.categoryDistribution = action.payload.categoryDistribution;
        state.activity = action.payload.activity;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch dashboard data';
      });
  },
});

export default dashboardSlice.reducer;
