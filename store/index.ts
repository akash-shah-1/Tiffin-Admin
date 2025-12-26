
import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import settingsReducer from './slices/settingsSlice';
import usersReducer from './slices/usersSlice';
import approvalsReducer from './slices/approvalsSlice';
import kitchenReducer from './slices/kitchenSlice';
import ordersReducer from './slices/ordersSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    settings: settingsReducer,
    users: usersReducer,
    approvals: approvalsReducer,
    kitchens: kitchenReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
