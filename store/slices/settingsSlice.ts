
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { settingsApi } from '../../api/settingsApi';

interface SettingsState {
  config: any;
  loading: boolean;
  saving: boolean;
}

const initialState: SettingsState = {
  config: null,
  loading: false,
  saving: false,
};

export const fetchSettings = createAsyncThunk('settings/fetch', async () => {
  const response = await settingsApi.getSettings();
  return (response as any).data;
});

export const updateConfig = createAsyncThunk('settings/update', async (newConfig: any) => {
  const response = await settingsApi.updateSettings(newConfig);
  return (response as any).data;
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => { state.loading = true; })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
      })
      .addCase(updateConfig.pending, (state) => { state.saving = true; })
      .addCase(updateConfig.fulfilled, (state, action) => {
        state.saving = false;
        state.config = action.payload;
      });
  },
});

export default settingsSlice.reducer;
