
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchKitchens, fetchKitchenById, updateStatus, saveKitchen, clearCurrentKitchen } from '../store/slices/kitchenSlice';
import { Kitchen } from '../types';

export const useKitchens = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, currentKitchen, loading, saving, error } = useSelector((state: RootState) => state.kitchens);

  useEffect(() => {
    if (list.length === 0) dispatch(fetchKitchens());
  }, [dispatch, list.length]);

  const getKitchen = useCallback((id: string) => dispatch(fetchKitchenById(id)), [dispatch]);
  const setStatus = useCallback((id: string, status: Kitchen['status']) => dispatch(updateStatus({ id, status })), [dispatch]);
  const persistKitchen = useCallback((kitchen: Partial<Kitchen>) => dispatch(saveKitchen(kitchen)), [dispatch]);
  const resetSelection = useCallback(() => dispatch(clearCurrentKitchen()), [dispatch]);

  return { 
    list, 
    currentKitchen, 
    loading, 
    saving, 
    error, 
    getKitchen, 
    setStatus, 
    persistKitchen, 
    resetSelection,
    counts: {
      active: list.filter(k => k.status === 'Active').length,
      pending: list.filter(k => k.status === 'Pending').length,
      inactive: list.filter(k => k.status === 'Inactive').length,
    }
  };
};
