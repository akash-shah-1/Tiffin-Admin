
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';
import { PageHeader } from '../components/ui/PageHeader';

const ProfileSkeleton = () => (
  <div className="space-y-10 max-w-5xl mx-auto animate-pulse">
    <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded mb-8"></div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-1 flex flex-col items-center space-y-6">
        <div className="size-48 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-24 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800"></div>
          <div className="h-24 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800"></div>
        </div>
        <div className="h-40 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800"></div>
      </div>
    </div>
  </div>
);

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { config, loading } = useSettings();

  if (loading || !config) {
    return <ProfileSkeleton />;
  }

  const { profile } = config;

  const handleLogout = () => {
    if (confirm("Are you sure you want to terminate the current session?")) {
      alert("Logged out successfully.");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-32 animate-in fade-in duration-500">
      <PageHeader 
        title="Administrative Identity" 
        subtitle="Authenticated Security Profile"
        onBack={() => navigate(-1)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Hero Identity */}
        <aside className="lg:col-span-1 flex flex-col items-center text-center space-y-6 lg:sticky lg:top-8">
          <div className="relative">
            <div className="size-40 lg:size-48 rounded-full p-2 bg-white dark:bg-slate-900 border-2 border-primary/20 shadow-2xl">
              <div 
                className="size-full rounded-full bg-cover bg-center border border-slate-100 dark:border-slate-800" 
                style={{ backgroundImage: `url("https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=16a34a&color=fff&size=512")` }}
              ></div>
            </div>
            <div className="absolute bottom-2 right-2 size-10 bg-primary rounded-full border-4 border-background-light dark:border-background-dark flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined text-[20px] font-black">verified</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">{profile.name}</h2>
            <div className="flex flex-col items-center gap-3">
              <span className="px-4 py-1 rounded bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                Super Administrator
              </span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Platform Registry Head</p>
            </div>
          </div>

          <div className="w-full pt-6 border-t border-slate-100 dark:border-slate-800/50">
             <div className="flex justify-around items-center">
                <div className="text-center">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Access Level</p>
                   <p className="text-sm font-bold text-emerald-500 uppercase">Tier 1</p>
                </div>
                <div className="w-px h-8 bg-slate-100 dark:bg-slate-800"></div>
                <div className="text-center">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Sync</p>
                   <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Just Now</p>
                </div>
             </div>
          </div>
        </aside>

        {/* Right Column: Details and Actions */}
        <div className="lg:col-span-2 space-y-10">
          {/* Metadata Grid */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Credential Metadata</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Authorized Email', val: profile.email, icon: 'mail', color: 'text-blue-500' },
                { label: 'Verified Phone', val: profile.phone, icon: 'call', color: 'text-primary' },
                { label: 'Security Role', val: 'Platform Super Admin', icon: 'security', color: 'text-amber-500' },
                { label: 'System Access', val: 'Full Permissions', icon: 'admin_panel_settings', color: 'text-indigo-500' },
              ].map((item) => (
                <div key={item.label} className="bg-white dark:bg-slate-900 p-5 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 group transition-all hover:border-primary/20">
                  <div className={`size-10 rounded bg-slate-50 dark:bg-slate-950 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{item.label}</p>
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100 truncate">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Security Procedures */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Security Procedures</h3>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="h-14 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:border-primary/40 hover:bg-white dark:hover:bg-slate-900 transition-all group active:scale-95">
                  <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-primary transition-colors">lock_reset</span>
                  Modify Password
                </button>
                <button className="h-14 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:border-primary/40 hover:bg-white dark:hover:bg-slate-900 transition-all group active:scale-95">
                  <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-primary transition-colors">phonelink_lock</span>
                  2FA Settings
                </button>
              </div>

              <div className="p-4 rounded bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-red-600 dark:text-red-400">Emergency Termination</p>
                  <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1 text-center md:text-left">Instantly close current session on all devices</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full md:w-auto h-11 px-8 rounded bg-red-600 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all active:scale-95"
                >
                  Terminate session
                </button>
              </div>
            </div>
          </section>

          <div className="text-center lg:text-right opacity-30 pt-10">
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">TiffinAdmin Security Registry v2.4.1</p>
            <p className="text-[7px] font-bold text-slate-400 mt-1 uppercase">Cloud-Sync Encrypted Identity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
