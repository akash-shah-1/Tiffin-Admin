
import { useEffect } from 'react';
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

  const changeSegment = (type: 'Customer' | 'Seller') => {
    dispatch(setSegment(type));
  };

  const getProfile = (id: string) => dispatch(fetchUserById(id));
  
  const updateProfile = (user: Partial<User>) => dispatch(saveUser(user));

  const handleToggleStatus = (id: string, currentStatus: User['status']) => {
    const newStatus = currentStatus === 'Active' ? 'Deactivated' : 'Active';
    dispatch(toggleStatus({ id, status: newStatus }));
  };

  const resetSelection = () => dispatch(clearCurrentUser());

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
