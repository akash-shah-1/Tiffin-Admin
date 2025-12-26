
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardApi } from '../../api/dashboardApi';

interface DashboardState {
  stats: any[];
  activity: any[];
  revenue: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: [],
  activity: [],
  revenue: null,
  loading: false,
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchAll',
  async () => {
    const [statsRes, activityRes, revenueRes] = await Promise.all([
      dashboardApi.getStats(),
      dashboardApi.getActivity(),
      dashboardApi.getRevenueData(),
    ]);
    return {
      stats: (statsRes as any).data,
      activity: (activityRes as any).data,
      revenue: (revenueRes as any).data,
    };
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
        state.stats = action.payload.stats;
        state.activity = action.payload.activity;
        state.revenue = action.payload.revenue;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch dashboard data';
      });
  },
});

export default dashboardSlice.reducer;
