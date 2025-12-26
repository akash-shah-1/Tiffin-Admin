
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchDashboardData } from '../store/slices/dashboardSlice';

export const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, activity, revenue, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    if (stats.length === 0) {
      dispatch(fetchDashboardData());
    }
  }, [dispatch, stats.length]);

  const refreshData = () => {
    dispatch(fetchDashboardData());
  };

  return { stats, activity, revenue, loading, error, refreshData };
};
