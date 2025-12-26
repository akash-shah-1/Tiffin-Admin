
import React, { useState, useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';

const SettingsSkeleton = () => (
  <div className="p-4 md:p-8 space-y-8 animate-pulse">
    <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-6">
       <div className="space-y-2">
         <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
         <div className="h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded"></div>
       </div>
       <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
    </div>
    <div className="flex gap-1 overflow-hidden">
       {Array.from({ length: 4 }).map((_, i) => (
         <div key={i} className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
       ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div className="h-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md"></div>
       <div className="h-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md"></div>
    </div>
  </div>
);

const SystemSettings: React.FC = () => {
  const { config, loading, saving, saveSettings } = useSettings();
  const [localConfig, setLocalConfig] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'Profile' | 'Platform' | 'Operations' | 'App Config'>('Profile');
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

  const handleUpdate = (section: string, key: string, value: any) => {
    setLocalConfig({
      ...localConfig,
      [section]: {
        ...localConfig[section],
        [key]: value
      }
    });
  };

  const handleRootUpdate = (key: string, value: any) => {
    setLocalConfig({ ...localConfig, [key]: value });
  };

  const onSave = () => {
    saveSettings(localConfig);
  };

  if (loading || !localConfig) {
    return <SettingsSkeleton />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-in fade-in duration-300">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-2">Administrator Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Admin Name</label>
                <input 
                  value={localConfig.profile.name}
                  onChange={(e) => handleUpdate('profile', 'name', e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  value={localConfig.profile.email}
                  onChange={(e) => handleUpdate('profile', 'email', e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                <input 
                  value={localConfig.profile.phone}
                  onChange={(e) => handleUpdate('profile', 'phone', e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Access Level</label>
                <input 
                  disabled
                  value="Super Administrator"
                  className="w-full h-10 px-3 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-400"
                />
              </div>
            </div>
            <div className="pt-4 border-t dark:border-slate-800">
               <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-1">
                 <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                 Change Security Password
               </button>
            </div>
          </section>
        );
      case 'Platform':
        return (
          <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-in fade-in duration-300">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-2">Platform Meta & Defaults</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Platform Name</label>
                <input 
                  value={localConfig.platform.name}
                  onChange={(e) => handleUpdate('platform', 'name', e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Support Email</label>
                <input 
                  value={localConfig.platform.supportEmail}
                  onChange={(e) => handleUpdate('platform', 'supportEmail', e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Default Commission (%)</label>
                <input 
                  type="number"
                  value={localConfig.platform.defaultCommission}
                  onChange={(e) => handleUpdate('platform', 'defaultCommission', e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Min Order Value (₹)</label>
                <input 
                  type="number"
                  value={localConfig.platform.minOrderValue}
                  onChange={(e) => handleUpdate('platform', 'minOrderValue', e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>
          </section>
        );
      case 'Operations':
        return (
          <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-in fade-in duration-300">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-2">Operating Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Service Start Time</label>
                <input 
                  type="time"
                  value={localConfig.operations.openingTime}
                  onChange={(e) => handleUpdate('operations', 'openingTime', e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Service End Time</label>
                <input 
                  type="time"
                  value={localConfig.operations.closingTime}
                  onChange={(e) => handleUpdate('operations', 'closingTime', e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Tax / GST Rate (%)</label>
                <input 
                  type="number"
                  value={localConfig.operations.taxRate}
                  onChange={(e) => handleUpdate('operations', 'taxRate', e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-sm focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Active Service Cities</label>
              <div className="flex flex-wrap gap-2">
                 {localConfig.operations.serviceAreas.map((city: string, i: number) => (
                   <span key={i} className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase text-slate-600 dark:text-slate-400">
                     {city}
                   </span>
                 ))}
                 <button className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                 </button>
              </div>
            </div>
          </section>
        );
      case 'App Config':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
             <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-2">Feature Toggles</h3>
                <div className="space-y-4">
                   {[
                     { label: 'Cash on Delivery', key: 'enableCOD' },
                     { label: 'Online UPI Payment', key: 'enableOnlinePayment' },
                     { label: 'Order Feedback/Rating', key: 'enableOrderRating' },
                     { label: 'Kitchen Public Rating', key: 'enableKitchenRating' },
                   ].map((f) => (
                     <div key={f.key} className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{f.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={localConfig.appConfig[f.key]} 
                            onChange={(e) => handleUpdate('appConfig', f.key, e.target.checked)}
                          />
                          <div className="w-9 h-5 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                        </label>
                     </div>
                   ))}
                </div>
             </section>

             <section className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 pb-2">Global Protocols</h3>
                <div className="flex items-center justify-between p-4 bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 rounded-md">
                  <div>
                    <p className="text-sm font-bold text-red-600 dark:text-red-400 tracking-tight">Maintenance Protocol</p>
                    <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1">Suspend all transaction processing</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={localConfig.maintenanceMode} 
                      onChange={(e) => handleRootUpdate('maintenanceMode', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:bg-red-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>

                <section className="space-y-4">
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
                      Light
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
                      Dark
                    </button>
                  </div>
                </section>
             </section>
          </div>
        );
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto pb-24 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">System Configuration</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Audit-ready global environment management</p>
        </div>
        <button 
          onClick={onSave}
          disabled={saving}
          className="bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-widest px-8 py-2.5 rounded-md transition-all text-xs disabled:opacity-50 shadow-lg shadow-primary/20"
        >
          {saving ? 'Syncing...' : 'Update & Sync Registry'}
        </button>
      </header>

      {/* Settings Navigation Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-950/40 p-1 rounded-md border border-slate-200 dark:border-slate-800/50 overflow-x-auto no-scrollbar">
        {(['Profile', 'Platform', 'Operations', 'App Config'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`flex-1 min-w-[120px] py-2 text-[10px] font-black uppercase tracking-widest rounded transition-all ${
              activeTab === t ? 'bg-white dark:bg-slate-800 text-primary shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <main className="min-h-[400px]">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default SystemSettings;
