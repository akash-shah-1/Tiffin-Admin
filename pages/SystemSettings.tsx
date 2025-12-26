
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';

const SystemSettings: React.FC = () => {
  const navigate = useNavigate();
  const { config, loading, saving, saveSettings } = useSettings();
  const [localConfig, setLocalConfig] = useState<any>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') as 'light' | 'dark' || 'dark'
  );

  useEffect(() => {
    if (config) setLocalConfig(config);
  }, [config]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleUpdate = (key: string, value: any) => {
    setLocalConfig({ ...localConfig, [key]: value });
  };

  const onSave = () => {
    saveSettings(localConfig);
  };

  if (loading || !localConfig) {
    return (
      <div className="h-full w-full flex items-center justify-center p-20">
        <div className="size-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto pb-24 animate-in fade-in duration-500">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">System Configuration</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Global logic & threshold management</p>
        </div>
        <button 
          onClick={onSave}
          disabled={saving}
          className="bg-primary hover:bg-primary-hover text-white font-bold uppercase tracking-wider px-6 py-2 rounded-md transition-all text-xs disabled:opacity-50 shadow-sm"
        >
          {saving ? 'Syncing...' : 'Update Config'}
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {/* Appearance Section */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
             <span className="material-symbols-outlined text-primary text-[20px]">palette</span>
             <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">Interface Theme</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setTheme('light')}
              className={`flex items-center justify-center gap-3 py-3 border rounded-md transition-all text-xs font-bold ${
                theme === 'light' 
                  ? 'bg-primary/5 border-primary text-primary' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">light_mode</span>
              Light Mode
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`flex items-center justify-center gap-3 py-3 border rounded-md transition-all text-xs font-bold ${
                theme === 'dark' 
                  ? 'bg-primary/5 border-primary text-primary' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">dark_mode</span>
              Dark Mode
            </button>
          </div>
        </section>

        {/* Global Parameters */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
             <span className="material-symbols-outlined text-primary text-[20px]">hub</span>
             <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">Business Logic</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Boundary (KM)</label>
              <input 
                type="text" 
                value={localConfig.deliveryRadius}
                onChange={(e) => handleUpdate('deliveryRadius', e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Tax (%)</label>
              <input 
                type="text" 
                value={localConfig.taxRate}
                onChange={(e) => handleUpdate('taxRate', e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-md">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">Maintenance Protocol</p>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Suspend all transaction processing</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={localConfig.maintenanceMode} 
                onChange={(e) => handleUpdate('maintenanceMode', e.target.checked)}
              />
              <div className="w-11 h-6 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SystemSettings;