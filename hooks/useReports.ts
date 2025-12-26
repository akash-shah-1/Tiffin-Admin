
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchDailyReport, fetchMonthlyReport, fetchKitchenReport, setReportType } from '../store/slices/reportsSlice';

export const useReports = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentReport, loading, activeType } = useSelector((state: RootState) => state.reports);

  const getDaily = useCallback((date: string) => dispatch(fetchDailyReport(date)), [dispatch]);
  const getMonthly = useCallback((month: string) => dispatch(fetchMonthlyReport(month)), [dispatch]);
  const getKitchen = useCallback((id: string, range: string) => dispatch(fetchKitchenReport({ id, range })), [dispatch]);
  const changeType = useCallback((type: any) => dispatch(setReportType(type)), [dispatch]);

  const simulateExport = () => {
    alert("Generating encrypted PDF report... Check downloads folder in 3s.");
  };

  return {
    report: currentReport,
    loading,
    activeType,
    getDaily,
    getMonthly,
    getKitchen,
    changeType,
    simulateExport
  };
};
