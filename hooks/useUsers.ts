
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchUsers, fetchUserById, setSegment, toggleStatus, saveUser, clearCurrentUser } from '../store/slices/usersSlice';
import { User } from '../types';

export const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, currentUser, loading, saving, currentType } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (list.length === 0) dispatch(fetchUsers(currentType));
  }, [dispatch, currentType, list.length]);

  const changeSegment = useCallback((type: 'Customer' | 'Seller') => {
    dispatch(setSegment(type));
  }, [dispatch]);

  const getProfile = useCallback((id: string) => dispatch(fetchUserById(id)), [dispatch]);
  
  const updateProfile = useCallback((user: Partial<User>) => dispatch(saveUser(user)), [dispatch]);

  const handleToggleStatus = useCallback((id: string, currentStatus: User['status']) => {
    const newStatus = currentStatus === 'Active' ? 'Deactivated' : 'Active';
    dispatch(toggleStatus({ id, status: newStatus }));
  }, [dispatch]);

  const resetSelection = useCallback(() => dispatch(clearCurrentUser()), [dispatch]);

  return { 
    list, 
    currentUser,
    loading, 
    saving,
    currentType, 
    changeSegment, 
    handleToggleStatus, 
    getProfile, 
    updateProfile,
    resetSelection 
  };
};
