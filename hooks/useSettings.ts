
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchSettings, updateConfig } from '../store/slices/settingsSlice';

export const useSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { config, loading, saving } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    if (!config) dispatch(fetchSettings());
  }, [dispatch, config]);

  const saveSettings = (newConfig: any) => {
    dispatch(updateConfig(newConfig));
  };

  return { config, loading, saving, saveSettings };
};
