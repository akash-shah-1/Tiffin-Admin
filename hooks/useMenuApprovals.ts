
import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { 
  fetchMenuApprovals, 
  fetchMenuItemById, 
  processMenuApproval, 
  updateMenuItemAdminNotes,
  setFilter, 
  clearCurrentItem 
} from '../store/slices/menuApprovalsSlice';
import { MenuItemApproval } from '../types';

export const useMenuApprovals = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, currentItem, loading, activeFilter } = useSelector((state: RootState) => state.menuApprovals);

  useEffect(() => {
    if (list.length === 0) dispatch(fetchMenuApprovals());
  }, [dispatch, list.length]);

  const getItem = useCallback((id: string) => dispatch(fetchMenuItemById(id)), [dispatch]);
  
  const approveItem = useCallback((id: string) => 
    dispatch(processMenuApproval({ id, status: 'Approved' })), [dispatch]);
    
  const rejectItem = useCallback((id: string, reasons: string[], comments: string) => 
    dispatch(processMenuApproval({ id, status: 'Rejected', feedback: { reasons, comments } })), [dispatch]);
    
  const requestChanges = useCallback((id: string, reasons: string[], comments: string) => 
    dispatch(processMenuApproval({ id, status: 'Changes Requested', feedback: { reasons, comments } })), [dispatch]);

  const saveNotes = useCallback((id: string, notes: string) => 
    dispatch(updateMenuItemAdminNotes({ id, notes })), [dispatch]);

  const changeFilter = useCallback((f: any) => dispatch(setFilter(f)), [dispatch]);
  const resetSelection = useCallback(() => dispatch(clearCurrentItem()), [dispatch]);

  const filteredList = useMemo(() => {
    return list.filter(item => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Today') return item.submittedAt.includes('2024-05-25');
      return true;
    });
  }, [list, activeFilter]);

  const stats = useMemo(() => ({
    pending: list.filter(i => i.status === 'Pending').length,
    approvedToday: 12, 
    rejectedToday: 2,  
    totalItems: list.length + 850 
  }), [list]);

  return {
    list: filteredList,
    currentItem,
    loading,
    activeFilter,
    changeFilter,
    approveItem,
    rejectItem,
    requestChanges,
    saveNotes,
    getItem,
    resetSelection,
    stats
  };
};
