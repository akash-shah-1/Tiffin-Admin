
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchOrders, fetchOrderById, setOrderTab, updateOrderState, syncAdminNotes, clearCurrentOrder } from '../store/slices/ordersSlice';
import { Order } from '../types';

export const useOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, currentOrder, loading, activeTab } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    if (list.length === 0) dispatch(fetchOrders());
  }, [dispatch, list.length]);

  const changeTab = useCallback((tab: any) => dispatch(setOrderTab(tab)), [dispatch]);
  const getOrder = useCallback((id: string) => dispatch(fetchOrderById(id)), [dispatch]);
  const updateStatus = useCallback((id: string, status: Order['status']) => dispatch(updateOrderState({ id, status })), [dispatch]);
  const saveNotes = useCallback((id: string, notes: string) => dispatch(syncAdminNotes({ id, notes })), [dispatch]);
  const resetOrder = useCallback(() => dispatch(clearCurrentOrder()), [dispatch]);
  const refreshOrders = useCallback(() => dispatch(fetchOrders()), [dispatch]);

  const filteredOrders = list.filter(o => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Active') return ['Preparing', 'Out for Delivery', 'Placed', 'Accepted'].includes(o.status);
    if (activeTab === 'Completed') return o.status === 'Delivered';
    if (activeTab === 'Cancelled') return o.status === 'Cancelled';
    return true;
  });

  return { 
    list: filteredOrders, 
    allOrders: list,
    currentOrder, 
    loading, 
    activeTab, 
    changeTab, 
    getOrder, 
    updateStatus, 
    saveNotes, 
    resetOrder,
    refreshOrders
  };
};
