
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';

const ProfileSkeleton = () => (
  <div className="p-4 md:p-8 space-y-10 max-w-2xl mx-auto animate-pulse">
    <div className="flex flex-col items-center space-y-6">
      <div className="size-32 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
      <div className="space-y-2 flex flex-col items-center">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="h-20 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800"></div>
      <div className="h-20 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800"></div>
      <div className="h-20 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800"></div>
    </div>
    <div className="flex gap-4">
      <div className="h-12 flex-1 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      <div className="h-12 flex-1 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
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
      // In a real app, clear tokens/storage here
      alert("Logged out successfully.");
      window.location.reload();
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-2xl mx-auto pb-32 animate-in fade-in duration-500">
      <header className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <button onClick={() => navigate(-1)} className="size-9 rounded-md flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Administrative Identity</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Authenticated Security Profile</p>
        </div>
      </header>

      {/* Header Profile Section */}
      <section className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="size-32 rounded-full p-1.5 bg-white dark:bg-slate-900 border-2 border-primary/20 shadow-2xl">
            <div 
              className="size-full rounded-full bg-cover bg-center border border-slate-100 dark:border-slate-800" 
              style={{ backgroundImage: `url("https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=16a34a&color=fff&size=256")` }}
            ></div>
          </div>
          <div className="absolute bottom-1 right-1 size-8 bg-primary rounded-full border-4 border-background-light dark:border-background-dark flex items-center justify-center text-white shadow-lg">
            <span className="material-symbols-outlined text-[18px] font-black">verified</span>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">{profile.name}</h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="px-3 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">Super Administrator</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Status</span>
          </div>
        </div>
      </section>

      {/* Information Cards */}
      <section className="space-y-3">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Credential Metadata</h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            { label: 'Registered Email', val: profile.email, icon: 'mail' },
            { label: 'Authorized Phone', val: profile.phone, icon: 'call' },
            { label: 'Platform Role', val: 'Super Admin - Full Permissions', icon: 'security' },
          ].map((item) => (
            <div key={item.label} className="bg-white dark:bg-slate-900 p-5 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 group">
              <div className="size-10 rounded bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{item.label}</p>
                <p className="text-sm font-black text-slate-800 dark:text-slate-100">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Action Footer */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Security Procedures</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="h-12 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:border-primary/40 transition-all shadow-sm group active:scale-95">
            <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-primary transition-colors">lock_reset</span>
            Modify Access Password
          </button>
          <button 
            onClick={handleLogout}
            className="h-12 rounded bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 text-red-600 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Terminate Session
          </button>
        </div>
      </section>

      <div className="text-center opacity-30">
        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">TiffinAdmin Security Registry v2.4.1</p>
      </div>
    </div>
  );
};

export default Profile;
