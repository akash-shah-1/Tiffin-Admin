
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { reportsApi } from '../../api/reportsApi';
import { ReportStats } from '../../types';

interface ReportsState {
  currentReport: ReportStats | null;
  loading: boolean;
  activeType: 'Daily' | 'Monthly' | 'Kitchen';
}

const initialState: ReportsState = {
  currentReport: null,
  loading: false,
  activeType: 'Daily',
};

export const fetchDailyReport = createAsyncThunk('reports/fetchDaily', async (date: string) => {
  const response = await reportsApi.getDailyReport(date);
  return response.data;
});

export const fetchMonthlyReport = createAsyncThunk('reports/fetchMonthly', async (month: string) => {
  const response = await reportsApi.getMonthlyReport(month);
  return response.data;
});

export const fetchKitchenReport = createAsyncThunk('reports/fetchKitchen', async ({ id, range }: { id: string, range: string }) => {
  const response = await reportsApi.getKitchenReport(id, range);
  return response.data;
});

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReportType: (state, action) => {
      state.activeType = action.payload;
      state.currentReport = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyReport.pending, (state) => { state.loading = true; })
      .addCase(fetchDailyReport.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReport = action.payload;
      })
      .addCase(fetchMonthlyReport.pending, (state) => { state.loading = true; })
      .addCase(fetchMonthlyReport.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReport = action.payload;
      })
      .addCase(fetchKitchenReport.pending, (state) => { state.loading = true; })
      .addCase(fetchKitchenReport.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReport = action.payload;
      });
  },
});

export const { setReportType } = reportsSlice.actions;
export default reportsSlice.reducer;
