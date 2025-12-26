
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchPlans, setTab, processPlan } from '../store/slices/approvalsSlice';

export const useApprovals = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, activeTab } = useSelector((state: RootState) => state.approvals);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const changeTab = (tab: 'Pending' | 'Approved' | 'Rejected') => {
    dispatch(setTab(tab));
  };

  const handleProcess = (id: string, status: 'Approved' | 'Rejected') => {
    dispatch(processPlan({ id, status }));
  };

  const filteredPlans = list.filter(p => p.status === activeTab);

  return { 
    plans: filteredPlans, 
    loading, 
    activeTab, 
    changeTab, 
    handleProcess,
    counts: {
      pending: list.filter(p => p.status === 'Pending').length,
      approved: list.filter(p => p.status === 'Approved').length,
      rejected: list.filter(p => p.status === 'Rejected').length
    }
  };
};
