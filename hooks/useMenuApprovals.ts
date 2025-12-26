
import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchMenuApprovals, processMenuApproval, setFilter } from '../store/slices/menuApprovalsSlice';

export const useMenuApprovals = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, activeFilter } = useSelector((state: RootState) => state.menuApprovals);

  useEffect(() => {
    if (list.length === 0) dispatch(fetchMenuApprovals());
  }, [dispatch, list.length]);

  const approveItem = useCallback((id: string) => dispatch(processMenuApproval({ id, status: 'Approved' })), [dispatch]);
  const rejectItem = useCallback((id: string) => dispatch(processMenuApproval({ id, status: 'Rejected' })), [dispatch]);
  const changeFilter = useCallback((f: any) => dispatch(setFilter(f)), [dispatch]);

  const filteredList = useMemo(() => {
    return list.filter(item => {
      const isPending = item.status === 'Pending';
      if (!isPending) return false;
      
      if (activeFilter === 'All') return true;
      // Simple string match for mock dates
      if (activeFilter === 'Today') return item.submittedAt.includes('2024-05-25');
      return true;
    });
  }, [list, activeFilter]);

  const stats = useMemo(() => ({
    pending: list.filter(i => i.status === 'Pending').length,
    approvedToday: 12, // Simulated
    rejectedToday: 2,  // Simulated
    totalItems: list.length + 850 // Simulated base
  }), [list]);

  return {
    list: filteredList,
    loading,
    activeFilter,
    changeFilter,
    approveItem,
    rejectItem,
    stats
  };
};
