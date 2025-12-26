
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchSettlements, fetchSettlementById, markAsPaid, setPaymentFilter, clearCurrentSettlement } from '../store/slices/paymentsSlice';

export const usePayments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { settlements, currentSettlement, loading, processing, activeFilter } = useSelector((state: RootState) => state.payments);

  useEffect(() => {
    if (settlements.length === 0) dispatch(fetchSettlements());
  }, [dispatch, settlements.length]);

  const changeFilter = useCallback((filter: any) => dispatch(setPaymentFilter(filter)), [dispatch]);
  const getSettlement = useCallback((id: string) => dispatch(fetchSettlementById(id)), [dispatch]);
  const processPayout = useCallback((id: string) => dispatch(markAsPaid(id)), [dispatch]);
  const resetSelection = useCallback(() => dispatch(clearCurrentSettlement()), [dispatch]);

  const filtered = settlements.filter(s => {
    if (activeFilter === 'All') return true;
    return s.status === activeFilter;
  });

  return {
    settlements: filtered,
    allSettlements: settlements,
    currentSettlement,
    loading,
    processing,
    activeFilter,
    changeFilter,
    getSettlement,
    processPayout,
    resetSelection,
    stats: {
      totalRevenue: settlements.reduce((acc, curr) => acc + curr.totalAmount, 0),
      pendingPayouts: settlements.filter(s => s.status === 'Pending').reduce((acc, curr) => acc + curr.payoutAmount, 0),
      processedPayouts: settlements.filter(s => s.status === 'Completed').reduce((acc, curr) => acc + curr.payoutAmount, 0),
      pendingCount: settlements.filter(s => s.status === 'Pending').length
    }
  };
};
