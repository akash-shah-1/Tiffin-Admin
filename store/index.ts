
import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import settingsReducer from './slices/settingsSlice';
import usersReducer from './slices/usersSlice';
import kitchenReducer from './slices/kitchenSlice';
import paymentsReducer from './slices/paymentsSlice';
import complaintsReducer from './slices/complaintsSlice';
import reportsReducer from './slices/reportsSlice';
import kitchenApprovalsReducer from './slices/kitchenApprovalsSlice';
import ordersReducer from './slices/ordersSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    settings: settingsReducer,
    users: usersReducer,
    kitchens: kitchenReducer,
    payments: paymentsReducer,
    complaints: complaintsReducer,
    reports: reportsReducer,
    kitchenApprovals: kitchenApprovalsReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
