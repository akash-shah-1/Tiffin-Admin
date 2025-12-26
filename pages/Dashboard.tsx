
import React from 'react';
import { Link } from 'react-router-dom';
import { useDashboard } from '../hooks/useDashboard';

const Dashboard: React.FC = () => {
  const { stats, activity, revenue, loading, refreshData } = useDashboard();

  if (loading && stats.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center p-20">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Initializing Terminal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Command Center</h1>
          <p className="text-xs text-slate-500 font-medium">Real-time delivery network metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={refreshData}
            className="h-9 px-4 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-all text-xs font-bold shadow-sm flex items-center gap-2"
          >
            <span className={`material-symbols-outlined text-[16px] ${loading ? 'animate-spin' : ''}`}>sync</span>
            Refresh
          </button>
        </div>
      </header>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
              <div className={`size-8 rounded flex items-center justify-center bg-primary/10 text-primary`}>
                <span className="material-symbols-outlined text-[18px]">{stat.icon}</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{stat.value}</p>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                <span className="material-symbols-outlined text-[12px] mr-0.5">arrow_upward</span>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Performance */}
        <section className="lg:col-span-2 p-6 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">Revenue Growth</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-slate-900 dark:text-slate-100">{revenue?.total || '$0'}</span>
                <span className="text-xs font-bold text-primary">Avg +12.5%</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-60 w-full">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d={revenue?.points || "M0,35 L100,35"} fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M0,35 Q10,30 20,38 T40,20 T60,25 T80,10 T100,15 L100,40 L0,40 Z" fill="rgba(22, 163, 74, 0.05)" />
            </svg>
            <div className="flex justify-between text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest border-t border-slate-100 dark:border-slate-800 pt-4">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </section>

        {/* System Logs */}
        <section className="p-6 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">System Logs</h3>
          </div>
          <div className="space-y-4">
            {activity.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 border-b border-slate-50 dark:border-slate-800/50 pb-3 last:border-0">
                <div className={`shrink-0 size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500`}>
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate leading-none mb-1">{item.title}</p>
                  <p className="text-[10px] text-slate-500 truncate font-medium">{item.sub}</p>
                  <p className="text-[9px] text-slate-400 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;