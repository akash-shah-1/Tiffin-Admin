
import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchDeliveryPartners, saveDeliveryPartner, updatePartnerStatus } from '../store/slices/deliverySlice';

export const useDelivery = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, saving } = useSelector((state: RootState) => state.delivery);

  useEffect(() => {
    if (list.length === 0) dispatch(fetchDeliveryPartners());
  }, [dispatch, list.length]);

  const setStatus = useCallback((id: string, status: any) => dispatch(updatePartnerStatus({ id, status })), [dispatch]);
  const persist = useCallback((data: any) => dispatch(saveDeliveryPartner(data)), [dispatch]);

  const stats = useMemo(() => ({
    total: list.length,
    online: list.filter(p => p.status === 'Online').length,
    todayDeliveries: list.reduce((acc, curr) => acc + curr.todayDeliveries, 0),
    avgTime: '24 mins' // Simulated
  }), [list]);

  return { list, loading, saving, setStatus, persist, stats };
};
