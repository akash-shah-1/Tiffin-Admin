
import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { 
  fetchRequests, 
  fetchRequestById, 
  processRequest, 
  setFilter, 
  clearCurrentRequest 
} from '../store/slices/kitchenApprovalsSlice';

export const useKitchenApprovals = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, currentRequest, loading, activeFilter } = useSelector((state: RootState) => state.kitchenApprovals);

  useEffect(() => {
    if (list.length === 0) dispatch(fetchRequests());
  }, [dispatch, list.length]);

  const getRequest = useCallback((id: string) => dispatch(fetchRequestById(id)), [dispatch]);
  
  const approveKitchen = useCallback((id: string) => 
    dispatch(processRequest({ id, status: 'Approved' })), [dispatch]);
    
  const rejectKitchen = useCallback((id: string, reasons: string[], comments: string) => 
    dispatch(processRequest({ id, status: 'Rejected', feedback: { reasons, comments } })), [dispatch]);
    
  const requestChanges = useCallback((id: string, reasons: string[], comments: string) => 
    dispatch(processRequest({ id, status: 'Changes Requested', feedback: { reasons, comments } })), [dispatch]);

  const changeFilter = useCallback((f: any) => dispatch(setFilter(f)), [dispatch]);
  const resetSelection = useCallback(() => dispatch(clearCurrentRequest()), [dispatch]);

  const filteredList = useMemo(() => {
    return list.filter(item => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Today') return item.submittedAt.includes('2024-05-25');
      return true;
    });
  }, [list, activeFilter]);

  const stats = useMemo(() => ({
    pending: list.filter(i => i.status === 'Pending').length,
    total: list.length + 42 // Simulated total historical requests
  }), [list]);

  return {
    list: filteredList,
    currentRequest,
    loading,
    activeFilter,
    changeFilter,
    approveKitchen,
    rejectKitchen,
    requestChanges,
    getRequest,
    resetSelection,
    stats
  };
};
