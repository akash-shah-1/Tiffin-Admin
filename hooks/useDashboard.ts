
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchDashboardData } from '../store/slices/dashboardSlice';

export const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    metrics,
    quickStats,
    revenueData,
    monthlyRevenue,
    orderStatusDistribution,
    categoryDistribution,
    activity,
    loading,
    error
  } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    if (!metrics) {
      dispatch(fetchDashboardData());
    }
  }, [dispatch, metrics]);

  const refreshData = useCallback(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return {
    metrics,
    quickStats,
    revenueData,
    monthlyRevenue,
    orderStatusDistribution,
    categoryDistribution,
    activity,
    loading,
    error,
    refreshData
  };
};
